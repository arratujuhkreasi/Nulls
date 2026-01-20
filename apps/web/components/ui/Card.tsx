'use client';

import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface CardProps {
    children: ReactNode;
    className?: string;
    variant?: 'default' | 'glass' | 'gradient';
    hoverable?: boolean;
    animated?: boolean;
}

export function Card({
    children,
    className,
    variant = 'default',
    hoverable = true,
    animated = false
}: CardProps) {
    const baseClasses = "rounded-2xl transition-all duration-300";

    const variants = {
        default: "bg-white shadow-sm border border-slate-100",
        glass: "bg-white/60 backdrop-blur-xl border border-white/30 shadow-xl",
        gradient: "bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-xl",
    };

    const hoverClasses = hoverable
        ? "hover:shadow-2xl hover:-translate-y-1 cursor-pointer"
        : "";

    const animatedClasses = animated ? "animate-slide-up" : "";

    return (
        <div className={twMerge(
            baseClasses,
            variants[variant],
            hoverClasses,
            animatedClasses,
            className
        )}>
            {children}
        </div>
    );
}
