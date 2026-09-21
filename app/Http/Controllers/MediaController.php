<?php

namespace App\Http\Controllers;

use App\Models\News;
use App\Models\Category;
use App\Models\Gallery;
use App\Models\Video;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MediaController extends Controller
{
    public function newsIndex(Request $request): Response
    {
        $query = News::with('category')->whereNotNull('published_at');

        if ($request->has('search') && $request->search) {
            $query->where('title', 'like', '%' . $request->search . '%')
                  ->orWhere('excerpt', 'like', '%' . $request->search . '%');
        }

        if ($request->has('category') && $request->category) {
            $query->whereHas('category', function ($q) use ($request) {
                $q->where('slug', $request->category);
            });
        }

        $newsList = $query->orderBy('published_at', 'desc')->paginate(6)->withQueryString();
        $categories = Category::all();

        return Inertia::render('Media/NewsIndex', [
            'newsList' => $newsList,
            'categories' => $categories,
            'filters' => $request->only(['search', 'category']),
        ]);
    }

    public function newsShow(string $slug): Response
    {
        $news = News::with('category')->where('slug', $slug)->firstOrFail();
        $relatedNews = News::with('category')
            ->where('id', '!=', $news->id)
            ->where('category_id', $news->category_id)
            ->take(3)
            ->get();

        return Inertia::render('Media/NewsShow', [
            'news' => $news,
            'relatedNews' => $relatedNews,
        ]);
    }

    public function galleryIndex(Request $request): Response
    {
        $query = Gallery::query();
        if ($request->has('category') && $request->category && $request->category !== 'All') {
            $query->where('category', $request->category);
        }

        $galleries = $query->orderBy('created_at', 'desc')->get();
        $categories = ['All', 'Operational', 'Environment', 'CSR', 'Events', 'Facilities'];

        return Inertia::render('Media/GalleryIndex', [
            'galleries' => $galleries,
            'categories' => $categories,
            'selectedCategory' => $request->category ?? 'All',
        ]);
    }

    public function videoIndex(): Response
    {
        $videos = Video::orderBy('created_at', 'desc')->get();
        return Inertia::render('Media/VideoIndex', ['videos' => $videos]);
    }
}
