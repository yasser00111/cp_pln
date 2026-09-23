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
            'contents.*.imageFile' => 'nullable|file|mimes:jpg,jpeg,png,webp|max:5120',
        ]);

        foreach ($data['contents'] as $item) {
            $content = Content::firstOrNew(['section_key' => $item['section_key']]);
            $content->title = $item['title'] ?? null;
            $content->body_text = $item['body_text'] ?? null;

            if (isset($item['imageFile']) && $item['imageFile'] instanceof \Illuminate\Http\UploadedFile) {
                if ($content->image_url && \Illuminate\Support\Facades\Storage::disk('public')->exists($content->image_url)) {
                    \Illuminate\Support\Facades\Storage::disk('public')->delete($content->image_url);
                }
                $path = $item['imageFile']->store('cms', 'public');
                $content->image_url = $path;
            }

            $content->save();
        }

        return redirect()->back()->with('success', 'Konten berhasil diperbarui!');
    }
}
