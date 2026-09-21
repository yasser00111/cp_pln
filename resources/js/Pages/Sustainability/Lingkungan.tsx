import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Head, usePage } from '@inertiajs/react';
import { SustainabilityProgram } from '@/Types';
import { Leaf, ShieldCheck, Zap } from 'lucide-react';

interface Props {
  programs: SustainabilityProgram[];
}

export default function Lingkungan({ programs }: Props) {
  const { globalCms } = usePage<any>().props;
  const cmsTitle = globalCms?.['sustainability_lingkungan_title']?.title || 'Program Pengelolaan Lingkungan';
  const cmsDesc = globalCms?.['sustainability_lingkungan_description']?.body_text || 'Mitigasi emisi cerobong CEMS, efisiensi air SWRO, serta pemanfaatan 100% Fly Ash & Bottom Ash (FABA) terpadu.';

  return (
    <MainLayout>
      <Head title={`${cmsTitle} - UBP Barru`} />

      <section className="relative py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Leaf className="w-4 h-4" />
            <span>PENGELOLAAN LINGKUNGAN</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-heading tracking-tight">
            {cmsTitle}
          </h1>
          <p className="text-xs sm:text-sm text-slate-700 max-w-2xl leading-relaxed">
            {cmsDesc}
          </p>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {programs.map((prog) => (
              <div key={prog.id} className="p-8 rounded-3xl bg-white border border-slate-200 space-y-4">
                <h3 className="text-lg font-bold text-slate-900 font-heading">{prog.title}</h3>
                <p className="text-xs text-slate-700 leading-relaxed">{prog.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
