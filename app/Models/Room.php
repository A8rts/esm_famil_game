<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'key', 'owner', 'letter', 'started' , 'finished' , 'scores_sended' , 'final_results' , 'type'];
}
