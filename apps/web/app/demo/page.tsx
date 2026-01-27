"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, BarChart3, TrendingUp, Wallet, Box, Sparkles, ArrowUpRight, ArrowDownRight } from "lucide-react";

// Dummy Data for Demo Mode
const DEMO_STATS = [
    { label: "Total Penjualan", value: "Rp 47.500.000", change: "+12.5%", trend: "up", icon: BarChart3, color: "from-blue-500 to-cyan-500" },
    { label: "Laba Bersih", value: "Rp 12.350.000", change: "+8.2%", trend: "up", icon: TrendingUp, color: "from-green-500 to-emerald-500" },
    { label: "Pengeluaran", value: "Rp 35.150.000", change: "-3.1%", trend: "down", icon: Wallet, color: "from-orange-500 to-amber-500" },
    { label: "Total Produk", value: "156 Item", change: "+5", trend: "up", icon: Box, color: "from-purple-500 to-pink-500" },
];

const DEMO_TRANSACTIONS = [
    { id: 1, customer: "Budi Santoso", product: "Keripik Pedas 500g", amount: 250000, date: "Hari ini" },
    { id: 2, customer: "Siti Rahayu", product: "Sambal Terasi 250ml", amount: 85000, date: "Hari ini" },
    { id: 3, customer: "Ahmad Wijaya", product: "Kopi Robusta 1kg", amount: 175000, date: "Kemarin" },
    { id: 4, customer: "Dewi Lestari", product: "Gula Aren Bubuk", amount: 120000, date: "Kemarin" },
    { id: 5, customer: "Rudi Hartono", product: "Minyak Kelapa Murni", amount: 95000, date: "2 hari lalu" },
];

const DEMO_PRODUCTS = [
    { name: "Keripik Pedas 500g", stock: 45, status: "Tersedia" },
    { name: "Sambal Terasi 250ml", stock: 12, status: "Stok Rendah" },
    { name: "Kopi Robusta 1kg", stock: 78, status: "Tersedia" },
    { name: "Gula Aren Bubuk", stock: 5, status: "Hampir Habis" },
];

const DEMO_FORECAST = [
    { day: "Sen", value: 6500000 },
    { day: "Sel", value: 7200000 },
    { day: "Rab", value: 5800000 },
    { day: "Kam", value: 8100000 },
    { day: "Jum", value: 9500000 },
    { day: "Sab", value: 11200000 },
    { day: "Min", value: 8900000 },
];

