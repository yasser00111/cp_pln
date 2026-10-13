import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import SectionTitle from '@/Components/SectionTitle';
import { Head, Link } from '@inertiajs/react';
import { CompanyProfile } from '@/Types';
import { Building2, MapPin, Zap, ShieldCheck, Award, ArrowRight } from 'lucide-react';

interface ContentItem {
  id: number;
  section_key: string;
  title: string | null;
  body_text: string | null;
}

interface Props {
  about: CompanyProfile;
  cms: Record<string, ContentItem>;
}

export default function Tentang({ about, cms }: Props) {
  const title = cms['profile_tentang_title']?.title || 'Tentang PT PLN Indonesia Power UBP Barru';
  const subtitle = cms['profile_tentang_title']?.body_text || 'Mengenal lebih dekat peran strategis UBP Barru...';
  const sectionTitle = cms['profile_tentang_description']?.title || 'Peran Strategis UBP Barru';
  const sectionBody = cms['profile_tentang_description']?.body_text || 'PT PLN Indonesia Power Unit Bisnis Pembangkitan (UBP) Barru...';

  return (
    <MainLayout>
      <Head title="Tentang UBP Barru - PT PLN Indonesia Power" />

      {/* Header Banner */}
      <section className="relative py-20 bg-white border-b border-slate-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-bold uppercase tracking-wider">
            <Building2 className="w-4 h-4" />
            <span>PROFILE KORPORAT</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-heading tracking-tight">
            {title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-700 max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        </div>
      </section>

      {/* Body Content */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-6">
              <h2 className="text-2xl font-bold text-slate-900 font-heading">{sectionTitle}</h2>
              <div className="prose prose-invert text-xs sm:text-sm text-slate-700 leading-relaxed space-y-4 whitespace-pre-wrap">
                {sectionBody}
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-2xl">
                <img
                  src={
                    globalCms?.profile_tentang_image?.image_url
                      ? `/storage/${globalCms.profile_tentang_image.image_url}`
                      : (globalCms?.profile_tentang_description?.image_url
                          ? `/storage/${globalCms.profile_tentang_description.image_url}`
                          : "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=1000&q=80")
                  }
                  alt="Area Pembangkitan Barru"
                  className="w-full h-80 object-cover"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-2">
              <Zap className="w-8 h-8 text-sky-400" />
              <h3 className="text-base font-bold text-slate-900 font-heading">Kapasitas Pembangkit</h3>
              <p className="text-xs text-slate-600">2 x 50 MW pasokan listrik berkelanjutan untuk sistem kelistrikan Sulbagsel.</p>
            </div>
            <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-2">
              <ShieldCheck className="w-8 h-8 text-emerald-400" />
              <h3 className="text-base font-bold text-slate-900 font-heading">Budaya K3 Zero Accident</h3>
              <p className="text-xs text-slate-600">Penerapan keselamatan kerja ketat & pengawasan K3 lingkungan tingkat tinggi.</p>
            </div>
            <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-2">
              <Award className="w-8 h-8 text-sky-400" />
              <h3 className="text-base font-bold text-slate-900 font-heading">PROPER Hijau KLHK</h3>
              <p className="text-xs text-slate-600">Penghargaan ketaatan lingkungan melebihi regulasi secara konsisten.</p>
            </div>
          </div>

        </div>
      </section>
    </MainLayout>
  );
}
