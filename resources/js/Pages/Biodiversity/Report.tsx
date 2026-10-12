import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import SectionTitle from '@/Components/SectionTitle';
import { Head, usePage } from '@inertiajs/react';
import { FileText, Download, Calendar, HardDrive, ShieldCheck, ArrowRight } from 'lucide-react';

interface DocumentItem {
  id: string;
  title: string;
  category: string;
  year: string;
  file_path: string;
  file_size: string;
  created_at: string;
}

interface Props {
  reports?: DocumentItem[];
}

export default function KehatiReport({ reports = [] }: Props) {
  const { globalCms } = usePage<any>().props;

  const heroTitle = globalCms?.bio_report_hero_title?.title || 'Laporan Konservasi Keanekaragaman Hayati';
  const heroDesc = globalCms?.bio_report_hero_desc?.body_text || 'Akses dan unduh laporan berkala mengenai program konservasi dan perlindungan keanekaragaman hayati (Kehati) di lingkungan PT PLN Indonesia Power UBP Barru.';

  return (
    <MainLayout>
      <Head title="Laporan Konservasi (PDF) - UBP Barru" />

      {/* Hero Banner */}
      <section className="relative py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 text-xs font-bold uppercase tracking-wider mx-auto">
            <FileText className="w-4 h-4" />
            <span>REPORT & PUBLIKASI RESMI</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-heading tracking-tight">
            {heroTitle}
          </h1>
          <p className="text-xs sm:text-sm text-slate-700 max-w-2xl mx-auto leading-relaxed">
            {heroDesc}
          </p>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <SectionTitle 
            badge="DOKUMEN PDF" 
            title="Daftar Laporan Konservasi" 
            subtitle="Unduh dokumen laporan pemantauan flora, fauna, dan indeks kehati resmi UBP Barru." 
          />

          {reports && reports.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {reports.map((doc) => (
                <div
                  key={doc.id}
                  className="bg-white rounded-3xl border border-slate-200 p-8 flex flex-col justify-between shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="space-y-5">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-700 border border-emerald-500/20">
                        Tahun {doc.year}
                      </span>
                      <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center text-emerald-600">
                        <FileText className="w-5 h-5" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-slate-900 font-heading leading-snug">
                        {doc.title}
                      </h3>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Dokumen resmi publikasi berkala pemantauan konservasi flora & fauna serta indeks keanekaragaman hayati kawasan PLTU Barru.
                      </p>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-slate-400 pt-2 border-t border-slate-100">
                      <span className="flex items-center gap-1.5 font-medium">
                        <HardDrive className="w-3.5 h-3.5 text-slate-400" />
                        {doc.file_size || 'PDF'}
                      </span>
                      <span className="flex items-center gap-1.5 font-medium">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                        Terverifikasi
                      </span>
                    </div>
                  </div>

                  <div className="pt-6">
                    <a
                      href={doc.file_path}
                      target="_blank"
                      rel="noreferrer"
                      download
                      className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-600/20 transition-all transform hover:-translate-y-0.5"
                    >
                      <Download className="w-4 h-4" />
                      <span>Unduh Dokumen PDF</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-slate-200 p-10 text-center space-y-5 shadow-sm">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto">
                <FileText className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-slate-900 font-heading">Laporan Sedang Diperbarui</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
                  Dokumen laporan konservasi berkala sedang dalam proses finalisasi dan pengunggahan oleh tim Pengelolaan Lingkungan UBP Barru.
                </p>
              </div>
            </div>
          )}

        </div>
      </section>
    </MainLayout>
  );
}

