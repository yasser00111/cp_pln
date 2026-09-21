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

    // 9. Contact Messages
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
