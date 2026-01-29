<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SexoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $a = new App\Models\Sexo();
        $a->id = 1;
        $a->nombre="Masculino";
        $a->save();

        $a = new App\Models\Sexo();
        $a->id = 2;
        $a->nombre="Femenino";
        $a->save();
    }
}
