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
        Schema::create('solicitudes', function (Blueprint $table) {
            $table->id();
            // Relaciones
            $table->unsignedBigInteger('usuario_id');
            $table->unsignedBigInteger('tipo_solicitud_id');

            // Subtipo (tipo permiso, tipo documento, etc.)
            $table->string('subtipo')->nullable();

            // Fechas
            $table->date('fecha_desde')->nullable();
            $table->date('fecha_hasta')->nullable();

            // Vacaciones
            $table->integer('dias_progresivos')->nullable();
            $table->integer('dias_adicionales')->nullable();
            $table->boolean('fuera_region')->nullable();

            // Permisos con goce (bloques por día)
            $table->json('bloques')->nullable();
            // Común
            $table->text('motivo')->nullable();
            $table->text('motivo_rechazo')->nullable();
            // Flujo
            $table->enum('estado', ['creada', 'aprobada', 'rechazada'])->default('creada');

            $table->timestamps();

            // Foreign keys
            $table->foreign('usuario_id')->references('id')->on('usuarios');
            $table->foreign('tipo_solicitud_id')->references('id')->on('tipos_solicitud');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('solicitudes');
    }
};
