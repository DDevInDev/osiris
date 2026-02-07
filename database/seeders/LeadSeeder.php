<?php

namespace Database\Seeders;

use App\Models\Lead;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LeadSeeder extends Seeder
{
    public function run(): void
    {
        Lead::create([
            'name' => 'Juan Pérez',
            'email' => 'juan@example.com',
            'phone' => '+526561234567',
            'channel' => 'whatsapp',
            'status' => 'new',
        ]);

        Lead::create([
            'name' => 'María López',
            'phone' => '+526564567890',
            'channel' => 'whatsapp',
            'status' => 'contacted',
        ]);
    }
}
