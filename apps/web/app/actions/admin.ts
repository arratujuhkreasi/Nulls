"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export type SubscriptionPlan = 'free' | 'basic' | 'umkm' | 'umkm_online';

export interface UserProfile {
    id: string;
    email: string;
    full_name: string | null;
    subscription_plan: SubscriptionPlan;
    is_admin: boolean;
    created_at: string;
    last_login_at: string | null;
}

export async function checkIsAdmin(): Promise<boolean> {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return false;

    const { data: profile } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('id', user.id)
        .single();

    return profile?.is_admin === true;
}

export async function getAllUsers(): Promise<UserProfile[]> {
    const supabase = await createClient();

    // Check if current user is admin
    const isAdmin = await checkIsAdmin();
    if (!isAdmin) {
        throw new Error('Unauthorized: Admin access required');
    }

    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching users:', error);
        return [];
    }

    return data || [];
}

export async function updateUserSubscription(
    userId: string,
    newPlan: SubscriptionPlan
): Promise<{ success: boolean; error?: string }> {
    const supabase = await createClient();

    // Check if current user is admin
    const isAdmin = await checkIsAdmin();
    if (!isAdmin) {
        return { success: false, error: 'Unauthorized: Admin access required' };
    }

    const { error } = await supabase
        .from('profiles')
        .update({ subscription_plan: newPlan })
        .eq('id', userId);

    if (error) {
        console.error('Error updating subscription:', error);
        return { success: false, error: error.message };
    }

    revalidatePath('/admin/users');
    return { success: true };
}

export async function toggleAdminStatus(
    userId: string,
    isAdmin: boolean
): Promise<{ success: boolean; error?: string }> {
    const supabase = await createClient();

    // Check if current user is admin
    const currentIsAdmin = await checkIsAdmin();
    if (!currentIsAdmin) {
        return { success: false, error: 'Unauthorized: Admin access required' };
    }

    const { error } = await supabase
        .from('profiles')
        .update({ is_admin: isAdmin })
        .eq('id', userId);

    if (error) {
        console.error('Error updating admin status:', error);
        return { success: false, error: error.message };
    }

    revalidatePath('/admin/users');
    return { success: true };
}

export async function getAdminStats() {
    const supabase = await createClient();

    const isAdmin = await checkIsAdmin();
    if (!isAdmin) {
        return null;
    }

    // Get total users
    const { count: totalUsers } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

    // Get users by subscription
    const { data: subscriptionData } = await supabase
        .from('profiles')
        .select('subscription_plan');

    const subscriptionCounts = {
        free: 0,
        basic: 0,
        umkm: 0,
        umkm_online: 0
    };

    subscriptionData?.forEach(user => {
        const plan = user.subscription_plan || 'free';
        if (plan in subscriptionCounts) {
            subscriptionCounts[plan as keyof typeof subscriptionCounts]++;
        }
    });

    // Get recent signups (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const { count: recentSignups } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', sevenDaysAgo.toISOString());

    return {
        totalUsers: totalUsers || 0,
        recentSignups: recentSignups || 0,
        subscriptionCounts
    };
}
