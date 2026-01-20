'use client';

import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface GlassCardProps {
    children: ReactNode;
    className?: string;
    hover?: boolean;
}

export function GlassCard({ children, className, hover = true }: GlassCardProps) {
    return (
        <div className={twMerge(
            "bg-white/60 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl p-8 transition-all duration-500",
            hover && "hover:bg-white/70 hover:shadow-indigo-200/50",
            className
        )}>
            {children}
        </div>
    );
}
