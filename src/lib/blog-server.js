import { cache } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

export const getVisibleBlogPosts = cache(async () => {
  const { data, error } = await supabase
    .from("blog_posts")
    .select(
      "id, title, slug, published_at, content, media_type, media_url, media_public_id, media_resource_type, thumbnail_url, is_visible, created_at, updated_at",
    )
    .eq("is_visible", true)
    .order("published_at", { ascending: false });

  if (error) {
    console.error("Error obteniendo posts visibles del blog:", error);
    return [];
  }

  return data || [];
});

export const getVisibleBlogPostBySlug = cache(async (slug) => {
  const { data, error } = await supabase
    .from("blog_posts")
    .select(
      "id, title, slug, published_at, content, media_type, media_url, media_public_id, media_resource_type, thumbnail_url, is_visible, created_at, updated_at",
    )
    .eq("slug", slug)
    .eq("is_visible", true)
    .single();

  if (error) {
    console.error("Error obteniendo post por slug:", error);
    return null;
  }

  return data;
});

export function getPostDescription(content = "", maxLength = 160) {
  const clean = content.replace(/\s+/g, " ").trim();

  if (clean.length <= maxLength) {
    return clean;
  }

  return `${clean.slice(0, maxLength).trim()}...`;
}