"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, X, Star, Zap, Crown, ArrowRight, Sparkles } from "lucide-react";

type BillingPeriod = "monthly" | "yearly";

const PRICING_TIERS = [
    {
        name: "Basic",
        description: "Untuk memulai digitalisasi bisnis Anda",
        monthlyPrice: 0,
        yearlyPrice: 0,
        icon: Sparkles,
        color: "from-slate-500 to-slate-600",
        popular: false,
        features: [
            { name: "Dashboard Analytics", included: true, detail: "Basic" },
            { name: "Tracking Produk", included: true, detail: "10 produk" },
            { name: "Database Customer", included: true, detail: "50 customer" },
            { name: "AI Sales Prediction", included: false },
            { name: "AI Marketing Content", included: false },
            { name: "WhatsApp Integration", included: false },
            { name: "Export Laporan", included: false },
            { name: "Priority Support", included: false },
        ],
        cta: "Mulai Gratis",
        ctaHref: "/login",
    },
    {
        name: "UMKM",
        description: "Untuk usaha kecil yang ingin berkembang",
        monthlyPrice: 99000,
        yearlyPrice: 990000,
        icon: Zap,
        color: "from-indigo-500 to-purple-600",
        popular: true,
        features: [
            { name: "Dashboard Analytics", included: true, detail: "Full" },
            { name: "Tracking Produk", included: true, detail: "100 produk" },
            { name: "Database Customer", included: true, detail: "500 customer" },
            { name: "AI Sales Prediction", included: true, detail: "7 hari" },
            { name: "AI Marketing Content", included: true, detail: "10/bulan" },
            { name: "WhatsApp Integration", included: true },
            { name: "Export Laporan", included: true, detail: "PDF" },
            { name: "Priority Support", included: true, detail: "Email" },
        ],
        cta: "Pilih UMKM",
        ctaHref: "/login?plan=umkm",
    },
    {
        name: "UMKM & Online Shop",
        description: "Untuk bisnis dengan toko online",
        monthlyPrice: 199000,
        yearlyPrice: 1990000,
        icon: Crown,
        color: "from-green-500 to-emerald-600",
        popular: false,
        features: [
            { name: "Dashboard Analytics", included: true, detail: "Full + Real-time" },
            { name: "Tracking Produk", included: true, detail: "Unlimited" },
            { name: "Database Customer", included: true, detail: "Unlimited" },
            { name: "AI Sales Prediction", included: true, detail: "30 hari" },
            { name: "AI Marketing Content", included: true, detail: "Unlimited" },
            { name: "WhatsApp Integration", included: true, detail: "+ Broadcast" },
            { name: "Export Laporan", included: true, detail: "PDF + Excel" },
            { name: "Priority Support", included: true, detail: "WhatsApp 24/7" },
        ],
        cta: "Pilih UMKM & Online",
        ctaHref: "/login?plan=umkm_online",
    },
];

