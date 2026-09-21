import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Head, usePage } from '@inertiajs/react';
import { SafetyProgram } from '@/Types';
import { ShieldCheck, Zap, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface Props {
  safety: SafetyProgram;
}

export default function K3({ safety }: Props) {
  const { globalCms } = usePage<any>().props;
  const cmsTitle = globalCms?.['sustainability_k3_title']?.title || 'Safety First & Budaya K3';
  const cmsDesc = globalCms?.['sustainability_k3_description']?.body_text || 'Meningkatkan keselamatan kerja tenaga kerja dan mitra operasional secara konsisten tanpa kompromi.';

  return (
    <MainLayout>
      <Head title={`${cmsTitle} - UBP Barru`} />

      <section className="relative py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>OCCUPATIONAL HEALTH & SAFETY</span>
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-950 border border-emerald-500/30 space-y-4 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="text-xs font-bold text-emerald-400 uppercase tracking-widest">RECORD ACCIDENT FREE</div>
              <div className="text-4xl sm:text-6xl font-extrabold text-white font-heading">
                {usePage<any>().props.globalCms?.safety_record_days?.title || safety?.zero_accident_days || 1480} <span className="text-xl sm:text-2xl text-emerald-400 font-bold">Hari Kerja Safe</span>
              </div>
              <p className="text-xs text-emerald-100/80">{usePage<any>().props.globalCms?.safety_record_days?.body_text || "Pencapaian Zero Accident berturut-turut tanpa kehilangan jam kerja."}</p>
            </div>
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-10 h-10" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-2">
              <ShieldCheck className="w-6 h-6 text-sky-400" />
              <h3 className="text-base font-bold text-slate-900 font-heading">Safety Golden Rules</h3>
              <p className="text-xs text-slate-600">Penerapan 5 aturan emas keselamatan kerja bagi setiap pekerja dan kontraktor di area site.</p>
            </div>
            <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-2">
              <Zap className="w-6 h-6 text-emerald-400" />
              <h3 className="text-base font-bold text-slate-900 font-heading">Daily Tool Box Talk</h3>
              <p className="text-xs text-slate-600">Pengarahan keselamatan & identifikasi potensi bahaya secara intensif sebelum memulai shift.</p>
            </div>
            <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-2">
              <AlertTriangle className="w-6 h-6 text-sky-400" />
              <h3 className="text-base font-bold text-slate-900 font-heading">Emergency Response Team</h3>
              <p className="text-xs text-slate-600">Tim tanggap darurat dan simulasi pemadaman kebakaran serta tumpahan terkoordinasi.</p>
            </div>
          </div>

        </div>
      </section>
    </MainLayout>
  );
}
