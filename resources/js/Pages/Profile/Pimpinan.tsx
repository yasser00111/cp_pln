import React, { useState, useEffect, useMemo } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Head, usePage } from '@inertiajs/react';
import { Management } from '@/Types';
import {
  Users,
  ShieldCheck,
  Maximize2,
  X,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  CheckCircle2,
  ArrowUpRight,
  GraduationCap,
  Briefcase,
  Calendar,
  Sparkles
} from 'lucide-react';

interface LeaderItem {
  id: number;
  name: string;
  position: string;
  birthInfo?: string;
  photo: string;
  education?: string[];
  careerJourney?: string[];
  zone: { left: string; width: string };
  arrowPos: { left: string; top: string };
}

interface Props {
  leaders: Management[];
}

const defaultCommissioners: LeaderItem[] = [
  {
    id: 1,
    name: 'Mohamad Dawam',
    position: 'Independent Commissioner',
    birthInfo: 'Kendal, 14 Oktober 1974',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    education: [
      'Magister Ilmu Administrasi Universitas Indonesia',
      'Sarjana Hukum Universitas Diponegoro'
    ],
    careerJourney: [
      'Anggota Komisi Kepolisian Nasional (Kompolnas) RI',
      'Dosen Tetap Fakultas Ilmu Sosial dan Ilmu Politik',
      'Independent Commissioner PT PLN Indonesia Power'
    ],
    zone: { left: '0%', width: '18%' },
    arrowPos: { left: '13%', top: '72%' }
  },
  {
    id: 2,
    name: 'Arrmanatha Christiawan Nasir',
    position: 'Commissioner',
    birthInfo: 'Bangkok, 30 Desember 1971',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    education: [
      'Master of Business Administration University of Leicester',
      'Bachelor of Science University of Buckingham'
    ],
    careerJourney: [
      'Wakil Menteri Luar Negeri Republik Indonesia',
      'Duta Besar Luar Biasa dan Berkuasa Penuh RI untuk PBB di New York',
      'Duta Besar Luar Biasa dan Berkuasa Penuh RI untuk Prancis, Monako & UNESCO',
      'Commissioner PT PLN Indonesia Power'
    ],
    zone: { left: '18%', width: '16%' },
    arrowPos: { left: '26%', top: '76%' }
  },
  {
    id: 3,
    name: 'Bin Nahadi',
    position: 'Commissioner',
    birthInfo: 'Jakarta, 15 Juli 1965',
    photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80',
    education: [
      'Magister Manajemen Universitas Indonesia',
      'Sarjana Akuntansi Universitas Indonesia'
    ],
    careerJourney: [
      'Direktur Pengawasan Lembaga Pemerintah BPKP',
      'Anggota Komite Audit Berbagai BUMN Terkemuka',
      'Commissioner PT PLN Indonesia Power'
    ],
    zone: { left: '34%', width: '16%' },
    arrowPos: { left: '42%', top: '74%' }
  },
  {
    id: 4,
    name: 'Arief Budiman',
    position: 'President Commissioner and Independent Commissioner',
    birthInfo: '-',
    photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
    education: [
      'Magister Manajemen Universitas Gadjah Mada',
      'Sarjana Sastra Inggris Universitas 17 Agustus 1945 dan Sarjana Hubungan Internasional Universitas Airlangga'
    ],
    careerJourney: [
      'Direktur Keuangan PT Pertamina (Persero)',
      'Direktur Utama PT Danareksa (Persero)',
      'President Commissioner and Independent Commissioner PT PLN Indonesia Power'
    ],
    zone: { left: '49%', width: '19%' },
    arrowPos: { left: '58%', top: '66%' }
  },
  {
    id: 5,
    name: 'Muhammad Ali',
    position: 'Commissioner',
    birthInfo: 'Palembang, 22 April 1973',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80',
    education: [
      'Magister Manajemen Bisnis & Keuangan',
      'Sarjana Ekonomi Universitas Sriwijaya'
    ],
    careerJourney: [
      'Tenaga Ahli Utama Kantor Staf Presiden (KSP) RI',
      'Senior Advisor Tata Kelola Korporat & Keberlanjutan',
      'Commissioner PT PLN Indonesia Power'
    ],
    zone: { left: '67%', width: '16%' },
    arrowPos: { left: '75%', top: '74%' }
  },
  {
    id: 6,
    name: 'Lukman Hakim',
    position: 'Commissioner',
    birthInfo: 'Surakarta, 8 Agustus 1976',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    education: [
      'Magister Kebijakan Publik Universitas Indonesia',
      'Sarjana Teknik Universitas Gadjah Mada'
    ],
    careerJourney: [
      'Staf Khusus Kementerian BUMN RI',
      'Komisaris PT PJB / PLN Nusantara Power',
      'Commissioner PT PLN Indonesia Power'
    ],
    zone: { left: '83%', width: '17%' },
    arrowPos: { left: '89%', top: '76%' }
  },
  {
    id: 7,
    name: 'Bambang Anggoro',
    position: 'Commissioner',
    birthInfo: 'Jakarta, 12 September 1978',
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80',
    education: [
      'Magister Manajemen Bisnis & Energi Universitas Indonesia',
      'Sarjana Teknik Elektro Institut Teknologi Bandung'
    ],
    careerJourney: [
      'Tenaga Ahli Madya Bidang Energi & Kebijakan Publik',
      'Senior Advisor Transformasi Tata Kelola Korporat BUMN',
      'Commissioner PT PLN Indonesia Power'
    ],
    zone: { left: '86%', width: '14%' },
    arrowPos: { left: '92%', top: '76%' }
  }
];

