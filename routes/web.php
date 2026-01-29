<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\SolicitudController;


// Auth
Route::post('/login', [AuthController::class, 'login']);
Route::get('/me', [AuthController::class, 'me'])->middleware('auth');
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth');

Route::get('/tipos-solicitud', [SolicitudController::class, 'tipos']);
Route::get('/mis-solicitudes', [SolicitudController::class, 'misSolicitudes']);
Route::post('/solicitudes', [SolicitudController::class, 'store']);

// Vista principal (React SPA)
Route::get('/{any}', function () {
    return view('app');
})->where('any', '.*');