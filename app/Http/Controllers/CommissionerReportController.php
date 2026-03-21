<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CommissionerReportController extends Controller
{
    public function show(Request $request, User $user)
    {
        abort_unless($user->isCommissioner(), 404);

        $month = $request->string('month')->toString() ?: now()->format('Y-m');

        return Inertia::render('Commissioners/Show', [
            'commissioner' => [
                'id' => $user->id,
                'name' => $user->full_name,
                'email' => $user->email,
            ],
            'report' => $user->calculateMonthlyCommission($month),
            'filters' => [
                'month' => $month,
            ],
        ]);
    }
}