<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\Content;

class ContentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $contents = [
            // Profile - Tentang
            [
                'section_key' => 'profile_tentang_title',
                'title' => 'Tentang PT PLN Indonesia Power UBP Barru',
                'body_text' => 'PT PLN Indonesia Power Unit Bisnis Pembangkitan Barru (UBP Barru) adalah salah satu unit pembangkit listrik andalan di Sulawesi Selatan.',
            ],
            [
                'section_key' => 'profile_tentang_description',
                'title' => 'Deskripsi Profil',
                'body_text' => 'Dengan kapasitas terpasang yang signifikan, UBP Barru berperan krusial dalam menjaga stabilitas pasokan listrik di sistem jaringan Sulawesi Selatan, Tenggara, dan Barat (Sulselrabar). Komitmen kami adalah menyediakan energi listrik yang andal, efisien, dan ramah lingkungan untuk mendukung pertumbuhan ekonomi dan kesejahteraan masyarakat.',
            ],
            
            // Profile - Visi Misi
            [
                'section_key' => 'profile_visi',
                'title' => 'Visi UBP Barru',
                'body_text' => 'Menjadi perusahaan energi terbaik yang tumbuh berkelanjutan dan berkelas dunia.',
            ],
            [
                'section_key' => 'profile_misi_1',
                'title' => 'Misi 1',
                'body_text' => 'Menyediakan energi listrik yang andal, efisien, dan ramah lingkungan.',
            ],
            [
                'section_key' => 'profile_misi_2',
                'title' => 'Misi 2',
                'body_text' => 'Mengembangkan inovasi dan teknologi untuk keunggulan operasional.',
            ],
            
            // Sustainability - CSR
            [
                'section_key' => 'sustainability_csr_title',
                'title' => 'Corporate Social Responsibility (CSR)',
                'body_text' => 'Komitmen kami terhadap pembangunan berkelanjutan dan kesejahteraan masyarakat.',
            ],
            [
                'section_key' => 'sustainability_csr_description',
                'title' => 'Deskripsi CSR',
                'body_text' => 'Program CSR UBP Barru difokuskan pada pemberdayaan ekonomi masyarakat, pelestarian lingkungan, peningkatan kualitas pendidikan, dan peningkatan kesehatan masyarakat di sekitar wilayah operasi pembangkit.',
            ],
            [
                'section_key' => 'profile_sejarah_title',
                'title' => 'Sejarah',
                'body_text' => 'Sejarah PT PLN Indonesia Power UBP Barru',
            ],
            [
                'section_key' => 'profile_sejarah_description',
                'title' => 'Deskripsi Sejarah',
                'body_text' => 'Perjalanan kami menerangi Nusantara...',
            ],
            [
                'section_key' => 'profile_struktur_title',
                'title' => 'Struktur Organisasi',
                'body_text' => 'Struktur Organisasi UBP Barru',
            ],
            [
                'section_key' => 'profile_struktur_description',
                'title' => 'Deskripsi Struktur',
                'body_text' => 'Susunan manajemen dan bidang kerja.',
            ],
            [
                'section_key' => 'profile_pimpinan_title',
                'title' => 'Pimpinan',
                'body_text' => 'Pimpinan dan Manajemen UBP Barru',
            ],
            [
                'section_key' => 'profile_pimpinan_description',
                'title' => 'Deskripsi Pimpinan',
                'body_text' => 'Profil pimpinan unit kami.',
            ],
            [
                'section_key' => 'profile_fasilitas_title',
                'title' => 'Fasilitas',
                'body_text' => 'Fasilitas Pembangkit',
            ],
            [
                'section_key' => 'profile_fasilitas_description',
                'title' => 'Deskripsi Fasilitas',
                'body_text' => 'Fasilitas yang ada di area pembangkit.',
            ],
            [
                'section_key' => 'profile_penghargaan_title',
                'title' => 'Penghargaan',
                'body_text' => 'Penghargaan dan Sertifikasi',
            ],
            [
                'section_key' => 'profile_penghargaan_description',
                'title' => 'Deskripsi Penghargaan',
                'body_text' => 'Berbagai pencapaian yang telah diraih.',
            ],
            [
                'section_key' => 'profile_humancapital_title',
                'title' => 'Human Capital',
                'body_text' => 'SDM UBP Barru',
            ],
            [
                'section_key' => 'profile_humancapital_description',
                'title' => 'Deskripsi HC',
                'body_text' => 'Pengembangan kompetensi pegawai.',
            ],
            [
                'section_key' => 'operational_profil_title',
                'title' => 'Profil Operasional',
                'body_text' => 'Profil Operasi Pembangkit',
            ],
            [
                'section_key' => 'operational_profil_description',
                'title' => 'Deskripsi Profil',
                'body_text' => 'Operasional harian unit pembangkit.',
            ],
            [
                'section_key' => 'operational_kapasitas_title',
                'title' => 'Kapasitas Terpasang',
                'body_text' => 'Kapasitas Pembangkit',
            ],
            [
                'section_key' => 'operational_kapasitas_description',
                'title' => 'Deskripsi Kapasitas',
                'body_text' => 'Kapasitas energi yang dihasilkan.',
            ],
            [
                'section_key' => 'operational_performance_title',
                'title' => 'Performance',
                'body_text' => 'Kinerja Operasional',
            ],
            [
                'section_key' => 'operational_performance_description',
                'title' => 'Deskripsi Performance',
                'body_text' => 'EAF, EFOR, dan KPI kinerja pembangkit.',
            ],
            [
                'section_key' => 'operational_unit_title',
                'title' => 'Unit Fasilitas',
                'body_text' => 'Unit Fasilitas',
            ],
            [
                'section_key' => 'operational_unit_description',
                'title' => 'Deskripsi Unit',
                'body_text' => 'Unit pembangkit utama dan pendukung.',
            ],
            [
                'section_key' => 'sustainability_commitment_title',
                'title' => 'Sustainability Commitment',
                'body_text' => 'Komitmen Berkelanjutan',
            ],
            [
                'section_key' => 'sustainability_commitment_description',
                'title' => 'Deskripsi Komitmen',
                'body_text' => 'Kebijakan IMS 2023-2026.',
            ],
            [
                'section_key' => 'sustainability_lingkungan_title',
                'title' => 'Pengelolaan Lingkungan',
                'body_text' => 'Program Proper',
            ],
            [
                'section_key' => 'sustainability_lingkungan_description',
                'title' => 'Deskripsi Lingkungan',
                'body_text' => 'Program Proper Biru & Hijau.',
            ],
            [
                'section_key' => 'sustainability_k3_title',
                'title' => 'Kesehatan & Keselamatan Kerja',
                'body_text' => 'K3 Zero Accident',
            ],
            [
                'section_key' => 'sustainability_k3_description',
                'title' => 'Deskripsi K3',
                'body_text' => 'Budaya K3 di lingkungan kerja.',
            ],
            [
                'section_key' => 'sustainability_esg_title',
                'title' => 'ESG',
                'body_text' => 'Environmental, Social, Governance',
            ],
            [
                'section_key' => 'sustainability_esg_description',
                'title' => 'Deskripsi ESG',
                'body_text' => 'Penerapan ESG di lingkungan perusahaan.',
            ],
            [
                'section_key' => 'sustainability_gender_title',
                'title' => 'Gender Mainstreaming',
                'body_text' => 'Srikandi PLN IP',
            ],
            [
                'section_key' => 'sustainability_gender_description',
                'title' => 'Deskripsi Gender',
                'body_text' => 'Peran perempuan di industri pembangkit.',
            ],
            [
                'section_key' => 'biodiversity_info_title',
                'title' => 'Status Spesies Flora & Fauna',
                'body_text' => 'Flora dan Fauna',
            ],
            [
                'section_key' => 'biodiversity_info_description',
                'title' => 'Deskripsi Spesies',
                'body_text' => 'Status perlindungan IUCN/KLHK.',
            ],
            [
                'section_key' => 'biodiversity_kehatidata_title',
                'title' => 'Data & Informasi Hayati',
                'body_text' => 'Data Sumber Hayati',
            ],
            [
                'section_key' => 'biodiversity_kehatidata_description',
                'title' => 'Deskripsi Data',
                'body_text' => 'Informasi status kecenderungan data hayati.',
            ],
            [
                'section_key' => 'biodiversity_kehatiindeks_title',
                'title' => 'Indeks Keanekaragaman Hayati',
                'body_text' => 'Indeks Shannon-Wiener',
            ],
            [
                'section_key' => 'biodiversity_kehatiindeks_description',
                'title' => 'Deskripsi Indeks',
                'body_text' => 'Visualisasi kemerataan dan dominansi.',
            ],
            [
                'section_key' => 'biodiversity_program_title',
                'title' => 'Program Biologi & Konservasi',
                'body_text' => 'Inisiatif berkelanjutan UBP Barru dalam penghijauan kawasan, perlindungan habitat penyu laut, serta restorasi mangrove pesisir.',
            ],
            [
                'section_key' => 'biodiversity_program_description',
                'title' => 'Deskripsi Program Konservasi',
                'body_text' => 'Inisiatif berkelanjutan UBP Barru dalam penghijauan kawasan, perlindungan habitat penyu laut, serta restorasi mangrove pesisir.',
            ],
            [
                'section_key' => 'biodiversity_program_section',
                'title' => 'Upaya Pelestarian Lingkungan',
                'body_text' => 'Menjaga ekosistem pesisir dan satwa dilindungi demi masa depan yang lebih baik.',
            ],
            [
                'section_key' => 'biodiversity_program_card_1',
                'title' => 'Konservasi Mangrove Lampoko',
                'body_text' => 'Penanaman dan rehabilitasi ekosistem mangrove di pesisir Lampoko sebagai benteng alami pencegah abrasi dan penyerap karbon.',
            ],
            [
                'section_key' => 'biodiversity_program_card_2',
                'title' => 'Penangkaran Penyu Laut',
                'body_text' => 'Program penetasan dan pelepasan tukik untuk mendukung pelestarian populasi penyu yang terancam punah di sekitar wilayah operasi.',
            ],
            [
                'section_key' => 'biodiversity_program_card_3',
                'title' => 'Penghijauan Kawasan Pembangkit',
                'body_text' => 'Penanaman pohon produktif dan perindang di area UBP Barru untuk menekan emisi, meningkatkan kualitas udara, serta memberikan lingkungan kerja yang asri.',
            ],
            [
                'section_key' => 'biodiversity_report_title',
                'title' => 'Laporan Konservasi',
                'body_text' => 'Laporan Kehati (PDF)',
            ],
            [
                'section_key' => 'biodiversity_report_description',
                'title' => 'Deskripsi Report',
                'body_text' => 'Laporan rutin status kehati.',
            ],
            [
                'section_key' => 'downloads_title',
                'title' => 'Download Center',
                'body_text' => 'Download Dokumen',
            ],
            [
                'section_key' => 'downloads_description',
                'title' => 'Deskripsi Download',
                'body_text' => 'Annual report, PDF ESG.',
            ],
            [
                'section_key' => 'contact_title',
                'title' => 'Hubungi Kami',
                'body_text' => 'Kontak UBP Barru',
            ],
            [
                'section_key' => 'contact_description',
                'title' => 'Deskripsi Kontak',
                'body_text' => 'Informasi alamat dan email resmi.',
            ],
        ];

        foreach ($contents as $content) {
            Content::updateOrCreate(
                ['section_key' => $content['section_key']],
                $content
            );
        }
    }
}
