<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Laravel\Passport\Client;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        // Validar los datos de entrada
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        // Intentar autenticar al usuario con las credenciales
        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            // Si la autenticación es exitosa, generar el token
            $user = Auth::user();
            $token = $user->createToken('passportClient')->accessToken;

            // Retornar el token
            return response()->json([
                'access_token' => $token,
                'token_type' => 'Bearer',
            ]);
        } else {
            // Si las credenciales son incorrectas
            return response()->json([
                'message' => 'Invalid credentials'
            ], 401);
        }
    }
}
