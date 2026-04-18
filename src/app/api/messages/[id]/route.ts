// src/app/api/messages/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '../../../../lib/auth';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

// PATCH - Marcar como leído/no leído
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const authError = await requireAuth();
  if (authError) return authError;

  try {
    const body = await request.json();
    const { is_read } = body;

    const { data, error } = await supabase
      .from('contact_messages')
      .update({ is_read })
      .eq('id', params.id)
      .select()
      .single();

    if (error) {
      console.error('Error actualizando mensaje:', error);
      return NextResponse.json(
        { error: 'Error al actualizar mensaje' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: data },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error en PATCH message:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

// DELETE - Eliminar mensaje
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const authError = await requireAuth();
  if (authError) return authError;

  try {
    const { error } = await supabase
      .from('contact_messages')
      .delete()
      .eq('id', params.id);

    if (error) {
      console.error('Error eliminando mensaje:', error);
      return NextResponse.json(
        { error: 'Error al eliminar mensaje' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error en DELETE message:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
