'use client';

import { useState } from 'react';
import { SalesChart } from './SalesChart';

type TimeFrame = 'monthly' | 'weekly';

interface SalesChartWrapperProps {
    subscriptionPlan: string;
}

export function SalesChartWrapper({ subscriptionPlan }: SalesChartWrapperProps) {
    const [timeFrame, setTimeFrame] = useState<TimeFrame>('monthly');

    return (
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
                        <button
                            onClick={() => setTimeFrame('monthly')}
                            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all hover:scale-105 ${timeFrame === 'monthly'
                                    ? 'bg-white shadow-sm text-slate-800'
                                    : 'text-slate-500 hover:text-slate-700'
                                }`}
                        >
                            Bulanan
                        </button>
                        <button
                            onClick={() => setTimeFrame('weekly')}
                            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all hover:scale-105 ${timeFrame === 'weekly'
                                    ? 'bg-white shadow-sm text-slate-800'
                                    : 'text-slate-500 hover:text-slate-700'
                                }`}
                        >
                            Mingguan
                        </button>
                    </div>
                </div>

                <div className="h-[350px]">
                    <SalesChart subscriptionPlan={subscriptionPlan} timeFrame={timeFrame} />
                </div>
            </div>
        </div>
    );
}
