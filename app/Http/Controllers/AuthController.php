<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
        ]);

        // Si el usuario tiene estado=false, evitamos login (opcional pero recomendado)
        // Ojo: esto funciona si Auth usa tu provider Usuario (config/auth.php)
        if (!Auth::attempt($credentials)) {
            return response()->json(['message' => 'Credenciales inválidas'], 401);
        }

        // Regenera la sesión por seguridad
        $request->session()->regenerate();
    
        return response()->json([
            'user' => $request->user(),
        ]);
    }

    public function me(Request $request)
    {
        $user = $request->user()->load('sexo');
        return response()->json([
            'user' => $user,
        ]);
    }

    public function logout(Request $request)
    {
        try {
            Auth::logout();

            $request->session()->invalidate();
            $request->session()->regenerateToken();

            return response()->json(['message' => 'Sesión cerrada']);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => true,
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
