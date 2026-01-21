import Link from 'next/link';
import { Suspense } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Package, Users, ArrowUpRight, BarChart3, Zap } from 'lucide-react';
import { SalesChartWrapper } from '@/components/dashboard/SalesChartWrapper';
import { DashboardLoadingSkeleton } from '@/components/dashboard/DashboardLoadingSkeleton';
import { getUserSubscription } from '@/app/actions/user';
import { getForecastData, getDashboardStats } from '@/app/actions/dashboard';

async function DashboardContent() {
    const subscriptionPlan = await getUserSubscription();

    // Fetch real dashboard statistics
    const dashboardStats = await getDashboardStats();

    // Format stats for display
    const stats = dashboardStats ? [
        {
            name: 'Total Pendapatan',
            value: new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            }).format(dashboardStats.revenue.value),
            change: `${Number(dashboardStats.revenue.change) >= 0 ? '+' : ''}${dashboardStats.revenue.change}%`,
            trend: dashboardStats.revenue.trend,
            icon: DollarSign,
            gradient: 'from-emerald-500 to-teal-500',
            bgGradient: 'from-emerald-50 to-teal-50'
        },
        {
            name: 'Total Pesanan',
            value: dashboardStats.orders.value.toString(),
            change: `${Number(dashboardStats.orders.change) >= 0 ? '+' : ''}${dashboardStats.orders.change}%`,
            trend: dashboardStats.orders.trend,
            icon: Package,
            gradient: 'from-blue-500 to-cyan-500',
            bgGradient: 'from-blue-50 to-cyan-50'
        },
        {
            name: 'Pelanggan Unik',
            value: dashboardStats.users.value.toString(),
            change: `${Number(dashboardStats.users.change) >= 0 ? '+' : ''}${dashboardStats.users.change}%`,
            trend: dashboardStats.users.trend,
            icon: Users,
            gradient: 'from-purple-500 to-pink-500',
            bgGradient: 'from-purple-50 to-pink-50'
        },
        {
            name: 'Tingkat Konversi',
            value: `${dashboardStats.conversionRate.value}%`,
            change: `${Number(dashboardStats.conversionRate.change) >= 0 ? '+' : ''}${dashboardStats.conversionRate.change}%`,
            trend: dashboardStats.conversionRate.trend,
            icon: BarChart3,
            gradient: 'from-orange-500 to-red-500',
            bgGradient: 'from-orange-50 to-red-50'
        },
    ] : [
        // Fallback to empty state values
        {
            name: 'Total Pendapatan',
            value: 'Rp 0',
            change: '0.0%',
            trend: 'up' as const,
            icon: DollarSign,
            gradient: 'from-emerald-500 to-teal-500',
            bgGradient: 'from-emerald-50 to-teal-50'
        },
        {
            name: 'Total Pesanan',
            value: '0',
            change: '0.0%',
            trend: 'up' as const,
            icon: Package,
            gradient: 'from-blue-500 to-cyan-500',
            bgGradient: 'from-blue-50 to-cyan-50'
        },
        {
            name: 'Pelanggan Unik',
            value: '0',
            change: '0.0%',
            trend: 'up' as const,
            icon: Users,
            gradient: 'from-purple-500 to-pink-500',
            bgGradient: 'from-purple-50 to-pink-50'
        },
        {
            name: 'Tingkat Konversi',
            value: '0.00%',
            change: '0.0%',
            trend: 'up' as const,
            icon: BarChart3,
            gradient: 'from-orange-500 to-red-500',
            bgGradient: 'from-orange-50 to-red-50'
        },
    ];

    // Fetch AI Forecast
    const forecast = await getForecastData();
    const predictedRevenue = forecast ? forecast.reduce((a: number, b: number) => a + b, 0) : 0;
    const hasForecast = !!forecast;

    return (
        <div className="space-y-8 pb-10">

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <div
                        key={stat.name}
                        className="group relative animate-slide-up"
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        {/* Glow effect */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                        {/* Card */}
                        <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-white/50 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                            <div className="flex items-start justify-between mb-4">
                                <div className={`p-3 bg-gradient-to-br ${stat.gradient} rounded-2xl shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                                    <stat.icon className="w-6 h-6 text-white" />
                                </div>
                                <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${stat.trend === 'up'
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-red-100 text-red-700'
                                    }`}>
                                    {stat.trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                                    {stat.change}
                                </div>
                            </div>
                            <p className="text-sm text-slate-500 font-medium mb-1">{stat.name}</p>
                            <h3 className="text-3xl font-black text-slate-900">{stat.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Chart Section */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">

                {/* Sales Performance Chart */}
                <SalesChartWrapper subscriptionPlan={subscriptionPlan} />

                {/* AI Forecast Widget */}
                <div className="xl:col-span-4 relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-100/50 to-pink-100/50 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl p-8 shadow-2xl border border-white/20 h-full flex flex-col hover:scale-[1.02] transition-all duration-500">
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay rounded-3xl" />

                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-6">
                                <div className="p-2 bg-white/10 backdrop-blur-sm rounded-xl">
                                    <Zap className="w-5 h-5 text-white" />
                                </div>
                                <span className="text-xs font-bold text-white/80 uppercase tracking-wider">Prediksi AI</span>
                            </div>

                            <h3 className="text-3xl font-black text-white mb-2">Minggu Depan</h3>
                            {hasForecast ? (
                                <>
                                    <p className="text-white/80 text-sm mb-8">AI memprediksi total pendapatan Anda 7 hari ke depan.</p>

                                    <div className="space-y-4 mb-8">
                                        <div className="flex items-center justify-between p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                                            <div>
                                                <p className="text-xs text-white/70 mb-1">Pendapatan Diprediksi</p>
                                                <p className="text-xl font-bold text-white">
                                                    {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(predictedRevenue)}
                                                </p>
                                            </div>
                                            <span className="text-xs font-bold text-green-400 bg-green-400/20 px-2 py-1 rounded-lg">
                                                AI
                                            </span>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 mb-8">
                                    <p className="text-white text-sm">
                                        Data transaksi belum cukup untuk prediksi AI. Minimal diperlukan 30 hari data historis.
                                    </p>
                                </div>
                            )}

                            <Link
                                href="/finance"
                                className="w-full py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl text-white font-semibold text-sm border border-white/30 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                            >
                                Lihat Laporan Lengkap
                                <ArrowUpRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    {
                        title: 'Tambah Produk',
                        desc: 'Perluas inventaris Anda',
                        icon: Package,
                        gradient: 'from-blue-500 to-cyan-500',
                        href: '/inventory'
                    },
                    {
                        title: 'Buat Laporan',
                        desc: 'Lihat wawasan keuangan',
                        icon: BarChart3,
                        gradient: 'from-green-500 to-emerald-500',
                        href: '/finance'
                    },
                    {
                        title: 'Buat Kampanye',
                        desc: 'Marketing berbasis AI',
                        icon: Zap,
                        gradient: 'from-purple-500 to-pink-500',
                        href: '/marketing'
                    },
                ].map((action, i) => (
                    <a
                        key={i}
                        href={action.href}
                        className="group relative p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/50 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                    >
                        <div className="flex items-center gap-4">
                            <div className={`p-3 bg-gradient-to-br ${action.gradient} rounded-xl shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                                <action.icon className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-slate-900 mb-0.5">{action.title}</h4>
                                <p className="text-xs text-slate-500">{action.desc}</p>
                            </div>
                            <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                        </div>
                    </a>
                ))}
            </div>

        </div>
    );
}
