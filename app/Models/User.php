<?php

namespace App\Models;

use App\Enums\UserRole;
use Illuminate\Database\Eloquent\Factories\HasFactory;
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

    public function client()
    {
        return $this->hasOne(Client::class);
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
}