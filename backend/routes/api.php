<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

Route::get('/users', [UserController::class, 'index']); //GET - http://127.0.0.1:8000/api/users?page=1
Route::get('/users/{id}', [UserController::class, 'show']); //GET - http://127.0.0.1:8000/api/users/1
Route::post('/users', [UserController::class, 'store']); //POST - http://127.0.0.1:8000/api/users
Route::put('/users/{users}', [UserController::class, 'update']); //PUT - http://127.0.0.1:8000/api/users/1
Route::delete('/users/{users}', [UserController::class, 'destroy']); //PUT - http://127.0.0.1:8000/api/users/1