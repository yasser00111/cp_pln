import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router } from '@inertiajs/react';
import { HeroSlider } from '@/Types';
import { Plus, Trash2, Upload, Image as ImageIcon } from 'lucide-react';

interface Props {
  sliders: HeroSlider[];
}

export default function Index({ sliders }: Props) {
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [ctaText, setCtaText] = useState('Tentang Kami');
  const [ctaUrl, setCtaUrl] = useState('/profile/tentang');
  const [orderPriority, setOrderPriority] = useState(1);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const openAddModal = () => {
    setEditingId(null);
    setTitle('');
    setSubtitle('');
    setCtaText('Tentang Kami');
    setCtaUrl('/profile/tentang');
    setOrderPriority(1);
    setImageFile(null);
    setImagePreview(null);
    setShowModal(true);
  };

  const openEditModal = (slider: HeroSlider) => {
    setEditingId(slider.id);
    setTitle(slider.title);
    setSubtitle(slider.subtitle || '');
    setCtaText(slider.cta_text || '');
    setCtaUrl(slider.cta_url || '');
    setOrderPriority(slider.order_priority || 1);
    setImageFile(null);
    setImagePreview(slider.image);
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('subtitle', subtitle);
    formData.append('cta_text', ctaText);
    formData.append('cta_url', ctaUrl);
    formData.append('order_priority', orderPriority.toString());
    
    if (imageFile) {
      formData.append('image_file', imageFile);
    }

    const url = editingId ? `/admin/sliders/${editingId}` : '/admin/sliders';

    router.post(url, formData, {
      onSuccess: () => {
        setProcessing(false);
        setTitle('');
        setSubtitle('');
        setImageFile(null);
        setImagePreview(null);
        setShowModal(false);
        setEditingId(null);
      },
      onError: () => {
        setProcessing(false);
      }
    });
  };

  const toggleSlider = (id: string) => {
    router.post(`/admin/sliders/${id}/toggle`, {}, { preserveState: true });
  };

  const deleteSlider = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus slide foto ini?')) {
      router.delete(`/admin/sliders/${id}`, { preserveState: true });
    }
  };

  return (
    <AdminLayout>
      <Head title="Kelola Hero Sliders Foto - Admin UBP Barru" />

      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 font-heading">Kelola Slide Background Hero</h1>
            <p className="text-xs text-slate-600">Admin dapat mengunggah foto background slide carousel langsung dari komputer dan mengatur urutan tampilan</p>
          </div>
          <button
            onClick={openAddModal}
            className="px-4 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-sky-500/20"
          >
            <Plus className="w-4 h-4" />
            <span>Upload Slide Foto Baru</span>
          </button>
        </div>

        {/* Sliders Grid List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sliders.map((slider) => (
            <div
              key={slider.id}
              className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="h-48 overflow-hidden relative">
                  <img src={slider.image} alt={slider.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-50/80 text-[10px] font-bold text-sky-400 border border-white/10">
                    Urutan #{slider.order_priority}
                  </div>
                  <div className="absolute top-3 right-3">
                    {slider.is_active ? (
                      <span className="px-2.5 py-1 rounded-full bg-emerald- text-white text-[10px] font-bold uppercase">Aktif</span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full bg-rose-500/80 text-slate-900 text-[10px] font-bold uppercase">Non-Aktif</span>
                    )}
                  </div>
                </div>

                <div className="p-6 space-y-2">
                  <h3 className="text-base font-bold text-slate-900 font-heading">{slider.title}</h3>
                  {slider.subtitle && <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">{slider.subtitle}</p>}
                  <div className="text-[11px] text-sky-400 font-semibold pt-1">CTA: {slider.cta_text} ({slider.cta_url})</div>
                </div>
              </div>

              <div className="p-6 pt-0 flex items-center gap-3 border-t border-slate-200/80 mt-4">
                <button
                  onClick={() => toggleSlider(slider.id)}
                  className="px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100 text-xs font-bold text-slate-700 flex-1"
                >
                  {slider.is_active ? 'Non-Aktifkan' : 'Aktifkan'}
                </button>
                <button
                  onClick={() => openEditModal(slider)}
                  className="px-3 py-2 rounded-xl bg-sky-50 border border-sky-200 hover:bg-sky-500 hover:text-white text-sky-500 text-xs font-bold transition-colors"
                  title="Edit"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteSlider(slider.id)}
                  className="px-3 py-2 rounded-xl bg-rose-500/10 border border-rose-500/30 hover:bg-rose-500 hover:text-slate-900 text-rose-400 text-xs font-bold transition-colors"
                  title="Hapus"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add/Edit Slider Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-50/80 backdrop-blur-md">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <h3 className="text-lg font-bold text-slate-900 font-heading">
                {editingId ? 'Edit Slide Foto Hero' : 'Upload Slide Foto Hero Baru'}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-slate-600 hover:text-slate-900">✕</button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Judul Headline *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-sky-500"
                  placeholder="Contoh: Transisi Energi Bersih & Co-firing"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Sub-headline / Deskripsi</label>
                <textarea
                  rows={2}
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-sky-500"
                  placeholder="Penjelasan ringkas perihal slide..."
                />
              </div>

              {/* Upload Foto Komputer */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Foto Background dari Komputer *</label>
                <div className="relative border-2 border-dashed border-slate-200 hover:border-sky-500/50 rounded-2xl p-4 text-center bg-slate-50/60 transition-colors cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    required={!editingId && !imageFile}
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
                      <div className="text-xs text-slate-700 font-semibold">Pilih Foto Slide dari Komputer</div>
                      <div className="text-[10px] text-slate-500">Format JPG, PNG, WEBP (Max 10MB)</div>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Teks Tombol CTA</label>
                  <input
                    type="text"
                    value={ctaText}
                    onChange={(e) => setCtaText(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Urutan Prioritas</label>
                  <input
                    type="number"
                    value={orderPriority}
                    onChange={(e) => setOrderPriority(parseInt(e.target.value) || 1)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-50 text-slate-600 font-bold text-xs"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={processing}
                  className="px-6 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-500 text-white font-bold text-xs shadow-lg shadow-sky-500/30"
                >
                  {processing ? 'Menyimpan...' : (editingId ? 'Simpan Perubahan' : 'Upload & Simpan Slide')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
