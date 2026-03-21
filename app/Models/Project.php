<?php

namespace App\Models;

use App\Enums\ProjectStatus;
use App\Enums\ProjectType;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Project extends Model
{
    protected $fillable = [
        'client_id',
        'assigned_to',
        'name',
        'project_code',
        'type',
        'status',
        'budget',
        'final_price',
        'advance_amount',
        'currency',
        'start_date',
        'due_date',
        'completed_at',
        'description',
        'notes',
        'internal_notes',
        'meta',
    ];

    protected $casts = [
        'type' => ProjectType::class,
        'status' => ProjectStatus::class,
        'budget' => 'decimal:2',
        'final_price' => 'decimal:2',
        'advance_amount' => 'decimal:2',
        'start_date' => 'date',
        'due_date' => 'date',
        'completed_at' => 'date',
        'meta' => 'array',
    ];

    public function client(): BelongsTo
    {
        return $this->belongsTo(Client::class);
    }

    public function assignedUser(): BelongsTo
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }
}
