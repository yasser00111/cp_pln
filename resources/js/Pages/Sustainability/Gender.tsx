import React, { useState, useEffect } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Head, usePage } from '@inertiajs/react';
import { Users, Heart, Maximize2, X, Sparkles, ExternalLink, ShieldCheck } from 'lucide-react';

interface Srikandi {
  id: number;
  name: string;
  position: string;
  description: string;
  image_path: string | null;
}

interface Props {
  srikandis: Srikandi[];
}

export default function GenderMainstreaming({ srikandis }: Props) {
  const { globalCms } = usePage<any>().props;

  const [selectedSrikandi, setSelectedSrikandi] = useState<Srikandi | null>(null);

  // Close modal on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedSrikandi(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <MainLayout>
      <Head title="Gender Mainstreaming & Srikandi - UBP Barru" />

      {/* Hero Banner */}
      <section className="relative py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-600 text-xs font-bold uppercase tracking-wider">
            <Heart className="w-4 h-4" />
            <span>GENDER MAINSTREAMING & EMPOWERMENT</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-heading tracking-tight">
            {globalCms?.sustainability_gender_title?.title || 'Srikandi PLN Indonesia Power'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-700 max-w-3xl leading-relaxed whitespace-pre-line">
            {globalCms?.sustainability_gender_title?.body_text ||
              'Pemberdayaan perempuan dalam mendukung operasional yang andal, efisien, dan berkelanjutan serta mendorong kesetaraan gender di lingkungan kerja PT PLN Indonesia Power UBP Barru.'}
          </p>
        </div>
      </section>

      {/* Main Section with Alternating Zigzag Layout */}
      <section className="py-16 bg-slate-50 space-y-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
                {globalCms?.srikandi_section?.title || 'Profil Srikandi PLN IP UBP Barru'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                {globalCms?.srikandi_section?.body_text ||
                  'Menampilkan sosok tangguh Srikandi yang turut berkontribusi nyata dalam menjaga keandalan listrik negeri.'}
              </p>
            </div>
            <span className="text-xs font-bold px-3.5 py-1.5 rounded-xl bg-pink-500/10 text-pink-600 border border-pink-500/20 shrink-0">
              {srikandis.length} Profil Srikandi
            </span>
          </div>

          <div className="space-y-12">
            {srikandis.length > 0 ? (
              srikandis.map((srikandi, index) => {
                const isEven = index % 2 === 0;
                const photoUrl =
                  srikandi.image_path ||
                  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80';

                return (
                  <div
                    key={srikandi.id}
                    className="p-6 sm:p-8 lg:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                      {/* Sisi Foto Srikandi */}
                      <div className={`lg:col-span-5 ${isEven ? 'lg:order-1' : 'lg:order-2'} w-full`}>
                        <div
                          onClick={() => setSelectedSrikandi(srikandi)}
                          className="relative w-full aspect-[4/3] sm:aspect-[16/10] max-h-[340px] rounded-2xl overflow-hidden bg-pink-50 shadow-md group cursor-pointer border border-pink-100"
                        >
                          <img
                            src={photoUrl}
                            alt={srikandi.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                          {/* Floating Action Badge */}
                          <div className="absolute bottom-3 right-3 flex items-center gap-2">
                            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/85 backdrop-blur-md text-white text-[11px] font-semibold shadow-lg group-hover:bg-pink-600 transition-colors">
                              <Maximize2 className="w-3.5 h-3.5" />
                              <span>Perbesar</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Sisi Teks / Uraian Srikandi */}
                      <div className={`lg:col-span-7 ${isEven ? 'lg:order-2' : 'lg:order-1'} space-y-4`}>
                        <div className="space-y-2">
                          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-50 text-pink-700 border border-pink-200/80 text-xs font-bold uppercase tracking-wider">
                            <Heart className="w-3.5 h-3.5 text-pink-500" />
                            <span>{srikandi.position}</span>
                          </div>
                          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading leading-tight">
                            {srikandi.name}
                          </h3>
                        </div>

                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                          {srikandi.description ||
                            'Berperan aktif dalam inisiatif korporat, menjaga standar keselamatan kerja, efisiensi operasional, serta menginspirasi generasi perempuan dalam industri ketenagalistrikan nasional.'}
                        </p>

                        <div className="pt-2">
                          <button
                            type="button"
                            onClick={() => setSelectedSrikandi(srikandi)}
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs rounded-xl shadow-md shadow-pink-600/20 transition-all cursor-pointer"
                          >
                            <Maximize2 className="w-3.5 h-3.5" />
                            <span>Lihat Profil Srikandi</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
                <Heart className="w-12 h-12 text-pink-400 mx-auto" />
                <h4 className="text-base font-bold text-slate-800">Belum Ada Profil Srikandi Terdaftar</h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Profil Srikandi dapat ditambahkan melalui panel admin pada menu Kelola Srikandi.
                </p>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* Lightbox Modal: Perbesar Foto Srikandi */}
      {selectedSrikandi && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
            {/* Header */}
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
              <div>
                <h4 className="text-sm sm:text-base font-bold font-heading">{selectedSrikandi.name}</h4>
                <p className="text-[11px] text-pink-400">{selectedSrikandi.position}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedSrikandi(null)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                title="Tutup (ESC)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Image Preview */}
            <div className="p-4 sm:p-6 bg-slate-100 flex items-center justify-center min-h-[300px] max-h-[75vh] overflow-auto">
              <img
                src={selectedSrikandi.image_path || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1000&q=80'}
                alt={selectedSrikandi.name}
                className="max-h-[65vh] max-w-full object-contain rounded-2xl shadow-lg border border-slate-200 bg-white"
              />
            </div>

            {/* Footer */}
            <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
              <span>Srikandi PT PLN Indonesia Power UBP Barru</span>
              <a
                href={selectedSrikandi.image_path || '#'}
                target="_blank"
                rel="noreferrer"
                download
                className="font-bold text-pink-600 hover:text-pink-700 inline-flex items-center gap-1"
              >
                <span>Buka Gambar Asli</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
}
