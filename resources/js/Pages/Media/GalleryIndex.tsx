import React, { useState } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Head, router, usePage } from '@inertiajs/react';
import { Gallery } from '@/Types';
import { Image as ImageIcon, Eye, X } from 'lucide-react';

interface Props {
  galleries: Gallery[];
  categories: string[];
  selectedCategory: string;
}

export default function GalleryIndex({ galleries, categories, selectedCategory }: Props) {
  const [activeImage, setActiveImage] = useState<Gallery | null>(null);
  const { globalCms } = usePage<any>().props;

  const handleFilter = (cat: string) => {
    router.get('/gallery', { category: cat }, { preserveState: true });
  };

  return (
    <MainLayout>
      <Head title="Galeri Dokumentasi Foto - UBP Barru" />

      <section className="relative py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-bold uppercase tracking-wider">
            <ImageIcon className="w-4 h-4" />
            <span>GALERI FOTO</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-heading tracking-tight">
            {globalCms?.media_gallery_title?.title || "Dokumentasi Foto"}
          </h1>
          <p className="text-sm text-slate-700 max-w-2xl leading-relaxed whitespace-pre-line">
            {globalCms?.media_gallery_title?.body_text || "Kumpulan potret kegiatan, operasional, dan program CSR UBP Barru."}
          </p>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleFilter(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === cat ? 'bg-sky-500 text-white' : 'bg-white text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Masonry Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleries.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveImage(item)}
                className="group relative h-64 rounded-3xl overflow-hidden cursor-pointer border border-slate-200 hover:border-sky-500/40 transition-all shadow-xl"
              >
                <img src={item.image_url} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                <div className="absolute bottom-4 left-4 right-4 space-y-1">
                  <span className="text-[10px] font-bold text-sky-400 uppercase tracking-wider">{item.category}</span>
                  <h3 className="text-sm font-bold text-slate-900 font-heading">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Lightbox Modal */}
      {activeImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-50/90 backdrop-blur-md">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-3xl w-full p-6 space-y-4 relative">
            <button onClick={() => setActiveImage(null)} className="absolute top-4 right-4 p-2 rounded-xl bg-slate-100 text-slate-600 hover:text-slate-900">
              <X className="w-5 h-5" />
            </button>
            <div className="rounded-2xl overflow-hidden">
              <img src={activeImage.image_url} alt={activeImage.title} className="w-full max-h-[70vh] object-contain" />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-sky-400 uppercase">{activeImage.category}</span>
              <h3 className="text-base font-bold text-slate-900 font-heading">{activeImage.title}</h3>
              {activeImage.caption && <p className="text-xs text-slate-600">{activeImage.caption}</p>}
            </div>
          </div>
        </div>
      )}

    </MainLayout>
  );
}
