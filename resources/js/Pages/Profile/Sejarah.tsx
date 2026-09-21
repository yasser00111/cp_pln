import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Head, usePage } from '@inertiajs/react';
import { Clock, Calendar, CheckCircle2, Zap, ShieldCheck, Award } from 'lucide-react';

export default function Sejarah() {
  const { globalCms, settings } = usePage<any>().props;
  const cmsTitle = globalCms?.['profile_sejarah_title']?.title || 'Sejarah UBP Barru';
  const cmsDesc = globalCms?.['profile_sejarah_description']?.body_text || 'Perjalanan panjang dedikasi PT PLN Indonesia Power UBP Barru dalam menerangi bumi Sulawesi.';

  let timeline = [];
  try {
    timeline = JSON.parse(settings?.history_timeline || '[]');
  } catch (e) {
    timeline = [];
  }

  return (
    <MainLayout>
      <Head title={`${cmsTitle} - UBP Barru`} />

      <section className="relative py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-bold uppercase tracking-wider">
            <Clock className="w-4 h-4" />
            <span>REKAM JEJAK</span>
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative border-l-2 border-sky-500/30 pl-6 sm:pl-8 space-y-10">
            {timeline.map((item, idx) => (
              <div key={idx} className="relative group">
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-6 h-6 rounded-full bg-slate-50 border-2 border-sky-400 flex items-center justify-center group-hover:bg-sky-500 transition-colors">
                  <div className="w-2 h-2 rounded-full bg-sky-400 group-hover:bg-white" />
                </div>
                <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-2 group-hover:border-sky-500/40 transition-colors">
                  <span className="px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 font-extrabold text-xs font-heading">
                    {item.year}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 font-heading">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
