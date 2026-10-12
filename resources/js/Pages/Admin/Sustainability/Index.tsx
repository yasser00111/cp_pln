import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router } from '@inertiajs/react';
import { Leaf, Trash2, Plus, Upload, Save, Edit3, X, Check } from 'lucide-react';
import { SustainabilityProgram } from '@/Types';

interface Props {
  programs: SustainabilityProgram[];
}

export default function AdminSustainabilityIndex({ programs }: Props) {
  const [editingProgram, setEditingProgram] = useState<SustainabilityProgram | null>(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<string>('Environmental');
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

  const handleEdit = (prog: SustainabilityProgram) => {
    setEditingProgram(prog);
    setTitle(prog.title);
    setCategory(prog.category || 'Environmental');
    setDescription(prog.description);
    setImageFile(null);
    setImagePreview(prog.image || null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingProgram(null);
    setTitle('');
    setCategory('Environmental');
    setDescription('');
    setImageFile(null);
    setImagePreview(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', category);
    formData.append('description', description);
    if (imageFile) {
      formData.append('image', imageFile);
    }

    if (editingProgram) {
      router.post(`/admin/sustainability/${editingProgram.id}`, formData, {
        onSuccess: () => {
          handleCancelEdit();
        }
      });
    } else {
      router.post('/admin/sustainability', formData, {
        onSuccess: () => {
          handleCancelEdit();
        }
      });
    }
  };

  const handleDelete = (id: string | number) => {
    if (confirm('Apakah Anda yakin ingin menghapus program ESG ini?')) {
      router.delete(`/admin/sustainability/${id}`);
      if (editingProgram && editingProgram.id === id) {
        handleCancelEdit();
      }
    }
  };

  return (
    <AdminLayout>
      <Head title="Kelola Program ESG - Admin PLN IP UBP Barru" />

      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 font-heading flex items-center gap-2">
            <Leaf className="w-6 h-6 text-emerald-500" />
            Kelola Program ESG
          </h1>
          <p className="text-xs text-slate-600">Tambah, edit, dan kelola program Environmental, Social, & Governance.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Tambah/Edit Program */}
          <div className={`lg:col-span-1 bg-white border ${editingProgram ? 'border-emerald-500 ring-2 ring-emerald-500/20' : 'border-slate-200'} rounded-3xl p-6 space-y-4 shadow-sm self-start transition-all`}>
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="text-sm font-bold text-slate-900 font-heading flex items-center gap-2">
                {editingProgram ? (
                  <>
                    <Edit3 className="w-4 h-4 text-emerald-500" />
                    <span>Edit Program ESG</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4 text-emerald-500" />
                    <span>Tambah Program Baru</span>
                  </>
                )}
              </h3>
              {editingProgram && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 font-medium bg-slate-100 px-2 py-1 rounded-lg transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                  Batal
                </button>
              )}
            </div>

            {editingProgram && (
              <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center justify-between">
                <span>Sedang mengedit: <strong className="font-semibold">{editingProgram.title}</strong></span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Judul Program</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Contoh: Pengelolaan FABA Terpadu"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Kategori ESG</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-emerald-500 font-medium"
                >
                  <option value="Environmental">Environmental (Lingkungan)</option>
                  <option value="Social">Social (Sosial)</option>
                  <option value="Governance">Governance (Tata Kelola)</option>
                  <option value="ESG">ESG</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Deskripsi Singkat</label>
                <textarea
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Penjelasan singkat mengenai program..."
                  rows={4}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-emerald-500 leading-relaxed"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Foto Program</label>
                <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-slate-300 border-dashed rounded-xl cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors">
                  <div className="flex flex-col items-center justify-center py-4">
                    <Upload className="w-5 h-5 mb-1.5 text-slate-500" />
                    <p className="text-[10px] text-slate-500">
                      {imagePreview ? 'Klik untuk ganti foto' : 'Klik untuk upload (Max 5MB)'}
                    </p>
                  </div>
                  <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                </label>
                {imagePreview && (
                  <div className="mt-2 rounded-xl overflow-hidden border border-slate-200 relative aspect-video bg-slate-100">
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  {editingProgram ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                  {editingProgram ? 'Simpan Perubahan' : 'Simpan Program'}
                </button>
                {editingProgram && (
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="px-4 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-xl transition-all"
                  >
                    Batal
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Tabel Program */}
          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm overflow-hidden flex flex-col h-full">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-200">
              <h3 className="text-sm font-bold text-slate-900 font-heading">Daftar Program ESG</h3>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Total: {programs.length} Data
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="text-[10px] uppercase bg-slate-50 text-slate-500">
                  <tr>
                    <th className="px-4 py-3 rounded-l-xl">Gambar</th>
                    <th className="px-4 py-3">Program</th>
                    <th className="px-4 py-3">Kategori</th>
                    <th className="px-4 py-3 text-right rounded-r-xl">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {programs.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="text-center py-8 text-slate-500 italic">
                        Belum ada data program ESG.
                      </td>
                    </tr>
                  ) : (
                    programs.map((prog) => {
                      const isCurrentlyEditing = editingProgram?.id === prog.id;
                      return (
                        <tr 
                          key={prog.id} 
                          className={`border-b border-slate-100 transition-colors ${
                            isCurrentlyEditing ? 'bg-emerald-50/60' : 'hover:bg-slate-50/50'
                          }`}
                        >
                          <td className="px-4 py-3">
                            <div className="w-16 h-12 rounded-lg overflow-hidden bg-slate-200 shadow-xs">
                              {prog.image ? (
                                <img src={prog.image} alt={prog.title} className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-slate-400">
                                  <Leaf className="w-4 h-4" />
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="font-bold text-slate-900 mb-1">{prog.title}</div>
                            <div className="text-[10px] text-slate-500 line-clamp-2 leading-relaxed">{prog.description}</div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span className="px-2.5 py-1 rounded-md bg-slate-100 text-[10px] font-bold text-slate-700 border border-slate-200">
                              {prog.category}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-right whitespace-nowrap">
                            <div className="flex items-center justify-end gap-1">
                              <button
                                onClick={() => handleEdit(prog)}
                                className={`p-1.5 rounded-lg transition-colors ${
                                  isCurrentlyEditing 
                                    ? 'bg-emerald-500 text-white shadow-sm' 
                                    : 'text-blue-600 hover:bg-blue-50'
                                }`}
                                title="Edit Program"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDelete(prog.id)}
                                className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                title="Hapus"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
