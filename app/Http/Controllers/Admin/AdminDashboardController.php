<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CompanyProfile;
use App\Models\Content;
use App\Models\Management;
use App\Models\Facility;
use App\Models\OperationalStatistic;
use App\Models\OperationalMetric;
use App\Models\SustainabilityProgram;
use App\Models\BiodiversitySpecies;
use App\Models\BiodiversityProgram;
use App\Models\Srikandi;
use App\Models\CsrProgram;
use App\Models\SafetyProgram;
use App\Models\Award;
use App\Models\Category;
use App\Models\News;
use App\Models\Gallery;
use App\Models\Video;
use App\Models\Document;
use App\Models\ContactMessage;
use App\Models\Setting;
use App\Models\HeroSlider;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Log;

class AdminDashboardController extends Controller
{
    // 1. Dashboard Overview
    public function index(): Response
    {
        $statsCount = OperationalStatistic::count();
        $newsCount = News::count();
        $messagesCount = ContactMessage::where('is_read', false)->count();
        $docsCount = Document::count();
        $leadersCount = Management::count();
        $speciesCount = BiodiversitySpecies::count();

        $recentMessages = ContactMessage::orderBy('created_at', 'desc')->take(5)->get();
        $recentNews = News::with('category')->orderBy('created_at', 'desc')->take(5)->get();

        return Inertia::render('Admin/Dashboard', [
            'statsCount' => $statsCount,
            'newsCount' => $newsCount,
            'messagesCount' => $messagesCount,
            'docsCount' => $docsCount,
            'leadersCount' => $leadersCount,
            'speciesCount' => $speciesCount,
            'recentMessages' => $recentMessages,
            'recentNews' => $recentNews,
        ]);
    }

    // 2. Profile Content Management (Tentang, Visi, Misi, Core Competencies, Values, Strengths)
    public function profileIndex(): Response
    {
        $about = CompanyProfile::where('key', 'tentang')->first();
        $visi = CompanyProfile::where('key', 'visi')->first();
        $misiRaw = CompanyProfile::where('key', 'misi')->first();
        $misi = $misiRaw ? json_decode($misiRaw->content, true) : [];

        $cms = Content::all()->keyBy('section_key');

        return Inertia::render('Admin/Profile/Index', [
            'about' => $about,
            'visi' => $visi,
            'misi' => $misi,
            'cms' => $cms,
        ]);
    }

    public function updateProfile(Request $request)
    {
        if ($request->has('tentang')) {
            CompanyProfile::updateOrCreate(['key' => 'tentang'], ['title' => 'Tentang UBP Barru', 'content' => $request->tentang]);
        }
        if ($request->has('visi')) {
            CompanyProfile::updateOrCreate(['key' => 'visi'], ['title' => 'Visi Perusahaan', 'content' => $request->visi]);
            Content::updateOrCreate(['section_key' => 'profile_visi'], [
                'title' => 'Visi UBP Barru',
                'body_text' => $request->visi,
            ]);
        }
        if ($request->has('misi')) {
            CompanyProfile::updateOrCreate(['key' => 'misi'], ['title' => 'Misi Perusahaan', 'content' => json_encode($request->misi)]);
            if (is_array($request->misi)) {
                foreach ($request->misi as $i => $mItem) {
                    $mKey = 'profile_misi_' . ($i + 1);
                    Content::updateOrCreate(['section_key' => $mKey], [
                        'title' => 'Misi ' . ($i + 1),
                        'body_text' => is_array($mItem) ? ($mItem['desc'] ?? '') : (string)$mItem,
                    ]);
                }
            }
        }

        if ($request->has('cms') && is_array($request->cms)) {
            foreach ($request->cms as $sectionKey => $item) {
                Content::updateOrCreate(
                    ['section_key' => $sectionKey],
                    [
                        'title' => $item['title'] ?? null,
                        'body_text' => $item['body_text'] ?? null,
                    ]
                );
            }
        }

        return redirect()->back()->with('success', 'Konten Profil Perusahaan berhasil diperbarui!');
    }

    // 3. Management / Leadership CRUD
    public function managementIndex(): Response
    {
        $leaders = Management::orderBy('order_priority')->get();
        return Inertia::render('Admin/Management/Index', ['leaders' => $leaders]);
    }

