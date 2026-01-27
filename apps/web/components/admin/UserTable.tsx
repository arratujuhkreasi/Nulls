"use client";

import { useState } from "react";
import { UserProfile, SubscriptionPlan, updateUserSubscription, toggleAdminStatus } from "@/app/actions/admin";
import { Search, Shield, ShieldOff, Crown, Users, Sparkles, Store } from "lucide-react";

const PLAN_LABELS: Record<SubscriptionPlan, { label: string; color: string; icon: React.ReactNode }> = {
    free: { label: "Free", color: "bg-slate-500", icon: <Users className="w-3 h-3" /> },
    basic: { label: "Basic", color: "bg-blue-500", icon: <Sparkles className="w-3 h-3" /> },
    umkm: { label: "UMKM", color: "bg-purple-500", icon: <Crown className="w-3 h-3" /> },
    umkm_online: { label: "UMKM & Online", color: "bg-green-500", icon: <Store className="w-3 h-3" /> },
};

export function UserTable({ initialUsers }: { initialUsers: UserProfile[] }) {
    const [users, setUsers] = useState(initialUsers);
    const [search, setSearch] = useState("");
    const [filterPlan, setFilterPlan] = useState<SubscriptionPlan | "all">("all");
    const [loading, setLoading] = useState<string | null>(null);

    const filteredUsers = users.filter(user => {
        const matchesSearch =
            user.email?.toLowerCase().includes(search.toLowerCase()) ||
            user.full_name?.toLowerCase().includes(search.toLowerCase());
        const matchesPlan = filterPlan === "all" || user.subscription_plan === filterPlan;
        return matchesSearch && matchesPlan;
    });

    const handlePlanChange = async (userId: string, newPlan: SubscriptionPlan) => {
        setLoading(userId);
        const result = await updateUserSubscription(userId, newPlan);
        if (result.success) {
            setUsers(prev => prev.map(u =>
                u.id === userId ? { ...u, subscription_plan: newPlan } : u
            ));
        } else {
            alert(result.error);
        }
        setLoading(null);
    };

    const handleAdminToggle = async (userId: string, currentStatus: boolean) => {
        setLoading(userId);
        const result = await toggleAdminStatus(userId, !currentStatus);
        if (result.success) {
            setUsers(prev => prev.map(u =>
                u.id === userId ? { ...u, is_admin: !currentStatus } : u
            ));
        } else {
            alert(result.error);
        }
        setLoading(null);
    };

    return (
        <div className="space-y-6">
            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Cari user berdasarkan nama atau email..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
                    />
                </div>
                <select
                    value={filterPlan}
                    onChange={(e) => setFilterPlan(e.target.value as SubscriptionPlan | "all")}
                    className="px-4 py-3 bg-white/10 border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                >
                    <option value="all" className="bg-slate-800">Semua Plan</option>
                    <option value="free" className="bg-slate-800">Free</option>
                    <option value="basic" className="bg-slate-800">Basic</option>
                    <option value="umkm" className="bg-slate-800">UMKM</option>
                    <option value="umkm_online" className="bg-slate-800">UMKM & Online</option>
                </select>
            </div>

            {/* Stats */}
            <div className="text-sm text-slate-400">
                Menampilkan {filteredUsers.length} dari {users.length} user
            </div>

            {/* Table */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-white/10">
                            <th className="text-left py-4 px-6 text-sm font-semibold text-slate-300">User</th>
                            <th className="text-left py-4 px-6 text-sm font-semibold text-slate-300">Subscription</th>
                            <th className="text-left py-4 px-6 text-sm font-semibold text-slate-300">Joined</th>
                            <th className="text-left py-4 px-6 text-sm font-semibold text-slate-300">Last Login</th>
                            <th className="text-right py-4 px-6 text-sm font-semibold text-slate-300">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user) => {
                            const plan = PLAN_LABELS[user.subscription_plan || 'free'];
                            return (
                                <tr key={user.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                                                {user.full_name?.charAt(0) || user.email?.charAt(0) || "?"}
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <p className="font-medium text-white">{user.full_name || "No Name"}</p>
                                                    {user.is_admin && (
                                                        <span className="px-2 py-0.5 bg-red-500/20 text-red-400 text-xs font-bold rounded-full">
                                                            ADMIN
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-sm text-slate-400">{user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <select
                                            value={user.subscription_plan || 'free'}
                                            onChange={(e) => handlePlanChange(user.id, e.target.value as SubscriptionPlan)}
                                            disabled={loading === user.id}
                                            className={`px-3 py-1.5 rounded-lg text-xs font-bold text-white ${plan.color} border-0 focus:outline-none focus:ring-2 focus:ring-white/20 disabled:opacity-50`}
                                        >
                                            <option value="free">Free</option>
                                            <option value="basic">Basic</option>
                                            <option value="umkm">UMKM</option>
                                            <option value="umkm_online">UMKM & Online</option>
                                        </select>
                                    </td>
                                    <td className="py-4 px-6 text-sm text-slate-400">
                                        {new Date(user.created_at).toLocaleDateString('id-ID', {
                                            day: 'numeric',
                                            month: 'short',
                                            year: 'numeric'
                                        })}
                                    </td>
                                    <td className="py-4 px-6 text-sm text-slate-400">
                                        {user.last_login_at
                                            ? new Date(user.last_login_at).toLocaleDateString('id-ID', {
                                                day: 'numeric',
                                                month: 'short',
                                                year: 'numeric'
                                            })
                                            : "Never"
                                        }
                                    </td>
                                    <td className="py-4 px-6 text-right">
                                        <button
                                            onClick={() => handleAdminToggle(user.id, user.is_admin)}
                                            disabled={loading === user.id}
                                            className={`p-2 rounded-lg transition-colors disabled:opacity-50 ${user.is_admin
                                                    ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                                                    : "bg-white/10 text-slate-400 hover:bg-white/20"
                                                }`}
                                            title={user.is_admin ? "Remove Admin" : "Make Admin"}
                                        >
                                            {user.is_admin ? <ShieldOff className="w-4 h-4" /> : <Shield className="w-4 h-4" />}
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
