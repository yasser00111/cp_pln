import React, { useState, useMemo } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router } from '@inertiajs/react';
import {
  Save,
  FileText,
  CheckCircle2,
  Home,
  Building2,
  Zap,
  Leaf,
  Globe,
  Newspaper,
  Phone,
  Search,
  ExternalLink,
  Upload,
  Image as ImageIcon,
  Check,
  Layers,
  Sparkles,
  X
} from 'lucide-react';

interface ContentItem {
  id?: number;
  section_key: string;
  title: string | null;
  body_text: string | null;
  image_url?: string | null;
  imageFile?: File | null;
}

interface Props {
  contents: Record<string, ContentItem>;
}

interface SectionMeta {
  key: string;
  label: string;
  page: string;
  pageUrl: string;
  category: 'home' | 'profile' | 'operational' | 'sustainability' | 'biodiversity' | 'media' | 'contact';
  helpText: string;
}

const SECTION_REGISTRY: Record<string, Omit<SectionMeta, 'key'>> = {
  // 1. BERANDA (HOME)
  home_profile_title: {
    label: 'Judul Sekilas Profil UBP Barru',
    page: 'Beranda (Home)',
    pageUrl: '/',
    category: 'home',
    helpText: 'Tampil pada kartu sekilas profil di halaman utama beranda.',
  },
  home_profile_image: {
    label: 'Gambar & Narasi Sekilas Profil',
    page: 'Beranda (Home)',
    pageUrl: '/',
    category: 'home',
    helpText: 'Foto pembangkit dan pengantar profil di beranda.',
  },
  home_profile_year: {
    label: 'Tahun Beroperasi & Kapasitas Singkat',
    page: 'Beranda (Home)',
    pageUrl: '/',
    category: 'home',
    helpText: 'Badge angka tahun komersialisasi dan kapasitas terpasang di beranda.',
  },
  home_profile_tech: {
    label: 'Teknologi Boiler & Pembangkitan',
    page: 'Beranda (Home)',
    pageUrl: '/',
    category: 'home',
    helpText: 'Deskripsi teknologi efisiensi energi di kartu profil beranda.',
  },
  home_profile_badge1_title: {
    label: 'Badge Statistik Beranda 1: Judul',
    page: 'Beranda (Home)',
    pageUrl: '/',
    category: 'home',
    helpText: 'Judul kartu statistik ringkasan 1 di beranda.',
  },
  home_profile_badge1_desc: {
    label: 'Badge Statistik Beranda 1: Deskripsi',
    page: 'Beranda (Home)',
    pageUrl: '/',
    category: 'home',
    helpText: 'Keterangan kartu statistik ringkasan 1 di beranda.',
  },
  home_profile_badge2_title: {
    label: 'Badge Statistik Beranda 2: Judul',
    page: 'Beranda (Home)',
    pageUrl: '/',
    category: 'home',
    helpText: 'Judul kartu statistik ringkasan 2 di beranda.',
  },
  home_profile_badge2_desc: {
    label: 'Badge Statistik Beranda 2: Deskripsi',
    page: 'Beranda (Home)',
    pageUrl: '/',
    category: 'home',
    helpText: 'Keterangan kartu statistik ringkasan 2 di beranda.',
  },
  home_visimisi_title: {
    label: 'Judul Seksi Visi & Misi di Beranda',
    page: 'Beranda (Home)',
    pageUrl: '/',
    category: 'home',
    helpText: 'Header untuk seksi pengantar visi & misi di halaman muka.',
  },
  home_operational_title: {
    label: 'Judul Seksi Kinerja Operasional di Beranda',
    page: 'Beranda (Home)',
    pageUrl: '/',
    category: 'home',
    helpText: 'Header seksi performa pembangkitan di halaman beranda.',
  },
  home_facility_title: {
    label: 'Judul Seksi Unit & Fasilitas di Beranda',
    page: 'Beranda (Home)',
    pageUrl: '/',
    category: 'home',
    helpText: 'Header fasilitas pembangkitan pada halaman beranda.',
  },
  home_sustainability_title: {
    label: 'Judul Seksi Keberlanjutan & ESG di Beranda',
    page: 'Beranda (Home)',
    pageUrl: '/',
    category: 'home',
    helpText: 'Header modul keberlanjutan & lingkungan di halaman muka.',
  },
  home_sustainability_intro: {
    label: 'Pengantar Narasi Keberlanjutan di Beranda',
    page: 'Beranda (Home)',
    pageUrl: '/',
    category: 'home',
    helpText: 'Paragraf ringkasan komitmen hijau & PROPER di beranda.',
  },
  home_sus_stat_1: {
    label: 'Statistik ESG Beranda: Pengurangan Emisi',
    page: 'Beranda (Home)',
    pageUrl: '/',
    category: 'home',
    helpText: 'Angka & deskripsi reduksi emisi di kartu beranda.',
  },
  home_sus_stat_2: {
    label: 'Statistik ESG Beranda: Keanekaragaman Hayati',
    page: 'Beranda (Home)',
    pageUrl: '/',
    category: 'home',
    helpText: 'Angka & deskripsi konservasi kehati di kartu beranda.',
  },
  home_sus_stat_3: {
    label: 'Statistik ESG Beranda: Pemberdayaan CSR',
    page: 'Beranda (Home)',
    pageUrl: '/',
    category: 'home',
    helpText: 'Angka penerima manfaat program kemasyarakatan di beranda.',
  },
  home_news_title: {
    label: 'Judul Seksi Berita Terkini di Beranda',
    page: 'Beranda (Home)',
    pageUrl: '/',
    category: 'home',
    helpText: 'Header cuplikan artikel dan berita terbaru di beranda.',
  },

  // 2. PROFIL PERUSAHAAN (PROFILE)
  profile_tentang_title: {
    label: 'Tentang Kami: Judul & Narasi Profil',
    page: 'Tentang Kami',
    pageUrl: '/profile/tentang',
    category: 'profile',
    helpText: 'Tampil di bagian atas halaman Profil > Tentang Kami.',
  },
  profile_tentang_description: {
    label: 'Tentang Kami: Uraian Tambahan',
    page: 'Tentang Kami',
    pageUrl: '/profile/tentang',
    category: 'profile',
    helpText: 'Penjelasan rinci sejarah dan peran PLTU Barru.',
  },
  profile_visi: {
    label: 'Visi Perusahaan PT PLN Indonesia Power',
    page: 'Visi & Misi',
    pageUrl: '/profile/visi-misi',
    category: 'profile',
    helpText: 'Pernyataan visi utama perusahaan pembangkitan.',
  },
  profile_misi_1: {
    label: 'Misi Perusahaan (Butir 1)',
    page: 'Visi & Misi',
    pageUrl: '/profile/visi-misi',
    category: 'profile',
    helpText: 'Misi operasional energi andal dan ramah lingkungan.',
  },
  profile_misi_2: {
    label: 'Misi Perusahaan (Butir 2)',
    page: 'Visi & Misi',
    pageUrl: '/profile/visi-misi',
    category: 'profile',
    helpText: 'Misi pertumbuhan bisnis dan tata kelola GCG.',
  },
  values_section: {
    label: 'Nilai Budaya: AKHLAK BUMN (Pengantar)',
    page: 'Nilai Perusahaan (AKHLAK)',
    pageUrl: '/profile/tentang',
    category: 'profile',
    helpText: 'Pengantar nilai budaya kerja Amanah, Kompeten, Harmonis, Loyal, Adaptif, Kolaboratif.',
  },
  value_amanah: {
    label: 'Nilai AKHLAK: Amanah',
    page: 'Nilai Perusahaan (AKHLAK)',
    pageUrl: '/profile/tentang',
    category: 'profile',
    helpText: 'Memegang teguh kepercayaan yang diberikan.',
  },
  value_kompeten: {
    label: 'Nilai AKHLAK: Kompeten',
    page: 'Nilai Perusahaan (AKHLAK)',
    pageUrl: '/profile/tentang',
    category: 'profile',
    helpText: 'Terus belajar dan mengembangkan kapabilitas.',
  },
  value_harmonis: {
    label: 'Nilai AKHLAK: Harmonis',
    page: 'Nilai Perusahaan (AKHLAK)',
    pageUrl: '/profile/tentang',
    category: 'profile',
    helpText: 'Saling peduli dan menghargai perbedaan.',
  },
  value_loyal: {
    label: 'Nilai AKHLAK: Loyal',
    page: 'Nilai Perusahaan (AKHLAK)',
    pageUrl: '/profile/tentang',
    category: 'profile',
    helpText: 'Berdedikasi dan mengutamakan kepentingan bangsa dan negara.',
  },
  value_adaptif: {
    label: 'Nilai AKHLAK: Adaptif',
    page: 'Nilai Perusahaan (AKHLAK)',
    pageUrl: '/profile/tentang',
    category: 'profile',
    helpText: 'Terus berinovasi dan antusias menghadapi perubahan.',
  },
  value_kolaboratif: {
    label: 'Nilai AKHLAK: Kolaboratif',
    page: 'Nilai Perusahaan (AKHLAK)',
    pageUrl: '/profile/tentang',
    category: 'profile',
    helpText: 'Membangun kerja sama yang sinergis.',
  },
  core_competencies_section: {
    label: 'Our Core Competencies (Pengantar)',
    page: 'Core Competencies',
    pageUrl: '/profile/tentang',
    category: 'profile',
    helpText: 'Header dan pengantar kompetensi inti pembangkitan.',
  },
  core_comp_1: {
    label: 'Core Competency 1',
    page: 'Core Competencies',
    pageUrl: '/profile/tentang',
    category: 'profile',
    helpText: 'Keandalan operasi dan sistem pembangkitan.',
  },
  core_comp_2: {
    label: 'Core Competency 2',
    page: 'Core Competencies',
    pageUrl: '/profile/tentang',
    category: 'profile',
    helpText: 'Manajemen pemeliharaan prediktif & presisi.',
  },
  core_comp_3: {
    label: 'Core Competency 3',
    page: 'Core Competencies',
    pageUrl: '/profile/tentang',
    category: 'profile',
    helpText: 'Transisi energi bersih dan efisiensi bahan bakar.',
  },
  core_comp_4: {
    label: 'Core Competency 4',
    page: 'Core Competencies',
    pageUrl: '/profile/tentang',
    category: 'profile',
    helpText: 'Standar K3L kelas dunia dan nir-kecelakaan.',
  },
  strengths_section: {
    label: 'Our Strengths (Pengantar)',
    page: 'Strengths (Kekuatan Kami)',
    pageUrl: '/profile/tentang',
    category: 'profile',
    helpText: 'Header dan pengantar keunggulan strategis PLTU Barru.',
  },
  strength_1: {
    label: 'Our Strength 1',
    page: 'Strengths (Kekuatan Kami)',
    pageUrl: '/profile/tentang',
    category: 'profile',
    helpText: 'Pilar kekuatan strategis pertama.',
  },
  strength_2: {
    label: 'Our Strength 2',
    page: 'Strengths (Kekuatan Kami)',
    pageUrl: '/profile/tentang',
    category: 'profile',
    helpText: 'Pilar kekuatan strategis kedua.',
  },
  strength_3: {
    label: 'Our Strength 3',
    page: 'Strengths (Kekuatan Kami)',
    pageUrl: '/profile/tentang',
    category: 'profile',
    helpText: 'Pilar kekuatan strategis ketiga.',
  },
  strength_4: {
    label: 'Our Strength 4',
    page: 'Strengths (Kekuatan Kami)',
    pageUrl: '/profile/tentang',
    category: 'profile',
    helpText: 'Pilar kekuatan strategis keempat.',
  },
  profile_struktur_title: {
    label: 'Struktur Organisasi: Header',
    page: 'Struktur Organisasi',
    pageUrl: '/profile/struktur',
    category: 'profile',
    helpText: 'Judul bagan hierarki kepemimpinan UBP Barru.',
  },
  profile_struktur_description: {
    label: 'Struktur Organisasi: Deskripsi',
    page: 'Struktur Organisasi',
    pageUrl: '/profile/struktur',
    category: 'profile',
    helpText: 'Pengantar bagan manajemen operasional.',
  },
  profile_pimpinan_title: {
    label: 'Jajaran Manajemen: Header',
    page: 'Struktur Pimpinan',
    pageUrl: '/profile/pimpinan',
    category: 'profile',
    helpText: 'Judul panggung formasi pimpinan dan direksi.',
  },
  profile_pimpinan_description: {
    label: 'Jajaran Manajemen: Deskripsi',
    page: 'Struktur Pimpinan',
    pageUrl: '/profile/pimpinan',
    category: 'profile',
    helpText: 'Pengantar dewan komisaris, direksi, dan manajer.',
  },
  profile_sejarah_title: {
    label: 'Sejarah Perusahaan: Judul',
    page: 'Sejarah',
    pageUrl: '/profile/sejarah',
    category: 'profile',
    helpText: 'Judul linimasa tonggak sejarah berdirinya PLTU Barru.',
  },
  profile_sejarah_description: {
    label: 'Sejarah Perusahaan: Deskripsi',
    page: 'Sejarah',
    pageUrl: '/profile/sejarah',
    category: 'profile',
    helpText: 'Narasi perkembangan unit dari masa konstruksi hingga kini.',
  },
  profile_penghargaan_title: {
    label: 'Penghargaan & Sertifikasi: Judul',
    page: 'Penghargaan',
    pageUrl: '/profile/penghargaan',
    category: 'profile',
    helpText: 'Header apresiasi, sertifikasi ISO, dan PROPER.',
  },
  profile_penghargaan_description: {
    label: 'Penghargaan & Sertifikasi: Deskripsi',
    page: 'Penghargaan',
    pageUrl: '/profile/penghargaan',
    category: 'profile',
    helpText: 'Pengantar capaian prestasi operasional dan lingkungan.',
  },

  // 3. OPERASIONAL & FASILITAS
  operational_unit_title: {
    label: 'Unit & Fasilitas: Judul',
    page: 'Unit & Fasilitas',
    pageUrl: '/operational/unit-fasilitas',
    category: 'operational',
    helpText: 'Tampil di header halaman daftar unit pembangkitan.',
  },
  operational_unit_description: {
    label: 'Unit & Fasilitas: Deskripsi',
    page: 'Unit & Fasilitas',
    pageUrl: '/operational/unit-fasilitas',
    category: 'operational',
    helpText: 'Deskripsi fasilitas turbin, boiler, dan gardu induk.',
  },
  operational_kapasitas_title: {
    label: 'Kapasitas Pembangkit 2x50 MW: Judul',
    page: 'Kapasitas Pembangkit',
    pageUrl: '/operational/kapasitas',
    category: 'operational',
    helpText: 'Header kapasitas daya terpasang PLTU Barru.',
  },
  operational_kapasitas_description: {
    label: 'Kapasitas Pembangkit: Deskripsi',
    page: 'Kapasitas Pembangkit',
    pageUrl: '/operational/kapasitas',
    category: 'operational',
    helpText: 'Rincian kontribusi pasokan listrik ke sistem Sulawesi Selatan.',
  },
  operational_performance_title: {
    label: 'Kinerja Operasional (Performance): Judul',
    page: 'Kinerja Operasional',
    pageUrl: '/operational/performance',
    category: 'operational',
    helpText: 'Header grafik EAF, EFOR, dan kapasitas produksi listrik.',
  },
  operational_performance_description: {
    label: 'Kinerja Operasional: Deskripsi',
    page: 'Kinerja Operasional',
    pageUrl: '/operational/performance',
    category: 'operational',
    helpText: 'Uraian keandalan pembangkitan dan pencapaian target.',
  },
  operational_profil_title: {
    label: 'Profil Teknis Operasional: Judul',
    page: 'Profil Operasional',
    pageUrl: '/operational/performance',
    category: 'operational',
    helpText: 'Header parameter teknis pengoperasian pembangkit.',
  },
  operational_profil_description: {
    label: 'Profil Teknis Operasional: Deskripsi',
    page: 'Profil Operasional',
    pageUrl: '/operational/performance',
    category: 'operational',
    helpText: 'Penjelasan operasional pembangkitan ramah lingkungan.',
  },
  human_capital_hero: {
    label: 'Human Capital & SDM: Banner Hero',
    page: 'Human Capital',
    pageUrl: '/operational/human-capital',
    category: 'operational',
    helpText: 'Header dan slogan pengembangan talenta di UBP Barru.',
  },
  human_capital_card_1: {
    label: 'Human Capital: Pilar 1',
    page: 'Human Capital',
    pageUrl: '/operational/human-capital',
    category: 'operational',
    helpText: 'Pilar kompetensi profesional dan sertifikasi keahlian.',
  },
  human_capital_card_2: {
    label: 'Human Capital: Pilar 2',
    page: 'Human Capital',
    pageUrl: '/operational/human-capital',
    category: 'operational',
    helpText: 'Pilar kepemimpinan dan budaya kerja kolaboratif.',
  },
  human_capital_card_3: {
    label: 'Human Capital: Pilar 3',
    page: 'Human Capital',
    pageUrl: '/operational/human-capital',
    category: 'operational',
    helpText: 'Pilar kesejahteraan pegawai dan kesehatan kerja.',
  },

  // 4. KEBERLANJUTAN & K3 (SUSTAINABILITY)
  sustainability_commitment_title: {
    label: 'Komitmen Keberlanjutan: Judul',
    page: 'ESG & Keberlanjutan',
    pageUrl: '/sustainability/esg',
    category: 'sustainability',
    helpText: 'Header komitmen transisi energi dan keberlanjutan.',
  },
  sustainability_commitment_description: {
    label: 'Komitmen Keberlanjutan: Deskripsi',
    page: 'ESG & Keberlanjutan',
    pageUrl: '/sustainability/esg',
    category: 'sustainability',
    helpText: 'Narasi pelaksanaan prinsip pembangunan berkelanjutan (SDGs).',
  },
  sustainability_esg_title: {
    label: 'Prinsip ESG: Judul',
    page: 'ESG & Keberlanjutan',
    pageUrl: '/sustainability/esg',
    category: 'sustainability',
    helpText: 'Header aspek Environmental, Social, and Governance.',
  },
  sustainability_esg_description: {
    label: 'Prinsip ESG: Deskripsi',
    page: 'ESG & Keberlanjutan',
    pageUrl: '/sustainability/esg',
    category: 'sustainability',
    helpText: 'Penerapan kepatuhan regulasi lingkungan dan sosial.',
  },
  sustainability_lingkungan_title: {
    label: 'Pengelolaan Lingkungan Hidup: Judul',
    page: 'Lingkungan Hidup',
    pageUrl: '/sustainability/lingkungan',
    category: 'sustainability',
    helpText: 'Header pengelolaan emisi udara, air limbah, dan limbah B3.',
  },
  sustainability_lingkungan_description: {
    label: 'Pengelolaan Lingkungan Hidup: Deskripsi',
    page: 'Lingkungan Hidup',
    pageUrl: '/sustainability/lingkungan',
    category: 'sustainability',
    helpText: 'Uraian pemantauan baku mutu emisi cerobong CEMS.',
  },
  sustainability_k3_title: {
    label: 'Keselamatan & Kesehatan Kerja (K3): Judul',
    page: 'Keselamatan K3',
    pageUrl: '/sustainability/k3',
    category: 'sustainability',
    helpText: 'Header budaya zero accident dan keselamatan kerja.',
  },
  sustainability_k3_description: {
    label: 'Keselamatan & Kesehatan Kerja (K3): Deskripsi',
    page: 'Keselamatan K3',
    pageUrl: '/sustainability/k3',
    category: 'sustainability',
    helpText: 'SOP keselamatan kerja pembangkit dan sertifikasi SMK3.',
  },
  safety_record_days: {
    label: 'Rekor Hari Selamat (Zero Accident)',
    page: 'Keselamatan K3',
    pageUrl: '/sustainability/k3',
    category: 'sustainability',
    helpText: 'Jumlah hari kerja selamat tanpa kecelakaan fatal.',
  },
  sustainability_csr_title: {
    label: 'Program CSR & Bina Lingkungan: Judul',
    page: 'CSR & Masyarakat',
    pageUrl: '/sustainability/csr',
    category: 'sustainability',
    helpText: 'Header program tanggung jawab sosial di sekitar PLTU Barru.',
  },
  sustainability_csr_description: {
    label: 'Program CSR & Bina Lingkungan: Deskripsi',
    page: 'CSR & Masyarakat',
    pageUrl: '/sustainability/csr',
    category: 'sustainability',
    helpText: 'Program pemberdayaan UMKM, pendidikan, dan kesehatan warga.',
  },
  sustainability_gender_title: {
    label: 'Gender Mainstreaming: Judul',
    page: 'Pengarusutamaan Gender',
    pageUrl: '/sustainability/gender',
    category: 'sustainability',
    helpText: 'Header kesetaraan gender dan pemberdayaan perempuan.',
  },
  sustainability_gender_description: {
    label: 'Gender Mainstreaming: Deskripsi',
    page: 'Pengarusutamaan Gender',
    pageUrl: '/sustainability/gender',
    category: 'sustainability',
    helpText: 'Kebijakan lingkungan kerja inklusif dan non-diskriminatif.',
  },
  srikandi_hero: {
    label: 'Gerakan Srikandi PLN: Banner',
    page: 'Srikandi PLN',
    pageUrl: '/sustainability/gender',
    category: 'sustainability',
    helpText: 'Slogan dan banner komunitas Srikandi PLN IP UBP Barru.',
  },
  srikandi_section: {
    label: 'Gerakan Srikandi PLN: Narasi Kegiatan',
    page: 'Srikandi PLN',
    pageUrl: '/sustainability/gender',
    category: 'sustainability',
    helpText: 'Kegiatan sosial, edukasi, dan kepemimpinan srikandi energi.',
  },

  // 5. KEANEKARAGAMAN HAYATI (BIODIVERSITY)
  bio_info_hero: {
    label: 'Informasi Status Hayati: Banner Hero',
    page: 'Info Kehati',
    pageUrl: '/biodiversity/info',
    category: 'biodiversity',
    helpText: 'Banner pembuka status keanekaragaman flora dan fauna.',
  },
  biodiversity_info_title: {
    label: 'Informasi Kehati: Judul Header',
    page: 'Info Kehati',
    pageUrl: '/biodiversity/info',
    category: 'biodiversity',
    helpText: 'Judul seksi pada halaman informasi konservasi.',
  },
  biodiversity_info_description: {
    label: 'Informasi Kehati: Deskripsi',
    page: 'Info Kehati',
    pageUrl: '/biodiversity/info',
    category: 'biodiversity',
    helpText: 'Penjelasan zona konservasi pesisir pantai Lampoko.',
  },
  bio_data_hero: {
    label: 'Inventarisasi Hayati: Banner Hero',
    page: 'Data Hayati',
    pageUrl: '/biodiversity/kehati-data',
    category: 'biodiversity',
    helpText: 'Banner dan judul halaman katalog spesies hayati.',
  },
  biodiversity_data_info: {
    label: 'Inventarisasi Hayati: Penjelasan Katalog',
    page: 'Data Hayati',
    pageUrl: '/biodiversity/kehati-data',
    category: 'biodiversity',
    helpText: 'Uraian pengelompokan taksonomi dan status perlindungan IUCN.',
  },
  biodiversity_kehatidata_title: {
    label: 'Data Spesies Kehati: Judul',
    page: 'Data Hayati',
    pageUrl: '/biodiversity/kehati-data',
    category: 'biodiversity',
    helpText: 'Header matriks tabel inventarisasi flora & fauna.',
  },
  biodiversity_kehatidata_description: {
    label: 'Data Spesies Kehati: Deskripsi',
    page: 'Data Hayati',
    pageUrl: '/biodiversity/kehati-data',
    category: 'biodiversity',
    helpText: 'Metodologi pendataan spesimen di lapangan.',
  },
  biodiversity_kehatiindeks_title: {
    label: 'Indeks Kehati Shannon-Wiener: Judul',
    page: 'Indeks Kehati',
    pageUrl: '/biodiversity/kehati-indeks',
    category: 'biodiversity',
    helpText: 'Header kurva tren indeks keanekaragaman tahunan.',
  },
  biodiversity_kehatiindeks_description: {
    label: 'Indeks Kehati Shannon-Wiener: Deskripsi',
    page: 'Indeks Kehati',
    pageUrl: '/biodiversity/kehati-indeks',
    category: 'biodiversity',
    helpText: 'Penjelasan nilai formula H dan kemerataan ekosistem.',
  },
  biodiversity_report_title: {
    label: 'Laporan Konservasi Kehati: Judul',
    page: 'Laporan Konservasi',
    pageUrl: '/biodiversity/report',
    category: 'biodiversity',
    helpText: 'Header repositori dokumen laporan berkala.',
  },
  biodiversity_report_description: {
    label: 'Laporan Konservasi Kehati: Deskripsi',
    page: 'Laporan Konservasi',
    pageUrl: '/biodiversity/report',
    category: 'biodiversity',
    helpText: 'Pengantar unduhan laporan pemantauan keanekaragaman hayati.',
  },
  biodiversity_program_title: {
    label: 'Program Konservasi: Judul & Pengantar Banner',
    page: 'Program Konservasi',
    pageUrl: '/biodiversity/program',
    category: 'biodiversity',
    helpText: 'Tampil di banner paling atas halaman Program Biologi & Konservasi.',
  },
  biodiversity_program_section: {
    label: 'Program Konservasi: Judul Seksi (Upaya Pelestarian)',
    page: 'Program Konservasi',
    pageUrl: '/biodiversity/program',
    category: 'biodiversity',
    helpText: 'Judul seksi dan subjudul pengantar daftar program unggulan.',
  },
  biodiversity_program_card_1: {
    label: 'Program 1: Konservasi Mangrove Lampoko',
    page: 'Program Konservasi',
    pageUrl: '/biodiversity/program',
    category: 'biodiversity',
    helpText: 'Judul dan penjelasan program penanaman ekosistem mangrove.',
  },
  biodiversity_program_card_2: {
    label: 'Program 2: Penangkaran Penyu Laut',
    page: 'Program Konservasi',
    pageUrl: '/biodiversity/program',
    category: 'biodiversity',
    helpText: 'Judul dan penjelasan program penetasan & pelepasan tukik penyu.',
  },
  biodiversity_program_card_3: {
    label: 'Program 3: Penghijauan Kawasan Pembangkit',
    page: 'Program Konservasi',
    pageUrl: '/biodiversity/program',
    category: 'biodiversity',
    helpText: 'Judul dan penjelasan program penanaman pohon di area pembangkit.',
  },

  // 6. MEDIA & DOWNLOADS
  media_news_title: {
    label: 'Berita & Artikel: Header Halaman',
    page: 'Berita',
    pageUrl: '/news',
    category: 'media',
    helpText: 'Header pusat informasi dan publikasi kegiatan PLTU Barru.',
  },
  gallery_hero: {
    label: 'Galeri Foto: Banner Hero',
    page: 'Galeri Foto',
    pageUrl: '/gallery',
    category: 'media',
    helpText: 'Banner dan judul album dokumentasi foto lapangan.',
  },
  media_gallery_title: {
    label: 'Galeri Foto: Judul Seksi',
    page: 'Galeri Foto',
    pageUrl: '/gallery',
    category: 'media',
    helpText: 'Pengantar dokumentasi visual operasional dan CSR.',
  },
  video_hero: {
    label: 'Video Dokumentasi: Banner Hero',
    page: 'Video',
    pageUrl: '/video',
    category: 'media',
    helpText: 'Banner seksi pemutaran video profil dan dokumenter.',
  },
  media_video_title: {
    label: 'Video Dokumentasi: Judul Seksi',
    page: 'Video',
    pageUrl: '/video',
    category: 'media',
    helpText: 'Header koleksi tayangan video resmi PLN IP UBP Barru.',
  },
  downloads_hero: {
    label: 'Unduh Dokumen Publik: Banner Hero',
    page: 'Unduh Dokumen',
    pageUrl: '/downloads',
    category: 'media',
    helpText: 'Banner pusat unduhan dokumen publik, laporan tahunan, dan sertifikat.',
  },
  downloads_title: {
    label: 'Unduh Dokumen: Judul Seksi',
    page: 'Unduh Dokumen',
    pageUrl: '/downloads',
    category: 'media',
    helpText: 'Judul direktori file dan brosur.',
  },
  downloads_description: {
    label: 'Unduh Dokumen: Deskripsi',
    page: 'Unduh Dokumen',
    pageUrl: '/downloads',
    category: 'media',
    helpText: 'Petunjuk pengunduhan berkas resmi yang dapat diakses publik.',
  },

  // 7. KONTAK
  contact_title: {
    label: 'Kontak & Alamat: Header',
    page: 'Kontak',
    pageUrl: '/contact',
    category: 'contact',
    helpText: 'Tampil di bagian atas halaman Hubungi Kami.',
  },
  contact_description: {
    label: 'Kontak & Alamat: Deskripsi',
    page: 'Kontak',
    pageUrl: '/contact',
    category: 'contact',
    helpText: 'Alamat kantor pembangkit, email narahubung, dan telepon.',
  },
};

