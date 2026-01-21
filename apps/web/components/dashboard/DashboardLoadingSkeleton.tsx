import { DollarSign, Package, Users, BarChart3 } from 'lucide-react';

export function DashboardLoadingSkeleton() {
    const skeletonStats = [1, 2, 3, 4];
    const gradients = [
        'from-emerald-50 to-teal-50',
        'from-blue-50 to-cyan-50',
        'from-purple-50 to-pink-50',
        'from-orange-50 to-red-50'
    ];

    return (
        <div className="space-y-8 pb-10">
            {/* Stats Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {skeletonStats.map((_, index) => (
                    <div
                        key={index}
                        className="group relative animate-pulse"
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        {/* Glow effect */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${gradients[index]} rounded-3xl blur-xl opacity-50`} />

                        {/* Card */}
                        <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-white/50 shadow-lg">
                            <div className="flex items-start justify-between mb-4">
                                <div className="w-12 h-12 bg-slate-200 rounded-2xl" />
                                <div className="w-16 h-6 bg-slate-200 rounded-full" />
                            </div>
                            <div className="w-20 h-4 bg-slate-200 rounded mb-2" />
                            <div className="w-32 h-8 bg-slate-200 rounded" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Chart Section Skeleton */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
                {/* Sales Chart Skeleton */}
                <div className="xl:col-span-8 relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-100/50 to-purple-100/50 rounded-3xl blur-2xl opacity-50" />
                    <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-white/50 shadow-lg">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <div className="w-48 h-7 bg-slate-200 rounded mb-2" />
                                <div className="w-64 h-4 bg-slate-200 rounded" />
                            </div>
                            <div className="w-40 h-10 bg-slate-200 rounded-xl" />
                        </div>
                        <div className="h-[350px] bg-slate-100 rounded-2xl animate-pulse" />
                    </div>
                </div>

                {/* AI Forecast Widget Skeleton */}
                <div className="xl:col-span-4 relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-100/50 to-pink-100/50 rounded-3xl blur-2xl opacity-50" />
                    <div className="relative bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl p-8 shadow-2xl border border-white/20 h-full flex flex-col">
                        <div className="w-32 h-6 bg-white/20 rounded-lg mb-6" />
                        <div className="w-40 h-9 bg-white/20 rounded-lg mb-2" />
                        <div className="w-full h-24 bg-white/10 rounded-xl mb-8" />
                        <div className="w-full h-12 bg-white/20 rounded-xl" />
                    </div>
                </div>
            </div>

            {/* Quick Actions Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                    <div
                        key={i}
                        className="p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/50 shadow-sm animate-pulse"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-slate-200 rounded-xl" />
                            <div className="flex-1">
                                <div className="w-32 h-5 bg-slate-200 rounded mb-2" />
                                <div className="w-40 h-4 bg-slate-200 rounded" />
                            </div>
                            <div className="w-5 h-5 bg-slate-200 rounded" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
