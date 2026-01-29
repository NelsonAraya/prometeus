<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UsuarioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $a = new App\Models\Usuario();
        $a->id = 12345678;
        $a->nombres="Nombre Prueba";
        $a->apellidop="Apellido";
        $a->apellidom="Test";
        $a->fecha_nacimiento="2026-01-01";
        $a->email="admin@test.cl";
        $a->telefono="133";
        $a->direccion="iquique";
        $a->sexo_id=1;
        $a->estado=1;
        $a->password=bcrypt('prometeus');
        $a->save();
    }
}
