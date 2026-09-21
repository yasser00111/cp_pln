import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import StatCard from '@/Components/StatCard';
import { Head, Link } from '@inertiajs/react';
import { OperationalStatistic, Facility } from '@/Types';
import { Activity, Zap, ChevronRight, ShieldCheck } from 'lucide-react';

interface Props {
  statistics: OperationalStatistic[];
  facilities: Facility[];
}

export default function Index({ statistics, facilities }: Props) {
  return (
    <MainLayout>
      <Head title="Operasional Pembangkit - UBP Barru" />

      <section className="relative py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-bold uppercase tracking-wider">
            <Activity className="w-4 h-4" />
            <span>OPERATIONAL EXCELLENCE</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-heading tracking-tight">
            Operasional PLTU Barru
          </h1>
          <p className="text-xs sm:text-sm text-slate-700 max-w-2xl leading-relaxed">
            Sistem pembangkitan energi terpadu dengan standar keandalan tinggi dan efisiensi termal optimal.
          </p>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {statistics.map((st) => (
              <StatCard key={st.id} statistic={st} />
            ))}
          </div>

          <div className="p-8 rounded-3xl bg-white border border-slate-200 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900 font-heading">Dashboard Kinerja Operasional</h3>
                <p className="text-xs text-slate-600 mt-1">Lihat grafik performa ketersediaan pasokan energi listrik secara mendalam</p>
              </div>
              <Link
                href="/operasional/performance"
                className="px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-sky-500/20"
              >
                <span>Buka Dashboard Performance</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </section>
    </MainLayout>
  );
}
