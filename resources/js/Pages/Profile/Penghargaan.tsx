import React, { useState, useEffect } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Head } from '@inertiajs/react';
import { Award as AwardType } from '@/Types';
import { Award as AwardIcon, Calendar, CheckCircle2, Eye, X, ShieldCheck } from 'lucide-react';

interface Props {
  awards: AwardType[];
}

export default function Penghargaan({ awards }: Props) {
  const [selectedAward, setSelectedAward] = useState<AwardType | null>(null);
  const [filter, setFilter] = useState<'All' | 'Awards' | 'Certifications'>('All');

  useEffect(() => {
    if (window.location.hash === '#certifications') {
      setFilter('Certifications');
    } else if (window.location.hash === '#awards') {
      setFilter('Awards');
    }
  }, []);

  const filteredAwards = awards.filter((aw) => {
    if (filter === 'Awards') return aw.category.toLowerCase().includes('lingkungan') || aw.category.toLowerCase().includes('proper') || aw.category.toLowerCase().includes('award');
    if (filter === 'Certifications') return aw.category.toLowerCase().includes('iso') || aw.category.toLowerCase().includes('mutu') || aw.category.toLowerCase().includes('k3') || aw.category.toLowerCase().includes('manajemen');
    return true;
  });

  return (
    <MainLayout>
      <Head title="Awards & Certifications - UBP Barru" />

      <section className="relative py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-bold uppercase tracking-wider">
            <AwardIcon className="w-4 h-4" />
            <span>PRESTASI & ISO</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-heading tracking-tight">
            Awards & Certifications
          </h1>
          <p className="text-xs sm:text-sm text-slate-700 max-w-2xl leading-relaxed">
            Pengakuan internasional dan nasional atas standar mutu, keselamatan kerja, serta pengelolaan lingkungan UBP Barru.
          </p>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Tabs Filter */}
          <div className="flex items-center gap-2 border-b border-slate-200 pb-4">
            <button
              onClick={() => setFilter('All')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                filter === 'All' ? 'bg-sky-500 text-white' : 'bg-white text-slate-600 hover:text-slate-900'
              }`}
            >
              Semua
            </button>
            <button
              id="awards"
              onClick={() => setFilter('Awards')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                filter === 'Awards' ? 'bg-sky-500 text-white' : 'bg-white text-slate-600 hover:text-slate-900'
              }`}
            >
              Awards (Penghargaan Korporat)
            </button>
            <button
              id="certifications"
              onClick={() => setFilter('Certifications')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                filter === 'Certifications' ? 'bg-sky-500 text-white' : 'bg-white text-slate-600 hover:text-slate-900'
              }`}
            >
              Certifications (Sertifikasi ISO)
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredAwards.map((aw) => (
              <div
                key={aw.id}
                className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4 hover:border-sky-500/40 transition-all duration-300 group flex flex-col justify-between shadow-xl"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
                      <AwardIcon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold text-sky-400 font-heading">{aw.year}</span>
                  </div>

                  <span className="inline-block px-2.5 py-1 rounded-full bg-slate-50 text-[10px] font-bold text-slate-600 border border-slate-200 uppercase">
                    {aw.category}
                  </span>

                  <h3 className="text-base font-bold text-slate-900 font-heading group-hover:text-sky-300">{aw.title}</h3>
                  <div className="text-xs text-slate-600 font-medium">Penerbit: {aw.issuer}</div>
                  {aw.description && <p className="text-xs text-slate-600 leading-relaxed">{aw.description}</p>}
                </div>

                <button
                  onClick={() => setSelectedAward(aw)}
                  className="w-full py-2.5 rounded-xl bg-slate-50 hover:bg-sky-500 text-slate-700 hover:text-slate-900 text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Lihat Sertifikat / Award</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certificate Modal Viewer */}
      {selectedAward && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-50/80 backdrop-blur-md">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setSelectedAward(null)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-slate-100 text-slate-600 hover:text-slate-900"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                {selectedAward.category} ({selectedAward.year})
              </span>
              <h3 className="text-xl font-bold text-slate-900 font-heading">{selectedAward.title}</h3>
              <div className="text-xs text-slate-600 font-semibold">Penerbit: {selectedAward.issuer}</div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 p-2 flex items-center justify-center">
              <img
                src={selectedAward.image || 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&w=800&q=80'}
                alt={selectedAward.title}
                className="max-h-64 object-contain rounded-xl"
              />
            </div>

            <div className="flex justify-end">
              <button onClick={() => setSelectedAward(null)} className="px-5 py-2.5 rounded-xl bg-sky-500 text-white font-bold text-xs">
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
}
