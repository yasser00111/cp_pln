<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class SafetyProgram extends Model
{
    use HasUuids;

    protected $fillable = ['title', 'description', 'zero_accident_days', 'image'];
}