export default function DemoPage() {
    const [activeTab, setActiveTab] = useState<"dashboard" | "products" | "finance">("dashboard");

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
            {/* Demo Banner */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-6 text-center">
                <div className="flex items-center justify-center gap-2 text-sm font-medium">
                    <Sparkles className="w-4 h-4" />
                    <span>Mode Demo - Data ini adalah contoh. <Link href="/login" className="underline hover:no-underline">Daftar gratis</Link> untuk data bisnis Anda.</span>
                </div>
            </div>

            {/* Header */}
            <header className="bg-white/80 backdrop-blur-xl border-b border-slate-100 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition-colors">
                            <ArrowLeft className="w-5 h-5" />
                            <span className="font-medium">Kembali</span>
                        </Link>
                        <div className="h-6 w-px bg-slate-200" />
                        <div className="flex items-center gap-3">
                            <Image
                                src="/logo.png"
                                alt="Nulls Logo"
                                width={32}
                                height={32}
                                className="w-8 h-8 object-contain"
                            />
                            <h1 className="text-xl font-bold text-slate-900">Demo Dashboard</h1>
                        </div>
                    </div>
                    <Link href="/login" className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-full hover:shadow-lg transition-all">
                        Mulai Gratis
                    </Link>
                </div>
            </header>

            {/* Tab Navigation */}
            <div className="max-w-7xl mx-auto px-6 pt-6">
                <div className="flex gap-2 bg-white/60 backdrop-blur-sm p-1.5 rounded-xl w-fit border border-slate-200">
                    {[
                        { id: "dashboard", label: "Dashboard", icon: BarChart3 },
                        { id: "products", label: "Produk", icon: Box },
                        { id: "finance", label: "Keuangan", icon: Wallet },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as typeof activeTab)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${activeTab === tab.id
                                ? "bg-white text-indigo-600 shadow-sm"
                                : "text-slate-600 hover:text-slate-900"
                                }`}
                        >
                            <tab.icon className="w-4 h-4" />
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content */}
            <main className="max-w-7xl mx-auto px-6 py-8">
                {activeTab === "dashboard" && (
                    <div className="space-y-8">
                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {DEMO_STATS.map((stat, i) => (
                                <div key={i} className="relative group">
                                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity`} />
                                    <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center text-white shadow-lg`}>
                                                <stat.icon className="w-6 h-6" />
                                            </div>
                                            <div className={`flex items-center gap-1 text-sm font-bold ${stat.trend === "up" ? "text-green-600" : "text-red-500"}`}>
                                                {stat.trend === "up" ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                                                {stat.change}
                                            </div>
                                        </div>
                                        <p className="text-sm text-slate-500 mb-1">{stat.label}</p>
                                        <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* AI Forecast */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-2 bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg">
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-900">Prediksi Penjualan (AI)</h3>
                                        <p className="text-sm text-slate-500">Perkiraan 7 hari ke depan</p>
                                    </div>
                                    <div className="flex items-center gap-2 px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                                        <Sparkles className="w-3 h-3" />
                                        Akurasi 94%
                                    </div>
                                </div>
                                <div className="flex items-end gap-3 h-48 pt-4">
                                    {DEMO_FORECAST.map((item, i) => {
                                        const maxValue = 12000000;
                                        const heightPercent = Math.round((item.value / maxValue) * 100);
                                        return (
                                            <div key={i} className="flex-1 flex flex-col items-center justify-end h-full">
                                                <div className="w-full flex flex-col items-center justify-end" style={{ height: '160px' }}>
                                                    <div
                                                        className={`w-full rounded-t-lg transition-all hover:opacity-80 ${i === 5 ? "bg-gradient-to-t from-indigo-500 to-purple-500" : "bg-gradient-to-t from-indigo-200 to-indigo-400"
                                                            }`}
                                                        style={{ height: `${heightPercent}%`, minHeight: '20px' }}
                                                    />
                                                </div>
                                                <span className="text-xs font-medium text-slate-600 mt-2">{item.day}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-white">
                                <div className="flex items-center gap-2 mb-4">
                                    <Sparkles className="w-5 h-5 text-indigo-400" />
                                    <h3 className="font-bold">AI Insight</h3>
                                </div>
                                <p className="text-slate-300 text-sm mb-4">
                                    Berdasarkan pola penjualan Anda, hari <strong className="text-white">Sabtu</strong> adalah peak day dengan estimasi omzet <strong className="text-green-400">Rp 11.2 juta</strong>.
                                </p>
                                <div className="p-4 bg-white/10 rounded-xl">
                                    <p className="text-xs text-slate-400 mb-1">Total Prediksi Minggu Ini</p>
                                    <p className="text-2xl font-bold">Rp 57.200.000</p>
                                </div>
                            </div>
                        </div>

                        {/* Recent Transactions */}
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg">
                            <h3 className="text-lg font-bold text-slate-900 mb-4">Transaksi Terbaru</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-slate-100">
                                            <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Customer</th>
                                            <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Produk</th>
                                            <th className="text-right py-3 px-4 text-sm font-semibold text-slate-600">Jumlah</th>
                                            <th className="text-right py-3 px-4 text-sm font-semibold text-slate-600">Waktu</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {DEMO_TRANSACTIONS.map((tx) => (
                                            <tr key={tx.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                                                <td className="py-3 px-4 font-medium text-slate-900">{tx.customer}</td>
                                                <td className="py-3 px-4 text-slate-600">{tx.product}</td>
                                                <td className="py-3 px-4 text-right font-semibold text-green-600">
                                                    +Rp {tx.amount.toLocaleString("id-ID")}
                                                </td>
                                                <td className="py-3 px-4 text-right text-sm text-slate-500">{tx.date}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "products" && (
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg">
                        <h3 className="text-lg font-bold text-slate-900 mb-4">Stok Produk</h3>
                        <div className="grid gap-4">
                            {DEMO_PRODUCTS.map((product, i) => (
                                <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold">
                                            {product.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-slate-900">{product.name}</p>
                                            <p className="text-sm text-slate-500">Stok: {product.stock} unit</p>
                                        </div>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${product.status === "Tersedia" ? "bg-green-100 text-green-700" :
                                        product.status === "Stok Rendah" ? "bg-yellow-100 text-yellow-700" :
                                            "bg-red-100 text-red-700"
                                        }`}>
                                        {product.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === "finance" && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg">
                                <h3 className="text-lg font-bold text-slate-900 mb-4">Ringkasan Keuangan</h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center py-3 border-b border-slate-100">
                                        <span className="text-slate-600">Total Pemasukan</span>
                                        <span className="font-bold text-green-600">Rp 47.500.000</span>
                                    </div>
                                    <div className="flex justify-between items-center py-3 border-b border-slate-100">
                                        <span className="text-slate-600">Total Pengeluaran</span>
                                        <span className="font-bold text-red-500">Rp 35.150.000</span>
                                    </div>
                                    <div className="flex justify-between items-center py-3">
                                        <span className="text-slate-900 font-semibold">Laba Bersih</span>
                                        <span className="font-bold text-2xl text-indigo-600">Rp 12.350.000</span>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-6 text-white">
                                <h3 className="font-bold mb-2">💡 Tips AI</h3>
                                <p className="text-indigo-100 text-sm">
                                    Margin laba Anda bulan ini adalah <strong className="text-white">26%</strong>. Pertimbangkan untuk mengurangi biaya operasional sebesar 5% untuk meningkatkan profitabilitas.
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
