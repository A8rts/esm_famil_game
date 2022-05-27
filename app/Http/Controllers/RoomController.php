<?php

namespace App\Http\Controllers;

use App\Events\FinishEvent;
use App\Models\Room;
use App\Models\RoomEvent;
use App\Models\User;
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
            $letter = $room[0]->letter;
            $room_data = array($owner, $letter);

            return $room_data;
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
                'letter' => $letter,
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
    }

    public function change_started(Request $request)
    {
        $room_key = request()->room_key;
        $room = Room::where('key', $room_key)->update(['started' => true]);

        return 'updated';
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
}
