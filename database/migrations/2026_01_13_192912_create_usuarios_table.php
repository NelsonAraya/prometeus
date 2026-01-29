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
        Schema::create('usuarios', function (Blueprint $table) {
            $table->unsignedInteger('id')->primary();
            $table->string('nombres');
            $table->string('apellidop');
            $table->string('apellidom');
            $table->date('fecha_nacimiento')->nullable();
            $table->string('email')->unique();
            $table->string('telefono')->nullable();
            $table->string('direccion')->nullable();
            $table->unsignedTinyInteger('sexo_id')->nullable();
            $table->foreign('sexo_id')->references('id')->on('sexos');
            $table->boolean('estado')->default(true);
            $table->string('password');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('usuarios');
    }
};
