"use server";

import { createClient } from "@/utils/supabase/server";
import { env } from "@/lib/env";

interface ForecastResult {
    forecast: number[];
}

export async function getForecastData() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return null;

    // 1. Fetch historical sales data (last 60 days)
    const sixtyDaysAgo = new Date();
    sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);

    const { data: transactions, error } = await supabase
        .from('transactions')
        .select('created_at, total_amount')
        .gte('created_at', sixtyDaysAgo.toISOString())
        .order('created_at', { ascending: true });

    if (error) {
        console.error("Error fetching transactions:", error);
        return null;
    }

    if (!transactions || transactions.length < 10) {
        // Not enough data for reliable AI
        return null;
    }

    // 2. Process data: Group by date (Daily Sum)
    const dailySales: { [key: string]: number } = {};

    transactions.forEach((t) => {
        const date = t.created_at.split('T')[0];
        dailySales[date] = (dailySales[date] || 0) + Number(t.total_amount);
    });

    // Fill missing days with 0
    const processedData: { date: string; amount: number }[] = [];
    const today = new Date();
    for (let d = new Date(sixtyDaysAgo); d <= today; d.setDate(d.getDate() + 1)) {
        const dateStr = d.toISOString().split('T')[0];
        processedData.push({
            date: dateStr,
            amount: dailySales[dateStr] || 0
        });
    }

    // Prepare data for AI Engine (last 30 days for prediction input)
    // We send ALL data for training if needed
    const trainingPayload = {
        user_id: user.id,
        data: processedData
    };

    const predictionPayload = {
        user_id: user.id,
        data: processedData.slice(-30).map(d => d.amount) // Last 30 days values
    };

    try {
        // 3. Try Predict first
        const predictRes = await fetch(`${env.AI_ENGINE_URL}/predict`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(predictionPayload) // Fix: Directly send payload matching Pydantic model
        });

        if (predictRes.status === 404) {
            // Model not found -> Train first
            console.log("Model not found, training...");
            const trainRes = await fetch(`${env.AI_ENGINE_URL}/train`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(trainingPayload)
            });

            if (!trainRes.ok) {
                console.error("Training failed:", await trainRes.text());
                return null;
            }

            // Retry Predict
            const retryRes = await fetch(`${env.AI_ENGINE_URL}/predict`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(predictionPayload)
            });

            if (!retryRes.ok) return null;

            const result = await retryRes.json() as ForecastResult;
            return result.forecast;
        }

        if (!predictRes.ok) {
            console.error("Prediction failed:", await predictRes.text());
            return null;
        }

        const result = await predictRes.json() as ForecastResult;
        return result.forecast;

    } catch (err) {
        console.error("AI Engine Error:", err);
        return null;
    }
}
