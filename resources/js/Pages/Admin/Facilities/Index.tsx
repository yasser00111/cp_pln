import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router } from '@inertiajs/react';
import { Facility } from '@/Types';
import { Zap, Trash2, Plus, Upload, Image as ImageIcon } from 'lucide-react';

interface Props {
  facilities: Facility[];
}

export default function AdminFacilitiesIndex({ facilities }: Props) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Pembangkit Utama');
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
    formData.append('title', title);
    formData.append('category', category);
    formData.append('description', description);
    if (imageFile) {
      formData.append('image_file', imageFile);
    }

    router.post('/admin/facilities', formData, {
      onSuccess: () => {
        setTitle('');
        setDescription('');
        setImageFile(null);
        setImagePreview(null);
      }
    });
  };

  const handleDelete = (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus fasilitas pembangkit ini?')) {
      router.delete(`/admin/facilities/${id}`);
    }
  };

  return (
    <AdminLayout>
      <Head title="Kelola Fasilitas Pembangkit - Admin PLN IP UBP Barru" />

      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 font-heading">Kelola Fasilitas Pembangkit</h1>
          <p className="text-xs text-slate-600">Upload langsung foto unit pembangkit, jetty pelabuhan, control room, laboratorium dari komputer Anda</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 bg-white border border-slate-200 rounded-3xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 font-heading border-b border-slate-200 pb-2 flex items-center gap-2">
              <Plus className="w-4 h-4 text-sky-400" />
              <span>Tambah Fasilitas Pembangkit</span>
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Nama Fasilitas / Unit</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Contoh: Boiler & Turbine Building Unit 1"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Kategori Fasilitas</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-sky-500"
                >
                  <option value="Pembangkit Utama">Pembangkit Utama</option>
                  <option value="Pelabuhan & Jetty">Pelabuhan & Jetty</option>
                  <option value="Kontrol & Digital">Kontrol & Digital</option>
                  <option value="Laboratorium & K3">Laboratorium & K3</option>
                  <option value="Pendukung Operasional">Pendukung Operasional</option>
                </select>
              </div>

              {/* Upload Foto Komputer */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Upload Foto dari Komputer</label>
                <div className="relative border-2 border-dashed border-slate-200 hover:border-sky-500/50 rounded-2xl p-4 text-center bg-slate-50/60 transition-colors cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                  {imagePreview ? (
                    <div className="space-y-2">
                      <img src={imagePreview} alt="Preview" className="w-full h-32 object-cover rounded-xl border border-slate-200" />
                      <p className="text-[11px] text-sky-400 font-bold">Klik/Seret untuk mengganti foto</p>
                    </div>
                  ) : (
                    <div className="space-y-2 py-2">
                      <div className="w-10 h-10 rounded-full bg-sky-500/10 text-sky-400 flex items-center justify-center mx-auto">
                        <Upload className="w-5 h-5" />
                      </div>
                      <div className="text-xs text-slate-700 font-semibold">Pilih Foto dari Komputer</div>
                      <div className="text-[10px] text-slate-500">Format JPG, PNG, WEBP (Max 5MB)</div>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Deskripsi Fasilitas</label>
                <textarea
                  rows={4}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Spesifikasi teknis dan peran dalam keandalan listrik..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:outline-none focus:border-sky-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-sky-500 hover:bg-sky-500 text-white font-bold text-xs shadow-lg shadow-sky-500/20 transition-all"
              >
                + Upload & Simpan Fasilitas
              </button>
            </form>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 font-heading">Daftar Fasilitas Pembangkit ({facilities.length})</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {facilities.map((fac) => (
                <div key={fac.id} className="bg-white border border-slate-200 rounded-3xl overflow-hidden flex flex-col justify-between">
                  {fac.image && (
                    <img src={fac.image} alt={fac.title} className="w-full h-40 object-cover" />
                  )}
                  <div className="p-5 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-md bg-sky-500/20 text-sky-400 text-[10px] font-bold">
                        {fac.category}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 font-heading">{fac.title}</h4>
                    <p className="text-xs text-slate-600 line-clamp-3">{fac.description}</p>
                  </div>

                  <div className="px-5 py-3 border-t border-slate-200 flex justify-end">
                    <button
                      onClick={() => handleDelete(fac.id)}
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
