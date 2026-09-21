import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';
import { News } from '@/Types';
import { Plus, Trash2, X } from 'lucide-react';

interface Props {
  newsList: News[];
}

export default function Index({ newsList }: Props) {
  const [showAddModal, setShowAddModal] = useState(false);
  const { data, setData, post, processing, reset, delete: destroy } = useForm({
    title: '',
    excerpt: '',
    content: '',
    image_file: null as File | null,
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/admin/news', {
      onSuccess: () => {
        setShowAddModal(false);
        reset();
      },
    });
  };

  const handleDelete = (id: string) => {
    if (confirm('Hapus berita ini?')) {
      destroy(`/admin/news/${id}`);
    }
  };

  return (
    <AdminLayout>
      <Head title="Kelola Berita - Admin UBP Barru" />

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 font-heading">Kelola Berita</h1>
            <p className="text-xs text-slate-600">Daftar publikasi artikel UBP Barru</p>
          </div>
          <button onClick={() => setShowAddModal(true)} className="px-4 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold flex items-center gap-2">
            <Plus className="w-4 h-4" />
            <span>Tambah Berita</span>
          </button>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200 uppercase">
                <tr>
                  <th className="px-6 py-4">Judul</th>
                  <th className="px-6 py-4">Tanggal Rilis</th>
                  <th className="px-6 py-4">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700">
                {newsList.map((nw) => (
                  <tr key={nw.id} className="hover:bg-slate-50/50">
                    <td className="px-6 py-4 font-bold text-slate-900 max-w-xs truncate">{nw.title}</td>
                    <td className="px-6 py-4">{nw.published_at ? new Date(nw.published_at).toLocaleDateString('id-ID') : '-'}</td>
                    <td className="px-6 py-4">
                      <button onClick={() => handleDelete(nw.id)} className="p-2 bg-rose-100 text-rose-500 rounded-lg hover:bg-rose-200">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
                {newsList.length === 0 && (
                  <tr>
                    <td colSpan={3} className="px-6 py-8 text-center text-slate-500">
                      Belum ada berita yang dipublikasikan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-xl">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold">Tambah Berita</h2>
                <button onClick={() => setShowAddModal(false)}><X className="w-5 h-5 text-slate-400 hover:text-slate-600"/></button>
              </div>
              <form onSubmit={submit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700">Judul Berita</label>
                  <input type="text" value={data.title} onChange={e => setData('title', e.target.value)} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm text-slate-900" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">Kutipan Singkat (Excerpt)</label>
                  <input type="text" value={data.excerpt} onChange={e => setData('excerpt', e.target.value)} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm text-slate-900" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">Konten Berita</label>
                  <textarea value={data.content} onChange={e => setData('content', e.target.value)} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 min-h-[150px] sm:text-sm text-slate-900" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">Gambar Cover</label>
                  <input type="file" onChange={e => setData('image_file', e.target.files?.[0] || null)} className="mt-1 block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sky-50 file:text-sky-700 hover:file:bg-sky-100" accept="image/*" />
                </div>
                <div className="flex justify-end mt-6 pt-4 border-t border-slate-100">
                  <button type="submit" disabled={processing} className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 disabled:opacity-50 text-sm font-medium">
                    Simpan Berita
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
