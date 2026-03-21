<?php

namespace App\Models;

use App\Enums\UserRole;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;

class User extends Authenticatable
{
    use HasFactory, Notifiable, TwoFactorAuthenticatable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'last_name',
        'phone',
        'position',
        'meta',
    ];

    protected $hidden = [
        'password',
        'two_factor_secret',
        'two_factor_recovery_codes',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'two_factor_confirmed_at' => 'datetime',
            'role' => UserRole::class,
            'meta' => 'array',
        ];
    }

    public function isAdmin(): bool
    {
        return $this->role === UserRole::ADMIN;
    }

    public function client()
    {
        return $this->hasOne(Client::class);
    }

    public function commissionedClients(): HasMany
    {
        return $this->hasMany(Client::class, 'commissioner_id');
    }

    public function assignedProjects(): HasMany
    {
        return $this->hasMany(Project::class, 'assigned_to');
    }

    public function getFullNameAttribute(): string
    {
        return "{$this->name} {$this->last_name}";
    }

    public function isCommissioner(): bool
    {
        return $this->role === UserRole::COMMISSIONER;
    }

    public function getCommissionMetaAttribute(): array
    {
        return data_get($this->meta, 'commission', []);
    }

    public function getCommissionEnabledAttribute(): bool
    {
        return (bool) data_get($this->meta, 'commission.enabled', false);
    }

    public function getCommissionTypeAttribute(): ?string
    {
        return data_get($this->meta, 'commission.type');
    }

    public function getCommissionRateAttribute(): ?float
    {
        $rate = data_get($this->meta, 'commission.rate');

        return $rate !== null ? (float) $rate : null;
    }

    public function getCommissionAppliesOnAttribute(): ?string
    {
        return data_get($this->meta, 'commission.applies_on');
    }

    public function setCommissionMeta(array $commission): void
    {
        $meta = $this->meta ?? [];

        $meta['commission'] = array_merge([
            'enabled' => false,
            'type' => 'percentage',
            'rate' => null,
            'applies_on' => 'project_total',
            'currency' => 'MXN',
            'start_date' => null,
            'end_date' => null,
            'notes' => null,
        ], $commission);

        $this->meta = $meta;
    }

    public function commissionedProjectsForMonth(?string $month = null): Collection
    {
        $date = $month
            ? \Carbon\Carbon::createFromFormat('Y-m', $month)->startOfMonth()
            : now()->startOfMonth();

        $start = $date->copy()->startOfMonth()->toDateString();
        $end = $date->copy()->endOfMonth()->toDateString();

        return Project::query()
            ->with(['client'])
            ->whereHas('client', function ($query) {
                $query->where('commissioner_id', $this->id);
            })
            ->where('status', \App\Enums\ProjectStatus::Completed)
            ->whereBetween('start_date', [$start, $end])
            ->get();
    }

    public function calculateMonthlyCommission(?string $month = null): array
    {
        $projects = $this->commissionedProjectsForMonth($month);

        $baseAmount = match ($this->commission_applies_on) {
            'final_price' => $projects->sum(fn($project) => (float) ($project->final_price ?? 0)),
            'advance_amount' => $projects->sum(fn($project) => (float) ($project->advance_amount ?? 0)),
            default => $projects->sum(fn($project) => (float) ($project->budget ?? 0)),
        };

        $commissionAmount = 0;

        if ($this->commission_enabled && $this->commission_rate !== null) {
            $commissionAmount = match ($this->commission_type) {
                'fixed' => (float) $this->commission_rate,
                'percentage' => $baseAmount * ((float) $this->commission_rate / 100),
                default => 0,
            };
        }

        return [
            'month' => $month ?? now()->format('Y-m'),
            'projects_count' => $projects->count(),
            'clients_count' => $projects->pluck('client_id')->unique()->count(),
            'base_amount' => round($baseAmount, 2),
            'commission_amount' => round($commissionAmount, 2),
            'currency' => data_get($this->meta, 'commission.currency', 'MXN'),
            'projects' => $projects->map(fn($project) => [
                'id' => $project->id,
                'name' => $project->name,
                'client_id' => $project->client_id,
                'client_name' => $project->client?->company_name,
                'budget' => $project->budget,
                'final_price' => $project->final_price,
                'advance_amount' => $project->advance_amount,
                'status' => $project->status?->value,
                'created_at' => $project->created_at?->format('Y-m-d H:i:s'),
            ])->values(),
        ];
    }
}
