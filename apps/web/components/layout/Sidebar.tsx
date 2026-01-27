"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Box, Wallet, Megaphone, Sparkles, Users, BarChart3, House } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

const MENU_ITEMS = [
    { name: 'Dashboard', icon: Home, href: '/dashboard' },
    { name: 'Inventaris', icon: Box, href: '/inventory' },
    { name: 'Keuangan', icon: Wallet, href: '/finance' },
    { name: 'Marketing', icon: Megaphone, href: '/marketing' },
    { name: 'Customer', icon: Users, href: '/customers' },
    { name: 'Analytics', icon: BarChart3, href: '/analytics' },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="fixed left-4 top-4 bottom-4 w-20 bg-white/80 backdrop-blur-xl border border-white/50 rounded-3xl shadow-2xl flex flex-col items-center py-6 z-50">
            {/* Logo with animated glow */}
            <div className="mb-8">
                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl blur-lg opacity-75 animate-glow" />
                    <div className="relative w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl">
                        <Sparkles className="w-6 h-6 text-white" />
                    </div>
                </div>
            </div>

            {/* Home button */}
            <div className="mb-4 relative group">
                <Link
                    href="/"
                    className="relative flex items-center justify-center w-14 h-14 rounded-2xl transition-all duration-300 text-slate-400 hover:bg-slate-50 hover:text-indigo-600 hover:scale-105"
                >
                    <House className="w-6 h-6 transition-transform group-hover:scale-110" />
                </Link>

                {/* Tooltip */}
                <div className="absolute left-20 top-1/2 -translate-y-1/2 px-3 py-2 bg-slate-900 text-white text-xs rounded-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50 shadow-lg">
                    Ke Landing Page
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-slate-900 rotate-45" />
                </div>
            </div>

            {/* Menu items */}
            <nav className="flex flex-col gap-3 flex-1">
                {MENU_ITEMS.map((item, index) => {
                    const isActive = pathname === item.href;
                    return (
                        <div key={item.name} className="relative group">
                            <Link
                                href={item.href}
                                className={twMerge(
                                    "relative flex items-center justify-center w-14 h-14 rounded-2xl transition-all duration-300",
                                    isActive
                                        ? "bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-lg scale-110"
                                        : "text-slate-400 hover:bg-slate-50 hover:text-indigo-600 hover:scale-105"
                                )}
                                style={{ animationDelay: `${index * 50}ms` }}
                            >
                                <item.icon className="w-6 h-6 transition-transform group-hover:scale-110" />

                                {/* Active indicator */}
                                {isActive && (
                                    <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-indigo-600 to-purple-600 rounded-full" />
                                )}
                            </Link>

                            {/* Tooltip */}
                            <div className="absolute left-20 top-1/2 -translate-y-1/2 px-3 py-2 bg-slate-900 text-white text-xs rounded-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50 shadow-lg">
                                {item.name}
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-slate-900 rotate-45" />
                            </div>
                        </div>
                    );
                })}
            </nav>

            {/* Bottom decoration */}
            <div className="mt-auto">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-xl bg-white shadow-sm flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    </div>
                </div>
            </div>
        </aside>
    );
}
