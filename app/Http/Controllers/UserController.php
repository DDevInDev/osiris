<?php

namespace App\Http\Controllers;

use App\Enums\UserRole;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    public function index(Request $request): Response
    {
        $query = User::query();

        $query->when($request->filled('search'), function ($query) use ($request) {
            $search = $request->string('search')->toString();

            $query->where(function ($subQuery) use ($search) {
                $subQuery->where('name', 'like', "%{$search}%")
                    ->orWhere('last_name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('phone', 'like', "%{$search}%");
            });
        });

        $query->when($request->filled('role'), function ($query) use ($request) {
            $query->where('role', $request->string('role')->toString());
        });

        $users = $query
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Users/Index', [
            'usersData' => $users,
            'filters' => $request->only(['search', 'role']),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Users/Create', [
            'roles' => $this->getRoles(),
        ]);
    }

    public function store(StoreUserRequest $request): RedirectResponse
    {
        $payload = $this->buildUserPayload($request->validated());

        User::create($payload);

        return redirect()
            ->route('users.index')
            ->with('toast', [
                'type' => 'success',
                'title' => 'User created',
                'description' => 'The user has been successfully registered',
                'position' => 'top-center',
            ]);
    }

    public function edit(User $user): Response
    {
        return Inertia::render('Users/Edit', [
            'user' => $user,
            'roles' => $this->getRoles(),
        ]);
    }

    public function update(UpdateUserRequest $request, User $user): RedirectResponse
    {
        $payload = $this->buildUserPayload($request->validated(), $user, true);

        $user->update($payload);

        return redirect()
            ->route('users.index')
            ->with('toast', [
                'type' => 'success',
                'title' => 'User updated',
                'description' => 'User data has been successfully updated',
                'position' => 'top-center',
            ]);
    }

    public function destroy(User $user): RedirectResponse
    {
        $user->delete();

        return redirect()
            ->back()
            ->with('toast', [
                'type' => 'success',
                'title' => 'User deleted',
                'description' => 'The user has been successfully deleted',
                'position' => 'top-center',
            ]);
    }

    private function getRoles(): array
    {
        return array_map(
            fn (UserRole $role) => $role->value,
            UserRole::cases()
        );
    }

    private function buildUserPayload(array $data, ?User $user = null, bool $isUpdate = false): array
    {
        if ($isUpdate && empty($data['password'])) {
            unset($data['password']);
        }

        $data['meta'] = $this->resolveMeta(
            data: $data,
            currentMeta: $user?->meta ?? []
        );

        return $data;
    }

    private function resolveMeta(array $data, array $currentMeta = []): array
    {
        $meta = Arr::get($data, 'meta', $currentMeta);

        if (!is_array($meta)) {
            $meta = [];
        }

        $role = $data['role'] ?? null;

        if ($role === UserRole::COMMISSIONER->value) {
            $meta['commission'] = array_merge([
                'enabled' => false,
                'type' => 'percentage',
                'rate' => null,
                'applies_on' => 'project_total',
                'currency' => 'MXN',
                'notes' => null,
            ], Arr::get($data, 'meta.commission', Arr::get($meta, 'commission', [])));
        } else {
            unset($meta['commission']);
        }

        return $meta;
    }
}