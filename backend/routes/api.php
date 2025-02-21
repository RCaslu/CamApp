<?php

use App\Http\Controllers\UserController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\CollectionController;
use App\Http\Controllers\CollectionImageController;
use Illuminate\Support\Facades\Route;

Route::get('/users', [UserController::class, 'index']);
Route::get('/users/{id}', [UserController::class, 'show']);
Route::post('/users', [UserController::class, 'store']);
Route::put('/users/{id}', [UserController::class, 'update']);
Route::delete('/users/{id}', [UserController::class, 'destroy']);

Route::get('/images', [ImageController::class, 'index']);
Route::get('/images/{id}', [ImageController::class, 'show']);
Route::post('/images', [ImageController::class, 'store']);
Route::delete('/images/{id}', [ImageController::class, 'destroy']);

Route::get('/collections', [CollectionController::class, 'index']);
Route::get('/collections/{id}', [CollectionController::class, 'show']);
Route::post('/collections', [CollectionController::class, 'store']);
Route::put('/collections/{id}', [CollectionController::class, 'update']);
Route::delete('/collections/{id}', [CollectionController::class, 'destroy']);

Route::post('/collections/{collection_id}/add-image/{image_id}', [CollectionImageController::class, 'store']);
Route::delete('/collections/{collection_id}/remove-image/{image_id}', [CollectionImageController::class, 'destroy']);


// Estudo = https://www.youtube.com/watch?v=jl65Kk8ZWDU
// Route::get('/users', [UserController::class, 'index']); //GET - http://127.0.0.1:8000/api/users?page=1
// Route::get('/users/{id}', [UserController::class, 'show']); //GET - http://127.0.0.1:8000/api/users/1
// Route::post('/users', [UserController::class, 'store']); //POST - http://127.0.0.1:8000/api/users
// Route::put('/users/{users}', [UserController::class, 'update']); //PUT - http://127.0.0.1:8000/api/users/1
// Route::delete('/users/{users}', [UserController::class, 'destroy']); //PUT - http://127.0.0.1:8000/api/users/1