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
    const signInWithGoogle = async () => {
        "use server";
        const origin = (await headers()).get("origin");
        const supabase = await createClient();

        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${origin}/auth/callback?next=/dashboard`,
            },
        });

        if (error) {
            console.log(error);
            return redirect("/login?message=Could not authenticate with Google");
        }

        if (data.url) {
            return redirect(data.url);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa] p-4">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-br from-indigo-600 to-violet-700 p-8 text-white text-center">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-4">
                        <Lock className="w-6 h-6 text-white" />
                    </div>
                    <h1 className="text-2xl font-bold font-heading">Selamat Datang Kembali</h1>
                    <p className="text-indigo-100 mt-2 text-sm">Masuk dengan akun Google Anda.</p>
                </div>

                {/* Form */}
                <div className="p-8">
                    <form className="space-y-4">
                        <button
                            formAction={signInWithGoogle}
                            className="w-full bg-white hover:bg-gray-50 text-gray-700 font-medium py-3 rounded-xl border border-gray-200 transition-all shadow-sm hover:shadow-md active:scale-[0.98] flex justify-center items-center gap-3"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    fill="#4285F4"
                                />
                                <path
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    fill="#34A853"
                                />
                                <path
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z"
                                    fill="#FBBC05"
                                />
                                <path
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    fill="#EA4335"
                                />
                            </svg>
                            Lanjutkan dengan Google
                        </button>

                        {searchParams?.message && (
                            <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg text-center mt-4">
                                {searchParams.message}
                            </div>
                        )}
                    </form>

                    <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                        <p className="text-gray-400 text-xs">Dilindungi oleh Arland Jova Security</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
