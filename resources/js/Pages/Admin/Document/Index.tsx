import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { Plus, Trash2, X, FileText, Upload, Download } from 'lucide-react';

interface DocumentType {
  id: string;
  title: string;
  category: string;
  year: string;
  file_path: string;
  file_size: string;
  created_at: string;
}

interface Props {
  documents: DocumentType[];
}

export default function Index({ documents }: Props) {
  const [showAddModal, setShowAddModal] = useState(false);
  const { data, setData, post, processing, reset } = useForm({
    title: '',
    category: 'Annual Report',
    year: new Date().getFullYear().toString(),
    file: null as File | null,
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/admin/documents', {
      onSuccess: () => {
        setShowAddModal(false);
        reset();
      },
    });
  };

  const handleDelete = (id: string) => {
    if (confirm('Hapus dokumen ini? File yang bersangkutan juga akan dihapus.')) {
      router.delete(`/admin/documents/${id}`);
    }
  };

  return (
    <AdminLayout>
      <Head title="Kelola Dokumen - Admin UBP Barru" />

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 font-heading">Kelola Dokumen</h1>
            <p className="text-xs text-slate-600">Daftar laporan resmi dan publikasi korporat</p>
          </div>
          <button onClick={() => setShowAddModal(true)} className="px-4 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold flex items-center gap-2">
            <Plus className="w-4 h-4" />
            <span>Unggah Dokumen</span>
          </button>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="py-3 px-4 text-xs font-bold text-slate-900">Judul Dokumen</th>
                  <th className="py-3 px-4 text-xs font-bold text-slate-900">Kategori</th>
                  <th className="py-3 px-4 text-xs font-bold text-slate-900">Tahun</th>
                  <th className="py-3 px-4 text-xs font-bold text-slate-900">Ukuran</th>
                  <th className="py-3 px-4 text-xs font-bold text-slate-900 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {documents.map((doc) => (
                  <tr key={doc.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center shrink-0">
                          <FileText className="w-5 h-5" />
                        </div>
                        <span className="font-bold text-slate-900 text-sm line-clamp-1">{doc.title}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-xs text-slate-600">
                      <span className="inline-flex items-center px-2 py-1 rounded-md bg-slate-100 font-semibold">{doc.category}</span>
                    </td>
                    <td className="py-4 px-4 text-xs text-slate-600 font-bold">{doc.year}</td>
                    <td className="py-4 px-4 text-xs text-slate-500">{doc.file_size}</td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex justify-end gap-2">
                        <a href={doc.file_path} target="_blank" rel="noreferrer" className="p-2 text-sky-500 hover:bg-sky-50 rounded-lg transition-colors">
                          <Download className="w-4 h-4" />
                        </a>
                        <button onClick={() => handleDelete(doc.id)} className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {documents.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-10 text-center text-slate-500 text-sm">
                      Belum ada dokumen yang diunggah.
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
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-xl">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold">Unggah Dokumen Baru</h2>
                <button onClick={() => setShowAddModal(false)}><X className="w-5 h-5 text-slate-400 hover:text-slate-600"/></button>
              </div>
              <form onSubmit={submit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700">Judul Dokumen</label>
                  <input type="text" placeholder="Misal: Annual Report 2025" value={data.title} onChange={e => setData('title', e.target.value)} className="mt-1 block w-full bg-white text-slate-900 rounded-md border-slate-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">Kategori Laporan</label>
                  <select value={data.category} onChange={e => setData('category', e.target.value)} className="mt-1 block w-full bg-white text-slate-900 rounded-md border-slate-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm">
                    <option value="Annual Report">Annual Report</option>
                    <option value="Sustainability Report">Sustainability Report</option>
                    <option value="Company Profile">Company Profile</option>
                    <option value="Environmental Report">Environmental Report</option>
                    <option value="CSR Report">CSR Report</option>
                    <option value="Laporan Konservasi">Laporan Konservasi</option>
                    <option value="Other">Lainnya</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">Tahun Publikasi</label>
                  <input type="number" min="2000" max="2100" value={data.year} onChange={e => setData('year', e.target.value)} className="mt-1 block w-full bg-white text-slate-900 rounded-md border-slate-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">File Dokumen (PDF dll)</label>
                  <div className="mt-1 flex items-center gap-4">
                    <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 text-sm font-medium rounded-md transition-colors">
                      <Upload className="w-4 h-4" />
                      <span>Pilih File</span>
                      <input type="file" accept=".pdf,.doc,.docx,.xls,.xlsx,.zip" onChange={e => setData('file', e.target.files ? e.target.files[0] : null)} className="hidden" required />
                    </label>
                    <span className="text-sm text-slate-500 truncate max-w-[200px]">
                      {data.file ? data.file.name : 'Belum ada file'}
                    </span>
                  </div>
                  <p className="mt-1 text-[10px] text-slate-500">Maksimal ukuran file: 20 MB</p>
                </div>
                
                <div className="pt-4 flex justify-end gap-3">
                  <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50">
                    Batal
                  </button>
                  <button type="submit" disabled={processing} className="px-4 py-2 text-sm font-medium text-white bg-sky-500 border border-transparent rounded-md hover:bg-sky-600 disabled:opacity-50">
                    {processing ? 'Mengunggah...' : 'Unggah Dokumen'}
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
