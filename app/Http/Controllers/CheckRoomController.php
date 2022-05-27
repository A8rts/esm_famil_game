<?php

namespace App\Http\Controllers;

use App\Models\Room;
use Illuminate\Http\Request;

class CheckRoomController extends Controller
{
    public function check_key()
    {
        $room_key = request()->room_key;

        $room = Room::where('key', $room_key)->get();

        if ($room->isEmpty()) {
            return 'empty';
        } else if ($room[0]->started == 1) {
            return 'started';
        } else if ($room[0]->finished == 1) {
            return 'finished';
        } else {
            return 'ok';
        }
    }

    public function check_started(Request $request)
    {
        $room_key = request()->room_key;
        $room = Room::where('key', $room_key)->get();

        if ($room[0]->started) {
            return 'true';
        } else {
            return 'false';
        }
    }

    public function check_finished()
    {
        $room_key = request()->room_key;
        $room = Room::where('key', $room_key)->get();

        if ($room[0]->finished) {
            return 'true';
        } else {
            return 'false';
        }
    }
}
