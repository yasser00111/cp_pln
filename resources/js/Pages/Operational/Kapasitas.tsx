import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import StatCard from '@/Components/StatCard';
import { Head } from '@inertiajs/react';
import { OperationalStatistic } from '@/Types';
import { Zap, Activity, Layers, ShieldCheck } from 'lucide-react';

interface Props {
  statistics: OperationalStatistic[];
}

export default function Kapasitas({ statistics }: Props) {
  return (
    <MainLayout>
      <Head title="Kapasitas Pembangkit - UBP Barru" />

      <section className="relative py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-bold uppercase tracking-wider">
            <Zap className="w-4 h-4" />
            <span>DAYA TERPASANG</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-heading tracking-tight">
            Kapasitas Pembangkit UBP Barru
          </h1>
          <p className="text-xs sm:text-sm text-slate-700 max-w-2xl leading-relaxed">
            Spesifikasi daya pasokan listrik 2 x 50 MW serta rencana penguatan keandalan Sistem Sulbagsel.
          </p>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-3xl bg-white border border-slate-200 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/30 text-sky-400 flex items-center justify-center font-extrabold text-lg">
                #1
              </div>
              <h3 className="text-xl font-bold text-slate-900 font-heading">PLTU Barru Unit 1 (50 MW)</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Unit 1 beroperasi dengan turbin uap kondensasi berkecepatan 3000 RPM dan boiler jenis CFB. Menghasilkan energi listrik 50 MW pada tegangan 11 kV yang kemudian dinaikkan menjadi 150 kV via Trafo Utama.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-slate-200 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-extrabold text-lg">
                #2
              </div>
              <h3 className="text-xl font-bold text-slate-900 font-heading">PLTU Barru Unit 2 (50 MW)</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Unit 2 beroperasi secara paralel dengan Unit 1 untuk memastikan ketersediaan pasokan baseload energi yang stabil dan kontinu ke seluruh jaringan wilayah Sulawesi Selatan & Barat.
              </p>
            </div>
          </div>

        </div>
      </section>
    </MainLayout>
  );
}
