import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';
import { Plus, Trash2, X } from 'lucide-react';

interface Gallery {
  id: string;
  title: string;
  category: string;
  image_url: string;
  created_at: string;
}

interface Props {
  galleries: Gallery[];
}

export default function Index({ galleries }: Props) {
  const [showAddModal, setShowAddModal] = useState(false);
  const { data, setData, post, processing, reset, delete: destroy } = useForm({
    title: '',
    category: 'Operational',
    image_file: null as File | null,
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/admin/gallery', {
      onSuccess: () => {
        setShowAddModal(false);
        reset();
      },
    });
  };

  const handleDelete = (id: string) => {
    if (confirm('Hapus foto ini?')) {
      destroy(`/admin/gallery/${id}`);
    }
  };

  return (
    <AdminLayout>
      <Head title="Kelola Galeri - Admin UBP Barru" />

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 font-heading">Kelola Galeri Foto</h1>
            <p className="text-xs text-slate-600">Daftar dokumentasi kegiatan</p>
          </div>
          <button onClick={() => setShowAddModal(true)} className="px-4 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold flex items-center gap-2">
            <Plus className="w-4 h-4" />
            <span>Tambah Foto</span>
          </button>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-2xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galleries.map((gal) => (
              <div key={gal.id} className="relative group rounded-xl overflow-hidden border border-slate-200">
                <img src={gal.image_url} alt={gal.title} className="w-full h-40 object-cover" />
                <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button onClick={() => handleDelete(gal.id)} className="p-3 bg-rose-500 text-white rounded-full hover:bg-rose-600">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
            {galleries.length === 0 && (
              <div className="col-span-full py-10 text-center text-slate-500">
                Belum ada foto galeri.
              </div>
            )}
          </div>
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-xl">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold">Tambah Foto Galeri</h2>
                <button onClick={() => setShowAddModal(false)}><X className="w-5 h-5 text-slate-400 hover:text-slate-600"/></button>
              </div>
              <form onSubmit={submit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700">Judul Foto</label>
                  <input type="text" value={data.title} onChange={e => setData('title', e.target.value)} className="mt-1 block w-full bg-white text-slate-900 rounded-md border-slate-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">Kategori</label>
                  <select value={data.category} onChange={e => setData('category', e.target.value)} className="mt-1 block w-full bg-white text-slate-900 rounded-md border-slate-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm">
                    <option value="Operational">Operational</option>
                    <option value="Environment">Environment</option>
                    <option value="CSR">CSR</option>
                    <option value="Events">Events</option>
                    <option value="Facilities">Facilities</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">File Foto</label>
                  <input type="file" onChange={e => setData('image_file', e.target.files?.[0] || null)} className="mt-1 block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sky-50 file:text-sky-700 hover:file:bg-sky-100" accept="image/*" required />
                </div>
                <div className="flex justify-end mt-6 pt-4 border-t border-slate-100">
                  <button type="submit" disabled={processing} className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 disabled:opacity-50 text-sm font-medium">
                    Upload Foto
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
