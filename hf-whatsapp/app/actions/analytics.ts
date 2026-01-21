"use server";

import { createClient } from "@/utils/supabase/server";

// ============================================
// TYPES
// ============================================
export interface ProductAnalytics {
    product_id: string;
    user_id: string;
    name: string;
    sku?: string;
    stock: number;
    buy_price: number;
    sell_price: number;
    profit_per_unit: number;
    profit_margin_percentage: number;
    total_sold: number;
    total_revenue: number;
    total_cost: number;
    total_profit: number;
    number_of_orders: number;
    last_sold_date?: string;
    stock_status: 'out_of_stock' | 'low_stock' | 'no_sales' | 'slow_mover' | 'healthy';
}

// ============================================
// GET ALL PRODUCT ANALYTICS
// ============================================
export async function getProductAnalytics() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return [];

    const { data, error } = await supabase
        .from('product_analytics')
        .select('*')
        .eq('user_id', user.id)
        .order('total_revenue', { ascending: false });

    if (error) {
        console.error('Error fetching product analytics:', error);
        return [];
    }

    return (data || []) as ProductAnalytics[];
}

// ============================================
// GET BEST SELLERS (by revenue)
// ============================================
export async function getBestSellers(limit: number = 10) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return [];

    const { data, error } = await supabase
        .from('product_analytics')
        .select('*')
        .eq('user_id', user.id)
        .gt('total_sold', 0)
        .order('total_revenue', { ascending: false })
        .limit(limit);

    if (error) {
        console.error('Error fetching best sellers:', error);
        return [];
    }

    return (data || []) as ProductAnalytics[];
}

// ============================================
// GET TOP PRODUCTS BY QUANTITY SOLD
// ============================================
export async function getTopSellingProducts(limit: number = 10) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return [];

    const { data, error } = await supabase
        .from('product_analytics')
        .select('*')
        .eq('user_id', user.id)
        .gt('total_sold', 0)
        .order('total_sold', { ascending: false })
        .limit(limit);

    if (error) {
        console.error('Error fetching top selling products:', error);
        return [];
    }

    return (data || []) as ProductAnalytics[];
}

// ============================================
// GET SLOW MOVERS (low sales but have stock)
// ============================================
export async function getSlowMovers(limit: number = 10) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return [];

    const { data, error } = await supabase
        .from('product_analytics')
        .select('*')
        .eq('user_id', user.id)
        .gt('stock', 0)
        .in('stock_status', ['slow_mover', 'no_sales'])
        .order('total_sold', { ascending: true })
        .limit(limit);

    if (error) {
        console.error('Error fetching slow movers:', error);
        return [];
    }

    return (data || []) as ProductAnalytics[];
}

// ============================================
// GET LOW STOCK PRODUCTS
// ============================================
export async function getLowStockProducts(threshold: number = 10) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return [];

    const { data, error } = await supabase
        .from('product_analytics')
        .select('*')
        .eq('user_id', user.id)
        .lte('stock', threshold)
        .gt('stock', 0) // Exclude out of stock
        .order('stock', { ascending: true });

    if (error) {
        console.error('Error fetching low stock products:', error);
        return [];
    }

    return (data || []) as ProductAnalytics[];
}

// ============================================
// GET OUT OF STOCK PRODUCTS
// ============================================
export async function getOutOfStockProducts() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return [];

    const { data, error } = await supabase
        .from('product_analytics')
        .select('*')
        .eq('user_id', user.id)
        .eq('stock_status', 'out_of_stock')
        .order('last_sold_date', { ascending: false, nullsFirst: false });

    if (error) {
        console.error('Error fetching out of stock products:', error);
        return [];
    }

    return (data || []) as ProductAnalytics[];
}

// ============================================
// GET MOST PROFITABLE PRODUCTS
// ============================================
export async function getMostProfitableProducts(limit: number = 10) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return [];

    const { data, error } = await supabase
        .from('product_analytics')
        .select('*')
        .eq('user_id', user.id)
        .gt('total_profit', 0)
        .order('total_profit', { ascending: false })
        .limit(limit);

    if (error) {
        console.error('Error fetching most profitable products:', error);
        return [];
    }

    return (data || []) as ProductAnalytics[];
}

// ============================================
// GET PRODUCT ANALYTICS SUMMARY
// ============================================
export async function getProductAnalyticsSummary() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return null;

    const { data, error } = await supabase
        .from('product_analytics')
        .select('*')
        .eq('user_id', user.id);

    if (error || !data) {
        console.error('Error fetching product analytics summary:', error);
        return null;
    }

    // Calculate summary stats
    const summary = {
        total_products: data.length,
        total_revenue: data.reduce((sum, p) => sum + Number(p.total_revenue), 0),
        total_profit: data.reduce((sum, p) => sum + Number(p.total_profit), 0),
        total_items_sold: data.reduce((sum, p) => sum + Number(p.total_sold), 0),
        out_of_stock: data.filter(p => p.stock_status === 'out_of_stock').length,
        low_stock: data.filter(p => p.stock_status === 'low_stock').length,
        slow_movers: data.filter(p => p.stock_status === 'slow_mover').length,
        no_sales: data.filter(p => p.stock_status === 'no_sales').length,
        healthy: data.filter(p => p.stock_status === 'healthy').length,
        avg_profit_margin: data.length > 0
            ? data.reduce((sum, p) => sum + Number(p.profit_margin_percentage), 0) / data.length
            : 0
    };

    return summary;
}

// ============================================
// GET PRODUCT PERFORMANCE BY ID
// ============================================
export async function getProductPerformance(productId: string) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('product_analytics')
        .select('*')
        .eq('product_id', productId)
        .single();

    if (error) {
        console.error('Error fetching product performance:', error);
        return null;
    }

    return data as ProductAnalytics;
}
