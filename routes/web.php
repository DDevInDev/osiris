<?php

use App\Http\Controllers\UserController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\CommissionerDashboardController;
use App\Http\Controllers\CommissionerReportController;
use App\Http\Controllers\LeadController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\Web\WebController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', [WebController::class, 'index'])->name('home');

Route::middleware(['auth', 'verified', 'role:admin,manager'])->prefix('admin')->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::resource('leads', LeadController::class);
    Route::patch('/leads/{lead}/status', [LeadController::class, 'updateStatus'])
        ->name('leads.update-status');

    Route::resource('clients', ClientController::class);
    Route::resource('users', UserController::class);
    Route::resource('projects', ProjectController::class);
    Route::get('/commissioners/{user}/report', [CommissionerReportController::class, 'show'])
    ->name('commissioners.report');
});

Route::middleware(['auth'])->group(function () {
    Route::get('/commission-dashboard', [CommissionerDashboardController::class, 'index'])
        ->name('commission-dashboard');
});

require __DIR__ . '/settings.php';
