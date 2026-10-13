import React, { useState } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { News, Category } from '@/Types';
import { FileText, Search, Calendar, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  newsList: {
    data: News[];
    links: any[];
    current_page: number;
    last_page: number;
  };
  categories: Category[];
  filters: { search?: string; category?: string };
}

export default function NewsIndex({ newsList, categories, filters }: Props) {
  const [search, setSearch] = useState(filters.search || '');

  const { globalCms } = usePage<any>().props;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.get('/news', { search, category: filters.category }, { preserveState: true });
  };

  const handleCategoryFilter = (slug: string | null) => {
    router.get('/news', { search: filters.search, category: slug || undefined }, { preserveState: true });
  };

  return (
    <MainLayout>
      <Head title="Berita & Media Korporat - UBP Barru" />

      <section className="relative py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-bold uppercase tracking-wider">
            <FileText className="w-4 h-4" />
            <span>KABAR PERUSAHAAN</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-heading tracking-tight">
            {globalCms?.media_news_title?.title || "Berita & Publikasi"}
          </h1>
          <p className="text-xs sm:text-sm text-slate-700 max-w-2xl leading-relaxed">
            {globalCms?.media_news_title?.body_text || "Informasi resmi mengenai kegiatan operasional, penghargaan, aksi keberlanjutan, dan CSR UBP Barru."}
          </p>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => handleCategoryFilter(null)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  !filters.category ? 'bg-sky-500 text-white' : 'bg-white text-slate-600 hover:text-slate-900'
                }`}
              >
                Semua Kategori
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryFilter(cat.slug)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    filters.category === cat.slug ? 'bg-sky-500 text-white' : 'bg-white text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            <form onSubmit={handleSearch} className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-600 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Cari judul berita..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-sky-500"
              />
            </form>
          </div>

          {/* News Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {newsList.data.map((news) => (
              <article key={news.id} className="bg-white border border-slate-200 rounded-3xl overflow-hidden hover:border-sky-500/40 transition-all group flex flex-col justify-between">
                <div>
                  <div className="h-48 overflow-hidden relative">
                    <img src={news.image || 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80'} alt={news.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-50/80 backdrop-blur-md text-[10px] font-bold text-sky-400">
                      {news.category?.name || 'Corporate'}
                    </div>
                  </div>
                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-600">
                      <Calendar className="w-3.5 h-3.5 text-sky-400" />
                      <span>{news.published_at ? new Date(news.published_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Terbaru'}</span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 font-heading group-hover:text-sky-300 line-clamp-2">{news.title}</h3>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{news.excerpt}</p>
                  </div>
                </div>
                <div className="px-6 pb-6">
                  <Link href={`/news/${news.slug}`} className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-400 hover:text-sky-300">
                    <span>Baca Artikel</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

        </div>
      </section>
    </MainLayout>
  );
}
