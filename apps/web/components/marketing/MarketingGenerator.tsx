"use client";

import { useState } from "react";
import { generateMarketingCopy } from "@/app/actions/marketing";
import { Loader2, Wand2, Copy, Check } from "lucide-react";

export function MarketingGenerator() {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState("");
    const [copied, setCopied] = useState(false);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setLoading(true);
        setResult("");

        const formData = new FormData(event.currentTarget);
        const res = await generateMarketingCopy(formData);

        if (res.copy) {
            setResult(res.copy);
        } else {
            alert("Failed to generate content. Please ensure AI Engine is running.");
        }
        setLoading(false);
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(result);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Wand2 className="w-5 h-5 text-indigo-600" />
                    Konfigurasi Generator
                </h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Nama Produk</label>
                        <input
                            name="product_name"
                            required
                            className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                            placeholder="Contoh: Keripik Tempe Renyah"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Platform</label>
                            <select
                                name="platform"
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all bg-white"
                            >
                                <option value="Instagram Caption">Caption Instagram</option>
                                <option value="Facebook Post">Postingan Facebook</option>
                                <option value="TikTok Script">Naskah TikTok</option>
                                <option value="Email Newsletter">Newsletter Email</option>
                            </select>
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Nada</label>
                            <select
                                name="tone"
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all bg-white"
                            >
                                <option value="Fun & Viral">Menarik & Viral</option>
                                <option value="Professional">Profesional</option>
                                <option value="Urgent / Promo">Promo Mendesak</option>
                                <option value="Emotional / Storytelling">Cerita Emosional</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Kontek Tambahan</label>
                        <textarea
                            name="description"
                            rows={4}
                            className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all resize-none"
                            placeholder="Contoh: Diskon 50% khusus hari ini, bebas pengawet, rasa pedas manis."
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-medium rounded-xl shadow-lg shadow-indigo-200 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                    >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Wand2 className="w-5 h-5" />}
                        {loading ? "Sihir sedang terjadi..." : "Buat Konten"}
                    </button>
                </form>
            </div>

            {/* Output Section */}
            <div className="bg-gray-50 p-6 rounded-3xl border border-gray-200 flex flex-col h-full min-h-[400px]">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Hasil AI</h3>
                    {result && (
                        <button
                            onClick={handleCopy}
                            className="text-xs flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-gray-600 hover:text-indigo-600 transition-colors"
                        >
                            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                            {copied ? "Disalin!" : "Salin Teks"}
                        </button>
                    )}
                </div>

                <div className="flex-1 bg-white rounded-2xl border border-gray-200 p-5 shadow-inner overflow-auto whitespace-pre-wrap text-gray-700 leading-relaxed font-sans text-sm">
                    {result ? result : (
                        <div className="h-full flex flex-col items-center justify-center text-gray-400 opacity-60">
                            <Wand2 className="w-12 h-12 mb-3" />
                            <p>Isi detail dan klik Generate</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
