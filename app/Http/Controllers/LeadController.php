<?php

namespace App\Http\Controllers;

use App\Models\Lead;
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
            'leads' => $query->latest()->paginate(10)->withQueryString(),
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
}
