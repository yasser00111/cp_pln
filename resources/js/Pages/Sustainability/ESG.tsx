import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Head } from '@inertiajs/react';
import { SustainabilityProgram } from '@/Types';
import { Leaf, ShieldCheck, Users, Globe } from 'lucide-react';

interface Props {
  programs: SustainabilityProgram[];
}

export default function ESG({ programs }: Props) {
  return (
    <MainLayout>
      <Head title="ESG Framework - UBP Barru" />

      <section className="relative py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Globe className="w-4 h-4" />
            <span>TATA KELOLA ESG</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-heading tracking-tight">
            Environmental, Social & Governance (ESG)
          </h1>
          <p className="text-xs sm:text-sm text-slate-700 max-w-2xl leading-relaxed">
            Penerapan standar keberlanjutan korporat berkelas dunia di PT PLN Indonesia Power UBP Barru.
          </p>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-white border border-slate-200 space-y-4">
              <Leaf className="w-8 h-8 text-emerald-400" />
              <h3 className="text-xl font-bold text-slate-900 font-heading">Environmental (E)</h3>
              <p className="text-xs text-slate-600 leading-relaxed">Dekarbonisasi biomassa co-firing, monitoring CEMS 24/7, pemanfaatan FABA 100%, dan penanaman mangrove pesisir.</p>
            </div>
            <div className="p-8 rounded-3xl bg-white border border-slate-200 space-y-4">
              <Users className="w-8 h-8 text-sky-400" />
              <h3 className="text-xl font-bold text-slate-900 font-heading">Social (S)</h3>
              <p className="text-xs text-slate-600 leading-relaxed">Pemberdayaan petambak pesisir, beasiswa pendidikan, klinik kesehatan gratis, serta Zero Accident K3.</p>
            </div>
            <div className="p-8 rounded-3xl bg-white border border-slate-200 space-y-4">
              <ShieldCheck className="w-8 h-8 text-emerald-400" />
              <h3 className="text-xl font-bold text-slate-900 font-heading">Governance (G)</h3>
              <p className="text-xs text-slate-600 leading-relaxed">Manajemen risiko berbasis ISO, transparansi laporan kinerja publik, serta kepatuhan penuh pada regulasi KLHK.</p>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
