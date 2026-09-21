import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router } from '@inertiajs/react';
import { CompanyProfile } from '@/Types';
import { Save, CheckCircle2 } from 'lucide-react';

interface Props {
  about?: CompanyProfile;
  visi?: CompanyProfile;
  misi?: string[];
}

export default function AdminProfileIndex({ about, visi, misi }: Props) {
  const [tentangText, setTentangText] = useState(about?.content || '');
  const [visiText, setVisiText] = useState(visi?.content || '');
  const [misiList, setMisiList] = useState<string[]>(misi && misi.length > 0 ? misi : ['']);
  const [savedMsg, setSavedMsg] = useState(false);

  const handleMisiChange = (index: number, val: string) => {
    const updated = [...misiList];
    updated[index] = val;
    setMisiList(updated);
  };

  const addMisiItem = () => {
    setMisiList([...misiList, '']);
  };

  const removeMisiItem = (index: number) => {
    setMisiList(misiList.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.post('/admin/profile', {
      tentang: tentangText,
      visi: visiText,
      misi: misiList.filter((m) => m.trim() !== ''),
    }, {
      onSuccess: () => {
        setSavedMsg(true);
        setTimeout(() => setSavedMsg(false), 3000);
      }
    });
  };

  return (
    <AdminLayout>
      <Head title="Kelola Profil & Sejarah - Admin PLN IP UBP Barru" />

      <div className="max-w-4xl space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 font-heading">Kelola Konten Profil & Sejarah</h1>
            <p className="text-xs text-slate-600">Atur deskripsi Tentang UBP Barru, Sejarah, Visi, dan poin Misi Perusahaan</p>
          </div>
          {savedMsg && (
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold animate-pulse">
              <CheckCircle2 className="w-4 h-4" />
              <span>Perubahan berhasil disimpan!</span>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Tentang & Sejarah */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 font-heading border-b border-slate-200 pb-2">Tentang UBP Barru & Sejarah Singkat</h3>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Deskripsi Lengkap UBP Barru</label>
              <textarea
                rows={6}
                value={tentangText}
                onChange={(e) => setTentangText(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3 text-xs text-slate-900 focus:outline-none focus:border-sky-500"
                placeholder="Tuliskan deskripsi profil dan sejarah UBP Barru..."
              />
            </div>
          </div>

          {/* Visi */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 font-heading border-b border-slate-200 pb-2">Visi Perusahaan</h3>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Pernyataan Visi</label>
              <textarea
                rows={3}
                value={visiText}
                onChange={(e) => setVisiText(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3 text-xs text-slate-900 focus:outline-none focus:border-sky-500"
                placeholder="Visi UBP Barru..."
              />
            </div>
          </div>

          {/* Misi */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <h3 className="text-sm font-bold text-slate-900 font-heading">Poin-poin Misi Perusahaan</h3>
              <button
                type="button"
                onClick={addMisiItem}
                className="px-3 py-1.5 rounded-xl bg-sky-500/20 text-sky-400 hover:bg-sky-500/30 text-xs font-bold"
              >
                + Tambah Poin Misi
              </button>
            </div>
            <div className="space-y-3">
              {misiList.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="w-6 text-center text-xs font-bold text-slate-500">{idx + 1}.</span>
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleMisiChange(idx, e.target.value)}
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-sky-500"
                    placeholder={`Poin misi ke-${idx + 1}`}
                  />
                  {misiList.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeMisiItem(idx)}
                      className="px-2.5 py-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 text-xs font-bold"
                    >
                      Hapus
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-sky-500 hover:bg-sky-500 text-white font-bold text-xs shadow-lg shadow-sky-500/20 transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Simpan Perubahan Profil</span>
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
