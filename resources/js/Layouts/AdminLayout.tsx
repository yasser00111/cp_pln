import React, { ReactNode } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { PageProps } from '@/Types';
import { LayoutDashboard, FileText, Mail, ArrowLeft, Zap, ShieldCheck } from 'lucide-react';

interface Props {
  children: ReactNode;
}

export default function AdminLayout({ children }: Props) {
  const { url } = usePage();
  const { auth } = usePage<PageProps>().props;

  return (
    <div className="min-h-screen flex bg-slate-50 text-slate-100 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 p-6 flex flex-col justify-between hidden md:flex">
        <div className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-sky-500 flex items-center justify-center text-slate-900">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 font-heading">ADMIN PANEL</div>
              <div className="text-[10px] text-sky-400 font-bold uppercase">UBP BARRU</div>
            </div>
          </div>

          <nav className="space-y-1 text-xs font-semibold">
            <Link
              href="/admin"
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors ${
                url === '/admin' ? 'bg-sky-500 text-white font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard Overview</span>
            </Link>

            <Link
              href="/admin/sliders"
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors ${
                url.startsWith('/admin/sliders') ? 'bg-sky-500 text-white font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Zap className="w-4 h-4" />
              <span>Hero Sliders Foto</span>
            </Link>

            <Link
              href="/admin/profile"
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors ${
                url.startsWith('/admin/profile') ? 'bg-sky-500 text-white font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Profil (Lama)</span>
            </Link>

            <Link
              href="/admin/contents"
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors ${
                url.startsWith('/admin/contents') ? 'bg-sky-500 text-white font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Teks Halaman (CMS)</span>
            </Link>

            <Link
              href="/admin/management"
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors ${
                url.startsWith('/admin/management') ? 'bg-sky-500 text-white font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Struktur & Pimpinan</span>
            </Link>

            <Link
              href="/admin/facilities"
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors ${
                url.startsWith('/admin/facilities') ? 'bg-sky-500 text-white font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Zap className="w-4 h-4" />
              <span>Fasilitas Pembangkit</span>
            </Link>

            <Link
              href="/admin/awards"
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors ${
                url.startsWith('/admin/awards') ? 'bg-sky-500 text-white font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Penghargaan & ISO</span>
            </Link>

            <Link
              href="/admin/biodiversity"
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors ${
                url.startsWith('/admin/biodiversity') ? 'bg-sky-500 text-white font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Keanekaragaman Hayati</span>
            </Link>

            <Link
              href="/admin/news"
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors ${
                url.startsWith('/admin/news') ? 'bg-sky-500 text-white font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Kelola Berita</span>
            </Link>

            <Link
              href="/admin/messages"
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors ${
                url.startsWith('/admin/messages') ? 'bg-sky-500 text-white font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Mail className="w-4 h-4" />
              <span>Pesan Masuk Form</span>
            </Link>

            <Link
              href="/admin/settings"
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors ${
                url.startsWith('/admin/settings') ? 'bg-sky-500 text-white font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Zap className="w-4 h-4" />
              <span>Pengaturan Situs</span>
            </Link>
          </nav>
        </div>

        <div className="pt-6 border-t border-slate-200 space-y-3">
          <div className="text-xs text-slate-600">
            <div className="font-bold text-slate-900">{auth.user?.name || 'Admin PLN IP'}</div>
            <div className="text-[10px] text-emerald-400 font-semibold">{auth.user?.email || 'admin@plnindonesiapower.co.id'}</div>
          </div>

          <div className="flex flex-col gap-2">
            <Link
              href="/"
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Lihat Website Frontend</span>
            </Link>

            <Link
              href="/logout"
              method="post"
              as="button"
              className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-xs font-bold text-red-400 hover:bg-red-500/20 transition-colors"
            >
              <span>Keluar / Log Out</span>
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 sm:p-10 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
