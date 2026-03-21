<?php

namespace App\Http\Controllers;

use App\Enums\ProjectStatus;
use App\Enums\ProjectType;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Models\Client;
use App\Models\Project;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function index(Request $request)
    {
        $query = Project::query()
            ->with(['client', 'assignedUser']);

        if ($request->filled('search')) {
            $search = $request->string('search')->toString();

            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('project_code', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%")
                    ->orWhereHas('client', function ($clientQuery) use ($search) {
                        $clientQuery->where('company_name', 'like', "%{$search}%")
                            ->orWhere('primary_email', 'like', "%{$search}%")
                            ->orWhere('primary_phone', 'like', "%{$search}%");
                    });
            });
        }

        if ($request->filled('status')) {
            $query->where('status', $request->string('status')->toString());
        }

        if ($request->filled('type')) {
            $query->where('type', $request->string('type')->toString());
        }

        if ($request->filled('client_id')) {
            $query->where('client_id', $request->integer('client_id'));
        }

        $projects = $query
            ->latest()
            ->paginate(10)
            ->withQueryString()
            ->through(fn (Project $project) => [
                'id' => $project->id,
                'name' => $project->name,
                'project_code' => $project->project_code,
                'type' => $project->type?->value,
                'type_label' => $project->type?->label(),
                'status' => $project->status?->value,
                'status_label' => $project->status?->label(),
                'budget' => $project->budget,
                'final_price' => $project->final_price,
                'advance_amount' => $project->advance_amount,
                'currency' => $project->currency,
                'start_date' => $project->start_date?->format('Y-m-d'),
                'due_date' => $project->due_date?->format('Y-m-d'),
                'completed_at' => $project->completed_at?->format('Y-m-d'),
                'client' => $project->client ? [
                    'id' => $project->client->id,
                    'company_name' => $project->client->company_name,
                ] : null,
                'assigned_user' => $project->assignedUser ? [
                    'id' => $project->assignedUser->id,
                    'name' => $project->assignedUser->name,
                ] : null,
            ]);

        return Inertia::render('Projects/Index', [
            'projectsData' => $projects,
            'filters' => $request->only(['search', 'status', 'type', 'client_id']),
            'statuses' => ProjectStatus::options(),
            'types' => ProjectType::options(),
            'clients' => Client::query()
                ->orderBy('company_name')
                ->get(['id', 'company_name']),
        ]);
    }

    public function create()
    {
        return Inertia::render('Projects/Create', [
            'clients' => Client::query()
                ->orderBy('company_name')
                ->get(['id', 'company_name', 'currency']),
            'users' => User::query()
                ->orderBy('name')
                ->get(['id', 'name']),
            'statuses' => ProjectStatus::options(),
            'types' => ProjectType::options(),
        ]);
    }

    public function store(StoreProjectRequest $request)
    {
        Project::create($request->validated());

        return redirect()
            ->route('projects.index')
            ->with('toast', [
                'type' => 'success',
                'title' => 'Proyecto creado',
                'description' => 'El proyecto fue registrado correctamente',
                'position' => 'top-center',
            ]);
    }

    public function edit(Project $project)
    {
        $project->load(['client', 'assignedUser']);

        return Inertia::render('Projects/Edit', [
            'project' => [
                'id' => $project->id,
                'client_id' => $project->client_id,
                'assigned_to' => $project->assigned_to,
                'name' => $project->name,
                'project_code' => $project->project_code,
                'type' => $project->type?->value,
                'status' => $project->status?->value,
                'budget' => $project->budget,
                'final_price' => $project->final_price,
                'advance_amount' => $project->advance_amount,
                'currency' => $project->currency,
                'start_date' => $project->start_date?->format('Y-m-d'),
                'due_date' => $project->due_date?->format('Y-m-d'),
                'completed_at' => $project->completed_at?->format('Y-m-d'),
                'description' => $project->description,
                'notes' => $project->notes,
                'internal_notes' => $project->internal_notes,
                'meta' => $project->meta ?? [],
            ],
            'clients' => Client::query()
                ->orderBy('company_name')
                ->get(['id', 'company_name', 'currency']),
            'users' => User::query()
                ->orderBy('name')
                ->get(['id', 'name']),
            'statuses' => ProjectStatus::options(),
            'types' => ProjectType::options(),
        ]);
    }

    public function update(UpdateProjectRequest $request, Project $project)
    {
        $project->update($request->validated());

        return redirect()
            ->route('projects.index')
            ->with('toast', [
                'type' => 'success',
                'title' => 'Proyecto actualizado',
                'description' => 'Los datos del proyecto fueron actualizados correctamente',
                'position' => 'top-center',
            ]);
    }

    public function destroy(Project $project)
    {
        $project->delete();

        return redirect()
            ->route('projects.index')
            ->with('toast', [
                'type' => 'success',
                'title' => 'Proyecto eliminado',
                'description' => 'El proyecto fue eliminado correctamente',
                'position' => 'top-center',
            ]);
    }
}