import React, { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import {
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  Zap,
  ShieldCheck,
  Leaf,
  FileText,
  PhoneCall,
  Activity,
  Award,
  Layers,
  Users,
  Compass,
  Building2,
  Video,
  Image as ImageIcon,
  Download,
  Info,
  Star,
  Target,
  GraduationCap,
  Sparkles,
  UserCheck,
  BarChart3,
  Database,
  Camera,
  MessageCircle,
  PlayCircle,
  Briefcase
} from 'lucide-react';

export default function Navbar() {
  const { url } = usePage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [activeProfileTab, setActiveProfileTab] = useState<'profile' | 'awards' | 'hcm' | 'management'>('profile');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const profileCategories = [
    {
      id: 'profile',
      label: 'Profile',
      items: [
        { label: 'Our Profile', href: '/profile/tentang', desc: 'Tentang PT PLN Indonesia Power UBP Barru' },
        { label: 'Mission', href: '/profile/visi-misi#misi', desc: '5 Misi Strategis Keberlanjutan' },
        { label: 'Vision', href: '/profile/visi-misi#visi', desc: 'Visi Utama UBP Barru' },
        { label: 'Our Core Competencies', href: '/profile/visi-misi#competencies', desc: 'CFB Boiler & Baseload Reliability' },
        { label: 'Our Values', href: '/profile/visi-misi#values', desc: 'Nilai Insan BUMN AKHLAK' },
        { label: 'Our Strengths', href: '/profile/visi-misi#strengths', desc: 'Keunggulan Operasional Pembangkit' },
      ],
    },
    {
      id: 'awards',
      label: 'Awards & Certifications',
      items: [
        { label: 'Awards', href: '/profile/penghargaan', desc: 'Penghargaan & Prestasi UBP Barru' },
        { label: 'Certifications', href: '/profile/penghargaan#certifications', desc: 'ISO 9001, ISO 45001, ISO 14001, SMK3, ISO 37001, ISO 50001' },
      ],
    },
    {
      id: 'hcm',
      label: 'Human Capital Management',
      items: [
        { label: 'Work At PLN IP', href: '/profile/human-capital', desc: 'Pengembangan Talenta & Karir Insan PLN IP' },
        { label: 'Rekrutmen PLN', href: 'https://rekrutmen.pln.co.id/', desc: 'Portal Rekrutmen Resmi PT PLN' },
      ],
    },
    {
      id: 'management',
      label: 'Management',
      items: [
        { label: 'Management', href: '/profile/pimpinan', desc: 'Foto, Nama & Jabatan Manajemen' },
      ],
    },
  ];

  const otherMenus = [
    {
      label: 'BIODIVERSITY',
      items: [
        { label: 'Data & Informasi Hayati', href: '/biodiversity/info', desc: 'Informasi terkait Data Keanekaragaman Hayati', icon: Layers },
        { label: 'Grafik Indeks Kehati', href: '/biodiversity/kehati-indeks', desc: 'Visualisasi Data Tren Kehati (Bar & Garis)', icon: Activity },
        { label: 'Program Konservasi', href: '/biodiversity/program', desc: 'Program penghijauan, penangkaran penyu & mangrove', icon: Leaf },
        { label: 'Laporan Konservasi (PDF Report)', href: '/biodiversity/report', desc: 'Publikasi & laporan kehati tahunan UBP Barru', icon: FileText },
      ],
    },
    {
      label: 'SUSTAINABILITY',
      items: [
        { label: 'Kebijakan IMS', href: '/sustainability/commitment', desc: 'Kebijakan Sistem Manajemen Terintegrasi', icon: ShieldCheck },
        { label: 'About CSR', href: '/csr#viewr', desc: 'Kemitraan masyarakat lokal', icon: Users },
        { label: 'Program CSR Unggulan', href: '/csr#unggulan', desc: 'Inisiatif tanggung jawab sosial utama', icon: Award },
        { label: 'Track Record PROPER', href: '/sustainability/lingkungan', desc: 'Peringkat Environmental Public', icon: Building2 },
        { label: 'Operational Health and Safety', href: '/sustainability/k3', desc: 'Budaya K3 & Zero Accident', icon: Activity },
        { label: 'Gender Mainstreaming', href: '/sustainability/gender', desc: 'Srikandi PLN IP', icon: UserCheck },
      ],
    },
    {
      label: 'MEDIA',
      items: [
        { label: 'Berita', href: '/news', desc: 'Kabar terbaru & pengumuman korporat', icon: FileText },
        { label: 'Galeri Foto', href: '/gallery', desc: 'Dokumentasi visual kegiatan & pembangkit', icon: ImageIcon },
        { label: 'Video Dokumentasi', href: '/videos', desc: 'Perjalanan & liputan video resmi', icon: Video },
      ],
    },
    {
      label: 'INFORMASI',
      items: [
        { label: 'Download Center (PDF)', href: '/downloads', desc: 'Annual Report, ESG & Publikasi PDF', icon: Download },
      ],
    },
    {
      label: 'CONTACT',
      items: [
        { label: 'Hubungi Kami', href: '/contact', desc: 'Informasi kontak & lokasi UBP Barru', icon: PhoneCall },
        { label: 'Instagram', href: 'https://instagram.com/plnip_barru', desc: '@plnip_barru', icon: Camera },
        { label: 'Facebook', href: 'https://facebook.com/plnipbarru', desc: 'PLN IP UBP Barru', icon: MessageCircle },
        { label: 'YouTube', href: 'https://youtube.com/@plnipbarru', desc: 'Channel Resmi UBP Barru', icon: PlayCircle },
        { label: 'LinkedIn', href: 'https://linkedin.com/company/pt-pln-indonesia-power', desc: 'PT PLN Indonesia Power', icon: Briefcase },
      ],
    },
  ];

  const isCurrentUrl = (path: string) => {
    if (path === '/') return url === '/';
    return url.startsWith(path);
  };

  const activeCategory = profileCategories.find((c) => c.id === activeProfileTab) || profileCategories[0];

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-950/95 backdrop-blur-md shadow-xl border-b border-sky-500/20 py-3' : 'bg-gradient-to-r from-slate-950/90 via-slate-900/85 to-sky-950/85 backdrop-blur-sm py-4 border-b border-white/10'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo & Title */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="w-10 h-12 relative flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
              <img 
                src="/assets/logo-pln-box.png" 
                alt="Logo PLN" 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col justify-center" style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <span className="font-black tracking-[0.1em] text-[#00A2E9] text-[22px] leading-none mb-0.5">PLN</span>
              <span className="font-normal tracking-wide text-slate-100 text-[13px] leading-none mb-1">Indonesia Power</span>
              <span className="font-bold tracking-[0.2em] text-emerald-400 text-[9px] uppercase leading-none">UNIT BARRU</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            <Link
              href="/"
              className={`px-3 py-2 rounded-lg text-xs font-bold tracking-wider transition-all duration-200 ${
                isCurrentUrl('/') && url === '/'
                  ? 'text-sky-400 bg-sky-500/10 border border-sky-500/30'
                  : 'text-slate-200 hover:text-sky-300 hover:bg-slate-900/5'
              }`}
            >
              HOME
            </Link>

            {/* 1. PROFILE CASCADING DROPDOWN */}
            <div
              className="relative"
              onMouseEnter={() => setProfileDropdownOpen(true)}
              onMouseLeave={() => setProfileDropdownOpen(false)}
            >
              <button
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold tracking-wider transition-all duration-200 ${
                  url.startsWith('/profile') || url === '/awards' || profileDropdownOpen
                    ? 'text-sky-400 bg-sky-500/10 border border-sky-500/30'
                    : 'text-slate-200 hover:text-sky-300 hover:bg-slate-900/5'
                }`}
              >
                <span>PROFILE</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${profileDropdownOpen ? 'rotate-180 text-sky-400' : 'text-slate-400'}`} />
              </button>

              {profileDropdownOpen && (
                <div className="absolute top-full left-0 w-[540px] pt-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="flex rounded-2xl overflow-hidden shadow-2xl shadow-slate-950 border border-sky-500/30 ring-1 ring-white/10">
                    
                    {/* Left Column (Level 1 Categories) */}
                    <div className="w-52 bg-[#0082C8] text-white flex flex-col divide-y divide-white/10">
                      {profileCategories.map((cat) => {
                        if (cat.items.length === 1) {
                          const singleItem = cat.items[0];
                          return (
                            <Link
                              key={cat.id}
                              href={singleItem.href}
                              className={`w-full px-4 py-3.5 text-left text-xs font-bold font-heading flex items-center justify-between transition-colors ${
                                isCurrentUrl(singleItem.href)
                                  ? 'bg-[#00A3E0] text-white shadow-inner font-extrabold'
                                  : 'bg-[#0070B0] text-slate-100 hover:bg-[#0082C8]'
                              }`}
                            >
                              <span className="leading-tight">{cat.label}</span>
                            </Link>
                          );
                        }

                        return (
                          <button
                            key={cat.id}
                            onMouseEnter={() => setActiveProfileTab(cat.id as any)}
                            onClick={() => setActiveProfileTab(cat.id as any)}
                            className={`w-full px-4 py-3.5 text-left text-xs font-bold font-heading flex items-center justify-between transition-colors ${
                              activeProfileTab === cat.id
                                ? 'bg-[#00A3E0] text-white shadow-inner font-extrabold'
                                : 'bg-[#0070B0] text-slate-100 hover:bg-[#0082C8]'
                            }`}
                          >
                            <span className="leading-tight">{cat.label}</span>
                            <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${activeProfileTab === cat.id ? 'translate-x-0.5 text-white' : 'opacity-70'}`} />
                          </button>
                        );
                      })}
                    </div>

                    {/* Right Column (Level 2 Submenu Items) */}
                    <div className="flex-1 bg-[#004B80] p-4 text-white min-h-[260px]">
                      <div className="space-y-1">
                        {activeCategory.items.map((sub) => {
                          const isExternal = sub.href.startsWith('http');
                          
                          if (isExternal) {
                            return (
                              <a
                                key={sub.label}
                                href={sub.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block py-2.5 px-3 rounded-lg text-xs font-semibold text-white hover:bg-slate-900/15 transition-all border-b border-white/10 last:border-0 group"
                              >
                                <div className="text-xs font-bold text-white group-hover:text-sky-200 leading-snug">{sub.label}</div>
                                {sub.desc && <div className="text-[10px] text-slate-300 font-normal leading-normal mt-0.5">{sub.desc}</div>}
                              </a>
                            );
                          }

                          return (
                            <Link
                              key={sub.label}
                              href={sub.href}
                              className="block py-2.5 px-3 rounded-lg text-xs font-semibold text-white hover:bg-slate-900/15 transition-all border-b border-white/10 last:border-0 group"
                            >
                              <div className="text-xs font-bold text-white group-hover:text-sky-200 leading-snug">{sub.label}</div>
                              {sub.desc && <div className="text-[10px] text-slate-300 font-normal leading-normal mt-0.5">{sub.desc}</div>}
                            </Link>
                          );
                        })}
                      </div>
                    </div>

                  </div>
                </div>
              )}
            </div>



            {/* Other Menus */}
            {otherMenus.map((menu) => (
              <div
                key={menu.label}
                className="relative"
                onMouseEnter={() => setActiveDropdown(menu.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {menu.items ? (
                  <button
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold tracking-wider transition-all duration-200 ${
                      menu.items.some((item) => isCurrentUrl(item.href))
                        ? 'text-sky-400 bg-sky-500/10 border border-sky-500/30'
                        : 'text-slate-200 hover:text-sky-300 hover:bg-slate-900/5'
                    }`}
                  >
                    <span>{menu.label}</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === menu.label ? 'rotate-180 text-sky-400' : 'text-slate-400'}`} />
                  </button>
                ) : (
                  <Link
                    href={(menu as any).href}
                    className={`px-3 py-2 rounded-lg text-xs font-bold tracking-wider transition-all duration-200 ${
                      isCurrentUrl((menu as any).href)
                        ? 'text-sky-400 bg-sky-500/10 border border-sky-500/30'
                        : 'text-slate-200 hover:text-sky-300 hover:bg-slate-900/5'
                    }`}
                  >
                    {menu.label}
                  </Link>
                )}

                {/* Dropdown Menu */}
                {menu.items && activeDropdown === menu.label && (
                  <div className="absolute top-full left-0 w-80 pt-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="bg-[#004B80] border border-sky-500/30 rounded-2xl p-2.5 shadow-2xl shadow-slate-950/80 ring-1 ring-white/10">
                      <div className="grid gap-1">
                        {menu.items.map((sub) => {
                          const IconComp = sub.icon;
                          const active = isCurrentUrl(sub.href);
                          return sub.href.startsWith('http') ? (
                            <a
                              key={sub.label}
                              href={sub.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`flex items-start gap-3 p-2.5 rounded-xl transition-all duration-200 group ${
                                active ? 'bg-[#0070B0] border border-sky-400/30 text-white' : 'hover:bg-[#0070B0]/60 text-slate-200 hover:text-white'
                              }`}
                            >
                              <div className={`p-2 rounded-lg mt-0.5 transition-colors ${active ? 'bg-sky-500/20 text-sky-300' : 'bg-[#003B65] text-slate-300 group-hover:text-sky-300 group-hover:bg-[#003B65]/80'}`}>
                                <IconComp className="w-4 h-4" />
                              </div>
                              <div className="flex-1">
                                <div className="text-xs font-bold leading-tight group-hover:text-sky-200">{sub.label}</div>
                                <div className="text-[11px] text-sky-100/70 font-normal leading-normal mt-0.5 line-clamp-1 group-hover:text-sky-100/90">{sub.desc}</div>
                              </div>
                            </a>
                          ) : (
                            <Link
                              key={sub.label}
                              href={sub.href}
                              className={`flex items-start gap-3 p-2.5 rounded-xl transition-all duration-200 group ${
                                active ? 'bg-[#0070B0] border border-sky-400/30 text-white' : 'hover:bg-[#0070B0]/60 text-slate-200 hover:text-white'
                              }`}
                            >
                              <div className={`p-2 rounded-lg mt-0.5 transition-colors ${active ? 'bg-sky-500/20 text-sky-300' : 'bg-[#003B65] text-slate-300 group-hover:text-sky-300 group-hover:bg-[#003B65]/80'}`}>
                                <IconComp className="w-4 h-4" />
                              </div>
                              <div className="flex-1">
                                <div className="text-xs font-bold leading-tight group-hover:text-sky-200">{sub.label}</div>
                                <div className="text-[11px] text-sky-100/70 font-normal leading-normal mt-0.5 line-clamp-1 group-hover:text-sky-100/90">{sub.desc}</div>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Quick CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/contact"
              className="relative inline-flex items-center justify-center px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-400 hover:to-sky-500 rounded-xl shadow-lg shadow-sky-500/25 transition-all duration-200 transform hover:-translate-y-0.5"
            >
              <PhoneCall className="w-3.5 h-3.5 mr-1.5" />
              <span>Hubungi Kami</span>
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-xl bg-slate-900 text-slate-200 hover:text-white hover:bg-slate-700 transition-colors focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileOpen ? <X className="w-6 h-6 text-sky-400" /> : <Menu className="w-6 h-6 text-sky-400" />}
            </button>
          </div>
        </div>
      </div>
    </header>

    {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[65px] bottom-0 bg-slate-950/95 backdrop-blur-2xl z-50 overflow-y-auto border-t border-white/10 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="px-4 py-6 space-y-4 max-w-lg mx-auto">
            
            {/* Mobile Profile Sections */}
            <div className="border-b border-slate-200/80 pb-3">
              <div className="text-xs font-extrabold text-sky-400 tracking-wider uppercase mb-2 px-2 flex items-center gap-2">
                <Zap className="w-3.5 h-3.5 text-emerald-400" />
                <span>PROFILE</span>
              </div>
              {profileCategories.map((group) => (
                <div key={group.id} className="mb-3 pl-2">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{group.label}</div>
                  <div className="grid gap-1 pl-2">
                    {group.items.map((sub) => {
                      const isExternal = sub.href.startsWith('http');
                      
                      if (isExternal) {
                        return (
                          <a
                            key={sub.label}
                            href={sub.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setMobileOpen(false)}
                            className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:bg-slate-900 hover:text-white"
                          >
                            <span>{sub.label}</span>
                            <span className="text-[10px] text-slate-400">→</span>
                          </a>
                        );
                      }

                      return (
                        <Link
                          key={sub.label}
                          href={sub.href}
                          onClick={() => setMobileOpen(false)}
                          className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold ${
                            isCurrentUrl(sub.href)
                              ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                              : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                          }`}
                        >
                          <span>{sub.label}</span>
                          <span className="text-[10px] text-slate-400">→</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>


            {/* Mobile Other Menus */}
            {otherMenus.map((menu) => (
              <div key={menu.label} className="border-b border-slate-200/80 pb-3 last:border-0 last:pb-0">
                {menu.items ? (
                  <div className="mb-3 pl-2">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{menu.label}</div>
                    <div className="grid gap-1 pl-2">
                      {menu.items.map((sub) => {
                        const linkContent = (
                          <>
                            <div className="flex items-center gap-2">
                              {sub.icon && <sub.icon className="w-3.5 h-3.5" />}
                              <span>{sub.label}</span>
                            </div>
                            <span className="text-[10px] text-slate-400">→</span>
                          </>
                        );
                        
                        return sub.href.startsWith('http') ? (
                          <a
                            key={sub.label}
                            href={sub.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setMobileOpen(false)}
                            className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold ${
                              isCurrentUrl(sub.href)
                                ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                                : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                            }`}
                          >
                            {linkContent}
                          </a>
                        ) : (
                          <Link
                            key={sub.label}
                            href={sub.href}
                            onClick={() => setMobileOpen(false)}
                            className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold ${
                              isCurrentUrl(sub.href)
                                ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                                : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                            }`}
                          >
                            {linkContent}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <Link
                    href={(menu as any).href}
                    onClick={() => setMobileOpen(false)}
                    className={`block px-3 py-2.5 rounded-xl text-xs font-bold tracking-wider ${
                      isCurrentUrl((menu as any).href)
                        ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                        : 'text-slate-200 hover:bg-slate-900'
                    }`}
                  >
                    {menu.label}
                  </Link>
                )}
              </div>
            ))}

            <div className="pt-2">
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-sky-500/20"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Hubungi UBP Barru</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
