<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserGame extends Model
{
    use HasFactory;
    protected $fillable = ['room_key', 'letter', 'answer'];
}

//This model is for the final resul and list all user`s answers in room with different letters