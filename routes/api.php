<?php

use App\Http\Controllers\BestPlayerController;
use App\Http\Controllers\CheckRoomController;
use App\Http\Controllers\CreateController;
use App\Http\Controllers\RoomController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::post('change_started', [RoomController::class, 'change_started']);
Route::post('finished', [RoomController::class, 'finished']);
Route::post('room_data', [RoomController::class, 'room_data']);
Route::post('get_answers', [RoomController::class, 'get_answers']);
Route::post('change_letter', [RoomController::class, 'change_letter']);
Route::post('get_letter', [RoomController::class, 'get_letter']);
Route::post('get_room_games', [RoomController::class, 'get_room_games']);
Route::post('get_scores', [RoomController::class, 'get_scores']);
Route::post('get_users_scores', [RoomController::class, 'get_users_scores']);
Route::post('count_palyers_scores', [RoomController::class, 'count_palyers_scores']);
Route::post('compare_scores', [RoomController::class, 'compare_scores']);
Route::post('change_scores_sended', [RoomController::class, 'change_scores_sended']);
Route::post('change_scores_not_sended', [RoomController::class, 'change_scores_not_sended']);
Route::post('make_final_result_event', [RoomController::class, 'make_final_result_event']);
Route::post('get_final_result', [RoomController::class, 'get_final_result']);
Route::post('edit_scores', [RoomController::class, 'edit_scores']);


Route::post('create_room', [CreateController::class, 'create_room']);
Route::post('finish', [CreateController::class, 'finish']);
Route::post('start', [CreateController::class, 'start']);
Route::post('letters_finished', [CreateController::class, 'letters_finished']);
Route::post('create_room_game', [CreateController::class, 'create_room_game']);
Route::post('game_finished', [CreateController::class, 'game_finished']);
Route::post('save_score', [CreateController::class, 'save_score']);
Route::post('done_score', [CreateController::class, 'done_score']);
Route::post('final_score', [CreateController::class, 'final_score']);
Route::post('kick_request', [CreateController::class, 'kick_request']);


Route::post('create_user_history', [BestPlayerController::class, 'create_user_history']);
Route::post('get_best_players', [BestPlayerController::class, 'get_best_players']);


Route::post('check_saved_score', [CheckRoomController::class, 'check_saved_score']);
Route::post('check_key', [CheckRoomController::class, 'check_key']);
Route::post('check_started', [CheckRoomController::class, 'check_started']);
Route::post('check_finished', [CheckRoomController::class, 'check_finished']);
Route::post('check_letters', [CheckRoomController::class, 'check_letters']);
Route::post('check_scores', [CheckRoomController::class, 'check_scores']);
Route::post('check_scores_sended', [CheckRoomController::class, 'check_scores_sended']);
Route::post('check_show_final_results', [CheckRoomController::class, 'check_show_final_results']);
