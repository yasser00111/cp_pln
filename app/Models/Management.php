<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Management extends Model
{
    use HasUuids;

    protected $table = 'managements';
    protected $fillable = [
        'name',
        'position',
        'birth_info',
        'education',
        'career_journey',
        'bio',
        'photo',
        'order_priority',
    ];

    protected $casts = [
        'education' => 'array',
        'career_journey' => 'array',
    ];
}
