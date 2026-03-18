<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;
use App\Enums\UserRole;

class StoreUserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required','string','max:100'],
            'last_name' => ['required','string','max:100'],
            'email' => ['required','email','max:255','unique:users,email'],
            'phone' => ['nullable','string','max:30'],
            'position' => ['nullable','string','max:100'],
            'password' => ['required','string','min:8'],
            'role' => ['required', new Enum(UserRole::class)],
        ];
    }
}