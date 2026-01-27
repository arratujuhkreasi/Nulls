import { Users, TrendingUp, CreditCard, Activity } from "lucide-react";
import { getAdminStats } from "@/app/actions/admin";
import Link from "next/link";

export default async function AdminDashboard() {
    const stats = await getAdminStats();

    if (!stats) {
        return <div className="text-white">Loading...</div>;
    }

    const statCards = [
        {
            label: "Total Users",
            value: stats.totalUsers,
            icon: Users,
            color: "from-blue-500 to-cyan-500",
            href: "/admin/users"
        },
        {
            label: "New Signups (7d)",
            value: stats.recentSignups,
            icon: TrendingUp,
            color: "from-green-500 to-emerald-500",
            href: "/admin/users"
        },
        {
            label: "Basic Plan",
            value: stats.subscriptionCounts.basic,
            icon: CreditCard,
            color: "from-purple-500 to-pink-500",
            href: "/admin/users"
        },
        {
            label: "UMKM Plan",
            value: stats.subscriptionCounts.umkm + stats.subscriptionCounts.umkm_online,
            icon: Activity,
            color: "from-orange-500 to-red-500",
            href: "/admin/users"
        },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h2>
                <p className="text-slate-400">Monitor dan kelola semua aktivitas pengguna Nulls</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat, i) => (
                    <Link
                        key={i}
                        href={stat.href}
                        className="group relative"
                    >
                        <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity`} />
                        <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all">
                            <div className="flex items-start justify-between mb-4">
                                <div className={`p-3 bg-gradient-to-br ${stat.color} rounded-xl`}>
                                    <stat.icon className="w-6 h-6 text-white" />
                                </div>
                            </div>
                            <p className="text-sm text-slate-400 mb-1">{stat.label}</p>
                            <p className="text-3xl font-bold text-white">{stat.value}</p>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Subscription Breakdown */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-6">Subscription Breakdown</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { label: "Free", count: stats.subscriptionCounts.free, color: "bg-slate-500" },
                        { label: "Basic", count: stats.subscriptionCounts.basic, color: "bg-blue-500" },
                        { label: "UMKM", count: stats.subscriptionCounts.umkm, color: "bg-purple-500" },
                        { label: "UMKM & Online", count: stats.subscriptionCounts.umkm_online, color: "bg-green-500" },
                    ].map((item, i) => (
                        <div key={i} className="bg-white/5 rounded-xl p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <div className={`w-3 h-3 rounded-full ${item.color}`} />
                                <span className="text-sm text-slate-300">{item.label}</span>
                            </div>
                            <p className="text-2xl font-bold text-white">{item.count}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link
                    href="/admin/users"
                    className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-6 hover:shadow-2xl hover:shadow-indigo-500/20 transition-all group"
                >
                    <Users className="w-8 h-8 text-white mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">Kelola Users</h3>
                    <p className="text-indigo-200 text-sm">Lihat semua user, ubah subscription, dan kelola akses.</p>
                </Link>
                <Link
                    href="/pricing"
                    className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl p-6 hover:shadow-2xl hover:shadow-green-500/20 transition-all group"
                >
                    <CreditCard className="w-8 h-8 text-white mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">Lihat Pricing</h3>
                    <p className="text-green-200 text-sm">Preview halaman pricing yang dilihat user.</p>
                </Link>
            </div>
        </div>
    );
}
