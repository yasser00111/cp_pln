import React, { useEffect } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import SectionTitle from '@/Components/SectionTitle';
import { Head } from '@inertiajs/react';
import { CompanyProfile } from '@/Types';
import { Compass, Target, ShieldCheck, Zap, Leaf, Award, CheckCircle2, Star, Sparkles, HeartHandshake, Flame } from 'lucide-react';

interface ContentItem {
  id: number;
  section_key: string;
  title: string | null;
  body_text: string | null;
}

interface Props {
  visi: CompanyProfile;
  misi: Array<{ code: string; title: string; desc: string }>;
  cms: Record<string, ContentItem>;
}

export default function VisiMisi({ visi, misi, cms }: Props) {
  useEffect(() => {
    if (window.location.hash) {
      const el = document.getElementById(window.location.hash.substring(1));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  const coreCompetencies = [
    { title: cms['core_comp_1']?.title || 'Circulating Fluidized Bed (CFB) Tech', desc: cms['core_comp_1']?.body_text || 'Pengoperasian boiler tingkat efisiensi termal tinggi dengan fleksibilitas bahan bakar & emisi SOx/NOx minimal.' },
    { title: cms['core_comp_2']?.title || 'Base-load Reliability Management', desc: cms['core_comp_2']?.body_text || 'Keandalan pengoperasian pasokan energi listrik secara kontinu 24/7 tanpa henti dengan Equivalent Availability Factor (EAF) 99.45%.' },
    { title: cms['core_comp_3']?.title || '100% Circular Economy FABA Utilization', desc: cms['core_comp_3']?.body_text || 'Pemanfaatan sisa abu pembakaran batu bara (Fly Ash & Bottom Ash) menjadi paving block & struktur infrastruktur sipil.' },
    { title: cms['core_comp_4']?.title || 'Biomass Co-firing Decarbonization', desc: cms['core_comp_4']?.body_text || 'Substitusi bahan bakar fosil dengan pelet kayu dan sekam padi lokal untuk reduksi emisi karbon 18.500 Ton CO2e/Tahun.' },
  ];

  const corporateValues = [
    { title: cms['value_amanah']?.title || 'A - Amanah', desc: cms['value_amanah']?.body_text || 'Memegang teguh kepercayaan yang diberikan dalam mengelola aset vital pembangkitan nasional.' },
    { title: cms['value_kompeten']?.title || 'K - Kompeten', desc: cms['value_kompeten']?.body_text || 'Terus belajar dan mengembangkan kapabilitas keahlian teknik insinyur pembangkitan.' },
    { title: cms['value_harmonis']?.title || 'H - Harmonis', desc: cms['value_harmonis']?.body_text || 'Saling peduli dan menghargai perbedaan di lingkungan kerja dan masyarakat pesisir Barru.' },
    { title: cms['value_loyal']?.title || 'L - Loyal', desc: cms['value_loyal']?.body_text || 'Berdedikasi dan mengutamakan kepentingan bangsa dan negara di atas kepentingan pribadi.' },
    { title: cms['value_adaptif']?.title || 'A - Adaptif', desc: cms['value_adaptif']?.body_text || 'Terus berinovasi dan antusias dalam menggerakkan ataupun menghadapi transformasi digital energi.' },
    { title: cms['value_kolaboratif']?.title || 'K - Kolaboratif', desc: cms['value_kolaboratif']?.body_text || 'Membangun kerja sama yang sinergis bersama stakeholder, pemerintah daerah, dan KLHK.' },
  ];

  const strengths = [
    { title: cms['strength_1']?.title || 'Strategis Dalam Jaringan Sulbagsel', desc: cms['strength_1']?.body_text || 'Lokasi geografis di Desa Lampoko Barru yang vital menghubungkan beban puncak interkoneksi Sulawesi.' },
    { title: cms['strength_2']?.title || 'K3 Zero Accident Record', desc: cms['strength_2']?.body_text || 'Pencapaian keselamatan kerja > 1.480 hari aman tanpa pernah ada kecelakaan fatal kerja.' },
    { title: cms['strength_3']?.title || 'PROPER Hijau KLHK RI', desc: cms['strength_3']?.body_text || 'Peringkat lingkungan terbaik melebihi regulasi (beyond compliance) secara konsisten.' },
    { title: cms['strength_4']?.title || 'Sumber Daya Manusia Tersertifikasi', desc: cms['strength_4']?.body_text || 'Tenaga kerja & teknisi lokal tersertifikasi keahlian spesialis K3L, operasi, dan overhaul turbin.' },
  ];

  return (
    <MainLayout>
      <Head title="Visi, Misi, Kompetensi & Values - UBP Barru" />

      {/* Hero Banner */}
      <section className="relative py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-bold uppercase tracking-wider">
            <Compass className="w-4 h-4" />
            <span>PEDOMAN KORPORAT & FOUNDATION</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-heading tracking-tight">
            Visi, Misi & Core Values Perusahaan
          </h1>
          <p className="text-xs sm:text-sm text-slate-700 max-w-2xl leading-relaxed">
            Fondasi panduan, kompetensi utama, nilai etika AKHLAK, serta keunggulan strategis PT PLN Indonesia Power UBP Barru.
          </p>
        </div>
      </section>

      <section className="py-16 bg-slate-50 space-y-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          
          {/* 1. VISSION */}
          <div id="visi" className="scroll-mt-28 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 border border-sky-500/30 shadow-2xl space-y-4">
            <div className="text-xs font-extrabold text-sky-400 uppercase tracking-widest flex items-center gap-2">
              <Target className="w-4 h-4 text-emerald-400" />
              <span>VISSI / VISION PERUSAHAAN</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-extrabold text-sky-100 font-heading italic leading-relaxed">
              "{cms['profile_visi']?.body_text || visi?.content || 'Menjadi perusahaan energi terbaik yang tumbuh berkelanjutan dan berkelas dunia.'}"
            </h2>
          </div>

          {/* 2. MISSION */}
          <div id="misi" className="scroll-mt-28 space-y-6">
            <SectionTitle badge="MISSION" title="Misi Strategis UBP Barru" centered={false} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3 hover:border-sky-500/40 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-400 font-extrabold flex items-center justify-center text-xs font-heading">
                  M1
                </div>
                <h4 className="text-base font-bold text-slate-900 font-heading">{cms['profile_misi_1']?.title || 'Misi 1'}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{cms['profile_misi_1']?.body_text || 'Misi 1 Deskripsi'}</p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3 hover:border-sky-500/40 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-400 font-extrabold flex items-center justify-center text-xs font-heading">
                  M2
                </div>
                <h4 className="text-base font-bold text-slate-900 font-heading">{cms['profile_misi_2']?.title || 'Misi 2'}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{cms['profile_misi_2']?.body_text || 'Misi 2 Deskripsi'}</p>
              </div>

            </div>
          </div>

          {/* 3. OUR CORE COMPETENCIES */}
          <div id="competencies" className="scroll-mt-28 space-y-6 border-t border-slate-200/80 pt-16">
            <SectionTitle badge="CORE COMPETENCIES" title={cms['core_competencies_section']?.title || "Our Core Competencies"} subtitle={cms['core_competencies_section']?.body_text || "Keahlian teknis dan kapabilitas kunci operasional UBP Barru"} centered={false} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {coreCompetencies.map((comp, idx) => (
                <div key={idx} className="p-6 rounded-3xl bg-white border border-slate-200 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0 font-bold text-xs font-heading">
                      0{idx + 1}
                    </div>
                    <h3 className="text-base font-bold text-slate-900 font-heading">{comp.title}</h3>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed pl-12">{comp.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 4. OUR VALUES */}
          <div id="values" className="scroll-mt-28 space-y-6 border-t border-slate-200/80 pt-16">
            <SectionTitle badge="CORPORATE VALUES" title={cms['values_section']?.title || "Our Values (AKHLAK)"} subtitle={cms['values_section']?.body_text || "Standar etika dan perilaku insan PT PLN Indonesia Power"} centered={false} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {corporateValues.map((val, idx) => (
                <div key={idx} className="p-6 rounded-3xl bg-white border border-slate-200 space-y-2">
                  <span className="px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 font-extrabold text-xs font-heading">
                    {val.title}
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed pt-2">{val.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 5. OUR STRENGTHS */}
          <div id="strengths" className="scroll-mt-28 space-y-6 border-t border-slate-200/80 pt-16">
            <SectionTitle badge="OUR STRENGTHS" title={cms['strengths_section']?.title || "Our Strengths"} subtitle={cms['strengths_section']?.body_text || "Keunggulan kompetitif UBP Barru dalam industri energi pembangkitan"} centered={false} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {strengths.map((st, idx) => (
                <div key={idx} className="p-6 rounded-3xl bg-white border border-slate-200 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-sky-500/10 border border-sky-500/30 text-sky-400 flex items-center justify-center shrink-0">
                    <Star className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-slate-900 font-heading">{st.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{st.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </MainLayout>
  );
}
