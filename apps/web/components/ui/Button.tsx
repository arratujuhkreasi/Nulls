'use client';

import { ReactNode, ButtonHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: 'primary' | 'secondary' | 'ghost' | 'gradient';
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

export function Button({
    children,
    variant = 'primary',
    size = 'md',
    className,
    ...props
}: ButtonProps) {
    const sizes = {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-lg",
    };

    const variants = {
        primary: "bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg hover:shadow-xl",
        secondary: "bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 shadow-sm hover:shadow-md",
        ghost: "bg-transparent hover:bg-slate-100 text-slate-700",
        gradient: "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-xl hover:shadow-2xl",
    };

    return (
        <button
            {...props}
            className={twMerge(
                "rounded-full font-semibold transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2",
                sizes[size],
                variants[variant],
                className
            )}
        >
            {children}
        </button>
    );
}
