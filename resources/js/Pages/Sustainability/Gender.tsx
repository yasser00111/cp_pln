import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Head, usePage } from '@inertiajs/react';
import { Users, Heart, Sparkles, ShieldCheck } from 'lucide-react';

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
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                {globalCms?.srikandi_section?.body_text ||
                  'Mengenal lebih dekat para Srikandi yang berdedikasi tinggi dalam berbagai bidang strategis operasional dan manajemen.'}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3.5 py-1.5 rounded-full bg-pink-100 text-pink-700 text-xs font-bold">
                {srikandis.length} Profil Srikandi
              </span>
            </div>
          </div>

          {/* Cards List */}
          <div className="space-y-8">
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
                      {/* Sisi Foto Srikandi (Diperbesar Vertikal & Proporsional Sesuai Contoh) */}
                      <div className={`lg:col-span-5 ${isEven ? 'lg:order-1' : 'lg:order-2'} w-full flex justify-center items-center`}>
                        <div className="relative w-full aspect-[3/4] sm:aspect-[4/5] min-h-[380px] sm:min-h-[460px] lg:min-h-[500px] max-h-[560px] rounded-3xl overflow-hidden bg-gradient-to-b from-pink-50/50 to-white shadow-md border border-pink-100">
                          <img
                            src={photoUrl}
                            alt={srikandi.name}
                            className="w-full h-full object-cover object-top"
                          />
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
    </MainLayout>
  );
}
