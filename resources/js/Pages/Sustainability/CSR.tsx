import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Head } from '@inertiajs/react';
import { CsrProgram } from '@/Types';
import { Users, Calendar, MapPin, CheckCircle2 } from 'lucide-react';

interface ContentItem {
  id: number;
  section_key: string;
  title: string | null;
  body_text: string | null;
}

interface Props {
  programs: CsrProgram[];
  cms: Record<string, ContentItem>;
}

export default function CSR({ programs, cms }: Props) {
  const title = cms['sustainability_csr_title']?.title || 'Program CSR UBP Barru';
  const subtitle = cms['sustainability_csr_title']?.body_text || 'Inisiatif pemberdayaan masyarakat di bidang Pendidikan, Kesehatan, Ekonomi, Lingkungan, dan Sosial di Kabupaten Barru.';

  return (
    <MainLayout>
      <Head title="Program CSR / TJSL - UBP Barru" />

      <section className="relative py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-bold uppercase tracking-wider">
            <Users className="w-4 h-4" />
            <span>TANGGUNG JAWAB SOSIAL & LINGKUNGAN</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-heading tracking-tight">
            {title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-700 max-w-2xl leading-relaxed whitespace-pre-wrap">
            {subtitle}
          </p>
        </div>
      </section>

      <section id="unggulan" className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {programs.map((cs) => (
              <div key={cs.id} className="bg-white border border-slate-200 rounded-3xl overflow-hidden space-y-4 p-6 hover:border-sky-500/40 transition-all">
                <div className="h-44 rounded-2xl overflow-hidden">
                  <img src={cs.image || 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80'} alt={cs.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-600">
                  <span className="px-2.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 font-bold uppercase">{cs.category}</span>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-sky-400" />
                    <span>{cs.date}</span>
                  </div>
                </div>
                <h3 className="text-base font-bold text-slate-900 font-heading">{cs.title}</h3>
                <div className="flex items-center gap-1.5 text-xs text-slate-600">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{cs.location}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{cs.description}</p>
                {cs.impact && (
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-emerald-300">
                    <div className="font-bold text-[10px] uppercase text-emerald-400">Dampak Program:</div>
                    <div>{cs.impact}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
