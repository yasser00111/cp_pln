import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import SectionTitle from '@/Components/SectionTitle';
import { Head } from '@inertiajs/react';
import { Users, Heart, Star, Sparkles } from 'lucide-react';

export default function GenderMainstreaming() {
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
            Srikandi PLN Indonesia Power
          </h1>
          <p className="text-xs sm:text-sm text-slate-700 max-w-2xl mx-auto leading-relaxed">
            Pemberdayaan perempuan dalam mendukung operasional yang andal, efisien, dan berkelanjutan di PT PLN Indonesia Power UBP Barru.
          </p>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <SectionTitle 
            badge="SRIKANDI BARRU" 
            title="Srikandi PLN IP UBP Barru" 
            subtitle="Menampilkan profil tangguh Srikandi yang turut serta dalam menjaga keandalan listrik negeri." 
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Placeholder Photo 1 */}
            <div className="group rounded-3xl bg-white border border-slate-200 overflow-hidden hover:border-pink-500/30 transition-all">
              <div className="aspect-[3/4] bg-slate-100 relative flex items-center justify-center overflow-hidden">
                <Users className="w-16 h-16 text-slate-700 group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
              </div>
              <div className="p-6 relative -mt-20">
                <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 border border-slate-200">
                  <h3 className="text-lg font-bold text-slate-900 font-heading">Foto Srikandi 1</h3>
                  <p className="text-xs text-pink-400 font-semibold mb-2">Jabatan / Posisi</p>
                  <p className="text-[11px] text-slate-600">Deskripsi singkat peran dan dedikasi srikandi dalam mendukung operasional UBP Barru.</p>
                </div>
              </div>
            </div>

            {/* Placeholder Photo 2 */}
            <div className="group rounded-3xl bg-white border border-slate-200 overflow-hidden hover:border-pink-500/30 transition-all">
              <div className="aspect-[3/4] bg-slate-100 relative flex items-center justify-center overflow-hidden">
                <Users className="w-16 h-16 text-slate-700 group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
              </div>
              <div className="p-6 relative -mt-20">
                <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 border border-slate-200">
                  <h3 className="text-lg font-bold text-slate-900 font-heading">Foto Srikandi 2</h3>
                  <p className="text-xs text-pink-400 font-semibold mb-2">Jabatan / Posisi</p>
                  <p className="text-[11px] text-slate-600">Deskripsi singkat peran dan dedikasi srikandi dalam mendukung operasional UBP Barru.</p>
                </div>
              </div>
            </div>

            {/* Placeholder Photo 3 */}
            <div className="group rounded-3xl bg-white border border-slate-200 overflow-hidden hover:border-pink-500/30 transition-all">
              <div className="aspect-[3/4] bg-slate-100 relative flex items-center justify-center overflow-hidden">
                <Users className="w-16 h-16 text-slate-700 group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
              </div>
              <div className="p-6 relative -mt-20">
                <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 border border-slate-200">
                  <h3 className="text-lg font-bold text-slate-900 font-heading">Foto Srikandi 3</h3>
                  <p className="text-xs text-pink-400 font-semibold mb-2">Jabatan / Posisi</p>
                  <p className="text-[11px] text-slate-600">Deskripsi singkat peran dan dedikasi srikandi dalam mendukung operasional UBP Barru.</p>
                </div>
              </div>
            </div>
            
          </div>

        </div>
      </section>
    </MainLayout>
  );
}
