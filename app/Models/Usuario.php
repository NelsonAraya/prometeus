<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Usuario extends Authenticatable
{
    protected $table = 'usuarios';

    protected $fillable = [
        'id',
        'nombres',
        'apellidop',
        'apellidom',
        'fecha_nacimiento',
        'email',
        'telefono',
        'direccion',
        'sexo_id',
        'estado',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'fecha_nacimiento' => 'date',
        'estado' => 'boolean',
    ];
    
    public function sexo()
    {
        return $this->belongsTo(Sexo::class);
    }
}
