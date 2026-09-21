import React, { useState } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Head, usePage } from '@inertiajs/react';
import { BiodiversitySpecies } from '@/Types';
import { Leaf, Search, MapPin, Database, Table, Image, ShieldCheck } from 'lucide-react';

interface Props {
  species: BiodiversitySpecies[];
}

export default function KehatiData({ species }: Props) {
  const { globalCms } = usePage<any>().props;
  const [activeTab, setActiveTab] = useState<'All' | 'Flora' | 'Fauna'>('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSpecies = (species || []).filter((sp) => {
    const matchesTab = activeTab === 'All' || sp.category === activeTab;
    const matchesSearch =
      sp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (sp.latin_name && sp.latin_name.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesTab && matchesSearch;
  });

  return (
    <MainLayout>
      <Head title="Informasi & Kecenderungan Sumber Data Hayati - UBP Barru" />

      {/* Header Banner */}
      <section className="relative py-20 bg-gradient-to-b from-slate-900 via-emerald-950/40 to-slate-950 border-b border-emerald-500/20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 relative z-10 pt-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Database className="w-4 h-4" />
            <span>BIODIVERSITY DATA & RESOURCE TENDENCY</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-heading tracking-tight">
            {globalCms?.biodiversity_data_info?.title || "Informasi Terkait & Kecenderungan Sumber Data Hayati dan Sumber Biologi"}
          </h1>
          <p className="text-xs sm:text-sm text-slate-700 max-w-3xl leading-relaxed whitespace-pre-line">
            {globalCms?.biodiversity_data_info?.body_text || "Data inventarisasi komprehensif flora dan fauna di kawasan PLTU Barru, disertai gambar dokumentasi spesimen dan matriks tabel status perlindungan (IUCN / CITES / Regulasi LHK)."}
          </p>
        </div>
      </section>

      {/* Main Section */}
      <section className="py-16 bg-slate-50 space-y-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

          {/* Table Picture & Matrix Overview Card */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200 space-y-6 shadow-2xl">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  <Table className="w-4 h-4" />
                  <span>Matriks Tabel & Gambar Spesimen</span>
                </div>
                <h2 className="text-2xl font-bold text-slate-900 font-heading">
                  Tabel Evaluasi & Status Konservasi Biologi
                </h2>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-600 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="Cari nama spesies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-emerald-500 w-52"
                  />
                </div>
                <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-xl border border-slate-200 text-xs font-semibold">
                  {(['All', 'Flora', 'Fauna'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-3 py-1.5 rounded-lg transition-all ${
                        activeTab === tab ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {tab === 'All' ? 'Semua' : tab}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Picture Table */}
            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 text-slate-600 uppercase text-[10px] font-bold tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="py-4 px-4 text-center">Spesimen (Picture)</th>
                    <th className="py-4 px-4">Nama Lokal / Spesies</th>
                    <th className="py-4 px-4">Nama Latin (Taxonomy)</th>
                    <th className="py-4 px-4">Kategori</th>
                    <th className="py-4 px-4">Status Konservasi (IUCN/KLHK)</th>
                    <th className="py-4 px-4">Kecenderungan Populasi</th>
                    <th className="py-4 px-4">Lokasi Sebaran</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 bg-white/40">
                  {filteredSpecies.map((sp) => (
                    <tr key={sp.id} className="hover:bg-slate-100/40 transition-colors">
                      <td className="py-3 px-4 text-center">
                        <div className="w-16 h-12 mx-auto rounded-xl overflow-hidden border border-slate-300 relative shadow-md">
                          <img
                            src={sp.image || 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=300&q=80'}
                            alt={sp.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </td>
                      <td className="py-3 px-4 font-bold text-slate-900 font-heading">{sp.name}</td>
                      <td className="py-3 px-4 text-emerald-400 italic font-mono">{sp.latin_name || '-'}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${sp.category === 'Flora' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-sky-500/10 text-sky-400 border border-sky-500/30'}`}>
                          {sp.category}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2.5 py-1 rounded-lg bg-slate-50 text-slate-700 border border-slate-200 font-medium">
                          {sp.conservation_status || 'Risiko Rendah (LC)'}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold">
                          <span>↑ Stabil / Meningkat</span>
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-600">{sp.location || 'Kawasan Pesisir Lampoko'}</td>
                    </tr>
                  ))}
                  {filteredSpecies.length === 0 && (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-slate-500">
                        Tidak ada data spesies yang cocok.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Cards Display with Picture Labels */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-900 font-heading">Dokumentasi Detail Sumber Daya Hayati</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSpecies.map((sp) => (
                <div key={sp.id} className="p-5 rounded-3xl bg-white border border-slate-200 space-y-4 hover:border-emerald-500/40 transition-all">
                  <div className="h-44 rounded-2xl overflow-hidden relative">
                    <img
                      src={sp.image || 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80'}
                      alt={sp.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2 right-2 px-2 py-1 rounded-lg bg-slate-50/80 backdrop-blur-md text-[10px] font-bold text-emerald-300 flex items-center gap-1">
                      <Image className="w-3 h-3" />
                      <span>Picture Label</span>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="text-base font-bold text-slate-900 font-heading">{sp.name}</h3>
                    <div className="text-xs text-emerald-400 italic font-mono">{sp.latin_name}</div>
                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed pt-1">{sp.description}</p>
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
