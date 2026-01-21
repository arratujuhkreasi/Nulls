"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

// ============================================
// TYPES
// ============================================
export interface Customer {
    id: string;
    user_id: string;
    name: string;
    phone?: string;
    email?: string;
    address?: string;
    notes?: string;
    created_at: string;
    updated_at: string;
}

export interface CustomerStats {
    customer_id: string;
    user_id: string;
    name: string;
    phone?: string;
    email?: string;
    total_orders: number;
    lifetime_value: number;
    last_purchase_date?: string;
    first_purchase_date?: string;
    customer_status: 'active' | 'at_risk' | 'dormant';
}

// ============================================
// GET CUSTOMERS (with pagination)
// ============================================
export async function getCustomers(page: number = 1, limit: number = 20) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return { customers: [], total: 0 };

    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data, error, count } = await supabase
        .from('customers')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(from, to);

    if (error) {
        console.error('Error fetching customers:', error);
        return { customers: [], total: 0 };
    }

    return {
        customers: (data || []) as Customer[],
        total: count || 0
    };
}

// ============================================
// GET CUSTOMER BY ID
// ============================================
export async function getCustomerById(id: string) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('customers')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error fetching customer:', error);
        return null;
    }

    return data as Customer;
}

// ============================================
// GET CUSTOMER STATS (with purchase history)
// ============================================
export async function getCustomerStats(customerId: string) {
    const supabase = await createClient();

    // Get customer stats from materialized view
    const { data: stats, error: statsError } = await supabase
        .from('customer_stats')
        .select('*')
        .eq('customer_id', customerId)
        .single();

    if (statsError) {
        console.error('Error fetching customer stats:', statsError);
    }

    // Get recent transactions
    const { data: transactions, error: transError } = await supabase
        .from('transactions')
        .select('*')
        .eq('customer_id', customerId)
        .order('created_at', { ascending: false })
        .limit(10);

    if (transError) {
        console.error('Error fetching transactions:', transError);
    }

    return {
        stats: stats as CustomerStats | null,
        transactions: transactions || []
    };
}

// ============================================
// CREATE CUSTOMER
// ============================================
export async function createCustomer(formData: FormData) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return { error: "Unauthorized" };

    const name = formData.get("name") as string;
    const phone = formData.get("phone") as string;
    const email = formData.get("email") as string;
    const address = formData.get("address") as string;
    const notes = formData.get("notes") as string;

    // Validation
    if (!name || name.trim().length === 0) {
        return { error: "Nama customer wajib diisi" };
    }

    const { data, error } = await supabase
        .from('customers')
        .insert({
            user_id: user.id,
            name: name.trim(),
            phone: phone?.trim() || null,
            email: email?.trim() || null,
            address: address?.trim() || null,
            notes: notes?.trim() || null
        })
        .select()
        .single();

    if (error) {
        console.error('Error creating customer:', error);
        return { error: error.message };
    }

    revalidatePath('/customers');
    return { success: true, data };
}

// ============================================
// UPDATE CUSTOMER
// ============================================
export async function updateCustomer(id: string, formData: FormData) {
    const supabase = await createClient();

    const name = formData.get("name") as string;
    const phone = formData.get("phone") as string;
    const email = formData.get("email") as string;
    const address = formData.get("address") as string;
    const notes = formData.get("notes") as string;

    // Validation
    if (!name || name.trim().length === 0) {
        return { error: "Nama customer wajib diisi" };
    }

    const { error } = await supabase
        .from('customers')
        .update({
            name: name.trim(),
            phone: phone?.trim() || null,
            email: email?.trim() || null,
            address: address?.trim() || null,
            notes: notes?.trim() || null,
            updated_at: new Date().toISOString()
        })
        .eq('id', id);

    if (error) {
        console.error('Error updating customer:', error);
        return { error: error.message };
    }

    revalidatePath('/customers');
    revalidatePath(`/customers/${id}`);
    return { success: true };
}

// ============================================
// DELETE CUSTOMER
// ============================================
export async function deleteCustomer(id: string) {
    const supabase = await createClient();

    const { error } = await supabase
        .from('customers')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting customer:', error);
        return { error: error.message };
    }

    revalidatePath('/customers');
    return { success: true };
}

// ============================================
// GET TOP CUSTOMERS (by LTV)
// ============================================
export async function getTopCustomers(limit: number = 10) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return [];

    const { data, error } = await supabase
        .from('customer_stats')
        .select('*')
        .eq('user_id', user.id)
        .order('lifetime_value', { ascending: false })
        .limit(limit);

    if (error) {
        console.error('Error fetching top customers:', error);
        return [];
    }

    return (data || []) as CustomerStats[];
}

// ============================================
// SEARCH CUSTOMERS (by name, phone, or email)
// ============================================
export async function searchCustomers(query: string, limit: number = 10) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user || !query) return [];

    const searchTerm = `%${query}%`;

    const { data, error } = await supabase
        .from('customers')
        .select('*')
        .or(`name.ilike.${searchTerm},phone.ilike.${searchTerm},email.ilike.${searchTerm}`)
        .limit(limit);

    if (error) {
        console.error('Error searching customers:', error);
        return [];
    }

    return (data || []) as Customer[];
}

// ============================================
// GET CUSTOMER SUMMARY STATS
// ============================================
export async function getCustomerSummary() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return null;

    // Get counts by status
    const { data: stats } = await supabase
        .from('customer_stats')
        .select('customer_status')
        .eq('user_id', user.id);

    if (!stats) return null;

    const summary = {
        total: stats.length,
        active: stats.filter(s => s.customer_status === 'active').length,
        at_risk: stats.filter(s => s.customer_status === 'at_risk').length,
        dormant: stats.filter(s => s.customer_status === 'dormant').length
    };

    return summary;
}
