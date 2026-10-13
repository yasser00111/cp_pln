import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router, usePage } from '@inertiajs/react';
import { BiodiversitySpecies } from '@/Types';
import * as XLSX from 'xlsx';
import {
  Leaf,
  Trash2,
  Plus,
  Upload,
  Save,
  LayoutDashboard,
  Database,
  Edit,
  X,
  Globe,
  BarChart3,
  FileText,
  Download,
  FileSpreadsheet,
  CheckCircle2,
  AlertCircle,
  Table as TableIcon
} from 'lucide-react';

export interface DocumentItem {
  id: string;
  title: string;
  category: string;
  year: string;
  file_path: string;
  file_size: string;
  created_at: string;
}

export const defaultDetailedCensusMatrix = {
  years: ['2022', '2023', '2024', '2025', '2026'],
  flora: [
    { no: 1, nama: 'Terminalia mantaly', nama_lokal: 'Ketapang Kencana', satuan: 'Batang', '2022': 30, '2023': 50, '2024': 55, '2025': 30, '2026': 30 },
    { no: 2, nama: 'Mangifera indica', nama_lokal: 'Mangga', satuan: 'Batang', '2022': 50, '2023': 70, '2024': 80, '2025': 18, '2026': 200 },
    { no: 3, nama: 'Mussaenda pubescens', nama_lokal: 'Nusa Indah', satuan: 'Batang', '2022': 50, '2023': 50, '2024': 0, '2025': 0, '2026': 0 },
    { no: 4, nama: 'Bougainvillea', nama_lokal: 'Bougenvile', satuan: 'Batang', '2022': 50, '2023': 50, '2024': 0, '2025': 0, '2026': 0 },
    { no: 5, nama: 'Cocos nucifera L', nama_lokal: 'Kelapa Pandang', satuan: 'Batang', '2022': 250, '2023': 250, '2024': 100, '2025': 20, '2026': 20 },
    { no: 6, nama: 'Indrak varigta', nama_lokal: 'Indrak Varigta', satuan: 'Batang', '2022': 200, '2023': 250, '2024': 0, '2025': 0, '2026': 0 },
    { no: 7, nama: 'Leucaena leucocephala', nama_lokal: 'Lamtoro', satuan: 'Batang', '2022': 300, '2023': 500, '2024': 600, '2025': 500, '2026': 1000 },
    { no: 8, nama: 'Artocarpus heterophyllus', nama_lokal: 'Nangka', satuan: 'Batang', '2022': 250, '2023': 200, '2024': 50, '2025': 0, '2026': 0 },
    { no: 9, nama: 'Syzygium myrtifolium', nama_lokal: 'Pucuk Merah', satuan: 'Batang', '2022': 20, '2023': 15, '2024': 60, '2025': 0, '2026': 0 },
    { no: 10, nama: 'Arecaceae', nama_lokal: 'Palm', satuan: 'Batang', '2022': 100, '2023': 100, '2024': 20, '2025': 0, '2026': 0 },
    { no: 11, nama: 'Cocos nucifera L', nama_lokal: 'Kelapa Ulung', satuan: 'Batang', '2022': 0, '2023': 20, '2024': 20, '2025': 1, '2026': 1 },
    { no: 12, nama: 'Saraca asoca', nama_lokal: 'Asoka', satuan: 'Batang', '2022': 30, '2023': 0, '2024': 0, '2025': 0, '2026': 0 },
    { no: 13, nama: 'Cerbera manghas', nama_lokal: 'Bintaro', satuan: 'Batang', '2022': 20, '2023': 0, '2024': 0, '2025': 0, '2026': 0 },
    { no: 14, nama: 'Rhizophora', nama_lokal: 'Mangrove', satuan: 'Batang', '2022': 1000, '2023': 200, '2024': 1000, '2025': 1000, '2026': 1500 }
  ],
  floraTotals: { '2022': 2350, '2023': 1755, '2024': 1985, '2025': 1569, '2026': 2751 },
  fauna: [
    { no: 1, nama: 'Lepidochelys olivacea', nama_lokal: 'Penyu Lekang', satuan: 'Ekor', '2022': 3983, '2023': 5434, '2024': 5682, '2025': 4319, '2026': 3992 },
    { no: 2, nama: 'Eretmochelys imbricata', nama_lokal: 'Penyu Sisik', satuan: 'Ekor', '2022': 1239, '2023': 1232, '2024': 1434, '2025': 1234, '2026': 40 },
    { no: 3, nama: 'Chelonia mydas', nama_lokal: 'Penyu Hijau', satuan: 'Ekor', '2022': 447, '2023': 700, '2024': 386, '2025': 617, '2026': 41 },
    { no: 4, nama: 'Dugong Dugon', nama_lokal: 'Dugong', satuan: 'Ekor', '2022': 0, '2023': 0, '2024': 0, '2025': 3, '2026': 3 },
    { no: 5, nama: 'Ahaetulla', nama_lokal: 'Ular pucuk', satuan: 'Ekor', '2022': 0, '2023': 0, '2024': 0, '2025': 0, '2026': 5 },
    { no: 6, nama: 'Canis lupus familiaris', nama_lokal: 'Anjing', satuan: 'Ekor', '2022': 0, '2023': 0, '2024': 0, '2025': 0, '2026': 5 },
    { no: 7, nama: 'Duttaphrynus melanostictus', nama_lokal: 'Kodok Buduk', satuan: 'Ekor', '2022': 0, '2023': 0, '2024': 0, '2025': 0, '2026': 38 },
    { no: 8, nama: 'Gryllidae', nama_lokal: 'Jangkrik', satuan: 'Ekor', '2022': 0, '2023': 0, '2024': 0, '2025': 0, '2026': 1031 },
    { no: 9, nama: 'Montanus', nama_lokal: 'Burung gereja', satuan: 'Ekor', '2022': 0, '2023': 0, '2024': 0, '2025': 0, '2026': 11 },
    { no: 10, nama: 'Oryza chinensis', nama_lokal: 'Belalang Hijau', satuan: 'Ekor', '2022': 0, '2023': 0, '2024': 0, '2025': 0, '2026': 1017 },
    { no: 11, nama: 'Pycnonotus aurigaster', nama_lokal: 'Burung kutilang', satuan: 'Ekor', '2022': 0, '2023': 0, '2024': 0, '2025': 0, '2026': 7 },
    { no: 12, nama: 'Pythonidae', nama_lokal: 'Ular piton', satuan: 'Ekor', '2022': 0, '2023': 0, '2024': 0, '2025': 0, '2026': 1 },
    { no: 13, nama: 'Rattus tanezumi', nama_lokal: 'Tikus Rumah', satuan: 'Ekor', '2022': 0, '2023': 0, '2024': 0, '2025': 0, '2026': 42 },
    { no: 14, nama: 'Varanus salvator', nama_lokal: 'Biawak', satuan: 'Ekor', '2022': 0, '2023': 0, '2024': 0, '2025': 0, '2026': 3 }
  ],
  faunaTotals: { '2022': 5669, '2023': 7366, '2024': 7502, '2025': 6170, '2026': 6236 },
  biota: [
    { no: 1, nama: 'Scylla serrata', nama_lokal: 'Kepiting Bakau', satuan: 'Ekor', '2022': 120, '2023': 150, '2024': 180, '2025': 210, '2026': 240 },
    { no: 2, nama: 'Penaeus monodon', nama_lokal: 'Udang Windu', satuan: 'Ekor', '2022': 300, '2023': 450, '2024': 500, '2025': 480, '2026': 550 },
    { no: 3, nama: 'Mugil cephalus', nama_lokal: 'Ikan Belanak', satuan: 'Ekor', '2022': 250, '2023': 320, '2024': 410, '2025': 390, '2026': 420 }
  ],
  biotaTotals: { '2022': 670, '2023': 920, '2024': 1090, '2025': 1080, '2026': 1210 },
  area: { '2022': '1,952', '2023': '1,952', '2024': '1,952', '2025': '1,952', '2026': '2,394' }
};

