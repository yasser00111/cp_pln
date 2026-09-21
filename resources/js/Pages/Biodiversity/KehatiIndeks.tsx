import React, { useState } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Head, usePage } from '@inertiajs/react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { BarChart3, TrendingUp, ShieldCheck, Leaf, Sparkles, Layers } from 'lucide-react';

export default function KehatiIndeks() {
  const { settings, globalCms } = usePage<any>().props;
  const [selectedYear, setSelectedYear] = useState<string>('2025');

  // Multi-year Index Data (Shannon-Wiener Index H', Evenness E, Dominance D)
  let indexHistory = [];
  try {
    indexHistory = JSON.parse(settings?.bio_data_index_history || '[]');
  } catch(e) {}
  if (!indexHistory || indexHistory.length === 0) {
    indexHistory = [
      { period: '2021', floraH: 2.45, faunaH: 2.10, evenness: 0.82, dominance: 0.15 },
      { period: '2022', floraH: 2.68, faunaH: 2.35, evenness: 0.85, dominance: 0.12 },
      { period: '2023', floraH: 2.92, faunaH: 2.60, evenness: 0.88, dominance: 0.10 },
      { period: '2024', floraH: 3.15, faunaH: 2.85, evenness: 0.91, dominance: 0.08 },
      { period: '2025', floraH: 3.42, faunaH: 3.12, evenness: 0.94, dominance: 0.06 },
    ];
  }

  // Seasonal/Monthly Trend for 2025
  let seasonalTrend = [];
  try {
    seasonalTrend = JSON.parse(settings?.bio_data_seasonal_trend || '[]');
  } catch(e) {}
  if (!seasonalTrend || seasonalTrend.length === 0) {
    seasonalTrend = [
      { month: 'Jan', Flora: 3.20, Fauna: 2.95, Total: 6.15 },
      { month: 'Feb', Flora: 3.25, Fauna: 3.00, Total: 6.25 },
      { month: 'Mar', Flora: 3.30, Fauna: 3.02, Total: 6.32 },
      { month: 'Apr', Flora: 3.35, Fauna: 3.05, Total: 6.40 },
      { month: 'Mei', Flora: 3.38, Fauna: 3.08, Total: 6.46 },
      { month: 'Jun', Flora: 3.42, Fauna: 3.12, Total: 6.54 },
      { month: 'Jul', Flora: 3.45, Fauna: 3.15, Total: 6.60 },
      { month: 'Agu', Flora: 3.48, Fauna: 3.18, Total: 6.66 },
      { month: 'Sep', Flora: 3.50, Fauna: 3.22, Total: 6.72 },
      { month: 'Okt', Flora: 3.52, Fauna: 3.25, Total: 6.77 },
      { month: 'Nov', Flora: 3.55, Fauna: 3.28, Total: 6.83 },
      { month: 'Des', Flora: 3.58, Fauna: 3.30, Total: 6.88 },
    ];
  }

  return (
    <MainLayout>
      <Head title="Data Indeks Keanekaragaman Hayati - UBP Barru" />

      {/* Header Banner */}
      <section className="relative py-20 bg-gradient-to-b from-slate-900 via-emerald-950/40 to-slate-950 border-b border-emerald-500/20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 relative z-10 pt-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <BarChart3 className="w-4 h-4" />
            <span>BIODIVERSITY DIVERSITY INDEX (H')</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-heading tracking-tight">
            {globalCms?.bio_data_hero?.title || "Data Indeks Keanekaragaman Hayati"}
          </h1>
          <p className="text-xs sm:text-sm text-slate-700 max-w-3xl leading-relaxed whitespace-pre-line">
            {globalCms?.bio_data_hero?.body_text || "Visualisasi data grafis (picture chart) tren indeks keanekaragaman Shannon-Wiener ($H'$), indeks kemerataan ($E$), dan indeks dominansi ($D$) ekosistem flora & fauna di UBP Barru."}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-slate-50 space-y-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

          {/* Key Metric Overview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-3xl bg-white border border-emerald-500/30 space-y-2 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-600 font-semibold">{settings?.bio_data_stat_1_title || 'Indeks Shannon-Wiener (Flora)'}</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold">{settings?.bio_data_stat_1_badge || "H' > 3.0"}</span>
              </div>
              <div className="text-3xl font-extrabold text-emerald-400 font-heading">{settings?.bio_data_stat_1_value || '3.42'}</div>
              <p className="text-xs text-slate-600">{settings?.bio_data_stat_1_desc || 'Kategori Keanekaragaman Tinggi (Sangat Baik)'}</p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-sky-500/30 space-y-2 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-600 font-semibold">{settings?.bio_data_stat_2_title || 'Indeks Shannon-Wiener (Fauna)'}</span>
                <span className="px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-400 text-[10px] font-bold">{settings?.bio_data_stat_2_badge || "H' > 3.0"}</span>
              </div>
              <div className="text-3xl font-extrabold text-sky-400 font-heading">{settings?.bio_data_stat_2_value || '3.12'}</div>
              <p className="text-xs text-slate-600">{settings?.bio_data_stat_2_desc || 'Keanekaragaman fauna pesisir terkelola stabil'}</p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-emerald-500/30 space-y-2 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-600 font-semibold">{settings?.bio_data_stat_3_title || 'Indeks Kemerataan (E)'}</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold">{settings?.bio_data_stat_3_badge || "E > 0.75"}</span>
              </div>
              <div className="text-3xl font-extrabold text-slate-900 font-heading">{settings?.bio_data_stat_3_value || '0.94'}</div>
              <p className="text-xs text-slate-600">{settings?.bio_data_stat_3_desc || 'Penyebaran antar spesies sangat merata'}</p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-sky-500/30 space-y-2 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-600 font-semibold">{settings?.bio_data_stat_4_title || 'Indeks Dominansi (D)'}</span>
                <span className="px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-400 text-[10px] font-bold">{settings?.bio_data_stat_4_badge || "D < 0.15"}</span>
              </div>
              <div className="text-3xl font-extrabold text-sky-300 font-heading">{settings?.bio_data_stat_4_value || '0.06'}</div>
              <p className="text-xs text-slate-600">{settings?.bio_data_stat_4_desc || 'Tidak ada spesies yang mendominasi secara ekstrem'}</p>
            </div>
          </div>

          {/* Picture Graphic 1: Multi-Year Trend Chart */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200 space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  <TrendingUp className="w-4 h-4" />
                  <span>Grafik Tren Kehati (Picture Graphic 1)</span>
                </div>
                <h2 className="text-2xl font-bold text-slate-900 font-heading">
                  {settings?.bio_data_chart1_title || 'Pertumbuhan Indeks Shannon-Wiener (2021 - 2025)'}
                </h2>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 font-semibold">
                <Leaf className="w-4 h-4 text-emerald-400" />
                <span>{settings?.bio_data_chart1_badge || 'Status: Tren Positif Terus Meningkat'}</span>
              </div>
            </div>

            {/* Recharts Graphic Container */}
            <div className="h-80 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={indexHistory} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorFlora" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorFauna" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0284c7" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#0284c7" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                  <XAxis dataKey="period" stroke="#94a3b8" tick={{ fontSize: 12 }} />
                  <YAxis stroke="#94a3b8" tick={{ fontSize: 12 }} domain={[0, 4]} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '16px', color: '#fff' }}
                  />
                  <Legend />
                  <Area type="monotone" dataKey="floraH" name="Indeks Flora (H')" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorFlora)" />
                  <Area type="monotone" dataKey="faunaH" name="Indeks Fauna (H')" stroke="#0284c7" strokeWidth={3} fillOpacity={1} fill="url(#colorFauna)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Picture Graphic 2: Monthly Dynamics Bar Chart */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200 space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-sky-400 uppercase tracking-wider">
                  <BarChart3 className="w-4 h-4" />
                  <span>Dinamika Bulanan (Picture Graphic 2)</span>
                </div>
                <h2 className="text-2xl font-bold text-slate-900 font-heading">
                  {settings?.bio_data_chart2_title || 'Distribusi Indeks Keanekaragaman Bulanan Tahun 2025'}
                </h2>
              </div>
            </div>

            <div className="h-80 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={seasonalTrend} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                  <XAxis dataKey="month" stroke="#94a3b8" tick={{ fontSize: 12 }} />
                  <YAxis stroke="#94a3b8" tick={{ fontSize: 12 }} domain={[0, 4]} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '16px', color: '#fff' }}
                  />
                  <Legend />
                  <Bar dataKey="Flora" fill="#10b981" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="Fauna" fill="#0284c7" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      </section>
    </MainLayout>
  );
}
