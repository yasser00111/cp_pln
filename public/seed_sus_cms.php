<?php
require __DIR__ . '/../vendor/autoload.php';
$app = require_once __DIR__ . '/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\Content;

$data = [
    [
        'section_key' => 'home_sustainability_intro',
        'title' => 'Commitment Towards Sustainable Energy & Biodiversity',
        'body_text' => 'UBP Barru mengintegrasikan pengelolaan energi ramah lingkungan, pemanfaatan FABA 100%, dekarbonisasi co-firing biomassa, serta konservasi penyu dan ekosistem mangrove pesisir Lampoko.'
    ],
    [
        'section_key' => 'home_sus_stat_1',
        'title' => '18.5K Ton',
        'body_text' => 'Reduksi CO2e / Thn'
    ],
    [
        'section_key' => 'home_sus_stat_2',
        'title' => '100%',
        'body_text' => 'Pemanfaatan FABA'
    ],
    [
        'section_key' => 'home_sus_stat_3',
        'title' => '50,000+',
        'body_text' => 'Pohon Mangrove Bakau Ditanam'
    ]
];

foreach ($data as $item) {
    Content::firstOrCreate(
        ['section_key' => $item['section_key']],
        ['title' => $item['title'], 'body_text' => $item['body_text']]
    );
}

echo "Contents added successfully!\n";
