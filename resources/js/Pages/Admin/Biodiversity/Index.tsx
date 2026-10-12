import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router, usePage } from '@inertiajs/react';
import { BiodiversitySpecies } from '@/Types';
import { Leaf, Trash2, Plus, Upload, Save, LayoutDashboard, Database, Edit, X, Globe, BarChart3, FileText, Download } from 'lucide-react';

export interface DocumentItem {
  id: string;
  title: string;
  category: string;
  year: string;
  file_path: string;
  file_size: string;
  created_at: string;
}

interface Props {
  species: BiodiversitySpecies[];
  reports?: DocumentItem[];
}

export default function AdminBiodiversityIndex({ species, reports = [] }: Props) {
  const { settings } = usePage<any>().props;
  const [activeTab, setActiveTab] = useState<'Statistik' | 'Spesies' | 'Laporan'>('Statistik');

  // Report Form State
  const [reportTitle, setReportTitle] = useState('');
  const [reportYear, setReportYear] = useState(new Date().getFullYear().toString());
  const [reportFile, setReportFile] = useState<File | null>(null);
  const [isUploadingReport, setIsUploadingReport] = useState(false);

  // Species Form State & Editing State
  const [editingSpecies, setEditingSpecies] = useState<BiodiversitySpecies | null>(null);
  const [name, setName] = useState('');
  const [latinName, setLatinName] = useState('');
  const [category, setCategory] = useState<'Fauna' | 'Flora'>('Fauna');
  const [conservationStatus, setConservationStatus] = useState('Dilindungi - Konservasi Kawasan UBP Barru');
  const [location, setLocation] = useState('Kawasan Hutan Konservasi UBP Barru');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Statistics & Page Banner Form State
  const [stats, setStats] = useState({
    // Hero Banner Data Informasi Hayati (/biodiversity/info)
    bio_info_hero_title: settings?.bio_info_hero_title || 'Status & Indeks Keanekaragaman Hayati',
    bio_info_hero_desc: settings?.bio_info_hero_desc || 'Informasi terkait status dan kecenderungan sumber daya kehati dan sumber biologi (flora dan fauna) serta data indeks keanekaragaman hayati di wilayah PT PLN Indonesia Power UBP Barru.',
    
    // Header Data & Inventarisasi Hayati (/biodiversity/kehati-data)
    biodiversity_data_info_title: settings?.biodiversity_data_info_title || 'Informasi Terkait & Kecenderungan Sumber Data Hayati dan Sumber Biologi',
    biodiversity_data_info_desc: settings?.biodiversity_data_info_desc || 'Data inventarisasi komprehensif flora dan fauna di kawasan PLTU Barru, disertai gambar dokumentasi spesimen dan matriks tabel status perlindungan (IUCN / CITES / Regulasi LHK).',

    // 4 Statistic Cards (synced for both /biodiversity/info and /biodiversity/kehati-indeks)
    bio_stat_1_badge: settings?.bio_stat_1_badge || settings?.bio_info_stat_1_badge || '34+',
    bio_stat_1_title: settings?.bio_stat_1_title || settings?.bio_info_stat_1_title || 'Spesies Teridentifikasi',
    bio_stat_1_desc: settings?.bio_stat_1_desc || settings?.bio_info_stat_1_desc || 'Flora mangrove & fauna perlindungan teridentifikasi.',
    bio_stat_2_badge: settings?.bio_stat_2_badge || settings?.bio_info_stat_2_badge || '14.5 Ha',
    bio_stat_2_title: settings?.bio_stat_2_title || settings?.bio_info_stat_2_title || 'Area Konservasi',
    bio_stat_2_desc: settings?.bio_stat_2_desc || settings?.bio_info_stat_2_desc || 'Kawasan pesisir pantai Lampoko Barru.',
    bio_stat_3_badge: settings?.bio_stat_3_badge || settings?.bio_info_stat_3_badge || 'H (Tinggi)',
    bio_stat_3_title: settings?.bio_stat_3_title || settings?.bio_info_stat_3_title || 'Indeks Shannon-Wiener',
    bio_stat_3_desc: settings?.bio_stat_3_desc || settings?.bio_info_stat_3_desc || 'Keanekaragaman ekosistem perairan tergolong tinggi.',
    bio_stat_4_badge: settings?.bio_stat_4_badge || settings?.bio_info_stat_4_badge || 'Stabil',
    bio_stat_4_title: settings?.bio_stat_4_title || settings?.bio_info_stat_4_title || 'Tren Populasi',
    bio_stat_4_desc: settings?.bio_stat_4_desc || settings?.bio_info_stat_4_desc || 'Kecenderungan populasi satwa tetap stabil/meningkat.',
    
    // Bio Data Graphic Fields
    bio_data_chart1_title: settings?.bio_data_chart1_title || 'Grafik Kecenderungan Peningkatan Absolut (2022 – 2026)',
    bio_data_chart1_badge: settings?.bio_data_chart1_badge || 'Status: Tren Bersifat Fluktuatif',
    bio_data_index_history: settings?.bio_data_index_history || '',
    bio_data_chart2_title: settings?.bio_data_chart2_title || 'Grafik Tren Jumlah Individu (2022 – 2026)',
    bio_data_chart2_badge: settings?.bio_data_chart2_badge || 'Status: Populasi Berkembang Positif',
    bio_data_seasonal_trend: settings?.bio_data_seasonal_trend || settings?.bio_data_individual_history || '',
  });

  const handleStatChange = (key: keyof typeof stats, value: string) => {
    setStats((prev) => ({ ...prev, [key]: value }));
  };

  const handleStatsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Synchronize both bio_stat and bio_info_stat keys so all pages reflect edits immediately
    const payload = {
      ...stats,
      bio_info_stat_1_badge: stats.bio_stat_1_badge,
      bio_info_stat_1_title: stats.bio_stat_1_title,
      bio_info_stat_1_desc: stats.bio_stat_1_desc,
      bio_info_stat_2_badge: stats.bio_stat_2_badge,
      bio_info_stat_2_title: stats.bio_stat_2_title,
      bio_info_stat_2_desc: stats.bio_stat_2_desc,
      bio_info_stat_3_badge: stats.bio_stat_3_badge,
      bio_info_stat_3_title: stats.bio_stat_3_title,
      bio_info_stat_3_desc: stats.bio_stat_3_desc,
      bio_info_stat_4_badge: stats.bio_stat_4_badge,
      bio_info_stat_4_title: stats.bio_stat_4_title,
      bio_info_stat_4_desc: stats.bio_stat_4_desc,
    };
    router.post('/admin/settings', payload);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleEditSpecies = (sp: BiodiversitySpecies) => {
    setEditingSpecies(sp);
    setName(sp.name);
    setLatinName(sp.latin_name || '');
    setCategory(sp.category as 'Fauna' | 'Flora');
    setConservationStatus(sp.conservation_status);
    setLocation(sp.location || '');
    setDescription(sp.description);
    setImagePreview(sp.image || null);
    setImageFile(null);
    setActiveTab('Spesies');
  };

  const handleCancelEdit = () => {
    setEditingSpecies(null);
    setName('');
    setLatinName('');
    setCategory('Fauna');
    setConservationStatus('Dilindungi - Konservasi Kawasan UBP Barru');
    setLocation('Kawasan Hutan Konservasi UBP Barru');
    setDescription('');
    setImageFile(null);
    setImagePreview(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('latin_name', latinName);
    formData.append('category', category);
    formData.append('conservation_status', conservationStatus);
    formData.append('location', location);
    formData.append('description', description);
    if (imageFile) {
      formData.append('image_file', imageFile);
    }

    if (editingSpecies) {
      router.post(`/admin/biodiversity/${editingSpecies.id}`, formData, {
        onSuccess: () => {
          handleCancelEdit();
        }
      });
    } else {
      router.post('/admin/biodiversity', formData, {
        onSuccess: () => {
          handleCancelEdit();
        }
      });
    }
  };

  const handleDelete = (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus data spesies keanekaragaman hayati ini?')) {
      router.delete(`/admin/biodiversity/${id}`);
    }
  };

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportFile) {
      alert('Silakan pilih file PDF/dokumen laporan terlebih dahulu!');
      return;
    }
    const formData = new FormData();
    formData.append('title', reportTitle);
    formData.append('year', reportYear);
    formData.append('file', reportFile);

    setIsUploadingReport(true);
    router.post('/admin/biodiversity/reports', formData, {
      onSuccess: () => {
        setReportTitle('');
        setReportYear(new Date().getFullYear().toString());
        setReportFile(null);
        setIsUploadingReport(false);
      },
      onError: () => {
        setIsUploadingReport(false);
      }
    });
  };

  const handleDeleteReport = (id: string) => {
    if (confirm('Hapus dokumen laporan konservasi ini? File fisik di server juga akan dihapus.')) {
      router.delete(`/admin/biodiversity/reports/${id}`);
    }
  };

  return (
    <AdminLayout>
      <Head title="Kelola Keanekaragaman Hayati - Admin PLN IP UBP Barru" />

      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 font-heading">Kelola Keanekaragaman Hayati (Flora & Fauna)</h1>
          <p className="text-xs text-slate-600">Atur banner halaman, statistik dashboard, grafik tahunan, katalog spesies, dan unggah laporan konservasi</p>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200">
          <button
            onClick={() => setActiveTab('Statistik')}
            className={`px-6 py-3 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'Statistik' ? 'border-emerald-500 text-emerald-600' : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Informasi Halaman & Grafik</span>
          </button>
          <button
            onClick={() => setActiveTab('Spesies')}
            className={`px-6 py-3 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'Spesies' ? 'border-emerald-500 text-emerald-600' : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>Katalog Spesies Terdaftar ({species.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('Laporan')}
            className={`px-6 py-3 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'Laporan' ? 'border-emerald-500 text-emerald-600' : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Laporan Konservasi PDF ({reports.length})</span>
          </button>
        </div>

        {activeTab === 'Statistik' && (
          <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-8">
            <form onSubmit={handleStatsSubmit} className="space-y-8 text-xs">
              
              {/* Bagian 1: Header & Banner Halaman Data Informasi Hayati */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
                  <Globe className="w-4 h-4 text-emerald-600" />
                  <h3 className="text-sm font-bold text-slate-900 font-heading">Banner & Teks Halaman (Data & Informasi Hayati)</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-5 rounded-2xl border border-slate-200">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Judul Banner Halaman (/biodiversity/info)</label>
                    <input
                      type="text"
                      value={stats.bio_info_hero_title}
                      onChange={(e) => handleStatChange('bio_info_hero_title', e.target.value)}
                      className="w-full bg-white text-slate-900 border border-slate-300 rounded-lg px-3 py-2 text-xs"
                      placeholder="Status & Indeks Keanekaragaman Hayati"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Deskripsi Singkat Banner</label>
                    <textarea
                      rows={2}
                      value={stats.bio_info_hero_desc}
                      onChange={(e) => handleStatChange('bio_info_hero_desc', e.target.value)}
                      className="w-full bg-white text-slate-900 border border-slate-300 rounded-lg px-3 py-2 text-xs"
                      placeholder="Informasi terkait status dan kecenderungan sumber daya kehati..."
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Judul Halaman Inventarisasi (/biodiversity/kehati-data)</label>
                    <input
                      type="text"
                      value={stats.biodiversity_data_info_title}
                      onChange={(e) => handleStatChange('biodiversity_data_info_title', e.target.value)}
                      className="w-full bg-white text-slate-900 border border-slate-300 rounded-lg px-3 py-2 text-xs"
                      placeholder="Informasi Terkait & Kecenderungan Sumber Data Hayati"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Deskripsi Halaman Inventarisasi</label>
                    <textarea
                      rows={2}
                      value={stats.biodiversity_data_info_desc}
                      onChange={(e) => handleStatChange('biodiversity_data_info_desc', e.target.value)}
                      className="w-full bg-white text-slate-900 border border-slate-300 rounded-lg px-3 py-2 text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Bagian 2: Kartu Statistik Ringkasan */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
                  <LayoutDashboard className="w-4 h-4 text-emerald-600" />
                  <h3 className="text-sm font-bold text-slate-900 font-heading">4 Kartu Statistik Ringkasan Kehati</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Card 1 */}
                  <div className="p-4 border border-slate-200 rounded-2xl bg-slate-50 space-y-4 shadow-sm">
                    <div className="font-bold text-slate-800 border-b border-slate-200 pb-2">Kartu Statistik 1</div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Nilai / Angka</label>
                      <input type="text" value={stats.bio_stat_1_badge} onChange={e => handleStatChange('bio_stat_1_badge', e.target.value)} className="w-full bg-white text-slate-900 border border-slate-300 rounded-lg px-3 py-2" />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Judul</label>
                      <input type="text" value={stats.bio_stat_1_title} onChange={e => handleStatChange('bio_stat_1_title', e.target.value)} className="w-full bg-white text-slate-900 border border-slate-300 rounded-lg px-3 py-2" />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Deskripsi Singkat</label>
                      <textarea value={stats.bio_stat_1_desc} onChange={e => handleStatChange('bio_stat_1_desc', e.target.value)} rows={2} className="w-full bg-white text-slate-900 border border-slate-300 rounded-lg px-3 py-2" />
                    </div>
                  </div>

                  {/* Card 2 */}
                  <div className="p-4 border border-slate-200 rounded-2xl bg-slate-50 space-y-4 shadow-sm">
                    <div className="font-bold text-slate-800 border-b border-slate-200 pb-2">Kartu Statistik 2</div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Nilai / Angka</label>
                      <input type="text" value={stats.bio_stat_2_badge} onChange={e => handleStatChange('bio_stat_2_badge', e.target.value)} className="w-full bg-white text-slate-900 border border-slate-300 rounded-lg px-3 py-2" />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Judul</label>
                      <input type="text" value={stats.bio_stat_2_title} onChange={e => handleStatChange('bio_stat_2_title', e.target.value)} className="w-full bg-white text-slate-900 border border-slate-300 rounded-lg px-3 py-2" />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Deskripsi Singkat</label>
                      <textarea value={stats.bio_stat_2_desc} onChange={e => handleStatChange('bio_stat_2_desc', e.target.value)} rows={2} className="w-full bg-white text-slate-900 border border-slate-300 rounded-lg px-3 py-2" />
                    </div>
                  </div>

                  {/* Card 3 */}
                  <div className="p-4 border border-slate-200 rounded-2xl bg-slate-50 space-y-4 shadow-sm">
                    <div className="font-bold text-slate-800 border-b border-slate-200 pb-2">Kartu Statistik 3</div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Nilai / Angka</label>
                      <input type="text" value={stats.bio_stat_3_badge} onChange={e => handleStatChange('bio_stat_3_badge', e.target.value)} className="w-full bg-white text-slate-900 border border-slate-300 rounded-lg px-3 py-2" />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Judul</label>
                      <input type="text" value={stats.bio_stat_3_title} onChange={e => handleStatChange('bio_stat_3_title', e.target.value)} className="w-full bg-white text-slate-900 border border-slate-300 rounded-lg px-3 py-2" />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Deskripsi Singkat</label>
                      <textarea value={stats.bio_stat_3_desc} onChange={e => handleStatChange('bio_stat_3_desc', e.target.value)} rows={2} className="w-full bg-white text-slate-900 border border-slate-300 rounded-lg px-3 py-2" />
                    </div>
                  </div>

                  {/* Card 4 */}
                  <div className="p-4 border border-slate-200 rounded-2xl bg-slate-50 space-y-4 shadow-sm">
                    <div className="font-bold text-slate-800 border-b border-slate-200 pb-2">Kartu Statistik 4</div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Nilai / Angka</label>
                      <input type="text" value={stats.bio_stat_4_badge} onChange={e => handleStatChange('bio_stat_4_badge', e.target.value)} className="w-full bg-white text-slate-900 border border-slate-300 rounded-lg px-3 py-2" />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Judul</label>
                      <input type="text" value={stats.bio_stat_4_title} onChange={e => handleStatChange('bio_stat_4_title', e.target.value)} className="w-full bg-white text-slate-900 border border-slate-300 rounded-lg px-3 py-2" />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Deskripsi Singkat</label>
                      <textarea value={stats.bio_stat_4_desc} onChange={e => handleStatChange('bio_stat_4_desc', e.target.value)} rows={2} className="w-full bg-white text-slate-900 border border-slate-300 rounded-lg px-3 py-2" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Bagian 3: Grafik Data Settings */}
              <div className="space-y-4 pt-4 border-t border-slate-200">
                <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
                  <BarChart3 className="w-4 h-4 text-emerald-600" />
                  <h3 className="text-sm font-bold text-slate-900 font-heading">Pengaturan Data Grafik (Halaman Data Indeks 2022 – 2026)</h3>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Chart 1 Settings */}
                  <div className="p-4 border border-slate-200 rounded-2xl bg-slate-50 space-y-4 shadow-sm">
                    <div className="font-bold text-slate-800 border-b border-slate-200 pb-2">Grafik 1: Kecenderungan Absolut / Indeks Kehati (Tahunan 2022 – 2026)</div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Judul Grafik 1</label>
                      <input type="text" value={stats.bio_data_chart1_title} onChange={e => handleStatChange('bio_data_chart1_title', e.target.value)} className="w-full bg-white text-slate-900 border border-slate-300 rounded-lg px-3 py-2" />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Badge Status (Grafik 1)</label>
                      <input type="text" value={stats.bio_data_chart1_badge} onChange={e => handleStatChange('bio_data_chart1_badge', e.target.value)} className="w-full bg-white text-slate-900 border border-slate-300 rounded-lg px-3 py-2" />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Data JSON Indeks Kehati (2022 – 2026)</label>
                      <textarea value={stats.bio_data_index_history} onChange={e => handleStatChange('bio_data_index_history', e.target.value)} rows={7} className="w-full bg-white text-slate-900 border border-slate-300 rounded-lg px-3 py-2 font-mono text-xs" placeholder='[{"period":"2022","fauna":5600,"flora":2300},{"period":"2023","fauna":7200,"flora":1800},{"period":"2024","fauna":7502,"flora":1950},{"period":"2025","fauna":6300,"flora":1600},{"period":"2026","fauna":4100,"flora":2700}]' />
                      <p className="text-[10px] text-slate-500 mt-1">Gunakan array JSON dengan field: period, fauna, flora.</p>
                    </div>
                  </div>

                  {/* Chart 2 Settings */}
                  <div className="p-4 border border-slate-200 rounded-2xl bg-slate-50 space-y-4 shadow-sm">
                    <div className="font-bold text-slate-800 border-b border-slate-200 pb-2">Grafik 2: Jumlah Individu Flora & Fauna (Tahunan 2022 – 2026)</div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Judul Grafik 2</label>
                      <input type="text" value={stats.bio_data_chart2_title} onChange={e => handleStatChange('bio_data_chart2_title', e.target.value)} className="w-full bg-white text-slate-900 border border-slate-300 rounded-lg px-3 py-2" />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Badge Status (Grafik 2)</label>
                      <input type="text" value={stats.bio_data_chart2_badge} onChange={e => handleStatChange('bio_data_chart2_badge', e.target.value)} className="w-full bg-white text-slate-900 border border-slate-300 rounded-lg px-3 py-2" />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Data JSON Jumlah Individu (2022 – 2026)</label>
                      <textarea value={stats.bio_data_seasonal_trend} onChange={e => handleStatChange('bio_data_seasonal_trend', e.target.value)} rows={7} className="w-full bg-white text-slate-900 border border-slate-300 rounded-lg px-3 py-2 font-mono text-xs" placeholder='[{"period":"2022","fauna":380,"flora":1420,"total":1800},{"period":"2023","fauna":460,"flora":1850,"total":2310},{"period":"2024","fauna":590,"flora":2340,"total":2930},{"period":"2025","fauna":740,"flora":2980,"total":3720},{"period":"2026","fauna":920,"flora":3650,"total":4570}]' />
                      <p className="text-[10px] text-slate-500 mt-1">Gunakan array JSON dengan field: period, fauna, flora, total.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button type="submit" className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-lg shadow-emerald-500/20 flex items-center gap-2">
                  <Save className="w-4 h-4" />
                  Simpan Semua Pengaturan
                </button>
              </div>
            </form>
          </div>
        )}

        {activeTab === 'Spesies' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 bg-white border border-slate-200 rounded-3xl p-6 space-y-4">
              <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900 font-heading flex items-center gap-2">
                  {editingSpecies ? <Edit className="w-4 h-4 text-sky-500" /> : <Plus className="w-4 h-4 text-emerald-500" />}
                  <span>{editingSpecies ? `Edit: ${editingSpecies.name}` : 'Tambah Spesies Baru'}</span>
                </h3>
                {editingSpecies && (
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="flex items-center gap-1 text-[11px] text-red-500 hover:text-red-600 font-semibold"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Batal Edit</span>
                  </button>
                )}
              </div>

              {editingSpecies && (
                <div className="p-3 bg-sky-50 border border-sky-200 rounded-xl text-[11px] text-sky-800 flex items-center justify-between">
                  <span>Sedang mengedit data spesies <strong>{editingSpecies.name}</strong></span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Nama Lokal Spesies</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Contoh: Burung Rangkong Sulawesi"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Nama Latin (Scientific Name)</label>
                  <input
                    type="text"
                    value={latinName}
                    onChange={(e) => setLatinName(e.target.value)}
                    placeholder="Contoh: Rhyticeros cassidix"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Kategori (Fauna / Flora)</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as 'Fauna' | 'Flora')}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-sky-500"
                  >
                    <option value="Fauna">Fauna (Satwa)</option>
                    <option value="Flora">Flora (Tumbuhan/Mangrove)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Status Konservasi</label>
                  <input
                    type="text"
                    required
                    value={conservationStatus}
                    onChange={(e) => setConservationStatus(e.target.value)}
                    placeholder="Status CITES / IUCN / Permen LHK"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Lokasi Habitat</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Area Mangrove / Bufferzone UBP Barru"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-sky-500"
                  />
                </div>

                {/* Upload Foto Komputer */}
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Foto Spesies</label>
                  <div className="relative border-2 border-dashed border-slate-200 hover:border-emerald-500/50 rounded-2xl p-4 text-center bg-slate-50/60 transition-colors cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                    {imagePreview ? (
                      <div className="space-y-2">
                        <img src={imagePreview} alt="Preview" className="w-full h-32 object-cover rounded-xl border border-slate-200" />
                        <p className="text-[11px] text-emerald-600 font-bold">Klik/Seret untuk mengganti foto</p>
                      </div>
                    ) : (
                      <div className="space-y-2 py-2">
                        <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
                          <Upload className="w-5 h-5" />
                        </div>
                        <div className="text-xs text-slate-700 font-semibold">Pilih Foto dari Komputer</div>
                        <div className="text-[10px] text-slate-500">Format JPG, PNG, WEBP (Max 5MB)</div>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Deskripsi & Peran Ekologis</label>
                  <textarea
                    rows={3}
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Peran spesies dalam menjaga rantai makanan dan keanekaragaman hayati..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="submit"
                    className={`flex-1 py-3 rounded-2xl text-white font-bold text-xs shadow-lg transition-all ${
                      editingSpecies 
                        ? 'bg-sky-600 hover:bg-sky-700 shadow-sky-600/20' 
                        : 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/20'
                    }`}
                  >
                    {editingSpecies ? '✓ Simpan Perubahan Spesies' : '+ Upload & Simpan Spesies'}
                  </button>
                  {editingSpecies && (
                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      className="px-4 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs"
                    >
                      Batal
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900 font-heading">Daftar Spesies Terdaftar ({species.length})</h3>
                <span className="text-xs text-slate-500">Klik "Edit" untuk mengubah informasi spesies</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {species.map((sp) => (
                  <div key={sp.id} className="bg-white border border-slate-200 rounded-3xl p-5 space-y-3 flex flex-col justify-between hover:shadow-md transition-shadow">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold ${
                          sp.category === 'Fauna' ? 'bg-amber-500/20 text-amber-600' : 'bg-emerald-500/20 text-emerald-600'
                        }`}>
                          {sp.category}
                        </span>
                        <Leaf className="w-4 h-4 text-emerald-500" />
                      </div>
                      {sp.image && (
                        <div className="h-28 rounded-xl overflow-hidden border border-slate-100">
                          <img src={sp.image} alt={sp.name} className="w-full h-full object-cover" />
                        </div>
                      )}
                      <h4 className="text-sm font-bold text-slate-900 font-heading">{sp.name}</h4>
                      {sp.latin_name && <p className="text-xs text-sky-600 italic font-mono">{sp.latin_name}</p>}
                      <p className="text-xs text-slate-600 line-clamp-2">{sp.description}</p>
                      {sp.location && <p className="text-[11px] text-slate-400">📍 {sp.location}</p>}
                    </div>

                    <div className="border-t border-slate-200 pt-3 flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleEditSpecies(sp)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-sky-500/10 text-sky-600 hover:bg-sky-500/20 text-xs font-bold transition-colors"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDelete(sp.id)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500/20 text-xs font-bold transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Hapus</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Laporan' && (
          <div className="space-y-8">
            {/* Form Upload Laporan */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 space-y-6 shadow-sm">
              <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 font-heading">Unggah Dokumen Laporan Konservasi Baru</h3>
                  <p className="text-xs text-slate-500">File PDF ini akan otomatis tampil dan dapat diunduh oleh publik pada halaman <span className="font-semibold text-emerald-600">/biodiversity/report</span></p>
                </div>
              </div>

              <form onSubmit={handleReportSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="md:col-span-2 space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Judul Laporan</label>
                    <input
                      type="text"
                      placeholder="Contoh: Laporan Konservasi Kehati & Monitoring Satwa 2025"
                      value={reportTitle}
                      onChange={(e) => setReportTitle(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-emerald-500 transition-colors"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Tahun Publikasi</label>
                    <input
                      type="number"
                      min="2010"
                      max="2099"
                      value={reportYear}
                      onChange={(e) => setReportYear(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-emerald-500 transition-colors"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">File Dokumen (PDF)</label>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/60 hover:bg-slate-50 transition-colors">
                    <label className="cursor-pointer inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm">
                      <Upload className="w-4 h-4" />
                      <span>Pilih File PDF</span>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx,.xls,.xlsx"
                        onChange={(e) => setReportFile(e.target.files ? e.target.files[0] : null)}
                        className="hidden"
                        required
                      />
                    </label>
                    <div className="text-xs text-slate-600 truncate">
                      {reportFile ? (
                        <span className="font-semibold text-emerald-700 flex items-center gap-1.5">
                          📄 {reportFile.name} ({(reportFile.size / (1024 * 1024)).toFixed(2)} MB)
                        </span>
                      ) : (
                        <span>Format yang didukung: PDF, DOCX (Maksimal 25 MB)</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    disabled={isUploadingReport}
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-600/20 transition-all disabled:opacity-50"
                  >
                    <Upload className="w-4 h-4" />
                    <span>{isUploadingReport ? 'Mengunggah Laporan...' : 'Unggah & Publikasikan Laporan'}</span>
                  </button>
                </div>
              </form>
            </div>

            {/* List Laporan Yang Sudah Diunggah */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 space-y-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900 font-heading">Daftar Laporan Konservasi Aktif</h3>
                  <p className="text-xs text-slate-500">Total {reports.length} dokumen laporan tersimpan</p>
                </div>
              </div>

              {reports.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                        <th className="py-3 px-4">Nama Laporan</th>
                        <th className="py-3 px-4">Tahun</th>
                        <th className="py-3 px-4">Ukuran</th>
                        <th className="py-3 px-4 text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {reports.map((rep) => (
                        <tr key={rep.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                                <FileText className="w-5 h-5" />
                              </div>
                              <div>
                                <span className="font-bold text-slate-900 text-xs block">{rep.title}</span>
                                <span className="text-[10px] text-slate-400">Kategori: {rep.category}</span>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-xs font-bold text-emerald-600">{rep.year}</td>
                          <td className="py-4 px-4 text-xs text-slate-500">{rep.file_size}</td>
                          <td className="py-4 px-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <a
                                href={rep.file_path}
                                target="_blank"
                                rel="noreferrer"
                                className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-xl transition-colors"
                                title="Lihat / Download File"
                              >
                                <Download className="w-4 h-4" />
                              </a>
                              <button
                                onClick={() => handleDeleteReport(rep.id)}
                                className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                                title="Hapus Laporan"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="py-12 text-center space-y-3">
                  <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                    <FileText className="w-7 h-7" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-700">Belum Ada Laporan Konservasi</h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Gunakan formulir di atas untuk mengunggah dokumen laporan keanekaragaman hayati (PDF). Dokumen akan otomatis tampil di halaman publik.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

