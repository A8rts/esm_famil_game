<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Score extends Model
{
    use HasFactory;
    protected $fillable = ['room_key', 'letter', 'from_id', 'name', 'esm_score', 'famil_score', 'ghaza_score', 'miveh_score', 'mashin_score', 'ashia_score'];
}

//To record scores