const defaultDirectors: LeaderItem[] = [
  {
    id: 1,
    name: 'Bernadus Sudarmanta',
    position: 'Direktur Utama (President Director)',
    birthInfo: 'Semarang, 1968',
    photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
    education: [
      'Magister Manajemen Strategik',
      'Sarjana Teknik Mesin Universitas Diponegoro'
    ],
    careerJourney: [
      'Direktur Operasi Pembangkit Batu Bara PT PLN Indonesia Power',
      'General Manager Berbagai Unit Pembangkitan PLN',
      'Direktur Utama PT PLN Indonesia Power'
    ],
    zone: { left: '44%', width: '22%' },
    arrowPos: { left: '55%', top: '64%' }
  },
  {
    id: 2,
    name: 'Endang Astharanti',
    position: 'Direktur Keuangan dan Manajemen Risiko',
    birthInfo: 'Yogyakarta, 1972',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    education: [
      'Master of Applied Finance Macquarie University',
      'Sarjana Akuntansi Universitas Gadjah Mada'
    ],
    careerJourney: [
      'Kepala Divisi Perbendaharaan PT PLN (Persero)',
      'Direktur Keuangan dan Manajemen Risiko PT PLN Indonesia Power'
    ],
    zone: { left: '24%', width: '20%' },
    arrowPos: { left: '34%', top: '68%' }
  },
  {
    id: 3,
    name: 'Julita Indah',
    position: 'Direktur Pengembangan Bisnis dan Niaga',
    birthInfo: 'Jakarta, 1974',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
    education: [
      'Magister Manajemen Universitas Indonesia',
      'Sarjana Teknik Elektro Institut Teknologi Bandung'
    ],
    careerJourney: [
      'Vice President Transisi Energi & EBT PT PLN (Persero)',
      'Direktur Pengembangan Bisnis dan Niaga PT PLN Indonesia Power'
    ],
    zone: { left: '66%', width: '20%' },
    arrowPos: { left: '76%', top: '68%' }
  },
  {
    id: 4,
    name: 'Ridho Hutomo',
    position: 'Direktur Manajemen Human Capital & Administrasi',
    birthInfo: 'Bandung, 1973',
    photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80',
    education: [
      'Magister Manajemen Sumber Daya Manusia',
      'Sarjana Psikologi Universitas Padjadjaran'
    ],
    careerJourney: [
      'Kepala Divisi Talenta & Budaya PT PLN (Persero)',
      'Direktur Manajemen Human Capital & Administrasi PT PLN Indonesia Power'
    ],
    zone: { left: '2%', width: '22%' },
    arrowPos: { left: '14%', top: '72%' }
  },
  {
    id: 5,
    name: 'Moch. Padang Dirgantara',
    position: 'Direktur Operasi Pembangkit Batu Bara',
    birthInfo: 'Surabaya, 1971',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    education: [
      'Magister Teknik Sistem Tenaga Institut Teknologi Sepuluh Nopember',
      'Sarjana Teknik Mesin ITS'
    ],
    careerJourney: [
      'Senior Manager Operasi & Keandalan Pembangkitan',
      'Direktur Operasi Pembangkit Batu Bara PT PLN Indonesia Power'
    ],
    zone: { left: '80%', width: '20%' },
    arrowPos: { left: '90%', top: '72%' }
  }
];

