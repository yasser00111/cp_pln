<?php

namespace App\Http\Controllers;

use App\Models\OperationalStatistic;
use App\Models\OperationalMetric;
use App\Models\Facility;
use Inertia\Inertia;
use Inertia\Response;

class OperationalController extends Controller
{
    public function index(): Response
    {
        $statistics = OperationalStatistic::orderBy('order_priority')->get();
        $facilities = Facility::all();
        return Inertia::render('Operational/Index', [
            'statistics' => $statistics,
            'facilities' => $facilities,
        ]);
    }

    public function kapasitas(): Response
    {
        $statistics = OperationalStatistic::whereIn('metric_key', ['capacity', 'energy_production', 'operating_year'])->get();
        return Inertia::render('Operational/Kapasitas', ['statistics' => $statistics]);
    }

    public function performance(): Response
    {
        $metrics = OperationalMetric::orderBy('month')->get();
        $statistics = OperationalStatistic::whereIn('metric_key', ['reliability', 'energy_production', 'capacity'])->get();
        return Inertia::render('Operational/Performance', [
            'metrics' => $metrics,
            'statistics' => $statistics,
        ]);
    }

    public function unitFasilitas(): Response
    {
        $facilities = Facility::all();
        return Inertia::render('Operational/UnitFasilitas', ['facilities' => $facilities]);
    }
}
