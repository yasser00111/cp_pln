<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class BiodiversityProgram extends Model
{
    use HasUuids;

    protected $fillable = ['title', 'species_count', 'area_monitored_ha', 'description', 'pdf_report', 'image'];
}
