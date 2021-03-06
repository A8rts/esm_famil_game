<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BestPlayer extends Model
{
    use HasFactory;
    protected $fillable = ['user_id', 'name', 'email', 'score', 'letter', 'room_key' , 'type'];
}
