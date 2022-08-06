<?php

namespace App\Http\Controllers;

use App\Events\FinishEvent;
use App\Events\KickRequestEvent;
use App\Models\BestPlayer;
use App\Models\FinalScore;
use App\Models\KickRequest;
use App\Models\Room;
use App\Models\RoomEvent;
use App\Models\RoomGame;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\Result;
use App\Models\Score;
use App\Models\UsersScoring;


class CreateController extends Controller
{
    public function create_public_room(Request $request)
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
                'scores_sended' => false,
                'final_results' => false,
                'type' => 'public',
            ]);

            return $create;
        } else {
            return 'no';
        }

        //for creating rooms
    }

    public function create_private_room(Request $request)
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
                'scores_sended' => false,
                'final_results' => false,
                'type' => 'private',
            ]);

            return $create;
        } else {
            return 'no';
        }

        //for creating rooms
    }

    public function start(Request $request)
    {
        $room_key = request()->room_key;
        $event = RoomEvent::create([
            'room_key' => $room_key,
            'event' => 'start',
            'letter' => 'null',
        ]);

        event(new FinishEvent($event));

        $letters = request()->letters;

        $rand = array_rand($letters, 1);

        return $letters[$rand];

        //make event (game started) to users on room and find one random letter for game
    }

    public function create_room_game()
    {
        $room_key = request()->room_key;
        $letter = request()->letter;

        $create = RoomGame::create([
            'room_key' => $room_key,
            'letter' => $letter,
            'count_players_save_score' => 0,
        ]);

        return $create;

        //for make all data games in room
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
            'letter' => request()->letter,
        ]);

        $result = Result::create([
            'room_key' => $room_key,
            'name' => $user_name,
            'esm' => $esm,
            'famil' => $famil,
            'ghaza' => $ghaza,
            'miveh' => $miveh,
            'mashin' => $mashin,
            'ashia' => $ashia,
            'letter' => request()->letter,
        ]);

        event(new FinishEvent($event));
        //for get form game data to list that
    }

    public function letters_finished()
    {
        $room_key = request()->room_key;

        $event = RoomEvent::create([
            'room_key' => $room_key,
            'event' => 'all letters finished',
            'letter' => 'null',
        ]);

        event(new FinishEvent($event));

        //for when all letters in game finished, make event to all users
    }

    public function game_finished()
    {
        $room_key = request()->room_key;

        $event = RoomEvent::create([
            'room_key' => $room_key,
            'event' => 'finish',
            'letter' => 'null',
        ]);

        event(new FinishEvent($event));

        //when user click on finish in gameform, make event for another users
    }

    public function save_score()
    {
        $create_score = Score::create([
            'room_key' => request()->room_key,
            'letter' => request()->letter,
            'from_id' => request()->from_id,
            'name' => request()->name,
            'esm_score' => request()->esm_score,
            'famil_score' => request()->famil_score,
            'ghaza_score' => request()->ghaza_score,
            'miveh_score' => request()->miveh_score,
            'mashin_score' => request()->mashin_score,
            'ashia_score' => request()->ashia_score,
        ]);

        return $create_score;
    }

    public function done_score()
    {
        $event = RoomEvent::create([
            'room_key' => request()->room_key,
            'event' => 'one_player_finished_scores',
            'letter' => 'null',
        ]);

        $preveRoomGame = RoomGame::where('room_key', request()->room_key)->where('letter', request()->letter)->get();
        $prev_count_players_save_score = $preveRoomGame[0]->count_players_save_score;
        $newRoomGame = RoomGame::where('room_key', request()->room_key)->where('letter', request()->letter)->update(['count_players_save_score' => $prev_count_players_save_score + 1]);

        $UsersScoring = UsersScoring::create([
            'room_key' => request()->room_key,
            'letter' => request()->letter,
            'user_id' => request()->user_id,
        ]);

        event(new FinishEvent($event));
    }

    public function final_score()
    {
        $final_score = FinalScore::where('room_key', request()->room_key)->where('name', request()->name)->get();

        if ($final_score->isEmpty()) {
            $create = FinalScore::create([
                'room_key' => request()->room_key,
                'name' => request()->name,
                'score' => request()->score,
            ]);

            return $create;
        } else {
            $prevScore = $final_score[0]->score;

            $updateScore = FinalScore::where('room_key', request()->room_key)->where('name', request()->name)->update(['score' => $prevScore + request()->score]);
        }
    }

    public function update_score()
    {
        return request()->all();
    }

    public function kick_request()
    {
        $kick_request = KickRequest::create([
            'toId' => request()->toId,
        ]);

        event(new KickRequestEvent($kick_request));
    }
}
