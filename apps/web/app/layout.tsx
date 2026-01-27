import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { ErrorBoundary } from "@/components/ErrorBoundary";

// Validate environment variables on startup (will throw if invalid)
import "@/lib/env";

// Using Outfit for headings and Inter for body for that "Modern/Dribbble" look
const outfit = Outfit({ subsets: ["latin"], variable: "--font-heading" });
const inter = Inter({ subsets: ["latin"], variable: "--font-body" });

export const metadata: Metadata = {
  title: "Nulls - SaaS ERP",
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
        <script dangerouslySetInnerHTML={{ __html: `console.log('%c NULLS V2.1 LOADED ', 'background: #714B67; color: #fff; font-size: 20px;');` }} />
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </body>
    </html>
  );
}
