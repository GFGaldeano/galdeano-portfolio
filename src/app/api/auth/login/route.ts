// src/app/api/auth/login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { verifyPassword, verifyUsername, createSession } from '../../../../lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    // Validación básica
    if (!username || !password) {
      return NextResponse.json(
        { error: 'Usuario y contraseña son requeridos' },
        { status: 400 }
      );
    }

    // Verificar credenciales
    const isValidUsername = verifyUsername(username);
    const isValidPassword = verifyPassword(password);

    if (!isValidUsername || !isValidPassword) {
      console.warn(`⚠️ Intento de login fallido: ${username}`);
      
      return NextResponse.json(
        { error: 'Credenciales inválidas' },
        { status: 401 }
      );
    }

    // Crear sesión
    await createSession(username);

    console.log(`✅ Login exitoso: ${username}`);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Login exitoso',
        username 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('❌ Error en login:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
