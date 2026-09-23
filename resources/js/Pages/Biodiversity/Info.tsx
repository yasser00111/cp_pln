import React, { useState } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Head, usePage } from '@inertiajs/react';
import { BiodiversitySpecies, BiodiversityProgram } from '@/Types';
import { Leaf, Search, MapPin } from 'lucide-react';

interface Props {
  species: BiodiversitySpecies[];
  program: BiodiversityProgram;
}

export default function Info({ species, program }: Props) {
  const { settings, globalCms } = usePage<any>().props;
  const [activeTab, setActiveTab] = useState<'All' | 'Flora' | 'Fauna'>('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSpecies = species.filter((sp) => {
    const matchesTab = activeTab === 'All' || sp.category === activeTab;
    const matchesSearch =
      sp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (sp.latin_name && sp.latin_name.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesTab && matchesSearch;
  });

  return (
    <MainLayout>
      <Head title="Informasi Keanekaragaman Hayati - UBP Barru" />

      {/* Hero Header */}
      <section className="relative py-20 border-b border-emerald-500/20 overflow-hidden min-h-[300px] flex flex-col justify-center">
        {/* Background Layer */}
        <div className="absolute inset-0 z-0">
          {globalCms?.bio_info_hero?.image_url ? (
            <>
              <img 
                src={`/storage/${globalCms.bio_info_hero.image_url}`} 
                alt="Biodiversity Background" 
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-slate-950/70"></div>
            </>
          ) : (
            <div className="w-full h-full bg-gradient-to-b from-slate-900 via-emerald-950/40 to-slate-950"></div>
          )}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 relative z-10 pt-10 w-full">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Leaf className="w-4 h-4" />
            <span>BIODIVERSITY INFORMATION</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white font-heading tracking-tight drop-shadow-md">
            {globalCms?.bio_info_hero?.title || "Status & Indeks Keanekaragaman Hayati"}
          </h1>
          <p className="text-xs sm:text-base text-slate-200 max-w-3xl leading-relaxed whitespace-pre-line drop-shadow-md">
            {globalCms?.bio_info_hero?.body_text || "Informasi terkait status dan kecenderungan sumber daya kehati dan sumber biologi (flora dan fauna) serta data indeks keanekaragaman hayati di wilayah PT PLN Indonesia Power UBP Barru."}
          </p>
        </div>
      </section>

      <section className="py-16 bg-slate-50 space-y-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Biodiversity Statistics Dashboard Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-3xl bg-white border border-emerald-500/20 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 font-extrabold flex items-center justify-center text-xs px-2 whitespace-nowrap">
                {settings?.bio_info_stat_1_badge || '34+'}
              </div>
              <div className="text-2xl font-extrabold text-slate-900 font-heading">{settings?.bio_info_stat_1_title || 'Spesies Teridentifikasi'}</div>
              <p className="text-xs text-slate-600">{settings?.bio_info_stat_1_desc || 'Flora mangrove & fauna perlindungan teridentifikasi.'}</p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-emerald-500/20 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 font-extrabold flex items-center justify-center text-xs px-2 whitespace-nowrap">
                {settings?.bio_info_stat_2_badge || '14.5 Ha'}
              </div>
              <div className="text-2xl font-extrabold text-slate-900 font-heading">{settings?.bio_info_stat_2_title || 'Area Konservasi'}</div>
              <p className="text-xs text-slate-600">{settings?.bio_info_stat_2_desc || 'Kawasan pesisir pantai Lampoko Barru.'}</p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-emerald-500/20 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 font-extrabold flex items-center justify-center text-xs px-2 whitespace-nowrap">
                {settings?.bio_info_stat_3_badge || 'H (Tinggi)'}
              </div>
              <div className="text-2xl font-extrabold text-slate-900 font-heading">{settings?.bio_info_stat_3_title || 'Indeks Shannon-Wiener'}</div>
              <p className="text-xs text-slate-600">{settings?.bio_info_stat_3_desc || 'Keanekaragaman ekosistem perairan tergolong tinggi.'}</p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-emerald-500/20 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 font-extrabold flex items-center justify-center text-xs px-2 whitespace-nowrap">
                {settings?.bio_info_stat_4_badge || 'Stabil'}
              </div>
              <div className="text-2xl font-extrabold text-slate-900 font-heading">{settings?.bio_info_stat_4_title || 'Tren Populasi'}</div>
              <p className="text-xs text-slate-600">{settings?.bio_info_stat_4_desc || 'Kecenderungan populasi satwa tetap stabil/meningkat.'}</p>
            </div>
          </div>

          {/* Flora & Fauna Catalog */}
          <div className="space-y-8 pt-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 font-heading">Katalog Sumber Daya Kehati</h2>
                <p className="text-xs text-slate-600 mt-1">Daftar satwa dan tumbuhan yang dipantau (Picture Label)</p>
              </div>

              {/* Filter Tabs & Search Bar */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-600 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="Cari spesies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 pr-4 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-emerald-500 w-48"
                  />
                </div>

                <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 text-xs font-semibold">
                  <button
                    onClick={() => setActiveTab('All')}
                    className={`px-3 py-1.5 rounded-lg transition-all ${
                      activeTab === 'All' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Semua
                  </button>
                  <button
                    onClick={() => setActiveTab('Flora')}
                    className={`px-3 py-1.5 rounded-lg transition-all ${
                      activeTab === 'Flora' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Flora
                  </button>
                  <button
                    onClick={() => setActiveTab('Fauna')}
                    className={`px-3 py-1.5 rounded-lg transition-all ${
                      activeTab === 'Fauna' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Fauna
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredSpecies.map((sp) => (
                <div
                  key={sp.id}
                  className="bg-white border border-slate-200 rounded-3xl overflow-hidden hover:border-emerald-500/40 transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="h-48 overflow-hidden relative">
                      <img
                        src={sp.image || 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80'}
                        alt={sp.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-50/80 backdrop-blur-md border border-white/10 text-[10px] font-bold text-emerald-400">
                        {sp.category}
                      </div>
                    </div>

                    <div className="p-5 space-y-2">
                      <h3 className="text-base font-bold text-slate-900 font-heading">{sp.name}</h3>
                      {sp.latin_name && <div className="text-xs text-emerald-400 italic font-mono">{sp.latin_name}</div>}
                      <span className="inline-block px-2.5 py-0.5 rounded-full bg-slate-50 text-[10px] text-slate-600 border border-slate-200">
                        {sp.conservation_status}
                      </span>
                      <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed pt-1">{sp.description}</p>
                    </div>
                  </div>

                  {sp.location && (
                    <div className="p-5 pt-0">
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-600 border-t border-slate-200 pt-3">
                        <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="line-clamp-1">{sp.location}</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              {filteredSpecies.length === 0 && (
                <div className="col-span-full py-10 text-center text-slate-500">
                  Data tidak ditemukan.
                </div>
              )}
            </div>
            
            {/* Grafik Placeholder */}
            <div className="mt-12 p-8 rounded-3xl border border-slate-200 bg-white/50">
              <h3 className="text-xl font-bold text-slate-900 font-heading mb-4">Grafik Indeks Keanekaragaman Hayati</h3>
              <p className="text-sm text-slate-600 mb-6">Tren perubahan indeks keanekaragaman flora dan fauna secara periodik.</p>
              
              <div className="aspect-video sm:aspect-[21/9] w-full rounded-2xl bg-slate-100/50 flex flex-col items-center justify-center border border-dashed border-slate-300">
                  <span className="text-emerald-500 text-4xl mb-2">📊</span>
                  <span className="text-slate-600 text-xs font-semibold tracking-wider">CHART / GRAFIK PICTURE</span>
              </div>
            </div>

          </div>

        </div>
      </section>
    </MainLayout>
  );
}
