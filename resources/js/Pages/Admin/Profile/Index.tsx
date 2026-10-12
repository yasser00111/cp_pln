import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router } from '@inertiajs/react';
import { CompanyProfile } from '@/Types';
import {
  Save,
  CheckCircle2,
  Compass,
  Target,
  Zap,
  Award,
  HeartHandshake,
  Sparkles,
  Star,
  ShieldCheck,
  BookOpen,
  Plus,
  Trash2
} from 'lucide-react';

interface ContentItem {
  id?: number;
  section_key: string;
  title: string | null;
  body_text: string | null;
}

interface Props {
  about?: CompanyProfile;
  visi?: CompanyProfile;
  misi?: string[];
  cms?: Record<string, ContentItem>;
}

export default function AdminProfileIndex({ about, visi, misi, cms = {} }: Props) {
  const [activeTab, setActiveTab] = useState<'visi-misi' | 'competencies' | 'values' | 'strengths' | 'tentang'>('visi-misi');
  const [savedMsg, setSavedMsg] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Visi, Misi & Tentang
  const [tentangText, setTentangText] = useState(about?.content || '');
  const [visiText, setVisiText] = useState(cms['profile_visi']?.body_text || visi?.content || 'Menjadi perusahaan energi terbaik yang tumbuh berkelanjutan dan berkelas dunia.');
  const [misiList, setMisiList] = useState<string[]>(
    misi && misi.length > 0
      ? misi
      : [
          'Menyediakan pasokan energi listrik yang andal, efisien, dan ramah lingkungan.',
          'Mendorong pertumbuhan ekonomi daerah melalui pemberdayaan masyarakat dan kemitraan strategis.',
        ]
  );

  // CMS Content State (Core Competencies, Values, Strengths)
  const [cmsData, setCmsData] = useState<Record<string, { title: string; body_text: string }>>({
    // Core Competencies
    core_competencies_section: {
      title: cms['core_competencies_section']?.title || 'Our Core Competencies',
      body_text: cms['core_competencies_section']?.body_text || 'Keahlian teknis dan kapabilitas kunci operasional UBP Barru',
    },
    core_comp_1: {
      title: cms['core_comp_1']?.title || 'Circulating Fluidized Bed (CFB) Tech',
      body_text: cms['core_comp_1']?.body_text || 'Pengoperasian boiler tingkat efisiensi termal tinggi dengan fleksibilitas bahan bakar & emisi SOx/NOx minimal.',
    },
    core_comp_2: {
      title: cms['core_comp_2']?.title || 'Base-load Reliability Management',
      body_text: cms['core_comp_2']?.body_text || 'Keandalan pengoperasian pasokan energi listrik secara kontinu 24/7 tanpa henti dengan Equivalent Availability Factor (EAF) 99.45%.',
    },
    core_comp_3: {
      title: cms['core_comp_3']?.title || '100% Circular Economy FABA Utilization',
      body_text: cms['core_comp_3']?.body_text || 'Pemanfaatan sisa abu pembakaran batu bara (Fly Ash & Bottom Ash) menjadi paving block & struktur infrastruktur sipil.',
    },
    core_comp_4: {
      title: cms['core_comp_4']?.title || 'Biomass Co-firing Decarbonization',
      body_text: cms['core_comp_4']?.body_text || 'Substitusi bahan bakar fosil dengan pelet kayu dan sekam padi lokal untuk reduksi emisi karbon 18.500 Ton CO2e/Tahun.',
    },

    // Corporate Values (AKHLAK)
    values_section: {
      title: cms['values_section']?.title || 'Our Values (AKHLAK)',
      body_text: cms['values_section']?.body_text || 'Standar etika dan perilaku insan PT PLN Indonesia Power',
    },
    value_amanah: {
      title: cms['value_amanah']?.title || 'A - Amanah',
      body_text: cms['value_amanah']?.body_text || 'Memegang teguh kepercayaan yang diberikan dalam mengelola aset vital pembangkitan nasional.',
    },
    value_kompeten: {
      title: cms['value_kompeten']?.title || 'K - Kompeten',
      body_text: cms['value_kompeten']?.body_text || 'Terus belajar dan mengembangkan kapabilitas keahlian teknik insinyur pembangkitan.',
    },
    value_harmonis: {
      title: cms['value_harmonis']?.title || 'H - Harmonis',
      body_text: cms['value_harmonis']?.body_text || 'Saling peduli dan menghargai perbedaan di lingkungan kerja dan masyarakat pesisir Barru.',
    },
    value_loyal: {
      title: cms['value_loyal']?.title || 'L - Loyal',
      body_text: cms['value_loyal']?.body_text || 'Berdedikasi dan mengutamakan kepentingan bangsa dan negara di atas kepentingan pribadi.',
    },
    value_adaptif: {
      title: cms['value_adaptif']?.title || 'A - Adaptif',
      body_text: cms['value_adaptif']?.body_text || 'Terus berinovasi dan antusias dalam menggerakkan ataupun menghadapi transformasi digital energi.',
    },
    value_kolaboratif: {
      title: cms['value_kolaboratif']?.title || 'K - Kolaboratif',
      body_text: cms['value_kolaboratif']?.body_text || 'Membangun kerja sama yang sinergis bersama stakeholder, pemerintah daerah, dan KLHK.',
    },

    // Our Strengths
    strengths_section: {
      title: cms['strengths_section']?.title || 'Our Strengths',
      body_text: cms['strengths_section']?.body_text || 'Keunggulan kompetitif UBP Barru dalam industri energi pembangkitan',
    },
    strength_1: {
      title: cms['strength_1']?.title || 'Strategis Dalam Jaringan Sulbagsel',
      body_text: cms['strength_1']?.body_text || 'Lokasi geografis di Desa Lampoko Barru yang vital menghubungkan beban puncak interkoneksi Sulawesi.',
    },
    strength_2: {
      title: cms['strength_2']?.title || 'K3 Zero Accident Record',
      body_text: cms['strength_2']?.body_text || 'Pencapaian keselamatan kerja > 1.480 hari aman tanpa pernah ada kecelakaan fatal kerja.',
    },
    strength_3: {
      title: cms['strength_3']?.title || 'PROPER Hijau KLHK RI',
      body_text: cms['strength_3']?.body_text || 'Peringkat lingkungan terbaik melebihi regulasi (beyond compliance) secara konsisten.',
    },
    strength_4: {
      title: cms['strength_4']?.title || 'Sumber Daya Manusia Tersertifikasi',
      body_text: cms['strength_4']?.body_text || 'Tenaga kerja & teknisi lokal tersertifikasi keahlian spesialis K3L, operasi, dan overhaul turbin.',
    },
  });

  const handleCmsChange = (key: string, field: 'title' | 'body_text', val: string) => {
    setCmsData((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        [field]: val,
      },
    }));
  };

  const handleMisiChange = (index: number, val: string) => {
    const updated = [...misiList];
    updated[index] = val;
    setMisiList(updated);
  };

  const addMisiItem = () => {
    setMisiList([...misiList, '']);
  };

  const removeMisiItem = (index: number) => {
    setMisiList(misiList.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    router.post(
      '/admin/profile',
      {
        tentang: tentangText,
        visi: visiText,
        misi: misiList.filter((m) => m.trim() !== ''),
        cms: cmsData,
      },
      {
        onSuccess: () => {
          setIsSubmitting(false);
          setSavedMsg(true);
          setTimeout(() => setSavedMsg(false), 3500);
        },
        onError: () => {
          setIsSubmitting(false);
        },
      }
    );
  };

  return (
    <AdminLayout>
      <Head title="Kelola Profil, Visi, Misi & Values - Admin PLN IP UBP Barru" />

      <div className="space-y-8">
        {/* Header Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 font-heading">
              Kelola Profil, Visi Misi & Core Values
            </h1>
            <p className="text-xs text-slate-600">
              Ubah pernyataan Visi, Misi, Our Core Competencies, Our Values (AKHLAK), dan Our Strengths
            </p>
          </div>
          {savedMsg && (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 text-xs font-bold animate-pulse">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Semua perubahan berhasil disimpan!</span>
            </div>
          )}
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-200">
          <button
            type="button"
            onClick={() => setActiveTab('visi-misi')}
            className={`px-5 py-3 text-xs font-bold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'visi-misi'
                ? 'border-sky-500 text-sky-600 font-extrabold'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Visi & Misi</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('competencies')}
            className={`px-5 py-3 text-xs font-bold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'competencies'
                ? 'border-emerald-500 text-emerald-600 font-extrabold'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>Our Core Competencies</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('values')}
            className={`px-5 py-3 text-xs font-bold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'values'
                ? 'border-indigo-500 text-indigo-600 font-extrabold'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <HeartHandshake className="w-4 h-4" />
            <span>Our Values (AKHLAK)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('strengths')}
            className={`px-5 py-3 text-xs font-bold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'strengths'
                ? 'border-amber-500 text-amber-600 font-extrabold'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <Star className="w-4 h-4" />
            <span>Our Strengths</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('tentang')}
            className={`px-5 py-3 text-xs font-bold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'tentang'
                ? 'border-slate-800 text-slate-900 font-extrabold'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Tentang & Sejarah</span>
          </button>
        </div>

        {/* Global Save Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* TAB 1: VISI & MISI */}
          {activeTab === 'visi-misi' && (
            <div className="space-y-6">
              {/* Visi */}
              <div className="p-6 md:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-sky-600 font-bold text-xs uppercase tracking-wider border-b border-slate-100 pb-3">
                  <Target className="w-4 h-4" />
                  <span>Pernyataan Visi Perusahaan</span>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Teks Visi (Akan tampil di halaman /profile/visi-misi dan beranda)
                  </label>
                  <textarea
                    rows={3}
                    value={visiText}
                    onChange={(e) => setVisiText(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs text-slate-900 focus:outline-none focus:border-sky-500 transition-colors"
                    placeholder="Tuliskan pernyataan Visi UBP Barru..."
                    required
                  />
                </div>
              </div>

              {/* Misi */}
              <div className="p-6 md:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2 text-sky-600 font-bold text-xs uppercase tracking-wider">
                    <Compass className="w-4 h-4" />
                    <span>Poin-Poin Misi Strategis</span>
                  </div>
                  <button
                    type="button"
                    onClick={addMisiItem}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-500/10 text-sky-600 hover:bg-sky-500/20 text-xs font-bold transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Tambah Poin Misi</span>
                  </button>
                </div>
                <div className="space-y-3">
                  {misiList.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center text-xs font-bold shrink-0">
                        M{idx + 1}
                      </div>
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => handleMisiChange(idx, e.target.value)}
                        className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-sky-500 transition-colors"
                        placeholder={`Deskripsi misi strategis ke-${idx + 1}`}
                        required
                      />
                      {misiList.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeMisiItem(idx)}
                          className="p-2.5 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500/20 text-xs transition-colors shrink-0"
                          title="Hapus poin misi ini"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: OUR CORE COMPETENCIES */}
          {activeTab === 'competencies' && (
            <div className="space-y-6">
              {/* Section Header */}
              <div className="p-6 md:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-wider border-b border-slate-100 pb-3">
                  <Zap className="w-4 h-4" />
                  <span>Header Bagian Core Competencies</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Judul Bagian</label>
                    <input
                      type="text"
                      value={cmsData.core_competencies_section.title}
                      onChange={(e) => handleCmsChange('core_competencies_section', 'title', e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Subjudul / Deskripsi Bagian</label>
                    <input
                      type="text"
                      value={cmsData.core_competencies_section.body_text}
                      onChange={(e) => handleCmsChange('core_competencies_section', 'body_text', e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
              </div>

              {/* 4 Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((num) => {
                  const key = `core_comp_${num}`;
                  return (
                    <div key={key} className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
                      <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                        <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold text-xs">
                          0{num}
                        </div>
                        <span className="text-xs font-bold text-slate-800">Kompetensi 0{num}</span>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">Judul Kompetensi</label>
                          <input
                            type="text"
                            value={cmsData[key]?.title || ''}
                            onChange={(e) => handleCmsChange(key, 'title', e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-emerald-500 font-semibold"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">Uraian / Deskripsi</label>
                          <textarea
                            rows={3}
                            value={cmsData[key]?.body_text || ''}
                            onChange={(e) => handleCmsChange(key, 'body_text', e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-emerald-500"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: OUR VALUES (AKHLAK) */}
          {activeTab === 'values' && (
            <div className="space-y-6">
              {/* Section Header */}
              <div className="p-6 md:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-wider border-b border-slate-100 pb-3">
                  <HeartHandshake className="w-4 h-4" />
                  <span>Header Bagian Corporate Values</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Judul Bagian</label>
                    <input
                      type="text"
                      value={cmsData.values_section.title}
                      onChange={(e) => handleCmsChange('values_section', 'title', e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Subjudul / Deskripsi Bagian</label>
                    <input
                      type="text"
                      value={cmsData.values_section.body_text}
                      onChange={(e) => handleCmsChange('values_section', 'body_text', e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>
              </div>

              {/* 6 AKHLAK Values Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { key: 'value_amanah', defaultTitle: 'A - Amanah' },
                  { key: 'value_kompeten', defaultTitle: 'K - Kompeten' },
                  { key: 'value_harmonis', defaultTitle: 'H - Harmonis' },
                  { key: 'value_loyal', defaultTitle: 'L - Loyal' },
                  { key: 'value_adaptif', defaultTitle: 'A - Adaptif' },
                  { key: 'value_kolaboratif', defaultTitle: 'K - Kolaboratif' },
                ].map(({ key, defaultTitle }) => (
                  <div key={key} className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
                    <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                      <span className="px-2.5 py-0.5 rounded-md bg-indigo-500/10 text-indigo-600 font-bold text-xs">
                        {defaultTitle.slice(0, 1)}
                      </span>
                      <span className="text-xs font-bold text-slate-800">{defaultTitle}</span>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Label Nilai</label>
                        <input
                          type="text"
                          value={cmsData[key]?.title || ''}
                          onChange={(e) => handleCmsChange(key, 'title', e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-indigo-500 font-semibold"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Deskripsi Nilai</label>
                        <textarea
                          rows={3}
                          value={cmsData[key]?.body_text || ''}
                          onChange={(e) => handleCmsChange(key, 'body_text', e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-indigo-500"
                          required
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: OUR STRENGTHS */}
          {activeTab === 'strengths' && (
            <div className="space-y-6">
              {/* Section Header */}
              <div className="p-6 md:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-amber-600 font-bold text-xs uppercase tracking-wider border-b border-slate-100 pb-3">
                  <Star className="w-4 h-4" />
                  <span>Header Bagian Our Strengths</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Judul Bagian</label>
                    <input
                      type="text"
                      value={cmsData.strengths_section.title}
                      onChange={(e) => handleCmsChange('strengths_section', 'title', e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Subjudul / Deskripsi Bagian</label>
                    <input
                      type="text"
                      value={cmsData.strengths_section.body_text}
                      onChange={(e) => handleCmsChange('strengths_section', 'body_text', e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>
              </div>

              {/* 4 Strengths Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((num) => {
                  const key = `strength_${num}`;
                  return (
                    <div key={key} className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
                      <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                        <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold text-xs">
                          <ShieldCheck className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-bold text-slate-800">Keunggulan 0{num}</span>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">Judul Keunggulan</label>
                          <input
                            type="text"
                            value={cmsData[key]?.title || ''}
                            onChange={(e) => handleCmsChange(key, 'title', e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-500 font-semibold"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">Uraian / Deskripsi</label>
                          <textarea
                            rows={3}
                            value={cmsData[key]?.body_text || ''}
                            onChange={(e) => handleCmsChange(key, 'body_text', e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-amber-500"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 5: TENTANG & SEJARAH */}
          {activeTab === 'tentang' && (
            <div className="p-6 md:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-xs uppercase tracking-wider border-b border-slate-100 pb-3">
                <BookOpen className="w-4 h-4" />
                <span>Deskripsi Tentang UBP Barru & Sejarah Singkat</span>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Deskripsi Lengkap (Akan tampil pada halaman /profile/tentang)
                </label>
                <textarea
                  rows={8}
                  value={tentangText}
                  onChange={(e) => setTentangText(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs text-slate-900 focus:outline-none focus:border-sky-500 leading-relaxed"
                  placeholder="Tuliskan deskripsi profil dan sejarah UBP Barru..."
                />
              </div>
            </div>
          )}

          {/* Bottom Save Action Bar */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-200">
            <span className="text-xs text-slate-500">
              Perubahan pada tab ini akan langsung diperbarui ke halaman publik terkait.
            </span>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-2xl bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-sky-600/20 transition-all disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{isSubmitting ? 'Menyimpan...' : 'Simpan Semua Perubahan Profil'}</span>
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
