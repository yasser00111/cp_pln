<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\CompanyProfile;
use App\Models\Management;
use App\Models\Facility;
use App\Models\OperationalStatistic;
use App\Models\OperationalMetric;
use App\Models\SustainabilityProgram;
use App\Models\BiodiversitySpecies;
use App\Models\BiodiversityProgram;
use App\Models\CsrProgram;
use App\Models\SafetyProgram;
use App\Models\Award;
use App\Models\Category;
use App\Models\News;
use App\Models\Gallery;
use App\Models\Video;
use App\Models\Document;
use App\Models\Setting;
use App\Models\HeroSlider;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 0. Hero Background Sliders
        HeroSlider::create([
            'title' => 'Memberikan Energi untuk Indonesia yang Lebih Baik',
            'subtitle' => 'PT PLN Indonesia Power UBP Barru berkomitmen menghadirkan pembangkitan listrik yang andal, aman, efisien, dan berkelanjutan.',
            'image' => 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=1920&q=80',
            'cta_text' => 'Tentang Kami',
            'cta_url' => '/profile/tentang',
            'order_priority' => 1,
            'is_active' => true,
        ]);

        HeroSlider::create([
            'title' => 'Transisi Energi Bersih & Inovasi Biomassa Co-firing',
            'subtitle' => 'Mendukung program Net Zero Emission melalui substitusi batu bara dengan biomassa pelet kayu dan sekam padi lokal.',
            'image' => 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1920&q=80',
            'cta_text' => 'Program ESG & Lingkungan',
            'cta_url' => '/sustainability/commitment',
            'order_priority' => 2,
            'is_active' => true,
        ]);

        HeroSlider::create([
            'title' => 'Keandalan Operasional & Budaya K3 Zero Accident',
            'subtitle' => 'Lebih dari 1.480 hari kerja aman tanpa kecelakaan kerja melalui pengawasan SMK3 dan ISO 45001 terpadu.',
            'image' => 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1920&q=80',
            'cta_text' => 'Lihat Dashboard Performance',
            'cta_url' => '/operasional/performance',
            'order_priority' => 3,
            'is_active' => true,
        ]);

        HeroSlider::create([
            'title' => 'Konservasi Pesisir & Keanekaragaman Hayati Lampoko',
            'subtitle' => 'Penanaman 50.000 bibit mangrove dan penangkaran penyu hijau di area buffer PLTU Barru.',
            'image' => 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1920&q=80',
            'cta_text' => 'Jelajahi Biodiversity',
            'cta_url' => '/biodiversity',
            'order_priority' => 4,
            'is_active' => true,
        ]);

        // 1. Admin User
        User::create([
            'name' => 'Administrator PLN IP UBP Barru',
            'email' => 'admin@plnindonesiapower.co.id',
            'password' => Hash::make('password123'),
            'role' => 'superadmin',
        ]);

        // 2. Company Profile
        CompanyProfile::create([
            'key' => 'tentang',
            'title' => 'Tentang PT PLN Indonesia Power UBP Barru',
            'content' => 'PT PLN Indonesia Power Unit Bisnis Pembangkitan (UBP) Barru merupakan salah satu unit pembangkit strategis di bawah naungan PT PLN Indonesia Power. Berlokasi di Desa Lampoko, Kecamatan Balusu, Kabupaten Barru, Sulawesi Selatan, UBP Barru mengoperasikan Pembangkit Listrik Tenaga Uap (PLTU) yang menjadi pilar utama keandalan pasokan listrik pada Sistem Kelistrikan Sulbagsel (Sulawesi Selatan, Barat, dan Tenggara).'
        ]);

        CompanyProfile::create([
            'key' => 'visi',
            'title' => 'Visi Perusahaan',
            'content' => 'Menjadi perusahaan pembangkitan energi terdepan yang andal, efisien, bermutu tinggi, dan terpercaya dengan berorientasi pada prinsip keberlanjutan (sustainability) dan wawasan lingkungan.'
        ]);

        CompanyProfile::create([
            'key' => 'misi',
            'title' => 'Misi Perusahaan',
            'content' => json_encode([
                ['code' => '01', 'title' => 'Reliability', 'desc' => 'Menyediakan pasokan energi listrik yang andal, aman, dan berkualitas tinggi demi mendukung pertumbuhan ekonomi nasional.'],
                ['code' => '02', 'title' => 'Operational Excellence', 'desc' => 'Mengoperasikan pembangkitan dengan efisiensi optimal, inovasi teknologi terkini, dan pengawasan berbasis digital.'],
                ['code' => '03', 'title' => 'Sustainability', 'desc' => 'Menerapkan tata kelola lingkungan terpadu, penurunan emisi karbon, pemanfaatan FABA, serta perlindungan keanekaragaman hayati.'],
                ['code' => '04', 'title' => 'Innovation', 'desc' => 'Mendorong riset dan adopsi teknologi bersih (clean coal technology) serta transformasi digital sistem energi.'],
                ['code' => '05', 'title' => 'Safety First', 'desc' => 'Mengutamakan budaya K3 (Zero Accident) dan kesejahteraan tenaga kerja secara berkesinambungan.'],
            ])
        ]);

        // 3. Operational Statistics
        $stats = [
            ['metric_key' => 'capacity', 'label' => 'Kapasitas Terpasang', 'value' => '2 x 50 MW', 'numeric_value' => 100, 'unit' => 'MW', 'subtext' => 'Pilar Sistem Sulbagsel', 'order_priority' => 1],
            ['metric_key' => 'operating_year', 'label' => 'Mulai Beroperasi', 'value' => '2012', 'numeric_value' => 2012, 'unit' => 'Tahun', 'subtext' => 'Pengalaman > 13 Tahun', 'order_priority' => 2],
            ['metric_key' => 'reliability', 'label' => 'Tingkat Keandalan (EAF)', 'value' => '99.45%', 'numeric_value' => 99.45, 'unit' => '%', 'subtext' => 'Di atas Standard Nasional', 'order_priority' => 3],
            ['metric_key' => 'energy_production', 'label' => 'Produksi Energi Tahunan', 'value' => '845.2 GWh', 'numeric_value' => 845.2, 'unit' => 'GWh', 'subtext' => 'Pasokan Listrik Kontinu', 'order_priority' => 4],
            ['metric_key' => 'employees', 'label' => 'Jumlah Tenaga Kerja', 'value' => '245 Orang', 'numeric_value' => 245, 'unit' => 'Pegawai', 'subtext' => 'SDM Profesional & Tersertifikasi', 'order_priority' => 5],
            ['metric_key' => 'csr_programs', 'label' => 'Program Sustainability', 'value' => '18 Program', 'numeric_value' => 18, 'unit' => 'Program', 'subtext' => 'Bina Lingkungan & Kehati', 'order_priority' => 6],
        ];
        foreach ($stats as $st) {
            OperationalStatistic::create($st);
        }

        // 4. Operational Metrics (Charts)
        $months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
        foreach ($months as $idx => $m) {
            OperationalMetric::create([
                'period_label' => $m . ' 2025',
                'year' => 2025,
                'month' => $idx + 1,
                'energy_production_gwh' => 68.5 + sin($idx) * 5.2 + rand(1, 4),
                'availability_factor' => 98.5 + (rand(5, 12) / 10),
                'reliability_index' => 99.2 + (rand(2, 7) / 10),
                'heat_rate_kcal' => 2340 + rand(-20, 30),
            ]);
        }

        // 5. Management Leadership
        $leaders = [
            ['name' => 'Rahmat Hidayat, S.T., M.T.', 'position' => 'Senior Manager UBP Barru', 'bio' => 'Memiliki pengalaman lebih dari 20 tahun di industri pembangkitan energi PLN Group dengan keahlian operational excellence dan manajemen strategi.', 'photo' => 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80', 'order_priority' => 1],
            ['name' => 'Ahmad Fauzi, S.T.', 'position' => 'Manager Operasi', 'bio' => 'Mengawasi sistem pengoperasian PLTU 2x50 MW secara efisien dan memastikan kesiapan pasokan jaringan listrik Sulbagsel.', 'photo' => 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80', 'order_priority' => 2],
            ['name' => 'Budi Santoso, S.T.', 'position' => 'Manager Pemeliharaan', 'bio' => 'Penanggung jawab overhaul, preventive & predictive maintenance sistem turbin, boiler, dan penunjang pembangkitan.', 'photo' => 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80', 'order_priority' => 3],
            ['name' => 'Dewi Lestari, S.K.M., M.KKK', 'position' => 'Manager K3L & Lingkungan', 'bio' => 'Memimpin penerapan budaya K3 Zero Accident, pengawasan emisi, pengelolaan FABA, serta program keanekaragaman hayati.', 'photo' => 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80', 'order_priority' => 4],
            ['name' => 'Ir. Muhammad Arifin', 'position' => 'Manager Keuangan & Umum', 'bio' => 'Mengelola administrasi, keuangan, hubungan stakeholder, serta program tanggung jawab sosial lingkungan (TJSL/CSR).', 'photo' => 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80', 'order_priority' => 5],
        ];
        foreach ($leaders as $ld) {
            Management::create($ld);
        }

        // 6. Facilities
        $facilities = [
            [
                'title' => 'Steam Generator Boiler Unit 1 & 2',
                'slug' => 'boiler-unit-1-2',
                'category' => 'Main Plant',
                'description' => 'Boiler jenis Circulation Fluidized Bed (CFB) kapasitas tinggi dengan efisiensi pembakaran tinggi serta emisi NOx dan SOx yang rendah.',
                'technical_specs' => ['Tipe' => 'Circulating Fluidized Bed (CFB)', 'Kapasitas Uap' => '220 Ton/Jam', 'Tekanan Uap' => '9.8 MPa', 'Temperatur Uap' => '540 °C'],
                'image' => 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=800&q=80',
            ],
            [
                'title' => 'Steam Turbine & High Voltage Generator',
                'slug' => 'steam-turbine-generator',
                'category' => 'Main Plant',
                'description' => 'Turbin uap kondensasi multi-stage presisi tinggi berkecepatan 3000 RPM yang terhubung langsung dengan generator 50 MW / 11 kV.',
                'technical_specs' => ['Kapasitas Generator' => '50 MW x 2 Unit', 'Kecepatan Putar' => '3000 RPM', 'Tegangan Keluaran' => '11 kV', 'Frekuensi' => '50 Hz'],
                'image' => 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
            ],
            [
                'title' => 'Centralized Control Room (DCS)',
                'slug' => 'central-control-room-dcs',
                'category' => 'Automation & Control',
                'description' => 'Pusat kendali otomatis berbasis Distributed Control System (DCS) dengan pemantauan real-time parameter operasi, keselamatan, dan emisi 24/7.',
                'technical_specs' => ['Sistem Control' => 'DCS ABB / Yokogawa', 'Redundansi' => 'Dual Master CPU & Bus Network', 'Monitoring Emisi' => 'CEMS Continuous Emission System'],
                'image' => 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
            ],
            [
                'title' => 'Coal Handling & Jetty System',
                'slug' => 'coal-handling-jetty',
                'category' => 'Fuel System',
                'description' => 'Dermaga (Jetty) penerimaan batu bara kapasitas 10.000 DWT dilengkapi Ship Unloader, Conveyor Belt tertutup, dan Dust Suppression System.',
                'technical_specs' => ['Kapasitas Jetty' => '10.000 DWT Tongkang', 'Kapasitas Conveyor' => '500 Ton/Jam', 'Sistem Stok' => 'Dome Coal Yard & Sprinkler Dust Suppression'],
                'image' => 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80',
            ],
            [
                'title' => 'Water Treatment & Desalination Plant',
                'slug' => 'water-treatment-plant',
                'category' => 'Auxiliary System',
                'description' => 'Fasilitas pemroses air laut menjadi air demineralisasi murni kualitas tinggi (purity < 0.1 µS/cm) untuk pengisian air umpan boiler.',
                'technical_specs' => ['Tipe Proses' => 'Sea Water Reverse Osmosis (SWRO) & Demin Plant', 'Kapasitas Air Murni' => '60 m³/jam'],
                'image' => 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
            ],
            [
                'title' => 'Switchyard 150 kV & Substation',
                'slug' => 'switchyard-150-kv',
                'category' => 'Electrical Interconnection',
                'description' => 'Gardu induk dan switchyard outdoor 150 kV penyaur energi bersih ke jaringan transmisi interkoneksi Sulawesi Selatan & Barat.',
                'technical_specs' => ['Tegangan Saluran' => '150 kV High Voltage', 'Tipe Isolasi' => 'SF6 Gas Insulated & Air Insulated Switchgear'],
                'image' => 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80',
            ],
        ];
        foreach ($facilities as $fc) {
            Facility::create($fc);
        }

        // 7. Sustainability Programs
        $sustain = [
            [
                'title' => 'Pengelolaan FABA (Fly Ash & Bottom Ash) Terpadu',
                'category' => 'Environmental',
                'description' => 'Pemanfaatan sisa pembakaran batu bara (FABA) menjadi batako, paving block, serta material stabilisasi jalan bagi masyarakat sekitar Barru.',
                'metrics' => ['Utilization Rate' => '100%', 'Paving Produced' => '250,000 Pcs/Year', 'Community Beneficiaries' => '12 Desa'],
                'image' => 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
            ],
            [
                'title' => 'Continuous Emission Monitoring System (CEMS)',
                'category' => 'Governance',
                'description' => 'Pengukuran emisi cerobong secara real-time yang terhubung langsung dengan server KLHK untuk memastikan emisi SOx, NOx, dan Partikulat di bawah ambang batas baku mutu.',
                'metrics' => ['Emission Compliance' => '100% Meets KLHK Standards', 'ESP Efficiency' => '99.8% Filtered Particles'],
                'image' => 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=800&q=80',
            ],
            [
                'title' => 'Program Dekarbonisasi & Co-firing Biomassa',
                'category' => 'ESG',
                'description' => 'Substitusi sebagian bahan bakar batu bara dengan limbah pelet kayu dan sekam padi lokal untuk menurunkan emisi karbon spesifik.',
                'metrics' => ['Co-firing Ratio' => '5% Biomass', 'CO2 Emission Reduction' => '18,500 Ton CO2e/Year'],
                'image' => 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80',
            ],
        ];
        foreach ($sustain as $st) {
            SustainabilityProgram::create($st);
        }

        // 8. Biodiversity Database
        $species = [
            [
                'name' => 'Mangrove Bakau Merah',
                'latin_name' => 'Rhizophora mucronata',
                'category' => 'Flora',
                'conservation_status' => 'Protected Ecosystem',
                'location' => 'Kawasan Pesisir Lampoko Barru',
                'description' => 'Pohon mangrove pemecah gelombang pantai dan penangkap penjerat debu halus yang ditanam sebanyak 50.000 bibit.',
                'image' => 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
            ],
            [
                'name' => 'Penyu Hijau Sulawesi',
                'latin_name' => 'Chelonia mydas',
                'category' => 'Fauna',
                'conservation_status' => 'Endangered / Protected',
                'location' => 'Zona Konservasi Pantai Lampoko',
                'description' => 'Spesies penyu yang dilindungi. UBP Barru menyediakan penetasan telur penyu buatan dan pelepasliaran tukik secara rutin.',
                'image' => 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
            ],
            [
                'name' => 'Elang Laut Perut Putih',
                'latin_name' => 'Haliaeetus leucogaster',
                'category' => 'Fauna',
                'conservation_status' => 'Protected Raptor',
                'location' => 'Area Hutan Buffer UBP Barru',
                'description' => 'Burung pemangsa pesisir yang teridentifikasi berbiak di area vegetasi hijau sekeliling kawasan pembangkit.',
                'image' => 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&w=800&q=80',
            ],
            [
                'name' => 'Kera Macaca Sulawesi',
                'latin_name' => 'Macaca maura',
                'category' => 'Fauna',
                'conservation_status' => 'Vulnerable Native Species',
                'location' => 'Hutan Lindung Pesisir Barru',
                'description' => 'Satwa endemik Sulawesi yang dilindungi melalui koridor ekologi dan penanaman pohon buah lokal.',
                'image' => 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
            ],
        ];
        foreach ($species as $sp) {
            BiodiversitySpecies::create($sp);
        }

        BiodiversityProgram::create([
            'title' => 'Konservasi Ekosistem Pesisir & Penangkaran Penyu Lampoko',
            'species_count' => 34,
            'area_monitored_ha' => 14.5,
            'description' => 'Program pemantauan dan rehabilitasi kawasan ekosistem mangrove serta habitat satwa liar di buffer zone PLTU Barru bekerjasama dengan KLHK dan BKSDA Sulawesi Selatan.',
            'pdf_report' => '/storage/documents/biodiversity-report-2025.pdf',
            'image' => 'https://images.unsplash.com/photo-1511497584788-8767611136f6?auto=format&fit=crop&w=800&q=80',
        ]);

        // 9. CSR Programs
        $csrs = [
            [
                'title' => 'Pemberdayaan Kelompok Budidaya Udang & Ikan Pesisir Balusu',
                'category' => 'Ekonomi',
                'date' => '2025-02-14',
                'location' => 'Kecamatan Balusu, Kab. Barru',
                'description' => 'Bantuan kincir angin energi surya, pakan organik, serta pendampingan manajerial pasar untuk petambak di sekitar UBP Barru.',
                'impact' => 'Peningkatan pendapatan petambak hingga 45% dan hasil panen berkualitas ekspor.',
                'image' => 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
            ],
            [
                'title' => 'Program Beasiswa Cahaya Pendidikan Anak Pesisir Barru',
                'category' => 'Pendidikan',
                'date' => '2025-01-20',
                'location' => 'Kabupaten Barru',
                'description' => 'Pemberian beasiswa pendidikan penuh dan alat belajar digital untuk 120 siswa SD, SMP, hingga SMA berprestasi di wilayah sekitar pembangkit.',
                'impact' => 'Menurunkan angka putus sekolah dan mendorong minat generasi muda pada bidang energi & sains.',
                'image' => 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80',
            ],
            [
                'title' => 'Klinik Kesehatan Keliling & Pengobatan Gratis Lampoko',
                'category' => 'Kesehatan',
                'date' => '2025-03-05',
                'location' => 'Desa Lampoko, Barru',
                'description' => 'Layanan pemeriksaan kesehatan gratis, pemberian makanan tambahan stunting untuk balita, dan penyuluhan sanitasi lingkungan.',
                'impact' => 'Lebih dari 450 warga mendapat layanan medis berkala secara cuma-cuma.',
                'image' => 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
            ],
        ];
        foreach ($csrs as $cs) {
            CsrProgram::create($cs);
        }

        // 10. Safety Programs (K3)
        SafetyProgram::create([
            'title' => 'Budaya K3 Zero Accident & Occupational Health Excellence',
            'description' => 'Penerapan komitmen keselamatan kerja tanpa kompromi melalui Sistem Manajemen K3 (SMK3), Daily Safety Briefing, Work Permit System, serta Emergency Response Drill berkala.',
            'zero_accident_days' => 1480,
            'image' => 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
        ]);

        // 11. Awards & Certifications
        $awards = [
            ['title' => 'Penghargaan PROPER HIJAU', 'category' => 'Lingkungan', 'year' => '2024', 'issuer' => 'Kementerian Lingkungan Hidup & Kehutanan RI', 'description' => 'Bukti kinerja pengelolaan lingkungan melebihi ketaatan (beyond compliance) serta efisiensi energi terverifikasi.', 'image' => 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&w=800&q=80'],
            ['title' => 'Sertifikasi ISO 9001:2015', 'category' => 'Mutu Operational', 'year' => '2024', 'issuer' => 'SUCOFINDO International Certification', 'description' => 'Sistem Manajemen Mutu Pengoperasian & Pemeliharaan Pembangkit Listrik Tenaga Uap.', 'image' => 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80'],
            ['title' => 'Sertifikasi ISO 14001:2015', 'category' => 'Manajemen Lingkungan', 'year' => '2024', 'issuer' => 'BSI Group Indonesia', 'description' => 'Standar pengelolaan dampak lingkungan hidup dan sistem mitigasi emisi terpadu.', 'image' => 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80'],
            ['title' => 'Sertifikasi ISO 45001:2018', 'category' => 'K3 & Safety', 'year' => '2023', 'issuer' => 'SUCOFINDO', 'description' => 'Sistem Manajemen Keselamatan dan Kesehatan Kerja Lingkungan Pembangkitan.', 'image' => 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80'],
        ];
        foreach ($awards as $aw) {
            Award::create($aw);
        }

        // 12. Categories & News
        $catCorp = Category::create(['name' => 'Corporate', 'slug' => 'corporate']);
        $catOps = Category::create(['name' => 'Operational', 'slug' => 'operational']);
        $catSust = Category::create(['name' => 'Sustainability', 'slug' => 'sustainability']);
        $catCsr = Category::create(['name' => 'CSR & Lingkungan', 'slug' => 'csr-lingkungan']);

        News::create([
            'title' => 'UBP Barru Raih Penghargaan PROPER HIJAU Ke-5 berturut-turut dari KLHK',
            'slug' => 'ubp-barru-raih-penghargaan-proper-hijau-klhk',
            'category_id' => $catSust->id,
            'excerpt' => 'PT PLN Indonesia Power UBP Barru kembali mengukuhkan komitmen perlindungan lingkungan dengan menerima Anugerah PROPER HIJAU dari Kementerian LHK RI.',
            'content' => '<p>PT PLN Indonesia Power UBP Barru sukses mempertahankan predikat PROPER HIJAU dari Kementerian Lingkungan Hidup dan Kehutanan (KLHK) Republik Indonesia. Penghargaan ini diserahkan atas keberhasilan UBP Barru dalam menerapkan sistem manajemen lingkungan yang melebihi standar ketaatan regulasi (beyond compliance).</p><p>Beberapa inovasi unggulan UBP Barru yang menjadi penilaian kunci meliputi program efisiensi energi biomassa co-firing, pengurangan emisi karbon sebesar 18.500 ton CO2e per tahun, pemanfaatan 100% FABA untuk infrastruktur masyarakat, serta konservasi penyu dan ekosistem pesisir pantai Lampoko.</p>',
            'image' => 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
            'is_featured' => true,
            'published_at' => now()->subDays(2),
        ]);

        News::create([
            'title' => 'Keandalan Listrik Sulbagsel Terjaga, Overhaul Unit 1 PLTU Barru Selesai Lebih Cepat',
            'slug' => 'keandalan-listrik-sulbagsel-terjaga-overhaul-unit-1-selesai',
            'category_id' => $catOps->id,
            'excerpt' => 'Pemeliharaan berkala (Major Overhaul) Unit 1 PLTU Barru berhasil dirampungkan 3 hari lebih awal dengan Zero Accident.',
            'content' => '<p>Tim teknis dan pemeliharaan PT PLN Indonesia Power UBP Barru berhasil menyelesaikan pekerjaan Major Overhaul Turbin dan Boiler Unit 1 berkapasitas 50 MW. Kesiapan unit kini berada pada performa puncak dengan efisiensi kalor yang lebih optimal.</p><p>Selesainya pekerjaan ini dengan zero accident memastikan kesiapan daya pasok listrik menjelang periode beban puncak di wilayah Sulawesi Selatan dan sekitarnya.</p>',
            'image' => 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
            'is_featured' => true,
            'published_at' => now()->subDays(7),
        ]);

        News::create([
            'title' => 'Pemanfaatan FABA UBP Barru Bantu Pembangunan Paving Road 12 Desa di Barru',
            'slug' => 'pemanfaatan-faba-ubp-barru-bantu-pembangunan-paving-road',
            'category_id' => $catCsr->id,
            'excerpt' => 'Sebanyak 250.000 paving block berbahan baku FABA disalurkan untuk percepatan pembangunan fasilitas umum desa pesisir Barru.',
            'content' => '<p>Komitmen circular economy terus dibuktikan UBP Barru melalui pemanfaatan sisa sisa limbah non-B3 FABA (Fly Ash & Bottom Ash). Material FABA diolah menjadi paving block dan batako berkualitas tinggi yang langsung dipergunakan oleh pemerintah daerah dan masyarakat setempat.</p>',
            'image' => 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
            'is_featured' => false,
            'published_at' => now()->subDays(12),
        ]);

        // 13. Galleries
        $galleries = [
            ['title' => 'Landscape Operasional PLTU Barru Pagi Hari', 'category' => 'Operational', 'image_url' => 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=800&q=80', 'caption' => 'Pemandangan PLTU Barru di pesisir Lampoko.'],
            ['title' => 'Monitoring Central Control Room DCS 24 Jam', 'category' => 'Operational', 'image_url' => 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80', 'caption' => 'Operator memantau keandalan pasokan listrik.'],
            ['title' => 'Aksi Penanaman 5.000 Bibit Mangrove Pesisir Lampoko', 'category' => 'Environment', 'image_url' => 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80', 'caption' => 'Program hijau bersama masyarakat Barru.'],
            ['title' => 'Penyerahan Beasiswa Cahaya Pendidikan PLN IP', 'category' => 'CSR', 'image_url' => 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80', 'caption' => 'Dukungan untuk generasi penerus bangsa.'],
            ['title' => 'Inspeksi Keselamatan Kerja & Tool Box Talk K3', 'category' => 'Events', 'image_url' => 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80', 'caption' => 'Penerapan budaya K3 di area kerja.'],
            ['title' => 'Gardu Induk & Switchyard 150kV UBP Barru', 'category' => 'Facilities', 'image_url' => 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80', 'caption' => 'Infrastruktur transmisi energi Sulbagsel.'],
        ];
        foreach ($galleries as $gl) {
            Gallery::create($gl);
        }

        // 14. Videos
        Video::create([
            'title' => 'Profile Company Video: PT PLN Indonesia Power UBP Barru 2025',
            'description' => 'Profil lengkap operasional, teknologi clean energy, dan kontribusi UBP Barru dalam menerangi Sulawesi.',
            'video_url' => 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            'thumbnail_url' => 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=800&q=80',
            'duration' => '05:24',
            'type' => 'youtube',
        ]);

        Video::create([
            'title' => 'Dokumentasi Program Konservasi Keanekaragaman Hayati Lampoko',
            'description' => 'Langkah nyata pelestarian ekosistem mangrove dan penyu pesisir Barru.',
            'video_url' => 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            'thumbnail_url' => 'https://images.unsplash.com/photo-1511497584788-8767611136f6?auto=format&fit=crop&w=800&q=80',
            'duration' => '04:12',
            'type' => 'youtube',
        ]);

        // 15. Documents
        $docs = [
            ['title' => 'Annual Report PLN Indonesia Power UBP Barru 2024', 'category' => 'Annual Report', 'year' => '2024', 'file_path' => '/documents/annual-report-2024.pdf', 'file_size' => '8.4 MB'],
            ['title' => 'Sustainability & ESG Report UBP Barru 2024', 'category' => 'Sustainability Report', 'year' => '2024', 'file_path' => '/documents/sustainability-report-2024.pdf', 'file_size' => '5.2 MB'],
            ['title' => 'Brosur Company Profile UBP Barru 2025', 'category' => 'Company Profile', 'year' => '2025', 'file_path' => '/documents/company-profile-ubp-barru.pdf', 'file_size' => '3.8 MB'],
            ['title' => 'Laporan Kinerja Pengelolaan Lingkungan & FABA 2024', 'category' => 'Environmental Report', 'year' => '2024', 'file_path' => '/documents/faba-environmental-report.pdf', 'file_size' => '4.1 MB'],
            ['title' => 'Buku Laporan Program TJSL & CSR UBP Barru 2024', 'category' => 'CSR Report', 'year' => '2024', 'file_path' => '/documents/csr-tjsl-report.pdf', 'file_size' => '6.5 MB'],
        ];
        foreach ($docs as $dc) {
            Document::create($dc);
        }

        // 16. Site Settings
        $settings = [
            ['key' => 'site_name', 'value' => 'PT PLN Indonesia Power UBP Barru'],
            ['key' => 'tagline', 'value' => 'Powering a Sustainable Future'],
            ['key' => 'address', 'value' => 'Desa Lampoko, Kecamatan Balusu, Kabupaten Barru, Sulawesi Selatan 90752'],
            ['key' => 'phone', 'value' => '(0421) 921-234'],
            ['key' => 'email', 'value' => 'humas.ubpbarru@plnindonesiapower.co.id'],
            ['key' => 'maps_url', 'value' => 'https://maps.google.com/?q=PLTU+Barru+Desa+Lampoko+Sulawesi+Selatan'],
            ['key' => 'social_instagram', 'value' => 'https://instagram.com/plnindonesiapower'],
            ['key' => 'social_facebook', 'value' => 'https://facebook.com/plnindonesiapower'],
            ['key' => 'social_youtube', 'value' => 'https://youtube.com/plnindonesiapower'],
            ['key' => 'social_linkedin', 'value' => 'https://linkedin.com/company/plnindonesiapower'],
        ];
        foreach ($settings as $st) {
            Setting::create($st);
        }
    }
}
