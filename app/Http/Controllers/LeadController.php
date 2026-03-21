<?php

namespace App\Http\Controllers;

use App\Models\Lead;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LeadController extends Controller
{
    public function index(Request $request)
    {
        $query = Lead::with('assignedUser');

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('channel')) {
            $query->where('channel', $request->channel);
        }

        return Inertia::render('Leads/Index', [
            'leadsData' => $query->latest()->paginate(10)->withQueryString(),
            'filters' => $request->only('status', 'channel'),
        ]);
    }

    public function updateStatus(Request $request, Lead $lead)
    {
        $validated = $request->validate([
            'status' => ['required', 'string'],
        ]);

        $lead->update([
            'status' => $validated['status'],
        ]);

        return back();
    }

    public function create()
    {
        $users = User::select('id', 'name')->get();

        return Inertia::render('Leads/Create', [
            'users' => $users
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['nullable', 'string', 'max:255'],
            'email' => ['nullable', 'email'],
            'phone' => ['nullable', 'string'],
            'channel' => ['required', 'string'],
            'status' => ['required', 'string'],
            'assigned_to' => ['nullable', 'exists:users,id'],
            'meta' => $request->meta ? ['array'] : [],
        ]);

        Lead::create($validated);

        return redirect()
            ->route('leads.index')
            ->with('toast', [
                'type' => 'success',
                'title' => 'Lead created',
                'description' => 'The lead has been successfully registered',
                'position' => 'top-center'
            ]);
    }

    public function edit(Lead $lead)
    {
        $users = User::where('role', '!=', 'admin')
            ->select('id', 'name')
            ->get();

        return Inertia::render('Leads/Edit', [
            'lead' => $lead,
            'users' => $users
        ]);
    }

    public function update(Request $request, Lead $lead)
    {
        $validated = $request->validate([
            'name' => ['nullable', 'string', 'max:255'],
            'email' => ['nullable', 'email'],
            'phone' => ['nullable', 'string'],
            'channel' => ['required', 'string'],
            'status' => ['required', 'string'],
            'assigned_to' => ['nullable', 'exists:users,id'],
            'meta' => $request->meta ? ['array'] : [],
        ]);

        $lead->update($validated);

        return redirect()
            ->route('leads.index')
            ->with('toast', [
                'type' => 'success',
                'title' => 'Lead updated',
                'description' => 'Lead data has been successfully updated',
                'position' => 'top-center'
            ]);
    }

    public function destroy(Lead $lead)
    {
        $lead->delete();

        return redirect()
            ->route('leads.index')
            ->with('toast', [
                'type' => 'success',
                'title' => 'Lead deleted',
                'description' => 'The lead has been successfully deleted',
                'position' => 'top-center'
            ]);
    }
}