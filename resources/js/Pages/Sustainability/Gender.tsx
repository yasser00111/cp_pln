import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import SectionTitle from '@/Components/SectionTitle';
import { Head, usePage } from '@inertiajs/react';
import { Users, Heart } from 'lucide-react';

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
      <Head title="Gender Mainstreaming - UBP Barru" />

      {/* Hero Banner */}
      <section className="relative py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-400 text-xs font-bold uppercase tracking-wider mx-auto">
            <Heart className="w-4 h-4" />
            <span>GENDER MAINSTREAMING</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-heading tracking-tight">
            {globalCms?.sustainability_gender_title?.title || "Srikandi PLN Indonesia Power"}
          </h1>
          <p className="text-xs sm:text-sm text-slate-700 max-w-2xl mx-auto leading-relaxed whitespace-pre-line">
            {globalCms?.sustainability_gender_title?.body_text || "Pemberdayaan perempuan dalam mendukung operasional yang andal, efisien, dan berkelanjutan di PT PLN Indonesia Power UBP Barru."}
          </p>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <SectionTitle 
            badge="SRIKANDI BARRU" 
            title={globalCms?.srikandi_section?.title || "Srikandi PLN IP UBP Barru"} 
            subtitle={globalCms?.srikandi_section?.body_text || "Menampilkan profil tangguh Srikandi yang turut serta dalam menjaga keandalan listrik negeri."} 
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {srikandis.length > 0 ? (
              srikandis.map((srikandi) => (
                <div key={srikandi.id} className="group rounded-3xl bg-white border border-slate-200 overflow-hidden hover:border-pink-500/30 transition-all">
                  <div className="aspect-[3/4] bg-slate-100 relative flex items-center justify-center overflow-hidden">
                    {srikandi.image_path ? (
                      <img src={srikandi.image_path} alt={srikandi.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    ) : (
                      <Users className="w-16 h-16 text-slate-700 group-hover:scale-110 transition-transform duration-500" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                  </div>
                  <div className="p-6 relative -mt-20">
                    <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 border border-slate-200 min-h-[140px] flex flex-col justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 font-heading leading-tight">{srikandi.name}</h3>
                        <p className="text-xs text-pink-500 font-semibold mb-2">{srikandi.position}</p>
                      </div>
                      <p className="text-[11px] text-slate-600 line-clamp-3">{srikandi.description}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-slate-500 py-10">Belum ada profil Srikandi yang didaftarkan.</div>
            )}
          </div>

        </div>
      </section>
    </MainLayout>
  );
}
