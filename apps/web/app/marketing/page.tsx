import { MarketingGenerator } from "@/components/marketing/MarketingGenerator";

export default function MarketingPage() {
    return (
        <div className="p-8 max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Asisten Marketing AI</h1>
                <p className="text-gray-500">Buat caption viral, iklan, dan skrip dalam hitungan detik menggunakan Artificial Intelligence.</p>
            </div>

            <MarketingGenerator />
        </div>
    );
}
