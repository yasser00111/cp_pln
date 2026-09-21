<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class BiodiversitySpecies extends Model
{
    use HasUuids;

    protected $table = 'biodiversity_species';
    protected $fillable = ['name', 'latin_name', 'category', 'conservation_status', 'location', 'description', 'image'];
}
