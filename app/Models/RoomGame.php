<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RoomGame extends Model
{
    use HasFactory;
    protected $fillable = ['room_key', 'letter'];
}

//This model is for get all users answers and list that in room <= for final result