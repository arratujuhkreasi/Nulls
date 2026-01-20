import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BarChart3, Megaphone, Zap, Warehouse, Globe, CheckCircle2, Sparkles, PieChart, TrendingUp } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-700 overflow-x-hidden">

      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl animate-float" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl animate-float animation-delay-200" />
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-200/20 rounded-full blur-3xl animate-float animation-delay-400" />
      </div>

      {/* Navbar */}
      <nav className="fixed w-full z-50 top-6 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/80 backdrop-blur-xl border border-white/50 rounded-full shadow-lg px-6 py-3 flex items-center justify-between">
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

            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
              <Link href="#apps" className="hover:text-indigo-600 transition-colors">Aplikasi</Link>
              <Link href="#features" className="hover:text-indigo-600 transition-colors">Fitur AI</Link>
              <Link href="#pricing" className="hover:text-indigo-600 transition-colors">Harga</Link>
            </div>

            <div className="flex items-center gap-3">
              <Link href="/login" className="px-5 py-2 text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors">
                Masuk
              </Link>
              <Link href="/login" className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-sm font-semibold rounded-full transition-all shadow-lg hover:shadow-xl active:scale-95">
                Coba Gratis
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6 z-10">
        <div className="max-w-6xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm border border-indigo-100/50 rounded-full mb-8 shadow-sm animate-slide-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500" />
            </span>
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">SaaS ERP #1 Indonesia</span>
          </div>

          {/* Heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 tracking-tight leading-[1.1] mb-6 animate-slide-up animation-delay-100">
            Bisnis Jadi <span className="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 animate-pulse-soft">Lebih Cerdas</span>
          </h1>

          <p className="text-lg md:text-2xl text-slate-600 max-w-3xl mx-auto mb-12 leading-relaxed font-light animate-slide-up animation-delay-200">
            Platform all-in-one untuk mengelola Penjualan, Keuangan, dan Marketing dengan <span className="font-semibold text-indigo-600">AI yang bekerja otomatis</span> untuk Anda.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-24 animate-slide-up animation-delay-300">
            <Link href="/login" className="group relative overflow-hidden h-14 w-full md:w-auto px-10 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-full transition-all shadow-2xl shadow-indigo-300/50 hover:shadow-indigo-400/50 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 text-lg">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <span className="relative">Mulai Sekarang</span>
              <ArrowRight className="w-5 h-5 relative" />
            </Link>
            <Link href="/dashboard" className="h-14 w-full md:w-auto px-10 bg-white hover:bg-slate-50 text-slate-700 font-semibold rounded-full border-2 border-slate-200 hover:border-indigo-200 transition-all flex items-center justify-center gap-2 text-lg shadow-sm hover:shadow-md">
              <span className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm">▶</span>
              Lihat Demo
            </Link>
          </div>

          {/* Bento Grid Apps */}
          <div id="apps" className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto text-left">

            {/* Card: Penjualan (Large) */}
            <Link href="/dashboard" className="group md:col-span-2 relative h-80 bg-white/80 backdrop-blur-sm rounded-[2.5rem] border border-slate-100 shadow-xl hover:shadow-2xl p-8 overflow-hidden transition-all duration-500 hover:-translate-y-2">
              <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-bl from-blue-50/80 to-transparent" />
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <BarChart3 className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Penjualan & CRM</h3>
                  <p className="text-slate-600 max-w-sm">Pantau performa sales real-time dengan dashboard interaktif dan prediksi AI.</p>
                </div>
                <div className="flex items-center gap-2 text-blue-600 font-bold group-hover:gap-4 transition-all">
                  Buka Dashboard <ArrowRight className="w-5 h-5" />
                </div>
              </div>
              {/* Animated Chart */}
              <div className="absolute bottom-[-10%] right-[-5%] w-[60%] h-[70%] bg-white/90 backdrop-blur-sm rounded-t-3xl shadow-2xl border border-slate-100 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <div className="flex items-end gap-2 h-full pb-4">
                  {[40, 60, 80, 50, 90].map((height, i) => (
                    <div
                      key={i}
                      className={`flex-1 bg-gradient-to-t ${i === 4 ? 'from-indigo-500 to-purple-500' : 'from-blue-200 to-blue-400'} rounded-t-lg transition-all duration-500 hover:scale-105`}
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>
              </div>
            </Link>

            {/* Card: Marketing AI */}
            <Link href="/marketing" className="group relative h-80 bg-gradient-to-br from-slate-900 to-slate-800 rounded-[2.5rem] shadow-2xl p-8 overflow-hidden hover:shadow-indigo-500/50 transition-all duration-500 hover:-translate-y-2">
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
              <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-gradient-to-br from-indigo-500/30 via-purple-500/30 to-pink-500/30 animate-[spin_20s_linear_infinite]" />

              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <Sparkles className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">AI Marketing</h3>
                  <p className="text-slate-300 text-sm">Generate konten viral otomatis untuk semua platform sosial media Anda.</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    AI Generating...
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full w-[70%] bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full animate-pulse-soft" />
                  </div>
                </div>
              </div>
            </Link>

            {/* Card: Keuangan */}
            <Link href="/finance" className="group h-72 bg-white/80 backdrop-blur-sm rounded-[2.5rem] border border-slate-100 shadow-lg hover:shadow-2xl p-8 flex flex-col justify-between transition-all duration-500 hover:-translate-y-2">
              <div>
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <TrendingUp className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Keuangan</h3>
                <p className="text-slate-600 text-sm">Laporan laba rugi otomatis & akurat dengan visualisasi grafik real-time.</p>
              </div>
              <div className="flex items-center gap-2 text-green-600 font-bold text-sm group-hover:gap-4 transition-all">
                Cek Saldo <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

            {/* Card: Inventaris */}
            <Link href="/inventory" className="group h-72 bg-white/80 backdrop-blur-sm rounded-[2.5rem] border border-slate-100 shadow-lg hover:shadow-2xl p-8 flex flex-col justify-between transition-all duration-500 hover:-translate-y-2">
              <div>
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <Warehouse className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Inventaris</h3>
                <p className="text-slate-600 text-sm">Pantau stok barang masuk & keluar dengan notifikasi otomatis.</p>
              </div>
              <div className="flex items-center gap-2 text-orange-600 font-bold text-sm group-hover:gap-4 transition-all">
                Cek Stok <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

            {/* Card: Website Store */}
            <Link href="/" className="group h-72 bg-white/80 backdrop-blur-sm rounded-[2.5rem] border border-slate-100 shadow-lg hover:shadow-2xl p-8 flex flex-col justify-between transition-all duration-500 hover:-translate-y-2">
              <div>
                <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <Globe className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Website Toko</h3>
                <p className="text-slate-600 text-sm">Website e-commerce instan untuk brand Anda dalam hitungan menit.</p>
              </div>
              <div className="flex items-center gap-2 text-pink-600 font-bold text-sm group-hover:gap-4 transition-all">
                Kelola Web <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

          </div>
        </div>
    </div>
      </section >

    {/* AI Technology Highlight */ }
    < section className = "py-20 px-6 relative z-10 overflow-hidden" >
        <div className="absolute inset-0 bg-slate-900 clip-path-slant" />
        
        <div className="max-w-7xl mx-auto relative z-10 text-white">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-500/20 border border-indigo-500/30 rounded-full text-indigo-300 text-xs font-bold uppercase tracking-wider mb-6">
                <Sparkles className="w-3 h-3 text-indigo-400" />
                Teknologi AI Mutakhir
              </div>
              <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight leading-[1.1]">
                Prediksi Bisnis dengan <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Akurasi 95%</span>
              </h2>
              <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                Jangan cuma menebak. Gunakan kekuatan <strong>Deep Learning (LSTM)</strong> untuk memprediksi omzet penjualan Anda minggu depan. 
                Sistem kami belajar dari pola transaksi Anda secara otomatis.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { label: 'Akurasi Model', value: '85-95%', desc: 'Teruji dengan data real UMKM', color: 'text-green-400' },
                  { label: 'Kecepatan Proses', value: '<50ms', desc: 'Real-time analysis', color: 'text-cyan-400' },
                  { label: 'Arsitektur', value: 'Neural Network', desc: 'LSTM TensorFlow Engine', color: 'text-purple-400' },
                  { label: 'Adaptasi', value: 'Self-Learning', desc: 'Semakin pintar setiap hari', color: 'text-pink-400' },
                ].map((stat, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 p-4 rounded-2xl hover:bg-white/10 transition-colors">
                    <p className={`text-3xl font-black ${stat.color} mb-1`}>{stat.value}</p>
                    <p className="font-bold text-white mb-0.5">{stat.label}</p>
                    <p className="text-xs text-slate-400">{stat.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex-1 relative w-full">
              {/* Visual Representasi AI */}
              <div className="relative aspect-square max-w-md mx-auto">
                 <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full blur-[100px] opacity-50 animate-pulse-slow" />
                 <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-2xl overflow-hidden">
                    <div className="flex items-center justify-between mb-8">
                       <div className="flex items-center gap-3">
                          <div className="w-3 h-3 rounded-full bg-red-400" />
                          <div className="w-3 h-3 rounded-full bg-yellow-400" />
                          <div className="w-3 h-3 rounded-full bg-green-400" />
                       </div>
                       <div className="text-xs font-mono text-slate-400">ai_engine_v1.py</div>
                    </div>
                    <div className="space-y-3 font-mono text-sm">
                       <div className="text-green-400">$ analyzing_transactions...</div>
                       <div className="text-slate-300 pl-4">Found: 1,240 data points</div>
                       <div className="text-slate-300 pl-4">Pattern: Seasonal Growth detected</div>
                       <div className="text-green-400">$ running_prediction_model</div>
                       <div className="text-blue-400 pl-4">Loading LSTM weights... OK</div>
                       <div className="text-blue-400 pl-4">Forecasting next 7 days...</div>
                       <div className="text-green-400">$ result_ready</div>
                       <div className="mt-4 p-4 bg-black/30 rounded-xl border border-white/10">
                          <div className="flex justify-between items-end mb-2">
                             <span className="text-slate-400">Predicted Revenue</span>
                             <span className="text-xl font-bold text-white">Rp 15.400.000</span>
                          </div>
                          <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
                             <div className="bg-green-500 h-full w-[85%] animate-pulse" />
                          </div>
                          <div className="text-right text-xs text-green-400 mt-1">Confidence: 94.2%</div>
                       </div>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section >
    <div className="max-w-7xl mx-auto">
      <div className="bg-white/60 backdrop-blur-xl rounded-[3rem] p-12 md:p-20 shadow-2xl border border-white/50 relative overflow-hidden">

        {/* Decorative gradient */}
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-indigo-100/50 to-transparent rounded-full blur-3xl" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-xs font-bold uppercase tracking-wider mb-6">
              <Zap className="w-3 h-3 fill-current" />
              New Feature
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight leading-[1.1]">
              Marketing <span className="block bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">Otomatis AI</span>
            </h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Biarkan AI yang bekerja membuat konten Instagram, TikTok, dan Facebook Anda.
              Hemat waktu, hasilkan lebih banyak penjualan.
            </p>

            <ul className="space-y-4">
              {[
                { title: "Caption Generator Viral", desc: "AI menulis caption menarik setiap hari" },
                { title: "Jadwal Posting Otomatis", desc: "Set it and forget it" },
                { title: "Analisa Tren Pasar", desc: "Tau apa yang lagi trending" }
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-700">
                  <div className="mt-0.5 p-1 bg-green-100 rounded-full">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-sm text-slate-500">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            {/* Glass Card UI */}
            <div className="relative bg-white/70 backdrop-blur-xl border border-white/50 p-8 rounded-3xl shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h4 className="font-bold text-slate-800">Content Calendar</h4>
                <span className="text-xs bg-indigo-100 text-indigo-700 px-3 py-1 rounded-lg font-bold">Jan 2026</span>
              </div>
              <div className="space-y-4">
                {[
                  { status: 'done', color: 'bg-green-500' },
                  { status: 'progress', color: 'bg-indigo-500' },
                  { status: 'pending', color: 'bg-slate-300' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-white/80 rounded-2xl shadow-sm border border-slate-50" style={{ animationDelay: `${i * 100}ms` }}>
                    <div className="w-12 h-12 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex-shrink-0 animate-pulse-soft" />
                    <div className="flex-1 space-y-2">
                      <div className="h-2 w-32 bg-slate-200 rounded-full" />
                      <div className="h-2 w-20 bg-slate-100 rounded-full" />
                    </div>
                    <div className={`p-2 rounded-full ${item.status === 'done' ? 'bg-green-100' : item.status === 'progress' ? 'bg-indigo-100' : 'bg-slate-100'}`}>
                      <CheckCircle2 className={`w-4 h-4 ${item.status === 'done' ? 'text-green-600' : item.status === 'progress' ? 'text-indigo-600' : 'text-slate-400'}`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating decoration */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-2xl animate-pulse-soft" />
          </div>
        </div>
      </div>
    </div>
      </section >

    {/* Footer */ }
    < footer className = "bg-white/60 backdrop-blur-xl border-t border-slate-100 py-12 mt-20 relative z-10" >
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="mb-6 flex items-center justify-center gap-2 font-bold text-2xl tracking-tight">
          <Image
            src="/logo.png"
            alt="Nulls Logo"
            width={120}
            height={40}
            className="h-10 w-auto object-contain"
          />
        </div>
        <p className="text-slate-500 text-sm">© 2026 Nulls Inc. v4.0 (Modern Redesign). Dibuat dengan ❤️ untuk UMKM Indonesia.</p>
      </div>
      </footer >

    </div >
  );
}
