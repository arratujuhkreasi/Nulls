# Database Migration Guide

## Migration: Customer CRM & Product Analytics

### Overview
This migration adds comprehensive customer relationship management and product analytics capabilities to the system.

### Changes

#### New Tables
1. **customers** - Store customer information
   - Fields: id, user_id, name, phone, email, address, notes
   - RLS policies enabled
   - Indexed on: user_id, phone, email, name

#### Modified Tables
2. **transactions** - Added customer linking
   - New column: `customer_id` (optional reference to customers table)

#### Materialized Views
3. **customer_stats** - Pre-aggregated customer metrics
   - Calculates: total_orders, lifetime_value, last_purchase_date, customer_status
   - Auto-refreshes on transaction/customer changes

4. **product_analytics** - Pre-aggregated product performance
   - Calculates: total_sold, revenue, profit, margins, stock_status
   - Auto-refreshes on transaction_items/products changes

### How to Apply

#### Option 1: Supabase Dashboard (Recommended)
1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Create new query
4. Copy contents of `migrations/002_customer_crm_analytics.sql`
5. Click **Run**
6. Verify success in **Table Editor**

#### Option 2: Supabase CLI
```bash
# Make sure you're in the project root
cd "d:\PROJECT ARLAND JOVA"

# Apply migration
supabase db push --db-url "your-database-url"
```

#### Option 3: Direct psql
```bash
psql "your-connection-string" < database/migrations/002_customer_crm_analytics.sql
```

### Verification

After applying migration, run these queries to verify:

```sql
-- 1. Check if customers table exists
SELECT * FROM customers LIMIT 1;

-- 2. Check if customer_id column added to transactions
SELECT customer_id FROM transactions LIMIT 1;

-- 3. Check materialized views
SELECT * FROM customer_stats LIMIT 5;
SELECT * FROM product_analytics ORDER BY total_revenue DESC LIMIT 10;

-- 4. Verify RLS policies
SELECT tablename, policyname FROM pg_policies WHERE tablename = 'customers';

-- 5. Check indexes
SELECT tablename, indexname FROM pg_indexes 
WHERE tablename IN ('customers', 'customer_stats', 'product_analytics');
```

### Performance Notes

- **Materialized Views**: Pre-computed for fast queries
- **Auto-Refresh**: Triggers update views automatically
- **CONCURRENT Refresh**: Non-blocking updates
- **Indexes**: Optimized for common query patterns

### Rollback (if needed)

```sql
-- Drop materialized views
DROP MATERIALIZED VIEW IF EXISTS product_analytics CASCADE;
DROP MATERIALIZED VIEW IF EXISTS customer_stats CASCADE;

-- Remove customer_id from transactions
ALTER TABLE transactions DROP COLUMN IF EXISTS customer_id;

-- Drop customers table
DROP TABLE IF EXISTS customers CASCADE;

-- Drop functions
DROP FUNCTION IF EXISTS refresh_customer_stats() CASCADE;
DROP FUNCTION IF EXISTS refresh_product_analytics() CASCADE;
```

### Next Steps

After successful migration:
1. ✅ Verify all tables and views created
2. ✅ Test RLS policies work correctly
3. ✅ Implement server actions (`apps/web/app/actions/customers.ts`)
4. ✅ Build UI components
5. ✅ Test with sample data
