<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class CsrProgram extends Model
{
    use HasUuids;

    protected $fillable = ['title', 'category', 'date', 'location', 'description', 'impact', 'image'];
}
