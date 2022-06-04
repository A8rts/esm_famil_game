<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Result extends Model
{
    use HasFactory;
    protected $fillable = ['room_key', 'name', 'esm', 'famil', 'ghaza', 'miveh', 'mashin', 'ashia' , 'letter'];
}
