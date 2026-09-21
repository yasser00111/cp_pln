<?php

namespace App\Http\Controllers;

use App\Models\Content;
use App\Models\CompanyProfile;
use App\Models\Management;
use App\Models\Facility;
use App\Models\Award;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    public function tentang(): Response
    {
        $about = CompanyProfile::where('key', 'tentang')->first();
        
        // Fetch CMS Contents
        $contents = Content::whereIn('section_key', [
            'profile_tentang_title',
            'profile_tentang_description'
        ])->get()->keyBy('section_key');
        
        return Inertia::render('Profile/Tentang', [
            'about' => $about,
            'cms' => $contents
        ]);
    }

    public function visiMisi(): Response
    {
        $visi = CompanyProfile::where('key', 'visi')->first();
        $misiRaw = CompanyProfile::where('key', 'misi')->first();
        $misi = $misiRaw ? json_decode($misiRaw->content, true) : [];

        $contents = Content::all()->keyBy('section_key');

        return Inertia::render('Profile/VisiMisi', [
            'visi' => $visi,
            'misi' => $misi,
            'cms'  => $contents,
        ]);
    }

    public function sejarah(): Response
    {
        return Inertia::render('Profile/Sejarah');
    }

    public function struktur(): Response
    {
        return Inertia::render('Profile/Struktur');
    }

    public function pimpinan(): Response
    {
        $leaders = Management::orderBy('order_priority')->get();
        return Inertia::render('Profile/Pimpinan', ['leaders' => $leaders]);
    }

    public function fasilitas(): Response
    {
        $facilities = Facility::all();
        return Inertia::render('Profile/Fasilitas', ['facilities' => $facilities]);
    }

    public function penghargaan(): Response
    {
        $awards = Award::all();
        return Inertia::render('Profile/Penghargaan', ['awards' => $awards]);
    }

    public function humanCapital(): Response
    {
        return Inertia::render('Profile/HumanCapital');
    }
}
