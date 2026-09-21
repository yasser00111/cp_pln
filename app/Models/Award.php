<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Award extends Model
{
    use HasUuids;

    protected $fillable = ['title', 'category', 'year', 'issuer', 'description', 'image', 'pdf_file'];
}
