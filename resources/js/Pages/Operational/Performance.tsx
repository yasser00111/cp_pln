import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import PerformanceChart from '@/Components/PerformanceChart';
import StatCard from '@/Components/StatCard';
import { Head } from '@inertiajs/react';
import { OperationalMetric, OperationalStatistic } from '@/Types';
import { Activity, ShieldCheck, Zap } from 'lucide-react';

interface Props {
  metrics: OperationalMetric[];
  statistics: OperationalStatistic[];
}

export default function Performance({ metrics, statistics }: Props) {
  return (
    <MainLayout>
      <Head title="Performance & Efisiensi - UBP Barru" />

      <section className="relative py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-bold uppercase tracking-wider">
            <Activity className="w-4 h-4" />
            <span>METRICS DASHBOARD</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-heading tracking-tight">
            Performance & Efisiensi Pembangkit
          </h1>
          <p className="text-xs sm:text-sm text-slate-700 max-w-2xl leading-relaxed">
            Pantau statistik ketersediaan unit (EAF), laju kalor (Heat Rate), dan histori produksi energi mingguan & bulanan.
          </p>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <PerformanceChart metrics={metrics} />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {statistics.map((st) => (
              <StatCard key={st.id} statistic={st} />
            ))}
          </div>

        </div>
      </section>
    </MainLayout>
  );
}
