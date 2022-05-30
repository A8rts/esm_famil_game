<?php

namespace App\Http\Controllers;

use App\Events\FinishEvent;
use App\Models\Room;
use App\Models\RoomEvent;
use App\Models\RoomGame;
use App\Models\User;
use App\Models\UserGame;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules\Unique;

class RoomController extends Controller
{
    public function room_data(Request $request)
    {
        $room_key = request()->room_key;
        $room = Room::where('key', $room_key)->get();

        if ($room->isEmpty()) {
            return 'error';
        } else {
            $owner = $room[0]->owner;

            return $owner;
        }
    }

    public function create_room(Request $request)
    {
        $room_name = request()->room_name;
        $letter = request()->letter;
        $owner = request()->user_id;

        $key = Str::random(20);

        $check_room = Room::where('key', $key)->get();

        if ($check_room->isEmpty()) {
            $create = Room::create([
                'name' => $room_name,
                'key' => $key,
                'owner' => $owner,
                'letter' => '',
                'started' => false,
                'finished' => false,
            ]);

            return $create;
        } else {
            return 'no';
        }
    }

    public function start(Request $request)
    {
        $room_key = request()->room_key;
        $event = RoomEvent::create([
            'room_key' => $room_key,
            'event' => 'start',
        ]);

        event(new FinishEvent($event));

        $letters = request()->letters;

        $rand = array_rand($letters, 1);

        return $letters[$rand];
    }

    public function change_letter()
    {
        $room_key = request()->room_key;
        $room = Room::where('key', $room_key)->update(['letter' => request()->letter]);
    }

    public function get_letter()
    {
        $room_key = request()->room_key;
        $room = Room::where('key', $room_key)->get();

        return $room[0]->letter;
    }

    public function change_started(Request $request)
    {
        $room_key = request()->room_key;
        $room = Room::where('key', $room_key)->update(['started' => true, 'finished' => false]);

        return 'updated';
    }

    public function create_room_game()
    {
        $room_key = request()->room_key;
        $letter = request()->letter;

        $create = RoomGame::create([
            'room_key' => $room_key,
            'letter' => $letter,
        ]);

        return $create;
    }

    public function finish(Request $request)
    {
        $room_key = request()->room_key;
        $room = Room::where('key', $room_key)->get();

        $user_id = request()->user_id;
        $user_name = User::find($user_id)->name;

        $esm = request()->esm;
        $famil = request()->famil;
        $ghaza = request()->ghaza;
        $miveh = request()->miveh;
        $mashin = request()->mashin;
        $ashia = request()->ashia;
        $message = "جواب های $user_name =>  اسم : $esm  , فامیل : $famil  , غذا : $ghaza  , میوه : $miveh ,  ماشین : $mashin ,  اشیا : $ashia";

        $event = RoomEvent::create([
            'room_key' => $room_key,
            'event' => $message,
        ]);

        event(new FinishEvent($event));

        return $event;
    }

    public function get_room_games()
    {
        $room_key = request()->room_key;

        $room_games = RoomGame::where('room_key', $room_key)->get();

        return $room_games;
    }

    public function get_users_game()
    {
        $room_key = request()->room_key;

        $users_games = UserGame::where('room_key', $room_key)->get();

        return $users_games;
    }

    public function finished()
    {
        $room_key = request()->room_key;
        $room = Room::where('key', $room_key)->update(['finished' => true]);
    }

    public function get_answers()
    {
        $room_key = request()->room_key;

        $answers = RoomEvent::where('room_key', $room_key)->get();

        return $answers;
    }

    public function create_user_game()
    {
        $room_key = request()->room_key;
        $letter = request()->letter;
        $answer = request()->answer;

        $create = UserGame::create([
            'room_key' => $room_key,
            'letter' => $letter,
            'answer' => $answer,
        ]);

        return $create;
    }

    public function letters_finished()
    {
        $room_key = request()->room_key;

        $event = RoomEvent::create([
            'room_key' => $room_key,
            'event' => 'all letters finished',
        ]);

        event(new FinishEvent($event));

        //for when all letters in game finished, make event to all users
    }
}
