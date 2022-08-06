<?php

namespace App\Http\Controllers;

use App\Events\FinishEvent;
use App\Models\FinalScore;
use App\Models\Room;
use App\Models\RoomEvent;
use App\Models\RoomGame;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\Result;
use App\Models\Score;
use App\Models\UsersScoring;

use function PHPUnit\Framework\returnSelf;

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
        //get all room data
    }

    public function change_letter()
    {
        $room_key = request()->room_key;
        $room = Room::where('key', $room_key)->update(['letter' => request()->letter]);
        //for set letter in database room (Because when the page is refreshed, the letter for the game does not disappear)
    }

    public function get_letter()
    {
        $room_key = request()->room_key;
        $room = Room::where('key', $room_key)->get();

        return $room[0]->letter;

        //to get letter and set that for game
    }

    public function change_started(Request $request)
    {
        $room_key = request()->room_key;
        $room = Room::where('key', $room_key)->update(['started' => true, 'finished' => false]);
        //for set (started : true) on database, to avoid problems when refreshed the page
    }

    public function get_room_games()
    {
        $room_key = request()->room_key;

        $room_games = RoomGame::where('room_key', $room_key)->get();

        return $room_games;
    }

    public function finished()
    {
        $room_key = request()->room_key;
        $room = Room::where('key', $room_key)->update(['finished' => true]);
        //for set (finished : true) on database, to avoid problems when refreshed the page
    }

    public function get_answers()
    {
        $room_key = request()->room_key;

        $results = Result::where('room_key', $room_key)->get();

        return $results;

        //for list all answers on room
    }

    public function get_scores()
    {
        $scores = Score::where('room_key', request()->room_key)->where('from_id', request()->from_id)->get();

        return $scores;
    }

    public function get_users_scores()
    {
        $UsersScorings = UsersScoring::where('room_key', request()->room_key)->where('letter', request()->letter)->where('user_id', request()->user_id)->get();

        if ($UsersScorings->isEmpty()) {
            return true;
        } else {
            return false;
        }
    }

    public function count_palyers_scores()
    {
        if (request()->letter !== "") {
            $count = RoomGame::where('room_key', request()->room_key)->where('letter', request()->letter)->get();
            if ($count->isEmpty()) {
                return false;
            } else {
                return $count[0];
            }
        }

        //for when page is refreshed get count to play again or no
    }

    public function compare_scores()
    {
        $scores = Score::where('room_key', request()->room_key)->where('letter', request()->letter)->get();

        return $scores;
    }

    public function change_scores_sended()
    {
        $room = Room::where('key', request()->room_key)->update(['scores_sended' => true]);
    }

    public function change_scores_not_sended()
    {
        $room = Room::where('key', request()->room_key)->update(['scores_sended' => false]);
    }

    public function make_final_result_event()
    {
        $event = RoomEvent::create([
            'room_key' => request()->room_key,
            'event' => 'show_final_results',
            'letter' => 'null',
        ]);

        $room = Room::where('key', request()->room_key)->update(['final_results' => true]);

        event(new FinishEvent($event));
    }

    public function get_final_result()
    {
        $final_result = FinalScore::where('room_key', request()->room_key)->get();

        return $final_result;
    }

    public function edit_scores()
    {
        $score = Score::where('from_id', request()->from_id)->where('letter', request()->letter)->where('name', request()->name)->update([
            'esm_score' => request()->esm_score,
            'famil_score' => request()->famil_score,
            'ghaza_score' => request()->ghaza_score,
            'miveh_score' => request()->miveh_score,
            'mashin_score' => request()->mashin_score,
            'ashia_score' => request()->ashia_score,
        ]);

        return $score;
    }

    public function get_rooms()
    {
        $rooms = Room::all();

        return $rooms;
    }
}
