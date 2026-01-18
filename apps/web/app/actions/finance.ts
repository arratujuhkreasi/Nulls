"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function createExpense(formData: FormData) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { error: "Unauthorized" };
    }

    const category = formData.get("category") as string;
    const description = formData.get("description") as string;
    const amount = parseFloat(formData.get("amount") as string);
    const date = formData.get("date") as string;

    const { error } = await supabase
        .from('expenses')
        .insert({
            user_id: user.id,
            category,
            amount,
            description,
            date: date || new Date().toISOString().split('T')[0]
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

    if (!user) return { revenue: 0, expenses: 0, profit: 0 };

    // Get Total Revenue (Mocked via random for demo if no transactions, else real)
    // For now, let's fetch real if exists, else return 0
    const { data: transactions } = await supabase
        .from('transactions')
        .select('total_amount');

    const totalRevenue = transactions?.reduce((sum, t) => sum + Number(t.total_amount), 0) || 0;

    // Get Total Expenses
    const { data: expenses } = await supabase
        .from('expenses')
        .select('amount');

    const totalExpenses = expenses?.reduce((sum, e) => sum + Number(e.amount), 0) || 0;

    return {
        revenue: totalRevenue,
        expenses: totalExpenses,
        profit: totalRevenue - totalExpenses
    };
}

export async function getExpenses() {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('expenses')
        .select('*')
        .order('date', { ascending: false });

    if (error) {
        console.error('Error fetching expenses:', error);
        return [];
    }

    return data;
}
