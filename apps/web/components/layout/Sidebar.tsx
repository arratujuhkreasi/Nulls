"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Box, ShoppingCart, Wallet, Megaphone, Hexagon } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const MENU_ITEMS = [
    { name: 'Home', icon: Home, href: '/' },
    { name: 'Inventory', icon: Box, href: '/inventory' },
    { name: 'Sales', icon: ShoppingCart, href: '/sales' },
    { name: 'Finance', icon: Wallet, href: '/finance' },
    { name: 'Marketing', icon: Megaphone, href: '/marketing' },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="fixed left-0 top-0 h-screen w-20 xl:w-24 bg-white border-r border-gray-100 flex flex-col items-center py-8 z-50 shadow-sm">
            <div className="mb-10">
                <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
                    <Hexagon className="w-6 h-6 fill-current" />
                </div>
            </div>

            <nav className="flex flex-col gap-6 w-full px-4 items-center">
                {MENU_ITEMS.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={twMerge(
                                "flex flex-col items-center justify-center gap-1 w-12 h-12 xl:w-14 xl:h-14 rounded-2xl transition-all duration-300 group relative",
                                isActive
                                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-300 scale-105"
                                    : "text-gray-400 hover:bg-white hover:text-indigo-600 hover:shadow-md"
                            )}
                        >
                            <item.icon className={twMerge("w-5 h-5 xl:w-6 xl:h-6 transition-transform", !isActive && "group-hover:scale-110")} />
                            {/* Tooltip for small sidebar */}
                            <span className="absolute left-16 px-3 py-1 bg-gray-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                                {item.name}
                            </span>
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}