export default function PricingPage() {
    const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>("monthly");

    const formatPrice = (price: number) => {
        if (price === 0) return "Gratis";
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(price);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
            {/* Header */}
            <header className="bg-white/80 backdrop-blur-xl border-b border-slate-100 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
                            <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold text-slate-900">Nulls</span>
                    </Link>
                    <Link
                        href="/login"
                        className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-full hover:shadow-lg transition-all"
                    >
                        Masuk
                    </Link>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-16">
                {/* Hero */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-bold mb-6">
                        <Star className="w-4 h-4" />
                        Harga Transparan, Tanpa Biaya Tersembunyi
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6">
                        Pilih Paket yang <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                            Sesuai Bisnis Anda
                        </span>
                    </h1>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                        Mulai gratis dan upgrade kapan saja. Semua paket termasuk akses ke fitur dasar dashboard.
                    </p>
                </div>

                {/* Billing Toggle */}
                <div className="flex items-center justify-center gap-4 mb-12">
                    <span className={`font-medium ${billingPeriod === "monthly" ? "text-slate-900" : "text-slate-400"}`}>
                        Bulanan
                    </span>
                    <button
                        onClick={() => setBillingPeriod(billingPeriod === "monthly" ? "yearly" : "monthly")}
                        className={`relative w-16 h-8 rounded-full transition-colors ${billingPeriod === "yearly" ? "bg-indigo-600" : "bg-slate-300"
                            }`}
                    >
                        <div
                            className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform ${billingPeriod === "yearly" ? "translate-x-9" : "translate-x-1"
                                }`}
                        />
                    </button>
                    <span className={`font-medium ${billingPeriod === "yearly" ? "text-slate-900" : "text-slate-400"}`}>
                        Tahunan
                    </span>
                    {billingPeriod === "yearly" && (
                        <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-bold rounded-full">
                            Hemat 17%
                        </span>
                    )}
                </div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {PRICING_TIERS.map((tier, i) => (
                        <div
                            key={i}
                            className={`relative group ${tier.popular ? "md:-mt-4 md:mb-4" : ""}`}
                        >
                            {tier.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-bold rounded-full shadow-lg">
                                    PALING POPULER
                                </div>
                            )}
                            <div
                                className={`relative h-full bg-white rounded-3xl border-2 ${tier.popular ? "border-indigo-500 shadow-2xl shadow-indigo-100" : "border-slate-200"
                                    } p-8 transition-all hover:shadow-xl hover:-translate-y-1`}
                            >
                                {/* Header */}
                                <div className="mb-6">
                                    <div className={`w-14 h-14 bg-gradient-to-br ${tier.color} rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg`}>
                                        <tier.icon className="w-7 h-7" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900">{tier.name}</h3>
                                    <p className="text-slate-500 text-sm mt-1">{tier.description}</p>
                                </div>

                                {/* Price */}
                                <div className="mb-6">
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-4xl font-black text-slate-900">
                                            {formatPrice(billingPeriod === "monthly" ? tier.monthlyPrice : tier.yearlyPrice)}
                                        </span>
                                        {tier.monthlyPrice > 0 && (
                                            <span className="text-slate-500">/{billingPeriod === "monthly" ? "bulan" : "tahun"}</span>
                                        )}
                                    </div>
                                </div>

                                {/* CTA */}
                                <Link
                                    href={tier.ctaHref}
                                    className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-all ${tier.popular
                                            ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg"
                                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                                        }`}
                                >
                                    {tier.cta}
                                    <ArrowRight className="w-4 h-4" />
                                </Link>

                                {/* Features */}
                                <div className="mt-8 pt-8 border-t border-slate-100">
                                    <p className="text-sm font-semibold text-slate-900 mb-4">Yang didapat:</p>
                                    <ul className="space-y-3">
                                        {tier.features.map((feature, j) => (
                                            <li key={j} className="flex items-start gap-3">
                                                {feature.included ? (
                                                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                                        <Check className="w-3 h-3 text-green-600" />
                                                    </div>
                                                ) : (
                                                    <div className="w-5 h-5 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                                        <X className="w-3 h-3 text-slate-400" />
                                                    </div>
                                                )}
                                                <div>
                                                    <span className={feature.included ? "text-slate-700" : "text-slate-400"}>
                                                        {feature.name}
                                                    </span>
                                                    {feature.detail && feature.included && (
                                                        <span className="ml-2 text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                                                            {feature.detail}
                                                        </span>
                                                    )}
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* FAQ Section */}
                <div className="mt-24 text-center">
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">Pertanyaan Umum</h2>
                    <p className="text-slate-600 mb-12">Jawaban untuk pertanyaan yang sering diajukan</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left max-w-4xl mx-auto">
                        {[
                            {
                                q: "Apakah ada uji coba gratis?",
                                a: "Ya! Paket Basic sepenuhnya gratis dan bisa digunakan selamanya. Anda bisa upgrade kapan saja.",
                            },
                            {
                                q: "Bagaimana cara pembayaran?",
                                a: "Kami menerima transfer bank, e-wallet (OVO, GoPay, DANA), dan kartu kredit/debit.",
                            },
                            {
                                q: "Bisakah saya downgrade paket?",
                                a: "Tentu! Anda bisa downgrade kapan saja. Perubahan akan berlaku di periode berikutnya.",
                            },
                            {
                                q: "Apakah data saya aman?",
                                a: "Keamanan adalah prioritas kami. Semua data dienkripsi dan disimpan di server yang aman.",
                            },
                        ].map((faq, i) => (
                            <div key={i} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                                <h3 className="font-bold text-slate-900 mb-2">{faq.q}</h3>
                                <p className="text-slate-600 text-sm">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA Section */}
                <div className="mt-24 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl p-12 text-center text-white">
                    <h2 className="text-3xl font-bold mb-4">Siap untuk memulai?</h2>
                    <p className="text-indigo-100 mb-8 max-w-xl mx-auto">
                        Bergabung dengan ribuan UMKM Indonesia yang sudah menggunakan Nulls untuk mengembangkan bisnis mereka.
                    </p>
                    <Link
                        href="/login"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-white text-indigo-600 font-bold rounded-full hover:shadow-2xl transition-all hover:scale-105"
                    >
                        Mulai Sekarang - Gratis
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </main>

            {/* Footer */}
            <footer className="border-t border-slate-100 py-8 mt-16">
                <div className="max-w-7xl mx-auto px-6 text-center text-slate-500 text-sm">
                    © 2026 Nulls by Arland Jova. All rights reserved.
                </div>
            </footer>
        </div>
    );
}
