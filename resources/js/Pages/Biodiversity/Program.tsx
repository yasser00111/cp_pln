import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import SectionTitle from '@/Components/SectionTitle';
import { Head, usePage } from '@inertiajs/react';
import { Leaf, Sprout, Heart, Target } from 'lucide-react';

export default function BiodiversityProgram({ program }: { program: any }) {
  const { globalCms } = usePage<any>().props;

  // Hero Section
  const cmsTitle = globalCms?.['biodiversity_program_title']?.title || 'Program Biologi & Konservasi';
  const cmsDesc =
    globalCms?.['biodiversity_program_title']?.body_text ||
    globalCms?.['biodiversity_program_description']?.body_text ||
    'Inisiatif berkelanjutan UBP Barru dalam penghijauan kawasan, perlindungan habitat penyu laut, serta restorasi mangrove pesisir.';

  // Section 2: Upaya Pelestarian Lingkungan
  const sectionTitle = globalCms?.['biodiversity_program_section']?.title || 'Upaya Pelestarian Lingkungan';
  const sectionSubtitle = globalCms?.['biodiversity_program_section']?.body_text || 'Menjaga ekosistem pesisir dan satwa dilindungi demi masa depan yang lebih baik.';

  // Program Cards
  const card1Title = globalCms?.['biodiversity_program_card_1']?.title || 'Konservasi Mangrove Lampoko';
  const card1Desc = globalCms?.['biodiversity_program_card_1']?.body_text || 'Penanaman dan rehabilitasi ekosistem mangrove di pesisir Lampoko sebagai benteng alami pencegah abrasi dan penyerap karbon.';

  const card2Title = globalCms?.['biodiversity_program_card_2']?.title || 'Penangkaran Penyu Laut';
  const card2Desc = globalCms?.['biodiversity_program_card_2']?.body_text || 'Program penetasan dan pelepasan tukik untuk mendukung pelestarian populasi penyu yang terancam punah di sekitar wilayah operasi.';

  const card3Title = globalCms?.['biodiversity_program_card_3']?.title || 'Penghijauan Kawasan Pembangkit';
  const card3Desc = globalCms?.['biodiversity_program_card_3']?.body_text || 'Penanaman pohon produktif dan perindang di area UBP Barru untuk menekan emisi, meningkatkan kualitas udara, serta memberikan lingkungan kerja yang asri.';

  return (
    <MainLayout>
      <Head title={`${cmsTitle} - UBP Barru`} />

      {/* Hero Banner */}
      <section className="relative py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 text-xs font-bold uppercase tracking-wider mx-auto">
            <Sprout className="w-4 h-4 text-emerald-500" />
            <span>AKSI NYATA</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-heading tracking-tight">
            {cmsTitle}
          </h1>
          <p className="text-xs sm:text-sm text-slate-700 max-w-2xl mx-auto leading-relaxed">
            {cmsDesc}
          </p>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <SectionTitle 
            badge="PROGRAM UNGGULAN" 
            title={sectionTitle} 
            subtitle={sectionSubtitle} 
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Program 1 */}
            <div className="bg-white rounded-3xl border border-slate-200 p-8 space-y-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                <Leaf className="w-7 h-7 text-emerald-500" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 font-heading">{card1Title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {card1Desc}
              </p>
            </div>

            {/* Program 2 */}
            <div className="bg-white rounded-3xl border border-slate-200 p-8 space-y-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-2xl bg-sky-500/20 flex items-center justify-center border border-sky-500/30">
                <Heart className="w-7 h-7 text-sky-500" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 font-heading">{card2Title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {card2Desc}
              </p>
            </div>
            
            {/* Program 3 */}
            <div className="bg-white rounded-3xl border border-slate-200 p-8 space-y-4 md:col-span-2 text-center flex flex-col items-center shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/20 flex items-center justify-center border border-amber-500/30">
                <Target className="w-7 h-7 text-amber-500" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 font-heading">{card3Title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed max-w-2xl mx-auto">
                {card3Desc}
              </p>
            </div>
          </div>

        </div>
      </section>
    </MainLayout>
  );
}
