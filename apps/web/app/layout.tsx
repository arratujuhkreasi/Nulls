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
        className={`${outfit.variable} ${inter.variable} antialiased bg-white text-gray-900 font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
