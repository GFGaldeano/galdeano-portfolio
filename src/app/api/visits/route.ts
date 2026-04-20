// src/app/api/visits/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { requireAuth } from '../../../lib/auth';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// GET -> solo admin: devuelve contador actual
export async function GET() {
  const authError = await requireAuth();
  if (authError) return authError;

  try {
    const { data, error } = await supabase
      .from('site_stats')
      .select('visitors, last_visit')
      .eq('id', 1)
      .single();

    if (error) {
      console.error('Error obteniendo estadísticas de visitas:', error);
      return NextResponse.json(
        { error: 'Error al obtener visitas' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        visitors: Number(data?.visitors ?? 0),
        last_visit: data?.last_visit ?? null,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error en GET /api/visits:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

// POST -> público: suma una visita cuando alguien entra al portfolio
export async function POST() {
  try {
    const now = new Date().toISOString();

    const { data: current, error: readError } = await supabase
      .from('site_stats')
      .select('id, visitors')
      .eq('id', 1)
      .single();

    if (readError) {
      console.error('Error leyendo visitas:', readError);
      return NextResponse.json(
        { error: 'Error al leer visitas' },
        { status: 500 }
      );
    }

    const nextVisitors = Number(current?.visitors ?? 0) + 1;

    const { error: updateError } = await supabase
      .from('site_stats')
      .update({
        visitors: nextVisitors,
        last_visit: now,
      })
      .eq('id', 1);

    if (updateError) {
      console.error('Error actualizando visitas:', updateError);
      return NextResponse.json(
        { error: 'Error al actualizar visitas' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        visitors: nextVisitors,
        last_visit: now,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error en POST /api/visits:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}