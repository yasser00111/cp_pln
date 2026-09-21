import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router, usePage } from '@inertiajs/react';
import { BiodiversitySpecies } from '@/Types';
import { Leaf, Trash2, Plus, Upload, Save, LayoutDashboard, Database } from 'lucide-react';

interface Props {
  species: BiodiversitySpecies[];
}

export default function AdminBiodiversityIndex({ species }: Props) {
  const { settings } = usePage<any>().props;
  const [activeTab, setActiveTab] = useState<'Spesies' | 'Statistik'>('Statistik');

  // Species Form State
  const [name, setName] = useState('');
  const [latinName, setLatinName] = useState('');
  const [category, setCategory] = useState<'Fauna' | 'Flora'>('Fauna');
  const [conservationStatus, setConservationStatus] = useState('Dilindungi - Konservasi Kawasan UBP Barru');
  const [location, setLocation] = useState('Kawasan Hutan Conservasi UBP Barru');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Statistics Form State
  const [stats, setStats] = useState({
    bio_stat_1_badge: settings?.bio_stat_1_badge || '34+',
    bio_stat_1_title: settings?.bio_stat_1_title || 'Spesies Teridentifikasi',
    bio_stat_1_desc: settings?.bio_stat_1_desc || 'Flora mangrove & fauna perlindungan teridentifikasi.',
    bio_stat_2_badge: settings?.bio_stat_2_badge || '14.5 Ha',
    bio_stat_2_title: settings?.bio_stat_2_title || 'Area Konservasi',
    bio_stat_2_desc: settings?.bio_stat_2_desc || 'Kawasan pesisir pantai Lampoko Barru.',
    bio_stat_3_badge: settings?.bio_stat_3_badge || 'H (Tinggi)',
    bio_stat_3_title: settings?.bio_stat_3_title || 'Indeks Shannon-Wiener',
    bio_stat_3_desc: settings?.bio_stat_3_desc || 'Keanekaragaman ekosistem perairan tergolong tinggi.',
    bio_stat_4_badge: settings?.bio_stat_4_badge || 'Stabil',
    bio_stat_4_title: settings?.bio_stat_4_title || 'Tren Populasi',
    bio_stat_4_desc: settings?.bio_stat_4_desc || 'Kecenderungan populasi satwa tetap stabil/meningkat.',
    
    // Bio Data Graphic Fields
    bio_data_chart1_title: settings?.bio_data_chart1_title || 'Pertumbuhan Indeks Shannon-Wiener (2021 - 2025)',
    bio_data_chart1_badge: settings?.bio_data_chart1_badge || 'Status: Tren Positif Terus Meningkat',
    bio_data_index_history: settings?.bio_data_index_history || '',
    bio_data_chart2_title: settings?.bio_data_chart2_title || 'Distribusi Indeks Keanekaragaman Bulanan Tahun 2025',
    bio_data_seasonal_trend: settings?.bio_data_seasonal_trend || '',
  });

  const handleStatChange = (key: keyof typeof stats, value: string) => {
    setStats((prev) => ({ ...prev, [key]: value }));
  };

  const handleStatsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.post('/admin/settings', stats);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
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

    router.post('/admin/biodiversity', formData, {
      onSuccess: () => {
        setName('');
        setLatinName('');
        setDescription('');
        setImageFile(null);
        setImagePreview(null);
      }
    });
  };

  const handleDelete = (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus data spesies keanekaragaman hayati ini?')) {
      router.delete(`/admin/biodiversity/${id}`);
    }
  };

  return (
    <AdminLayout>
      <Head title="Kelola Keanekaragaman Hayati - Admin PLN IP UBP Barru" />

      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 font-heading">Kelola Keanekaragaman Hayati (Flora & Fauna)</h1>
          <p className="text-xs text-slate-600">Atur pengaturan statistik dashboard dan spesies endemik yang dilestarikan</p>
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
            <span>Statistik Dashboard</span>
          </button>
          <button
            onClick={() => setActiveTab('Spesies')}
            className={`px-6 py-3 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'Spesies' ? 'border-emerald-500 text-emerald-600' : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>Spesies Terdaftar ({species.length})</span>
          </button>
        </div>

        {activeTab === 'Statistik' && (
          <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-6">
            <div>
              <h3 className="text-sm font-bold text-slate-900 font-heading">Pengaturan Kartu Statistik</h3>
              <p className="text-xs text-slate-500">Ubah nilai angka (badge), judul, dan deskripsi singkat yang akan muncul di bagian atas halaman Kehati.</p>
            </div>
            
            <form onSubmit={handleStatsSubmit} className="space-y-8 text-xs">
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

              {/* Grafik Data Settings */}
              <div className="pt-8 border-t border-slate-200">
                <h3 className="text-sm font-bold text-slate-900 font-heading mb-4">Pengaturan Data Grafik (Halaman Data Indeks)</h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Chart 1 Settings */}
                  <div className="p-4 border border-slate-200 rounded-2xl bg-slate-50 space-y-4 shadow-sm">
                    <div className="font-bold text-slate-800 border-b border-slate-200 pb-2">Grafik 1: Tren Kehati Tahunan</div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Judul Grafik 1</label>
                      <input type="text" value={stats.bio_data_chart1_title} onChange={e => handleStatChange('bio_data_chart1_title', e.target.value)} className="w-full bg-white text-slate-900 border border-slate-300 rounded-lg px-3 py-2" />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Badge Status (Grafik 1)</label>
                      <input type="text" value={stats.bio_data_chart1_badge} onChange={e => handleStatChange('bio_data_chart1_badge', e.target.value)} className="w-full bg-white text-slate-900 border border-slate-300 rounded-lg px-3 py-2" />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Data JSON (Tahunan)</label>
                      <textarea value={stats.bio_data_index_history} onChange={e => handleStatChange('bio_data_index_history', e.target.value)} rows={6} className="w-full bg-white text-slate-900 border border-slate-300 rounded-lg px-3 py-2 font-mono text-xs" placeholder='[{"period":"2021","floraH":2.45,"faunaH":2.1,"evenness":0.82,"dominance":0.15},...]' />
                      <p className="text-[10px] text-slate-500 mt-1">Harap gunakan format array JSON yang valid.</p>
                    </div>
                  </div>

                  {/* Chart 2 Settings */}
                  <div className="p-4 border border-slate-200 rounded-2xl bg-slate-50 space-y-4 shadow-sm">
                    <div className="font-bold text-slate-800 border-b border-slate-200 pb-2">Grafik 2: Dinamika Bulanan</div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Judul Grafik 2</label>
                      <input type="text" value={stats.bio_data_chart2_title} onChange={e => handleStatChange('bio_data_chart2_title', e.target.value)} className="w-full bg-white text-slate-900 border border-slate-300 rounded-lg px-3 py-2" />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Data JSON (Bulanan)</label>
                      <textarea value={stats.bio_data_seasonal_trend} onChange={e => handleStatChange('bio_data_seasonal_trend', e.target.value)} rows={10} className="w-full bg-white text-slate-900 border border-slate-300 rounded-lg px-3 py-2 font-mono text-xs" placeholder='[{"month":"Jan","Flora":3.2,"Fauna":2.95,"Total":6.15},...]' />
                      <p className="text-[10px] text-slate-500 mt-1">Harap gunakan format array JSON yang valid.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button type="submit" className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-lg shadow-emerald-500/20 flex items-center gap-2">
                  <Save className="w-4 h-4" />
                  Simpan Pengaturan Statistik
                </button>
              </div>
            </form>
          </div>
        )}

        {activeTab === 'Spesies' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 bg-white border border-slate-200 rounded-3xl p-6 space-y-4">
              <h3 className="text-sm font-bold text-slate-900 font-heading border-b border-slate-200 pb-2 flex items-center gap-2">
                <Plus className="w-4 h-4 text-emerald-400" />
                <span>Tambah Spesies Spesial</span>
              </h3>

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
                  <label className="block font-semibold text-slate-700 mb-1">Foto Spesies dari Komputer</label>
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
                        <p className="text-[11px] text-emerald-400 font-bold">Klik/Seret untuk mengganti foto</p>
                      </div>
                    ) : (
                      <div className="space-y-2 py-2">
                        <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto">
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

                <button
                  type="submit"
                  className="w-full py-3 rounded-2xl bg-emerald-500 hover:bg-emerald- text-white font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all"
                >
                  + Upload & Simpan Spesies
                </button>
              </form>
            </div>

            <div className="lg:col-span-2 space-y-4">
              <h3 className="text-sm font-bold text-slate-900 font-heading">Daftar Spesies Terdaftar ({species.length})</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {species.map((sp) => (
                  <div key={sp.id} className="bg-white border border-slate-200 rounded-3xl p-5 space-y-3 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold ${
                          sp.category === 'Fauna' ? 'bg-amber-500/20 text-amber-400' : 'bg-emerald-500/20 text-emerald-400'
                        }`}>
                          {sp.category}
                        </span>
                        <Leaf className="w-4 h-4 text-emerald-400" />
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 font-heading">{sp.name}</h4>
                      {sp.latin_name && <p className="text-xs text-sky-400 italic">{sp.latin_name}</p>}
                      <p className="text-xs text-slate-600 line-clamp-2">{sp.description}</p>
                    </div>

                    <div className="border-t border-slate-200 pt-3 flex justify-end">
                      <button
                        onClick={() => handleDelete(sp.id)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 text-xs font-bold transition-colors"
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
      </div>
    </AdminLayout>
  );
}
