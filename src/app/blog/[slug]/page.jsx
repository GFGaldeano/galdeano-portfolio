import { notFound } from "next/navigation";
import BlogDetailPageClient from "../../../components/blog/BlogDetailPageClient";
import {
  getPostDescription,
  getVisibleBlogPostBySlug,
} from "../../../lib/blog-server";
import { getSiteUrl } from "../../../lib/site";

export const revalidate = 300;

export async function generateMetadata({ params }) {
  const post = await getVisibleBlogPostBySlug(params.slug);

  if (!post) {
    return {
      title: "Post no encontrado",
      description: "La publicación solicitada no está disponible.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const siteUrl = getSiteUrl();
  const url = `${siteUrl}/blog/${post.slug}`;
  const description = getPostDescription(post.content);
  const images = post.thumbnail_url
    ? [
        {
          url: post.thumbnail_url,
          alt: post.title,
        },
      ]
    : undefined;

  return {
    title: post.title,
    description,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      type: "article",
      url,
      siteName: "Galdeano.dev",
      title: post.title,
      description,
      publishedTime: post.published_at,
      images,
    },
    twitter: {
      card: images ? "summary_large_image" : "summary",
      title: post.title,
      description,
      images: post.thumbnail_url ? [post.thumbnail_url] : undefined,
    },
  };
}

export default async function BlogDetailPage({ params }) {
  const post = await getVisibleBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return <BlogDetailPageClient post={post} />;
}