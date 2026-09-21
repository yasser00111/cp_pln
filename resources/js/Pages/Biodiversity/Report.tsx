import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import SectionTitle from '@/Components/SectionTitle';
import { Head } from '@inertiajs/react';
import { FileText, Download } from 'lucide-react';

export default function KehatiReport() {
  return (
    <MainLayout>
      <Head title="Laporan Konservasi (PDF) - UBP Barru" />

      {/* Hero Banner */}
      <section className="relative py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mx-auto">
            <FileText className="w-4 h-4" />
            <span>REPORT & PUBLIKASI</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-heading tracking-tight">
            Laporan Konservasi Keanekaragaman Hayati
          </h1>
          <p className="text-xs sm:text-sm text-slate-700 max-w-2xl mx-auto leading-relaxed">
            Akses dan unduh laporan berkala mengenai program konservasi dan perlindungan keanekaragaman hayati (Kehati) di lingkungan UBP Barru.
          </p>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <SectionTitle 
            badge="DOKUMEN PDF" 
            title="Daftar Laporan Konservasi" 
            subtitle="Unduh dokumen laporan kehati resmi UBP Barru." 
          />

          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-3xl border border-slate-200 p-8 text-center space-y-6">
              <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4 border border-slate-300">
                <FileText className="w-10 h-10 text-emerald-400 opacity-80" />
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 font-heading">Laporan Konservasi Kehati 2024</h3>
              <p className="text-sm text-slate-600 leading-relaxed max-w-lg mx-auto">
                Dokumen resmi berisikan data konservasi flora dan fauna, upaya perlindungan lingkungan, serta pencapaian indeks kehati UBP Barru selama periode berjalan.
              </p>

              <button className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-900 font-bold text-sm rounded-xl transition-all shadow-lg shadow-emerald-500/20 transform hover:-translate-y-0.5 mt-4">
                <Download className="w-5 h-5" />
                <span>Unduh Dokumen PDF</span>
              </button>
            </div>
          </div>

        </div>
      </section>
    </MainLayout>
  );
}
