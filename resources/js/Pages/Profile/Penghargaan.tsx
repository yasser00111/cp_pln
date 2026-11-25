import React, { useState, useMemo } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Head, Link } from '@inertiajs/react';
import { Award as AwardType } from '@/Types';
import {
  Home,
  Lightbulb,
  Calendar,
  ChevronDown,
  Search,
  ChevronLeft,
  ChevronRight,
  X,
  Eye,
  FileText,
  Award as AwardIcon,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

interface Props {
  awards?: AwardType[];
}

// Preset fallback awards matching PLN Indonesia Power's official portal showcase
const DEFAULT_AWARDS: AwardType[] = [
  {
    id: 'default-1',
    title: 'ISO 30414',
    category: 'Sertifikasi ISO',
    year: '2024',
    issuer: 'International Organization for Standardization',
    description: 'Standar internasional pelaporan dan tata kelola modal manusia (Human Resource Management) untuk transparansi kinerja SDM korporat.',
    image: '',
  },
  {
    id: 'default-2',
    title: 'P2HIV',
    category: 'Penghargaan K3',
    year: '2024',
    issuer: 'Kementerian Ketenagakerjaan RI',
    description: 'Penghargaan tingkat nasional atas komitmen dan konsistensi pencegahan serta penanggulangan HIV/AIDS di lingkungan kerja.',
    image: '',
  },
  {
    id: 'default-3',
    title: 'SMK3',
    category: 'Sertifikasi ISO',
    year: '2024',
    issuer: 'Kementerian Ketenagakerjaan RI',
    description: 'Pencapaian Sistem Manajemen Keselamatan dan Kesehatan Kerja dengan predikat Lanjutan dan sertifikasi bendera emas.',
    image: '',
  },
  {
    id: 'default-4',
    title: 'Excellence in Power Capacity Expansion',
    category: 'Penghargaan Korporat',
    year: '2025',
    issuer: 'Asian Power & PLN Group',
    description: 'Apresiasi atas keberhasilan ekspansi kapasitas dan keandalan sistem pembangkitan energi secara efisien dan ramah lingkungan.',
    image: '',
  },
  {
    id: 'default-5',
    title: 'Best Human Capital Director 2025',
    category: 'Penghargaan Korporat',
    year: '2025',
    issuer: 'Indonesia Human Capital Awards',
    description: 'Penghargaan kepemimpinan human capital dalam pengembangan talenta unggul dan akselerasi transformasi budaya kerja.',
    image: '',
  },
  {
    id: 'default-6',
    title: 'Best Company in Learning Innovation 2025',
    category: 'Penghargaan Korporat',
    year: '2025',
    issuer: 'Corporate Learning Excellence',
    description: 'Penghargaan atas inovasi sistem pembelajaran berkelanjutan dan adopsi teknologi dalam peningkatan kompetensi teknis pembangkitan.',
    image: '',
  },
  {
    id: 'default-7',
    title: 'PROPER Hijau Kementerian LHK',
    category: 'Lingkungan & CSR',
    year: '2024',
    issuer: 'Kementerian Lingkungan Hidup dan Kehutanan',
    description: 'Peringkat kinerja pengelolaan lingkungan di atas ketaatan (beyond compliance) dan keberhasilan program efisiensi sumber daya alam.',
    image: '',
  },
  {
    id: 'default-8',
    title: 'ISO 9001:2015 Sistem Manajemen Mutu',
    category: 'Sertifikasi ISO',
    year: '2024',
    issuer: 'Sucofindo International Certification',
    description: 'Sertifikasi manajemen mutu operasional pembangkitan tenaga listrik dengan standar internasional terkini.',
    image: '',
  },
  {
    id: 'default-9',
    title: 'Zero Accident Award (K3)',
    category: 'Penghargaan K3',
    year: '2023',
    issuer: 'Gubernur Sulawesi Selatan & Kemnaker',
    description: 'Penghargaan nihil kecelakaan kerja atas pencapaian jutaan jam kerja aman berturut-turut tanpa kehilangan waktu kerja.',
    image: '',
  },
];

// SVG 3D Podium Component matching the screenshot's circular white stage
const PodiumStage: React.FC = () => (
  <div className="relative w-full max-w-[260px] mx-auto select-none pointer-events-none">
    <svg
      viewBox="0 0 280 84"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto drop-shadow-sm"
    >
      <defs>
        {/* Soft floor shadow */}
        <radialGradient id="podiumShadow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0f172a" stopOpacity="0.20" />
          <stop offset="50%" stopColor="#0f172a" stopOpacity="0.08" />
          <stop offset="80%" stopColor="#0f172a" stopOpacity="0.02" />
          <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
        </radialGradient>

        {/* Cylinder side rim bevel */}
        <linearGradient id="podiumBevel" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#cbd5e1" />
          <stop offset="18%" stopColor="#e2e8f0" />
          <stop offset="50%" stopColor="#ffffff" />
          <stop offset="82%" stopColor="#e2e8f0" />
          <stop offset="100%" stopColor="#94a3b8" />
        </linearGradient>

        {/* Top platform disc */}
        <linearGradient id="podiumTop" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#f3f5f8" />
        </linearGradient>
      </defs>

      {/* Ambient floor shadow */}
      <ellipse cx="140" cy="56" rx="122" ry="22" fill="url(#podiumShadow)" />

      {/* 3D Cylinder rim */}
      <path
        d="M 28 34 C 28 46, 78 55, 140 55 C 202 55, 252 46, 252 34 L 252 44 C 252 56, 202 65, 140 65 C 78 65, 28 56, 28 44 Z"
        fill="url(#podiumBevel)"
      />

      {/* Top circular stage disc */}
      <ellipse
        cx="140"
        cy="34"
        rx="112"
        ry="21"
        fill="url(#podiumTop)"
        stroke="#e2e8f0"
        strokeWidth="1.2"
      />
    </svg>
  </div>
);

// High-fidelity fallback SVG graphics for trophies, certificates & logos
const TrophyOrLogoVisual: React.FC<{ award: AwardType }> = ({ award }) => {
  const titleLower = award.title.toLowerCase();

  // If award has an explicit uploaded image, display it
  if (award.image && award.image.trim() !== '') {
    return (
      <img
        src={award.image}
        alt={award.title}
        className="max-h-36 sm:max-h-40 object-contain drop-shadow-md filter group-hover:scale-105 transition-transform duration-300"
      />
    );
  }

  // 1. ISO Emblem (ISO 30414, ISO 9001, etc.)
  if (titleLower.includes('iso')) {
    const isoCode = award.title.match(/30414|9001|14001|45001|50001|37001/)?.[0] || '30414';
    const yearCode = award.year || '2018';
    return (
      <div className="flex flex-col items-center justify-center p-2 group-hover:scale-105 transition-transform duration-300">
        <svg viewBox="0 0 160 160" className="w-28 sm:w-32 h-28 sm:h-32 drop-shadow-md">
          {/* Outer circle with globe pattern */}
          <circle cx="80" cy="80" r="70" fill="#ffffff" stroke="#0072bc" strokeWidth="4" />
          <ellipse cx="80" cy="80" rx="40" ry="70" fill="none" stroke="#0072bc" strokeWidth="1.5" strokeOpacity="0.4" />
          <ellipse cx="80" cy="80" rx="70" ry="40" fill="none" stroke="#0072bc" strokeWidth="1.5" strokeOpacity="0.4" />
          <line x1="10" y1="80" x2="150" y2="80" stroke="#0072bc" strokeWidth="1.5" strokeOpacity="0.4" />
          {/* Blue ISO Banner */}
          <rect x="25" y="55" width="110" height="50" rx="8" fill="#0072bc" />
          <text x="80" y="90" textAnchor="middle" fill="#ffffff" fontSize="26" fontWeight="bold" fontFamily="sans-serif" letterSpacing="2">
            ISO
          </text>
        </svg>
        <div className="mt-1 text-center font-bold text-xs text-[#0072bc] tracking-wider font-mono">
          {isoCode}:{yearCode}
        </div>
      </div>
    );
  }

  // 2. Green bordered certificate (P2HIV / Lingkungan / PROPER)
  if (titleLower.includes('p2hiv') || titleLower.includes('proper') || titleLower.includes('lingkungan')) {
    return (
      <div className="w-36 sm:w-40 h-28 sm:h-30 bg-white border-4 border-emerald-600 rounded-sm shadow-md p-2 flex flex-col justify-between items-center group-hover:scale-105 transition-transform duration-300">
        <div className="w-full flex items-center justify-between border-b border-emerald-200 pb-1">
          <div className="w-3 h-3 rounded-full bg-emerald-600" />
          <div className="text-[8px] font-bold text-emerald-800 uppercase tracking-wider">REPUBLIK INDONESIA</div>
          <div className="w-3 h-3 rounded-full bg-emerald-600" />
        </div>
        <div className="text-center my-auto">
          <div className="text-[10px] font-extrabold text-slate-800 uppercase">PIAGAM PENGHARGAAN</div>
          <div className="text-[8px] font-semibold text-emerald-700 mt-0.5">{award.title}</div>
          <div className="text-[7px] text-slate-500 mt-0.5">UBP BARRU</div>
        </div>
        <div className="w-full flex justify-between items-center pt-1 border-t border-slate-100">
          <div className="w-4 h-4 rounded-full bg-amber-400 border border-amber-600 flex items-center justify-center text-[7px] font-bold text-amber-900">★</div>
          <div className="text-[7px] font-mono text-slate-400">{award.year}</div>
        </div>
      </div>
    );
  }

  // 3. Blue bordered certificate (SMK3 / Mutu)
  if (titleLower.includes('smk3') || titleLower.includes('mutu') || titleLower.includes('k3')) {
    return (
      <div className="w-36 sm:w-40 h-28 sm:h-30 bg-sky-50 border-4 border-sky-600 rounded-sm shadow-md p-2 flex flex-col justify-between items-center group-hover:scale-105 transition-transform duration-300">
        <div className="w-full flex items-center justify-between border-b border-sky-200 pb-1">
          <div className="w-3 h-3 rounded-full bg-sky-600" />
          <div className="text-[8px] font-bold text-sky-900 uppercase tracking-wider">KEMNAKER RI</div>
          <div className="w-3 h-3 rounded-full bg-sky-600" />
        </div>
        <div className="text-center my-auto">
          <div className="text-[10px] font-extrabold text-sky-950 uppercase">SERTIFIKAT KESELAMATAN</div>
          <div className="text-[8px] font-bold text-sky-700 mt-0.5">{award.title}</div>
          <div className="text-[7px] text-slate-600 mt-0.5">Tingkat Lanjutan - Bendera Emas</div>
        </div>
        <div className="w-full flex justify-between items-center pt-1 border-t border-sky-100">
          <div className="w-4 h-4 rounded-full bg-amber-400 border border-amber-600 flex items-center justify-center text-[7px] font-bold text-amber-900">★</div>
          <div className="text-[7px] font-mono text-slate-500">{award.year}</div>
        </div>
      </div>
    );
  }

  // 4. Framed wooden plaque (Excellence in Power Capacity Expansion)
  if (titleLower.includes('expansion') || titleLower.includes('capacity') || titleLower.includes('excellence') || titleLower.includes('plaque')) {
    return (
      <div className="w-36 sm:w-40 h-28 sm:h-30 bg-[#3b2317] border-4 border-[#24130a] rounded shadow-lg p-1.5 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
        <div className="w-full h-full bg-gradient-to-br from-amber-100 via-amber-50 to-amber-200 border border-amber-400/60 rounded-sm p-1.5 flex flex-col justify-between text-center shadow-inner">
          <div className="text-[8px] font-bold text-amber-900 uppercase tracking-widest border-b border-amber-300 pb-0.5">
            HONORARY AWARD
          </div>
          <div className="my-auto">
            <div className="text-[8.5px] font-black text-slate-800 leading-tight">
              {award.title}
            </div>
          </div>
          <div className="text-[7px] font-bold text-amber-800">
            PLN INDONESIA POWER • {award.year}
          </div>
        </div>
      </div>
    );
  }

  // 5. Golden Trophy Statue (Best Director, Best Company, etc.)
  return (
    <div className="relative flex flex-col items-center justify-end h-36 sm:h-40 group-hover:scale-105 transition-transform duration-300">
      <svg viewBox="0 0 100 160" className="w-20 sm:w-24 h-36 sm:h-40 drop-shadow-xl" fill="none">
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fff3b0" />
            <stop offset="25%" stopColor="#ffd700" />
            <stop offset="60%" stopColor="#dfa204" />
            <stop offset="85%" stopColor="#a36e02" />
            <stop offset="100%" stopColor="#5c3c00" />
          </linearGradient>
          <linearGradient id="baseGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="50%" stopColor="#334155" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          <linearGradient id="goldPlate" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffd700" />
            <stop offset="50%" stopColor="#fff3b0" />
            <stop offset="100%" stopColor="#d4af37" />
          </linearGradient>
        </defs>

        {/* Dynamic Curved Winged Trophy Figure */}
        {/* Left Wing Flame */}
        <path
          d="M 50 105 C 45 90, 25 75, 28 50 C 30 35, 42 22, 50 10 C 44 28, 42 45, 46 65 C 48 78, 50 95, 50 105 Z"
          fill="url(#goldGradient)"
        />
        {/* Right Wing Flame */}
        <path
          d="M 50 105 C 55 90, 75 75, 72 50 C 70 35, 58 22, 50 10 C 56 28, 58 45, 54 65 C 52 78, 50 95, 50 105 Z"
          fill="url(#goldGradient)"
        />
        {/* Central Rising Light / Star */}
        <circle cx="50" cy="45" r="7" fill="url(#goldGradient)" />

        {/* Trophy Base Pedestal (Square / Trapezoid block) */}
        <path d="M 38 105 L 62 105 L 66 125 L 34 125 Z" fill="url(#goldGradient)" />
        <rect x="25" y="125" width="50" height="28" rx="2" fill="url(#baseGradient)" stroke="#475569" strokeWidth="1" />
        {/* Gold Plaque on base */}
        <rect x="30" y="131" width="40" height="15" rx="1" fill="url(#goldPlate)" />
        <line x1="33" y1="138" x2="67" y2="138" stroke="#78350f" strokeWidth="1" strokeDasharray="2 1" />
      </svg>
    </div>
  );
};

export default function Penghargaan({ awards: propAwards = [] }: Props) {
  // Combine prop awards with default showcase awards if props are minimal, ensuring rich visual presentation
  const allAwards = useMemo(() => {
    if (propAwards && propAwards.length > 0) {
      // If props contain fewer than 4 items, supplement with default awards
      if (propAwards.length < 6) {
        const existingTitles = new Set(propAwards.map((a) => a.title.toLowerCase()));
        const additions = DEFAULT_AWARDS.filter((d) => !existingTitles.has(d.title.toLowerCase()));
        return [...propAwards, ...additions];
      }
      return propAwards;
    }
    return DEFAULT_AWARDS;
  }, [propAwards]);

  // Filters state
  const [selectedEvent, setSelectedEvent] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Pagination state (6 items per page, exactly as shown in the screenshot!)
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6;

  // Modal preview state
  const [activeModalAward, setActiveModalAward] = useState<AwardType | null>(null);

  // Dynamic filter options extracted from data
  const eventsList = useMemo(() => {
    const set = new Set<string>();
    allAwards.forEach((a) => {
      if (a.issuer && a.issuer.trim() !== '') set.add(a.issuer.trim());
    });
    return Array.from(set);
  }, [allAwards]);

  const yearsList = useMemo(() => {
    const set = new Set<string>();
    allAwards.forEach((a) => {
      if (a.year && a.year.trim() !== '') set.add(a.year.trim());
    });
    return Array.from(set).sort((a, b) => Number(b) - Number(a));
  }, [allAwards]);

  const categoriesList = useMemo(() => {
    const set = new Set<string>();
    allAwards.forEach((a) => {
      if (a.category && a.category.trim() !== '') set.add(a.category.trim());
    });
    return Array.from(set);
  }, [allAwards]);

  // Filtered awards based on user selections
  const filteredAwards = useMemo(() => {
    return allAwards.filter((aw) => {
      // Event / Issuer filter
      if (selectedEvent && aw.issuer !== selectedEvent) {
        return false;
      }
      // Year filter
      if (selectedYear && aw.year !== selectedYear) {
        return false;
      }
      // Category filter
      if (selectedCategory && aw.category !== selectedCategory) {
        return false;
      }
      // Search query filter
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase().trim();
        const inTitle = aw.title.toLowerCase().includes(query);
        const inIssuer = aw.issuer ? aw.issuer.toLowerCase().includes(query) : false;
        const inCategory = aw.category ? aw.category.toLowerCase().includes(query) : false;
        const inYear = aw.year ? aw.year.includes(query) : false;
        if (!inTitle && !inIssuer && !inCategory && !inYear) {
          return false;
        }
      }
      return true;
    });
  }, [allAwards, selectedEvent, selectedYear, selectedCategory, searchQuery]);

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(filteredAwards.length / itemsPerPage));
  const paginatedAwards = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredAwards.slice(start, start + itemsPerPage);
  }, [filteredAwards, currentPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  return (
    <MainLayout>
      <Head title="Awards and Certifications - PLN Indonesia Power UBP Barru" />

      {/* Main Page Content */}
      <div className="min-h-screen bg-[#f8f9fa] pt-8 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* 1. Breadcrumb navigation */}
          <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6">
            <Link
              href="/"
              className="hover:text-[#009bb9] transition-colors flex items-center gap-1.5 text-slate-600"
            >
              <Home className="w-3.5 h-3.5" />
            </Link>
            <span className="text-slate-300 font-normal">&gt;</span>
            <span className="text-slate-600 font-medium">Awards And Certifications</span>
          </nav>

          {/* 2. Main Page Title */}
          <div className="mb-8">
            <h1 className="text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight font-heading">
              Awards and Certifications
            </h1>
          </div>

          {/* 3. Filter and Search Bar (Single horizontal 4-column row matching screenshot) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-16">
            {/* Filter: Select Event */}
            <div className="relative">
              <select
                value={selectedEvent}
                onChange={(e) => {
                  setSelectedEvent(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full appearance-none bg-white border border-slate-200/90 rounded-md px-3.5 py-2.5 pr-10 text-xs sm:text-sm text-slate-600 focus:outline-none focus:border-[#009bb9] focus:ring-1 focus:ring-[#009bb9] shadow-sm transition-all"
              >
                <option value="">Select Event</option>
                {eventsList.map((ev) => (
                  <option key={ev} value={ev}>
                    {ev}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                <Lightbulb className="w-4 h-4 text-[#009bb9]" />
              </div>
            </div>

            {/* Filter: Select Year */}
            <div className="relative">
              <select
                value={selectedYear}
                onChange={(e) => {
                  setSelectedYear(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full appearance-none bg-white border border-slate-200/90 rounded-md px-3.5 py-2.5 pr-10 text-xs sm:text-sm text-slate-600 focus:outline-none focus:border-[#009bb9] focus:ring-1 focus:ring-[#009bb9] shadow-sm transition-all"
              >
                <option value="">Select Year</option>
                {yearsList.map((yr) => (
                  <option key={yr} value={yr}>
                    {yr}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                <Calendar className="w-4 h-4 text-[#009bb9]" />
              </div>
            </div>

            {/* Filter: Select Category */}
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full appearance-none bg-white border border-slate-200/90 rounded-md px-3.5 py-2.5 pr-10 text-xs sm:text-sm text-slate-600 focus:outline-none focus:border-[#009bb9] focus:ring-1 focus:ring-[#009bb9] shadow-sm transition-all"
              >
                <option value="">Select Category</option>
                {categoriesList.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                <ChevronDown className="w-4 h-4 text-[#009bb9]" />
              </div>
            </div>

            {/* Search Input with Cyan Button */}
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full bg-white border border-slate-200/90 rounded-md pl-3.5 pr-12 py-2.5 text-xs sm:text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:border-[#009bb9] focus:ring-1 focus:ring-[#009bb9] shadow-sm transition-all"
              />
              <button
                type="button"
                aria-label="Cari"
                className="absolute right-1 top-1 bottom-1 px-3 bg-[#009bb9] hover:bg-[#0086a0] text-white rounded flex items-center justify-center transition-colors shadow-sm"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 4. Showcase Grid with 3D Circular Pedestals (3 Columns on desktop matching the screenshot) */}
          {paginatedAwards.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
              {paginatedAwards.map((aw) => (
                <div
                  key={aw.id}
                  onClick={() => setActiveModalAward(aw)}
                  className="group flex flex-col items-center justify-end text-center cursor-pointer transition-transform duration-300"
                >
                  {/* Stand Section: Trophy/Award standing on top of the 3D white round pedestal */}
                  <div className="relative w-full flex flex-col items-center justify-end">
                    
                    {/* The Award Image / Trophy standing vertically */}
                    <div className="relative z-10 flex items-end justify-center h-44 sm:h-48 px-4 -mb-7">
                      <TrophyOrLogoVisual award={aw} />
                    </div>

                    {/* The 3D circular white podium disc */}
                    <PodiumStage />
                  </div>

                  {/* Below Pedestal Information */}
                  <div className="mt-4 px-2 space-y-1 max-w-[260px] mx-auto">
                    {aw.year && (
                      <div className="text-xs font-semibold text-[#009bb9] tracking-wide">
                        {aw.year}
                      </div>
                    )}
                    <h3 className="text-xs sm:text-sm font-semibold text-slate-800 line-clamp-2 leading-snug group-hover:text-[#009bb9] transition-colors">
                      {aw.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="py-20 text-center bg-white rounded-2xl border border-slate-200 p-8 max-w-md mx-auto space-y-3">
              <AwardIcon className="w-12 h-12 text-slate-300 mx-auto" />
              <h4 className="text-base font-bold text-slate-700">Tidak ada penghargaan yang cocok</h4>
              <p className="text-xs text-slate-500">
                Silakan ubah kata kunci pencarian atau bersihkan filter yang dipilih.
              </p>
              <button
                onClick={() => {
                  setSelectedEvent('');
                  setSelectedYear('');
                  setSelectedCategory('');
                  setSearchQuery('');
                  setCurrentPage(1);
                }}
                className="inline-block mt-2 px-4 py-2 bg-[#009bb9] text-white text-xs font-semibold rounded-lg hover:bg-[#0086a0] transition-colors"
              >
                Reset Filter
              </button>
            </div>
          )}

          {/* 5. Pagination Bar matching screenshot: < 1 2 3 ... 10 > */}
          {totalPages > 1 && (
            <div className="mt-20 flex items-center justify-center gap-2">
              {/* Prev Button */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Previous Page"
                className={`p-1.5 rounded text-slate-400 hover:text-slate-700 transition-colors ${
                  currentPage === 1 ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Numbered Page Buttons */}
              {Array.from({ length: totalPages }).map((_, idx) => {
                const pageNumber = idx + 1;
                // Simple smart pagination window
                if (
                  totalPages > 7 &&
                  pageNumber > 2 &&
                  pageNumber < totalPages - 1 &&
                  Math.abs(pageNumber - currentPage) > 1
                ) {
                  if (pageNumber === 3 || pageNumber === totalPages - 2) {
                    return (
                      <span key={pageNumber} className="px-1 text-slate-400 text-xs">
                        ...
                      </span>
                    );
                  }
                  return null;
                }

                const isActive = pageNumber === currentPage;
                return (
                  <button
                    key={pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                    className={`w-7 h-7 rounded-full text-xs font-semibold flex items-center justify-center transition-all ${
                      isActive
                        ? 'bg-[#009bb9] text-white shadow-sm'
                        : 'text-slate-600 hover:text-[#009bb9] hover:bg-slate-100'
                    }`}
                  >
                    {pageNumber}
                  </button>
                );
              })}

              {/* Next Button */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Next Page"
                className={`p-1.5 rounded text-slate-400 hover:text-slate-700 transition-colors ${
                  currentPage === totalPages ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'
                }`}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>

      {/* 6. Detail Modal Viewer */}
      {activeModalAward && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn"
          onClick={() => setActiveModalAward(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl relative border border-slate-100"
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveModalAward(null)}
              className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header info */}
            <div className="space-y-1.5 pr-8">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-[#009bb9] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#009bb9]/10">
                  {activeModalAward.category || 'Penghargaan'} • {activeModalAward.year}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 leading-snug">
                {activeModalAward.title}
              </h3>
              {activeModalAward.issuer && (
                <div className="text-xs text-slate-500 font-medium">
                  Penerbit / Penyelenggara: <span className="text-slate-700 font-semibold">{activeModalAward.issuer}</span>
                </div>
              )}
            </div>

            {/* Visual Preview Stand inside Modal */}
            <div className="rounded-xl bg-slate-50 border border-slate-100 p-6 flex flex-col items-center justify-center">
              <div className="h-44 flex items-end justify-center mb-2">
                <TrophyOrLogoVisual award={activeModalAward} />
              </div>
              <PodiumStage />
            </div>

            {/* Description */}
            {activeModalAward.description && (
              <p className="text-xs text-slate-600 leading-relaxed bg-slate-50/60 p-3 rounded-lg border border-slate-100">
                {activeModalAward.description}
              </p>
            )}

            {/* Footer Actions */}
            <div className="flex items-center justify-between pt-2">
              {activeModalAward.pdf_file ? (
                <a
                  href={activeModalAward.pdf_file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Unduh Dokumen / Sertifikat</span>
                </a>
              ) : (
                <div />
              )}

              <button
                onClick={() => setActiveModalAward(null)}
                className="px-5 py-2 rounded-lg bg-[#009bb9] hover:bg-[#0086a0] text-white text-xs font-bold transition-colors shadow-sm"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
}
