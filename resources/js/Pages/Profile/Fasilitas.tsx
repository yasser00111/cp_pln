import React, { useState } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Head } from '@inertiajs/react';
import { Facility } from '@/Types';
import { Zap, ChevronRight, X } from 'lucide-react';

interface Props {
  facilities: Facility[];
}

export default function Fasilitas({ facilities }: Props) {
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);

  return (
    <MainLayout>
      <Head title="Fasilitas Pembangkit - UBP Barru" />

      <section className="relative py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-bold uppercase tracking-wider">
            <Zap className="w-4 h-4" />
            <span>SARANA & PRASARANA</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-heading tracking-tight">
            Fasilitas Utama PLTU Barru
          </h1>
          <p className="text-xs sm:text-sm text-slate-700 max-w-2xl leading-relaxed">
            Infrastruktur canggih yang mendukung keandalan pengoperasian pembangkit listrik 2x50 MW UBP Barru.
          </p>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facilities.map((fac) => (
              <div
                key={fac.id}
                className="bg-white border border-slate-200 rounded-3xl overflow-hidden hover:border-sky-500/40 transition-all duration-300 group shadow-xl"
              >
                <div className="h-52 overflow-hidden relative">
                  <img
                    src={fac.image || 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=800&q=80'}
                    alt={fac.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-50/80 backdrop-blur-md border border-white/10 text-[10px] font-bold text-sky-400">
                    {fac.category}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <h3 className="text-base font-bold text-slate-900 font-heading group-hover:text-sky-300">{fac.title}</h3>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{fac.description}</p>
                  <button
                    onClick={() => setSelectedFacility(fac)}
                    className="w-full py-2.5 rounded-xl bg-slate-50 hover:bg-sky-500 text-slate-700 hover:text-slate-900 text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Detail Spesifikasi</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facility Detail Modal */}
      {selectedFacility && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-50/80 backdrop-blur-md">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setSelectedFacility(null)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-slate-100 text-slate-600 hover:text-slate-900"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-sky-400 uppercase tracking-widest px-2.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/20">
                {selectedFacility.category}
              </span>
              <h3 className="text-xl font-bold text-slate-900 font-heading">{selectedFacility.title}</h3>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">{selectedFacility.description}</p>

            {selectedFacility.technical_specs && (
              <div className="space-y-2 pt-2 border-t border-slate-200">
                <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">Spesifikasi Teknis</div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  {Object.entries(selectedFacility.technical_specs).map(([key, val]) => (
                    <div key={key} className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-0.5">
                      <div className="text-[10px] text-slate-600">{key}</div>
                      <div className="font-semibold text-sky-300">{val}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="pt-2 flex justify-end">
              <button onClick={() => setSelectedFacility(null)} className="px-5 py-2.5 rounded-xl bg-sky-500 text-white font-bold text-xs">
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

    </MainLayout>
  );
}
