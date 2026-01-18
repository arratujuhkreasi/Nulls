"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function getProducts() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return [];

    const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching products:', error);
        return [];
    }

    return data;
}

export async function createProduct(formData: FormData) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { error: "Unauthorized" };
    }

    const name = formData.get("name") as string;
    const sku = formData.get("sku") as string;
    const stock = parseInt(formData.get("stock") as string);
    const buy_price = parseFloat(formData.get("buy_price") as string);
    const sell_price = parseFloat(formData.get("sell_price") as string);

    // Optional: Image URL
    // const image_url = formData.get("image_url") as string;

    const { error } = await supabase
        .from('products')
        .insert({
            user_id: user.id,
            name,
            sku,
            stock,
            buy_price,
            sell_price,
            // image_url, 
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

    const name = formData.get("name") as string;
    const sku = formData.get("sku") as string;
    const stock = parseInt(formData.get("stock") as string);
    const buy_price = parseFloat(formData.get("buy_price") as string);
    const sell_price = parseFloat(formData.get("sell_price") as string);

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
