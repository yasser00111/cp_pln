import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router } from '@inertiajs/react';
import { Award } from '@/Types';
import { Award as AwardIcon, Trash2, Plus, Upload } from 'lucide-react';

interface Props {
  awards: Award[];
}

export default function AdminAwardsIndex({ awards }: Props) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Sertifikasi ISO');
  const [year, setYear] = useState('2024');
  const [issuer, setIssuer] = useState('');
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
    formData.append('year', year);
    formData.append('issuer', issuer);
    formData.append('description', description);
    if (imageFile) {
      formData.append('image_file', imageFile);
    }

    router.post('/admin/awards', formData, {
      onSuccess: () => {
        setTitle('');
        setIssuer('');
        setDescription('');
        setImageFile(null);
        setImagePreview(null);
      }
    });
  };

  const handleDelete = (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus penghargaan/sertifikat ini?')) {
      router.delete(`/admin/awards/${id}`);
    }
  };

  return (
    <AdminLayout>
      <Head title="Kelola Penghargaan & Sertifikasi - Admin PLN IP UBP Barru" />

      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 font-heading">Kelola Penghargaan & Sertifikasi ISO</h1>
          <p className="text-xs text-slate-600">Atur ISO 9001, ISO 14001, PROPER Hijau, K3 Gold dengan upload foto dari komputer</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 bg-white border border-slate-200 rounded-3xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 font-heading border-b border-slate-200 pb-2 flex items-center gap-2">
              <Plus className="w-4 h-4 text-sky-400" />
              <span>Tambah Penghargaan / ISO</span>
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Nama Sertifikasi / Penghargaan</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Contoh: ISO 5001:2018 Energy Management System"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Kategori</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-sky-500"
                >
                  <option value="Sertifikasi ISO">Sertifikasi ISO</option>
                  <option value="Lingkungan & PROPER">Lingkungan & PROPER</option>
                  <option value="K3 & Keselamatan Kerja">K3 & Keselamatan Kerja</option>
                  <option value="Inovasi & Excellence">Inovasi & Excellence</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Tahun Perolehan</label>
                  <input
                    type="text"
                    required
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    placeholder="2024"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-sky-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Lembaga Penerbit</label>
                  <input
                    type="text"
                    required
                    value={issuer}
                    onChange={(e) => setIssuer(e.target.value)}
                    placeholder="Contoh: Sucofindo / KLHK"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              {/* Upload Foto Komputer */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Foto Sertifikat / Badge dari Komputer</label>
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
                <label className="block font-semibold text-slate-700 mb-1">Keterangan Tambahan</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Lingkup sertifikasi dan pencapaian unggulan..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:outline-none focus:border-sky-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-sky-500 hover:bg-sky-500 text-white font-bold text-xs shadow-lg shadow-sky-500/20 transition-all"
              >
                + Upload & Simpan Sertifikasi
              </button>
            </form>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 font-heading">Daftar Penghargaan ({awards.length})</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {awards.map((award) => (
                <div key={award.id} className="bg-white border border-slate-200 rounded-3xl p-5 space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-md bg-amber-500/20 text-amber-400 text-[10px] font-bold">
                        {award.category} • {award.year}
                      </span>
                      <AwardIcon className="w-4 h-4 text-amber-400" />
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 font-heading">{award.title}</h4>
                    <p className="text-xs text-sky-400 font-semibold">Penerbit: {award.issuer}</p>
                    {award.description && <p className="text-xs text-slate-600">{award.description}</p>}
                  </div>

                  <div className="border-t border-slate-200 pt-3 flex justify-end">
                    <button
                      onClick={() => handleDelete(award.id)}
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
