<?php

namespace App\Http\Controllers;

use App\Enums\ProjectStatus;
use App\Models\Client;
use App\Models\Project;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class CommissionerDashboardController extends Controller
{
    public function index(Request $request)
    {
        $authUser = $request->user();

        $isAdmin = $authUser->isAdmin();
        $requestedCommissionerId = $request->integer('commissioner_id');

        $targetUser = $authUser;

        if ($isAdmin && $requestedCommissionerId) {
            $targetUser = User::query()
                ->where('id', $requestedCommissionerId)
                ->where('role', 'commissioner')
                ->firstOrFail();
        }

        $clientsQuery = Client::query()
            ->where('commissioner_id', $targetUser->id);

        $projectsQuery = Project::query()
            ->whereHas('client', function ($query) use ($targetUser) {
                $query->where('commissioner_id', $targetUser->id);
            });

        $currentMonthStart = now()->startOfMonth()->toDateString();
        $currentMonthEnd = now()->endOfMonth()->toDateString();

        $totalClients = (clone $clientsQuery)->count();
        $totalProjects = (clone $projectsQuery)->count();

        $monthlyClients = (clone $clientsQuery)
            ->whereBetween('created_at', [$currentMonthStart, $currentMonthEnd])
            ->count();

        $monthlyProjects = (clone $projectsQuery)
            ->whereBetween('created_at', [$currentMonthStart, $currentMonthEnd])
            ->count();

        $monthlyCompletedProjects = (clone $projectsQuery)
            ->where('status', ProjectStatus::Completed)
            ->whereBetween('completed_at', [$currentMonthStart, $currentMonthEnd])
            ->count();

        $monthlyRevenue = (clone $projectsQuery)
            ->whereBetween('created_at', [$currentMonthStart, $currentMonthEnd])
            ->sum(DB::raw('COALESCE(final_price, budget, 0)'));

        $commissionBase = match ($targetUser->commission_applies_on) {
            'project_total' => (clone $projectsQuery)
                ->whereBetween('created_at', [$currentMonthStart, $currentMonthEnd])
                ->sum(DB::raw('COALESCE(final_price, 0)')),

            'invoice_paid' => (clone $projectsQuery)
                ->whereBetween('created_at', [$currentMonthStart, $currentMonthEnd])
                ->sum(DB::raw('COALESCE(invoice_paid, 0)')),

            'advance_amount' => (clone $projectsQuery)
                ->whereBetween('created_at', [$currentMonthStart, $currentMonthEnd])
                ->sum(DB::raw('COALESCE(advance_amount, 0)')),

            default => (clone $projectsQuery)
                ->whereBetween('created_at', [$currentMonthStart, $currentMonthEnd])
                ->sum(DB::raw('COALESCE(budget, 0)')),
        };

        $monthlyCommission = 0;

        if ($targetUser->commission_enabled && $targetUser->commission_rate !== null) {
            $monthlyCommission = match ($targetUser->commission_type) {
                'fixed' => (float) $targetUser->commission_rate,
                'percentage' => $commissionBase * ((float) $targetUser->commission_rate / 100),
                default => 0,
            };
        }

        $months = collect(range(5, 0, -1))
            ->map(function ($offset) {
                $date = now()->subMonths($offset);

                return [
                    'label' => $date->translatedFormat('M Y'),
                    'start' => $date->copy()->startOfMonth()->toDateString(),
                    'end' => $date->copy()->endOfMonth()->toDateString(),
                ];
            });

        $clientsChart = $months->map(function ($month) use ($targetUser) {
            $count = Client::query()
                ->where('commissioner_id', $targetUser->id)
                ->whereBetween('created_at', [$month['start'], $month['end']])
                ->count();

            return [
                'month' => $month['label'],
                'value' => $count,
            ];
        })->values();

        $projectsChart = $months->map(function ($month) use ($targetUser) {
            $count = Project::query()
                ->whereHas('client', function ($query) use ($targetUser) {
                    $query->where('commissioner_id', $targetUser->id);
                })
                ->whereBetween('created_at', [$month['start'], $month['end']])
                ->count();

            return [
                'month' => $month['label'],
                'value' => $count,
            ];
        })->values();

        $recentClients = Client::query()
            ->where('commissioner_id', $targetUser->id)
            ->latest()
            ->take(5)
            ->get([
                'id',
                'company_name',
                'primary_email',
                'primary_phone',
                'client_type',
                'created_at',
            ])
            ->map(fn(Client $client) => [
                'id' => $client->id,
                'company_name' => $client->company_name,
                'primary_email' => $client->primary_email,
                'primary_phone' => $client->primary_phone,
                'client_type' => $client->client_type,
                'created_at' => $client->created_at?->format('Y-m-d'),
            ])
            ->values();

        $recentProjects = Project::query()
            ->with('client:id,company_name')
            ->whereHas('client', function ($query) use ($targetUser) {
                $query->where('commissioner_id', $targetUser->id);
            })
            ->latest()
            ->take(5)
            ->get([
                'id',
                'client_id',
                'name',
                'status',
                'budget',
                'final_price',
                'currency',
                'created_at',
            ])
            ->map(fn(Project $project) => [
                'id' => $project->id,
                'name' => $project->name,
                'status' => $project->status?->value,
                'status_label' => $project->status?->label(),
                'budget' => $project->budget,
                'final_price' => $project->final_price,
                'currency' => $project->currency,
                'client' => $project->client ? [
                    'id' => $project->client->id,
                    'company_name' => $project->client->company_name,
                ] : null,
                'created_at' => $project->created_at?->format('Y-m-d'),
            ])
            ->values();

        $commissioners = $isAdmin
            ? User::query()
            ->where('role', 'commissioner')
            ->orderBy('name')
            ->orderBy('last_name')
            ->get([
                'id',
                'name',
                'last_name',
                'email',
            ])
            ->map(fn(User $user) => [
                'id' => $user->id,
                'name' => $user->full_name,
                'email' => $user->email,
            ])
            ->values()
            : [];

        return Inertia::render('Web/CommissionDashboard/Index', [
            'stats' => [
                'total_clients' => $totalClients,
                'total_projects' => $totalProjects,
                'monthly_clients' => $monthlyClients,
                'monthly_projects' => $monthlyProjects,
                'monthly_completed_projects' => $monthlyCompletedProjects,
                'monthly_revenue' => round((float) $monthlyRevenue, 2),
                'monthly_commission' => round((float) $monthlyCommission, 2),
                'currency' => data_get($targetUser->meta, 'commission.currency', 'MXN'),
            ],
            'charts' => [
                'clients' => $clientsChart,
                'projects' => $projectsChart,
            ],
            'recentClients' => $recentClients,
            'recentProjects' => $recentProjects,
            'commissioner' => [
                'id' => $targetUser->id,
                'name' => $targetUser->full_name,
                'email' => $targetUser->email,
                'commission_enabled' => $targetUser->commission_enabled,
                'commission_type' => $targetUser->commission_type,
                'commission_rate' => $targetUser->commission_rate,
                'commission_applies_on' => $targetUser->commission_applies_on,
            ],
            'viewer' => [
                'id' => $authUser->id,
                'is_admin' => $isAdmin,
                'is_viewing_other_commissioner' => $isAdmin && $authUser->id !== $targetUser->id,
            ],
            'commissioners' => $commissioners,
            'selectedCommissionerId' => $targetUser->id,
            'filters' => [
                'commissioner_id' => $isAdmin ? $requestedCommissionerId : null,
            ],
        ]);
    }
}
