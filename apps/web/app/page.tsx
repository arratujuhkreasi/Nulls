import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BarChart3, Zap, Warehouse, CheckCircle2, Sparkles, TrendingUp } from "lucide-react";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function LandingPage() {
  // Check if user is already logged in
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // If logged in, redirect to dashboard
  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-700 overflow-x-hidden">

      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl animate-float" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl animate-float animation-delay-200" />
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-200/20 rounded-full blur-3xl animate-float animation-delay-400" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-20 pb-20 px-6 z-10">
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

            <Link href="/demo" className="group h-14 w-full md:w-auto px-8 bg-white/80 backdrop-blur-sm border-2 border-slate-200 hover:border-indigo-400 text-slate-700 hover:text-indigo-600 font-semibold rounded-full transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 flex items-center justify-center gap-3 text-lg">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <span>Lihat Demo Dulu</span>
            </Link>

            <Link href="/pricing" className="h-14 w-full md:w-auto px-8 text-indigo-600 hover:text-indigo-700 font-semibold rounded-full transition-all flex items-center justify-center gap-2 text-lg hover:bg-indigo-50">
              Lihat Harga
              <ArrowRight className="w-5 h-5" />
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



          </div>
        </div>
      </section>

      {/* AI Technology Highlight */}
      <section className="py-20 px-6 relative z-10 overflow-hidden">
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
      </section>

      {/* Feature Highlight */}
      <section id="features" className="py-20 px-6 relative z-10">
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
                {/* Glass Card UI - AI Dashboard */}
                <div className="relative bg-white/40 backdrop-blur-2xl border border-white/60 p-8 rounded-[2.5rem] shadow-2xl overflow-hidden group hover:scale-[1.02] transition-transform duration-500">
                  {/* Background Glow */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -z-10" />
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl -z-10" />

                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h4 className="font-bold text-slate-800 text-lg">AI Content Studio</h4>
                      <p className="text-xs text-slate-500 font-medium">Auto-generating for 3 platforms...</p>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 bg-green-100/80 rounded-full border border-green-200 backdrop-blur-sm">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                      </span>
                      <span className="text-xs font-bold text-green-700">Active</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {/* Item 1: TikTok - Viral */}
                    <div className="relative p-4 bg-white/60 rounded-2xl shadow-sm border border-white/50 animate-slide-up bg-gradient-to-r from-transparent to-white/40" style={{ animationDelay: '0ms' }}>
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center shadow-lg transform rotate-[-2deg]">
                          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" /></svg>
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-bold text-slate-800 text-sm">Promo Keripik Pedas</span>
                            <span className="text-[10px] font-bold px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded-full">Viral Score: 98/100</span>
                          </div>
                          <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 w-[92%]"></div>
                          </div>
                          <p className="text-[10px] text-slate-500 mt-1">AI generating captions & hashtags...</p>
                        </div>
                      </div>
                    </div>

                    {/* Item 2: Instagram - Story */}
                    <div className="relative p-4 bg-white/60 rounded-2xl shadow-sm border border-white/50 animate-slide-up" style={{ animationDelay: '100ms' }}>
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 text-white flex items-center justify-center shadow-lg transform rotate-[2deg]">
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-bold text-slate-800 text-sm">Story Flash Sale</span>
                            <span className="text-[10px] font-bold px-2 py-0.5 bg-green-100 text-green-700 rounded-full">Ready</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-3 h-3 text-green-500" />
                            <span className="text-[10px] text-slate-400">Scheduled for 12:00 PM</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Floating Elements */}
                    <div className="absolute top-1/2 -right-4 bg-white p-3 rounded-xl shadow-xl border border-indigo-50 animate-bounce-slow">
                      <div className="text-xs font-bold text-indigo-600">ROI +150% 🚀</div>
                    </div>
                  </div>

                  {/* Bottom Status */}
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <div className="flex -space-x-2">
                      <div className="w-6 h-6 rounded-full bg-indigo-100 border-2 border-white"></div>
                      <div className="w-6 h-6 rounded-full bg-pink-100 border-2 border-white"></div>
                      <div className="w-6 h-6 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[8px] font-bold">+12</div>
                    </div>
                    <span>Last generated 2m ago</span>
                  </div>
                </div>

                {/* Enhanced Floating decoration */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-indigo-400/30 to-purple-400/30 rounded-full blur-3xl animate-pulse-soft pointer-events-none" />
                <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-tr from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse-slow pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white/60 backdrop-blur-xl border-t border-slate-100 py-12 mt-20 relative z-10">
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
      </footer>

    </div>
  );
}
