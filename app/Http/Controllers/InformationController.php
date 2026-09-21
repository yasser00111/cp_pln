<?php

namespace App\Http\Controllers;

use App\Models\Document;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class InformationController extends Controller
{
    public function downloadsIndex(Request $request): Response
    {
        $query = Document::query();

        if ($request->has('category') && $request->category && $request->category !== 'All') {
            $query->where('category', $request->category);
        }

        $documents = $query->orderBy('year', 'desc')->get();
        $categories = ['All', 'Annual Report', 'Sustainability Report', 'Company Profile', 'Environmental Report', 'CSR Report'];

        return Inertia::render('Information/DownloadsIndex', [
            'documents' => $documents,
            'categories' => $categories,
            'selectedCategory' => $request->category ?? 'All',
        ]);
    }
}
