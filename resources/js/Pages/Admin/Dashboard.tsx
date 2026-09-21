import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';
import { ContactMessage, News } from '@/Types';
import { Activity, FileText, Mail, HardDrive, ArrowUpRight } from 'lucide-react';

interface Props {
  statsCount: number;
  newsCount: number;
  messagesCount: number;
  docsCount: number;
  recentMessages: ContactMessage[];
  recentNews: News[];
}

export default function Dashboard({
  statsCount,
  newsCount,
  messagesCount,
  docsCount,
  recentMessages,
  recentNews,
}: Props) {
  return (
    <AdminLayout>
      <Head title="Admin Dashboard - UBP Barru" />

      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 font-heading">Dashboard Admin Corporate</h1>
          <p className="text-xs text-slate-600">Ringkasan sistem & kontrol konten portal website PT PLN Indonesia Power UBP Barru</p>
        </div>

        {/* Counter Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-600 font-semibold">Berita Rilis</span>
              <FileText className="w-5 h-5 text-sky-400" />
            </div>
            <div className="text-3xl font-extrabold text-slate-900 font-heading">{newsCount}</div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-600 font-semibold">Pesan Unread</span>
              <Mail className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="text-3xl font-extrabold text-slate-900 font-heading">{messagesCount}</div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-600 font-semibold">Statistik Pembangkit</span>
              <Activity className="w-5 h-5 text-sky-400" />
            </div>
            <div className="text-3xl font-extrabold text-slate-900 font-heading">{statsCount}</div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-600 font-semibold">Dokumen PDF</span>
              <HardDrive className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="text-3xl font-extrabold text-slate-900 font-heading">{docsCount}</div>
          </div>
        </div>

        {/* Recent Activity Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="text-sm font-bold text-slate-900 font-heading">Pesan Masuk Terbaru</h3>
              <Link href="/admin/messages" className="text-xs font-bold text-sky-400 hover:text-sky-300">Lihat Semua</Link>
            </div>
            <div className="space-y-3">
              {recentMessages.map((msg) => (
                <div key={msg.id} className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{msg.name}</span>
                    <span className="text-[10px] text-slate-500">{msg.created_at}</span>
                  </div>
                  <div className="text-sky-300 font-semibold">{msg.subject}</div>
                  <div className="text-slate-600 line-clamp-1">{msg.message}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="text-sm font-bold text-slate-900 font-heading">Berita Rilis Terbaru</h3>
              <Link href="/admin/news" className="text-xs font-bold text-sky-400 hover:text-sky-300">Kelola Berita</Link>
            </div>
            <div className="space-y-3">
              {recentNews.map((nw) => (
                <div key={nw.id} className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                  <div className="font-bold text-slate-900 line-clamp-1">{nw.title}</div>
                  <div className="text-[10px] text-sky-400 font-semibold">{nw.category?.name || 'Corporate'}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </AdminLayout>
  );
}
