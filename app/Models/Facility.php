<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Facility extends Model
{
    use HasUuids;

    protected $fillable = ['title', 'slug', 'category', 'description', 'technical_specs', 'image'];

    protected $casts = [
        'technical_specs' => 'array',
    ];
}
