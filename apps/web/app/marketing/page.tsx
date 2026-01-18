import { MarketingGenerator } from "@/components/marketing/MarketingGenerator";

export default function MarketingPage() {
    return (
        <div className="p-8 max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Marketing Assistant</h1>
                <p className="text-gray-500">Create viral captions, ads, and scripts in seconds using Artificial Intelligence.</p>
            </div>

            <MarketingGenerator />
        </div>
    );
}