    public function storeManagement(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'position' => 'required|string|max:255',
            'birth_info' => 'nullable|string|max:255',
            'education' => 'nullable|string',
            'career_journey' => 'nullable|string',
            'bio' => 'nullable|string',
            'photo' => 'nullable|string',
            'photo_file' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:5120',
            'order_priority' => 'nullable|integer',
        ]);

        if ($request->hasFile('photo_file')) {
            $path = $request->file('photo_file')->store('uploads/management', 'public');
            $validated['photo'] = '/storage/' . $path;
        }

        unset($validated['photo_file']);
        $validated['order_priority'] = $validated['order_priority'] ?? 1;

        if ($request->has('education')) {
            $validated['education'] = array_values(array_filter(array_map('trim', explode("\n", $request->input('education', '')))));
        }
        if ($request->has('career_journey')) {
            $validated['career_journey'] = array_values(array_filter(array_map('trim', explode("\n", $request->input('career_journey', '')))));
        }

        Management::create($validated);

        return redirect()->back()->with('success', 'Data pimpinan/manajemen berhasil ditambahkan!');
    }

    public function updateManagement(Request $request, Management $management)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'position' => 'required|string|max:255',
            'birth_info' => 'nullable|string|max:255',
            'education' => 'nullable|string',
            'career_journey' => 'nullable|string',
            'bio' => 'nullable|string',
            'photo' => 'nullable|string',
            'photo_file' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:5120',
            'order_priority' => 'nullable|integer',
        ]);

        if ($request->hasFile('photo_file')) {
            $path = $request->file('photo_file')->store('uploads/management', 'public');
            $validated['photo'] = '/storage/' . $path;
        }

        unset($validated['photo_file']);

        if ($request->has('education')) {
            $validated['education'] = array_values(array_filter(array_map('trim', explode("\n", $request->input('education', '')))));
        }
        if ($request->has('career_journey')) {
            $validated['career_journey'] = array_values(array_filter(array_map('trim', explode("\n", $request->input('career_journey', '')))));
        }

        $management->update($validated);

        return redirect()->back()->with('success', 'Data pimpinan ' . $management->name . ' berhasil diperbarui!');
    }

    public function deleteManagement(Management $management)
    {
        $management->delete();
        return redirect()->back()->with('success', 'Data pimpinan berhasil dihapus!');
    }

    public function updateLandscapePhotos(Request $request)
    {
        $request->validate([
            'commissioners_photo' => 'nullable|image|mimes:jpeg,png,jpg,webp,gif,svg|max:15360',
            'directors_photo' => 'nullable|image|mimes:jpeg,png,jpg,webp,gif,svg|max:15360',
            'management_commissioners_highlight_title' => 'nullable|string|max:255',
            'management_commissioners_highlight_name' => 'nullable|string|max:255',
            'management_directors_highlight_title' => 'nullable|string|max:255',
            'management_directors_highlight_name' => 'nullable|string|max:255',
            'management_section_title' => 'nullable|string|max:255',
            'management_section_desc' => 'nullable|string|max:1000',
        ]);

        $targetDir = public_path('uploads/management');
        if (!file_exists($targetDir)) {
            @mkdir($targetDir, 0775, true);
        }

        if ($request->hasFile('commissioners_photo')) {
            $file = $request->file('commissioners_photo');
            $filename = 'commissioners_' . time() . '.' . $file->getClientOriginalExtension();
            try {
                $file->move($targetDir, $filename);
                $commPhotoUrl = '/uploads/management/' . $filename;
            } catch (\Throwable $e) {
                $path = $file->storeAs('uploads/management', $filename, 'public');
                $commPhotoUrl = '/storage/' . $path;
            }
            Setting::updateOrCreate(
                ['key' => 'management_commissioners_photo'],
                ['value' => $commPhotoUrl]
            );
        }

        if ($request->hasFile('directors_photo')) {
            $file = $request->file('directors_photo');
            $filename = 'directors_' . time() . '.' . $file->getClientOriginalExtension();
            try {
                $file->move($targetDir, $filename);
                $dirPhotoUrl = '/uploads/management/' . $filename;
            } catch (\Throwable $e) {
                $path = $file->storeAs('uploads/management', $filename, 'public');
                $dirPhotoUrl = '/storage/' . $path;
            }
            Setting::updateOrCreate(
                ['key' => 'management_directors_photo'],
                ['value' => $dirPhotoUrl]
            );
        }

        if ($request->has('commissioners_data')) {
            $data = json_decode($request->input('commissioners_data'), true);
            if (is_array($data)) {
                foreach ($data as &$item) {
                    $fileKey = 'comm_photo_' . $item['id'];
                    if ($request->hasFile($fileKey)) {
                        $f = $request->file($fileKey);
                        $fn = 'comm_' . $item['id'] . '_' . time() . '.' . $f->getClientOriginalExtension();
                        try {
                            $f->move($targetDir, $fn);
                            $item['photo'] = '/uploads/management/' . $fn;
                        } catch (\Throwable $e) {
                            $path = $f->storeAs('uploads/management', $fn, 'public');
                            $item['photo'] = '/storage/' . $path;
                        }
                    }
                }
                Setting::updateOrCreate(
                    ['key' => 'management_commissioners_data'],
                    ['value' => json_encode($data, JSON_PRETTY_PRINT)]
                );
            }
        }

        if ($request->has('directors_data')) {
            $data = json_decode($request->input('directors_data'), true);
            if (is_array($data)) {
                foreach ($data as &$item) {
                    $fileKey = 'dir_photo_' . $item['id'];
                    if ($request->hasFile($fileKey)) {
                        $f = $request->file($fileKey);
                        $fn = 'dir_' . $item['id'] . '_' . time() . '.' . $f->getClientOriginalExtension();
                        try {
                            $f->move($targetDir, $fn);
                            $item['photo'] = '/uploads/management/' . $fn;
                        } catch (\Throwable $e) {
                            $path = $f->storeAs('uploads/management', $fn, 'public');
                            $item['photo'] = '/storage/' . $path;
                        }
                    }
                }
                Setting::updateOrCreate(
                    ['key' => 'management_directors_data'],
                    ['value' => json_encode($data, JSON_PRETTY_PRINT)]
                );
            }
        }

        $fields = [
            'management_commissioners_highlight_title',
            'management_commissioners_highlight_name',
            'management_directors_highlight_title',
            'management_directors_highlight_name',
            'management_section_title',
            'management_section_desc',
        ];

        foreach ($fields as $f) {
            if ($request->has($f)) {
                Setting::updateOrCreate(['key' => $f], ['value' => $request->input($f)]);
            }
        }

        return redirect()->back()->with('success', 'Foto lanskap dan biodata jajaran manajemen berhasil diperbarui!');
    }

    public function updateBoardMember(Request $request)
    {
        $request->validate([
            'board_type' => 'required|in:commissioners,directors',
            'member_id' => 'required',
            'name' => 'required|string|max:255',
            'position' => 'required|string|max:255',
            'birth_info' => 'nullable|string|max:255',
            'education' => 'nullable|string',
            'career_journey' => 'nullable|string',
            'photo_file' => 'nullable|image|mimes:jpeg,png,jpg,webp,gif,svg,bmp|max:15360',
        ]);

        try {
            $settingKey = $request->board_type === 'commissioners' 
                ? 'management_commissioners_data' 
                : 'management_directors_data';

            $raw = Setting::where('key', $settingKey)->value('value');
            $list = $raw ? json_decode($raw, true) : [];
            if (!is_array($list)) {
                $list = [];
            }

            $memberId = (int)$request->member_id;
            if ($memberId <= 0) {
                $existingIds = array_column($list, 'id');
                $memberId = !empty($existingIds) ? max($existingIds) + 1 : 1;
            }

            $photoPath = null;
            if ($request->hasFile('photo_file')) {
                $file = $request->file('photo_file');
                $filename = $request->board_type . '_' . $memberId . '_' . time() . '.' . $file->getClientOriginalExtension();
                
                $targetDir = public_path('uploads/management');
                if (!file_exists($targetDir)) {
                    @mkdir($targetDir, 0775, true);
                }

                try {
                    $file->move($targetDir, $filename);
                    $photoPath = '/uploads/management/' . $filename;
                } catch (\Throwable $e) {
                    $path = $file->storeAs('uploads/management', $filename, 'public');
                    $photoPath = '/storage/' . $path;
                }
            }

            $found = false;
            $educationArray = array_values(array_filter(array_map('trim', explode("\n", $request->input('education', '')))));
            $careerArray = array_values(array_filter(array_map('trim', explode("\n", $request->input('career_journey', '')))));

            foreach ($list as &$m) {
                if ((int)$m['id'] === $memberId) {
                    $m['name'] = $request->input('name');
                    $m['position'] = $request->input('position');
                    $m['birthInfo'] = $request->input('birth_info', '-');
                    $m['education'] = $educationArray;
                    $m['careerJourney'] = $careerArray;
                    if ($photoPath) {
                        $m['photo'] = $photoPath;
                    }
                    $found = true;
                    break;
                }
            }

            if (!$found) {
                $newItem = [
                    'id' => $memberId,
                    'name' => $request->input('name'),
                    'position' => $request->input('position'),
                    'birthInfo' => $request->input('birth_info', '-'),
                    'education' => $educationArray,
                    'careerJourney' => $careerArray,
                    'photo' => $photoPath ?? 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80',
                    'zone' => ['left' => '0%', 'width' => '14%'],
                    'arrowPos' => ['left' => '10%', 'top' => '70%'],
                ];
                $list[] = $newItem;
            }

            Setting::updateOrCreate(
                ['key' => $settingKey],
                ['value' => json_encode($list, JSON_PRETTY_PRINT)]
            );

            return redirect()->back()->with('success', 'Data ' . $request->name . ' berhasil disimpan!');
        } catch (\Throwable $e) {
            \Illuminate\Support\Facades\Log::error('Error saving board member: ' . $e->getMessage(), ['trace' => $e->getTraceAsString()]);
            return redirect()->back()->with('error', 'Gagal menyimpan data: ' . $e->getMessage());
        }
    }

    public function deleteBoardMember(Request $request)
    {
        $request->validate([
            'board_type' => 'required|in:commissioners,directors',
            'member_id' => 'required',
        ]);

        $settingKey = $request->board_type === 'commissioners' 
            ? 'management_commissioners_data' 
            : 'management_directors_data';

        $raw = Setting::where('key', $settingKey)->value('value');
        $list = $raw ? json_decode($raw, true) : [];
        if (!is_array($list)) {
            $list = [];
        }

        $memberId = (int)$request->member_id;
        $list = array_values(array_filter($list, function($m) use ($memberId) {
            return (int)$m['id'] !== $memberId;
        }));

        Setting::updateOrCreate(
            ['key' => $settingKey],
            ['value' => json_encode($list, JSON_PRETTY_PRINT)]
        );

        return redirect()->back()->with('success', 'Anggota pimpinan berhasil dihapus!');
    }

    // 4. Hero Sliders CRUD
    public function slidersIndex(): Response
    {
        $sliders = HeroSlider::orderBy('order_priority')->get();
        return Inertia::render('Admin/Sliders/Index', ['sliders' => $sliders]);
    }

    public function storeSlider(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'subtitle' => 'nullable|string|max:500',
            'image' => 'nullable|string|max:1000',
            'image_file' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:10240',
            'cta_text' => 'nullable|string|max:100',
            'cta_url' => 'nullable|string|max:255',
            'order_priority' => 'nullable|integer',
        ]);

        if ($request->hasFile('image_file')) {
            $path = $request->file('image_file')->store('uploads/sliders', 'public');
            $validated['image'] = '/storage/' . $path;
        }

        unset($validated['image_file']);
        $validated['order_priority'] = $validated['order_priority'] ?? 1;
        $validated['is_active'] = true;

        HeroSlider::create($validated);

        return redirect()->back()->with('success', 'Hero slide photo baru berhasil ditambahkan!');
    }

    public function toggleSlider(HeroSlider $slider)
    {
        $slider->update(['is_active' => !$slider->is_active]);
        return redirect()->back()->with('success', 'Status slide diperbarui.');
    }

    public function updateSlider(Request $request, HeroSlider $slider)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'cta_text' => 'nullable|string|max:255',
            'cta_link' => 'nullable|string|max:255',
            'order_priority' => 'nullable|integer',
        ]);

        if ($request->hasFile('image_file')) {
            $request->validate([
                'image_file' => 'image|mimes:jpeg,png,jpg,gif,webp|max:5120',
            ]);
            $path = $request->file('image_file')->store('uploads/sliders', 'public');
            $validated['image'] = '/storage/' . $path;
        }

        $validated['order_priority'] = $validated['order_priority'] ?? 1;

        $slider->update($validated);

        return redirect()->back()->with('success', 'Hero slide photo berhasil diperbarui!');
    }

    public function deleteSlider(HeroSlider $slider)
    {
        $slider->delete();
        return redirect()->back()->with('success', 'Slide berhasil dihapus.');
    }

    // 5. Facilities CRUD
    public function facilitiesIndex(): Response
    {
        $facilities = Facility::all();
        return Inertia::render('Admin/Facilities/Index', ['facilities' => $facilities]);
    }

    public function storeFacility(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|string',
            'image_file' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:5120',
        ]);

        if ($request->hasFile('image_file')) {
            $path = $request->file('image_file')->store('uploads/facilities', 'public');
            $validated['image'] = '/storage/' . $path;
        }

        unset($validated['image_file']);
        $validated['slug'] = Str::slug($validated['title']) . '-' . rand(100, 999);
        Facility::create($validated);

        return redirect()->back()->with('success', 'Fasilitas pembangkit berhasil ditambahkan!');
    }

    public function deleteFacility(Facility $facility)
    {
        $facility->delete();
        return redirect()->back()->with('success', 'Fasilitas berhasil dihapus!');
    }

    // Operational Statistics CRUD
    public function statisticsIndex(): Response
    {
        $statistics = OperationalStatistic::orderBy('order_priority')->get();
        return Inertia::render('Admin/Statistics/Index', ['statistics' => $statistics]);
    }

    public function storeStatistic(Request $request)
    {
        $validated = $request->validate([
            'metric_key' => 'required|string|max:255',
            'label' => 'required|string|max:255',
            'value' => 'required|string|max:255',
            'numeric_value' => 'nullable|numeric',
            'unit' => 'nullable|string|max:50',
            'subtext' => 'nullable|string|max:255',
            'order_priority' => 'required|integer',
        ]);

        OperationalStatistic::create($validated);
        return redirect()->back()->with('success', 'Statistik Operasional berhasil ditambahkan!');
    }

    public function updateStatistic(Request $request, OperationalStatistic $statistic)
    {
        $validated = $request->validate([
            'metric_key' => 'required|string|max:255',
            'label' => 'required|string|max:255',
            'value' => 'required|string|max:255',
            'numeric_value' => 'nullable|numeric',
            'unit' => 'nullable|string|max:50',
            'subtext' => 'nullable|string|max:255',
            'order_priority' => 'required|integer',
        ]);

        $statistic->update($validated);
        return redirect()->back()->with('success', 'Statistik Operasional berhasil diperbarui!');
    }

    public function deleteStatistic(OperationalStatistic $statistic)
    {
        $statistic->delete();
        return redirect()->back()->with('success', 'Statistik berhasil dihapus!');
    }


    // 6. Awards CRUD
    public function awardsIndex(): Response
    {
        $awards = Award::all();
        return Inertia::render('Admin/Awards/Index', ['awards' => $awards]);
    }

    public function storeAward(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'year' => 'required|string|max:10',
            'issuer' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|string',
            'image_file' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:5120',
        ]);

        if ($request->hasFile('image_file')) {
            $path = $request->file('image_file')->store('uploads/awards', 'public');
            $validated['image'] = '/storage/' . $path;
        }

        unset($validated['image_file']);
        Award::create($validated);
        return redirect()->back()->with('success', 'Sertifikat/Award berhasil ditambahkan!');
    }

    public function deleteAward(Award $award)
    {
        $award->delete();
        return redirect()->back()->with('success', 'Sertifikat berhasil dihapus!');
    }

    // 7. Biodiversity Species & Conservation Reports CRUD
    public function biodiversityIndex(): Response
    {
        $species = BiodiversitySpecies::all();
        $reports = Document::where('category', 'Laporan Konservasi')->orderBy('year', 'desc')->get();
        return Inertia::render('Admin/Biodiversity/Index', [
            'species' => $species,
            'reports' => $reports,
        ]);
    }

    public function storeBiodiversityReport(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'year' => 'required|string|max:4',
            'file' => 'required|file|mimes:pdf,doc,docx,xls,xlsx,zip|max:25600', // max 25MB
        ]);

        $data = [
            'title' => $validated['title'],
            'category' => 'Laporan Konservasi',
            'year' => $validated['year'],
        ];

        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $filename = time() . '_' . Str::slug($request->title) . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('uploads/documents'), $filename);

            $data['file_path'] = '/uploads/documents/' . $filename;

            $bytes = filesize(public_path('uploads/documents/' . $filename));
            $units = ['B', 'KB', 'MB', 'GB', 'TB'];
            $bytes = max($bytes, 0);
            $pow = floor(($bytes ? log($bytes) : 0) / log(1024));
            $pow = min($pow, count($units) - 1);
            $bytes /= (1 << (10 * $pow));
            $data['file_size'] = round($bytes, 1) . ' ' . $units[$pow];
        }

        Document::create($data);

        return redirect()->back()->with('success', 'Laporan konservasi berhasil diunggah!');
    }

    public function deleteBiodiversityReport(Document $document)
    {
        if ($document->file_path && file_exists(public_path($document->file_path))) {
            @unlink(public_path($document->file_path));
        }
        $document->delete();

        return redirect()->back()->with('success', 'Laporan konservasi berhasil dihapus!');
    }

    public function storeSpecies(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'latin_name' => 'nullable|string|max:255',
            'category' => 'required|string|max:50',
            'conservation_status' => 'required|string|max:100',
            'location' => 'nullable|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|string',
            'image_file' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:5120',
        ]);

        if ($request->hasFile('image_file')) {
            $path = $request->file('image_file')->store('uploads/biodiversity', 'public');
            $validated['image'] = '/storage/' . $path;
        }

        unset($validated['image_file']);
        BiodiversitySpecies::create($validated);
        return redirect()->back()->with('success', 'Spesies keanekaragaman hayati berhasil ditambahkan!');
    }

    public function updateSpecies(Request $request, BiodiversitySpecies $species)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'latin_name' => 'nullable|string|max:255',
            'category' => 'required|string|max:50',
            'conservation_status' => 'required|string|max:100',
            'location' => 'nullable|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|string',
            'image_file' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:5120',
        ]);

        if ($request->hasFile('image_file')) {
            if ($species->image && str_starts_with($species->image, '/storage/')) {
                $oldPath = public_path(substr($species->image, 1));
                if (file_exists($oldPath)) {
                    @unlink($oldPath);
                }
            }
            $path = $request->file('image_file')->store('uploads/biodiversity', 'public');
            $validated['image'] = '/storage/' . $path;
        }

        unset($validated['image_file']);
        $species->update($validated);
        return redirect()->back()->with('success', 'Data spesies berhasil diperbarui!');
    }

    public function deleteSpecies(BiodiversitySpecies $species)
    {
        $species->delete();
        return redirect()->back()->with('success', 'Data spesies berhasil dihapus!');
    }

    // 8. News CRUD
    public function newsIndex(): Response
    {
        $newsList = News::with('category')->orderBy('created_at', 'desc')->get();
        return Inertia::render('Admin/News/Index', ['newsList' => $newsList]);
    }

    public function storeNews(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'excerpt' => 'nullable|string',
            'content' => 'required|string',
            'image_file' => 'nullable|image|max:10240',
        ]);

        if ($request->hasFile('image_file')) {
            $path = $request->file('image_file')->store('uploads/news', 'public');
            $validated['image'] = '/storage/' . $path;
        }

        $validated['category_id'] = \App\Models\Category::first()->id ?? 1;
        $validated['slug'] = Str::slug($validated['title']) . '-' . time();
        $validated['published_at'] = now();

        News::create($validated);
        return redirect()->back()->with('success', 'Berita berhasil ditambahkan!');
    }

    public function deleteNews(News $news)
    {
        $news->delete();
        return redirect()->back()->with('success', 'Berita berhasil dihapus!');
    }

    public function galleryIndex(): Response
    {
        $galleries = Gallery::orderBy('created_at', 'desc')->get();
        return Inertia::render('Admin/Gallery/Index', ['galleries' => $galleries]);
    }

    public function storeGallery(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'nullable|string|max:100',
            'caption' => 'nullable|string',
            'image_file' => 'required|image|max:10240',
        ]);

        if ($request->hasFile('image_file')) {
            $path = $request->file('image_file')->store('uploads/gallery', 'public');
            $validated['image_url'] = '/storage/' . $path;
        }

        Gallery::create($validated);
        return redirect()->back()->with('success', 'Foto galeri berhasil ditambahkan!');
    }

    public function deleteGallery(Gallery $gallery)
    {
        $gallery->delete();
        return redirect()->back()->with('success', 'Foto galeri berhasil dihapus!');
    }

    // Video CRUD
    public function videoIndex(): Response
    {
        $videos = Video::orderBy('created_at', 'desc')->get();
        return Inertia::render('Admin/Video/Index', ['videos' => $videos]);
    }

    public function storeVideo(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'video_url' => 'required|url',
            'type' => 'required|string',
            'description' => 'nullable|string',
        ]);

        Video::create($validated);

        return redirect()->back()->with('success', 'Video berhasil ditambahkan!');
    }

    public function deleteVideo(Video $video)
    {
        $video->delete();
        return redirect()->back()->with('success', 'Video berhasil dihapus!');
    }

    // Document CRUD
    public function documentIndex(): Response
    {
        $documents = Document::orderBy('created_at', 'desc')->get();
        return Inertia::render('Admin/Document/Index', ['documents' => $documents]);
    }

    public function storeDocument(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'year' => 'required|string|max:4',
            'file' => 'required|file|mimes:pdf,doc,docx,xls,xlsx,zip|max:20480', // max 20MB
        ]);

        $data = [
            'title' => $validated['title'],
            'category' => $validated['category'],
            'year' => $validated['year'],
        ];

        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $filename = time() . '_' . Str::slug($request->title) . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('uploads/documents'), $filename);
            
            $data['file_path'] = '/uploads/documents/' . $filename;
            
            // Format file size
            $bytes = filesize(public_path('uploads/documents/' . $filename));
            $units = ['B', 'KB', 'MB', 'GB', 'TB'];
            $bytes = max($bytes, 0);
            $pow = floor(($bytes ? log($bytes) : 0) / log(1024));
            $pow = min($pow, count($units) - 1);
            $bytes /= (1 << (10 * $pow));
            $data['file_size'] = round($bytes, 1) . ' ' . $units[$pow];
        }

        Document::create($data);

        return redirect()->back()->with('success', 'Dokumen berhasil ditambahkan!');
    }

    public function deleteDocument(Document $document)
    {
        if ($document->file_path && file_exists(public_path($document->file_path))) {
            unlink(public_path($document->file_path));
        }
        $document->delete();

        return redirect()->back()->with('success', 'Dokumen berhasil dihapus!');
    }

    // Srikandi CRUD
    public function srikandiIndex(): Response
    {
        $srikandis = Srikandi::all();
        return Inertia::render('Admin/Srikandi/Index', ['srikandis' => $srikandis]);
    }

    public function storeSrikandi(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'position' => 'required|string|max:255',
            'description' => 'required|string',
            'image_file' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:5120',
        ]);

        $data = $validated;

        if ($request->hasFile('image_file')) {
            $file = $request->file('image_file');
            $filename = time() . '_' . Str::slug($request->name) . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('uploads/srikandi'), $filename);
            $data['image_path'] = '/uploads/srikandi/' . $filename;
        }

        Srikandi::create($data);

        return redirect()->back()->with('success', 'Data Srikandi berhasil ditambahkan!');
    }

    public function deleteSrikandi(Srikandi $srikandi)
    {
        if ($srikandi->image_path && file_exists(public_path($srikandi->image_path))) {
            unlink(public_path($srikandi->image_path));
        }
        $srikandi->delete();

        return redirect()->back()->with('success', 'Data Srikandi berhasil dihapus!');
    }

    // Sustainability Program CRUD
    public function sustainabilityIndex(): Response
    {
        $programs = SustainabilityProgram::all();
        return Inertia::render('Admin/Sustainability/Index', ['programs' => $programs]);
    }

    public function storeSustainability(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:5120',
        ]);

        $data = $validated;

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = time() . '_' . Str::slug($request->title) . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('uploads/sustainability'), $filename);
            $data['image'] = '/uploads/sustainability/' . $filename;
        }

        SustainabilityProgram::create($data);

        return redirect()->back()->with('success', 'Program ESG berhasil ditambahkan!');
    }

    public function updateSustainability(Request $request, SustainabilityProgram $sustainability)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:5120',
        ]);

        $data = [
            'title' => $validated['title'],
            'category' => $validated['category'],
            'description' => $validated['description'],
        ];

        if ($request->hasFile('image')) {
            if ($sustainability->image && file_exists(public_path($sustainability->image))) {
                @unlink(public_path($sustainability->image));
            }
            $file = $request->file('image');
            $filename = time() . '_' . Str::slug($request->title) . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('uploads/sustainability'), $filename);
            $data['image'] = '/uploads/sustainability/' . $filename;
        }

        $sustainability->update($data);

        return redirect()->back()->with('success', 'Program ESG berhasil diperbarui!');
    }

    public function deleteSustainability(SustainabilityProgram $sustainability)
    {
        if ($sustainability->image && file_exists(public_path($sustainability->image))) {
            @unlink(public_path($sustainability->image));
        }
        $sustainability->delete();

        return redirect()->back()->with('success', 'Program ESG berhasil dihapus!');
    }

    // CSR Program CRUD
    public function csrIndex(): Response
    {
        $programs = CsrProgram::all();
        return Inertia::render('Admin/CSR/Index', ['programs' => $programs]);
    }

    public function storeCsr(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'date' => 'required|date',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:5120',
        ]);

        $data = $validated;

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = time() . '_' . Str::slug($request->title) . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('uploads/csr'), $filename);
            $data['image'] = '/uploads/csr/' . $filename;
        }

        CsrProgram::create($data);

        return redirect()->back()->with('success', 'Program CSR berhasil ditambahkan!');
    }

    public function updateCsr(Request $request, CsrProgram $csr)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'date' => 'required|date',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:5120',
        ]);

        $data = [
            'title' => $validated['title'],
            'category' => $validated['category'],
            'location' => $validated['location'],
            'date' => $validated['date'],
            'description' => $validated['description'],
        ];

        if ($request->hasFile('image')) {
            if ($csr->image && file_exists(public_path($csr->image))) {
                @unlink(public_path($csr->image));
            }
            $file = $request->file('image');
            $filename = time() . '_' . Str::slug($request->title) . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('uploads/csr'), $filename);
            $data['image'] = '/uploads/csr/' . $filename;
        }

        $csr->update($data);

        return redirect()->back()->with('success', 'Program CSR berhasil diperbarui!');
    }

    public function deleteCsr(CsrProgram $csr)
    {
        if ($csr->image && file_exists(public_path($csr->image))) {
            @unlink(public_path($csr->image));
        }
        $csr->delete();

        return redirect()->back()->with('success', 'Program CSR berhasil dihapus!');
    }

    // 8. News & Messages
    public function messagesIndex(): Response
    {
        $messages = ContactMessage::orderBy('created_at', 'desc')->get();
        return Inertia::render('Admin/Messages/Index', ['messages' => $messages]);
    }

    public function toggleMessageRead(ContactMessage $message)
    {
        $message->update(['is_read' => !$message->is_read]);
        return redirect()->back()->with('success', 'Status pesan diperbarui.');
    }

    // 10. Site Settings Management
    public function settingsIndex(): Response
    {
        $settings = Setting::all()->pluck('value', 'key');
        return Inertia::render('Admin/Settings/Index', ['settings' => $settings]);
    }

    public function updateSettings(Request $request)
    {
        foreach ($request->except('_token') as $key => $val) {
            $value = is_array($val) ? json_encode($val) : $val;
            Setting::updateOrCreate(['key' => $key], ['value' => $value]);
        }
        return redirect()->back()->with('success', 'Pengaturan situs berhasil diperbarui!');
    }
}
