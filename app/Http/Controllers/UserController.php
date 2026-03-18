<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\User;
use App\Enums\UserRole;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $query = User::query();

        if ($request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', "%{$request->search}%")
                    ->orWhere('last_name', 'like', "%{$request->search}%")
                    ->orWhere('email', 'like', "%{$request->search}%")
                    ->orWhere('phone', 'like', "%{$request->search}%");
            });
        }

        if ($request->role) {
            $query->where('role', $request->role);
        }

        $users = $query
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Users/Index', [
            'usersData' => $users,
            'filters' => $request->only(['search', 'role'])
        ]);
    }

    public function create()
    {
        return Inertia::render('Users/Create', [
            'roles' => UserRole::cases()
        ]);
    }

    public function store(StoreUserRequest $request)
    {
        User::create($request->validated());

        return redirect()
            ->route('users.index')
            ->with('toast', [
                'type' => 'success',
                'title' => 'Usuario creado',
                'description' => 'El usuario fue registrado correctamente',
                'position' => 'top-center'
            ]);
    }

    public function edit(User $user)
    {
        return Inertia::render('Users/Edit', [
            'user' => $user,
            'roles' => UserRole::cases()
        ]);
    }

    public function update(UpdateUserRequest $request, User $user)
    {
        $data = $request->validated();

        if (empty($data['password'])) {
            unset($data['password']);
        }

        $user->update($data);

        return redirect()
            ->route('users.index')
            ->with('toast', [
                'type' => 'success',
                'title' => 'Usuario actualizado',
                'description' => 'Los datos del usuario fueron actualizados correctamente',
                'position' => 'top-center'
            ]);
    }

    public function destroy(User $user)
    {
        $user->delete();

        return redirect()
            ->back()
            ->with('toast', [
                'type' => 'success',
                'title' => 'Usuario eliminado',
                'description' => 'El usuario fue eliminado correctamente',
                'position' => 'top-center'
            ]);
    }
}