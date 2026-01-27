"use client";

import { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Lock, Zap } from 'lucide-react';
import { getSalesForecast } from '@/app/actions/forecast';

interface SalesChartProps {
    subscriptionPlan: 'free' | 'monthly' | 'yearly';
    timeFrame?: 'monthly' | 'weekly';
}

export function SalesChart({ subscriptionPlan, timeFrame = 'monthly' }: SalesChartProps) {
    const isPro = subscriptionPlan !== 'free';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        // Determine number of days based on timeFrame
        const daysToShow = timeFrame === 'weekly' ? 7 : 30;

        // 1. Generate Mock History Data
        const mockHistory = Array.from({ length: daysToShow }, (_, i) => {
            const date = new Date();
            date.setDate(date.getDate() - (daysToShow - 1 - i));
            return {
                date: date.toLocaleDateString("id-ID", { month: 'short', day: 'numeric' }),
                sales: Math.floor(Math.random() * 5000) + 3000,
                isPrediction: false
            };
        });

        // 2. Decide on Prediction Data
        const fetchPrediction = async () => {
            if (isPro) {
                // Prepare history values for API (just the numbers)
                const historyValues = mockHistory.map(d => d.sales);

                // Call Server Action (which calls Python AI)
                const forecastValues = await getSalesForecast(historyValues);

                if (forecastValues && forecastValues.length === 7) {
                    // Use Real AI Result
                    const aiPrediction = forecastValues.map((val, i) => {
                        const date = new Date();
                        date.setDate(date.getDate() + (i + 1));
                        return {
                            date: date.toLocaleDateString("en-US", { month: 'short', day: 'numeric' }),
                            sales: val,
                            isPrediction: true
                        };
                    });
                    setData([...mockHistory, ...aiPrediction]);
                } else {
                    // Fallback to Mock Prediction if API fails
                    console.warn("Using Mock Prediction (AI Unavailable)");
                    const lastVal = mockHistory[mockHistory.length - 1].sales;
                    const mockPrediction = Array.from({ length: 7 }, (_, i) => {
                        const date = new Date();
                        date.setDate(date.getDate() + (i + 1));
                        return {
                            date: date.toLocaleDateString("en-US", { month: 'short', day: 'numeric' }),
                            sales: lastVal + (Math.random() * 2000 - 500),
                            isPrediction: true
                        };
                    });
                    setData([...mockHistory, ...mockPrediction]);
                }

            } else {
                // Free User: Generate blurred mock prediction
                const lastVal = mockHistory[mockHistory.length - 1].sales;
                const mockPrediction = Array.from({ length: 7 }, (_, i) => {
                    const date = new Date();
                    date.setDate(date.getDate() + (i + 1));
                    return {
                        date: date.toLocaleDateString("en-US", { month: 'short', day: 'numeric' }),
                        sales: lastVal + (Math.random() * 2000 - 500),
                        isPrediction: true
                    };
                });
                setData([...mockHistory, ...mockPrediction]);
            }
        };

        fetchPrediction();

    }, [isPro, timeFrame]);

    const processedData = data.map((d, index) => {
        const isHistory = !d.isPrediction;
        const isSwitchPoint = !d.isPrediction && data[index + 1]?.isPrediction;

        return {
            name: d.date,
            history: isHistory || isSwitchPoint ? d.sales : null,
            forecast: !isHistory ? d.sales : (isSwitchPoint ? d.sales : null)
        };
    });


    return (
        <div className="relative w-full h-full">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={processedData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorHistory" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#94a3b8', fontSize: 10 }}
                        interval={6}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#94a3b8', fontSize: 10 }}
                        tickFormatter={(value) => `$${value / 1000}k`}
                    />
                    <Tooltip
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        formatter={(value: any) => [`$${Number(value).toFixed(0)}`, 'Sales']}
                    />

                    <Area
                        type="monotone"
                        dataKey="history"
                        stroke="#6366f1"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorHistory)"
                    />

                    <Area
                        type="monotone"
                        dataKey="forecast"
                        stroke="#a855f7"
                        strokeWidth={3}
                        strokeDasharray="5 5"
                        fillOpacity={1}
                        fill="url(#colorForecast)"
                    />
                </AreaChart>
            </ResponsiveContainer>

            {/* Free Tier Overlay */}
            {!isPro && (
                <div className="absolute top-0 right-0 h-full w-[25%] bg-white/10 backdrop-blur-md border-l border-white/20 flex flex-col items-center justify-center text-center p-4 z-10 rounded-r-2xl">
                    <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center shadow-lg shadow-indigo-200 mb-2 animate-bounce">
                        <Lock className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="font-bold text-gray-900 text-sm">Unlock AI Forecast</h4>
                    <p className="text-[10px] text-gray-500 mb-3 leading-tight mt-1">
                        Predict sales trends for the next 7 days with AI.
                    </p>
                    <button className="px-3 py-1.5 bg-gray-900 text-white text-xs font-bold rounded-lg hover:bg-black transition-colors flex items-center gap-1">
                        <Zap className="w-3 h-3 text-yellow-400 fill-current" /> Go Pro
                    </button>
                </div>
            )}
        </div>
    );
}
