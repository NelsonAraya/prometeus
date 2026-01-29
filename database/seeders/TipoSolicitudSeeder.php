<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TipoSolicitudSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $a = new App\Models\TipoSolicitud();
        $a->id = 1;
        $a->nombre="Permisos";
        $a->save();

        $a = new App\Models\TipoSolicitud();
        $a->id = 2;
        $a->nombre="Vacaciones";
        $a->save();

        $a = new App\Models\TipoSolicitud();
        $a->id = 1;
        $a->nombre="Documentos";
        $a->save();
    }
}
