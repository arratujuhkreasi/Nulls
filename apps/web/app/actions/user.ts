"use server";

import { createClient } from "@/utils/supabase/server";

export async function getUserSubscription(): Promise<'free' | 'monthly' | 'yearly'> {
    const supabase = await createClient();

    try {
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) return 'free';

        const { data, error } = await supabase
            .from('profiles')
            .select('subscription_plan')
            .eq('id', user.id)
            .single();

        // For DEMO purposes: Force Pro plan
        console.log("DEMO MODE: Returning 'monthly' plan");
        return 'monthly';

        // Original Logic (Commented out for demo)
        /*
        if (error || !data) return 'free';

        // Type casting validation
        const plan = data.subscription_plan;
        if (plan === 'monthly' || plan === 'yearly') {
            return plan;
        }

        return 'free';
        */
    } catch (error) {
        console.error("Error fetching subscription:", error);
        // return 'free';
        return 'monthly'; // Fallback to Pro for demo
    }
}
