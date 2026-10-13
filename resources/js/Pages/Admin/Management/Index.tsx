import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router, usePage } from '@inertiajs/react';
import { Management } from '@/Types';
import {
  UserPlus,
  Trash2,
  ShieldCheck,
  Upload,
  Image as ImageIcon,
  Save,
  CheckCircle2,
  Users,
  Maximize2,
  ArrowUpRight,
  Edit3,
  X,
  Check,
  Sparkles,
  Plus
} from 'lucide-react';
import { compressImage } from '@/Utils/imageCompressor';

interface LeaderItem {
  id: number;
  name: string;
  position: string;
  birthInfo?: string;
  photo: string;
  education?: string[];
  careerJourney?: string[];
  zone?: { left: string; width: string };
  arrowPos?: { left: string; top: string };
}

interface Props {
  leaders: Management[];
}

export default function AdminManagementIndex({ leaders }: Props) {
  const { settings } = usePage<any>().props;

  // Active Main Tab: 'cards' | 'landscape' | 'local'
  const [activeMainTab, setActiveMainTab] = useState<'cards' | 'landscape' | 'local'>('cards');

  // Board Type Selector: 'commissioners' | 'directors'
  const [boardType, setBoardType] = useState<'commissioners' | 'directors'>('commissioners');

  // Modal Editing State for Board Members
  const [editingMember, setEditingMember] = useState<LeaderItem | null>(null);
  const [editName, setEditName] = useState('');
  const [editPosition, setEditPosition] = useState('');
  const [editBirthInfo, setEditBirthInfo] = useState('');
  const [editEducation, setEditEducation] = useState('');
  const [editCareerJourney, setEditCareerJourney] = useState('');
  const [editPhotoFile, setEditPhotoFile] = useState<File | null>(null);
  const [editPhotoPreview, setEditPhotoPreview] = useState<string | null>(null);
  const [isSubmittingMember, setIsSubmittingMember] = useState(false);

  // Form Foto Lanskap Management
  const [commissionersFile, setCommissionersFile] = useState<File | null>(null);
  const [commissionersPreview, setCommissionersPreview] = useState<string | null>(null);
  const [directorsFile, setDirectorsFile] = useState<File | null>(null);
  const [directorsPreview, setDirectorsPreview] = useState<string | null>(null);
  const [isSavingLandscape, setIsSavingLandscape] = useState(false);

  // Form Tambah Pimpinan Lokal UBP Barru
  const [localName, setLocalName] = useState('');
  const [localPosition, setLocalPosition] = useState('');
  const [localBirthInfo, setLocalBirthInfo] = useState('');
  const [localEducation, setLocalEducation] = useState('');
  const [localCareerJourney, setLocalCareerJourney] = useState('');
  const [localBio, setLocalBio] = useState('');
  const [localPhotoFile, setLocalPhotoFile] = useState<File | null>(null);
  const [localPhotoPreview, setLocalPhotoPreview] = useState<string | null>(null);

  // Edit Pimpinan Lokal UBP Barru Modal
  const [editingLocalLeader, setEditingLocalLeader] = useState<Management | null>(null);
  const [editLocalName, setEditLocalName] = useState('');
  const [editLocalPosition, setEditLocalPosition] = useState('');
  const [editLocalBirthInfo, setEditLocalBirthInfo] = useState('');
  const [editLocalEducation, setEditLocalEducation] = useState('');
  const [editLocalCareerJourney, setEditLocalCareerJourney] = useState('');
  const [editLocalBio, setEditLocalBio] = useState('');
  const [editLocalPhotoFile, setEditLocalPhotoFile] = useState<File | null>(null);
  const [editLocalPhotoPreview, setEditLocalPhotoPreview] = useState<string | null>(null);
  const [isSubmittingLocalEdit, setIsSubmittingLocalEdit] = useState(false);

  // Parse commissioners list from settings (Default 7 Kartu)
  const commsList: LeaderItem[] = (() => {
    try {
      const raw = settings?.management_commissioners_data;
      if (raw) {
        const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw;
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return [
      { id: 1, name: 'Mohamad Dawam', position: 'Independent Commissioner', birthInfo: 'Kendal, 14 Oktober 1974', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80', education: ['Magister Ilmu Administrasi UI', 'Sarjana Hukum Undip'], careerJourney: ['Anggota Kompolnas RI', 'Dosen Tetap FISIP', 'Independent Commissioner PT PLN Indonesia Power'] },
      { id: 2, name: 'Arrmanatha Christiawan Nasir', position: 'Commissioner', birthInfo: 'Bangkok, 30 Desember 1971', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80', education: ['MBA University of Leicester', 'BSc University of Buckingham'], careerJourney: ['Wakil Menteri Luar Negeri RI', 'Duta Besar RI untuk PBB New York', 'Commissioner PT PLN Indonesia Power'] },
      { id: 3, name: 'Bin Nahadi', position: 'Commissioner', birthInfo: 'Jakarta, 15 Juli 1965', photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80', education: ['Magister Manajemen UI', 'Sarjana Akuntansi UI'], careerJourney: ['Direktur Pengawasan BPKP', 'Komite Audit BUMN', 'Commissioner PT PLN Indonesia Power'] },
      { id: 4, name: 'Arief Budiman', position: 'President Commissioner and Independent Commissioner', birthInfo: '-', photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80', education: ['Magister Manajemen Universitas Gadjah Mada', 'Sarjana Sastra Inggris Untag & HI Unair'], careerJourney: ['Direktur Keuangan PT Pertamina (Persero)', 'Direktur Utama Danareksa', 'President Commissioner PT PLN Indonesia Power'] },
      { id: 5, name: 'Muhammad Ali', position: 'Commissioner', birthInfo: 'Palembang, 22 April 1973', photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80', education: ['Magister Manajemen Bisnis & Keuangan', 'Sarjana Ekonomi Unsri'], careerJourney: ['Tenaga Ahli Utama KSP RI', 'Senior Advisor Tata Kelola', 'Commissioner PT PLN Indonesia Power'] },
      { id: 6, name: 'Lukman Hakim', position: 'Commissioner', birthInfo: 'Surakarta, 8 Agustus 1976', photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80', education: ['Magister Kebijakan Publik UI', 'Sarjana Teknik UGM'], careerJourney: ['Staf Khusus Kementerian BUMN', 'Komisaris PT PJB', 'Commissioner PT PLN Indonesia Power'] },
      { id: 7, name: 'Bambang Anggoro', position: 'Commissioner', birthInfo: 'Jakarta, 12 September 1978', photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80', education: ['Magister Manajemen Bisnis & Energi UI', 'Sarjana Teknik Elektro ITB'], careerJourney: ['Tenaga Ahli Madya Energi & Regulasi', 'Commissioner PT PLN Indonesia Power'] }
    ];
  })();

  // Parse directors list from settings
  const dirsList: LeaderItem[] = (() => {
    try {
      const raw = settings?.management_directors_data;
      if (raw) {
        const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw;
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return [
      { id: 1, name: 'Bernadus Sudarmanta', position: 'Direktur Utama (President Director)', birthInfo: 'Semarang, 1968', photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80', education: ['Magister Manajemen Strategik', 'Sarjana Teknik Mesin Undip'], careerJourney: ['Direktur Operasi Batu Bara PLN IP', 'GM Unit Pembangkitan PLN', 'Direktur Utama PT PLN Indonesia Power'] },
      { id: 2, name: 'Endang Astharanti', position: 'Direktur Keuangan dan Manajemen Risiko', birthInfo: 'Yogyakarta, 1972', photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80', education: ['Master of Applied Finance Macquarie University', 'Sarjana Akuntansi UGM'], careerJourney: ['Kepala Divisi Perbendaharaan PT PLN (Persero)', 'Direktur Keuangan PLN IP'] },
      { id: 3, name: 'Julita Indah', position: 'Direktur Pengembangan Bisnis dan Niaga', birthInfo: 'Jakarta, 1974', photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80', education: ['Magister Manajemen UI', 'Sarjana Teknik Elektro ITB'], careerJourney: ['VP Transisi Energi & EBT PT PLN (Persero)', 'Direktur Pengembangan Bisnis PLN IP'] },
      { id: 4, name: 'Ridho Hutomo', position: 'Direktur Manajemen Human Capital & Administrasi', birthInfo: 'Bandung, 1973', photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80', education: ['Magister Manajemen SDM', 'Sarjana Psikologi Unpad'], careerJourney: ['Kepala Divisi Talenta & Budaya PT PLN (Persero)', 'Direktur HC PLN IP'] },
      { id: 5, name: 'Moch. Padang Dirgantara', position: 'Direktur Operasi Pembangkit Batu Bara', birthInfo: 'Surabaya, 1971', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80', education: ['Magister Teknik Sistem Tenaga ITS', 'Sarjana Teknik Mesin ITS'], careerJourney: ['Senior Manager Operasi & Keandalan Pembangkitan', 'Direktur Operasi Batu Bara PLN IP'] }
    ];
  })();

  const currentCards = boardType === 'commissioners' ? commsList : dirsList;

  // Handler: Buka modal edit untuk kartu tertentu
  const handleOpenEditModal = (member: LeaderItem) => {
    setEditingMember(member);
    setEditName(member.name);
    setEditPosition(member.position);
    setEditBirthInfo(member.birthInfo || '');
    setEditEducation((member.education || []).join('\n'));
    setEditCareerJourney((member.careerJourney || []).join('\n'));
    setEditPhotoFile(null);
    setEditPhotoPreview(member.photo);
  };

  // Handler: Buka modal tambah anggota pimpinan baru
  const handleOpenAddModal = () => {
    setEditingMember({
      id: 0,
      name: '',
      position: boardType === 'commissioners' ? 'Commissioner' : 'Direktur',
      birthInfo: '',
      photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80',
      education: [],
      careerJourney: []
    });
    setEditName('');
    setEditPosition(boardType === 'commissioners' ? 'Commissioner' : 'Direktur');
    setEditBirthInfo('');
    setEditEducation('');
    setEditCareerJourney('');
    setEditPhotoFile(null);
    setEditPhotoPreview(null);
  };

  // Handler: Hapus kartu pimpinan
  const handleDeleteMember = (memberId: number, memberName: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus kartu pimpinan "${memberName}"?`)) {
      router.post('/admin/management/board-member/delete', {
        board_type: boardType,
        member_id: memberId
      });
    }
  };

  // Handler: Submit update untuk kartu anggota yang sedang diedit
  const handleSaveMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMember) return;

    setIsSubmittingMember(true);
    const formData = new FormData();
    formData.append('board_type', boardType);
    formData.append('member_id', editingMember.id.toString());
    formData.append('name', editName);
    formData.append('position', editPosition);
    formData.append('birth_info', editBirthInfo);
    formData.append('education', editEducation);
    formData.append('career_journey', editCareerJourney);
    if (editPhotoFile) {
      formData.append('photo_file', editPhotoFile);
    }

    router.post('/admin/management/board-member', formData, {
      onSuccess: () => {
        setIsSubmittingMember(false);
        setEditingMember(null);
      },
      onError: () => {
        setIsSubmittingMember(false);
      }
    });
  };

  // Handler: Simpan Foto Lanskap
  const handleSaveLandscape = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingLandscape(true);
    const formData = new FormData();
    if (commissionersFile) {
      formData.append('commissioners_photo', commissionersFile);
    }
    if (directorsFile) {
      formData.append('directors_photo', directorsFile);
    }

    router.post('/admin/management/landscape', formData, {
      onSuccess: () => {
        setIsSavingLandscape(false);
      },
      onError: () => {
        setIsSavingLandscape(false);
      }
    });
  };

  // Handler: Tambah Pimpinan Lokal
  const handleLocalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', localName);
    formData.append('position', localPosition);
    formData.append('birth_info', localBirthInfo);
    formData.append('education', localEducation);
    formData.append('career_journey', localCareerJourney);
    formData.append('bio', localBio);
    if (localPhotoFile) {
      formData.append('photo_file', localPhotoFile);
    }

    router.post('/admin/management', formData, {
      onSuccess: () => {
        setLocalName('');
        setLocalPosition('');
        setLocalBirthInfo('');
        setLocalEducation('');
        setLocalCareerJourney('');
        setLocalBio('');
        setLocalPhotoFile(null);
        setLocalPhotoPreview(null);
      }
    });
  };

  // Handler: Buka Modal Edit Pimpinan Lokal
  const handleOpenEditLocal = (ld: Management) => {
    setEditingLocalLeader(ld);
    setEditLocalName(ld.name);
    setEditLocalPosition(ld.position);
    setEditLocalBirthInfo(ld.birth_info || '');
    setEditLocalEducation(Array.isArray(ld.education) ? ld.education.join('\n') : (ld.education || ''));
    setEditLocalCareerJourney(Array.isArray(ld.career_journey) ? ld.career_journey.join('\n') : (ld.career_journey || ''));
    setEditLocalBio(ld.bio || '');
    setEditLocalPhotoFile(null);
    setEditLocalPhotoPreview(ld.photo || null);
  };

  // Handler: Simpan Edit Pimpinan Lokal
  const handleSaveLocalEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingLocalLeader) return;
    setIsSubmittingLocalEdit(true);

    const formData = new FormData();
    formData.append('name', editLocalName);
    formData.append('position', editLocalPosition);
    formData.append('birth_info', editLocalBirthInfo);
    formData.append('education', editLocalEducation);
    formData.append('career_journey', editLocalCareerJourney);
    formData.append('bio', editLocalBio);
    if (editLocalPhotoFile) {
      formData.append('photo_file', editLocalPhotoFile);
    }

    router.post(`/admin/management/${editingLocalLeader.id}`, formData, {
      onSuccess: () => {
        setIsSubmittingLocalEdit(false);
        setEditingLocalLeader(null);
      },
      onError: () => {
        setIsSubmittingLocalEdit(false);
      }
    });
  };

  const handleLocalDelete = (id: string | number) => {
    if (confirm('Apakah Anda yakin ingin menghapus data pimpinan lokal ini?')) {
      router.delete(`/admin/management/${id}`);
    }
  };

  const currentCommissionersPhoto =
    commissionersPreview ||
    settings?.management_commissioners_photo ||
    '/uploads/management/commissioners_lineup.png';

  const currentDirectorsPhoto =
    directorsPreview ||
    settings?.management_directors_photo ||
    '/uploads/management/commissioners_lineup.png';

  return (
    <AdminLayout>
      <Head title="Kelola Kartu Pimpinan & Manajemen - Admin PLN IP UBP Barru" />

      <div className="space-y-8">
        
        {/* Header Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 font-heading flex items-center gap-2">
              <Users className="w-6 h-6 text-[#008ba3]" />
              <span>Kelola Pimpinan & Struktur Manajemen</span>
            </h1>
            <p className="text-xs text-slate-600 mt-1">
              Ubah foto, nama, jabatan, serta riwayat biodata dari 6 kartu pimpinan yang tampil di website.
            </p>
          </div>
        </div>

        {/* Main Tabs Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-200">
          <button
            type="button"
            onClick={() => setActiveMainTab('cards')}
            className={`px-5 py-3 text-xs font-bold border-b-2 transition-colors flex items-center gap-2 cursor-pointer ${
              activeMainTab === 'cards'
                ? 'border-[#008ba3] text-[#008ba3] font-extrabold'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <Edit3 className="w-4 h-4" />
            <span>1. Edit 6 Kartu Pimpinan (Foto, Nama & Biodata)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveMainTab('landscape')}
            className={`px-5 py-3 text-xs font-bold border-b-2 transition-colors flex items-center gap-2 cursor-pointer ${
              activeMainTab === 'landscape'
                ? 'border-sky-500 text-sky-600 font-extrabold'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>2. Upload Foto Formasi Lanskap Bersama</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveMainTab('local')}
            className={`px-5 py-3 text-xs font-bold border-b-2 transition-colors flex items-center gap-2 cursor-pointer ${
              activeMainTab === 'local'
                ? 'border-sky-500 text-sky-600 font-extrabold'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>3. Manajemen Pimpinan UBP Barru ({leaders.length})</span>
          </button>
        </div>

        {/* TAB 1: EDIT KARTU PIMPINAN (DEWAN KOMISARIS & DIREKSI) */}
        {activeMainTab === 'cards' && (
          <div className="space-y-6">
            
            {/* Top Bar: Selector Tab Dewan Komisaris / Direksi + Tombol Tambah */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200 p-4 rounded-2xl shadow-xs">
              <div>
                <h3 className="text-sm font-bold text-slate-900 font-heading">
                  Pilih Kategori Manajemen yang Ingin Diedit:
                </h3>
                <p className="text-[11px] text-slate-500">
                  Klik tombol <strong>"Edit Kartu"</strong> pada orang yang ingin diubah foto/datanya, atau <strong>"+ Tambah Kartu"</strong> untuk menambah anggota baru.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setBoardType('commissioners')}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      boardType === 'commissioners'
                        ? 'bg-white text-[#008ba3] shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Dewan Komisaris ({commsList.length} Orang)
                  </button>
                  <button
                    type="button"
                    onClick={() => setBoardType('directors')}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      boardType === 'directors'
                        ? 'bg-white text-[#008ba3] shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Direksi ({dirsList.length} Orang)
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleOpenAddModal}
                  className="px-4 py-2.5 bg-[#008ba3] hover:bg-[#007489] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4 stroke-[2.5]" />
                  <span>+ Tambah Kartu</span>
                </button>
              </div>
            </div>

            {/* Grid Kartu Pimpinan (Otomatis menyesuaikan jumlah kartu, misal 7 kartu) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
              {currentCards.map((member, idx) => (
                <div
                  key={member.id}
                  className="bg-white border border-slate-200 rounded-3xl p-4 flex flex-col justify-between items-center text-center shadow-xs hover:shadow-md hover:border-[#008ba3]/60 transition-all duration-300 relative group"
                >
                  {/* Badge Nomor Urut */}
                  <span className="absolute top-3 left-3 text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                    #{idx + 1}
                  </span>

                  <div className="pt-2 space-y-3 w-full flex flex-col items-center">
                    {/* Foto Avatar Lingkaran */}
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-slate-100 border-2 border-slate-200 shadow-xs group-hover:scale-105 transition-transform duration-300">
                      <img
                        src={member.photo}
                        alt={member.name}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>

                    {/* Nama Lengkap & Jabatan */}
                    <div className="space-y-1 w-full px-1">
                      <h4 className="text-xs font-bold text-slate-900 font-heading line-clamp-1" title={member.name}>
                        {member.name}
                      </h4>
                      <p className="text-[10px] text-slate-500 line-clamp-2 leading-tight" title={member.position}>
                        {member.position}
                      </p>
                    </div>
                  </div>

                  {/* Tombol Aksi Edit & Hapus */}
                  <div className="pt-4 w-full flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleOpenEditModal(member)}
                      className="flex-1 py-2 bg-cyan-50 hover:bg-[#008ba3] text-[#008ba3] hover:text-white border border-cyan-200 hover:border-transparent rounded-xl text-[11px] font-bold transition-all flex items-center justify-center gap-1 cursor-pointer shadow-2xs"
                    >
                      <Edit3 className="w-3 h-3" />
                      <span>Edit</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteMember(member.id, member.name)}
                      className="p-2 bg-rose-50 hover:bg-rose-500 text-rose-600 hover:text-white border border-rose-200 hover:border-transparent rounded-xl transition-all cursor-pointer shadow-2xs"
                      title={`Hapus kartu ${member.name}`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Petunjuk Penggunaan */}
            <div className="p-4 rounded-2xl bg-cyan-50/70 border border-cyan-200/80 flex items-start gap-3 text-xs text-cyan-950">
              <Sparkles className="w-5 h-5 text-[#008ba3] shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-bold text-[#008ba3]">Keterangan Update Kartu & Popup Website:</p>
                <p className="text-slate-600 leading-relaxed">
                  Setiap penambahan, perubahan foto, nama, jabatan, atau biodata pada kartu di atas akan <strong>otomatis langsung terupdate</strong> di halaman publik <code className="bg-white px-1.5 py-0.5 rounded border border-cyan-200 font-mono text-[11px]">/profile/pimpinan</code>, baik pada deretan kartu di bawah maupun saat pengunjung mengklik foto!
                </p>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: UPLOAD FOTO FORMASI LANSKAP (6 ORANG BERSAMA) */}
        {activeMainTab === 'landscape' && (
          <form onSubmit={handleSaveLandscape} className="space-y-8">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900 font-heading">
                    Foto Formasi Lanskap Dewan Komisaris (Lineup 6 Orang)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Foto formasi landscape melebar yang ada tombol panah (↗) pada tiap orang
                  </p>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full bg-sky-50 text-sky-600 font-bold">
                  Format Lanskap
                </span>
              </div>

              {/* Preview Foto Saat Ini */}
              <div className="space-y-2">
                <div className="h-56 sm:h-72 rounded-2xl overflow-hidden bg-white border border-slate-200 flex items-center justify-center p-2 relative shadow-inner">
                  <img
                    src={currentCommissionersPhoto}
                    alt="Commissioners Landscape Preview"
                    className="max-h-full max-w-full object-contain mx-auto"
                  />
                  <div className="absolute bottom-3 left-3 bg-slate-900/80 text-white text-[11px] px-3 py-1 rounded-full backdrop-blur-md">
                    Dilengkapi 6 Titik Hotspot Panah (↗)
                  </div>
                </div>
              </div>

              {/* Upload Input */}
              <div className="max-w-md">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Unggah Foto Lanskap Baru (Ganti Foto Formasi 6 Orang)
                </label>
                <label className="cursor-pointer inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 text-xs font-bold rounded-xl transition-colors w-full">
                  <Upload className="w-4 h-4 text-sky-600" />
                  <span>Pilih File Gambar Baru</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      if (e.target.files && e.target.files[0]) {
                        const file = await compressImage(e.target.files[0]);
                        setCommissionersFile(file);
                        setCommissionersPreview(URL.createObjectURL(file));
                      }
                    }}
                    className="hidden"
                  />
                </label>
                {commissionersFile && (
                  <p className="text-[11px] text-emerald-600 font-semibold mt-1">
                    File dipilih: {commissionersFile.name}
                  </p>
                )}
              </div>
            </div>

            {/* Foto Lanskap Direksi */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900 font-heading">
                    Foto Formasi Lanskap Board of Directors (Direksi)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Foto formasi direksi untuk tab kedua
                  </p>
                </div>
              </div>

              <div className="h-44 sm:h-60 rounded-2xl overflow-hidden bg-white border border-slate-200 flex items-center justify-center p-2">
                <img
                  src={currentDirectorsPhoto}
                  alt="Directors Landscape Preview"
                  className="max-h-full max-w-full object-contain mx-auto"
                />
              </div>

              <div className="max-w-md">
                <label className="cursor-pointer inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 text-xs font-bold rounded-xl transition-colors w-full">
                  <Upload className="w-4 h-4 text-slate-600" />
                  <span>Pilih Foto Lanskap Direksi</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      if (e.target.files && e.target.files[0]) {
                        const file = await compressImage(e.target.files[0]);
                        setDirectorsFile(file);
                        setDirectorsPreview(URL.createObjectURL(file));
                      }
                    }}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSavingLandscape}
                className="px-6 py-3 bg-[#008ba3] hover:bg-[#007489] text-white font-bold text-xs rounded-xl shadow-lg shadow-cyan-600/20 flex items-center gap-2 transition-all cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>{isSavingLandscape ? 'Menyimpan...' : 'Simpan Foto Lanskap'}</span>
              </button>
            </div>
          </form>
        )}

        {/* TAB 3: DAFTAR PIMPINAN UBP BARRU (LOKAL) */}
        {activeMainTab === 'local' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-sm self-start">
              <h3 className="text-sm font-bold text-slate-900 font-heading border-b border-slate-200 pb-2 flex items-center gap-2">
                <UserPlus className="w-4 h-4 text-sky-500" />
                <span>Tambah Pimpinan UBP Barru</span>
              </h3>

              <form onSubmit={handleLocalSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Nama Lengkap & Gelar</label>
                  <input
                    type="text"
                    required
                    value={localName}
                    onChange={(e) => setLocalName(e.target.value)}
                    placeholder="Contoh: Rahmat Hidayat, S.T., M.T."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Jabatan</label>
                  <input
                    type="text"
                    required
                    value={localPosition}
                    onChange={(e) => setLocalPosition(e.target.value)}
                    placeholder="Contoh: Senior Manager UBP Barru"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Tempat & Tanggal Lahir</label>
                  <input
                    type="text"
                    value={localBirthInfo}
                    onChange={(e) => setLocalBirthInfo(e.target.value)}
                    placeholder="Contoh: Barru, 14 Oktober 1980"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Riwayat Pendidikan (1 baris per item)</label>
                  <textarea
                    rows={3}
                    value={localEducation}
                    onChange={(e) => setLocalEducation(e.target.value)}
                    placeholder="Contoh:&#10;Sarjana Teknik Industri Universitas Hasanuddin&#10;Magister Manajemen ITB"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Perjalanan Karir (1 baris per item)</label>
                  <textarea
                    rows={3}
                    value={localCareerJourney}
                    onChange={(e) => setLocalCareerJourney(e.target.value)}
                    placeholder="Contoh:&#10;Manager Pemeliharaan PLTU Barru&#10;Senior Manager UBP Barru"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Ringkasan Bio / Uraian Tugas</label>
                  <textarea
                    rows={3}
                    value={localBio}
                    onChange={(e) => setLocalBio(e.target.value)}
                    placeholder="Pengalaman dan bidang tugas pimpinan..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Foto Pimpinan</label>
                  <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-slate-300 border-dashed rounded-xl cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors">
                    <div className="flex flex-col items-center justify-center py-4">
                      <Upload className="w-5 h-5 mb-1 text-slate-500" />
                      <p className="text-[10px] text-slate-500">Klik untuk upload foto</p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={async (e) => {
                        if (e.target.files && e.target.files[0]) {
                          const file = await compressImage(e.target.files[0]);
                          setLocalPhotoFile(file);
                          setLocalPhotoPreview(URL.createObjectURL(file));
                        }
                      }}
                    />
                  </label>
                  {localPhotoPreview && (
                    <div className="mt-2 rounded-xl overflow-hidden border border-slate-200 relative aspect-square w-20 mx-auto">
                      <img src={localPhotoPreview} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full px-4 py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl shadow-lg shadow-sky-600/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>Simpan Pimpinan</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Tabel Pimpinan */}
            <div className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm overflow-hidden flex flex-col h-full">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-200">
                <h3 className="text-sm font-bold text-slate-900 font-heading">Daftar Pimpinan UBP Barru</h3>
                <span className="text-xs font-bold text-sky-600 bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
                  Total: {leaders.length} Data
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-600">
                  <thead className="text-[10px] uppercase bg-slate-50 text-slate-500">
                    <tr>
                      <th className="px-4 py-3 rounded-l-xl">Foto</th>
                      <th className="px-4 py-3">Nama & Jabatan</th>
                      <th className="px-4 py-3">Pendidikan & Karir</th>
                      <th className="px-4 py-3 text-right rounded-r-xl">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaders.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="text-center py-8 text-slate-500 italic">
                          Belum ada data pimpinan lokal.
                        </td>
                      </tr>
                    ) : (
                      leaders.map((ld) => (
                        <tr key={ld.id} className="border-b border-slate-100 hover:bg-slate-50/50">
                          <td className="px-4 py-3">
                            <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-200">
                              {ld.photo ? (
                                <img src={ld.photo} alt={ld.name} className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-slate-400">
                                  <Users className="w-4 h-4" />
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="font-bold text-slate-900">{ld.name}</div>
                            <div className="text-[11px] text-sky-600 font-medium">{ld.position}</div>
                            {ld.birth_info && (
                              <div className="text-[10px] text-slate-400">{ld.birth_info}</div>
                            )}
                          </td>
                          <td className="px-4 py-3">
                            <div className="text-[11px] text-slate-700 font-medium line-clamp-1">
                              {Array.isArray(ld.education) && ld.education.length > 0 ? (
                                `Pendidikan: ${ld.education[0]}${ld.education.length > 1 ? ` (+${ld.education.length - 1})` : ''}`
                              ) : (
                                <span className="text-slate-400 italic">Pendidikan belum diisi</span>
                              )}
                            </div>
                            <div className="text-[11px] text-slate-500 line-clamp-1">{ld.bio}</div>
                          </td>
                          <td className="px-4 py-3 text-right whitespace-nowrap">
                            <button
                              onClick={() => handleOpenEditLocal(ld)}
                              className="p-1.5 text-sky-600 hover:bg-sky-50 rounded-lg transition-colors cursor-pointer mr-1 inline-block"
                              title="Edit Biodata Lengkap"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleLocalDelete(ld.id as any)}
                              className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer inline-block"
                              title="Hapus"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* MODAL EDIT KARTU ANGGOTA (DIBUKA KETIKA KLIK "EDIT KARTU") */}
      {editingMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/75 backdrop-blur-xs animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200 flex flex-col max-h-[92vh]">
            
            {/* Modal Header */}
            <div className="bg-[#00596b] px-6 py-4 flex items-center justify-between text-white">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#ffd100] text-slate-950 flex items-center justify-center font-bold text-sm shadow-xs">
                  {editingMember.id > 0 ? `#${editingMember.id}` : '+'}
                </div>
                <div>
                  <h3 className="text-base font-bold font-heading">
                    {editingMember.id > 0
                      ? `Edit Kartu Pimpinan: ${editingMember.name}`
                      : `Tambah Kartu ${boardType === 'commissioners' ? 'Dewan Komisaris' : 'Direksi'} Baru`}
                  </h3>
                  <p className="text-[11px] text-sky-200">
                    {boardType === 'commissioners' ? 'Dewan Komisaris' : 'Direksi'}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setEditingMember(null)}
                className="w-8 h-8 rounded-lg bg-[#ffd100] hover:bg-[#ffbe00] text-slate-950 flex items-center justify-center font-black transition-transform hover:scale-105 cursor-pointer shadow-md"
                title="Tutup Modal"
              >
                <X className="w-5 h-5 stroke-[2.5]" />
              </button>
            </div>

            {/* Form Edit */}
            <form onSubmit={handleSaveMember} className="p-6 sm:p-8 overflow-y-auto space-y-5 text-xs">
              
              {/* Foto Profil Preview & Ganti Foto */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center gap-5">
                <div className="w-20 h-20 rounded-full overflow-hidden bg-white border-2 border-[#008ba3] shadow-md shrink-0">
                  <img
                    src={editPhotoPreview || editingMember.photo}
                    alt={editName}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="space-y-1.5 flex-1">
                  <label className="block font-bold text-slate-800">
                    Ganti Foto Potret
                  </label>
                  <p className="text-[11px] text-slate-500">
                    Pilih file gambar wajah/portrait dari komputer (PNG, JPG, WebP)
                  </p>
                  <label className="cursor-pointer inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border border-slate-300 rounded-xl text-slate-700 font-bold hover:bg-slate-100 transition-colors shadow-2xs">
                    <Upload className="w-3.5 h-3.5 text-[#008ba3]" />
                    <span>Upload Foto Baru</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        if (e.target.files && e.target.files[0]) {
                          const file = await compressImage(e.target.files[0]);
                          setEditPhotoFile(file);
                          setEditPhotoPreview(URL.createObjectURL(file));
                        }
                      }}
                      className="hidden"
                    />
                  </label>
                  {editPhotoFile && (
                    <p className="text-[11px] text-emerald-600 font-semibold truncate">
                      File dipilih: {editPhotoFile.name}
                    </p>
                  )}
                </div>
              </div>

              {/* Input Nama & Jabatan */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Nama Lengkap & Gelar <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    placeholder="Contoh: Arief Budiman"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900 focus:outline-none focus:border-[#008ba3]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Jabatan / Posisi <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={editPosition}
                    onChange={(e) => setEditPosition(e.target.value)}
                    placeholder="Contoh: President Commissioner and Independent Commissioner"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900 focus:outline-none focus:border-[#008ba3]"
                  />
                </div>
              </div>


              {/* Riwayat Pendidikan */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Riwayat Pendidikan (Education History)
                </label>
                <p className="text-[10px] text-slate-500 mb-1">
                  Tulis satu baris per jenjang pendidikan / universitas:
                </p>
                <textarea
                  rows={3}
                  value={editEducation}
                  onChange={(e) => setEditEducation(e.target.value)}
                  placeholder="Magister Manajemen Universitas Gadjah Mada&#10;Sarjana Sastra Inggris Universitas 17 Agustus 1945..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-[#008ba3] font-sans text-xs leading-relaxed"
                />
              </div>

              {/* Riwayat Karir */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Perjalanan Karir (Career Journey)
                </label>
                <p className="text-[10px] text-slate-500 mb-1">
                  Tulis satu baris per jabatan / pengalaman sebelumnya:
                </p>
                <textarea
                  rows={3}
                  value={editCareerJourney}
                  onChange={(e) => setEditCareerJourney(e.target.value)}
                  placeholder="Direktur Keuangan PT Pertamina (Persero)&#10;Direktur Utama PT Danareksa (Persero)&#10;President Commissioner PT PLN Indonesia Power..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-[#008ba3] font-sans text-xs leading-relaxed"
                />
              </div>

              {/* Tombol Simpan */}
              <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setEditingMember(null)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingMember}
                  className="px-6 py-2.5 bg-[#008ba3] hover:bg-[#007489] text-white font-bold rounded-xl shadow-lg shadow-cyan-600/20 flex items-center gap-2 transition-all cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>
                    {isSubmittingMember
                      ? 'Menyimpan...'
                      : editingMember.id > 0
                      ? 'Simpan Perubahan Kartu'
                      : '+ Simpan Kartu Baru'}
                  </span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* MODAL EDIT PIMPINAN LOKAL UBP BARRU (DIBUKA KETIKA KLIK EDIT PADA TABEL) */}
      {editingLocalLeader && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/75 backdrop-blur-xs animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200 flex flex-col max-h-[92vh]">
            
            {/* Modal Header */}
            <div className="bg-[#00596b] px-6 py-4 flex items-center justify-between text-white">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#ffd100] text-slate-950 flex items-center justify-center font-bold text-sm shadow-xs">
                  <Edit3 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold font-heading">
                    Edit Biodata & Riwayat: {editingLocalLeader.name}
                  </h3>
                  <p className="text-[11px] text-sky-200">
                    Pimpinan Manajemen UBP Barru
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setEditingLocalLeader(null)}
                className="w-8 h-8 rounded-lg bg-[#ffd100] hover:bg-[#ffbe00] text-slate-950 flex items-center justify-center font-black transition-transform hover:scale-105 cursor-pointer shadow-md"
                title="Tutup Modal"
              >
                <X className="w-5 h-5 stroke-[2.5]" />
              </button>
            </div>

            {/* Form Edit */}
            <form onSubmit={handleSaveLocalEdit} className="p-6 sm:p-8 overflow-y-auto space-y-5 text-xs">
              
              {/* Foto Profil Preview & Ganti Foto */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center gap-5">
                <div className="w-20 h-20 rounded-full overflow-hidden bg-white border-2 border-[#008ba3] shadow-md shrink-0">
                  <img
                    src={editLocalPhotoPreview || editingLocalLeader.photo || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80'}
                    alt={editLocalName}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="space-y-1.5 flex-1">
                  <label className="block font-bold text-slate-800">
                    Ganti Foto Potret
                  </label>
                  <p className="text-[11px] text-slate-500">
                    Pilih file foto baru (PNG, JPG, WebP)
                  </p>
                  <label className="cursor-pointer inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border border-slate-300 rounded-xl text-slate-700 font-bold hover:bg-slate-100 transition-colors shadow-2xs">
                    <Upload className="w-3.5 h-3.5 text-[#008ba3]" />
                    <span>Upload Foto Baru</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        if (e.target.files && e.target.files[0]) {
                          const file = await compressImage(e.target.files[0]);
                          setEditLocalPhotoFile(file);
                          setEditLocalPhotoPreview(URL.createObjectURL(file));
                        }
                      }}
                      className="hidden"
                    />
                  </label>
                  {editLocalPhotoFile && (
                    <p className="text-[11px] text-emerald-600 font-semibold truncate">
                      File dipilih: {editLocalPhotoFile.name}
                    </p>
                  )}
                </div>
              </div>

              {/* Input Nama & Jabatan */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Nama Lengkap & Gelar <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={editLocalName}
                    onChange={(e) => setEditLocalName(e.target.value)}
                    placeholder="Contoh: Muhammad Yasser, S.T."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900 focus:outline-none focus:border-[#008ba3]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Jabatan / Posisi <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={editLocalPosition}
                    onChange={(e) => setEditLocalPosition(e.target.value)}
                    placeholder="Contoh: Senior Manager UBP Barru"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900 focus:outline-none focus:border-[#008ba3]"
                  />
                </div>
              </div>

              {/* Place and Date of Birth */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Tempat & Tanggal Lahir (Place and Date of Birth)
                </label>
                <input
                  type="text"
                  value={editLocalBirthInfo}
                  onChange={(e) => setEditLocalBirthInfo(e.target.value)}
                  placeholder="Contoh: Barru, 14 Oktober 1980"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-[#008ba3]"
                />
              </div>

              {/* Riwayat Pendidikan (Education History) */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Riwayat Pendidikan (Education History)
                </label>
                <p className="text-[10px] text-slate-500 mb-1">
                  Tulis satu baris per jenjang pendidikan / gelar (tekan Enter untuk baris baru):
                </p>
                <textarea
                  rows={3}
                  value={editLocalEducation}
                  onChange={(e) => setEditLocalEducation(e.target.value)}
                  placeholder="Sarjana Teknik Mesin Universitas Hasanuddin&#10;Magister Manajemen..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-[#008ba3] font-sans text-xs leading-relaxed"
                />
              </div>

              {/* Riwayat Karir */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Perjalanan Karir (Career Journey)
                </label>
                <p className="text-[10px] text-slate-500 mb-1">
                  Tulis satu baris per pengalaman karir:
                </p>
                <textarea
                  rows={3}
                  value={editLocalCareerJourney}
                  onChange={(e) => setEditLocalCareerJourney(e.target.value)}
                  placeholder="Manager Pemeliharaan PLTU Barru&#10;Senior Manager UBP Barru..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-[#008ba3] font-sans text-xs leading-relaxed"
                />
              </div>

              {/* Ringkasan Bio */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Ringkasan Bio / Uraian Tugas
                </label>
                <textarea
                  rows={3}
                  value={editLocalBio}
                  onChange={(e) => setEditLocalBio(e.target.value)}
                  placeholder="Uraian tugas atau bio singkat..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-[#008ba3] font-sans text-xs leading-relaxed"
                />
              </div>

              {/* Tombol Simpan */}
              <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setEditingLocalLeader(null)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingLocalEdit}
                  className="px-6 py-2.5 bg-[#008ba3] hover:bg-[#007489] text-white font-bold rounded-xl shadow-lg shadow-cyan-600/20 flex items-center gap-2 transition-all cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>{isSubmittingLocalEdit ? 'Menyimpan...' : 'Simpan Perubahan'}</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </AdminLayout>
  );
}
