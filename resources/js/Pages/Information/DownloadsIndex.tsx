import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Head, router, usePage } from '@inertiajs/react';
import { Document } from '@/Types';
import { Download, FileText, Calendar, HardDrive } from 'lucide-react';

interface Props {
  documents: Document[];
  categories: string[];
  selectedCategory: string;
}

export default function DownloadsIndex({ documents, categories, selectedCategory }: Props) {
  const { globalCms } = usePage<any>().props;

  const handleFilter = (cat: string) => {
    router.get('/downloads', { category: cat }, { preserveState: true });
  };

  return (
    <MainLayout>
      <Head title="Download Center & Laporan - UBP Barru" />

      <section className="relative py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-bold uppercase tracking-wider">
            <Download className="w-4 h-4" />
            <span>PUBLIKASI KORPORAT</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-heading tracking-tight">
            {globalCms?.downloads_hero?.title || "Download Center & Laporan Resmi"}
          </h1>
          <p className="text-sm text-slate-700 max-w-2xl leading-relaxed whitespace-pre-line">
            {globalCms?.downloads_hero?.body_text || "Unduh berkas Annual Report, Sustainability Report, Company Profile, dan Laporan Lingkungan UBP Barru."}
          </p>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Category Filter */}
          <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleFilter(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === cat ? 'bg-sky-500 text-white' : 'bg-white text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="bg-white border border-slate-200 rounded-3xl p-6 flex items-start justify-between gap-4 hover:border-sky-500/40 transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center shrink-0">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-sky-400 uppercase">{doc.category} ({doc.year})</span>
                    <h3 className="text-sm font-bold text-slate-900 font-heading group-hover:text-sky-300">{doc.title}</h3>
                    <div className="flex items-center gap-3 text-[11px] text-slate-600">
                      <span className="flex items-center gap-1"><HardDrive className="w-3 h-3 text-slate-500" /> {doc.file_size}</span>
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-slate-500" /> {doc.year}</span>
                    </div>
                  </div>
                </div>

                <a
                  href={doc.file_path}
                  download
                  className="px-4 py-2.5 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-400 font-bold text-xs hover:bg-sky-500 hover:text-slate-900 transition-all flex items-center gap-1.5 shrink-0"
                >
                  <Download className="w-4 h-4" />
                  <span>PDF</span>
                </a>
              </div>
            ))}
          </div>

        </div>
      </section>
    </MainLayout>
  );
}
