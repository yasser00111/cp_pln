import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router } from '@inertiajs/react';
import { BiodiversitySpecies } from '@/Types';
import { Leaf, Trash2, Plus, Upload } from 'lucide-react';

interface Props {
  species: BiodiversitySpecies[];
}

export default function AdminBiodiversityIndex({ species }: Props) {
  const [name, setName] = useState('');
  const [latinName, setLatinName] = useState('');
  const [category, setCategory] = useState<'Fauna' | 'Flora'>('Fauna');
  const [conservationStatus, setConservationStatus] = useState('Dilindungi - Konservasi Kawasan UBP Barru');
  const [location, setLocation] = useState('Kawasan Hutan Conservasi UBP Barru');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

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
          <p className="text-xs text-slate-600">Atur spesies flora & fauna endemik yang dilestarikan dengan upload foto dari komputer</p>
        </div>

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
            <h3 className="text-sm font-bold text-slate-900 font-heading">Spesies Terdaftar ({species.length})</h3>

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
      </div>
    </AdminLayout>
  );
}
