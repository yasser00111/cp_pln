import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { Plus, Trash2, X, PlaySquare } from 'lucide-react';

interface Video {
  id: string;
  title: string;
  type: string;
  video_url: string;
  description: string;
  created_at: string;
}

interface Props {
  videos: Video[];
}

export default function Index({ videos }: Props) {
  const [showAddModal, setShowAddModal] = useState(false);
  const { data, setData, post, processing, reset } = useForm({
    title: '',
    type: 'Operational',
    video_url: '',
    description: '',
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/admin/videos', {
      onSuccess: () => {
        setShowAddModal(false);
        reset();
      },
    });
  };

  const handleDelete = (id: string) => {
    if (confirm('Hapus video dokumentasi ini?')) {
      router.delete(`/admin/videos/${id}`);
    }
  };

  // Helper to extract YouTube video ID for thumbnail
  const getYoutubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  return (
    <AdminLayout>
      <Head title="Kelola Video - Admin UBP Barru" />

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 font-heading">Kelola Video Dokumentasi</h1>
            <p className="text-xs text-slate-600">Daftar video kegiatan perusahaan</p>
          </div>
          <button onClick={() => setShowAddModal(true)} className="px-4 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold flex items-center gap-2">
            <Plus className="w-4 h-4" />
            <span>Tambah Video</span>
          </button>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((vid) => {
              const ytId = getYoutubeId(vid.video_url);
              const thumbnailUrl = ytId ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg` : null;

              return (
                <div key={vid.id} className="relative group rounded-2xl overflow-hidden border border-slate-200 flex flex-col">
                  <div className="aspect-video bg-slate-100 relative">
                    {thumbnailUrl ? (
                      <img src={thumbnailUrl} alt={vid.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <PlaySquare className="w-12 h-12 text-slate-300" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <a href={vid.video_url} target="_blank" rel="noreferrer" className="p-3 bg-white/20 backdrop-blur text-white rounded-full hover:bg-white hover:text-sky-500 mr-2">
                        <PlaySquare className="w-5 h-5" />
                      </a>
                      <button onClick={() => handleDelete(vid.id)} className="p-3 bg-rose-500/80 text-white rounded-full hover:bg-rose-600">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <div className="p-4 bg-white">
                    <span className="text-[10px] font-bold text-sky-500 uppercase tracking-wider">{vid.type}</span>
                    <h3 className="font-bold text-slate-900 mt-1 line-clamp-2">{vid.title}</h3>
                    <p className="text-xs text-slate-600 mt-2 line-clamp-2">{vid.description}</p>
                  </div>
                </div>
              );
            })}
            {videos.length === 0 && (
              <div className="col-span-full py-10 text-center text-slate-500">
                Belum ada video dokumentasi.
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
                <h2 className="text-lg font-bold">Tambah Video Dokumentasi</h2>
                <button onClick={() => setShowAddModal(false)}><X className="w-5 h-5 text-slate-400 hover:text-slate-600"/></button>
              </div>
              <form onSubmit={submit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700">Judul Video</label>
                  <input type="text" value={data.title} onChange={e => setData('title', e.target.value)} className="mt-1 block w-full bg-white text-slate-900 rounded-md border-slate-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">Link YouTube</label>
                  <input type="url" placeholder="https://www.youtube.com/watch?v=..." value={data.video_url} onChange={e => setData('video_url', e.target.value)} className="mt-1 block w-full bg-white text-slate-900 rounded-md border-slate-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">Kategori</label>
                  <select value={data.type} onChange={e => setData('type', e.target.value)} className="mt-1 block w-full bg-white text-slate-900 rounded-md border-slate-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm">
                    <option value="Operational">Operational</option>
                    <option value="Environment">Environment</option>
                    <option value="CSR">CSR</option>
                    <option value="Events">Events</option>
                    <option value="Facilities">Facilities</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">Deskripsi Singkat</label>
                  <textarea rows={3} value={data.description} onChange={e => setData('description', e.target.value)} className="mt-1 block w-full bg-white text-slate-900 rounded-md border-slate-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm" />
                </div>
                
                <div className="pt-4 flex justify-end gap-3">
                  <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50">
                    Batal
                  </button>
                  <button type="submit" disabled={processing} className="px-4 py-2 text-sm font-medium text-white bg-sky-500 border border-transparent rounded-md hover:bg-sky-600 disabled:opacity-50">
                    {processing ? 'Menyimpan...' : 'Simpan Video'}
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
