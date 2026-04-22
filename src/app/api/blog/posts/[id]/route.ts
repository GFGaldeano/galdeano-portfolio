// src/app/api/blog/posts/[id]/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { requireAuth } from "../../../../../lib/auth";
import { createSlug, isValidMediaType } from "../../../../../lib/blog";
import { deleteFromCloudinary } from "../../../../../lib/cloudinary";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

async function generateUniqueSlug(title: string, currentId: string) {
  const baseSlug = createSlug(title) || `post-${Date.now()}`;
  let slug = baseSlug;
  let counter = 2;

  while (true) {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("id")
      .eq("slug", slug)
      .maybeSingle();

    if (error) throw error;

    if (!data || data.id === currentId) return slug;

    slug = `${baseSlug}-${counter}`;
    counter += 1;
  }
}

export async function GET(
  _request: Request,
  { params }: { params: { id: string } },
) {
  const authError = await requireAuth();
  if (authError) return authError;

  try {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("id", params.id)
      .single();

    if (error) {
      return NextResponse.json(
        { error: "Post no encontrado" },
        { status: 404 },
      );
    }

    return NextResponse.json({ post: data }, { status: 200 });
  } catch (error) {
    console.error("Error en GET /api/blog/posts/[id]:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 },
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
  const authError = await requireAuth();
  if (authError) return authError;

  try {
    const body = await request.json();

    const { data: existingPost, error: fetchError } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("id", params.id)
      .single();

    if (fetchError || !existingPost) {
      return NextResponse.json(
        { error: "Post no encontrado" },
        { status: 404 },
      );
    }

    const updates: any = {};

    if (typeof body.title === "string" && body.title.trim()) {
      updates.title = body.title.trim();

      if (updates.title !== existingPost.title) {
        updates.slug = await generateUniqueSlug(updates.title, params.id);
      }
    }

    if (typeof body.content === "string" && body.content.trim()) {
      updates.content = body.content.trim();
    }

    if (typeof body.is_visible === "boolean") {
      updates.is_visible = body.is_visible;
    }

    if (body.media_type) {
      const mediaType = String(body.media_type).trim();

      if (!isValidMediaType(mediaType)) {
        return NextResponse.json(
          { error: "Tipo de multimedia inválido" },
          { status: 400 },
        );
      }

      updates.media_type = mediaType;
    }

    if (typeof body.media_url === "string") {
      updates.media_url = body.media_url.trim();
    }

    if (typeof body.media_public_id === "string") {
      updates.media_public_id = body.media_public_id.trim();
    }

    if (typeof body.media_resource_type === "string") {
      updates.media_resource_type = body.media_resource_type.trim();
    }

    if (typeof body.thumbnail_url === "string" || body.thumbnail_url === null) {
      updates.thumbnail_url = body.thumbnail_url;
    }

    const { data, error } = await supabase
      .from("blog_posts")
      .update(updates)
      .eq("id", params.id)
      .select("*")
      .single();

    if (error) {
      console.error("Error actualizando post:", error);
      return NextResponse.json(
        { error: "Error al actualizar el post" },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        post: data,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error en PATCH /api/blog/posts/[id]:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } },
) {
  const authError = await requireAuth();
  if (authError) return authError;

  try {
    const { data: existingPost, error: fetchError } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("id", params.id)
      .single();

    if (fetchError || !existingPost) {
      return NextResponse.json(
        { error: "Post no encontrado" },
        { status: 404 },
      );
    }

    if (existingPost.media_public_id && existingPost.media_type) {
      try {
        await deleteFromCloudinary(
          existingPost.media_public_id,
          existingPost.media_type,
        );
      } catch (cloudinaryError) {
        console.error("Error borrando asset de Cloudinary:", cloudinaryError);
      }
    }

    const { error } = await supabase
      .from("blog_posts")
      .delete()
      .eq("id", params.id);

    if (error) {
      console.error("Error eliminando post:", error);
      return NextResponse.json(
        { error: "Error al eliminar el post" },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { success: true, deletedId: params.id },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error en DELETE /api/blog/posts/[id]:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 },
    );
  }
}