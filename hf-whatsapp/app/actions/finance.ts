"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { expenseSchema } from "@/lib/validation";

export async function createExpense(formData: FormData) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { error: "Unauthorized" };
    }

    // Validate input with Zod
    const validation = expenseSchema.safeParse({
        category: formData.get("category"),
        description: formData.get("description") || undefined,
        amount: Number(formData.get("amount")),
        date: formData.get("date") || new Date().toISOString().split('T')[0],
    });

    if (!validation.success) {
        const firstError = validation.error.issues[0];
        return { error: firstError.message };
    }

    const { category, description, amount, date } = validation.data;

    const { error } = await supabase
        .from('expenses')
        .insert({
            user_id: user.id,
            category,
            amount,
            description,
            date
        });

    if (error) {
        console.error('Error creating expense:', error);
        return { error: error.message };
    }

    revalidatePath('/finance');
    return { success: true };
}

export async function getFinancialSummary() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return { revenue: 0, expenses: 0, profit: 0, cogs: 0, grossProfit: 0 };

    // Get total revenue from transactions
    const { data: transactions } = await supabase
        .from('transactions')
        .select('total_amount');

    const revenue = transactions?.reduce((sum, t) => sum + Number(t.total_amount), 0) || 0;

    // Get COGS (HPP) from product_analytics
    const { data: productAnalytics } = await supabase
        .from('product_analytics')
        .select('total_cost')
        .eq('user_id', user.id);

    const cogs = productAnalytics?.reduce((sum, p) => sum + Number(p.total_cost), 0) || 0;

    // Get total expenses
    const { data: expensesData } = await supabase
        .from('expenses')
        .select('amount');

    const expenses = expensesData?.reduce((sum, e) => sum + Number(e.amount), 0) || 0;

    // Calculate profits
    const grossProfit = revenue - cogs; // Laba Kotor = Revenue - HPP
    const netProfit = grossProfit - expenses; // Laba Bersih = Laba Kotor - Biaya Operasional

    return {
        revenue,
        expenses,
        cogs,
        grossProfit,
        profit: netProfit
    };
}

export async function getExpenses(page: number = 1, limit: number = 20) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return { expenses: [], total: 0, page, limit };

    // Calculate range for pagination
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data, error, count } = await supabase
        .from('expenses')
        .select('*', { count: 'exact' })
        .order('date', { ascending: false })
        .range(from, to);

    if (error) {
        console.error('Error fetching expenses:', error);
        return { expenses: [], total: 0, page, limit };
    }

    return {
        expenses: data || [],
        total: count || 0,
        page,
        limit
    };
}
