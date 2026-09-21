<?php
require __DIR__ . '/../vendor/autoload.php';
$app = require_once __DIR__ . '/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\Content;
use App\Models\Setting;

$cmsData = [
    // Home Profile Section
    ['section_key' => 'home_profile_image', 'title' => 'Gambar Profil UBP Barru', 'body_text' => 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=1000&q=80', 'type' => 'image_url'],
    ['section_key' => 'home_profile_badge1_title', 'title' => 'Badge 1 Title', 'body_text' => 'PLTU BARRU (2 X 50 MW)', 'type' => 'text'],
    ['section_key' => 'home_profile_badge1_desc', 'title' => 'Badge 1 Desc', 'body_text' => 'Desa Lampoko, Kec. Balusu, Kabupaten Barru, Sulsel', 'type' => 'text'],
    ['section_key' => 'home_profile_badge2_title', 'title' => 'Badge 2 Title', 'body_text' => 'Keandalan Tinggi', 'type' => 'text'],
    ['section_key' => 'home_profile_badge2_desc', 'title' => 'Badge 2 Desc', 'body_text' => 'EAF 99.45%', 'type' => 'text'],
    ['section_key' => 'home_profile_title', 'title' => 'Pilar Utama Keandalan Energi di Sulawesi Selatan', 'body_text' => '', 'type' => 'text'],
    ['section_key' => 'home_profile_year', 'title' => 'Sejak 2012', 'body_text' => '', 'type' => 'text'],
    ['section_key' => 'home_profile_tech', 'title' => 'CFB Boiler', 'body_text' => '', 'type' => 'text'],

    // Home Visi Misi Section
    ['section_key' => 'home_visimisi_title', 'title' => 'Komitmen Terbaik Menuju Energi Keberlanjutan', 'body_text' => 'Prinsip dasar tata kelola operasional dan nilai luhur insan PT PLN Indonesia Power UBP Barru', 'type' => 'text'],

    // Home Operational Section
    ['section_key' => 'home_operational_title', 'title' => 'Performa & Efisiensi Pembangkitan', 'body_text' => 'Transparansi data real-time ketersediaan pasokan listrik dan keandalan sistem PLTU Barru', 'type' => 'text'],

    // Home Facility Section
    ['section_key' => 'home_facility_title', 'title' => 'Infrastruktur & Teknologi Pembangkitan', 'body_text' => 'Fasilitas utama dan pendukung yang menunjang keandalan produksi listrik UBP Barru', 'type' => 'text'],

    // Home Sustainability Section
    ['section_key' => 'home_sustainability_title', 'title' => 'Inisiatif ESG & Tanggung Jawab Sosial', 'body_text' => 'Langkah nyata pelestarian lingkungan, pemberdayaan masyarakat, dan tata kelola perusahaan yang baik.', 'type' => 'text'],

    // Home News Section
    ['section_key' => 'home_news_title', 'title' => 'Pusat Informasi & Berita Terkini', 'body_text' => 'Update kegiatan operasional, kunjungan industri, dan pencapaian terbaru UBP Barru.', 'type' => 'text'],

    // Gallery, Video, News Index Hero
    ['section_key' => 'media_gallery_title', 'title' => 'Dokumentasi Foto', 'body_text' => 'Kumpulan potret kegiatan, operasional, dan program CSR UBP Barru.', 'type' => 'text'],
    ['section_key' => 'media_video_title', 'title' => 'Galeri Video', 'body_text' => 'Dokumentasi visual bergerak mengenai operasional dan program unggulan kami.', 'type' => 'text'],
    ['section_key' => 'media_news_title', 'title' => 'Pusat Berita UBP Barru', 'body_text' => 'Informasi dan update terbaru seputar kegiatan operasional dan korporat.', 'type' => 'text'],
    
    // Sustainability Subpages
    ['section_key' => 'sustainability_k3_title', 'title' => 'Budaya K3 & Zero Accident', 'body_text' => 'Implementasi ketat standar Keselamatan dan Kesehatan Kerja (K3) di lingkungan operasional.', 'type' => 'text'],
    ['section_key' => 'sustainability_gender_title', 'title' => 'Kesetaraan Gender & Inklusi', 'body_text' => 'Membangun lingkungan kerja yang setara, inklusif, dan memberdayakan seluruh insan perusahaan.', 'type' => 'text'],

];

foreach ($cmsData as $data) {
    Content::updateOrCreate(
        ['section_key' => $data['section_key']],
        ['title' => $data['title'], 'body_text' => $data['body_text'], 'type' => $data['type']]
    );
}

// Settings
$settings = [
    ['key' => 'address', 'value' => 'Desa Lampoko, Kecamatan Balusu, Kabupaten Barru, Sulawesi Selatan 90752', 'type' => 'text'],
    ['key' => 'phone', 'value' => '+62 411 1234567', 'type' => 'text'],
    ['key' => 'email', 'value' => 'contact@plnip-barru.co.id', 'type' => 'text'],
    ['key' => 'facebook_url', 'value' => '#', 'type' => 'text'],
    ['key' => 'instagram_url', 'value' => '#', 'type' => 'text'],
    ['key' => 'linkedin_url', 'value' => '#', 'type' => 'text'],
    ['key' => 'youtube_url', 'value' => '#', 'type' => 'text'],
    ['key' => 'footer_copyright', 'value' => '© 2024 PT PLN Indonesia Power UBP Barru. All rights reserved.', 'type' => 'text'],
];

foreach ($settings as $s) {
    Setting::updateOrCreate(
        ['key' => $s['key']],
        ['value' => $s['value'], 'type' => $s['type']]
    );
}

// History Timeline JSON
$history = [
    ['year' => '2008', 'title' => 'Inisiasi & Peletakan Batu Pertama', 'desc' => 'Dimulainya proyek pembangunan PLTU Barru 2x50 MW di Desa Lampoko, Kecamatan Balusu, Kabupaten Barru untuk memperkuat daya pasok listrik Sulawesi Selatan.'],
    ['year' => '2012', 'title' => 'Commercial Operation Date (COD)', 'desc' => 'Unit 1 dan Unit 2 resmi beroperasi secara komersial dan terhubung dengan jaringan transmisi 150kV Sistem Sulbagsel.'],
    ['year' => '2016', 'title' => 'Sertifikasi ISO Terpadu', 'desc' => 'Berhasil meraih sertifikasi Sistem Manajemen Terintegrasi (ISO 9001, ISO 14001, dan SMK3) sebagai bukti komitmen tata kelola operasional yang unggul.'],
    ['year' => '2020', 'title' => 'Pionir Co-Firing Biomassa', 'desc' => 'Menjadi salah satu PLTU pertama di Sulawesi yang sukses mengimplementasikan pencampuran biomassa (co-firing) serbuk gergaji untuk menekan emisi karbon.'],
    ['year' => '2023', 'title' => 'Pemanfaatan FABA 100%', 'desc' => 'Mencapai target pemanfaatan Fly Ash & Bottom Ash (FABA) secara masif untuk pembuatan batako, paving block, dan stabilisasi lahan bagi masyarakat sekitar.'],
    ['year' => '2025', 'title' => 'Transisi Energi Berkelanjutan', 'desc' => 'Meningkatkan porsi co-firing biomassa, optimalisasi CEMS (Continuous Emission Monitoring System) 24/7, dan integrasi energi terbarukan di lingkungan pembangkit.']
];

Setting::updateOrCreate(
    ['key' => 'history_timeline'],
    ['value' => json_encode($history), 'type' => 'json']
);

echo "CMS and Settings keys seeded successfully.\n";
