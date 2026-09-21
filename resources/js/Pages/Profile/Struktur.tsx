import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Head, usePage } from '@inertiajs/react';
import { Layers, Users, Zap, ShieldCheck, FileText } from 'lucide-react';

export default function Struktur() {
  const { globalCms } = usePage<any>().props;
  const cmsTitle = globalCms?.['profile_struktur_title']?.title || 'Struktur Organisasi UBP Barru';
  const cmsDesc = globalCms?.['profile_struktur_description']?.body_text || 'Bagan tata kelola manajerial PT PLN Indonesia Power UBP Barru dalam mengawal efisiensi dan keandalan pembangkit.';

  return (
    <MainLayout>
      <Head title={`${cmsTitle} - UBP Barru`} />

      <section className="relative py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-bold uppercase tracking-wider">
            <Layers className="w-4 h-4" />
            <span>TATA KELOLA ORGANISASI</span>
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="p-8 rounded-3xl bg-white border border-slate-200 text-center space-y-8">
            <div className="max-w-md mx-auto p-4 rounded-2xl bg-sky-500/10 border border-sky-500/30 space-y-1">
              <div className="text-xs font-bold text-sky-400 uppercase">PUNCAK MANAJEMEN</div>
              <div className="text-lg font-extrabold text-slate-900 font-heading">SENIOR MANAGER UBP BARRU</div>
            </div>

            <div className="w-0.5 h-8 bg-sky-500/40 mx-auto" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <Zap className="w-6 h-6 text-sky-400 mx-auto" />
                <h4 className="text-sm font-bold text-slate-900 font-heading">Manager Operasi</h4>
                <p className="text-xs text-slate-600">Pengoperasian Sistem Pembangkitan 2x50 MW</p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <Layers className="w-6 h-6 text-sky-400 mx-auto" />
                <h4 className="text-sm font-bold text-slate-900 font-heading">Manager Pemeliharaan</h4>
                <p className="text-xs text-slate-600">Maintenance Turbin, Boiler & Auxiliaries</p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <ShieldCheck className="w-6 h-6 text-emerald-400 mx-auto" />
                <h4 className="text-sm font-bold text-slate-900 font-heading">Manager K3L & Lingkungan</h4>
                <p className="text-xs text-slate-600">Keselamatan Kerja, Emisi & Kehati</p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <Users className="w-6 h-6 text-sky-400 mx-auto" />
                <h4 className="text-sm font-bold text-slate-900 font-heading">Manager Keuangan & Umum</h4>
                <p className="text-xs text-slate-600">SDM, Keuangan, CSR & Humas</p>
              </div>
            </div>
          </div>

        </div>
      </section>
    </MainLayout>
  );
}
