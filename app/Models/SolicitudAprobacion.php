<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SolicitudAprobacion extends Model
{
    protected $table = 'solicitud_aprobaciones';

    protected $fillable = [
        'solicitud_id',
        'usuario_id',
        'accion',
        'comentario'
    ];

    public function solicitud()
    {
        return $this->belongsTo(Solicitud::class);
    }

    public function usuario()
    {
        return $this->belongsTo(Usuario::class);
    }
}
