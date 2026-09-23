import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router } from '@inertiajs/react';
import { Save, FileText, CheckCircle2 } from 'lucide-react';

interface ContentItem {
  id: number;
  section_key: string;
  title: string | null;
  body_text: string | null;
  image_url?: string | null;
  imageFile?: File | null;
}

interface Props {
  contents: Record<string, ContentItem>;
}

export default function AdminContentIndex({ contents }: Props) {
  // Convert dict back to array of fields for easier tracking in form state
  const initialData = Object.values(contents);
  const [formData, setFormData] = useState<ContentItem[]>(initialData);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (section_key: string, field: keyof ContentItem, value: any) => {
    setFormData((prev) =>
      prev.map((item) =>
        item.section_key === section_key ? { ...item, [field]: value } : item
      )
    );
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Clean payload to prevent sending "null" strings for files
    const payload = formData.map(item => {
      const data = { ...item };
      if (!data.imageFile) {
        delete data.imageFile;
      }
      return data;
    });

    router.post(
      '/admin/contents',
      { contents: payload },
      {
        forceFormData: true,
        preserveScroll: true,
        onSuccess: () => {
          setShowSuccess(true);
          setTimeout(() => setShowSuccess(false), 3000);
        },
        onFinish: () => setIsSaving(false),
      }
    );
  };

  return (
    <AdminLayout>
      <Head title="Manajemen Teks Halaman (CMS)" />

      <div className="flex flex-col gap-6 max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <FileText className="w-6 h-6 text-sky-500" />
              Content Management
            </h1>
            <p className="text-slate-500 text-sm mt-1">Kelola semua teks statis untuk berbagai halaman dari sini.</p>
          </div>
        </div>

        {showSuccess && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl p-4 flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            <span className="text-sm font-semibold">Semua perubahan konten berhasil disimpan!</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-8">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="p-6">
              
              <div className="space-y-10">
                {formData.map((item) => (
                  <div key={item.section_key} className="border-b border-slate-100 pb-8 last:border-0 last:pb-0">
                    <h3 className="text-sm font-bold text-slate-800 mb-4 bg-slate-50 px-3 py-2 rounded-lg inline-block border border-slate-200 shadow-sm">
                      Section: {item.section_key}
                    </h3>
                    
                    <div className="grid gap-5">
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">Judul (Title)</label>
                        <input
                          type="text"
                          value={item.title || ''}
                          onChange={(e) => handleChange(item.section_key, 'title', e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all outline-none"
                          placeholder="Masukkan judul..."
                        />
                      </div>
                      
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">Isi Teks (Body)</label>
                        <textarea
                          rows={4}
                          value={item.body_text || ''}
                          onChange={(e) => handleChange(item.section_key, 'body_text', e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all outline-none resize-y"
                          placeholder="Masukkan teks narasi..."
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">Gambar Background / Banner (Opsional)</label>
                        {item.image_url && (
                          <div className="mb-2 text-xs text-emerald-600 font-semibold bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100 inline-block">
                            Gambar sudah terisi. Upload baru untuk menimpa.
                          </div>
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0] || null;
                            handleChange(item.section_key, 'imageFile', file);
                          }}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-sky-50 file:text-sky-700 hover:file:bg-sky-100"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                {formData.length === 0 && (
                  <div className="text-center py-10 text-slate-500 text-sm">
                    Belum ada data di tabel Contents. Harap jalankan ContentSeeder terlebih dahulu.
                  </div>
                )}
              </div>
            </div>

            <div className="bg-slate-50 p-6 border-t border-slate-100 flex justify-end">
              <button
                type="submit"
                disabled={isSaving || formData.length === 0}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-semibold text-sm shadow-lg shadow-sky-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5"
              >
                <Save className="w-4 h-4" />
                {isSaving ? 'Menyimpan...' : 'Simpan Semua Perubahan'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
