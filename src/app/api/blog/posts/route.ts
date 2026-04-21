// src/app/api/blog/posts/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { requireAuth } from '../../../../lib/auth';
import { createSlug, isValidMediaType } from '../../../../lib/blog';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function generateUniqueSlug(title: string) {
  const baseSlug = createSlug(title) || `post-${Date.now()}`;
  let slug = baseSlug;
  let counter = 2;

  while (true) {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('id')
      .eq('slug', slug)
      .maybeSingle();

    if (error) {
      throw error;
    }

    if (!data) return slug;

    slug = `${baseSlug}-${counter}`;
    counter += 1;
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const scope = searchParams.get('scope') || 'public';
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const offset = (page - 1) * limit;

    let query = supabase
      .from('blog_posts')
      .select(
        'id, title, slug, published_at, content, media_type, media_url, media_public_id, media_resource_type, thumbnail_url, is_visible, created_at, updated_at',
        { count: 'exact' }
      )
      .order('published_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (scope === 'admin') {
      const authError = await requireAuth();
      if (authError) return authError;
    } else {
      query = query.eq('is_visible', true);
    }

    const { data, error, count } = await query;

    if (error) {
      console.error('Error obteniendo posts del blog:', error);
      return NextResponse.json(
        { error: 'Error al obtener posts del blog' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        posts: data || [],
        pagination: {
          page,
          limit,
          total: count || 0,
          totalPages: Math.ceil((count || 0) / limit),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error en GET /api/blog/posts:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const authError = await requireAuth();
  if (authError) return authError;

  try {
    const body = await request.json();

    const title = String(body.title || '').trim();
    const content = String(body.content || '').trim();
    const mediaType = String(body.media_type || '').trim();
    const mediaUrl = String(body.media_url || '').trim();
    const mediaPublicId = String(body.media_public_id || '').trim();
    const mediaResourceType = String(body.media_resource_type || '').trim();
    const thumbnailUrl = body.thumbnail_url ? String(body.thumbnail_url).trim() : null;
    const isVisible = Boolean(body.is_visible);

    if (!title) {
      return NextResponse.json(
        { error: 'El título es obligatorio' },
        { status: 400 }
      );
    }

    if (!content) {
      return NextResponse.json(
        { error: 'El contenido es obligatorio' },
        { status: 400 }
      );
    }

    if (!isValidMediaType(mediaType)) {
      return NextResponse.json(
        { error: 'El tipo de multimedia no es válido' },
        { status: 400 }
      );
    }

    if (!mediaUrl || !mediaPublicId || !mediaResourceType) {
      return NextResponse.json(
        { error: 'Debes subir primero el archivo multimedia' },
        { status: 400 }
      );
    }

    const slug = await generateUniqueSlug(title);

    const { data, error } = await supabase
      .from('blog_posts')
      .insert({
        title,
        slug,
        content,
        media_type: mediaType,
        media_url: mediaUrl,
        media_public_id: mediaPublicId,
        media_resource_type: mediaResourceType,
        thumbnail_url: thumbnailUrl,
        is_visible: isVisible,
      })
      .select('*')
      .single();

    if (error) {
      console.error('Error creando post:', error);
      return NextResponse.json(
        { error: 'Error al crear el post' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        post: data,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error en POST /api/blog/posts:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}