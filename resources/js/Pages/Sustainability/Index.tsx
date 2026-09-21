import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { SustainabilityProgram, SafetyProgram } from '@/Types';
import { Leaf, ShieldCheck, Users, Globe, ArrowRight } from 'lucide-react';

interface Props {
  programs: SustainabilityProgram[];
  safety: SafetyProgram;
}

export default function Index({ programs, safety }: Props) {
  return (
    <MainLayout>
      <Head title="Sustainability Commitment - UBP Barru" />

      <section className="relative py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Leaf className="w-4 h-4" />
            <span>KEBERLANJUTAN ENERGI</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-heading tracking-tight">
            {usePage<any>().props.globalCms?.sustainability_commitment?.title || "Sustainability Commitment"}
          </h1>
          <p className="text-xs sm:text-sm text-slate-700 max-w-2xl leading-relaxed whitespace-pre-line">
            {usePage<any>().props.globalCms?.sustainability_commitment?.body_text || "PT PLN Indonesia Power UBP Barru berkomitmen menciptakan nilai jangka panjang dengan menerapkan ESG, circular economy FABA, dan perlindungan keanekaragaman hayati."}
          </p>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {programs.map((prog) => (
              <div key={prog.id} className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4 hover:border-emerald-500/40 transition-all">
                <div className="h-44 rounded-2xl overflow-hidden">
                  <img src={prog.image || 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80'} alt={prog.title} className="w-full h-full object-cover" />
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-extrabold text-[10px] uppercase">
                  {prog.category}
                </span>
                <h3 className="text-base font-bold text-slate-900 font-heading">{prog.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{prog.description}</p>
              </div>
            ))}
          </div>

          {/* Quick link to Biodiversity */}
          <div className="p-8 rounded-3xl bg-gradient-to-r from-emerald-950/80 via-slate-900 to-slate-950 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-900 font-heading">Program Keanekaragaman Hayati & Konservasi Penyu</h3>
              <p className="text-xs text-slate-700">Jelajahi spesies flora & fauna serta dokumentasi pemantauan kawasan hutan mangrove Barru.</p>
            </div>
            <Link
              href="/biodiversity"
              className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider shrink-0"
            >
              Buka Page Biodiversity
            </Link>
          </div>

        </div>
      </section>
    </MainLayout>
  );
}
