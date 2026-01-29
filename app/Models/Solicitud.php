<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Solicitud extends Model
{
    protected $table = 'solicitudes';

    protected $fillable = [
        'usuario_id',
        'tipo_solicitud_id',
        'subtipo',
        'fecha_desde',
        'fecha_hasta',
        'dias_progresivos',
        'dias_adicionales',
        'fuera_region',
        'bloques',
        'motivo',
        'estado'
    ];

    protected $casts = [
        'bloques' => 'array',
        'fuera_region' => 'boolean',
        'fecha_desde' => 'date',
        'fecha_hasta' => 'date',
    ];
    
    // Usuario que creó la solicitud
    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'usuario_id');
    }

    // Tipo de solicitud (Permiso, Vacaciones, Documento)
    public function tipoSolicitud()
    {
        return $this->belongsTo(TipoSolicitud::class, 'tipo_solicitud_id');
    }

    // Historial de aprobaciones / rechazos / observaciones
    public function aprobaciones()
    {
        return $this->hasMany(SolicitudAprobacion::class);
    }
}
