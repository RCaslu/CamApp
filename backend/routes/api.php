<?php

use App\Http\Controllers\UserController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\CollectionController;
use App\Http\Controllers\CollectionImageController;
use Illuminate\Support\Facades\Route;

Route::apiResource('images', ImageController::class);
Route::apiResource('collections', CollectionController::class);
Route::post('/images/upload', [ImageController::class, 'upload']);