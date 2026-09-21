<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Management extends Model
{
    use HasUuids;

    protected $table = 'managements';
    protected $fillable = ['name', 'position', 'bio', 'photo', 'order_priority'];
}
