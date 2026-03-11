<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Enums\UserRole;

class RoleMiddleware
{
    public function handle(Request $request, Closure $next, ...$roles): Response
    {
        $user = $request->user();

        if (!$user) {
            abort(403, 'Unauthorized');
        }

        $allowedRoles = collect($roles)
            ->map(fn ($role) => UserRole::from($role));

        if (!$allowedRoles->contains($user->role)) {
            abort(403, 'You do not have permission to access this resource.');
        }

        return $next($request);
    }
}