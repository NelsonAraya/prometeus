<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\TipoSolicitud;

class TipoSolicitudSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $a = new TipoSolicitud();
        $a->id = 1;
        $a->nombre="Permisos";
        $a->save();

        $a = new TipoSolicitud();
        $a->id = 2;
        $a->nombre="Vacaciones";
        $a->save();

        $a = new TipoSolicitud();
        $a->id = 3;
        $a->nombre="Documentos";
        $a->save();
    }
}
