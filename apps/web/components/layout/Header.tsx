"use client";

import { Search, Bell, User, Sparkles } from 'lucide-react';

export function Header() {
    return (
        <header className="flex flex-col md:flex-row md:items-center justify-between px-8 py-6 gap-6">
            <div>
                <h1 className="text-4xl font-black bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 bg-clip-text text-transparent mb-1">
                    Hello, Arland 👋
                </h1>
                <p className="text-sm text-slate-500 font-medium flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-indigo-500" />
                    Here's your business overview today
                </p>
            </div>

            <div className="flex items-center gap-4">
                {/* Glass search */}
                <div className="relative group hidden md:block">
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-2xl blur-xl group-focus-within:opacity-100 opacity-0 transition-opacity" />
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors z-10" />
                    <input
                        type="text"
                        placeholder="Search anything..."
                        className="relative pl-12 pr-4 py-3 w-80 bg-white/60 backdrop-blur-xl border border-white/50 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-200 transition-all outline-none text-sm font-medium placeholder:text-slate-400 shadow-sm"
                    />
                </div>

                {/* Notification badge */}
                <div className="relative group">
                    <button className="relative p-3 bg-white/60 backdrop-blur-xl border border-white/50 rounded-2xl hover:bg-white hover:scale-105 transition-all shadow-sm">
                        <Bell className="w-5 h-5 text-slate-600" />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse border-2 border-white" />
                    </button>

                    {/* Tooltip */}
                    <div className="absolute top-full mt-2 right-0 px-3 py-1 bg-slate-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg">
                        3 new notifications
                    </div>
                </div>

                {/* Profile with gradient border */}
                <div className="relative group">
                    <div className="p-0.5 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-2xl shadow-lg hover:shadow-xl transition-all">
                        <div className="bg-white rounded-[14px] px-4 py-2 flex items-center gap-3">
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl blur opacity-75" />
                                <div className="relative w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                                    <User className="w-5 h-5 text-white" />
                                </div>
                            </div>
                            <div className="hidden xl:block">
                                <p className="text-sm font-bold text-slate-900">Arland Jova</p>
                                <p className="text-xs font-semibold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                                    Super Admin
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
