<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class OperationalMetric extends Model
{
    use HasUuids;

    protected $fillable = [
        'period_label',
        'year',
        'month',
        'energy_production_gwh',
        'availability_factor',
        'reliability_index',
        'heat_rate_kcal',
    ];
}
