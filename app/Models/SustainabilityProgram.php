<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class SustainabilityProgram extends Model
{
    use HasUuids;

    protected $fillable = ['title', 'category', 'description', 'metrics', 'image'];

    protected $casts = [
        'metrics' => 'array',
    ];
}