export default function Pimpinan({ leaders }: Props) {
  const { settings } = usePage<any>().props;

  // Tabs: 'commissioners' | 'directors'
  const [activeTab, setActiveTab] = useState<'commissioners' | 'directors'>('commissioners');

  // Modal Biodata State (Persis Screenshot 2)
  const [selectedPerson, setSelectedPerson] = useState<LeaderItem | null>(null);
  const [modalTab, setModalTab] = useState<'profile' | 'career'>('profile');

  // Hover state on lineup
  const [hoveredLeaderId, setHoveredLeaderId] = useState<number | null>(null);

  // Display View Mode: 'individual_lineup' (Otomatis dari 6 foto admin) | 'banner' (Foto lanskap bersama)
  const [viewMode, setViewMode] = useState<'individual_lineup' | 'banner'>('individual_lineup');

  // Full-image zoom modal state
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);

  // Fallback photos
  const commissionersPhoto =
    settings?.management_commissioners_photo || '/uploads/management/commissioners_lineup.png';
  const directorsPhoto =
    settings?.management_directors_photo || '/uploads/management/commissioners_lineup.png';

  const currentPhoto = activeTab === 'commissioners' ? commissionersPhoto : directorsPhoto;

  // Commissioners Data from Settings
  const commissionersList = useMemo<LeaderItem[]>(() => {
    const raw = settings?.management_commissioners_data;
    if (raw) {
      try {
        const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw;
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {
        // fallback
      }
    }
    return defaultCommissioners;
  }, [settings?.management_commissioners_data]);

  // Directors Data from Settings
  const directorsList = useMemo<LeaderItem[]>(() => {
    const raw = settings?.management_directors_data;
    if (raw) {
      try {
        const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw;
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {
        // fallback
      }
    }
    return defaultDirectors;
  }, [settings?.management_directors_data]);

  const activeLeaderList = activeTab === 'commissioners' ? commissionersList : directorsList;

  // Keyboard shortcut ESC to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedPerson(null);
        setIsPhotoModalOpen(false);
        setZoomLevel(1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const openPersonModal = (person: LeaderItem) => {
    setSelectedPerson(person);
    setModalTab('profile');
  };

  return (
    <MainLayout>
      <Head title="Management & Jajaran Pimpinan - UBP Barru" />

      {/* Top Banner */}
      <section className="relative py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-600 text-xs font-bold uppercase tracking-wider">
            <Users className="w-4 h-4" />
            <span>LEADERSHIP & GOVERNANCE</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-heading tracking-tight">
            Management & Jajaran Pimpinan
          </h1>
          <p className="text-xs sm:text-sm text-slate-700 max-w-3xl leading-relaxed">
            Kepemimpinan profesional berintegritas yang berdedikasi mengawal keandalan sistem pembangkitan energi, keselamatan kerja K3L, serta prinsip tata kelola berkelanjutan di PT PLN Indonesia Power UBP Barru.
          </p>
        </div>
      </section>

      {/* Main Section */}
      <section className="py-16 bg-slate-50 space-y-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

          {/* 1. MANAGEMENT LANDSCAPE SHOWCASE DENGAN HOTSPOT INTERAKTIF */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-8">
            
            {/* Section Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading tracking-tight">
                  Management
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Arahkan kursor pada pimpinan untuk memperbesar, lalu klik tombol panah (↗) untuk melihat biodata lengkap.
                </p>
              </div>

              {/* Tabs: Board of Commissioners & Board of Directors + View Mode Switch */}
              <div className="flex flex-wrap items-center gap-4 text-sm font-bold">
                <div className="flex items-center gap-6 border-b border-slate-200">
                  <button
                    type="button"
                    onClick={() => setActiveTab('commissioners')}
                    className={`pb-2 border-b-2 transition-all cursor-pointer ${
                      activeTab === 'commissioners'
                        ? 'border-[#008ba3] text-[#008ba3] font-extrabold'
                        : 'border-transparent text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Board of Commissioners
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('directors')}
                    className={`pb-2 border-b-2 transition-all cursor-pointer ${
                      activeTab === 'directors'
                        ? 'border-[#008ba3] text-[#008ba3] font-extrabold'
                        : 'border-transparent text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Board of Directors
                  </button>
                </div>

                {/* View Mode Toggle: Foto 6 Orang vs Foto Bersama */}
                <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs">
                  <button
                    type="button"
                    onClick={() => setViewMode('individual_lineup')}
                    className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer font-semibold ${
                      viewMode === 'individual_lineup'
                        ? 'bg-white text-[#008ba3] shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                    title="Tampilkan langsung foto dari masing-masing 6 orang yang di-upload admin"
                  >
                    Foto Masing-Masing (6 Orang)
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('banner')}
                    className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer font-semibold ${
                      viewMode === 'banner'
                        ? 'bg-white text-[#008ba3] shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                    title="Tampilkan foto lanskap formasi satu kesatuan"
                  >
                    Foto Banner Bersama
                  </button>
                </div>
              </div>
            </div>

            {/* TAMPILAN 1: FORMASI DINAMIS DARI FOTO MASING-MASING 6 ORANG YANG DI-UPLOAD ADMIN */}
            {viewMode === 'individual_lineup' && (
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-100/90 border border-slate-200 shadow-md p-4 sm:p-8 select-none">
                {/* Stage Lighting & Subtle Glow */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-sky-100/40 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-slate-200/50 to-transparent pointer-events-none" />

                {/* Grid Figur Pimpinan Menggunakan Foto Upload Admin */}
                <div className="relative z-10 w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4 items-end max-w-7xl mx-auto min-h-[380px] sm:min-h-[440px]">
                  {activeLeaderList.map((leader, idx) => {
                    const isHovered = hoveredLeaderId === leader.id;
                    return (
                      <div
                        key={leader.id}
                        onMouseEnter={() => setHoveredLeaderId(leader.id)}
                        onMouseLeave={() => setHoveredLeaderId(null)}
                        onClick={() => openPersonModal(leader)}
                        className={`relative group cursor-pointer transition-all duration-300 flex flex-col items-center ${
                          isHovered ? 'z-30 -translate-y-3' : 'z-10 hover:z-20'
                        }`}
                      >
                        {/* Tooltip Tag di Atas Pimpinan Saat Kursor Mengarah */}
                        <div
                          className={`absolute -top-16 left-1/2 -translate-x-1/2 pointer-events-none transition-all duration-300 z-40 whitespace-nowrap ${
                            isHovered ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-95'
                          }`}
                        >
                          <div className="bg-[#00596b] text-white px-3 py-1.5 rounded-xl shadow-xl border border-[#007b94]/40 text-center">
                            <p className="text-[10px] text-sky-200 font-semibold">{leader.position}</p>
                            <p className="text-xs font-bold font-heading">{leader.name}</p>
                            <p className="text-[9px] text-sky-300 flex items-center justify-center gap-0.5 mt-0.5">
                              <span>Klik untuk buka biodata</span>
                              <ArrowUpRight className="w-2.5 h-2.5 text-cyan-300" />
                            </p>
                          </div>
                          <div className="w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-[#00596b] mx-auto" />
                        </div>

                        {/* Kartu Figur Portrait */}
                        <div
                          className={`relative w-full aspect-[3/4] sm:aspect-[10/14] rounded-2xl overflow-hidden bg-slate-100 border-2 transition-all duration-300 shadow-md ${
                            isHovered
                              ? 'border-[#008ba3] ring-4 ring-cyan-400/30 shadow-2xl scale-105'
                              : 'border-white group-hover:border-slate-300'
                          }`}
                        >
                          <img
                            src={leader.photo}
                            alt={leader.name}
                            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                          />

                          {/* Subtle Gradient Fade */}
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                          {/* Tombol Lingkaran Cyan dengan Panah Diagonal ↗ (Persis Screenshot 1) */}
                          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                openPersonModal(leader);
                              }}
                              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#00a2be] hover:bg-[#008ba3] text-white flex items-center justify-center shadow-lg border-2 border-white transition-all transform duration-300 ${
                                isHovered ? 'scale-115 ring-4 ring-cyan-400/40 bg-[#008ba3]' : 'scale-100 hover:scale-110'
                              }`}
                              title="Buka Biodata Lengkap"
                            >
                              <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
                            </button>
                          </div>
                        </div>

                        {/* Keterangan Nama & Jabatan di Bawah Figur */}
                        <div className="text-center pt-2.5 w-full px-1">
                          <h5 className="text-xs font-bold text-slate-900 group-hover:text-[#008ba3] transition-colors line-clamp-1">
                            {leader.name}
                          </h5>
                          <p className="text-[10px] text-slate-500 line-clamp-1">{leader.position}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Bottom Bar Keterangan */}
                <div className="mt-6 pt-3 border-t border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-500 gap-2">
                  <span className="flex items-center gap-1.5 font-medium text-slate-700">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    Foto di atas diambil langsung dari masing-masing foto pimpinan yang di-upload admin
                  </span>
                  <span className="text-[11px] text-slate-400 italic">
                    Sorot kursor ke foto atau klik tombol panah (↗) untuk melihat biodata lengkap
                  </span>
                </div>
              </div>
            )}

            {/* TAMPILAN 2: FOTO LANSKAP BANNER BERSAMA (DENGAN 6 HOTSPOT) */}
            {viewMode === 'banner' && (
              <div className="relative rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-md">
                <div className="relative w-full overflow-hidden select-none">
                  {/* Main Lineup Image */}
                  <img
                    src={currentPhoto}
                    alt={`Lineup ${activeTab === 'commissioners' ? 'Board of Commissioners' : 'Board of Directors'}`}
                    className="w-full h-auto max-h-[580px] object-contain mx-auto transition-transform duration-700 block"
                  />

                  {/* Interactive Hotspot Zones */}
                  {activeLeaderList.map((leader, idx) => {
                    const isHovered = hoveredLeaderId === leader.id;
                    const colWidth = 100 / Math.max(activeLeaderList.length, 1);
                    const zone = leader.zone || { left: `${idx * colWidth}%`, width: `${colWidth}%` };
                    const arrowPos = leader.arrowPos || { left: `${(idx + 0.5) * colWidth}%`, top: '70%' };

                    return (
                      <div
                        key={leader.id}
                        style={{ left: zone.left, width: zone.width }}
                        onMouseEnter={() => setHoveredLeaderId(leader.id)}
                        onMouseLeave={() => setHoveredLeaderId(null)}
                        onClick={() => openPersonModal(leader)}
                        className="absolute inset-y-0 cursor-pointer group z-10 transition-all"
                      >
                        <div
                          className={`absolute inset-0 bg-gradient-to-t from-sky-500/15 via-transparent to-transparent transition-opacity duration-300 pointer-events-none ${
                            isHovered ? 'opacity-100 ring-2 ring-sky-400/30' : 'opacity-0'
                          }`}
                        />

                        {/* Tooltip Card di Atas Pimpinan */}
                        <div
                          className={`absolute top-4 sm:top-8 left-1/2 -translate-x-1/2 pointer-events-none transition-all duration-300 z-30 ${
                            isHovered ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-2 scale-95'
                          }`}
                        >
                          <div className="relative bg-[#00596b] text-white px-3 sm:px-4 py-2 rounded-xl shadow-2xl text-center border border-[#007b94]/40 whitespace-nowrap">
                            <p className="text-[10px] text-sky-200 font-semibold leading-tight line-clamp-1">
                              {leader.position}
                            </p>
                            <p className="text-xs sm:text-sm font-extrabold font-heading text-white tracking-wide">
                              {leader.name}
                            </p>
                            <div className="text-[9px] text-sky-300 flex items-center justify-center gap-1 mt-0.5">
                              <span>Klik untuk buka biodata</span>
                              <ArrowUpRight className="w-3 h-3 text-cyan-300" />
                            </div>
                            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-[#00596b]" />
                          </div>
                        </div>

                        {/* Tombol Lingkaran Cyan dengan Panah Diagonal ↗ */}
                        <div
                          style={{ left: arrowPos.left, top: arrowPos.top }}
                          className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 transition-all duration-300 pointer-events-auto`}
                        >
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              openPersonModal(leader);
                            }}
                            className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#00a2be] hover:bg-[#008ba3] text-white flex items-center justify-center shadow-xl border-2 border-white/90 transition-all transform duration-300 ${
                              isHovered
                                ? 'scale-125 ring-4 ring-cyan-400/40 bg-[#008ba3]'
                                : 'scale-100 hover:scale-110'
                            }`}
                            title={`Lihat Biodata: ${leader.name}`}
                          >
                            <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-500 gap-2">
                  <span className="flex items-center gap-1.5 font-medium text-slate-700">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    Formasi Interaktif: Sorot kursor ke foto setiap orang & klik tombol panah cyan (↗)
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsPhotoModalOpen(true)}
                    className="inline-flex items-center gap-1.5 text-sky-600 hover:text-sky-700 font-bold cursor-pointer"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Perbesar Foto Fullscreen</span>
                  </button>
                </div>
              </div>
            )}



          </div>

          {/* 2. DAFTAR INDIVIDUAL PROFIL PIMPINAN LOKAL UBP BARRU (ALTERNATING ZIGZAG LAYOUT) */}
          <div className="space-y-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
                  Profil Anggota Manajemen UBP Barru
                </h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  Senior Manager dan jajaran manajer bidang operasional, pemeliharaan, K3L, dan administrasi
                </p>
              </div>
              <span className="text-xs font-bold px-3.5 py-1.5 rounded-xl bg-sky-500/10 text-sky-600 border border-sky-500/20 shrink-0">
                {leaders.length} Pimpinan Aktif
              </span>
            </div>

            <div className="space-y-10">
              {leaders.map((leader, index) => {
                const isEven = index % 2 === 0;
                return (
                  <div
                    key={leader.id}
                    className="p-6 sm:p-8 lg:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                      {/* Sisi Foto Pimpinan (Hanya Gambar Bersih Tanpa Preview Saat Kursor ke Gambar) */}
                      <div className={`lg:col-span-5 ${isEven ? 'lg:order-1' : 'lg:order-2'} w-full`}>
                        <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] max-h-[340px] rounded-2xl overflow-hidden bg-slate-100 shadow-md border border-slate-200">
                          <img
                            src={leader.photo || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80'}
                            alt={leader.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>

                      {/* Sisi Uraian / Teks Pimpinan */}
                      <div className={`lg:col-span-7 ${isEven ? 'lg:order-2' : 'lg:order-1'} space-y-4`}>
                        <div className="space-y-2">
                          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 text-sky-700 border border-sky-200/80 text-xs font-bold uppercase tracking-wider">
                            <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
                            <span>{leader.position}</span>
                          </div>
                          <h4 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading leading-tight">
                            {leader.name}
                          </h4>
                        </div>

                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                          {leader.bio ||
                            'Memimpin dan memastikan operasional pembangkitan PLTU Barru 2x50 MW berjalan secara andal, efisien, berstandar K3L kelas dunia, serta mematuhi prinsip Good Corporate Governance (GCG).'}
                        </p>

                        <div className="pt-2">
                          <button
                            type="button"
                            onClick={() => {
                              openPersonModal({
                                id: leader.id as any,
                                name: leader.name,
                                position: leader.position,
                                photo: leader.photo || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80',
                                birthInfo: leader.birth_info || '-',
                                education: Array.isArray(leader.education) ? leader.education : (leader.education ? [leader.education] : []),
                                careerJourney: Array.isArray(leader.career_journey) ? leader.career_journey : (leader.career_journey ? [leader.career_journey] : (leader.bio ? [leader.bio] : [])),
                                zone: { left: '0%', width: '100%' },
                                arrowPos: { left: '50%', top: '50%' }
                              });
                            }}
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#008ba3] hover:bg-[#007489] text-white font-bold text-xs rounded-xl shadow-md shadow-sky-600/20 transition-all cursor-pointer"
                          >
                            <ArrowUpRight className="w-3.5 h-3.5" />
                            <span>Buka Biodata & Perjalanan Karir</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* 3. MODAL BIODATA PIMPINAN (PERSIS SEPERTI GAMBAR KE DUA PLN INDONESIA POWER) */}
      {selectedPerson && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/75 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-4xl bg-white rounded-2xl overflow-hidden shadow-2xl border border-slate-200 flex flex-col max-h-[92vh]">
            
            {/* Modal Header: Dark Teal dengan title Profile dan Tombol Close Kuning Persegi */}
            <div className="bg-[#00596b] px-6 py-4 flex items-center justify-between text-white select-none">
              <h3 className="text-xl font-bold font-heading tracking-wide">
                Profile
              </h3>
              <button
                type="button"
                onClick={() => setSelectedPerson(null)}
                className="w-8 h-8 rounded-lg bg-[#ffd100] hover:bg-[#ffbe00] text-slate-950 flex items-center justify-center font-black transition-transform hover:scale-105 cursor-pointer shadow-md"
                title="Tutup (ESC)"
              >
                <X className="w-5 h-5 stroke-[2.5]" />
              </button>
            </div>

            {/* Modal Body: Dua Kolom (Foto Potret di Kiri, Biodata di Kanan) */}
            <div className="p-6 sm:p-8 overflow-y-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              
              {/* Kolom Kiri: Foto Potret Individu */}
              <div className="md:col-span-5 flex flex-col items-center">
                <div className="w-full aspect-[4/5] max-w-[280px] rounded-2xl overflow-hidden bg-gradient-to-b from-slate-100 to-slate-200 border border-slate-200 shadow-md">
                  <img
                    src={selectedPerson.photo}
                    alt={selectedPerson.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>

              {/* Kolom Kanan: Nama, Jabatan, Tabs (Profile / Career Journey), dan Detail */}
              <div className="md:col-span-7 space-y-6">
                <div>
                  <h4 className="text-2xl sm:text-3xl font-extrabold text-[#008ba3] font-heading leading-tight">
                    {selectedPerson.name}
                  </h4>
                  <p className="text-sm sm:text-base text-slate-600 font-medium mt-1">
                    {selectedPerson.position}
                  </p>
                </div>

                {/* Navigation Tabs: Profile | Career Journey */}
                <div className="flex items-center gap-8 border-b border-slate-200 text-sm font-bold">
                  <button
                    type="button"
                    onClick={() => setModalTab('profile')}
                    className={`pb-2.5 border-b-2 transition-all cursor-pointer ${
                      modalTab === 'profile'
                        ? 'border-[#008ba3] text-[#008ba3] font-extrabold'
                        : 'border-transparent text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Profile
                  </button>
                  <button
                    type="button"
                    onClick={() => setModalTab('career')}
                    className={`pb-2.5 border-b-2 transition-all cursor-pointer ${
                      modalTab === 'career'
                        ? 'border-[#008ba3] text-[#008ba3] font-extrabold'
                        : 'border-transparent text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Career Journey
                  </button>
                </div>

                {/* Tab Content: Profile */}
                {modalTab === 'profile' && (
                  <div className="space-y-6 text-xs sm:text-sm">
                    <div>
                      <h5 className="font-semibold text-slate-500 mb-2">Education History</h5>
                      <ul className="space-y-3">
                        {selectedPerson.education && selectedPerson.education.length > 0 ? (
                          selectedPerson.education.map((edu, idx) => (
                            <li key={idx} className="flex items-start gap-2.5 text-slate-800 leading-snug">
                              <CheckCircle2 className="w-5 h-5 text-[#008ba3] shrink-0 mt-0.5" />
                              <span className="font-medium">{edu}</span>
                            </li>
                          ))
                        ) : (
                          <li className="text-slate-400 italic">Informasi pendidikan tidak tersedia.</li>
                        )}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Tab Content: Career Journey */}
                {modalTab === 'career' && (
                  <div className="space-y-4 text-xs sm:text-sm">
                    <h5 className="font-semibold text-slate-500 mb-2">Perjalanan Karir & Pengalaman</h5>
                    <ul className="space-y-3">
                      {selectedPerson.careerJourney && selectedPerson.careerJourney.length > 0 ? (
                        selectedPerson.careerJourney.map((car, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-slate-800 leading-snug">
                            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                            <span className="font-medium">{car}</span>
                          </li>
                        ))
                      ) : (
                        <li className="text-slate-400 italic">Informasi riwayat karir tidak tersedia.</li>
                      )}
                    </ul>
                  </div>
                )}

              </div>

            </div>

          </div>
        </div>
      )}

      {/* 4. FULLSCREEN PHOTO ZOOM MODAL */}
      {isPhotoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-6xl max-h-[92vh] bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-slate-200">
            
            {/* Modal Header */}
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold font-heading">
                    {activeTab === 'commissioners' ? 'Board of Commissioners' : 'Board of Directors'} — Landscape View
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Formasi Jajaran Pimpinan PT PLN Indonesia Power
                  </p>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setZoomLevel((prev) => Math.min(prev + 0.25, 2.5))}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                  title="Perbesar (Zoom In)"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setZoomLevel((prev) => Math.max(prev - 0.25, 0.75))}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                  title="Perkecil (Zoom Out)"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setZoomLevel(1)}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                  title="Reset Ukuran"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsPhotoModalOpen(false)}
                  className="p-2 rounded-xl bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-colors ml-2"
                  title="Tutup (ESC)"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Image Area */}
            <div className="flex-1 overflow-auto p-4 sm:p-8 flex items-center justify-center bg-slate-100 min-h-[350px]">
              <div
                style={{ transform: `scale(${zoomLevel})`, transition: 'transform 0.2s ease-out' }}
                className="max-w-full origin-center flex items-center justify-center"
              >
                <img
                  src={currentPhoto}
                  alt="Management Landscape Enlarged"
                  className="max-w-full h-auto max-h-[72vh] object-contain rounded-2xl shadow-lg border border-slate-200 bg-white"
                />
              </div>
            </div>

            {/* Modal Footer Banner */}
            <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
              <span className="font-semibold text-slate-700">Formasi Lanskap Resolusi Tinggi</span>
              <span className="text-slate-400">Zoom: {Math.round(zoomLevel * 100)}%</span>
            </div>

          </div>
        </div>
      )}

    </MainLayout>
  );
}
