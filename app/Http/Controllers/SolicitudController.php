<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Solicitud;
use Illuminate\Support\Facades\Auth;

class SolicitudController extends Controller
{
    /**
     * Listar solicitudes del usuario autenticado
     */
    public function misSolicitudes()
    {
        $user = Auth::user();

        $solicitudes = Solicitud::with(['tipoSolicitud'])
            ->where('usuario_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'solicitudes' => $solicitudes
        ]);
    }
    /**
     * Crear nueva solicitud
     */
    public function store(Request $request)
    {
        $user = Auth::user();

        // Validación base
        $request->validate([
            'tipo_solicitud_id' => 'required|exists:tipos_solicitud,id',
            'subtipo' => 'nullable|string',
            'fecha_desde' => 'nullable|date',
            'fecha_hasta' => 'nullable|date|after_or_equal:fecha_desde',
            'motivo' => 'nullable|string',
        ]);

        $solicitud = new Solicitud();
        $solicitud->usuario_id = $user->id;
        $solicitud->tipo_solicitud_id = $request->tipo_solicitud_id;
        $solicitud->subtipo = $request->subtipo;
        $solicitud->fecha_desde = $request->fecha_desde;
        $solicitud->fecha_hasta = $request->fecha_hasta;
        $solicitud->motivo = $request->motivo;
        $solicitud->estado = 'creada';

        // Vacaciones
        if ($request->has('dias_progresivos')) {
            $solicitud->dias_progresivos = $request->dias_progresivos;
        }

        if ($request->has('dias_adicionales')) {
            $solicitud->dias_adicionales = $request->dias_adicionales;
        }

        if ($request->has('fuera_region')) {
            $solicitud->fuera_region = $request->fuera_region;
        }

        // Permisos con goce (bloques)
        if ($request->has('bloques')) {
            $solicitud->bloques = $request->bloques;
        }

        $solicitud->save();

        return response()->json([
            'message' => 'Solicitud creada correctamente',
            'solicitud' => $solicitud->load('tipoSolicitud')
        ], 201);
    }
    public function tipos()
    {
        $tipos = \App\Models\TipoSolicitud::orderBy('id','asc')->get();

        return response()->json([
            'tipos' => $tipos
        ]);
    }
}
