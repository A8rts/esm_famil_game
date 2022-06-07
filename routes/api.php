<?php

use App\Http\Controllers\CheckRoomController;
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

Route::post('create_room', [RoomController::class, 'create_room']);


Route::post('finish', [RoomController::class, 'finish']);
Route::post('start', [RoomController::class, 'start']);
Route::post('change_started', [RoomController::class, 'change_started']);
Route::post('finished', [RoomController::class, 'finished']);
Route::post('room_data', [RoomController::class, 'room_data']);
Route::post('get_answers', [RoomController::class, 'get_answers']);
Route::post('change_letter', [RoomController::class, 'change_letter']);
Route::post('get_letter', [RoomController::class, 'get_letter']);
Route::post('letters_finished', [RoomController::class, 'letters_finished']);
Route::post('create_room_game', [RoomController::class, 'create_room_game']);
Route::post('get_room_games', [RoomController::class, 'get_room_games']);
Route::post('game_finished', [RoomController::class, 'game_finished']);
Route::post('save_score', [RoomController::class, 'save_score']);
Route::post('get_scores', [RoomController::class, 'get_scores']);
Route::post('done_score', [RoomController::class, 'done_score']);
Route::post('get_users_scores', [RoomController::class, 'get_users_scores']);
Route::post('count_palyers_scores', [RoomController::class, 'count_palyers_scores']);

Route::post('check_saved_score', [CheckRoomController::class, 'check_saved_score']);
Route::post('check_key', [CheckRoomController::class, 'check_key']);
Route::post('check_started', [CheckRoomController::class, 'check_started']);
Route::post('check_finished', [CheckRoomController::class, 'check_finished']);
Route::post('check_letters', [CheckRoomController::class, 'check_letters']);
Route::post('check_scores', [CheckRoomController::class, 'check_scores']);
