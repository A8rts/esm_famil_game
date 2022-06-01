<?php

namespace App\Http\Controllers;

use App\Models\Room;
use App\Models\RoomGame;
use Illuminate\Http\Request;

use function PHPUnit\Framework\returnSelf;

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

        if ($room[0]->started == 1 && $room[0]->finished == 1) {
            return 'false';
        } else if ($room[0]->finished) {
            return 'false';
        } else if ($room[0]->started) {
            return 'true';
        }else{
            return 'null';
        }
    }

    public function check_letters()
    {
        $room_key = request()->room_key;

        $letter = Room::where('key' , $room_key)->get();
        $room_games = RoomGame::where('room_key', $room_key)->get();

        $data = array($letter , $room_games);

        return $data;
    }
}
