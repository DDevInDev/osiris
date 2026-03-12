<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\User;
use Inertia\Inertia;
use App\Http\Requests\StoreClientRequest;
use App\Http\Requests\UpdateClientRequest;
use App\Models\Lead;
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

    public function create(Request $request)
    {
        $users = User::where('role', 'user')
            ->select('id', 'name', 'email')
            ->get();

        $initialValues = null;

        if ($request->filled('lead_id')) {

            $lead = Lead::findOrFail($request->lead_id);

            $initialValues = [
                'user_id' => $lead->assigned_user_id,
                'company_name' => $lead->meta['company'] ?? $lead->name,
                'website' => $lead->meta['website'] ?? '',
                'client_type' => 'development',
                'currency' => 'USD',
                'country' => '',
                'state' => '',
                'city' => '',
                'primary_email' => $lead->email,
                'primary_phone' => $lead->phone,
                'notes' => $lead->meta['notes'] ?? '',
                'lead_id' => $lead->id
            ];
        }
        return Inertia::render('Clients/Create', [
            'users' => $users,
            'initialValues' => $initialValues
        ]);
    }

    public function store(StoreClientRequest $request)
    {
        Client::create($request->validated());

        if ($request->lead_id) {
            Lead::where('id', $request->lead_id)
                ->update(['status' => 'converted']);
        }

        return redirect()
            ->route('clients.index')
            ->with('toast', [
                'type' => 'success',
                'title' => 'Cliente creado',
                'description' => 'El cliente fue creado correctamente',
                'position' => 'top-center'
            ]);
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
            ->with('toast', [
                'type' => 'success',
                'title' => 'Cliente actualizado',
                'description' => 'El cliente fue actualizado correctamente',
                'position' => 'top-center'
            ]);
    }

    public function destroy(Client $client)
    {
        $client->delete();

        return redirect()
            ->route('clients.index')
            ->with('toast', [
                'type' => 'success',
                'title' => 'Cliente eliminado',
                'description' => 'El cliente fue eliminado correctamente',
                'position' => 'top-center'
            ]);
    }
}
