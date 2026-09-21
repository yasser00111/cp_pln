<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class HeroSlider extends Model
{
    use HasUuids;

    protected $fillable = [
        'title',
        'subtitle',
        'image',
        'cta_text',
        'cta_url',
        'order_priority',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];
}
