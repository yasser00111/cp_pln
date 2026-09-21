<?php

namespace App\Http\Controllers;

use App\Models\SustainabilityProgram;
use App\Models\CsrProgram;
use App\Models\SafetyProgram;
use Inertia\Inertia;
use Inertia\Response;

use App\Models\Content;
use App\Models\Srikandi;

class SustainabilityController extends Controller
{
    public function index(): Response
    {
        $programs = SustainabilityProgram::all();
        $safety = SafetyProgram::first();
        return Inertia::render('Sustainability/Index', [
            'programs' => $programs,
            'safety' => $safety,
        ]);
    }

    public function lingkungan(): Response
    {
        $programs = SustainabilityProgram::where('category', 'Environmental')->get();
        return Inertia::render('Sustainability/Lingkungan', ['programs' => $programs]);
    }

    public function csr(): Response
    {
        $programs = CsrProgram::orderBy('date', 'desc')->get();
        
        $contents = Content::whereIn('section_key', [
            'sustainability_csr_title',
            'sustainability_csr_description'
        ])->get()->keyBy('section_key');

        return Inertia::render('Sustainability/CSR', [
            'programs' => $programs,
            'cms' => $contents
        ]);
    }

    public function k3(): Response
    {
        $safety = SafetyProgram::first();
        return Inertia::render('Sustainability/K3', ['safety' => $safety]);
    }

    public function esg(): Response
    {
        $programs = SustainabilityProgram::all();
        return Inertia::render('Sustainability/ESG', ['programs' => $programs]);
    }

    public function gender(): Response
    {
        $srikandis = Srikandi::all();
        return Inertia::render('Sustainability/Gender', ['srikandis' => $srikandis]);
    }
}
