import React, { ReactNode, useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { PageProps } from '@/Types';
import { LayoutDashboard, FileText, Mail, ArrowLeft, Zap, ShieldCheck, Users, Image as ImageIcon, Film, Leaf, Heart, ChevronDown } from 'lucide-react';

const NavGroup = ({ title, children, defaultOpen = false }: { title: string, children: ReactNode, defaultOpen?: boolean }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="space-y-1">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider hover:text-slate-600 transition-colors focus:outline-none"
      >
        <span>{title}</span>
        <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="space-y-1 mt-1">
          {children}
        </div>
      </div>
    </div>
  );
};

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

          <nav className="space-y-4">
            
            {/* Dashboard */}
            <div className="space-y-1">
              <Link
                href="/admin"
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors text-xs font-semibold ${
                  url === '/admin' ? 'bg-sky-500 text-white font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard Overview</span>
              </Link>
            </div>

            {/* Profile & Perusahaan */}
            <NavGroup title="Profile & Perusahaan" defaultOpen={url.startsWith('/admin/sliders') || url.startsWith('/admin/profile') || url.startsWith('/admin/management') || url.startsWith('/admin/facilities') || url.startsWith('/admin/awards') || url.startsWith('/admin/statistics')}>
              <Link
                href="/admin/statistics"
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors text-xs font-semibold ${
                  url.startsWith('/admin/statistics') ? 'bg-sky-500 text-white font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Zap className="w-4 h-4" />
                <span>Statistik Operasional</span>
              </Link>
              <Link
                href="/admin/sliders"
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors text-xs font-semibold ${
                  url.startsWith('/admin/sliders') ? 'bg-sky-500 text-white font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Zap className="w-4 h-4" />
                <span>Hero Sliders Foto</span>
              </Link>
              <Link
                href="/admin/profile"
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors text-xs font-semibold ${
                  url.startsWith('/admin/profile') ? 'bg-sky-500 text-white font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Profil (Lama)</span>
              </Link>
              <Link
                href="/admin/management"
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors text-xs font-semibold ${
                  url.startsWith('/admin/management') ? 'bg-sky-500 text-white font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Struktur & Pimpinan</span>
              </Link>
              <Link
                href="/admin/facilities"
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors text-xs font-semibold ${
                  url.startsWith('/admin/facilities') ? 'bg-sky-500 text-white font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Zap className="w-4 h-4" />
                <span>Fasilitas Pembangkit</span>
              </Link>
              <Link
                href="/admin/awards"
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors text-xs font-semibold ${
                  url.startsWith('/admin/awards') ? 'bg-sky-500 text-white font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Penghargaan & ISO</span>
              </Link>
            </NavGroup>

            {/* Biodiversity */}
            <NavGroup title="Biodiversity" defaultOpen={url.startsWith('/admin/biodiversity')}>
              <Link
                href="/admin/biodiversity"
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors text-xs font-semibold ${
                  url.startsWith('/admin/biodiversity') ? 'bg-sky-500 text-white font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Keanekaragaman Hayati</span>
              </Link>
            </NavGroup>

            {/* Sustainability */}
            <NavGroup title="Sustainability" defaultOpen={url.startsWith('/admin/sustainability') || url.startsWith('/admin/csr') || url.startsWith('/admin/srikandi')}>
              <Link
                href="/admin/sustainability"
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors text-xs font-semibold ${
                  url.startsWith('/admin/sustainability') ? 'bg-sky-500 text-white font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Leaf className="w-4 h-4" />
                <span>Kelola Program ESG</span>
              </Link>
              <Link
                href="/admin/csr"
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors text-xs font-semibold ${
                  url.startsWith('/admin/csr') ? 'bg-sky-500 text-white font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Heart className="w-4 h-4" />
                <span>Kelola CSR</span>
              </Link>
              <Link
                href="/admin/srikandi"
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors text-xs font-semibold ${
                  url.startsWith('/admin/srikandi') ? 'bg-sky-500 text-white font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>Kelola Srikandi</span>
              </Link>
            </NavGroup>

            {/* Media & Informasi */}
            <NavGroup title="Media & Informasi" defaultOpen={url.startsWith('/admin/news') || url.startsWith('/admin/gallery') || url.startsWith('/admin/videos') || url.startsWith('/admin/documents')}>
              <Link
                href="/admin/news"
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors text-xs font-semibold ${
                  url.startsWith('/admin/news') ? 'bg-sky-500 text-white font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Kelola Berita</span>
              </Link>
              <Link
                href="/admin/gallery"
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors text-xs font-semibold ${
                  url.startsWith('/admin/gallery') ? 'bg-sky-500 text-white font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <ImageIcon className="w-4 h-4" />
                <span>Kelola Galeri Foto</span>
              </Link>
              <Link
                href="/admin/videos"
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors text-xs font-semibold ${
                  url.startsWith('/admin/videos') ? 'bg-sky-500 text-white font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Film className="w-4 h-4" />
                <span>Kelola Video</span>
              </Link>
              <Link
                href="/admin/documents"
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors text-xs font-semibold ${
                  url.startsWith('/admin/documents') ? 'bg-sky-500 text-white font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Kelola Dokumen</span>
              </Link>
            </NavGroup>

            {/* Contact & Settings */}
            <NavGroup title="Contact & Settings" defaultOpen={url.startsWith('/admin/messages') || url.startsWith('/admin/contents') || url.startsWith('/admin/settings')}>
              <Link
                href="/admin/messages"
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors text-xs font-semibold ${
                  url.startsWith('/admin/messages') ? 'bg-sky-500 text-white font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Mail className="w-4 h-4" />
                <span>Pesan Masuk Form</span>
              </Link>
              <Link
                href="/admin/contents"
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors text-xs font-semibold ${
                  url.startsWith('/admin/contents') ? 'bg-sky-500 text-white font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Teks Halaman (CMS)</span>
              </Link>
              <Link
                href="/admin/settings"
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors text-xs font-semibold ${
                  url.startsWith('/admin/settings') ? 'bg-sky-500 text-white font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Zap className="w-4 h-4" />
                <span>Pengaturan Situs</span>
              </Link>
            </NavGroup>

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
