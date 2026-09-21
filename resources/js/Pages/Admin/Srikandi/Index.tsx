import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router } from '@inertiajs/react';
import { Users, Trash2, Plus, Upload } from 'lucide-react';

interface Srikandi {
  id: number;
  name: string;
  position: string;
  description: string;
  image_path: string | null;
}

interface Props {
  srikandis: Srikandi[];
}

export default function AdminSrikandiIndex({ srikandis }: Props) {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
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
    formData.append('position', position);
    formData.append('description', description);
    if (imageFile) {
      formData.append('image_file', imageFile);
    }

    router.post('/admin/srikandi', formData, {
      onSuccess: () => {
        setName('');
        setPosition('');
        setDescription('');
        setImageFile(null);
        setImagePreview(null);
      }
    });
  };

  const handleDelete = (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus data Srikandi ini?')) {
      router.delete(`/admin/srikandi/${id}`);
    }
  };

  return (
    <AdminLayout>
      <Head title="Kelola Srikandi - Admin PLN IP UBP Barru" />

      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 font-heading">Kelola Profil Srikandi</h1>
          <p className="text-xs text-slate-600">Tambah atau hapus profil Srikandi (Gender Mainstreaming) yang akan ditampilkan di website.</p>
          <p className="text-xs text-amber-600 mt-2 font-semibold">Catatan: Untuk mengubah Judul Halaman Srikandi, gunakan menu "Teks Halaman (CMS)".</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Form Tambah Srikandi */}
          <div className="lg:col-span-1 bg-white border border-slate-200 rounded-3xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 font-heading border-b border-slate-200 pb-2 flex items-center gap-2">
              <Plus className="w-4 h-4 text-pink-500" />
              <span>Tambah Profil Srikandi</span>
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Nama Srikandi</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Contoh: Rina Wahyuni"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-pink-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Jabatan / Posisi</label>
                <input
                  type="text"
                  required
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  placeholder="Contoh: Manager Operasi"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-pink-500"
                />
              </div>

              {/* Upload Foto Komputer */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Foto Srikandi</label>
                <div className="relative border-2 border-dashed border-slate-200 hover:border-pink-500/50 rounded-2xl p-4 text-center bg-slate-50/60 transition-colors cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                  {imagePreview ? (
                    <div className="space-y-2">
                      <img src={imagePreview} alt="Preview" className="w-full h-32 object-cover rounded-xl border border-slate-200" />
                      <p className="text-[11px] text-pink-500 font-bold">Klik/Seret untuk mengganti foto</p>
                    </div>
                  ) : (
                    <div className="space-y-2 py-2">
                      <div className="w-10 h-10 rounded-full bg-pink-500/10 text-pink-500 flex items-center justify-center mx-auto">
                        <Upload className="w-5 h-5" />
                      </div>
                      <div className="text-xs text-slate-700 font-semibold">Pilih Foto dari Komputer</div>
                      <div className="text-[10px] text-slate-500">Format JPG, PNG, WEBP (Max 5MB)</div>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Deskripsi Singkat</label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Deskripsi singkat mengenai peran atau dedikasinya..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:outline-none focus:border-pink-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-pink-500 hover:bg-pink-600 text-white font-bold text-xs shadow-lg shadow-pink-500/20 transition-all"
              >
                + Simpan Profil
              </button>
            </form>
          </div>

          {/* Daftar Srikandi */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 font-heading">Daftar Srikandi Terdaftar ({srikandis.length})</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {srikandis.map((s) => (
                <div key={s.id} className="bg-white border border-slate-200 rounded-3xl p-5 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      {s.image_path ? (
                        <img src={s.image_path} alt={s.name} className="w-16 h-16 rounded-full object-cover border border-slate-200" />
                      ) : (
                        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
                          <Users className="w-8 h-8 text-slate-400" />
                        </div>
                      )}
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 font-heading">{s.name}</h4>
                        <p className="text-xs text-pink-500 font-semibold">{s.position}</p>
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 line-clamp-3">{s.description}</p>
                  </div>

                  <div className="border-t border-slate-200 pt-3 mt-4 flex justify-end">
                    <button
                      onClick={() => handleDelete(s.id)}
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
