<?php

namespace App\Providers;

use App\Enums\UserRole;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;
use App\Models\User;
use App\Policies\UserPolicy;

class AuthServiceProvider extends ServiceProvider
{
    protected $policies = [
        User::class => UserPolicy::class,
    ];

    public function boot(): void
    {

        Gate::define('admin-access', function (User $user) {
            return $user->role === UserRole::ADMIN;
        });

        Gate::define('manager-access', function (User $user) {
            return in_array($user->role, [
                UserRole::ADMIN,
                UserRole::MANAGER
            ]);
        });
    }
}
