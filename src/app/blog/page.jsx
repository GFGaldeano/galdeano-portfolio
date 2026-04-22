import BlogIndexPageClient from "../../components/blog/BlogIndexPageClient";
import { getVisibleBlogPosts } from "../../lib/blog-server";
import { getSiteUrl } from "../../lib/site";

const siteUrl = getSiteUrl();

export const revalidate = 300;

export const metadata = {
  title: "Blog Técnico",
  description:
    "Noticias, informes y contenido multimedia sobre desarrollo, arquitectura, inteligencia artificial y productos reales.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    type: "website",
    url: `${siteUrl}/blog`,
    siteName: "Galdeano.dev",
    title: "Blog Técnico | Gustavo Galdeano",
    description:
      "Noticias, informes y contenido multimedia sobre desarrollo, arquitectura, inteligencia artificial y productos reales.",
  },
  twitter: {
    card: "summary",
    title: "Blog Técnico | Gustavo Galdeano",
    description:
      "Noticias, informes y contenido multimedia sobre desarrollo, arquitectura, inteligencia artificial y productos reales.",
  },
};

export default async function BlogPage() {
  const posts = await getVisibleBlogPosts();

  return <BlogIndexPageClient posts={posts} />;
}