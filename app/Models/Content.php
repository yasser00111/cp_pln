<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Content extends Model
{
    protected $fillable = [
        'section_key',
        'title',
        'body_text',
        'image_url',
        'meta_data'
    ];

    protected $casts = [
        'meta_data' => 'array'
    ];
}
