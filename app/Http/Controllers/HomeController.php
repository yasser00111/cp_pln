<?php

namespace App\Http\Controllers;

use App\Models\CompanyProfile;
use App\Models\OperationalStatistic;
use App\Models\OperationalMetric;
use App\Models\Facility;
use App\Models\SustainabilityProgram;
use App\Models\News;
use App\Models\Award;
use App\Models\Setting;
use App\Models\HeroSlider;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {
        $heroSliders = HeroSlider::where('is_active', true)->orderBy('order_priority')->get();
        $about = CompanyProfile::where('key', 'tentang')->first();
        $visi = CompanyProfile::where('key', 'visi')->first();
        $misiRaw = CompanyProfile::where('key', 'misi')->first();
        $misi = $misiRaw ? json_decode($misiRaw->content, true) : [];

        $statistics = OperationalStatistic::orderBy('order_priority')->get();
        $metrics = OperationalMetric::orderBy('month')->get();
        $facilities = Facility::take(6)->get();
        $sustainability = SustainabilityProgram::take(3)->get();
        $latestNews = News::with('category')->whereNotNull('published_at')->orderBy('published_at', 'desc')->take(3)->get();
        $awards = Award::take(4)->get();
        $settings = Setting::all()->pluck('value', 'key');

        return Inertia::render('Home', [
            'heroSliders' => $heroSliders,
            'about' => $about,
            'visi' => $visi,
            'misi' => $misi,
            'statistics' => $statistics,
            'metrics' => $metrics,
            'facilities' => $facilities,
            'sustainability' => $sustainability,
            'latestNews' => $latestNews,
            'awards' => $awards,
            'settings' => $settings,
        ]);
    }
}
