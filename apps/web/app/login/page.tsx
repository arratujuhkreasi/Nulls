import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Lock, ArrowRight, Loader2, Mail } from "lucide-react";

export default function LoginPage({
    searchParams,
}: {
    searchParams: { message: string };
}) {
    const signIn = async (formData: FormData) => {
        "use server";
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const supabase = await createClient();

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            return redirect("/login?message=Could not authenticate user");
        }

        return redirect("/");
    };

    const signUp = async (formData: FormData) => {
        "use server";
        const origin = headers().get("origin");
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const supabase = await createClient();

        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${origin}/auth/callback`,
            },
        });

        if (error) {
            console.log(error);
            return redirect("/login?message=Could not authenticate user");
        }

        return redirect("/login?message=Check email to continue sign in process");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa] p-4">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-br from-indigo-600 to-violet-700 p-8 text-white text-center">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-4">
                        <Lock className="w-6 h-6 text-white" />
                    </div>
                    <h1 className="text-2xl font-bold font-heading">Welcome Back</h1>
                    <p className="text-indigo-100 mt-2 text-sm">Sign in to manage your smart business.</p>
                </div>

                {/* Form */}
                <div className="p-8">
                    <form className="space-y-4">
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</label>
                            <div className="relative">
                                <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
                                <input
                                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                                    name="email"
                                    placeholder="you@example.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Password</label>
                            <input
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                                type="password"
                                name="password"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <div className="flex gap-4 pt-2">
                            <button
                                formAction={signIn}
                                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-xl transition-all shadow-md active:scale-[0.98] flex justify-center items-center gap-2"
                            >
                                Sign In
                            </button>
                            <button
                                formAction={signUp}
                                className="flex-1 bg-white hover:bg-gray-50 text-gray-700 font-medium py-2.5 rounded-xl border border-gray-200 transition-all active:scale-[0.98]"
                            >
                                Sign Up
                            </button>
                        </div>

                        {searchParams?.message && (
                            <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg text-center mt-4">
                                {searchParams.message}
                            </div>
                        )}
                    </form>

                    <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                        <p className="text-gray-400 text-xs">Protected by Arland Jova Security</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
