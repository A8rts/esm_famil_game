<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        return view('home');
    }

    public function profile()
    {
        $id = Auth::user()->id;
        $user = User::find($id);
        $email = User::find($id)->email;
        $name = User::find($id)->name;

        $user_data = ['id' => $id, 'email' => $email, 'name' => $name, 'user' => $user];

        return $user_data;
    }
}
