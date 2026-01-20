import { TrendingUp, TrendingDown, DollarSign, Package, Users, ArrowUpRight, BarChart3, Zap } from 'lucide-react';
import { SalesChart } from '@/components/dashboard/SalesChart';
import { getUserSubscription } from '@/app/actions/user';

export default async function Dashboard() {
    const subscriptionPlan = await getUserSubscription();

    const stats = [
        {
            name: 'Total Pendapatan',
            value: 'Rp 45.2M',
            change: '+12.5%',
            trend: 'up',
            icon: DollarSign,
            gradient: 'from-emerald-500 to-teal-500',
            bgGradient: 'from-emerald-50 to-teal-50'
        },
        {
            name: 'Total Pesanan',
            value: '1,234',
            change: '+8.2%',
            trend: 'up',
            icon: Package,
            gradient: 'from-blue-500 to-cyan-500',
            bgGradient: 'from-blue-50 to-cyan-50'
        },
        {
            name: 'Pengguna Aktif',
            value: '8,549',
            change: '+22.1%',
            trend: 'up',
            icon: Users,
            gradient: 'from-purple-500 to-pink-500',
            bgGradient: 'from-purple-50 to-pink-50'
        },
        {
            name: 'Tingkat Konversi',
            value: '3.24%',
            change: '-1.2%',
            trend: 'down',
            icon: BarChart3,
            gradient: 'from-orange-500 to-red-500',
            bgGradient: 'from-orange-50 to-red-50'
        },
    ];

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
                <div className="xl:col-span-8 relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-100/50 to-purple-100/50 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-white/50 shadow-lg hover:shadow-2xl transition-all duration-500">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900 mb-1">Performa Penjualan</h2>
                                <p className="text-sm text-slate-500 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                    Data langsung • Diperbarui 2 menit lalu
                                </p>
                            </div>

                            <div className="flex items-center gap-2 bg-slate-50 p-1 rounded-xl">
                                <button className="px-4 py-2 bg-white rounded-lg shadow-sm text-xs font-bold text-slate-800 transition-all hover:scale-105">
                                    Bulanan
                                </button>
                                <button className="px-4 py-2 hover:bg-white/50 rounded-lg text-xs font-medium text-slate-500 transition-all hover:scale-105">
                                    Mingguan
                                </button>
                            </div>
                        </div>

                        <div className="h-[350px]">
                            <SalesChart subscriptionPlan={subscriptionPlan} />
                        </div>
                    </div>
                </div>

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
                            <p className="text-white/80 text-sm mb-8">AI memprediksi pertumbuhan kuat berdasarkan tren saat ini</p>

                            <div className="space-y-4 mb-8">
                                {[
                                    { label: 'Pendapatan Diprediksi', value: 'Rp 52.8M', percent: '+16.8%' },
                                    { label: 'Pesanan Diharapkan', value: '1,456', percent: '+18.0%' },
                                    { label: 'Tingkat Pertumbuhan', value: '24.5%', percent: '+2.4%' },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center justify-between p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                                        <div>
                                            <p className="text-xs text-white/70 mb-1">{item.label}</p>
                                            <p className="text-xl font-bold text-white">{item.value}</p>
                                        </div>
                                        <span className="text-xs font-bold text-green-400 bg-green-400/20 px-2 py-1 rounded-lg">
                                            {item.percent}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <button className="w-full py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl text-white font-semibold text-sm border border-white/30 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2">
                                Lihat Laporan Lengkap
                                <ArrowUpRight className="w-4 h-4" />
                            </button>
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