export default function AdminBiodiversityIndex({ species, reports = [] }: Props) {
  const { settings } = usePage<any>().props;
  const [activeTab, setActiveTab] = useState<'Statistik' | 'ExcelTable' | 'Spesies' | 'Laporan'>('Statistik');
  const [previewTab, setPreviewTab] = useState<'rekap' | 'flora' | 'fauna' | 'biota'>('rekap');

  // Detailed Census Matrix State (Sensus Multi-Tabel Flora, Fauna, Biota)
  const [detailedMatrix, setDetailedMatrix] = useState<any>(() => {
    try {
      if (settings?.bio_data_detailed_matrix) {
        const parsed = typeof settings.bio_data_detailed_matrix === 'string'
          ? JSON.parse(settings.bio_data_detailed_matrix)
          : settings.bio_data_detailed_matrix;
        if (parsed && (parsed.flora || parsed.fauna)) return parsed;
      }
    } catch (e) {}
    return defaultDetailedCensusMatrix;
  });

  // Excel Import State
  const [excelFileName, setExcelFileName] = useState('');
  const [excelPreviewRows, setExcelPreviewRows] = useState<any[]>(() => {
    try {
      const parsed = JSON.parse(settings?.bio_data_table_excel || '[]');
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    } catch (e) {}
    return [
      { period: '2022', flora: 2350, fauna: 5669, flora_ind: 2350, fauna_ind: 5669, total: 8019, status: 'Stabil' },
      { period: '2023', flora: 1755, fauna: 7366, flora_ind: 1755, fauna_ind: 7366, total: 9121, status: 'Meningkat' },
      { period: '2024', flora: 1985, fauna: 7502, flora_ind: 1985, fauna_ind: 7502, total: 9487, status: 'Sangat Baik' },
      { period: '2025', flora: 1569, fauna: 6170, flora_ind: 1569, fauna_ind: 6170, total: 7739, status: 'Meningkat' },
      { period: '2026', flora: 2751, fauna: 6236, flora_ind: 2751, fauna_ind: 6236, total: 8987, status: 'Tinggi' },
    ];
  });
  const [excelParseSuccess, setExcelParseSuccess] = useState<string | null>(null);
  const [excelErrorMessage, setExcelErrorMessage] = useState<string | null>(null);
  const [isSavingExcel, setIsSavingExcel] = useState(false);

  // Report Form State
  const [reportTitle, setReportTitle] = useState('');
  const [reportYear, setReportYear] = useState(new Date().getFullYear().toString());
  const [reportFile, setReportFile] = useState<File | null>(null);
  const [isUploadingReport, setIsUploadingReport] = useState(false);

  // Species Form State & Editing State
  const [editingSpecies, setEditingSpecies] = useState<BiodiversitySpecies | null>(null);
  const [name, setName] = useState('');
  const [latinName, setLatinName] = useState('');
  const [category, setCategory] = useState<'Fauna' | 'Flora'>('Fauna');
  const [conservationStatus, setConservationStatus] = useState('Dilindungi - Konservasi Kawasan UBP Barru');
  const [location, setLocation] = useState('Kawasan Hutan Konservasi UBP Barru');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Statistics & Page Banner Form State
  const [stats, setStats] = useState({
    // Hero Banner Data Informasi Hayati (/biodiversity/info)
    bio_info_hero_title: settings?.bio_info_hero_title || 'Status & Indeks Keanekaragaman Hayati',
    bio_info_hero_desc: settings?.bio_info_hero_desc || 'Informasi terkait status dan kecenderungan sumber daya kehati dan sumber biologi (flora dan fauna) serta data indeks keanekaragaman hayati di wilayah PT PLN Indonesia Power UBP Barru.',
    
    // Header Data & Inventarisasi Hayati (/biodiversity/kehati-data)
    biodiversity_data_info_title: settings?.biodiversity_data_info_title || 'Informasi Terkait & Kecenderungan Sumber Data Hayati dan Sumber Biologi',
    biodiversity_data_info_desc: settings?.biodiversity_data_info_desc || 'Data inventarisasi komprehensif flora dan fauna di kawasan PLTU Barru, disertai gambar dokumentasi spesimen dan matriks tabel status perlindungan (IUCN / CITES / Regulasi LHK).',

    // 4 Statistic Cards (synced for both /biodiversity/info and /biodiversity)
    bio_stat_1_badge: settings?.bio_stat_1_badge || settings?.bio_info_stat_1_badge || '34+',
    bio_stat_1_title: settings?.bio_stat_1_title || settings?.bio_info_stat_1_title || 'Spesies Teridentifikasi',
    bio_stat_1_desc: settings?.bio_stat_1_desc || settings?.bio_info_stat_1_desc || 'Flora mangrove & fauna perlindungan teridentifikasi.',
    bio_stat_2_badge: settings?.bio_stat_2_badge || settings?.bio_info_stat_2_badge || '14.5 Ha',
    bio_stat_2_title: settings?.bio_stat_2_title || settings?.bio_info_stat_2_title || 'Area Konservasi',
    bio_stat_2_desc: settings?.bio_stat_2_desc || settings?.bio_info_stat_2_desc || 'Kawasan pesisir pantai Lampoko Barru.',
    bio_stat_3_badge: settings?.bio_stat_3_badge || settings?.bio_info_stat_3_badge || 'H (Tinggi)',
    bio_stat_3_title: settings?.bio_stat_3_title || settings?.bio_info_stat_3_title || 'Indeks Shannon-Wiener',
    bio_stat_3_desc: settings?.bio_stat_3_desc || settings?.bio_info_stat_3_desc || 'Keanekaragaman ekosistem perairan tergolong tinggi.',
    bio_stat_4_badge: settings?.bio_stat_4_badge || settings?.bio_info_stat_4_badge || 'Stabil',
    bio_stat_4_title: settings?.bio_stat_4_title || settings?.bio_info_stat_4_title || 'Tren Populasi',
    bio_stat_4_desc: settings?.bio_stat_4_desc || settings?.bio_info_stat_4_desc || 'Kecenderungan populasi satwa tetap stabil/meningkat.',

    // 4 Kartu Metrik Indeks Kehati (/biodiversity/kehati-indeks)
    bio_data_stat_1_badge: settings?.bio_data_stat_1_badge || "H' > 3.0",
    bio_data_stat_1_title: settings?.bio_data_stat_1_title || 'Indeks Shannon-Wiener (Flora)',
    bio_data_stat_1_value: settings?.bio_data_stat_1_value || '3.42',
    bio_data_stat_1_desc: settings?.bio_data_stat_1_desc || 'Kategori Keanekaragaman Tinggi (Sangat Baik)',

    bio_data_stat_2_badge: settings?.bio_data_stat_2_badge || "H' > 3.0",
    bio_data_stat_2_title: settings?.bio_data_stat_2_title || 'Indeks Shannon-Wiener (Fauna)',
    bio_data_stat_2_value: settings?.bio_data_stat_2_value || '3.12',
    bio_data_stat_2_desc: settings?.bio_data_stat_2_desc || 'Keanekaragaman fauna pesisir terkelola stabil',

    bio_data_stat_3_badge: settings?.bio_data_stat_3_badge || 'E > 0.75',
    bio_data_stat_3_title: settings?.bio_data_stat_3_title || 'Indeks Kemerataan (E)',
    bio_data_stat_3_value: settings?.bio_data_stat_3_value || '0.94',
    bio_data_stat_3_desc: settings?.bio_data_stat_3_desc || 'Penyebaran antar spesies sangat merata',

    bio_data_stat_4_badge: settings?.bio_data_stat_4_badge || 'D < 0.15',
    bio_data_stat_4_title: settings?.bio_data_stat_4_title || 'Indeks Dominansi (D)',
    bio_data_stat_4_value: settings?.bio_data_stat_4_value || '0.06',
    bio_data_stat_4_desc: settings?.bio_data_stat_4_desc || 'Tidak ada spesies yang mendominasi secara ekstrem',
    
    // Bio Data Graphic Fields
    bio_data_chart1_title: settings?.bio_data_chart1_title || 'Grafik Kecenderungan Peningkatan Absolut (2022 – 2026)',
    bio_data_chart1_badge: settings?.bio_data_chart1_badge || 'Status: Tren Bersifat Fluktuatif',
    bio_data_index_history: settings?.bio_data_index_history || '',
    bio_data_chart2_title: settings?.bio_data_chart2_title || 'Grafik Tren Jumlah Individu (2022 – 2026)',
    bio_data_chart2_badge: settings?.bio_data_chart2_badge || 'Status: Populasi Berkembang Positif',
    bio_data_seasonal_trend: settings?.bio_data_seasonal_trend || settings?.bio_data_individual_history || '',
    bio_data_table_excel: settings?.bio_data_table_excel || '',
  });

  const handleStatChange = (key: keyof typeof stats, value: string) => {
    setStats((prev) => ({ ...prev, [key]: value }));
  };

  // Fallback data default tahunan
  const defaultYearlyData = [
    { period: '2022', flora: 2300, fauna: 5600, flora_ind: 1420, fauna_ind: 380, total: 1800, status: 'Stabil' },
    { period: '2023', flora: 1800, fauna: 7200, flora_ind: 1850, fauna_ind: 460, total: 2310, status: 'Meningkat' },
    { period: '2024', flora: 1950, fauna: 7502, flora_ind: 2340, fauna_ind: 590, total: 2930, status: 'Sangat Baik' },
    { period: '2025', flora: 1600, fauna: 6300, flora_ind: 2980, fauna_ind: 740, total: 3720, status: 'Meningkat' },
    { period: '2026', flora: 2700, fauna: 4100, flora_ind: 3650, fauna_ind: 920, total: 4570, status: 'Tinggi' },
  ];

  // State Baris Data Tahunan (yang ditampilkan di grafik & tooltip hitam)
  const [yearlyRows, setYearlyRows] = useState<any[]>(() => {
    try {
      if (settings?.bio_data_table_excel) {
        const parsed = JSON.parse(settings.bio_data_table_excel);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      if (settings?.bio_data_index_history) {
        const idxHistory = JSON.parse(settings.bio_data_index_history);
        const indHistory = settings?.bio_data_individual_history ? JSON.parse(settings.bio_data_individual_history) : [];
        if (Array.isArray(idxHistory) && idxHistory.length > 0) {
          return idxHistory.map((item: any, i: number) => {
            const ind = indHistory.find((x: any) => String(x.period) === String(item.period)) || indHistory[i] || {};
            const floraInd = Number(ind.flora) || Number(ind.flora_ind) || 0;
            const faunaInd = Number(ind.fauna) || Number(ind.fauna_ind) || 0;
            return {
              period: String(item.period),
              flora: Number(item.flora) || 0,
              fauna: Number(item.fauna) || 0,
              flora_ind: floraInd,
              fauna_ind: faunaInd,
              total: Number(ind.total) || (floraInd + faunaInd),
              status: Number(item.fauna) >= 6000 ? 'Sangat Baik' : 'Stabil',
            };
          });
        }
      }
    } catch (e) {}
    return defaultYearlyData;
  });

  const handleYearlyRowChange = (index: number, field: string, val: any) => {
    setYearlyRows(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: val };
      if (field === 'flora_ind' || field === 'fauna_ind') {
        const fInd = Number(field === 'flora_ind' ? val : updated[index].flora_ind) || 0;
        const faInd = Number(field === 'fauna_ind' ? val : updated[index].fauna_ind) || 0;
        updated[index].total = fInd + faInd;
      }
      return updated;
    });
  };

  const handleAddYearlyRow = () => {
    const nextYear = yearlyRows.length > 0 
      ? String(Number(yearlyRows[yearlyRows.length - 1].period || 2026) + 1)
      : '2027';
    setYearlyRows(prev => [
      ...prev,
      { period: nextYear, flora: 2000, fauna: 5000, flora_ind: 3000, fauna_ind: 800, total: 3800, status: 'Stabil' }
    ]);
  };

  const handleRemoveYearlyRow = (index: number) => {
    if (confirm('Hapus baris data tahun ini dari grafik dan tabel?')) {
      setYearlyRows(prev => prev.filter((_, i) => i !== index));
    }
  };

  // Handler Download Template Excel Sensus Resmi (Format Multi-Tabel Sesuai Screenshot)
  const handleDownloadTemplate = () => {
    const years = ['2022', '2023', '2024', '2025', '2026*'];
    const data: any[][] = [];

    // 1. Total Flora
    data.push(['Total Flora']);
    data.push(['No', 'Nama', 'Nama lokal', 'Satuan', ...years]);
    const floraRows = detailedMatrix?.flora || defaultDetailedCensusMatrix.flora;
    floraRows.forEach((r: any, idx: number) => {
      data.push([
        r.no || idx + 1,
        r.nama || '',
        r.nama_lokal || '',
        r.satuan || 'Batang',
        Number(r['2022']) || 0,
        Number(r['2023']) || 0,
        Number(r['2024']) || 0,
        Number(r['2025']) || 0,
        Number(r['2026'] ?? r['2026*']) || 0,
      ]);
    });
    const fTot = detailedMatrix?.floraTotals || defaultDetailedCensusMatrix.floraTotals;
    data.push(['TOTAL', '', '', '', fTot['2022'] ?? 2350, fTot['2023'] ?? 1755, fTot['2024'] ?? 1985, fTot['2025'] ?? 1569, fTot['2026'] ?? 2751]);
    data.push([]);
    const aTot = detailedMatrix?.area || defaultDetailedCensusMatrix.area;
    data.push(['Status Keanekaragaman Hayati', 'Total Luasan Area Konservasi', '', 'Ha', aTot['2022'] ?? '1,952', aTot['2023'] ?? '1,952', aTot['2024'] ?? '1,952', aTot['2025'] ?? '1,952', aTot['2026'] ?? '2,394']);
    data.push([]);

    // 2. Total Fauna
    data.push(['Total Fauna']);
    data.push(['No', 'Nama', 'Nama lokal', 'Satuan', ...years]);
    const faunaRows = detailedMatrix?.fauna || defaultDetailedCensusMatrix.fauna;
    faunaRows.forEach((r: any, idx: number) => {
      data.push([
        r.no || idx + 1,
        r.nama || '',
        r.nama_lokal || '',
        r.satuan || 'Ekor',
        Number(r['2022']) || 0,
        Number(r['2023']) || 0,
        Number(r['2024']) || 0,
        Number(r['2025']) || 0,
        Number(r['2026'] ?? r['2026*']) || 0,
      ]);
    });
    const faTot = detailedMatrix?.faunaTotals || defaultDetailedCensusMatrix.faunaTotals;
    data.push(['TOTAL', '', '', '', faTot['2022'] ?? 5669, faTot['2023'] ?? 7366, faTot['2024'] ?? 7502, faTot['2025'] ?? 6170, faTot['2026'] ?? 6236]);
    data.push([]);
    data.push(['Status Keanekaragaman Hayati', 'Total Luasan Area Konservasi', '', 'Ha', aTot['2022'] ?? '1,952', aTot['2023'] ?? '1,952', aTot['2024'] ?? '1,952', aTot['2025'] ?? '1,952', aTot['2026'] ?? '2,394']);
    data.push([]);

    // 3. Biota Perairan
    data.push(['Biota Perairan']);
    data.push(['No', 'Nama', 'Nama lokal', 'Satuan', ...years]);
    const biotaRows = detailedMatrix?.biota || defaultDetailedCensusMatrix.biota;
    biotaRows.forEach((r: any, idx: number) => {
      data.push([
        r.no || idx + 1,
        r.nama || '',
        r.nama_lokal || '',
        r.satuan || 'Ekor',
        Number(r['2022']) || 0,
        Number(r['2023']) || 0,
        Number(r['2024']) || 0,
        Number(r['2025']) || 0,
        Number(r['2026'] ?? r['2026*']) || 0,
      ]);
    });
    const bTot = detailedMatrix?.biotaTotals || defaultDetailedCensusMatrix.biotaTotals;
    data.push(['TOTAL', '', '', '', bTot['2022'] ?? 670, bTot['2023'] ?? 920, bTot['2024'] ?? 1090, bTot['2025'] ?? 1080, bTot['2026'] ?? 1210]);

    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sensus Kehati PLN Barru');

    // Tambahkan juga Sheet 2 dengan ringkasan rekapitulasi tahunan
    const summarySheet = XLSX.utils.json_to_sheet(excelPreviewRows.map((r, i) => ({
      'No': i + 1,
      'Tahun': r.period,
      'Indeks Flora (H\')': r.flora,
      'Indeks Fauna (H\')': r.fauna,
      'Individu Flora': r.flora_ind ?? r.flora,
      'Individu Fauna': r.fauna_ind ?? r.fauna,
      'Total Individu': r.total,
      'Status': r.status || 'Stabil'
    })));
    XLSX.utils.book_append_sheet(wb, summarySheet, 'Rekapitulasi Tahunan');

    XLSX.writeFile(wb, 'Format_Sensus_Biodiversity_PLN_UBP_Barru.xlsx');
  };

  // Handler Upload & Parse File Excel (Mendukung Multi-Tabel Sensus Resmi & Format Flat)
  const handleExcelUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExcelErrorMessage(null);
    setExcelParseSuccess(null);

    const file = e.target.files?.[0];
    if (!file) return;

    setExcelFileName(file.name);

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const bstr = evt.target?.result;
        const wb = XLSX.read(bstr, { type: 'binary' });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];

        // Konversi sheet ke 2D array baris
        const rawRows: any[][] = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' });

        if (!rawRows || rawRows.length === 0) {
          setExcelErrorMessage('File Excel kosong atau tidak memiliki baris data.');
          return;
        }

        // Cek apakah sheet menggunakan Format Sensus Multi-Tabel (Total Flora / Total Fauna)
        let isMultiTable = false;
        for (const row of rawRows) {
          const rowStr = row.map(c => String(c).toLowerCase()).join(' ');
          if (rowStr.includes('total flora') || rowStr.includes('total fauna') || rowStr.includes('biota perairan')) {
            isMultiTable = true;
            break;
          }
        }

        if (isMultiTable) {
          let currentSection: 'flora' | 'fauna' | 'biota' | null = null;
          let yearCols: { [year: string]: number } = {};
          let colNo = 0;
          let colNama = 1;
          let colNamaLokal = 2;
          let colSatuan = 3;

          const parsedFlora: any[] = [];
          const parsedFauna: any[] = [];
          const parsedBiota: any[] = [];
          const floraTotals: { [year: string]: number } = {};
          const faunaTotals: { [year: string]: number } = {};
          const biotaTotals: { [year: string]: number } = {};
          const parsedArea: { [year: string]: string } = {};

          for (let i = 0; i < rawRows.length; i++) {
            const row = rawRows[i];
            if (!row || row.length === 0) continue;
            const rowText = row.map(c => String(c).trim()).join(' ').toLowerCase();

            // Deteksi Header Section
            if (rowText.includes('total flora')) {
              currentSection = 'flora';
              continue;
            } else if (rowText.includes('total fauna')) {
              currentSection = 'fauna';
              continue;
            } else if (rowText.includes('biota perairan')) {
              currentSection = 'biota';
              continue;
            }

            // Deteksi Header Kolom (Nama, Nama lokal, Satuan, Tahun)
            if (rowText.includes('nama') && (rowText.includes('2022') || rowText.includes('satuan') || rowText.includes('no'))) {
              yearCols = {};
              row.forEach((cellVal: any, colIdx: number) => {
                const strVal = String(cellVal).trim();
                const lowerVal = strVal.toLowerCase();
                if (lowerVal === 'no') colNo = colIdx;
                else if (lowerVal === 'nama') colNama = colIdx;
                else if (lowerVal.includes('lokal')) colNamaLokal = colIdx;
                else if (lowerVal === 'satuan') colSatuan = colIdx;

                const yearMatch = strVal.match(/(20\d{2})/);
                if (yearMatch) {
                  yearCols[yearMatch[1]] = colIdx;
                }
              });
              continue;
            }

            // Deteksi Baris TOTAL
            const firstCell = String(row[0] || '').trim().toUpperCase();
            const secondCell = String(row[1] || '').trim().toUpperCase();
            const isTotalRow = firstCell === 'TOTAL' || secondCell === 'TOTAL' || rowText.startsWith('total');
            if (isTotalRow && currentSection) {
              const detectedYears = Object.keys(yearCols).length > 0 ? Object.keys(yearCols) : ['2022', '2023', '2024', '2025', '2026'];
              const targetTot = currentSection === 'flora' ? floraTotals : (currentSection === 'fauna' ? faunaTotals : biotaTotals);
              detectedYears.forEach(yr => {
                const colIdx = yearCols[yr];
                if (colIdx !== undefined && row[colIdx] !== undefined) {
                  const val = Number(String(row[colIdx]).replace(/[^\d.-]/g, '')) || 0;
                  targetTot[yr] = val;
                }
              });
              continue;
            }

            // Deteksi Baris Luasan Area Konservasi
            if (rowText.includes('luasan area konservasi') || rowText.includes('area konservasi')) {
              const detectedYears = Object.keys(yearCols).length > 0 ? Object.keys(yearCols) : ['2022', '2023', '2024', '2025', '2026'];
              detectedYears.forEach(yr => {
                const colIdx = yearCols[yr];
                if (colIdx !== undefined && row[colIdx] !== undefined) {
                  parsedArea[yr] = String(row[colIdx]).trim();
                }
              });
              continue;
            }

            // Deteksi Baris Data Spesies
            if (currentSection) {
              const namaVal = String(row[colNama] || '').trim();
              const namaLokalVal = String(row[colNamaLokal] || '').trim();
              const noVal = row[colNo];

              if ((namaVal || namaLokalVal) && !isTotalRow && !rowText.includes('status keanekaragaman')) {
                const speciesItem: any = {
                  no: Number(noVal) || (currentSection === 'flora' ? parsedFlora.length + 1 : (currentSection === 'fauna' ? parsedFauna.length + 1 : parsedBiota.length + 1)),
                  nama: namaVal || namaLokalVal,
                  nama_lokal: namaLokalVal || namaVal,
                  satuan: String(row[colSatuan] || (currentSection === 'flora' ? 'Batang' : 'Ekor')).trim() || (currentSection === 'flora' ? 'Batang' : 'Ekor'),
                };

                const detectedYears = Object.keys(yearCols).length > 0 ? Object.keys(yearCols) : ['2022', '2023', '2024', '2025', '2026'];
                detectedYears.forEach(yr => {
                  const cIdx = yearCols[yr];
                  if (cIdx !== undefined) {
                    speciesItem[yr] = Number(String(row[cIdx] || 0).replace(/[^\d.-]/g, '')) || 0;
                  } else {
                    speciesItem[yr] = 0;
                  }
                });

                if (currentSection === 'flora') parsedFlora.push(speciesItem);
                else if (currentSection === 'fauna') parsedFauna.push(speciesItem);
                else if (currentSection === 'biota') parsedBiota.push(speciesItem);
              }
            }
          }

          const yearsList = Object.keys(yearCols).length > 0 ? Object.keys(yearCols).sort() : ['2022', '2023', '2024', '2025', '2026'];

          // Pastikan total terisi jika baris TOTAL tidak terbaca
          yearsList.forEach(yr => {
            if (!floraTotals[yr]) {
              floraTotals[yr] = parsedFlora.reduce((sum, item) => sum + (Number(item[yr]) || 0), 0);
            }
            if (!faunaTotals[yr]) {
              faunaTotals[yr] = parsedFauna.reduce((sum, item) => sum + (Number(item[yr]) || 0), 0);
            }
            if (!biotaTotals[yr]) {
              biotaTotals[yr] = parsedBiota.reduce((sum, item) => sum + (Number(item[yr]) || 0), 0);
            }
          });

          const newMatrix = {
            years: yearsList,
            flora: parsedFlora.length > 0 ? parsedFlora : defaultDetailedCensusMatrix.flora,
            floraTotals: Object.keys(floraTotals).length > 0 ? floraTotals : defaultDetailedCensusMatrix.floraTotals,
            fauna: parsedFauna.length > 0 ? parsedFauna : defaultDetailedCensusMatrix.fauna,
            faunaTotals: Object.keys(faunaTotals).length > 0 ? faunaTotals : defaultDetailedCensusMatrix.faunaTotals,
            biota: parsedBiota.length > 0 ? parsedBiota : defaultDetailedCensusMatrix.biota,
            biotaTotals: Object.keys(biotaTotals).length > 0 ? biotaTotals : defaultDetailedCensusMatrix.biotaTotals,
            area: Object.keys(parsedArea).length > 0 ? parsedArea : defaultDetailedCensusMatrix.area,
          };

          setDetailedMatrix(newMatrix);

          // Bentuk baris rekapitulasi tahunan untuk grafik & tooltip hitam
          const normalizedRows = yearsList.map(yr => {
            const fTotal = Number(newMatrix.floraTotals[yr]) || 0;
            const faTotal = Number(newMatrix.faunaTotals[yr]) || 0;
            return {
              period: yr,
              flora: fTotal,
              fauna: faTotal,
              flora_ind: fTotal,
              fauna_ind: faTotal,
              total: fTotal + faTotal,
              status: faTotal >= 6000 ? 'Sangat Baik' : (faTotal >= 4000 ? 'Meningkat' : 'Stabil')
            };
          });

          setExcelPreviewRows(normalizedRows);
          setExcelParseSuccess(`Berhasil membaca format Sensus Multi-Tabel Resmi PLN: ${newMatrix.flora.length} Flora, ${newMatrix.fauna.length} Fauna, dan ${newMatrix.biota.length} Biota Perairan dari "${file.name}". Titik grafik & tooltip tahunan otomatis tersinkronisasi.`);
          return;
        }

        // Format Flat Sederhana (Fallback)
        const rawJson: any[] = XLSX.utils.sheet_to_json(ws);
        if (!rawJson || rawJson.length === 0) {
          setExcelErrorMessage('File Excel kosong atau tidak memiliki baris data.');
          return;
        }

        const normalizedRows = rawJson.map((r, idx) => {
          const keys = Object.keys(r);
          const findVal = (terms: string[], defaultVal: any = 0) => {
            const matchedKey = keys.find(k => terms.some(t => k.toLowerCase().includes(t.toLowerCase())));
            return matchedKey ? r[matchedKey] : defaultVal;
          };

          const period = String(findVal(['tahun', 'periode', 'period', 'year'], 2022 + idx));
          const flora = Number(findVal(['indeks flora', 'flora (h\')', 'flora'], 2000)) || 0;
          const fauna = Number(findVal(['indeks fauna', 'fauna (h\')', 'fauna'], 5000)) || 0;
          const flora_ind = Number(findVal(['individu flora', 'flora individu', 'flora_ind'], 1500)) || 0;
          const fauna_ind = Number(findVal(['individu fauna', 'fauna individu', 'fauna_ind'], 500)) || 0;
          const total = Number(findVal(['total individu', 'total', 'jumlah individu'], flora_ind + fauna_ind)) || (flora_ind + fauna_ind);
          const status = String(findVal(['status', 'kategori', 'keterangan'], 'Stabil'));

          return {
            period,
            flora,
            fauna,
            flora_ind,
            fauna_ind,
            total,
            status,
          };
        });

        setExcelPreviewRows(normalizedRows);
        setExcelParseSuccess(`Berhasil membaca ${normalizedRows.length} baris data dari file "${file.name}". Silakan tinjau dan klik "Simpan & Terapkan Data ke Website".`);
      } catch (err: any) {
        setExcelErrorMessage(`Gagal membaca file Excel: ${err?.message || 'Format tidak valid'}`);
      }
    };

    reader.onerror = () => {
      setExcelErrorMessage('Gagal membaca file dari komputer.');
    };

    reader.readAsBinaryString(file);
  };

  // Handler Simpan Excel ke Database
  const handleSaveExcelData = () => {
    if (!excelPreviewRows || excelPreviewRows.length === 0) return;
    setIsSavingExcel(true);

    const indexHistory = excelPreviewRows.map(r => ({
      period: r.period,
      flora: r.flora,
      fauna: r.fauna,
    }));

    const individualHistory = excelPreviewRows.map(r => ({
      period: r.period,
      flora: r.flora_ind,
      fauna: r.fauna_ind,
      total: r.total,
    }));

    const payload: any = {
      bio_data_index_history: JSON.stringify(indexHistory),
      bio_data_individual_history: JSON.stringify(individualHistory),
      bio_data_seasonal_trend: JSON.stringify(individualHistory),
      bio_data_table_excel: JSON.stringify(excelPreviewRows),
    };

    if (detailedMatrix) {
      payload.bio_data_detailed_matrix = JSON.stringify(detailedMatrix);
    }

    router.post('/admin/settings', payload, {
      onSuccess: () => {
        setIsSavingExcel(false);
        setYearlyRows(excelPreviewRows);
        setExcelParseSuccess('Data Indeks Biodiversity dari Excel berhasil disimpan dan diterapkan ke halaman website!');
      },
      onError: () => {
        setIsSavingExcel(false);
        setExcelErrorMessage('Gagal menyimpan data ke database.');
      }
    });
  };

  const handleStatsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Serialisasi data baris grafik tahunan
    const indexHistory = yearlyRows.map(r => ({
      period: String(r.period),
      flora: Number(r.flora) || 0,
      fauna: Number(r.fauna) || 0,
    }));

    const individualHistory = yearlyRows.map(r => ({
      period: String(r.period),
      flora: Number(r.flora_ind) || 0,
      fauna: Number(r.fauna_ind) || 0,
      total: Number(r.total) || (Number(r.flora_ind || 0) + Number(r.fauna_ind || 0)),
    }));

    // Synchronize both bio_stat and bio_info_stat keys and yearly graph data
    const payload: any = {
      ...stats,
      bio_data_index_history: JSON.stringify(indexHistory),
      bio_data_individual_history: JSON.stringify(individualHistory),
      bio_data_seasonal_trend: JSON.stringify(individualHistory),
      bio_data_table_excel: JSON.stringify(yearlyRows),
      bio_info_stat_1_badge: stats.bio_stat_1_badge,
      bio_info_stat_1_title: stats.bio_stat_1_title,
      bio_info_stat_1_desc: stats.bio_stat_1_desc,
      bio_info_stat_2_badge: stats.bio_stat_2_badge,
      bio_info_stat_2_title: stats.bio_stat_2_title,
      bio_info_stat_2_desc: stats.bio_stat_2_desc,
      bio_info_stat_3_badge: stats.bio_stat_3_badge,
      bio_info_stat_3_title: stats.bio_stat_3_title,
      bio_info_stat_3_desc: stats.bio_stat_3_desc,
      bio_info_stat_4_badge: stats.bio_stat_4_badge,
      bio_info_stat_4_title: stats.bio_stat_4_title,
      bio_info_stat_4_desc: stats.bio_stat_4_desc,
    };

    if (detailedMatrix) {
      payload.bio_data_detailed_matrix = JSON.stringify(detailedMatrix);
    }

    router.post('/admin/settings', payload);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleEditSpecies = (sp: BiodiversitySpecies) => {
    setEditingSpecies(sp);
    setName(sp.name);
    setLatinName(sp.latin_name || '');
    setCategory(sp.category as 'Fauna' | 'Flora');
    setConservationStatus(sp.conservation_status);
    setLocation(sp.location || '');
    setDescription(sp.description);
    setImagePreview(sp.image || null);
    setImageFile(null);
    setActiveTab('Spesies');
  };

  const handleCancelEdit = () => {
    setEditingSpecies(null);
    setName('');
    setLatinName('');
    setCategory('Fauna');
    setConservationStatus('Dilindungi - Konservasi Kawasan UBP Barru');
    setLocation('Kawasan Hutan Konservasi UBP Barru');
    setDescription('');
    setImageFile(null);
    setImagePreview(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('latin_name', latinName);
    formData.append('category', category);
    formData.append('conservation_status', conservationStatus);
    formData.append('location', location);
    formData.append('description', description);
    if (imageFile) {
      formData.append('image_file', imageFile);
    }

    if (editingSpecies) {
      router.post(`/admin/biodiversity/${editingSpecies.id}`, formData, {
        onSuccess: () => {
          handleCancelEdit();
        }
      });
    } else {
      router.post('/admin/biodiversity', formData, {
        onSuccess: () => {
          handleCancelEdit();
        }
      });
    }
  };

  const handleDelete = (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus data spesies keanekaragaman hayati ini?')) {
      router.delete(`/admin/biodiversity/${id}`);
    }
  };

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportFile) {
      alert('Silakan pilih file PDF/dokumen laporan terlebih dahulu!');
      return;
    }
    const formData = new FormData();
    formData.append('title', reportTitle);
    formData.append('year', reportYear);
    formData.append('file', reportFile);

    setIsUploadingReport(true);
    router.post('/admin/biodiversity/reports', formData, {
      onSuccess: () => {
        setReportTitle('');
        setReportYear(new Date().getFullYear().toString());
        setReportFile(null);
        setIsUploadingReport(false);
      },
      onError: () => {
        setIsUploadingReport(false);
      }
    });
  };

  const handleDeleteReport = (id: string) => {
    if (confirm('Hapus dokumen laporan konservasi ini? File fisik di server juga akan dihapus.')) {
      router.delete(`/admin/biodiversity/reports/${id}`);
    }
  };

  return (
    <AdminLayout>
      <Head title="Kelola Keanekaragaman Hayati - Admin PLN IP UBP Barru" />

      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 font-heading">Kelola Keanekaragaman Hayati (Flora & Fauna)</h1>
          <p className="text-xs text-slate-600">Atur banner halaman, statistik dashboard, grafik tahunan, katalog spesies, dan unggah laporan konservasi</p>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto">
          <button
            onClick={() => setActiveTab('Statistik')}
            className={`px-5 py-3 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'Statistik' ? 'border-emerald-500 text-emerald-600' : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Informasi Halaman & Grafik</span>
          </button>
          <button
            onClick={() => setActiveTab('ExcelTable')}
            className={`px-5 py-3 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'ExcelTable' ? 'border-emerald-500 text-emerald-600' : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            <span>Import Data Excel Indeks</span>
          </button>
          <button
            onClick={() => setActiveTab('Spesies')}
            className={`px-5 py-3 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'Spesies' ? 'border-emerald-500 text-emerald-600' : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>Katalog Spesies Terdaftar ({species.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('Laporan')}
            className={`px-5 py-3 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'Laporan' ? 'border-emerald-500 text-emerald-600' : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Laporan Konservasi PDF ({reports.length})</span>
          </button>
        </div>

        {activeTab === 'Statistik' && (
          <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-8">
            <form onSubmit={handleStatsSubmit} className="space-y-8 text-xs">
              
              {/* Bagian 1: Header & Banner Halaman Data Informasi Hayati */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
                  <Globe className="w-4 h-4 text-emerald-600" />
                  <h3 className="text-sm font-bold text-slate-900 font-heading">Banner & Teks Halaman (Data & Informasi Hayati)</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-5 rounded-2xl border border-slate-200">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Judul Banner Halaman (/biodiversity/info)</label>
                    <input
                      type="text"
                      value={stats.bio_info_hero_title}
                      onChange={(e) => handleStatChange('bio_info_hero_title', e.target.value)}
                      className="w-full bg-white text-slate-900 border border-slate-300 rounded-lg px-3 py-2 text-xs"
                      placeholder="Status & Indeks Keanekaragaman Hayati"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Deskripsi Singkat Banner</label>
                    <textarea
                      rows={2}
                      value={stats.bio_info_hero_desc}
                      onChange={(e) => handleStatChange('bio_info_hero_desc', e.target.value)}
                      className="w-full bg-white text-slate-900 border border-slate-300 rounded-lg px-3 py-2 text-xs"
                      placeholder="Informasi terkait status dan kecenderungan sumber daya kehati..."
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Judul Halaman Inventarisasi (/biodiversity/kehati-data)</label>
                    <input
                      type="text"
                      value={stats.biodiversity_data_info_title}
                      onChange={(e) => handleStatChange('biodiversity_data_info_title', e.target.value)}
                      className="w-full bg-white text-slate-900 border border-slate-300 rounded-lg px-3 py-2 text-xs"
                      placeholder="Informasi Terkait & Kecenderungan Sumber Data Hayati"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Deskripsi Halaman Inventarisasi</label>
                    <textarea
                      rows={2}
                      value={stats.biodiversity_data_info_desc}
                      onChange={(e) => handleStatChange('biodiversity_data_info_desc', e.target.value)}
                      className="w-full bg-white text-slate-900 border border-slate-300 rounded-lg px-3 py-2 text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Bagian 2: Kartu Statistik Ringkasan */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
                  <LayoutDashboard className="w-4 h-4 text-emerald-600" />
                  <h3 className="text-sm font-bold text-slate-900 font-heading">4 Kartu Statistik Ringkasan Kehati</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Card 1 */}
                  <div className="p-4 border border-slate-200 rounded-2xl bg-slate-50 space-y-4 shadow-sm">
                    <div className="font-bold text-slate-800 border-b border-slate-200 pb-2">Kartu Statistik 1</div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Nilai / Angka</label>
                      <input type="text" value={stats.bio_stat_1_badge} onChange={e => handleStatChange('bio_stat_1_badge', e.target.value)} className="w-full bg-white text-slate-900 border border-slate-300 rounded-lg px-3 py-2" />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Judul</label>
                      <input type="text" value={stats.bio_stat_1_title} onChange={e => handleStatChange('bio_stat_1_title', e.target.value)} className="w-full bg-white text-slate-900 border border-slate-300 rounded-lg px-3 py-2" />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Deskripsi Singkat</label>
                      <textarea value={stats.bio_stat_1_desc} onChange={e => handleStatChange('bio_stat_1_desc', e.target.value)} rows={2} className="w-full bg-white text-slate-900 border border-slate-300 rounded-lg px-3 py-2" />
                    </div>
                  </div>

                  {/* Card 2 */}
                  <div className="p-4 border border-slate-200 rounded-2xl bg-slate-50 space-y-4 shadow-sm">
                    <div className="font-bold text-slate-800 border-b border-slate-200 pb-2">Kartu Statistik 2</div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Nilai / Angka</label>
                      <input type="text" value={stats.bio_stat_2_badge} onChange={e => handleStatChange('bio_stat_2_badge', e.target.value)} className="w-full bg-white text-slate-900 border border-slate-300 rounded-lg px-3 py-2" />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Judul</label>
                      <input type="text" value={stats.bio_stat_2_title} onChange={e => handleStatChange('bio_stat_2_title', e.target.value)} className="w-full bg-white text-slate-900 border border-slate-300 rounded-lg px-3 py-2" />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Deskripsi Singkat</label>
                      <textarea value={stats.bio_stat_2_desc} onChange={e => handleStatChange('bio_stat_2_desc', e.target.value)} rows={2} className="w-full bg-white text-slate-900 border border-slate-300 rounded-lg px-3 py-2" />
                    </div>
                  </div>

                  {/* Card 3 */}
                  <div className="p-4 border border-slate-200 rounded-2xl bg-slate-50 space-y-4 shadow-sm">
                    <div className="font-bold text-slate-800 border-b border-slate-200 pb-2">Kartu Statistik 3</div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Nilai / Angka</label>
                      <input type="text" value={stats.bio_stat_3_badge} onChange={e => handleStatChange('bio_stat_3_badge', e.target.value)} className="w-full bg-white text-slate-900 border border-slate-300 rounded-lg px-3 py-2" />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Judul</label>
                      <input type="text" value={stats.bio_stat_3_title} onChange={e => handleStatChange('bio_stat_3_title', e.target.value)} className="w-full bg-white text-slate-900 border border-slate-300 rounded-lg px-3 py-2" />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Deskripsi Singkat</label>
                      <textarea value={stats.bio_stat_3_desc} onChange={e => handleStatChange('bio_stat_3_desc', e.target.value)} rows={2} className="w-full bg-white text-slate-900 border border-slate-300 rounded-lg px-3 py-2" />
                    </div>
                  </div>

                  {/* Card 4 */}
                  <div className="p-4 border border-slate-200 rounded-2xl bg-slate-50 space-y-4 shadow-sm">
                    <div className="font-bold text-slate-800 border-b border-slate-200 pb-2">Kartu Statistik 4</div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Nilai / Angka</label>
                      <input type="text" value={stats.bio_stat_4_badge} onChange={e => handleStatChange('bio_stat_4_badge', e.target.value)} className="w-full bg-white text-slate-900 border border-slate-300 rounded-lg px-3 py-2" />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Judul</label>
                      <input type="text" value={stats.bio_stat_4_title} onChange={e => handleStatChange('bio_stat_4_title', e.target.value)} className="w-full bg-white text-slate-900 border border-slate-300 rounded-lg px-3 py-2" />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Deskripsi Singkat</label>
                      <textarea value={stats.bio_stat_4_desc} onChange={e => handleStatChange('bio_stat_4_desc', e.target.value)} rows={2} className="w-full bg-white text-slate-900 border border-slate-300 rounded-lg px-3 py-2" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Bagian 2.5: 4 Kartu Metrik Indeks Kehati (Halaman Data Indeks /biodiversity/kehati-indeks) */}
              <div className="space-y-4 pt-6 border-t-2 border-emerald-500/20 bg-emerald-50/30 p-5 rounded-3xl border">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-100 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <LayoutDashboard className="w-4 h-4 text-emerald-600" />
                      <h3 className="text-sm font-bold text-slate-900 font-heading">
                        4 Kartu Metrik Indeks Kehati (Shannon-Wiener, Kemerataan & Dominansi)
                      </h3>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Kartu statistik ini tampil di halaman <span className="font-semibold text-emerald-700">Data Indeks Keanekaragaman Hayati (/biodiversity/kehati-indeks)</span>.
                    </p>
                  </div>
                  <a
                    href="/biodiversity/kehati-indeks"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-emerald-50 text-emerald-700 rounded-xl font-bold text-xs border border-emerald-300 shadow-sm transition-colors shrink-0"
                  >
                    <span>Lihat di Web</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                  {/* Card 1: Flora */}
                  <div className="p-4 border-2 border-emerald-200/80 rounded-2xl bg-white space-y-3 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <span className="font-bold text-emerald-800 text-xs">Kartu 1: Flora</span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold">
                        {stats.bio_data_stat_1_badge || "H' > 3.0"}
                      </span>
                    </div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Judul Kartu</label>
                      <input
                        type="text"
                        value={stats.bio_data_stat_1_title}
                        onChange={e => handleStatChange('bio_data_stat_1_title', e.target.value)}
                        className="w-full bg-slate-50 text-slate-900 border border-slate-300 rounded-lg px-3 py-1.5 text-xs focus:bg-white"
                        placeholder="Indeks Shannon-Wiener (Flora)"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-slate-700 font-semibold mb-1">Nilai / Angka</label>
                        <input
                          type="text"
                          value={stats.bio_data_stat_1_value}
                          onChange={e => handleStatChange('bio_data_stat_1_value', e.target.value)}
                          className="w-full bg-slate-50 text-emerald-600 font-bold border border-slate-300 rounded-lg px-3 py-1.5 text-sm focus:bg-white"
                          placeholder="3.42"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-700 font-semibold mb-1">Badge Target</label>
                        <input
                          type="text"
                          value={stats.bio_data_stat_1_badge}
                          onChange={e => handleStatChange('bio_data_stat_1_badge', e.target.value)}
                          className="w-full bg-slate-50 text-slate-900 border border-slate-300 rounded-lg px-3 py-1.5 text-xs focus:bg-white"
                          placeholder="H' > 3.0"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Keterangan / Kategori</label>
                      <textarea
                        value={stats.bio_data_stat_1_desc}
                        onChange={e => handleStatChange('bio_data_stat_1_desc', e.target.value)}
                        rows={2}
                        className="w-full bg-slate-50 text-slate-900 border border-slate-300 rounded-lg px-3 py-1.5 text-xs focus:bg-white"
                        placeholder="Kategori Keanekaragaman Tinggi (Sangat Baik)"
                      />
                    </div>
                  </div>

                  {/* Card 2: Fauna */}
                  <div className="p-4 border-2 border-sky-200/80 rounded-2xl bg-white space-y-3 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <span className="font-bold text-sky-800 text-xs">Kartu 2: Fauna</span>
                      <span className="px-2 py-0.5 rounded-full bg-sky-100 text-sky-700 text-[10px] font-bold">
                        {stats.bio_data_stat_2_badge || "H' > 3.0"}
                      </span>
                    </div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Judul Kartu</label>
                      <input
                        type="text"
                        value={stats.bio_data_stat_2_title}
                        onChange={e => handleStatChange('bio_data_stat_2_title', e.target.value)}
                        className="w-full bg-slate-50 text-slate-900 border border-slate-300 rounded-lg px-3 py-1.5 text-xs focus:bg-white"
                        placeholder="Indeks Shannon-Wiener (Fauna)"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-slate-700 font-semibold mb-1">Nilai / Angka</label>
                        <input
                          type="text"
                          value={stats.bio_data_stat_2_value}
                          onChange={e => handleStatChange('bio_data_stat_2_value', e.target.value)}
                          className="w-full bg-slate-50 text-sky-600 font-bold border border-slate-300 rounded-lg px-3 py-1.5 text-sm focus:bg-white"
                          placeholder="3.12"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-700 font-semibold mb-1">Badge Target</label>
                        <input
                          type="text"
                          value={stats.bio_data_stat_2_badge}
                          onChange={e => handleStatChange('bio_data_stat_2_badge', e.target.value)}
                          className="w-full bg-slate-50 text-slate-900 border border-slate-300 rounded-lg px-3 py-1.5 text-xs focus:bg-white"
                          placeholder="H' > 3.0"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Keterangan / Kategori</label>
                      <textarea
                        value={stats.bio_data_stat_2_desc}
                        onChange={e => handleStatChange('bio_data_stat_2_desc', e.target.value)}
                        rows={2}
                        className="w-full bg-slate-50 text-slate-900 border border-slate-300 rounded-lg px-3 py-1.5 text-xs focus:bg-white"
                        placeholder="Keanekaragaman fauna pesisir terkelola stabil"
                      />
                    </div>
                  </div>

                  {/* Card 3: Kemerataan */}
                  <div className="p-4 border-2 border-amber-200/80 rounded-2xl bg-white space-y-3 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <span className="font-bold text-amber-800 text-xs">Kartu 3: Kemerataan (E)</span>
                      <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-[10px] font-bold">
                        {stats.bio_data_stat_3_badge || "E > 0.75"}
                      </span>
                    </div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Judul Kartu</label>
                      <input
                        type="text"
                        value={stats.bio_data_stat_3_title}
                        onChange={e => handleStatChange('bio_data_stat_3_title', e.target.value)}
                        className="w-full bg-slate-50 text-slate-900 border border-slate-300 rounded-lg px-3 py-1.5 text-xs focus:bg-white"
                        placeholder="Indeks Kemerataan (E)"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-slate-700 font-semibold mb-1">Nilai / Angka</label>
                        <input
                          type="text"
                          value={stats.bio_data_stat_3_value}
                          onChange={e => handleStatChange('bio_data_stat_3_value', e.target.value)}
                          className="w-full bg-slate-50 text-amber-500 font-bold border border-slate-300 rounded-lg px-3 py-1.5 text-sm focus:bg-white"
                          placeholder="0.94"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-700 font-semibold mb-1">Badge Target</label>
                        <input
                          type="text"
                          value={stats.bio_data_stat_3_badge}
                          onChange={e => handleStatChange('bio_data_stat_3_badge', e.target.value)}
                          className="w-full bg-slate-50 text-slate-900 border border-slate-300 rounded-lg px-3 py-1.5 text-xs focus:bg-white"
                          placeholder="E > 0.75"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Keterangan / Kategori</label>
                      <textarea
                        value={stats.bio_data_stat_3_desc}
                        onChange={e => handleStatChange('bio_data_stat_3_desc', e.target.value)}
                        rows={2}
                        className="w-full bg-slate-50 text-slate-900 border border-slate-300 rounded-lg px-3 py-1.5 text-xs focus:bg-white"
                        placeholder="Penyebaran antar spesies sangat merata"
                      />
                    </div>
                  </div>

                  {/* Card 4: Dominansi */}
                  <div className="p-4 border-2 border-indigo-200/80 rounded-2xl bg-white space-y-3 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <span className="font-bold text-indigo-800 text-xs">Kartu 4: Dominansi (D)</span>
                      <span className="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 text-[10px] font-bold">
                        {stats.bio_data_stat_4_badge || "D < 0.15"}
                      </span>
                    </div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Judul Kartu</label>
                      <input
                        type="text"
                        value={stats.bio_data_stat_4_title}
                        onChange={e => handleStatChange('bio_data_stat_4_title', e.target.value)}
                        className="w-full bg-slate-50 text-slate-900 border border-slate-300 rounded-lg px-3 py-1.5 text-xs focus:bg-white"
                        placeholder="Indeks Dominansi (D)"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-slate-700 font-semibold mb-1">Nilai / Angka</label>
                        <input
                          type="text"
                          value={stats.bio_data_stat_4_value}
                          onChange={e => handleStatChange('bio_data_stat_4_value', e.target.value)}
                          className="w-full bg-slate-50 text-indigo-600 font-bold border border-slate-300 rounded-lg px-3 py-1.5 text-sm focus:bg-white"
                          placeholder="0.06"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-700 font-semibold mb-1">Badge Target</label>
                        <input
                          type="text"
                          value={stats.bio_data_stat_4_badge}
                          onChange={e => handleStatChange('bio_data_stat_4_badge', e.target.value)}
                          className="w-full bg-slate-50 text-slate-900 border border-slate-300 rounded-lg px-3 py-1.5 text-xs focus:bg-white"
                          placeholder="D < 0.15"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Keterangan / Kategori</label>
                      <textarea
                        value={stats.bio_data_stat_4_desc}
                        onChange={e => handleStatChange('bio_data_stat_4_desc', e.target.value)}
                        rows={2}
                        className="w-full bg-slate-50 text-slate-900 border border-slate-300 rounded-lg px-3 py-1.5 text-xs focus:bg-white"
                        placeholder="Tidak ada spesies yang mendominasi secara ekstrem"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Bagian 3: Grafik Data Settings */}
              <div className="space-y-6 pt-4 border-t border-slate-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-emerald-600" />
                      <h3 className="text-sm font-bold text-slate-900 font-heading">
                        Pengaturan Data Grafik & Tooltip Hitam (Halaman Data Indeks 2022 – 2026)
                      </h3>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Kelola judul, badge status, serta titik data angka tahunan yang muncul di kurva grafik dan tooltip hitam saat di-hover.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveTab('ExcelTable')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-xl font-bold text-xs border border-emerald-200 transition-colors cursor-pointer shrink-0"
                  >
                    <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Import dari File Excel Otomatis ↗</span>
                  </button>
                </div>

                {/* Judul & Status Badge Kedua Grafik */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  <div className="p-4 border border-slate-200 rounded-2xl bg-slate-50 space-y-3">
                    <span className="font-bold text-slate-800 text-xs">Grafik 1: Kurva Indeks Kehati (Shannon-Wiener)</span>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Judul Grafik 1</label>
                      <input
                        type="text"
                        value={stats.bio_data_chart1_title}
                        onChange={e => handleStatChange('bio_data_chart1_title', e.target.value)}
                        className="w-full bg-white text-slate-900 border border-slate-300 rounded-lg px-3 py-1.5 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Badge Status (Grafik 1)</label>
                      <input
                        type="text"
                        value={stats.bio_data_chart1_badge}
                        onChange={e => handleStatChange('bio_data_chart1_badge', e.target.value)}
                        className="w-full bg-white text-slate-900 border border-slate-300 rounded-lg px-3 py-1.5 text-xs"
                      />
                    </div>
                  </div>

                  <div className="p-4 border border-slate-200 rounded-2xl bg-slate-50 space-y-3">
                    <span className="font-bold text-slate-800 text-xs">Grafik 2: Jumlah Individu Flora & Fauna</span>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Judul Grafik 2</label>
                      <input
                        type="text"
                        value={stats.bio_data_chart2_title}
                        onChange={e => handleStatChange('bio_data_chart2_title', e.target.value)}
                        className="w-full bg-white text-slate-900 border border-slate-300 rounded-lg px-3 py-1.5 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Badge Status (Grafik 2)</label>
                      <input
                        type="text"
                        value={stats.bio_data_chart2_badge}
                        onChange={e => handleStatChange('bio_data_chart2_badge', e.target.value)}
                        className="w-full bg-white text-slate-900 border border-slate-300 rounded-lg px-3 py-1.5 text-xs"
                      />
                    </div>
                  </div>
                </div>

                {/* TABEL EDITOR DATA TAHUNAN (MENGUBAH ANGKA DI GRAFIK & TOOLTIP HITAM) */}
                <div className="border border-slate-200 rounded-2xl bg-white p-5 space-y-4 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 text-[10px] font-bold">
                          EDITOR TITIK GRAFIK & TOOLTIP
                        </span>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                          Tabel Data Tahunan (Grafik 1 & 2 serta Kotak Tooltip Hitam)
                        </h4>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Ubah angka di bawah ini langsung untuk mengubah nilai kurva dan popup kotak hitam saat diarahkan ke grafik (misal tahun 2024: Fauna <strong className="text-sky-600">7,502</strong> dan Flora <strong className="text-emerald-600">1,950</strong>).
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleAddYearlyRow}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-sky-50 hover:bg-sky-100 text-sky-700 rounded-xl font-bold text-xs border border-sky-200 transition-colors shrink-0"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>+ Tambah Baris Tahun</span>
                    </button>
                  </div>

                  <div className="overflow-x-auto border border-slate-200 rounded-xl">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
                          <th className="py-2.5 px-3 whitespace-nowrap">Tahun / Periode</th>
                          <th className="py-2.5 px-3 whitespace-nowrap text-sky-700 bg-sky-50/50">
                            Indeks Fauna (H') <span className="font-normal text-[10px]">(Titik Biru / Tooltip)</span>
                          </th>
                          <th className="py-2.5 px-3 whitespace-nowrap text-emerald-700 bg-emerald-50/50">
                            Indeks Flora (H') <span className="font-normal text-[10px]">(Titik Hijau / Tooltip)</span>
                          </th>
                          <th className="py-2.5 px-3 whitespace-nowrap">Individu Fauna</th>
                          <th className="py-2.5 px-3 whitespace-nowrap">Individu Flora</th>
                          <th className="py-2.5 px-3 whitespace-nowrap">Total Individu</th>
                          <th className="py-2.5 px-3 whitespace-nowrap">Status Kategori</th>
                          <th className="py-2.5 px-2 text-center whitespace-nowrap">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-800">
                        {yearlyRows.map((row, idx) => (
                          <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                            {/* Tahun */}
                            <td className="py-2 px-3">
                              <input
                                type="text"
                                value={row.period}
                                onChange={e => handleYearlyRowChange(idx, 'period', e.target.value)}
                                className="w-20 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs font-bold text-slate-800 focus:bg-white"
                                placeholder="2024"
                              />
                            </td>

                            {/* Indeks Fauna */}
                            <td className="py-2 px-3 bg-sky-50/20">
                              <input
                                type="number"
                                value={row.fauna}
                                onChange={e => handleYearlyRowChange(idx, 'fauna', Number(e.target.value))}
                                className="w-28 bg-white border border-sky-300 rounded-lg px-2.5 py-1 text-xs font-bold text-sky-700 focus:ring-1 focus:ring-sky-500"
                                placeholder="7502"
                              />
                            </td>

                            {/* Indeks Flora */}
                            <td className="py-2 px-3 bg-emerald-50/20">
                              <input
                                type="number"
                                value={row.flora}
                                onChange={e => handleYearlyRowChange(idx, 'flora', Number(e.target.value))}
                                className="w-28 bg-white border border-emerald-300 rounded-lg px-2.5 py-1 text-xs font-bold text-emerald-700 focus:ring-1 focus:ring-emerald-500"
                                placeholder="1950"
                              />
                            </td>

                            {/* Individu Fauna */}
                            <td className="py-2 px-3">
                              <input
                                type="number"
                                value={row.fauna_ind ?? 0}
                                onChange={e => handleYearlyRowChange(idx, 'fauna_ind', Number(e.target.value))}
                                className="w-24 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs text-slate-800 focus:bg-white"
                                placeholder="590"
                              />
                            </td>

                            {/* Individu Flora */}
                            <td className="py-2 px-3">
                              <input
                                type="number"
                                value={row.flora_ind ?? 0}
                                onChange={e => handleYearlyRowChange(idx, 'flora_ind', Number(e.target.value))}
                                className="w-24 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs text-slate-800 focus:bg-white"
                                placeholder="2340"
                              />
                            </td>

                            {/* Total Individu */}
                            <td className="py-2 px-3 font-semibold text-slate-700 text-xs">
                              {Number(row.total || (Number(row.flora_ind || 0) + Number(row.fauna_ind || 0))).toLocaleString()}
                            </td>

                            {/* Status */}
                            <td className="py-2 px-3">
                              <input
                                type="text"
                                value={row.status || 'Stabil'}
                                onChange={e => handleYearlyRowChange(idx, 'status', e.target.value)}
                                className="w-24 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs text-slate-700 focus:bg-white"
                                placeholder="Sangat Baik"
                              />
                            </td>

                            {/* Hapus */}
                            <td className="py-2 px-2 text-center">
                              {yearlyRows.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => handleRemoveYearlyRow(idx)}
                                  className="p-1 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                                  title="Hapus baris tahun ini"
                                >
                                  <Trash className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <p className="text-[11px] text-slate-500 italic">
                    💡 Anda juga dapat mengimpor seluruh tabel ini sekaligus dari file Excel melalui tab <strong>"Import Data Excel Indeks"</strong> di bagian atas.
                  </p>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button type="submit" className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-lg shadow-emerald-500/20 flex items-center gap-2 cursor-pointer">
                  <Save className="w-4 h-4" />
                  Simpan Semua Pengaturan
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 2: IMPORT DATA EXCEL INDEKS BIODIVERSITY */}
        {activeTab === 'ExcelTable' && (
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-8 shadow-sm">
            
            {/* Header Tab */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold uppercase tracking-wider">
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  <span>MODUL IMPORT SPREADSHEET (EXCEL & CSV)</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-heading">
                  Unggah & Sinkronisasi Tabel Excel Data Indeks Kehati
                </h2>
                <p className="text-xs text-slate-600 max-w-3xl leading-relaxed">
                  Unggah file Excel (.xlsx / .xls / .csv) untuk secara otomatis memperbarui tabel data, grafik kecenderungan absolut, dan grafik populasi individu di halaman publik tanpa perlu memasukkan JSON secara manual.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={handleDownloadTemplate}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-xs rounded-xl border border-emerald-300 transition-colors shadow-2xs cursor-pointer"
                  title="Unduh file format Excel yang siap diisi"
                >
                  <Download className="w-4 h-4 text-emerald-600" />
                  <span>Unduh Template Excel (.xlsx)</span>
                </button>
              </div>
            </div>

            {/* Upload Zone */}
            <div className="space-y-4">
              <label className="flex flex-col items-center justify-center w-full min-h-[140px] border-2 border-emerald-400 border-dashed rounded-3xl cursor-pointer bg-emerald-50/40 hover:bg-emerald-50/80 transition-all p-6 text-center group">
                <div className="w-12 h-12 rounded-2xl bg-white text-emerald-600 border border-emerald-200 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform mb-3">
                  <Upload className="w-6 h-6 stroke-[2.5]" />
                </div>
                <p className="text-sm font-bold text-slate-900">
                  {excelFileName ? `File Terpilih: ${excelFileName}` : 'Klik untuk Pilih atau Drag & Drop File Excel (.xlsx, .xls, .csv)'}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Format kolom: Tahun, Indeks Flora (H'), Indeks Fauna (H'), Individu Flora, Individu Fauna, Total Individu, Status
                </p>
                <input
                  type="file"
                  accept=".xlsx, .xls, .csv"
                  onChange={handleExcelUpload}
                  className="hidden"
                />
              </label>

              {/* Alerts */}
              {excelParseSuccess && (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-start gap-3 animate-fadeIn">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <p className="font-bold">Berhasil Membaca File Excel</p>
                    <p>{excelParseSuccess}</p>
                  </div>
                </div>
              )}

              {excelErrorMessage && (
                <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-800 flex items-start gap-3 animate-fadeIn">
                  <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <p className="font-bold">Terjadi Kendala</p>
                    <p>{excelErrorMessage}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Table Preview */}
            <div className="space-y-4 pt-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <TableIcon className="w-4 h-4 text-emerald-600" />
                  <h3 className="text-sm font-bold text-slate-900 font-heading">
                    Preview & Verifikasi Data Sensus Kehati
                  </h3>
                </div>
                <span className="text-[11px] text-slate-500 font-medium">
                  Mendukung Format Excel Sensus Multi-Tabel (Flora, Fauna, Biota) & Rekapitulasi Tahunan
                </span>
              </div>

              {/* Sub-Tabs Selector */}
              <div className="flex items-center gap-2 border-b border-slate-200 pb-3 overflow-x-auto">
                <button
                  type="button"
                  onClick={() => setPreviewTab('rekap')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                    previewTab === 'rekap'
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <BarChart3 className="w-3.5 h-3.5" />
                  <span>📊 Rekapitulasi Tahunan (Grafik & Indeks)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewTab('flora')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                    previewTab === 'flora'
                      ? 'bg-emerald-700 text-white shadow-sm'
                      : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200'
                  }`}
                >
                  <Leaf className="w-3.5 h-3.5 text-emerald-300" />
                  <span>🌿 Sensus Flora ({(detailedMatrix?.flora || defaultDetailedCensusMatrix.flora).length} Spesies)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewTab('fauna')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                    previewTab === 'fauna'
                      ? 'bg-sky-700 text-white shadow-sm'
                      : 'bg-sky-50 text-sky-800 hover:bg-sky-100 border border-sky-200'
                  }`}
                >
                  <span>🐾 Sensus Fauna ({(detailedMatrix?.fauna || defaultDetailedCensusMatrix.fauna).length} Spesies)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewTab('biota')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                    previewTab === 'biota'
                      ? 'bg-teal-700 text-white shadow-sm'
                      : 'bg-teal-50 text-teal-800 hover:bg-teal-100 border border-teal-200'
                  }`}
                >
                  <span>🌊 Biota Perairan ({(detailedMatrix?.biota || defaultDetailedCensusMatrix.biota).length} Spesies)</span>
                </button>
              </div>

              {/* TAB 1: REKAPITULASI TAHUNAN */}
              {previewTab === 'rekap' && (
                <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs">
                  <table className="w-full text-left text-xs text-slate-700">
                    <thead className="bg-[#0b3866] text-white uppercase text-[10px] font-bold tracking-wider">
                      <tr>
                        <th className="py-3 px-4 text-center">No</th>
                        <th className="py-3 px-4">Tahun / Periode</th>
                        <th className="py-3 px-4 text-right">Indeks Flora (H')</th>
                        <th className="py-3 px-4 text-right">Indeks Fauna (H')</th>
                        <th className="py-3 px-4 text-right">Individu Flora</th>
                        <th className="py-3 px-4 text-right">Individu Fauna</th>
                        <th className="py-3 px-4 text-right">Total Individu</th>
                        <th className="py-3 px-4 text-center">Status / Tren</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      {excelPreviewRows.length === 0 ? (
                        <tr>
                          <td colSpan={8} className="py-8 text-center text-slate-400 italic">
                            Belum ada data tabel. Silakan unggah file Excel atau unduh template terlebih dahulu.
                          </td>
                        </tr>
                      ) : (
                        excelPreviewRows.map((row, idx) => (
                          <tr key={idx} className="hover:bg-slate-50 transition-colors">
                            <td className="py-3 px-4 text-center font-bold text-slate-400">{idx + 1}</td>
                            <td className="py-3 px-4 font-extrabold text-slate-900">{row.period}</td>
                            <td className="py-3 px-4 text-right font-mono font-bold text-emerald-600">
                              {Number(row.flora).toLocaleString()}
                            </td>
                            <td className="py-3 px-4 text-right font-mono font-bold text-sky-600">
                              {Number(row.fauna).toLocaleString()}
                            </td>
                            <td className="py-3 px-4 text-right font-mono text-slate-700">
                              {Number(row.flora_ind ?? row.flora).toLocaleString()}
                            </td>
                            <td className="py-3 px-4 text-right font-mono text-slate-700">
                              {Number(row.fauna_ind ?? row.fauna).toLocaleString()}
                            </td>
                            <td className="py-3 px-4 text-right font-mono font-black text-slate-900 bg-slate-50/70">
                              {Number(row.total ?? ((Number(row.flora_ind || 0) + Number(row.fauna_ind || 0)))).toLocaleString()}
                            </td>
                            <td className="py-3 px-4 text-center">
                              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                {row.status || 'Stabil'}
                              </span>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              )}

              {/* TAB 2: TOTAL FLORA */}
              {previewTab === 'flora' && (
                <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs">
                  <table className="w-full text-left text-xs text-slate-700">
                    <thead className="bg-[#0b3866] text-white uppercase text-[10px] font-bold tracking-wider">
                      <tr>
                        <th className="py-3 px-3 text-center">No</th>
                        <th className="py-3 px-4">Nama (Latin)</th>
                        <th className="py-3 px-4">Nama lokal</th>
                        <th className="py-3 px-3">Satuan</th>
                        <th className="py-3 px-3 text-right">2022</th>
                        <th className="py-3 px-3 text-right">2023</th>
                        <th className="py-3 px-3 text-right">2024</th>
                        <th className="py-3 px-3 text-right">2025</th>
                        <th className="py-3 px-3 text-right">2026*</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      {(detailedMatrix?.flora || defaultDetailedCensusMatrix.flora).map((item: any, idx: number) => (
                        <tr key={idx} className="hover:bg-slate-50 transition-colors">
                          <td className="py-2.5 px-3 text-center font-bold text-slate-400">{item.no || idx + 1}</td>
                          <td className="py-2.5 px-4 font-bold text-slate-900 italic">{item.nama}</td>
                          <td className="py-2.5 px-4 text-slate-700">{item.nama_lokal}</td>
                          <td className="py-2.5 px-3 text-slate-500">{item.satuan}</td>
                          <td className="py-2.5 px-3 text-right font-mono text-slate-800">{Number(item['2022'] || 0).toLocaleString()}</td>
                          <td className="py-2.5 px-3 text-right font-mono text-slate-800">{Number(item['2023'] || 0).toLocaleString()}</td>
                          <td className="py-2.5 px-3 text-right font-mono text-slate-800">{Number(item['2024'] || 0).toLocaleString()}</td>
                          <td className="py-2.5 px-3 text-right font-mono text-slate-800">{Number(item['2025'] || 0).toLocaleString()}</td>
                          <td className="py-2.5 px-3 text-right font-mono text-slate-800">{Number(item['2026'] ?? item['2026*'] ?? 0).toLocaleString()}</td>
                        </tr>
                      ))}
                      {/* TOTAL Row */}
                      <tr className="bg-emerald-50/90 font-black text-slate-900 border-t-2 border-emerald-600">
                        <td colSpan={4} className="py-3 px-4 text-center uppercase tracking-wider font-extrabold text-emerald-950">
                          TOTAL
                        </td>
                        <td className="py-3 px-3 text-right font-mono text-emerald-800 text-sm font-black">
                          {Number(detailedMatrix?.floraTotals?.['2022'] ?? defaultDetailedCensusMatrix.floraTotals['2022']).toLocaleString()}
                        </td>
                        <td className="py-3 px-3 text-right font-mono text-emerald-800 text-sm font-black">
                          {Number(detailedMatrix?.floraTotals?.['2023'] ?? defaultDetailedCensusMatrix.floraTotals['2023']).toLocaleString()}
                        </td>
                        <td className="py-3 px-3 text-right font-mono text-emerald-800 text-sm font-black">
                          {Number(detailedMatrix?.floraTotals?.['2024'] ?? defaultDetailedCensusMatrix.floraTotals['2024']).toLocaleString()}
                        </td>
                        <td className="py-3 px-3 text-right font-mono text-emerald-800 text-sm font-black">
                          {Number(detailedMatrix?.floraTotals?.['2025'] ?? defaultDetailedCensusMatrix.floraTotals['2025']).toLocaleString()}
                        </td>
                        <td className="py-3 px-3 text-right font-mono text-emerald-800 text-sm font-black">
                          {Number(detailedMatrix?.floraTotals?.['2026'] ?? defaultDetailedCensusMatrix.floraTotals['2026']).toLocaleString()}
                        </td>
                      </tr>
                      {/* Luasan Area Konservasi Row */}
                      <tr className="bg-slate-50 font-bold text-slate-700 text-[11px] border-t border-slate-200">
                        <td colSpan={3} className="py-2.5 px-4 text-slate-600">
                          Status Keanekaragaman Hayati / Total Luasan Area Konservasi
                        </td>
                        <td className="py-2.5 px-3 text-slate-500 font-normal">Ha</td>
                        <td className="py-2.5 px-3 text-right font-mono">{detailedMatrix?.area?.['2022'] || '1,952'}</td>
                        <td className="py-2.5 px-3 text-right font-mono">{detailedMatrix?.area?.['2023'] || '1,952'}</td>
                        <td className="py-2.5 px-3 text-right font-mono">{detailedMatrix?.area?.['2024'] || '1,952'}</td>
                        <td className="py-2.5 px-3 text-right font-mono">{detailedMatrix?.area?.['2025'] || '1,952'}</td>
                        <td className="py-2.5 px-3 text-right font-mono">{detailedMatrix?.area?.['2026'] || '2,394'}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {/* TAB 3: TOTAL FAUNA */}
              {previewTab === 'fauna' && (
                <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs">
                  <table className="w-full text-left text-xs text-slate-700">
                    <thead className="bg-[#0b3866] text-white uppercase text-[10px] font-bold tracking-wider">
                      <tr>
                        <th className="py-3 px-3 text-center">No</th>
                        <th className="py-3 px-4">Nama (Latin)</th>
                        <th className="py-3 px-4">Nama lokal</th>
                        <th className="py-3 px-3">Satuan</th>
                        <th className="py-3 px-3 text-right">2022</th>
                        <th className="py-3 px-3 text-right">2023</th>
                        <th className="py-3 px-3 text-right">2024</th>
                        <th className="py-3 px-3 text-right">2025</th>
                        <th className="py-3 px-3 text-right">2026*</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      {(detailedMatrix?.fauna || defaultDetailedCensusMatrix.fauna).map((item: any, idx: number) => (
                        <tr key={idx} className="hover:bg-slate-50 transition-colors">
                          <td className="py-2.5 px-3 text-center font-bold text-slate-400">{item.no || idx + 1}</td>
                          <td className="py-2.5 px-4 font-bold text-slate-900 italic">{item.nama}</td>
                          <td className="py-2.5 px-4 text-slate-700">{item.nama_lokal}</td>
                          <td className="py-2.5 px-3 text-slate-500">{item.satuan}</td>
                          <td className="py-2.5 px-3 text-right font-mono text-slate-800">{Number(item['2022'] || 0).toLocaleString()}</td>
                          <td className="py-2.5 px-3 text-right font-mono text-slate-800">{Number(item['2023'] || 0).toLocaleString()}</td>
                          <td className="py-2.5 px-3 text-right font-mono text-slate-800">{Number(item['2024'] || 0).toLocaleString()}</td>
                          <td className="py-2.5 px-3 text-right font-mono text-slate-800">{Number(item['2025'] || 0).toLocaleString()}</td>
                          <td className="py-2.5 px-3 text-right font-mono text-slate-800">{Number(item['2026'] ?? item['2026*'] ?? 0).toLocaleString()}</td>
                        </tr>
                      ))}
                      {/* TOTAL Row */}
                      <tr className="bg-sky-50/90 font-black text-slate-900 border-t-2 border-sky-600">
                        <td colSpan={4} className="py-3 px-4 text-center uppercase tracking-wider font-extrabold text-sky-950">
                          TOTAL
                        </td>
                        <td className="py-3 px-3 text-right font-mono text-sky-800 text-sm font-black">
                          {Number(detailedMatrix?.faunaTotals?.['2022'] ?? defaultDetailedCensusMatrix.faunaTotals['2022']).toLocaleString()}
                        </td>
                        <td className="py-3 px-3 text-right font-mono text-sky-800 text-sm font-black">
                          {Number(detailedMatrix?.faunaTotals?.['2023'] ?? defaultDetailedCensusMatrix.faunaTotals['2023']).toLocaleString()}
                        </td>
                        <td className="py-3 px-3 text-right font-mono text-sky-800 text-sm font-black">
                          {Number(detailedMatrix?.faunaTotals?.['2024'] ?? defaultDetailedCensusMatrix.faunaTotals['2024']).toLocaleString()}
                        </td>
                        <td className="py-3 px-3 text-right font-mono text-sky-800 text-sm font-black">
                          {Number(detailedMatrix?.faunaTotals?.['2025'] ?? defaultDetailedCensusMatrix.faunaTotals['2025']).toLocaleString()}
                        </td>
                        <td className="py-3 px-3 text-right font-mono text-sky-800 text-sm font-black">
                          {Number(detailedMatrix?.faunaTotals?.['2026'] ?? defaultDetailedCensusMatrix.faunaTotals['2026']).toLocaleString()}
                        </td>
                      </tr>
                      {/* Luasan Area Konservasi Row */}
                      <tr className="bg-slate-50 font-bold text-slate-700 text-[11px] border-t border-slate-200">
                        <td colSpan={3} className="py-2.5 px-4 text-slate-600">
                          Status Keanekaragaman Hayati / Total Luasan Area Konservasi
                        </td>
                        <td className="py-2.5 px-3 text-slate-500 font-normal">Ha</td>
                        <td className="py-2.5 px-3 text-right font-mono">{detailedMatrix?.area?.['2022'] || '1,952'}</td>
                        <td className="py-2.5 px-3 text-right font-mono">{detailedMatrix?.area?.['2023'] || '1,952'}</td>
                        <td className="py-2.5 px-3 text-right font-mono">{detailedMatrix?.area?.['2024'] || '1,952'}</td>
                        <td className="py-2.5 px-3 text-right font-mono">{detailedMatrix?.area?.['2025'] || '1,952'}</td>
                        <td className="py-2.5 px-3 text-right font-mono">{detailedMatrix?.area?.['2026'] || '2,394'}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {/* TAB 4: BIOTA PERAIRAN */}
              {previewTab === 'biota' && (
                <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs">
                  <table className="w-full text-left text-xs text-slate-700">
                    <thead className="bg-[#0b3866] text-white uppercase text-[10px] font-bold tracking-wider">
                      <tr>
                        <th className="py-3 px-3 text-center">No</th>
                        <th className="py-3 px-4">Nama (Latin)</th>
                        <th className="py-3 px-4">Nama lokal</th>
                        <th className="py-3 px-3">Satuan</th>
                        <th className="py-3 px-3 text-right">2022</th>
                        <th className="py-3 px-3 text-right">2023</th>
                        <th className="py-3 px-3 text-right">2024</th>
                        <th className="py-3 px-3 text-right">2025</th>
                        <th className="py-3 px-3 text-right">2026*</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      {(detailedMatrix?.biota || defaultDetailedCensusMatrix.biota).map((item: any, idx: number) => (
                        <tr key={idx} className="hover:bg-slate-50 transition-colors">
                          <td className="py-2.5 px-3 text-center font-bold text-slate-400">{item.no || idx + 1}</td>
                          <td className="py-2.5 px-4 font-bold text-slate-900 italic">{item.nama}</td>
                          <td className="py-2.5 px-4 text-slate-700">{item.nama_lokal}</td>
                          <td className="py-2.5 px-3 text-slate-500">{item.satuan}</td>
                          <td className="py-2.5 px-3 text-right font-mono text-slate-800">{Number(item['2022'] || 0).toLocaleString()}</td>
                          <td className="py-2.5 px-3 text-right font-mono text-slate-800">{Number(item['2023'] || 0).toLocaleString()}</td>
                          <td className="py-2.5 px-3 text-right font-mono text-slate-800">{Number(item['2024'] || 0).toLocaleString()}</td>
                          <td className="py-2.5 px-3 text-right font-mono text-slate-800">{Number(item['2025'] || 0).toLocaleString()}</td>
                          <td className="py-2.5 px-3 text-right font-mono text-slate-800">{Number(item['2026'] ?? item['2026*'] ?? 0).toLocaleString()}</td>
                        </tr>
                      ))}
                      {/* TOTAL Row */}
                      <tr className="bg-teal-50/90 font-black text-slate-900 border-t-2 border-teal-600">
                        <td colSpan={4} className="py-3 px-4 text-center uppercase tracking-wider font-extrabold text-teal-950">
                          TOTAL
                        </td>
                        <td className="py-3 px-3 text-right font-mono text-teal-800 text-sm font-black">
                          {Number(detailedMatrix?.biotaTotals?.['2022'] ?? defaultDetailedCensusMatrix.biotaTotals['2022']).toLocaleString()}
                        </td>
                        <td className="py-3 px-3 text-right font-mono text-teal-800 text-sm font-black">
                          {Number(detailedMatrix?.biotaTotals?.['2023'] ?? defaultDetailedCensusMatrix.biotaTotals['2023']).toLocaleString()}
                        </td>
                        <td className="py-3 px-3 text-right font-mono text-teal-800 text-sm font-black">
                          {Number(detailedMatrix?.biotaTotals?.['2024'] ?? defaultDetailedCensusMatrix.biotaTotals['2024']).toLocaleString()}
                        </td>
                        <td className="py-3 px-3 text-right font-mono text-teal-800 text-sm font-black">
                          {Number(detailedMatrix?.biotaTotals?.['2025'] ?? defaultDetailedCensusMatrix.biotaTotals['2025']).toLocaleString()}
                        </td>
                        <td className="py-3 px-3 text-right font-mono text-teal-800 text-sm font-black">
                          {Number(detailedMatrix?.biotaTotals?.['2026'] ?? defaultDetailedCensusMatrix.biotaTotals['2026']).toLocaleString()}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {/* Save Button */}
              <div className="pt-4 flex items-center justify-between border-t border-slate-200">
                <span className="text-xs text-slate-500 italic">
                  Klik simpan untuk memperbarui database dan grafik website secara permanen.
                </span>
                <button
                  type="button"
                  onClick={handleSaveExcelData}
                  disabled={isSavingExcel || excelPreviewRows.length === 0}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs shadow-lg shadow-emerald-600/20 flex items-center gap-2 cursor-pointer transition-all"
                >
                  <Save className="w-4 h-4" />
                  <span>{isSavingExcel ? 'Menyimpan...' : 'Simpan & Terapkan Data ke Website'}</span>
                </button>
              </div>
            </div>

          </div>
        )}

        {activeTab === 'Spesies' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 bg-white border border-slate-200 rounded-3xl p-6 space-y-4">
              <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900 font-heading flex items-center gap-2">
                  {editingSpecies ? <Edit className="w-4 h-4 text-sky-500" /> : <Plus className="w-4 h-4 text-emerald-500" />}
                  <span>{editingSpecies ? `Edit: ${editingSpecies.name}` : 'Tambah Spesies Baru'}</span>
                </h3>
                {editingSpecies && (
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="flex items-center gap-1 text-[11px] text-red-500 hover:text-red-600 font-semibold"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Batal Edit</span>
                  </button>
                )}
              </div>

              {editingSpecies && (
                <div className="p-3 bg-sky-50 border border-sky-200 rounded-xl text-[11px] text-sky-800 flex items-center justify-between">
                  <span>Sedang mengedit data spesies <strong>{editingSpecies.name}</strong></span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Nama Lokal Spesies</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Contoh: Burung Rangkong Sulawesi"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Nama Latin (Scientific Name)</label>
                  <input
                    type="text"
                    value={latinName}
                    onChange={(e) => setLatinName(e.target.value)}
                    placeholder="Contoh: Rhyticeros cassidix"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Kategori (Fauna / Flora)</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as 'Fauna' | 'Flora')}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-sky-500"
                  >
                    <option value="Fauna">Fauna (Satwa)</option>
                    <option value="Flora">Flora (Tumbuhan/Mangrove)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Status Konservasi</label>
                  <input
                    type="text"
                    required
                    value={conservationStatus}
                    onChange={(e) => setConservationStatus(e.target.value)}
                    placeholder="Status CITES / IUCN / Permen LHK"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Lokasi Habitat</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Area Mangrove / Bufferzone UBP Barru"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-sky-500"
                  />
                </div>

                {/* Upload Foto Komputer */}
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Foto Spesies</label>
                  <div className="relative border-2 border-dashed border-slate-200 hover:border-emerald-500/50 rounded-2xl p-4 text-center bg-slate-50/60 transition-colors cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                    {imagePreview ? (
                      <div className="space-y-2">
                        <img src={imagePreview} alt="Preview" className="w-full h-32 object-cover rounded-xl border border-slate-200" />
                        <p className="text-[11px] text-emerald-600 font-bold">Klik/Seret untuk mengganti foto</p>
                      </div>
                    ) : (
                      <div className="space-y-2 py-2">
                        <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
                          <Upload className="w-5 h-5" />
                        </div>
                        <div className="text-xs text-slate-700 font-semibold">Pilih Foto dari Komputer</div>
                        <div className="text-[10px] text-slate-500">Format JPG, PNG, WEBP (Max 5MB)</div>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Deskripsi & Peran Ekologis</label>
                  <textarea
                    rows={3}
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Peran spesies dalam menjaga rantai makanan dan keanekaragaman hayati..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="submit"
                    className={`flex-1 py-3 rounded-2xl text-white font-bold text-xs shadow-lg transition-all ${
                      editingSpecies 
                        ? 'bg-sky-600 hover:bg-sky-700 shadow-sky-600/20' 
                        : 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/20'
                    }`}
                  >
                    {editingSpecies ? '✓ Simpan Perubahan Spesies' : '+ Upload & Simpan Spesies'}
                  </button>
                  {editingSpecies && (
                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      className="px-4 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs"
                    >
                      Batal
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900 font-heading">Daftar Spesies Terdaftar ({species.length})</h3>
                <span className="text-xs text-slate-500">Klik "Edit" untuk mengubah informasi spesies</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {species.map((sp) => (
                  <div key={sp.id} className="bg-white border border-slate-200 rounded-3xl p-5 space-y-3 flex flex-col justify-between hover:shadow-md transition-shadow">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold ${
                          sp.category === 'Fauna' ? 'bg-amber-500/20 text-amber-600' : 'bg-emerald-500/20 text-emerald-600'
                        }`}>
                          {sp.category}
                        </span>
                        <Leaf className="w-4 h-4 text-emerald-500" />
                      </div>
                      {sp.image && (
                        <div className="h-28 rounded-xl overflow-hidden border border-slate-100">
                          <img src={sp.image} alt={sp.name} className="w-full h-full object-cover" />
                        </div>
                      )}
                      <h4 className="text-sm font-bold text-slate-900 font-heading">{sp.name}</h4>
                      {sp.latin_name && <p className="text-xs text-sky-600 italic font-mono">{sp.latin_name}</p>}
                      <p className="text-xs text-slate-600 line-clamp-2">{sp.description}</p>
                      {sp.location && <p className="text-[11px] text-slate-400">📍 {sp.location}</p>}
                    </div>

                    <div className="border-t border-slate-200 pt-3 flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleEditSpecies(sp)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-sky-500/10 text-sky-600 hover:bg-sky-500/20 text-xs font-bold transition-colors"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDelete(sp.id)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500/20 text-xs font-bold transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Hapus</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Laporan' && (
          <div className="space-y-8">
            {/* Form Upload Laporan */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 space-y-6 shadow-sm">
              <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 font-heading">Unggah Dokumen Laporan Konservasi Baru</h3>
                  <p className="text-xs text-slate-500">File PDF ini akan otomatis tampil dan dapat diunduh oleh publik pada halaman <span className="font-semibold text-emerald-600">/biodiversity/report</span></p>
                </div>
              </div>

              <form onSubmit={handleReportSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="md:col-span-2 space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Judul Laporan</label>
                    <input
                      type="text"
                      placeholder="Contoh: Laporan Konservasi Kehati & Monitoring Satwa 2025"
                      value={reportTitle}
                      onChange={(e) => setReportTitle(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-emerald-500 transition-colors"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Tahun Publikasi</label>
                    <input
                      type="number"
                      min="2010"
                      max="2099"
                      value={reportYear}
                      onChange={(e) => setReportYear(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-emerald-500 transition-colors"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">File Dokumen (PDF)</label>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/60 hover:bg-slate-50 transition-colors">
                    <label className="cursor-pointer inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm">
                      <Upload className="w-4 h-4" />
                      <span>Pilih File PDF</span>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx,.xls,.xlsx"
                        onChange={(e) => setReportFile(e.target.files ? e.target.files[0] : null)}
                        className="hidden"
                        required
                      />
                    </label>
                    <div className="text-xs text-slate-600 truncate">
                      {reportFile ? (
                        <span className="font-semibold text-emerald-700 flex items-center gap-1.5">
                          📄 {reportFile.name} ({(reportFile.size / (1024 * 1024)).toFixed(2)} MB)
                        </span>
                      ) : (
                        <span>Format yang didukung: PDF, DOCX (Maksimal 25 MB)</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    disabled={isUploadingReport}
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-600/20 transition-all disabled:opacity-50"
                  >
                    <Upload className="w-4 h-4" />
                    <span>{isUploadingReport ? 'Mengunggah Laporan...' : 'Unggah & Publikasikan Laporan'}</span>
                  </button>
                </div>
              </form>
            </div>

            {/* List Laporan Yang Sudah Diunggah */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 space-y-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900 font-heading">Daftar Laporan Konservasi Aktif</h3>
                  <p className="text-xs text-slate-500">Total {reports.length} dokumen laporan tersimpan</p>
                </div>
              </div>

              {reports.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                        <th className="py-3 px-4">Nama Laporan</th>
                        <th className="py-3 px-4">Tahun</th>
                        <th className="py-3 px-4">Ukuran</th>
                        <th className="py-3 px-4 text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {reports.map((rep) => (
                        <tr key={rep.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                                <FileText className="w-5 h-5" />
                              </div>
                              <div>
                                <span className="font-bold text-slate-900 text-xs block">{rep.title}</span>
                                <span className="text-[10px] text-slate-400">Kategori: {rep.category}</span>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-xs font-bold text-emerald-600">{rep.year}</td>
                          <td className="py-4 px-4 text-xs text-slate-500">{rep.file_size}</td>
                          <td className="py-4 px-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <a
                                href={rep.file_path}
                                target="_blank"
                                rel="noreferrer"
                                className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-xl transition-colors"
                                title="Lihat / Download File"
                              >
                                <Download className="w-4 h-4" />
                              </a>
                              <button
                                onClick={() => handleDeleteReport(rep.id)}
                                className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                                title="Hapus Laporan"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="py-12 text-center space-y-3">
                  <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                    <FileText className="w-7 h-7" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-700">Belum Ada Laporan Konservasi</h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Gunakan formulir di atas untuk mengunggah dokumen laporan keanekaragaman hayati (PDF). Dokumen akan otomatis tampil di halaman publik.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

