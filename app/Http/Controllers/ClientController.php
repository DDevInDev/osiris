<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\User;
use Inertia\Inertia;
use App\Http\Requests\StoreClientRequest;
use App\Http\Requests\UpdateClientRequest;
use Illuminate\Http\Request;

class ClientController extends Controller
{
    public function index(Request $request)
    {
        $clients = Client::query()
            ->when($request->search, function ($query) use ($request) {
                $query->where('company_name', 'like', "%{$request->search}%");
            })
            ->when($request->client_type, function ($query) use ($request) {
                $query->where('client_type', $request->client_type);
            })
            ->when($request->currency, function ($query) use ($request) {
                $query->where('currency', $request->currency);
            })
            ->with('user')
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Clients/Index', [
            'clientsData' => $clients,
            'filters' => $request->only([
                'search',
                'client_type',
                'currency'
            ])
        ]);
    }

    public function create()
    {
        $users = User::where('role', 'user')
            ->select('id', 'name', 'email')
            ->get();

        return Inertia::render('Clients/Create', [
            'users' => $users
        ]);
    }

    public function store(StoreClientRequest $request)
    {
        Client::create($request->validated());

        return redirect()
            ->route('clients.index')
            ->with('success', 'Client created successfully');
    }

    public function edit(Client $client)
    {
        $users = User::where('role', 'user')
            ->select('id', 'name', 'email')
            ->get();

        return Inertia::render('Clients/Edit', [
            'client' => $client,
            'users' => $users
        ]);
    }

    public function update(UpdateClientRequest $request, Client $client)
    {
        $client->update($request->validated());

        return redirect()
            ->route('clients.index')
            ->with('success', 'Client updated successfully');
    }

    public function destroy(Client $client)
    {
        $client->delete();

        return redirect()->back();
    }
}
