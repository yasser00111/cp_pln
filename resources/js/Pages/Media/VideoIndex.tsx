import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Head } from '@inertiajs/react';
import { Video as VideoType } from '@/Types';
import { Video as VideoIcon, Play, Clock } from 'lucide-react';

interface Props {
  videos: VideoType[];
}

export default function VideoIndex({ videos }: Props) {
  return (
    <MainLayout>
      <Head title="Dokumentasi Video - UBP Barru" />

      <section className="relative py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-bold uppercase tracking-wider">
            <VideoIcon className="w-4 h-4" />
            <span>VIDEO LIBRARI</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-heading tracking-tight">
            Video Dokumentasi
          </h1>
          <p className="text-xs sm:text-sm text-slate-700 max-w-2xl leading-relaxed">
            Kumpulan video liputan resmi, company profile, dan aksi sosial keberlanjutan UBP Barru.
          </p>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {videos.map((vid) => (
              <div key={vid.id} className="bg-white border border-slate-200 rounded-3xl overflow-hidden p-6 space-y-4">
                <div className="h-64 rounded-2xl overflow-hidden relative group">
                  <img src={vid.thumbnail_url || 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=800&q=80'} alt={vid.title} className="w-full h-full object-cover" />
                  <a
                    href={vid.video_url}
                    target="_blank"
                    rel="noreferrer"
                    className="absolute inset-0 bg-slate-50/50 flex items-center justify-center group-hover:bg-slate-50/30 transition-colors"
                  >
                    <div className="w-14 h-14 rounded-full bg-sky-500 text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 fill-white ml-1" />
                    </div>
                  </a>
                  <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-slate-50/80 text-[10px] text-slate-700 font-mono flex items-center gap-1">
                    <Clock className="w-3 h-3 text-sky-400" />
                    <span>{vid.duration}</span>
                  </div>
                </div>
                <h3 className="text-base font-bold text-slate-900 font-heading">{vid.title}</h3>
                {vid.description && <p className="text-xs text-slate-600 leading-relaxed">{vid.description}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
