import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Head, Link } from '@inertiajs/react';
import { News } from '@/Types';
import { Calendar, ArrowLeft, Share2, Tag } from 'lucide-react';

interface Props {
  news: News;
  relatedNews: News[];
}

export default function NewsShow({ news, relatedNews }: Props) {
  return (
    <MainLayout>
      <Head title={`${news.title} - UBP Barru`} />

      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <Link href="/news" className="inline-flex items-center gap-2 text-xs font-bold text-sky-400 hover:text-sky-300">
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Berita</span>
          </Link>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 font-bold text-xs">
                {news.category?.name || 'Corporate'}
              </span>
              <div className="flex items-center gap-1.5 text-xs text-slate-600">
                <Calendar className="w-3.5 h-3.5 text-sky-400" />
                <span>{news.published_at ? new Date(news.published_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Terbaru'}</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-heading leading-tight">{news.title}</h1>
          </div>

          {news.image && (
            <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-2xl">
              <img src={news.image} alt={news.title} className="w-full max-h-[450px] object-cover" />
            </div>
          )}

          <div
            className="prose prose-invert max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed space-y-4 border-b border-slate-200 pb-10"
            dangerouslySetInnerHTML={{ __html: news.content }}
          />

          {/* Related Articles */}
          {relatedNews.length > 0 && (
            <div className="space-y-6 pt-6">
              <h3 className="text-xl font-bold text-slate-900 font-heading">Berita Terkait</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {relatedNews.map((rel) => (
                  <Link key={rel.id} href={`/news/${rel.slug}`} className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2 hover:border-sky-500/40 transition-colors">
                    <h4 className="text-xs font-bold text-slate-900 font-heading line-clamp-2">{rel.title}</h4>
                    <p className="text-[11px] text-slate-600 line-clamp-2">{rel.excerpt}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>
      </section>
    </MainLayout>
  );
}
