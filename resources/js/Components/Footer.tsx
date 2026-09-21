import React from 'react';
import { Link } from '@inertiajs/react';
import {
  Zap,
  MapPin,
  Phone,
  Mail,
  ArrowUpRight,
  ShieldCheck,
  Globe,
  Leaf
} from 'lucide-react';
import { usePage } from '@inertiajs/react';

export default function Footer() {
  const { settings } = usePage<any>().props;

  return (
    <footer className="bg-slate-50 text-slate-600 border-t border-slate-200/80 pt-16 pb-12 relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-200/60">
          
          {/* Col 1: Branding & Address */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center gap-2.5">
              {/* Official PLN Icon */}
              <div className="w-9 h-11 relative flex items-center justify-center shrink-0">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/2/20/Logo_PLN.svg" 
                  alt="Logo PLN" 
                  className="w-full h-full object-contain"
                />
              </div>
              
              {/* Text Logo */}
              <div className="flex flex-col justify-center">
                <div className="flex items-baseline gap-1.5">
                  <span className="font-extrabold tracking-tight text-slate-900 text-xl font-heading leading-none">PLN</span>
                  <span className="font-medium text-sky-300 text-sm leading-none">Indonesia Power</span>
                </div>
                <div className="text-[10px] font-bold tracking-[0.2em] text-emerald-400 uppercase mt-1">
                  UBP BARRU
                </div>
              </div>
            </div>

            <p className="text-xs leading-relaxed text-slate-700 max-w-md">
              PT PLN Indonesia Power Unit Bisnis Pembangkitan (UBP) Barru berkomitmen menghadirkan pasokan energi listrik yang andal, aman, efisien, dan ramah lingkungan demi memperkuat sistem kelistrikan Sulbagsel.
            </p>

            <div className="space-y-2.5 pt-2 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-sky-400 mt-0.5 shrink-0" />
                <span className="text-slate-700">{settings?.address || 'Desa Lampoko, Kecamatan Balusu, Kabupaten Barru, Sulawesi Selatan 90752'}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-slate-700">{settings?.phone || '(0421) 921-234'}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <span className="text-slate-700">{settings?.email || 'humas.ubpbarru@plnindonesiapower.co.id'}</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-2 pt-2">
              <a
                href={settings?.instagram_url || "https://instagram.com/plnindonesiapower"}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-sky-500 hover:border-sky-500 transition-all duration-200"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a
                href={settings?.facebook_url || "https://facebook.com/plnindonesiapower"}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-sky-500 hover:border-sky-500 transition-all duration-200"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.714 5H18V0h-3.808C10.592 0 9 1.582 9 4.615V8z"/></svg>
              </a>
              <a
                href={settings?.youtube_url || "https://youtube.com/plnindonesiapower"}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-red-500 hover:border-red-500 transition-all duration-200"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
              </a>
              <a
                href={settings?.linkedin_url || "https://linkedin.com/company/plnindonesiapower"}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-sky-600 hover:border-sky-600 transition-all duration-200"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/></svg>
              </a>
            </div>
          </div>

          {/* Col 2: Profile Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-extrabold tracking-wider text-slate-900 uppercase font-heading flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-sky-400" />
              <span>PROFILE & PROSES</span>
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link href="/profile/tentang" className="hover:text-sky-300 transition-colors">Tentang UBP Barru</Link></li>
              <li><Link href="/profile/visi-misi" className="hover:text-sky-300 transition-colors">Visi & Misi</Link></li>
              <li><Link href="/profile/sejarah" className="hover:text-sky-300 transition-colors">Sejarah Perusahaan</Link></li>
              <li><Link href="/profile/struktur-organisasi" className="hover:text-sky-300 transition-colors">Struktur Organisasi</Link></li>
              <li><Link href="/profile/pimpinan" className="hover:text-sky-300 transition-colors">Jajaran Pimpinan</Link></li>
              <li><Link href="/profile/fasilitas" className="hover:text-sky-300 transition-colors">Fasilitas Pembangkit</Link></li>
              <li><Link href="/profile/penghargaan" className="hover:text-sky-300 transition-colors">Penghargaan & Sertifikat</Link></li>
            </ul>
          </div>

          {/* Col 3: Sustainability & Kehati */}
          <div className="space-y-4">
            <h4 className="text-xs font-extrabold tracking-wider text-slate-900 uppercase font-heading flex items-center gap-1.5">
              <Leaf className="w-3.5 h-3.5 text-emerald-400" />
              <span>SUSTAINABILITY</span>
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link href="/sustainability/commitment" className="hover:text-emerald-300 transition-colors">Komitmen Keberlanjutan</Link></li>
              <li><Link href="/biodiversity" className="hover:text-emerald-300 transition-colors font-semibold text-emerald-400 flex items-center gap-1"><span>Keanekaragaman Hayati</span> <ArrowUpRight className="w-3 h-3" /></Link></li>
              <li><Link href="/sustainability/lingkungan" className="hover:text-emerald-300 transition-colors">Program Lingkungan & FABA</Link></li>
              <li><Link href="/csr" className="hover:text-emerald-300 transition-colors">Program CSR / TJSL</Link></li>
              <li><Link href="/sustainability/k3" className="hover:text-emerald-300 transition-colors">Safety First & K3</Link></li>
              <li><Link href="/sustainability/esg" className="hover:text-emerald-300 transition-colors">Metrics & Laporan ESG</Link></li>
            </ul>
          </div>

          {/* Col 4: Informasi & Media */}
          <div className="space-y-4">
            <h4 className="text-xs font-extrabold tracking-wider text-slate-900 uppercase font-heading flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-sky-400" />
              <span>INFORMASI & MEDIA</span>
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link href="/news" className="hover:text-sky-300 transition-colors">Berita Korporat</Link></li>
              <li><Link href="/gallery" className="hover:text-sky-300 transition-colors">Galeri Foto</Link></li>
              <li><Link href="/videos" className="hover:text-sky-300 transition-colors">Dokumentasi Video</Link></li>
              <li><Link href="/downloads" className="hover:text-sky-300 transition-colors font-medium text-slate-800">Download Center (PDF)</Link></li>
              <li><Link href="/contact" className="hover:text-sky-300 transition-colors">Kontak Humas</Link></li>
              <li><Link href="/admin" className="hover:text-sky-300 transition-colors text-slate-500">Portal Staff Admin</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            {settings?.footer_copyright || `© ${new Date().getFullYear()} PT PLN Indonesia Power UBP Barru. All rights reserved.`}
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-700 transition-colors">Kebijakan Privasi</a>
            <a href="#" className="hover:text-slate-700 transition-colors">Syarat & Ketentuan</a>
            <a href="#" className="hover:text-slate-700 transition-colors">Peta Situs</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
