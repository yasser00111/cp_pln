import React, { useState, useEffect } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Head } from '@inertiajs/react';
import { CsrProgram } from '@/Types';
import { Users, Calendar, MapPin, CheckCircle2, Maximize2, X, Sparkles, ExternalLink } from 'lucide-react';

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
  const title = cms['sustainability_csr_title']?.title || 'Corporate Social Responsibility (CSR)';
  const subtitle = cms['sustainability_csr_title']?.body_text || 'Inisiatif pemberdayaan masyarakat di bidang Pendidikan, Kesehatan, Ekonomi, Lingkungan, dan Sosial di Kabupaten Barru.';

  const [selectedPhoto, setSelectedPhoto] = useState<{ title: string; image: string; location?: string } | null>(null);

  // Close modal on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedPhoto(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <MainLayout>
      <Head title="Program CSR / TJSL - UBP Barru" />

      {/* Hero Banner */}
      <section className="relative py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-600 text-xs font-bold uppercase tracking-wider">
            <Users className="w-4 h-4" />
            <span>TANGGUNG JAWAB SOSIAL & LINGKUNGAN (TJSL)</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-heading tracking-tight">
            {title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-700 max-w-3xl leading-relaxed whitespace-pre-wrap">
            {subtitle}
          </p>
        </div>
      </section>

      {/* Main Section with Alternating Zigzag Layout */}
      <section id="unggulan" className="py-16 bg-slate-50 space-y-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
                Daftar Program CSR Unggulan
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Dokumentasi implementasi program TJSL berkelanjutan bersama masyarakat sekitar unit pembangkit
              </p>
            </div>
            <span className="text-xs font-bold px-3.5 py-1.5 rounded-xl bg-sky-500/10 text-sky-600 border border-sky-500/20 shrink-0">
              {programs.length} Program Berjalan
            </span>
          </div>

          <div className="space-y-12">
            {programs.map((cs, index) => {
              const isEven = index % 2 === 0;
              const photoUrl = cs.image || 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1000&q=80';

              return (
                <div
                  key={cs.id}
                  className="p-6 sm:p-8 lg:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    {/* Sisi Foto Program */}
                    <div className={`lg:col-span-5 ${isEven ? 'lg:order-1' : 'lg:order-2'} w-full`}>
                      <div
                        onClick={() => setSelectedPhoto({ title: cs.title, image: photoUrl, location: cs.location })}
                        className="relative w-full aspect-[4/3] sm:aspect-[16/10] max-h-[340px] rounded-2xl overflow-hidden bg-slate-100 shadow-md group cursor-pointer border border-slate-200"
                      >
                        <img
                          src={photoUrl}
                          alt={cs.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                        {/* Floating Action Badge */}
                        <div className="absolute bottom-3 right-3 flex items-center gap-2">
                          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/85 backdrop-blur-md text-white text-[11px] font-semibold shadow-lg group-hover:bg-sky-600 transition-colors">
                            <Maximize2 className="w-3.5 h-3.5" />
                            <span>Perbesar</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Sisi Teks / Uraian Program */}
                    <div className={`lg:col-span-7 ${isEven ? 'lg:order-2' : 'lg:order-1'} space-y-4`}>
                      <div className="flex flex-wrap items-center gap-3 text-xs">
                        <span className="px-3 py-1 rounded-full bg-sky-50 text-sky-700 font-bold uppercase tracking-wider border border-sky-200/80">
                          {cs.category}
                        </span>
                        {cs.date && (
                          <div className="flex items-center gap-1.5 text-slate-500 font-medium">
                            <Calendar className="w-3.5 h-3.5 text-sky-500" />
                            <span>{cs.date}</span>
                          </div>
                        )}
                        {cs.location && (
                          <div className="flex items-center gap-1.5 text-emerald-600 font-medium">
                            <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                            <span>{cs.location}</span>
                          </div>
                        )}
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading leading-tight">
                        {cs.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                        {cs.description}
                      </p>

                      {cs.impact && (
                        <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 space-y-1">
                          <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase text-emerald-700 tracking-wider">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            <span>Dampak & Manfaat Program:</span>
                          </div>
                          <p className="text-xs text-slate-700 leading-relaxed font-medium">
                            {cs.impact}
                          </p>
                        </div>
                      )}

                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={() => setSelectedPhoto({ title: cs.title, image: photoUrl, location: cs.location })}
                          className="inline-flex items-center gap-2 px-5 py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs rounded-xl shadow-md shadow-sky-600/20 transition-all cursor-pointer"
                        >
                          <Maximize2 className="w-3.5 h-3.5" />
                          <span>Lihat Dokumentasi Penuh</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Lightbox Modal: Perbesar Foto CSR */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-5xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
            {/* Header */}
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
              <div>
                <h4 className="text-sm sm:text-base font-bold font-heading">{selectedPhoto.title}</h4>
                {selectedPhoto.location && (
                  <p className="text-[11px] text-slate-400">📍 {selectedPhoto.location}</p>
                )}
              </div>
              <button
                type="button"
                onClick={() => setSelectedPhoto(null)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                title="Tutup (ESC)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Image Preview */}
            <div className="p-4 sm:p-6 bg-slate-100 flex items-center justify-center min-h-[300px] max-h-[75vh] overflow-auto">
              <img
                src={selectedPhoto.image}
                alt={selectedPhoto.title}
                className="max-h-[65vh] max-w-full object-contain rounded-2xl shadow-lg border border-slate-200 bg-white"
              />
            </div>

            {/* Footer */}
            <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
              <span>Program CSR & TJSL PT PLN Indonesia Power UBP Barru</span>
              <a
                href={selectedPhoto.image}
                target="_blank"
                rel="noreferrer"
                download
                className="font-bold text-sky-600 hover:text-sky-700 inline-flex items-center gap-1"
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
