import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BarChart3, Megaphone, Zap, Warehouse, Globe, CheckCircle2, Sparkles, PieChart } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-700 overflow-x-hidden">

      {/* Background Ambience - Optimized */}
      <div className="fixed inset-0 pointer-events-none transform-gpu">
        <div className="absolute top-[-10%] left-[-10%] w-[80vw] h-[80vw] bg-indigo-100/30 rounded-full blur-3xl mix-blend-multiply md:animate-blob will-change-transform"></div>
        <div className="absolute top-[-10%] right-[-10%] w-[80vw] h-[80vw] bg-purple-100/30 rounded-full blur-3xl mix-blend-multiply md:animate-blob animation-delay-2000 will-change-transform"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-[60vw] h-[60vw] bg-blue-100/30 rounded-full blur-3xl mix-blend-multiply md:animate-blob animation-delay-4000 will-change-transform"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 brightness-100 contrast-150 mix-blend-overlay"></div>
      </div>

      {/* Navbar */}
      <nav className="fixed w-full z-50 top-4 px-4">
        <div className="max-w-7xl mx-auto h-16 px-6 bg-white/70 backdrop-blur-xl border border-white/50 rounded-full shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-2.5 font-bold text-xl tracking-tight">
            <Image
              src="/logo.png"
              alt="Nulls Logo"
              width={100}
              height={32}
              className="h-8 w-auto object-contain"
              priority
            />
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-500">
            <Link href="#apps" className="hover:text-indigo-600 transition-colors">Aplikasi</Link>
            <Link href="#features" className="hover:text-indigo-600 transition-colors">Fitur AI</Link>
            <Link href="#pricing" className="hover:text-indigo-600 transition-colors">Harga</Link>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/login" className="px-5 py-2 text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors">
              Masuk
            </Link>
            <Link href="/login" className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold rounded-full transition-all shadow-lg hover:shadow-xl active:scale-95">
              Coba Gratis
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 md:pt-40 pb-20 px-6 z-10">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/50 border border-indigo-100/50 rounded-full mb-6 md:mb-8 shadow-sm backdrop-blur-sm animate-fade-in-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-widest">SaaS ERP #1 Indonesia</span>
          </div>

          {/* Optimized Typography for Mobile */}
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold text-slate-900 tracking-tight leading-[1.1] md:leading-[1] mb-6 md:mb-8">
            Bisnis Jadi <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-500">Lebih Cerdas.</span>
          </h1>

          <p className="text-lg md:text-2xl text-slate-500 max-w-2xl mx-auto mb-10 md:mb-12 leading-relaxed font-light">
            Platform all-in-one untuk mengelola Penjualan, Keuangan, dan Marketing.
            Ditenagai AI yang bekerja otomatis untuk Anda.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-20 md:mb-24">
            <Link href="/login" className="h-12 md:h-14 w-full md:w-auto px-8 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-full transition-all shadow-xl shadow-indigo-200 hover:shadow-2xl hover:scale-105 active:scale-95 flex items-center justify-center gap-2 text-lg">
              Mulai Sekarang
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/dashboard" className="h-12 md:h-14 w-full md:w-auto px-8 bg-white text-slate-700 font-semibold rounded-full border border-slate-200 hover:bg-slate-50 transition-all flex items-center justify-center gap-2 text-lg shadow-sm hover:shadow-md">
              <span className="w-6 h-6 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs">▶</span>
              Lihat Demo
            </Link>
          </div>

          {/* Bento Grid Apps */}
          <div id="apps" className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto text-left">

            {/* Card: Penjualan (Large) */}
            <Link href="/dashboard" className="group md:col-span-2 relative h-72 md:h-80 bg-white rounded-[2rem] md:rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 p-6 md:p-8 overflow-hidden hover:shadow-2xl transition-all duration-500">
              <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-bl from-blue-50/50 to-transparent"></div>
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 transition-transform">
                    <BarChart3 className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">Penjualan & CRM</h3>
                  <p className="text-slate-500 max-w-xs text-sm md:text-base">Pantau performa sales real-time dengan dashboard interaktif.</p>
                </div>
                <div className="flex items-center gap-2 text-blue-600 font-bold group-hover:gap-4 transition-all">
                  Buka Dashboard <ArrowRight className="w-4 h-4" />
                </div>
              </div>
              {/* Decorative Chart */}
              <div className="absolute bottom-[-10%] right-[-5%] w-[60%] h-[70%] bg-white rounded-t-2xl shadow-lg border border-slate-100 p-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <div className="flex items-end gap-2 h-full pb-4 px-2">
                  <div className="w-1/5 h-[40%] bg-blue-100 rounded-t-md"></div>
                  <div className="w-1/5 h-[60%] bg-blue-200 rounded-t-md"></div>
                  <div className="w-1/5 h-[80%] bg-blue-500 rounded-t-md"></div>
                  <div className="w-1/5 h-[50%] bg-blue-200 rounded-t-md"></div>
                  <div className="w-1/5 h-[90%] bg-indigo-500 rounded-t-md"></div>
                </div>
              </div>
            </Link>

            {/* Card: Marketing AI */}
            <Link href="/marketing" className="group relative h-72 md:h-80 bg-slate-900 rounded-[2rem] md:rounded-[2.5rem] shadow-xl shadow-slate-300 p-6 md:p-8 overflow-hidden hover:shadow-2xl transition-all duration-500">
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
              <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-gradient-to-br from-indigo-500/30 via-purple-500/30 to-pink-500/30 animate-spin-slow"></div>

              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2">AI Marketing</h3>
                  <p className="text-slate-300 text-sm">Buat konten viral otomatis dengan AI Generator.</p>
                </div>
                <div className="w-full bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/10 mt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-green-400"></div>
                    <span className="text-xs text-slate-300">AI Generating...</span>
                  </div>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full w-[70%] bg-gradient-to-r from-indigo-400 to-purple-400"></div>
                  </div>
                </div>
              </div>
            </Link>

            {/* Card: Keuangan */}
            <Link href="/finance" className="group h-64 md:h-72 bg-white rounded-[2rem] md:rounded-[2.5rem] border border-slate-100 shadow-lg shadow-slate-200/50 p-6 md:p-8 flex flex-col justify-between hover:shadow-xl transition-all">
              <div>
                <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center text-green-600 mb-4 group-hover:scale-110 transition-transform">
                  <PieChart className="w-6 h-6" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-1">Keuangan</h3>
                <p className="text-slate-500 text-sm">Laporan laba rugi otomatis & akurat.</p>
              </div>
              <div className="flex items-center gap-2 text-green-600 font-bold text-sm">
                Cek Saldo <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

            {/* Card: Inventaris */}
            <Link href="/inventory" className="group h-64 md:h-72 bg-white rounded-[2rem] md:rounded-[2.5rem] border border-slate-100 shadow-lg shadow-slate-200/50 p-6 md:p-8 flex flex-col justify-between hover:shadow-xl transition-all">
              <div>
                <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 mb-4 group-hover:scale-110 transition-transform">
                  <Warehouse className="w-6 h-6" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-1">Inventaris</h3>
                <p className="text-slate-500 text-sm">Pantau stok barang masuk & keluar.</p>
              </div>
              <div className="flex items-center gap-2 text-orange-600 font-bold text-sm">
                Cek Stok <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

            {/* Card: Website Store */}
            <Link href="/" className="group h-64 md:h-72 bg-white rounded-[2rem] md:rounded-[2.5rem] border border-slate-100 shadow-lg shadow-slate-200/50 p-6 md:p-8 flex flex-col justify-between hover:shadow-xl transition-all">
              <div>
                <div className="w-12 h-12 bg-pink-100 rounded-2xl flex items-center justify-center text-pink-600 mb-4 group-hover:scale-110 transition-transform">
                  <Globe className="w-6 h-6" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-1">Website Toko</h3>
                <p className="text-slate-500 text-sm">Website e-commerce instan untuk brand Anda.</p>
              </div>
              <div className="flex items-center gap-2 text-pink-600 font-bold text-sm">
                Kelola Web <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

          </div>
        </div>
      </section>

      {/* Feature Highlight */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-7xl mx-auto bg-white rounded-[3rem] p-8 md:p-20 shadow-2xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-bold uppercase tracking-wider mb-6">
                <Zap className="w-3 h-3 fill-current" />
                New Feature
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
                Marketing Otomatis <br />
                <span className="text-indigo-600">Ditenagai AI.</span>
              </h2>
              <p className="text-lg text-slate-500 mb-8 leading-relaxed">
                Biarkan AI yang bekerja membuat konten Instagram, TikTok, dan Facebook Anda.
                Hemat waktu, hasilkan lebih banyak penjualan.
              </p>

              <ul className="space-y-4">
                {["Caption Generator Viral", "Jadwal Posting Otomatis", "Analisa Tren Pasar"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative hidden md:block">
              {/* Decorative Circle */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl"></div>

              {/* Glass Card UI */}
              <div className="relative bg-white/60 backdrop-blur-xl border border-white/50 p-8 rounded-[2rem] shadow-xl">
                <div className="flex items-center justify-between mb-8">
                  <h4 className="font-bold text-slate-800">Content Calendar</h4>
                  <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-md font-bold">Jan 2026</span>
                </div>
                <div className="space-y-4">
                  {[1, 2, 3].map((_, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-slate-50">
                      <div className="w-10 h-10 bg-slate-100 rounded-lg flex-shrink-0"></div>
                      <div className="flex-1">
                        <div className="h-2 w-24 bg-slate-200 rounded-full mb-2"></div>
                        <div className="h-2 w-16 bg-slate-100 rounded-full"></div>
                      </div>
                      <div className={`p-1.5 rounded-full ${i === 0 ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-400'}`}>
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white pt-20 pb-10 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="mb-8 flex items-center justify-center gap-2 font-bold text-2xl tracking-tight">
            <Image
              src="/logo.png"
              alt="Nulls Logo"
              width={100}
              height={32}
              className="h-10 w-auto object-contain"
            />
          </div>
          <p className="text-slate-500 text-sm">© 2026 Nulls Inc. v3.2 (Optimized). Dibuat dengan ❤️ untuk UMKM Indonesia.</p>
        </div>
      </footer>

    </div>
  );
}
