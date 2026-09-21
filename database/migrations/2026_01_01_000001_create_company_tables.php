<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Add role column to users if not exists
        if (!Schema::hasColumn('users', 'role')) {
            Schema::table('users', function (Blueprint $table) {
                $table->string('role')->default('admin')->after('email');
            });
        }

        // Company Profiles Table
        Schema::create('company_profiles', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('key')->unique();
            $table->text('title');
            $table->longText('content');
            $table->string('image')->nullable();
            $table->timestamps();
        });

        // Managements Table
        Schema::create('managements', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name');
            $table->string('position');
            $table->text('bio')->nullable();
            $table->string('photo')->nullable();
            $table->integer('order_priority')->default(0);
            $table->timestamps();
        });

        // Facilities Table
        Schema::create('facilities', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('category')->default('Power Plant');
            $table->text('description');
            $table->json('technical_specs')->nullable();
            $table->string('image')->nullable();
            $table->timestamps();
        });

        // Operational Statistics Table (Counter metrics on homepage)
        Schema::create('operational_statistics', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('metric_key')->unique();
            $table->string('label');
            $table->string('value'); // e.g. "2 x 50 MW + 1 x 100 MW"
            $table->double('numeric_value', 10, 2)->default(0); // e.g. 200
            $table->string('unit')->nullable(); // MW, %, GWh
            $table->string('subtext')->nullable();
            $table->integer('order_priority')->default(0);
            $table->timestamps();
        });

        // Operational Metrics Table (Charts Data)
        Schema::create('operational_metrics', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('period_label'); // e.g. "Jan", "Feb", "2024", "2025"
            $table->integer('year')->default(2025);
            $table->integer('month')->default(1);
            $table->double('energy_production_gwh', 10, 2)->default(0);
            $table->double('availability_factor', 5, 2)->default(99.0);
            $table->double('reliability_index', 5, 2)->default(99.5);
            $table->double('heat_rate_kcal', 10, 2)->default(2350.0);
            $table->timestamps();
        });

        // Sustainability Programs Table
        Schema::create('sustainability_programs', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('title');
            $table->string('category'); // Environmental, Social, Governance, ESG
            $table->text('description');
            $table->json('metrics')->nullable(); // CO2 reduction, Waste managed, etc.
            $table->string('image')->nullable();
            $table->timestamps();
        });

        // Biodiversity Species Table
        Schema::create('biodiversity_species', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name');
            $table->string('latin_name')->nullable();
            $table->string('category'); // Flora, Fauna
            $table->string('conservation_status')->default('Protected');
            $table->string('location')->nullable();
            $table->text('description');
            $table->string('image')->nullable();
            $table->timestamps();
        });

        // Biodiversity Programs Table
        Schema::create('biodiversity_programs', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('title');
            $table->integer('species_count')->default(0);
            $table->double('area_monitored_ha', 8, 2)->default(0);
            $table->text('description');
            $table->string('pdf_report')->nullable();
            $table->string('image')->nullable();
            $table->timestamps();
        });

        // CSR Programs Table
        Schema::create('csr_programs', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('title');
            $table->string('category'); // Pendidikan, Kesehatan, Ekonomi, Lingkungan, Sosial, Pemberdayaan
            $table->date('date');
            $table->string('location');
            $table->text('description');
            $table->text('impact')->nullable();
            $table->string('image')->nullable();
            $table->timestamps();
        });

        // Safety Programs Table (K3)
        Schema::create('safety_programs', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('title');
            $table->text('description');
            $table->integer('zero_accident_days')->default(1250);
            $table->string('image')->nullable();
            $table->timestamps();
        });

        // Awards & Certifications Table
        Schema::create('awards', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('title');
            $table->string('category'); // ISO, PROPER, Safety Award, CSR Award
            $table->string('year');
            $table->string('issuer');
            $table->text('description')->nullable();
            $table->string('image')->nullable();
            $table->string('pdf_file')->nullable();
            $table->timestamps();
        });

        // News Categories Table
        Schema::create('categories', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name');
            $table->string('slug')->unique();
            $table->timestamps();
        });

        // News Table
        Schema::create('news', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('title');
            $table->string('slug')->unique();
            $table->foreignUuid('category_id')->constrained('categories')->onDelete('cascade');
            $table->text('excerpt');
            $table->longText('content');
            $table->string('image')->nullable();
            $table->boolean('is_featured')->default(false);
            $table->timestamp('published_at')->nullable();
            $table->timestamps();
        });

        // Galleries Table
        Schema::create('galleries', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('title');
            $table->string('category'); // Operational, Environment, CSR, Events, Facilities
            $table->string('image_url');
            $table->text('caption')->nullable();
            $table->timestamps();
        });

        // Videos Table
        Schema::create('videos', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('video_url');
            $table->string('thumbnail_url')->nullable();
            $table->string('duration')->default('03:45');
            $table->string('type')->default('youtube'); // youtube, vimeo, local
            $table->timestamps();
        });

        // Documents Table
        Schema::create('documents', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('title');
            $table->string('category'); // Annual Report, Sustainability Report, Company Profile, Environmental Report, CSR Report
            $table->string('year');
            $table->string('file_path');
            $table->string('file_size')->default('2.4 MB');
            $table->timestamps();
        });

        // Contact Messages Table
        Schema::create('contact_messages', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name');
            $table->string('email');
            $table->string('phone')->nullable();
            $table->string('subject');
            $table->text('message');
            $table->boolean('is_read')->default(false);
            $table->timestamps();
        });

        // Settings Table
        Schema::create('settings', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('key')->unique();
            $table->text('value')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('settings');
        Schema::dropIfExists('contact_messages');
        Schema::dropIfExists('documents');
        Schema::dropIfExists('videos');
        Schema::dropIfExists('galleries');
        Schema::dropIfExists('news');
        Schema::dropIfExists('categories');
        Schema::dropIfExists('awards');
        Schema::dropIfExists('safety_programs');
        Schema::dropIfExists('csr_programs');
        Schema::dropIfExists('biodiversity_programs');
        Schema::dropIfExists('biodiversity_species');
        Schema::dropIfExists('sustainability_programs');
        Schema::dropIfExists('operational_metrics');
        Schema::dropIfExists('operational_statistics');
        Schema::dropIfExists('facilities');
        Schema::dropIfExists('managements');
        Schema::dropIfExists('company_profiles');
    }
};
