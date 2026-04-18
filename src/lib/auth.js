// src/lib/auth.js
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { createHash } from 'crypto';

/**
 * Hash de contraseña con SHA-256
 */
export function hashPassword(password) {
  return createHash('sha256').update(password).digest('hex');
}

/**
 * Verificar contraseña
 */
export function verifyPassword(password) {
  const hashedPassword = hashPassword(password);
  const adminPassword = hashPassword(process.env.ADMIN_PASSWORD);
  return hashedPassword === adminPassword;
}

/**
 * Verificar usuario
 */
export function verifyUsername(username) {
  return username === process.env.ADMIN_USERNAME;
}

/**
 * Crear sesión
 */
export async function createSession(username) {
  const cookieStore = await cookies();
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 días
  
  cookieStore.set('adminSession', username, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires,
    sameSite: 'strict',
    path: '/'
  });
}

/**
 * Verificar sesión
 */
export async function getSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get('adminSession');
  return session?.value || null;
}

/**
 * Destruir sesión
 */
export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.delete('adminSession');
}

/**
 * Middleware para proteger rutas
 */
export async function requireAuth() {
  const session = await getSession();
  
  if (!session) {
    return NextResponse.json(
      { error: 'No autorizado' },
      { status: 401 }
    );
  }
  
  return null;
}
