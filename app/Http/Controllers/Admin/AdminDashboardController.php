<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CompanyProfile;
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

    // 2. Profile Content Management (Tentang, Visi, Misi, Sejarah)
    public function profileIndex(): Response
    {
        $about = CompanyProfile::where('key', 'tentang')->first();
        $visi = CompanyProfile::where('key', 'visi')->first();
        $misiRaw = CompanyProfile::where('key', 'misi')->first();
        $misi = $misiRaw ? json_decode($misiRaw->content, true) : [];

        return Inertia::render('Admin/Profile/Index', [
            'about' => $about,
            'visi' => $visi,
            'misi' => $misi,
        ]);
    }

    public function updateProfile(Request $request)
    {
        if ($request->has('tentang')) {
            CompanyProfile::updateOrCreate(['key' => 'tentang'], ['title' => 'Tentang UBP Barru', 'content' => $request->tentang]);
        }
        if ($request->has('visi')) {
            CompanyProfile::updateOrCreate(['key' => 'visi'], ['title' => 'Visi Perusahaan', 'content' => $request->visi]);
        }
        if ($request->has('misi')) {
            CompanyProfile::updateOrCreate(['key' => 'misi'], ['title' => 'Misi Perusahaan', 'content' => json_encode($request->misi)]);
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
        Management::create($validated);

        return redirect()->back()->with('success', 'Data pimpinan/manajemen berhasil ditambahkan!');
    }

    public function deleteManagement(Management $management)
    {
        $management->delete();
        return redirect()->back()->with('success', 'Data pimpinan berhasil dihapus!');
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

    // 7. Biodiversity Species CRUD
    public function biodiversityIndex(): Response
    {
        $species = BiodiversitySpecies::all();
        return Inertia::render('Admin/Biodiversity/Index', ['species' => $species]);
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

    public function deleteSustainability(SustainabilityProgram $sustainability)
    {
        if ($sustainability->image && file_exists(public_path($sustainability->image))) {
            unlink(public_path($sustainability->image));
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

    public function deleteCsr(CsrProgram $csr)
    {
        if ($csr->image && file_exists(public_path($csr->image))) {
            unlink(public_path($csr->image));
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
            Setting::updateOrCreate(['key' => $key], ['value' => $val]);
        }
        return redirect()->back()->with('success', 'Pengaturan situs berhasil diperbarui!');
    }
}
