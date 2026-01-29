<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Sexo extends Model
{
    protected $fillable = ['id', 'nombre'];
    
    public function usuarios()
    {
        return $this->hasMany(Usuario::class);
    }
}
