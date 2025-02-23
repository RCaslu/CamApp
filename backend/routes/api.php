<?php

use App\Http\Controllers\ImageController;
use App\Http\Controllers\CollectionController;
use Illuminate\Support\Facades\Route;

Route::apiResource('images', ImageController::class);
Route::apiResource('collections', CollectionController::class);
Route::post('/images/upload', [ImageController::class, 'upload']);