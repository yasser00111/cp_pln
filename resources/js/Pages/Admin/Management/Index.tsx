import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router } from '@inertiajs/react';
import { Management } from '@/Types';
import { UserPlus, Trash2, ShieldCheck, Upload } from 'lucide-react';

interface Props {
  leaders: Management[];
}

export default function AdminManagementIndex({ leaders }: Props) {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [bio, setBio] = useState('');
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [orderPriority, setOrderPriority] = useState(1);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPhotoFile(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('position', position);
    formData.append('bio', bio);
    formData.append('order_priority', orderPriority.toString());
    if (photoFile) {
      formData.append('photo_file', photoFile);
    }

    router.post('/admin/management', formData, {
      onSuccess: () => {
        setName('');
        setPosition('');
        setBio('');
        setPhotoFile(null);
        setPhotoPreview(null);
      }
    });
  };

  const handleDelete = (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus data pimpinan ini?')) {
      router.delete(`/admin/management/${id}`);
    }
  };

  return (
    <AdminLayout>
      <Head title="Kelola Pimpinan & Manajemen - Admin PLN IP UBP Barru" />

      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 font-heading">Kelola Pimpinan & Manajemen</h1>
          <p className="text-xs text-slate-600">Atur struktur jajaran Senior Manager dan Management UBP Barru (Upload foto pimpinan dari komputer)</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Tambah */}
          <div className="lg:col-span-1 bg-white border border-slate-200 rounded-3xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 font-heading border-b border-slate-200 pb-2 flex items-center gap-2">
              <UserPlus className="w-4 h-4 text-sky-400" />
              <span>Tambah Pimpinan Baru</span>
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Nama Lengkap & Gelar</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Contoh: Ahmad Burhani"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Jabatan Corporate</label>
                <input
                  type="text"
                  required
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  placeholder="Contoh: Senior Manager UBP Barru"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-sky-500"
                />
              </div>

              {/* Upload Foto Komputer */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Foto Pimpinan dari Komputer</label>
                <div className="relative border-2 border-dashed border-slate-200 hover:border-sky-500/50 rounded-2xl p-4 text-center bg-slate-50/60 transition-colors cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                  {photoPreview ? (
                    <div className="space-y-2">
                      <img src={photoPreview} alt="Preview" className="w-20 h-20 object-cover rounded-2xl border border-slate-200 mx-auto" />
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
                <label className="block font-semibold text-slate-700 mb-1">Bio / Deskripsi Profil</label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Biografi singkat dan integritas kepemimpinan..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Urutan Tampil (Priority)</label>
                <input
                  type="number"
                  value={orderPriority}
                  onChange={(e) => setOrderPriority(parseInt(e.target.value) || 1)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-sky-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-sky-500 hover:bg-sky-500 text-white font-bold text-xs shadow-lg shadow-sky-500/20 transition-all"
              >
                + Upload & Tambah Pimpinan
              </button>
            </form>
          </div>

          {/* List Pimpinan */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 font-heading">Daftar Pimpinan Aktif ({leaders.length})</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {leaders.map((leader) => (
                <div key={leader.id} className="bg-white border border-slate-200 rounded-3xl p-5 space-y-3 flex flex-col justify-between">
                  <div className="flex gap-4 items-start">
                    <img
                      src={leader.photo || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=300'}
                      alt={leader.name}
                      className="w-16 h-16 rounded-2xl object-cover bg-slate-50 border border-slate-200 shrink-0"
                    />
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-xs text-sky-400 font-bold">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>{leader.position}</span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 font-heading">{leader.name}</h4>
                      {leader.bio && <p className="text-[11px] text-slate-600 line-clamp-2">{leader.bio}</p>}
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-200/80 pt-3 text-[11px]">
                    <span className="text-slate-500 font-medium">Urutan #{leader.order_priority}</span>
                    <button
                      onClick={() => handleDelete(leader.id)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 font-bold transition-colors"
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
