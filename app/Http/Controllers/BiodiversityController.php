<?php

namespace App\Http\Controllers;

use App\Models\BiodiversitySpecies;
use App\Models\BiodiversityProgram;
use Inertia\Inertia;
use Inertia\Response;

class BiodiversityController extends Controller
{
    public function index(): Response
    {
        $species = BiodiversitySpecies::all();
        $program = BiodiversityProgram::first();

        return Inertia::render('Biodiversity/Index', [
            'species' => $species,
            'program' => $program,
        ]);
    }
    public function info(): Response
    {
        $species = BiodiversitySpecies::all();
        $program = BiodiversityProgram::first();

        return Inertia::render('Biodiversity/Info', [
            'species' => $species,
            'program' => $program,
        ]);
    }

    public function kehatiData(): Response
    {
        $species = BiodiversitySpecies::all();
        return Inertia::render('Biodiversity/KehatiData', [
            'species' => $species,
        ]);
    }

    public function kehatiIndeks(): Response
    {
        return Inertia::render('Biodiversity/KehatiIndeks');
    }

    public function report(): Response
    {
        return Inertia::render('Biodiversity/Report');
    }

    public function program(): Response
    {
        $program = BiodiversityProgram::first();
        return Inertia::render('Biodiversity/Program', ['program' => $program]);
    }
}