const CATEGORIES = [
  { id: 'all', name: 'Semua Halaman', icon: Layers, desc: 'Tampilkan seluruh teks CMS' },
  { id: 'home', name: 'Beranda (Home)', icon: Home, desc: 'Teks landing page utama' },
  { id: 'profile', name: 'Profil Perusahaan', icon: Building2, desc: 'Tentang, Visi Misi, AKHLAK, Pimpinan' },
  { id: 'operational', name: 'Operasional & Unit', icon: Zap, desc: 'Kapasitas, Kinerja, Fasilitas, SDM' },
  { id: 'sustainability', name: 'Keberlanjutan & K3', icon: Leaf, desc: 'ESG, Lingkungan, K3, CSR, Srikandi' },
  { id: 'biodiversity', name: 'Kehati (Biodiversity)', icon: Globe, desc: 'Data, Indeks, & Laporan Kehati' },
  { id: 'media', name: 'Media & Download', icon: Newspaper, desc: 'Berita, Galeri Foto, Video, Unduhan' },
  { id: 'contact', name: 'Kontak', icon: Phone, desc: 'Alamat & Narahubung' },
] as const;

export default function AdminContentIndex({ contents = {} }: Props) {
  const initialData = useMemo(() => {
    const list: ContentItem[] = Object.values(contents || {});
    const existingKeys = new Set(list.map((i) => i.section_key));
    Object.keys(SECTION_REGISTRY).forEach((secKey) => {
      if (!existingKeys.has(secKey)) {
        list.push({
          section_key: secKey,
          title: '',
          body_text: '',
          image_url: null,
        });
      }
    });
    return list;
  }, [contents]);

  const [formData, setFormData] = useState<ContentItem[]>(initialData);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showKehatiGuide, setShowKehatiGuide] = useState(true);

  // Filter state
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = (section_key: string, field: keyof ContentItem, value: any) => {
    setFormData((prev) =>
      prev.map((item) =>
        item.section_key === section_key ? { ...item, [field]: value } : item
      )
    );
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const payload = formData.map((item) => {
      const data = { ...item };
      if (!data.imageFile) {
        delete data.imageFile;
      }
      return data;
    });

    router.post(
      '/admin/contents',
      { contents: payload },
      {
        forceFormData: true,
        preserveScroll: true,
        onSuccess: () => {
          setShowSuccess(true);
          setTimeout(() => setShowSuccess(false), 3000);
        },
        onFinish: () => setIsSaving(false),
      }
    );
  };

  // Filter items based on activeCategory and searchQuery
  const filteredItems = useMemo(() => {
    return formData.filter((item) => {
      const meta = SECTION_REGISTRY[item.section_key];
      const category = meta ? meta.category : 'other';

      const matchesCategory =
        activeCategory === 'all' || category === activeCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.section_key.toLowerCase().includes(q) ||
        (item.title && item.title.toLowerCase().includes(q)) ||
        (item.body_text && item.body_text.toLowerCase().includes(q)) ||
        (meta && meta.label.toLowerCase().includes(q)) ||
        (meta && meta.page.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [formData, activeCategory, searchQuery]);

  return (
    <AdminLayout>
      <Head title="Manajemen Teks Per Halaman (CMS) - PLN IP UBP Barru" />

      <div className="space-y-8 max-w-6xl mx-auto">
        
        {/* Header Title */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs font-bold uppercase tracking-wider mb-2">
              <FileText className="w-3.5 h-3.5" />
              <span>CONTENT MANAGEMENT SYSTEM (CMS)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
              Kelola Teks Berdasarkan Halaman Website
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Atur judul, narasi penjelasan, dan foto banner untuk setiap halaman web sesuai dengan struktur navigasi resmi.
            </p>
          </div>

          <button
            onClick={handleSave}
            disabled={isSaving || formData.length === 0}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-[#008ba3] hover:bg-[#007489] text-white font-bold text-xs shadow-lg shadow-cyan-600/20 transition-all disabled:opacity-50 cursor-pointer shrink-0"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Menyimpan...' : 'Simpan Semua Perubahan'}</span>
          </button>
        </div>

        {/* Success Alert */}
        {showSuccess && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl p-4 flex items-center gap-3 animate-fadeIn shadow-sm">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <div className="text-xs font-bold">
              Semua teks dan gambar konten berhasil disimpan ke database dan langsung tampil di website!
            </div>
          </div>
        )}

        {/* Filter Navigation by Page Categories */}
        <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4">
          
          {/* Top Search Bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
            <input
              type="text"
              placeholder="Cari teks berdasarkan judul, kata kunci, nama halaman, atau kode section (contoh: visi, tentang, esg, k3)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-[#008ba3] focus:bg-white transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-3 text-xs text-slate-400 hover:text-slate-600"
              >
                Hapus
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              
              // Count items in category
              const count = cat.id === 'all'
                ? formData.length
                : formData.filter(item => SECTION_REGISTRY[item.section_key]?.category === cat.id).length;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-[#00596b] text-white shadow-md shadow-[#00596b]/20 scale-100'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200/80 hover:text-slate-900'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-300' : 'text-slate-500'}`} />
                  <span>{cat.name}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Items List */}
        <form onSubmit={handleSave} className="space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-500 px-1">
            <span>
              Menampilkan <strong>{filteredItems.length}</strong> bagian teks di kategori ini
            </span>
            {searchQuery && (
              <span>
                Pencarian untuk: <strong className="text-slate-800 font-mono">"{searchQuery}"</strong>
              </span>
            )}
          </div>

          <div className="space-y-6">
            {activeCategory === 'biodiversity' && showKehatiGuide && (
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50/60 to-white border border-emerald-200/90 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs relative animate-fadeIn">
                <div className="flex items-start gap-3.5 pr-8 md:pr-0">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                    <Leaf className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-extrabold tracking-wider uppercase whitespace-nowrap shadow-2xs">
                        PANDUAN ADMIN
                      </span>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 font-heading">
                        Ingin Mengedit Angka 4 Kartu Metrik Indeks Kehati atau Import Excel?
                      </h4>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
                      Data angka nilai indeks (Shannon–Wiener Flora/Fauna, Kemerataan E, Dominansi D) serta sensus flora & fauna dikelola secara interaktif di menu <strong>Kelola Keanekaragaman Hayati</strong>.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-start md:self-auto">
                  <a
                    href="/admin/biodiversity"
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white rounded-xl font-bold text-xs shadow-sm hover:shadow transition-all whitespace-nowrap cursor-pointer"
                  >
                    <span>Buka Kelola Kehati</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button
                    type="button"
                    onClick={() => setShowKehatiGuide(false)}
                    className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-emerald-100/50 transition-colors cursor-pointer"
                    title="Tutup panduan ini"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {filteredItems.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center space-y-3">
                <FileText className="w-10 h-10 text-slate-300 mx-auto" />
                <h4 className="text-sm font-bold text-slate-700">Tidak ada bagian teks yang cocok</h4>
                <p className="text-xs text-slate-500">
                  Coba ubah kata kunci pencarian Anda atau pilih kategori halaman lainnya.
                </p>
              </div>
            ) : (
              filteredItems.map((item, index) => {
                const meta = SECTION_REGISTRY[item.section_key];
                const humanLabel = meta?.label || `Section: ${item.section_key}`;
                const pageName = meta?.page || 'Halaman Tambahan';
                const pageUrl = meta?.pageUrl || '/';
                const helpText = meta?.helpText || 'Teks statis di halaman website.';

                return (
                  <div
                    key={item.section_key}
                    className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 shadow-sm hover:shadow-md transition-shadow space-y-5"
                  >
                    
                    {/* Header Item: Halaman, Judul Bagian & Link Langsung */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-extrabold uppercase tracking-wide">
                            {pageName}
                          </span>
                          <span className="font-mono text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-md border border-slate-200">
                            {item.section_key}
                          </span>
                        </div>
                        <h3 className="text-base font-extrabold text-slate-900 font-heading">
                          {humanLabel}
                        </h3>
                        <p className="text-xs text-slate-500">
                          {helpText}
                        </p>
                      </div>

                      {/* Tombol Lihat Halaman Langsung */}
                      {meta?.pageUrl && (
                        <a
                          href={pageUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-sky-600 border border-slate-200 text-xs font-semibold transition-colors shrink-0"
                          title="Buka halaman publik ini di tab baru untuk melihat posisi teksnya"
                        >
                          <span>Lihat di Web</span>
                          <ExternalLink className="w-3.5 h-3.5 text-sky-500" />
                        </a>
                      )}
                    </div>

                    {/* Form Input fields */}
                    <div className="grid gap-4 text-xs">
                      {/* Judul (Title) */}
                      <div>
                        <label className="block font-bold text-slate-700 uppercase tracking-wider text-[11px] mb-1.5">
                          Judul Teks (Title)
                        </label>
                        <input
                          type="text"
                          value={item.title || ''}
                          onChange={(e) => handleChange(item.section_key, 'title', e.target.value)}
                          placeholder="Masukkan judul teks..."
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#008ba3] focus:bg-white transition-all font-medium"
                        />
                      </div>

                      {/* Isi Teks (Body Text) */}
                      <div>
                        <label className="block font-bold text-slate-700 uppercase tracking-wider text-[11px] mb-1.5">
                          Isi Paragraf / Narasi (Body Text)
                        </label>
                        <textarea
                          rows={4}
                          value={item.body_text || ''}
                          onChange={(e) => handleChange(item.section_key, 'body_text', e.target.value)}
                          placeholder="Tuliskan narasi penjelasan lengkap..."
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#008ba3] focus:bg-white transition-all leading-relaxed resize-y font-sans"
                        />
                      </div>

                      {/* Gambar Banner / Foto Terkait (Opsional) */}
                      <div className="pt-2">
                        <label className="block font-bold text-slate-700 uppercase tracking-wider text-[11px] mb-1.5">
                          Gambar / Banner Ilustrasi (Opsional)
                        </label>
                        
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                          {item.image_url ? (
                            <div className="w-20 h-14 rounded-xl overflow-hidden bg-white border border-slate-300 shrink-0 relative shadow-2xs">
                              <img
                                src={`/storage/${item.image_url}`}
                                alt={item.title || item.section_key}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ) : (
                            <div className="w-20 h-14 rounded-xl bg-slate-200 flex items-center justify-center text-slate-400 shrink-0">
                              <ImageIcon className="w-5 h-5" />
                            </div>
                          )}

                          <div className="flex-1 space-y-1">
                            {item.image_url ? (
                              <p className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                <span>Foto saat ini sudah terpasang. Unggah file baru untuk menggantinya.</span>
                              </p>
                            ) : (
                              <p className="text-[11px] text-slate-500">
                                Belum ada foto khusus. Anda dapat mengunggah file JPG, PNG, atau WebP.
                              </p>
                            )}

                            <label className="cursor-pointer inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-300 rounded-xl text-slate-700 font-bold hover:bg-slate-100 transition-colors shadow-2xs text-[11px]">
                              <Upload className="w-3.5 h-3.5 text-[#008ba3]" />
                              <span>Pilih File Gambar Baru</span>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                  const file = e.target.files?.[0] || null;
                                  handleChange(item.section_key, 'imageFile', file);
                                }}
                                className="hidden"
                              />
                            </label>
                            {item.imageFile && (
                              <span className="text-[11px] text-emerald-600 font-bold ml-2">
                                File dipilih: {item.imageFile.name}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Bottom Sticky Action Bar */}
          <div className="sticky bottom-6 z-20 bg-white/95 backdrop-blur-md border border-slate-200 rounded-3xl p-4 shadow-xl flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Pastikan seluruh perubahan telah ditinjau sebelum disimpan.</span>
            </div>

            <button
              type="submit"
              disabled={isSaving || formData.length === 0}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-2xl bg-[#008ba3] hover:bg-[#007489] text-white font-bold text-xs shadow-lg shadow-cyan-600/20 transition-all disabled:opacity-50 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? 'Menyimpan Semua Data...' : 'Simpan Semua Perubahan Konten'}</span>
            </button>
          </div>
        </form>

      </div>
    </AdminLayout>
  );
}

