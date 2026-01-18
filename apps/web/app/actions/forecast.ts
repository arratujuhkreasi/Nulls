"use server";

interface ForecastResponse {
    forecast: number[];
}

export async function getSalesForecast(historyValues: number[]): Promise<number[] | null> {
    // Use localhost for server-to-server communication
    // Ensure your Python server is running on port 8000
    const AI_ENGINE_URL = process.env.AI_ENGINE_URL || "http://127.0.0.1:8000";

    try {
        const response = await fetch(`${AI_ENGINE_URL}/predict`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user_id: "demo-user", // In future, use actual user ID
                data: historyValues,
            }),
            cache: "no-store", // Check for fresh predictions
        });

        if (!response.ok) {
            console.warn("AI Engine Returned Error:", response.status, await response.text());
            return null;
        }

        const json: ForecastResponse = await response.json();
        return json.forecast;
    } catch (error) {
        console.error("Failed to fetch forecast from AI Engine:", error);
        return null;
    }
}
