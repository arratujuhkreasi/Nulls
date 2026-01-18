import Link from "next/link";
import { ArrowRight, Boxes, BarChart3, Megaphone, Zap, Warehouse, ShieldCheck, Globe, CheckCircle2 } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-purple-100 selection:text-purple-700">

      {/* Navbar */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100/50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-2xl tracking-tighter">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-purple-200">
              <Boxes className="w-6 h-6" />
            </div>
            <span className="bg-gradient-to-r from-purple-700 to-indigo-700 bg-clip-text text-transparent">Arland Jova</span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <Link href="#features" className="hover:text-purple-600 transition-colors">Aplikasi</Link>
            <Link href="#pricing" className="hover:text-purple-600 transition-colors">Harga</Link>
            <Link href="#community" className="hover:text-purple-600 transition-colors">Komunitas</Link>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-gray-700 hover:text-purple-700 transition-colors">
              Masuk
            </Link>
            <Link href="/login" className="px-5 py-2.5 bg-[#714B67] hover:bg-[#5e3d55] text-white text-sm font-bold rounded-full transition-all shadow-md shadow-purple-200 hover:shadow-lg active:scale-95">
              Coba Gratis
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
          <div className="absolute top-[10%] left-[-10%] w-[600px] h-[600px] bg-purple-50/50 rounded-full blur-3xl opacity-60 mix-blend-multiply animate-blob"></div>
          <div className="absolute top-[10%] right-[-10%] w-[600px] h-[600px] bg-indigo-50/50 rounded-full blur-3xl opacity-60 mix-blend-multiply animate-blob animation-delay-2000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 border border-purple-100/50 rounded-full mb-8 animate-fade-in-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
            </span>
            <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">Software Bisnis #1 di Indonesia</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tight leading-[1.1] mb-8 max-w-4xl mx-auto">
            Satu Aplikasi untuk <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#714B67] to-indigo-600">Semua Kebutuhan Bisnis.</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mb-12 leading-relaxed">
            Kelola Keuangan, Inventaris, Penjualan, dan Marketing Otomatis dengan AI.
            Semuanya terintegrasi dalam satu platform yang mudah digunakan.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-20">
            <Link href="/login" className="w-full md:w-auto px-8 py-4 bg-[#714B67] hover:bg-[#5e3d55] text-white font-bold rounded-full transition-all shadow-xl shadow-purple-200 hover:shadow-2xl hover:scale-105 active:scale-95 flex items-center justify-center gap-2 text-lg">
              Mulai Sekarang - Gratis
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="#demo" className="w-full md:w-auto px-8 py-4 bg-white text-gray-700 font-bold rounded-full border border-gray-200 hover:bg-gray-50 transition-all flex items-center justify-center gap-2 text-lg">
              <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">▶</span>
              Lihat Demo
            </Link>
          </div>

          {/* Odoo-style App Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
            {[
              { name: "Penjualan", icon: BarChart3, color: "text-blue-600", bg: "bg-blue-50" },
              { name: "Keuangan", icon: BarChart3, color: "text-green-600", bg: "bg-green-50" }, // Used Chart for Finance too
              { name: "Inventaris", icon: Warehouse, color: "text-orange-600", bg: "bg-orange-50" },
              { name: "Marketing AI", icon: Megaphone, color: "text-pink-600", bg: "bg-pink-50" },
              { name: "Website", icon: Globe, color: "text-indigo-600", bg: "bg-indigo-50" },
            ].map((app, i) => (
              <div key={i} className="group p-6 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col items-center gap-4">
                <div className={`w-16 h-16 ${app.bg} rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-300`}>
                  <app.icon className={`w-8 h-8 ${app.color}`} />
                </div>
                <span className="font-bold text-gray-700 group-hover:text-gray-900">{app.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Section: AI */}
      <section className="py-32 bg-gray-50 border-y border-gray-200/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg text-white text-xs font-bold uppercase tracking-wider">
                <Zap className="w-3 h-3 fill-current" />
                Teknologi Baru
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
                Marketing Otomatis <br />
                <span className="text-[#714B67]">Ditenagai AI.</span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Tidak perlu lagi pusing memikirkan caption Instagram atau Facebook.
                AI Arland Jova akan membuatkan konten viral untuk produk Anda dalam hitungan detik.
              </p>

              <ul className="space-y-4">
                {[
                  "Hasilkan Caption Instagram, TikTok & FB",
                  "Prediksi Tren Penjualan 7 Hari ke Depan",
                  "Analisa Sentimen Pelanggan Otomatis"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-[2.5rem] rotate-3 opacity-20 blur-2xl"></div>
              <div className="relative bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-gray-100 p-2">
                {/* Mockup UI */}
                <div className="bg-gray-50 rounded-3xl p-6 aspect-square flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 bg-white rounded-full shadow-md flex items-center justify-center text-3xl mb-4">✨</div>
                  <h4 className="font-bold text-gray-900 mb-2">Caption Generator</h4>
                  <p className="text-sm text-gray-500 mb-6 max-w-xs">"Keripik Tempe Renyah, Diskon 50% Hari Ini! Buruan Sikat!"</p>
                  <div className="w-full max-w-[200px] h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 w-[80%]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white pt-20 pb-10 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="mb-8 flex items-center justify-center gap-2 font-bold text-2xl tracking-tighter">
            <div className="w-8 h-8 bg-[#714B67] rounded-lg flex items-center justify-center text-white">
              <Boxes className="w-5 h-5" />
            </div>
            <span className="text-gray-900">Arland Jova</span>
          </div>
          <p className="text-gray-500 text-sm">© 2026 Arland Jova Inc. v2.0 (Odoo Style). Dibuat dengan ❤️ untuk UMKM Indonesia.</p>
        </div>
      </footer>
    </div>
  );
}
