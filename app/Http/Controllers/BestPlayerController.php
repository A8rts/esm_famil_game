<?php

namespace App\Http\Controllers;

use App\Models\BestPlayer;
use App\Models\User;
use Illuminate\Http\Request;

class BestPlayerController extends Controller
{
    public function create_user_history()
    {
        $user = User::where('name', request()->user_name)->get();
        $email = $user[0]->email;
        $name = $user[0]->name;
        $id = $user[0]->id;

        $user_history = BestPlayer::where('user_id', $id)->where('score', request()->user_score)->where('letter', request()->letter)->where('room_key', request()->room_key)->get();
        $user_score_history = BestPlayer::where('name', $name)->where('type', 'score')->get();

        if ($user_history->isEmpty()) {
            BestPlayer::create([
                'user_id' => $id,
                'name' => $name,
                'email' => $email,
                'score' => request()->user_score,
                'letter' => request()->letter,
                'room_key' => request()->room_key,
                'type' => 'game',
            ]);

            if ($user_score_history->isEmpty()) {
                BestPlayer::create([
                    'user_id' => $id,
                    'name' => $name,
                    'email' => $email,
                    'score' => request()->user_score,
                    'letter' => request()->letter,
                    'room_key' => request()->room_key,
                    'type' => 'score',
                ]);
            } else {
                $prevScore = (int) $user_score_history[0]->score;
                BestPlayer::where('name', $name)->where('type', 'score')->update(['score' => $prevScore + request()->user_score]);
            }
        }
    }

    public function get_best_players()
    {
        $best_players = BestPlayer::all();

        return $best_players;
    }
}
