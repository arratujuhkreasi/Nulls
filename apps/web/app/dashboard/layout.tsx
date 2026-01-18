import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen flex bg-[#f8f9fa]">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content Wrapper */}
            <main className="flex-1 ml-20 xl:ml-24 transition-all min-w-0">
                <div className="max-w-[1600px] mx-auto">
                    <Header />
                    <div className="px-6 md:px-8 pb-8">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}
