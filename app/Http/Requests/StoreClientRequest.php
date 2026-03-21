<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreClientRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'user_id' => ['nullable','exists:users,id'],

            'company_name' => ['required','string','max:255'],

            'website' => ['nullable','url'],

            'client_type' => ['required','string'],

            'currency' => ['required','string','size:3'],

            'country' => ['nullable','string'],
            'state' => ['nullable','string'],
            'city' => ['nullable','string'],

            'primary_email' => ['nullable','email'],

            'primary_phone' => ['nullable','string'],

            'notes' => ['nullable','string'],

            'commissioner_id' => ['nullable', 'exists:users,id'],
        ];
    }
}