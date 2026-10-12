import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Head, usePage } from '@inertiajs/react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { TrendingUp, Leaf, BarChart3, Info } from 'lucide-react';

export default function KehatiIndeks() {
  const { settings, globalCms } = usePage<any>().props;

  // 1. Data Grafik 1: Kecenderungan Absolut / Indeks Kehati (2022 - 2026)
  let indexHistory = [];
  try {
    indexHistory = JSON.parse(settings?.bio_data_index_history || '[]');
  } catch (e) {}
  if (!indexHistory || indexHistory.length === 0) {
    indexHistory = [
      { period: '2022', fauna: 5600, flora: 2300 },
      { period: '2023', fauna: 7200, flora: 1800 },
      { period: '2024', fauna: 7502, flora: 1950 },
      { period: '2025', fauna: 6300, flora: 1600 },
      { period: '2026', fauna: 4100, flora: 2700 },
    ];
  } else {
    // Harmonize keys if user stored floraH / faunaH
    indexHistory = indexHistory.map((item: any) => ({
      ...item,
      fauna: item.fauna !== undefined ? item.fauna : (item.faunaH !== undefined ? item.faunaH : 0),
      flora: item.flora !== undefined ? item.flora : (item.floraH !== undefined ? item.floraH : 0),
    }));
  }

  // 2. Data Grafik 2: Jumlah Individu Flora & Fauna (2022 - 2026)
  let individualHistory = [];
  try {
    individualHistory = JSON.parse(settings?.bio_data_individual_history || settings?.bio_data_seasonal_trend || '[]');
  } catch (e) {}
  if (!individualHistory || individualHistory.length === 0 || individualHistory[0]?.month) {
    individualHistory = [
      { period: '2022', fauna: 380, flora: 1420, total: 1800 },
      { period: '2023', fauna: 460, flora: 1850, total: 2310 },
      { period: '2024', fauna: 590, flora: 2340, total: 2930 },
      { period: '2025', fauna: 740, flora: 2980, total: 3720 },
      { period: '2026', fauna: 920, flora: 3650, total: 4570 },
    ];
  } else {
    individualHistory = individualHistory.map((item: any) => ({
      ...item,
      fauna: item.fauna !== undefined ? item.fauna : (item.faunaH !== undefined ? item.faunaH : 0),
      flora: item.flora !== undefined ? item.flora : (item.floraH !== undefined ? item.floraH : 0),
    }));
  }

  // Helper check for the 7502 peak in index history
  const maxFauna1 = Math.max(...indexHistory.map((d: any) => Number(d.fauna) || 0));
  const chart1Ticks = maxFauna1 >= 7000 ? [0, 2000, 4000, 6000, 7502] : undefined;

  // Custom --o-- Legend Renderer exactly matching the reference design
  const renderCustomLegend = (props: any) => {
    const { payload } = props;
    return (
      <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs font-semibold">
        {payload?.map((entry: any, index: number) => (
          <div key={`legend-${index}`} className="inline-flex items-center gap-2" style={{ color: entry.color }}>
            <span className="flex items-center">
              <span className="w-2.5 h-[2px]" style={{ backgroundColor: entry.color }}></span>
              <span className="w-2 h-2 rounded-full border-2 bg-white" style={{ borderColor: entry.color }}></span>
              <span className="w-2.5 h-[2px]" style={{ backgroundColor: entry.color }}></span>
            </span>
            <span>{entry.value}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <MainLayout>
      <Head title="Data Indeks & Populasi Keanekaragaman Hayati - UBP Barru" />

      {/* Header Banner */}
      <section className="relative py-20 border-b border-emerald-500/20 overflow-hidden min-h-[300px] flex flex-col justify-center">
        {/* Background Layer */}
        <div className="absolute inset-0 z-0">
          {globalCms?.bio_data_hero?.image_url ? (
            <>
              <img 
                src={`/storage/${globalCms.bio_data_hero.image_url}`} 
                alt="Kehati Background" 
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-slate-950/70"></div>
            </>
          ) : (
            <div className="w-full h-full bg-gradient-to-b from-slate-900 via-emerald-950/40 to-slate-950"></div>
          )}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 relative z-10 pt-10 w-full">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <BarChart3 className="w-4 h-4" />
            <span>BIODIVERSITY METRICS & POPULATION (2022 - 2026)</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white font-heading tracking-tight drop-shadow-md">
            {globalCms?.bio_data_hero?.title || "Data Indeks & Jumlah Individu Keanekaragaman Hayati"}
          </h1>
          <p className="text-xs sm:text-base text-slate-200 max-w-3xl leading-relaxed whitespace-pre-line drop-shadow-md">
            {globalCms?.bio_data_hero?.body_text || "Visualisasi grafis tahunan (2022 - 2026) tren indeks keanekaragaman hayati Shannon-Wiener ($H'$) serta dinamika pertumbuhan jumlah individu flora dan fauna di kawasan konservasi PT PLN Indonesia Power UBP Barru."}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-slate-50 space-y-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

          {/* Key Metric Overview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-3xl bg-white border border-emerald-500/30 space-y-2 shadow-xl hover:shadow-emerald-500/10 transition-shadow">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-600 font-semibold">{settings?.bio_data_stat_1_title || 'Indeks Shannon-Wiener (Flora)'}</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-bold">{settings?.bio_data_stat_1_badge || "H' > 3.0"}</span>
              </div>
              <div className="text-3xl font-extrabold text-emerald-500 font-heading">{settings?.bio_data_stat_1_value || '3.65'}</div>
              <p className="text-xs text-slate-600">{settings?.bio_data_stat_1_desc || 'Kategori Keanekaragaman Tinggi (Sangat Baik)'}</p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-sky-500/30 space-y-2 shadow-xl hover:shadow-sky-500/10 transition-shadow">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-600 font-semibold">{settings?.bio_data_stat_2_title || 'Indeks Shannon-Wiener (Fauna)'}</span>
                <span className="px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-500 text-[10px] font-bold">{settings?.bio_data_stat_2_badge || "H' > 3.0"}</span>
              </div>
              <div className="text-3xl font-extrabold text-sky-500 font-heading">{settings?.bio_data_stat_2_value || '3.38'}</div>
              <p className="text-xs text-slate-600">{settings?.bio_data_stat_2_desc || 'Keanekaragaman fauna pesisir terkelola stabil'}</p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-amber-500/30 space-y-2 shadow-xl hover:shadow-amber-500/10 transition-shadow">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-600 font-semibold">{settings?.bio_data_stat_3_title || 'Total Individu Terdata'}</span>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 text-[10px] font-bold">{settings?.bio_data_stat_3_badge || "Tahun 2026"}</span>
              </div>
              <div className="text-3xl font-extrabold text-amber-500 font-heading">{settings?.bio_data_stat_3_value || '4,570'}</div>
              <p className="text-xs text-slate-600">{settings?.bio_data_stat_3_desc || 'Cacah individu flora & fauna terpantau terlindungi'}</p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-indigo-500/30 space-y-2 shadow-xl hover:shadow-indigo-500/10 transition-shadow">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-600 font-semibold">{settings?.bio_data_stat_4_title || 'Indeks Kemerataan (E)'}</span>
                <span className="px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-500 text-[10px] font-bold">{settings?.bio_data_stat_4_badge || "E > 0.75"}</span>
              </div>
              <div className="text-3xl font-extrabold text-indigo-500 font-heading">{settings?.bio_data_stat_4_value || '0.96'}</div>
              <p className="text-xs text-slate-600">{settings?.bio_data_stat_4_desc || 'Penyebaran populasi antar spesies sangat merata'}</p>
            </div>
          </div>

          {/* Grafik 1: Kecenderungan Absolut / Indeks Kehati (2022 – 2026) */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200/90 space-y-6 shadow-xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-500 uppercase tracking-wider mb-1">
                  <TrendingUp className="w-4 h-4 text-emerald-500" />
                  <span>GRAFIK TREN KEHATI (PICTURE GRAPHIC 1)</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading tracking-tight">
                  {settings?.bio_data_chart1_title || 'Grafik Kecenderungan Peningkatan Absolut (2022 – 2026)'}
                </h2>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-2xl border border-slate-200/90 text-xs text-slate-700 font-medium bg-white shrink-0 shadow-sm">
                <Leaf className="w-4 h-4 text-emerald-500" />
                <span>{settings?.bio_data_chart1_badge || 'Status: Tren Bersifat Fluktuatif'}</span>
              </div>
            </div>

            {/* Recharts Area Container */}
            <div className="h-80 sm:h-96 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={indexHistory} margin={{ top: 15, right: 30, left: 10, bottom: 10 }}>
                  <defs>
                    <linearGradient id="colorFauna1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.45} />
                      <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0.05} />
                    </linearGradient>
                    <linearGradient id="colorFlora1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.45} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" vertical={false} />
                  <XAxis
                    dataKey="period"
                    stroke="#94a3b8"
                    tick={{ fontSize: 12, fill: '#94a3b8' }}
                    tickLine={{ stroke: '#94a3b8' }}
                  />
                  <YAxis
                    stroke="#94a3b8"
                    tick={{ fontSize: 12, fill: '#94a3b8' }}
                    tickLine={{ stroke: '#94a3b8' }}
                    ticks={chart1Ticks}
                    domain={[0, 'auto']}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      borderColor: '#334155',
                      borderRadius: '16px',
                      color: '#fff',
                      boxShadow: '0 10px 25px -5px rgba(0,0,0,0.3)'
                    }}
                    formatter={(value: any, name: any) => [Number(value).toLocaleString(), name]}
                  />
                  <Legend content={renderCustomLegend} />
                  <Area
                    type="monotone"
                    dataKey="fauna"
                    name="Indeks Fauna (H')"
                    stroke="#0284c7"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#colorFauna1)"
                  />
                  <Area
                    type="monotone"
                    dataKey="flora"
                    name="Indeks Flora (H')"
                    stroke="#10b981"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#colorFlora1)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Grafik 2: Jumlah Individu Flora & Fauna (2022 – 2026) */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200/90 space-y-6 shadow-xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-500 uppercase tracking-wider mb-1">
                  <TrendingUp className="w-4 h-4 text-emerald-500" />
                  <span>GRAFIK POPULASI KEHATI (PICTURE GRAPHIC 2)</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading tracking-tight">
                  {settings?.bio_data_chart2_title || 'Grafik Tren Jumlah Individu (2022 – 2026)'}
                </h2>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-2xl border border-slate-200/90 text-xs text-slate-700 font-medium bg-white shrink-0 shadow-sm">
                <Leaf className="w-4 h-4 text-emerald-500" />
                <span>{settings?.bio_data_chart2_badge || 'Status: Populasi Berkembang Positif'}</span>
              </div>
            </div>

            {/* Recharts Area Container */}
            <div className="h-80 sm:h-96 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={individualHistory} margin={{ top: 15, right: 30, left: 10, bottom: 10 }}>
                  <defs>
                    <linearGradient id="colorFauna2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.45} />
                      <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0.05} />
                    </linearGradient>
                    <linearGradient id="colorFlora2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.45} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" vertical={false} />
                  <XAxis
                    dataKey="period"
                    stroke="#94a3b8"
                    tick={{ fontSize: 12, fill: '#94a3b8' }}
                    tickLine={{ stroke: '#94a3b8' }}
                  />
                  <YAxis
                    stroke="#94a3b8"
                    tick={{ fontSize: 12, fill: '#94a3b8' }}
                    tickLine={{ stroke: '#94a3b8' }}
                    domain={[0, 'auto']}
                    tickFormatter={(v) => Number(v).toLocaleString()}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      borderColor: '#334155',
                      borderRadius: '16px',
                      color: '#fff',
                      boxShadow: '0 10px 25px -5px rgba(0,0,0,0.3)'
                    }}
                    formatter={(value: any, name: any) => [`${Number(value).toLocaleString()} Individu`, name]}
                  />
                  <Legend content={renderCustomLegend} />
                  <Area
                    type="monotone"
                    dataKey="fauna"
                    name="Individu Fauna"
                    stroke="#0284c7"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#colorFauna2)"
                  />
                  <Area
                    type="monotone"
                    dataKey="flora"
                    name="Individu Flora"
                    stroke="#10b981"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#colorFlora2)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Catatan Metodologi & Standar */}
          <div className="p-6 rounded-3xl bg-emerald-50/60 border border-emerald-200/70 flex flex-col sm:flex-row items-start sm:items-center gap-4 text-xs text-slate-700">
            <div className="p-3 bg-emerald-500/10 rounded-2xl text-emerald-700 shrink-0">
              <Info className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-slate-900 font-heading">Metodologi Pemantauan Keanekaragaman Hayati (2022 - 2026)</h4>
              <p className="text-slate-600 leading-relaxed">
                Penghitungan Indeks Shannon-Wiener ($H'$) dan sensus jumlah individu dilakukan secara berkala melalui monitoring lapangan oleh tim Lingkungan PT PLN IP UBP Barru bekerja sama dengan akademisi dan konsultan keanekaragaman hayati. Standar baku mengacu pada Permen LHK untuk konservasi flora-fauna dan penilaian PROPER Hijau / Emas.
              </p>
            </div>
          </div>

        </div>
      </section>
    </MainLayout>
  );
}


