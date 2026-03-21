<?php

use App\Models\Client;
use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();

            $table->foreignIdFor(Client::class)
                ->constrained()
                ->cascadeOnDelete();

            $table->foreignIdFor(User::class, 'assigned_to')
                ->nullable()
                ->constrained('users')
                ->nullOnDelete();

            $table->string('name');
            $table->string('project_code')->nullable()->unique();

            $table->string('type'); 

            $table->string('status')->default('pending');

            $table->decimal('budget', 12, 2)->default(0);
            $table->decimal('final_price', 12, 2)->nullable();
            $table->decimal('advance_amount', 12, 2)->nullable();

            $table->string('currency', 10)->default('MXN');

            $table->date('start_date')->nullable();
            $table->date('due_date')->nullable();
            $table->date('completed_at')->nullable();

            $table->text('description')->nullable();
            $table->text('notes')->nullable();
            $table->text('internal_notes')->nullable();

            $table->json('meta')->nullable();

            $table->timestamps();

            $table->index(['client_id', 'status']);
            $table->index(['type', 'status']);
            $table->index('start_date');
            $table->index('due_date');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};