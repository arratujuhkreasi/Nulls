"use client";

import { Search, Bell, User, ChevronDown } from 'lucide-react';

export function Header() {
    return (
        <header className="flex flex-col md:flex-row md:items-center justify-between px-8 py-8 mb-4 gap-4 md:gap-0">
            <div>
                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Hello, Arland 👋</h1>
                <p className="text-sm text-gray-500 font-medium mt-1">Here's what's happening with your business today.</p>
            </div>

            <div className="flex items-center gap-6">
                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search anything..."
                        className="pl-10 pr-4 py-3 rounded-2xl bg-white border border-transparent focus:border-indigo-100 focus:ring-4 focus:ring-indigo-50/50 w-full md:w-80 text-sm shadow-sm outline-none transition-all placeholder:text-gray-400 font-medium"
                    />
                </div>

                <button className="p-3 rounded-2xl bg-white hover:bg-white hover:shadow-md text-gray-500 hover:text-indigo-600 transition-all relative border border-transparent hover:border-gray-100">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>

                <div className="flex items-center gap-3 pl-6 border-l border-gray-200">
                    <div className="text-right hidden xl:block">
                        <p className="text-sm font-bold text-gray-800">Arland Jova</p>
                        <p className="text-xs text-indigo-600 font-medium bg-indigo-50 px-2 py-0.5 rounded-full inline-block">Super Admin</p>
                    </div>
                    <button className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 p-0.5 shadow-lg shadow-indigo-200 hover:shadow-indigo-300 transition-shadow">
                        <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center overflow-hidden">
                            <User className="w-6 h-6 text-gray-700" />
                        </div>
                    </button>
                </div>
            </div>
        </header>
    );
}
