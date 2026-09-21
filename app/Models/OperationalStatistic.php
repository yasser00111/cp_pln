<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class OperationalStatistic extends Model
{
    use HasUuids;

    protected $fillable = ['metric_key', 'label', 'value', 'numeric_value', 'unit', 'subtext', 'order_priority'];
}
