"use server";

export async function generateMarketingCopy(formData: FormData) {
    const AI_ENGINE_URL = process.env.AI_ENGINE_URL || "http://127.0.0.1:8000";

    const product_name = formData.get("product_name") as string;
    const platform = formData.get("platform") as string;
    const tone = formData.get("tone") as string;
    const description = formData.get("description") as string;

    try {
        const response = await fetch(`${AI_ENGINE_URL}/marketing/generate`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                product_name,
                platform,
                tone,
                description,
            }),
            cache: "no-store",
        });

        if (!response.ok) {
            console.error("AI Error:", await response.text());
            return { error: "Failed to generate content." };
        }

        const data = await response.json();
        return { copy: data.copy };
    } catch (error) {
        console.error("Marketing Action Error:", error);
        return { error: "Something went wrong." };
    }
}
