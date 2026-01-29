<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TipoSolicitud extends Model
{
    protected $table = 'tipos_solicitud';
    
    protected $fillable = [
        'nombre'
    ];

    public function solicitudes()
    {
        return $this->hasMany(Solicitud::class, 'tipo_solicitud_id');
    }
}
