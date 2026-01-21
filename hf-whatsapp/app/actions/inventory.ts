"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { productSchema } from "@/lib/validation";

export async function getProducts(page: number = 1, limit: number = 20) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return { products: [], total: 0, page, limit };

    // Calculate range for pagination
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data, error, count } = await supabase
        .from('products')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(from, to);

    if (error) {
        console.error('Error fetching products:', error);
        return { products: [], total: 0, page, limit };
    }

    return {
        products: data || [],
        total: count || 0,
        page,
        limit
    };
}

export async function createProduct(formData: FormData) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { error: "Unauthorized" };
    }

    // Validate input with Zod
    const validation = productSchema.safeParse({
        name: formData.get("name"),
        sku: formData.get("sku") || undefined,
        stock: Number(formData.get("stock")),
        buy_price: Number(formData.get("buy_price")),
        sell_price: Number(formData.get("sell_price")),
    });

    if (!validation.success) {
        const firstError = validation.error.issues[0];
        return { error: firstError.message };
    }

    const { name, sku, stock, buy_price, sell_price } = validation.data;

    const { error } = await supabase
        .from('products')
        .insert({
            user_id: user.id,
            name,
            sku,
            stock,
            buy_price,
            sell_price,
        });

    if (error) {
        console.error('Error creating product:', error);
        return { error: error.message };
    }

    revalidatePath('/inventory');
    return { success: true };
}

export async function updateProduct(id: string, formData: FormData) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { error: "Unauthorized" };
    }

    // Validate input with Zod
    const validation = productSchema.safeParse({
        name: formData.get("name"),
        sku: formData.get("sku") || undefined,
        stock: Number(formData.get("stock")),
        buy_price: Number(formData.get("buy_price")),
        sell_price: Number(formData.get("sell_price")),
    });

    if (!validation.success) {
        const firstError = validation.error.issues[0];
        return { error: firstError.message };
    }

    const { name, sku, stock, buy_price, sell_price } = validation.data;

    const { error } = await supabase
        .from('products')
        .update({
            name,
            sku,
            stock,
            buy_price,
            sell_price,
        })
        .eq('id', id)
        .eq('user_id', user.id); // Security: Ensure user owns the product

    if (error) {
        console.error('Error updating product:', error);
        return { error: error.message };
    }

    revalidatePath('/inventory');
    return { success: true };
}

export async function deleteProduct(id: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { error: "Unauthorized" };
    }

    const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

    if (error) {
        console.error('Error deleting product:', error);
        return { error: error.message };
    }

    revalidatePath('/inventory');
    return { success: true };
}
