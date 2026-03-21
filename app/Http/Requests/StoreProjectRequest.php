<?php

namespace App\Http\Requests;

use App\Enums\ProjectStatus;
use App\Enums\ProjectType;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreProjectRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'client_id' => ['required', 'exists:clients,id'],
            'assigned_to' => ['nullable', 'exists:users,id'],

            'name' => ['required', 'string', 'max:255'],
            'project_code' => ['nullable', 'string', 'max:255', 'unique:projects,project_code'],

            'type' => ['required', Rule::in(ProjectType::values())],
            'status' => ['required', Rule::in(ProjectStatus::values())],

            'budget' => ['required', 'numeric', 'min:0'],
            'final_price' => ['nullable', 'numeric', 'min:0'],
            'advance_amount' => ['nullable', 'numeric', 'min:0'],

            'currency' => ['required', 'string', 'max:10'],

            'start_date' => ['nullable', 'date'],
            'due_date' => ['nullable', 'date', 'after_or_equal:start_date'],
            'completed_at' => ['nullable', 'date', 'after_or_equal:start_date'],

            'description' => ['nullable', 'string'],
            'notes' => ['nullable', 'string'],
            'internal_notes' => ['nullable', 'string'],

            'meta' => ['nullable', 'array'],
        ];
    }
    protected function prepareForValidation(): void
    {
        $this->merge([
            'assigned_to' => $this->assigned_to === '0' ? null : $this->assigned_to,
        ]);
    }
}
