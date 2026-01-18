import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google"; // Changing font to generic clean ones or keep Geist? User said "clean". Outfit is great for headers.
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";

// Using Outfit for headings and Inter for body for that "Modern/Dribbble" look
const outfit = Outfit({ subsets: ["latin"], variable: "--font-heading" });
const inter = Inter({ subsets: ["latin"], variable: "--font-body" });

export const metadata: Metadata = {
  title: "SaaS ERP Dashboard",
  description: "Modern ERP for UMKM",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} ${inter.variable} antialiased bg-[#f8f9fa] text-gray-900 font-sans`}
      >
        <div className="min-h-screen flex">
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
      </body>
    </html>
  );
}
