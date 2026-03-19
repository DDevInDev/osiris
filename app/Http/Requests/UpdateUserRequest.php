<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;
use App\Enums\UserRole;

class UpdateUserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $userId = $this->route('user')->id;

        return [
            'name' => ['required', 'string', 'max:100'],
            'last_name' => ['required', 'string', 'max:100'],
            'email' => ['required', 'email', 'max:255', "unique:users,email,$userId"],
            'phone' => ['nullable', 'string', 'max:30'],
            'position' => ['nullable', 'string', 'max:100'],
            'password' => ['nullable', 'string', 'min:8'],
            'role' => ['required', new Enum(UserRole::class)],

            'meta' => ['nullable', 'array'],
            'meta.commission' => ['nullable', 'array'],
            'meta.commission.enabled' => ['nullable', 'boolean'],
            'meta.commission.type' => ['nullable', 'in:percentage,fixed'],
            'meta.commission.rate' => ['nullable', 'numeric', 'min:0'],
            'meta.commission.applies_on' => ['nullable', 'in:project_total,client_first_payment,invoice_paid'],
            'meta.commission.currency' => ['nullable', 'string', 'max:10'],
            'meta.commission.start_date' => ['nullable', 'date'],
            'meta.commission.end_date' => ['nullable', 'date', 'after_or_equal:meta.commission.start_date'],
            'meta.commission.notes' => ['nullable', 'string'],
        ];
    }
}
