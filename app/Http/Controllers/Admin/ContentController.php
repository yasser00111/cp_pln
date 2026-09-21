<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Content;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContentController extends Controller
{
    public function index()
    {
        $contents = Content::all()->keyBy('section_key');
        return Inertia::render('Admin/Contents/Index', [
            'contents' => $contents
        ]);
    }

    public function update(Request $request)
    {
        $data = $request->validate([
            'contents' => 'required|array',
            'contents.*.section_key' => 'required|string',
            'contents.*.title' => 'nullable|string',
            'contents.*.body_text' => 'nullable|string',
        ]);

        foreach ($data['contents'] as $item) {
            Content::updateOrCreate(
                ['section_key' => $item['section_key']],
                [
                    'title' => $item['title'] ?? null,
                    'body_text' => $item['body_text'] ?? null,
                ]
            );
        }

        return redirect()->back()->with('success', 'Konten berhasil diperbarui!');
    }
}
