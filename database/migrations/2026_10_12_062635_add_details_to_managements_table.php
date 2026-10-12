<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('managements', function (Blueprint $table) {
            $table->string('birth_info')->nullable()->after('position');
            $table->json('education')->nullable()->after('birth_info');
            $table->json('career_journey')->nullable()->after('education');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('managements', function (Blueprint $table) {
            $table->dropColumn(['birth_info', 'education', 'career_journey']);
        });
    }
};
