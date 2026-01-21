-- ============================================
-- CUSTOMER CRM & PRODUCT ANALYTICS MIGRATION
-- ============================================
-- This migration adds customer management and product analytics capabilities
-- Created: 2026-01-21

-- ============================================
-- 1. CREATE CUSTOMERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS customers (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  address TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_customers_user_id ON customers(user_id);
CREATE INDEX IF NOT EXISTS idx_customers_phone ON customers(phone);
CREATE INDEX IF NOT EXISTS idx_customers_email ON customers(email);
CREATE INDEX IF NOT EXISTS idx_customers_name ON customers(name);

-- Enable RLS
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own customers"
  ON customers FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own customers"
  ON customers FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own customers"
  ON customers FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own customers"
  ON customers FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================
-- 2. ADD CUSTOMER_ID TO TRANSACTIONS TABLE
-- ============================================
-- Add column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'transactions' AND column_name = 'customer_id'
  ) THEN
    ALTER TABLE transactions
    ADD COLUMN customer_id UUID REFERENCES customers(id) ON DELETE SET NULL;
    
    CREATE INDEX idx_transactions_customer_id ON transactions(customer_id);
  END IF;
END $$;

-- ============================================
-- 3. CREATE CUSTOMER_STATS MATERIALIZED VIEW
-- ============================================
DROP MATERIALIZED VIEW IF EXISTS customer_stats CASCADE;

CREATE MATERIALIZED VIEW customer_stats AS
SELECT 
  c.id AS customer_id,
  c.user_id,
  c.name,
  c.phone,
  c.email,
  COUNT(t.id) AS total_orders,
  COALESCE(SUM(t.total_amount), 0) AS lifetime_value,
  MAX(t.created_at) AS last_purchase_date,
  MIN(t.created_at) AS first_purchase_date,
  CASE 
    WHEN MAX(t.created_at) >= NOW() - INTERVAL '30 days' THEN 'active'
    WHEN MAX(t.created_at) >= NOW() - INTERVAL '90 days' THEN 'at_risk'
    ELSE 'dormant'
  END AS customer_status
FROM customers c
LEFT JOIN transactions t ON t.customer_id = c.id AND t.user_id = c.user_id
GROUP BY c.id, c.user_id, c.name, c.phone, c.email;

-- Index for fast queries
CREATE UNIQUE INDEX idx_customer_stats_customer_id ON customer_stats(customer_id);
CREATE INDEX idx_customer_stats_user_id ON customer_stats(user_id);
CREATE INDEX idx_customer_stats_ltv ON customer_stats(lifetime_value DESC);

-- ============================================
-- 4. CREATE PRODUCT_ANALYTICS MATERIALIZED VIEW
-- ============================================
DROP MATERIALIZED VIEW IF EXISTS product_analytics CASCADE;

CREATE MATERIALIZED VIEW product_analytics AS
SELECT 
  p.id AS product_id,
  p.user_id,
  p.name,
  p.sku,
  p.stock,
  p.buy_price,
  p.sell_price,
  (p.sell_price - p.buy_price) AS profit_per_unit,
  CASE 
    WHEN p.sell_price > 0 THEN ROUND(((p.sell_price - p.buy_price) / p.sell_price * 100)::numeric, 2)
    ELSE 0
  END AS profit_margin_percentage,
  COALESCE(SUM(ti.quantity), 0) AS total_sold,
  COALESCE(SUM(ti.quantity * ti.price_at_sale), 0) AS total_revenue,
  COALESCE(SUM(ti.quantity * p.buy_price), 0) AS total_cost,
  COALESCE(SUM(ti.quantity * (ti.price_at_sale - p.buy_price)), 0) AS total_profit,
  COUNT(DISTINCT ti.transaction_id) AS number_of_orders,
  MAX(t.created_at) AS last_sold_date,
  CASE
    WHEN p.stock <= 0 THEN 'out_of_stock'
    WHEN p.stock <= 10 THEN 'low_stock'
    WHEN COALESCE(SUM(ti.quantity), 0) = 0 THEN 'no_sales'
    WHEN COALESCE(SUM(ti.quantity), 0) < 5 THEN 'slow_mover'
    ELSE 'healthy'
  END AS stock_status
FROM products p
LEFT JOIN transaction_items ti ON ti.product_id = p.id AND ti.user_id = p.user_id
LEFT JOIN transactions t ON t.id = ti.transaction_id
GROUP BY p.id, p.user_id, p.name, p.sku, p.stock, p.buy_price, p.sell_price;

-- Indexes for fast queries
CREATE UNIQUE INDEX idx_product_analytics_product_id ON product_analytics(product_id);
CREATE INDEX idx_product_analytics_user_id ON product_analytics(user_id);
CREATE INDEX idx_product_analytics_revenue ON product_analytics(total_revenue DESC);
CREATE INDEX idx_product_analytics_sold ON product_analytics(total_sold DESC);
CREATE INDEX idx_product_analytics_stock_status ON product_analytics(stock_status);

-- ============================================
-- 5. AUTO-REFRESH FUNCTIONS & TRIGGERS
-- ============================================

-- Function to refresh customer_stats
CREATE OR REPLACE FUNCTION refresh_customer_stats()
RETURNS TRIGGER AS $$
BEGIN
  REFRESH MATERIALIZED VIEW CONCURRENTLY customer_stats;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to refresh product_analytics
CREATE OR REPLACE FUNCTION refresh_product_analytics()
RETURNS TRIGGER AS $$
BEGIN
  REFRESH MATERIALIZED VIEW CONCURRENTLY product_analytics;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Triggers for customer_stats refresh
DROP TRIGGER IF EXISTS refresh_customer_stats_on_transaction ON transactions;
CREATE TRIGGER refresh_customer_stats_on_transaction
AFTER INSERT OR UPDATE OR DELETE ON transactions
FOR EACH STATEMENT
EXECUTE FUNCTION refresh_customer_stats();

DROP TRIGGER IF EXISTS refresh_customer_stats_on_customer ON customers;
CREATE TRIGGER refresh_customer_stats_on_customer
AFTER INSERT OR UPDATE OR DELETE ON customers
FOR EACH STATEMENT
EXECUTE FUNCTION refresh_customer_stats();

-- Triggers for product_analytics refresh
DROP TRIGGER IF EXISTS refresh_product_analytics_on_transaction_items ON transaction_items;
CREATE TRIGGER refresh_product_analytics_on_transaction_items
AFTER INSERT OR UPDATE OR DELETE ON transaction_items
FOR EACH STATEMENT
EXECUTE FUNCTION refresh_product_analytics();

DROP TRIGGER IF EXISTS refresh_product_analytics_on_products ON products;
CREATE TRIGGER refresh_product_analytics_on_products
AFTER UPDATE ON products
FOR EACH STATEMENT
EXECUTE FUNCTION refresh_product_analytics();

-- ============================================
-- 6. INITIAL REFRESH
-- ============================================
REFRESH MATERIALIZED VIEW customer_stats;
REFRESH MATERIALIZED VIEW product_analytics;

-- ============================================
-- VERIFICATION QUERIES (for testing)
-- ============================================
-- Test customer_stats view
-- SELECT * FROM customer_stats LIMIT 5;

-- Test product_analytics view
-- SELECT * FROM product_analytics ORDER BY total_revenue DESC LIMIT 10;

-- Check if indexes exist
-- SELECT tablename, indexname FROM pg_indexes WHERE tablename IN ('customers', 'customer_stats', 'product_analytics');
