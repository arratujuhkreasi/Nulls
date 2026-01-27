import { redirect } from "next/navigation";
import Image from "next/image";
import { checkIsAdmin } from "@/app/actions/admin";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const isAdmin = await checkIsAdmin();

    if (!isAdmin) {
        redirect("/dashboard");
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            {/* Admin Header */}
            <header className="bg-slate-900/80 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Image
                            src="/logo.png"
                            alt="Nulls Logo"
                            width={40}
                            height={40}
                            className="w-10 h-10 object-contain"
                        />
                        <div>
                            <h1 className="text-lg font-bold text-white">Admin Panel</h1>
                            <p className="text-xs text-slate-400">Nulls Management System</p>
                        </div>
                    </div>
                    <nav className="flex items-center gap-6">
                        <a href="/admin" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                            Dashboard
                        </a>
                        <a href="/admin/users" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                            Users
                        </a>
                        <a href="/dashboard" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
                            ← Exit Admin
                        </a>
                    </nav>
                </div>
            </header>

            {/* Content */}
            <main className="max-w-7xl mx-auto px-6 py-8">
                {children}
            </main>
        </div>
    );
}
