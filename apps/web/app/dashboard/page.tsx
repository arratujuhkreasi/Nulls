import Link from 'next/link';
import { Suspense } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Package, Users, ArrowUpRight, BarChart3, Zap } from 'lucide-react';
import { SalesChartWrapper } from '@/components/dashboard/SalesChartWrapper';
import { DashboardLoadingSkeleton } from '@/components/dashboard/DashboardLoadingSkeleton';
import { TopCustomersWidget } from '@/components/dashboard/TopCustomersWidget';
import { BestProductsWidget } from '@/components/dashboard/BestProductsWidget';
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

    return (
        <div className="space-y-8 pb-10">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className="group relative animate-slide-up"
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        {/* Glow effect */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity`} />

                        {/* Card */}
                        <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-white/50 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                            <div className="flex items-start justify-between mb-4">
                                <div className={`p-3 bg-gradient-to-br ${stat.gradient} rounded-2xl shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                                    <stat.icon className="w-6 h-6 text-white" />
                                </div>
                                <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${stat.trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                    }`}>
                                    {stat.trend === 'up' ? (
                                        <TrendingUp className="w-3 h-3" />
                                    ) : (
                                        <TrendingDown className="w-3 h-3" />
                                    )}
                                    {stat.change}
                                </div>
                            </div>
                            <p className="text-sm font-medium text-slate-600 mb-1">{stat.name}</p>
                            <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {/* Sales Performance Chart */}
            <SalesChartWrapper subscriptionPlan={subscriptionPlan} />

            {/* AI Insights Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
                {/* AI Forecast */}
                <div className="xl:col-span-4 relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity" />
                    <div className="relative bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-8 shadow-2xl">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
                                    <BarChart3 className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white">AI Revenue Forecast</h3>
                                    <p className="text-indigo-200 text-sm">Prediksi 7 hari ke depan</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-indigo-200 mb-1">Prediksi Total</p>
                                <p className="text-3xl font-bold text-white">
                                    {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(predictedRevenue)}
                                </p>
                            </div>
                        </div>

                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                            <p className="text-white/80 text-sm leading-relaxed">
                                🔮 <span className="font-semibold">AI kami memprediksi</span> peningkatan penjualan sebesar{' '}
                                <span className="font-bold text-white">{((predictedRevenue / (dashboardStats?.revenue.value || 1) - 1) * 100).toFixed(1)}%</span>{' '}
                                dalam 7 hari ke depan berdasarkan analisis pola historis dan tren pasar terkini.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-slate-100 to-slate-200 rounded-3xl blur-xl opacity-50" />
                <div className="relative bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-white/50 shadow-lg">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-slate-900 rounded-2xl">
                            <Zap className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-slate-900">Quick Actions</h3>
                            <p className="text-slate-500 text-sm">Akses fitur penting dengan cepat</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                            {
                                title: 'Tambah Produk',
                                desc: 'Kelola inventaris Anda',
                                icon: Package,
                                gradient: 'from-blue-500 to-cyan-500',
                                href: '/inventory'
                            },
                            {
                                title: 'Lihat Laporan Lengkap',
                                desc: 'Analisis keuangan mendalam',
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
            </div>

            {/* New Analytics Widgets */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <TopCustomersWidget />
                <BestProductsWidget />
            </div>

        </div>
    );
}

export default function Dashboard() {
    return (
        <Suspense fallback={<DashboardLoadingSkeleton />}>
            <DashboardContent />
        </Suspense>
    );
}
