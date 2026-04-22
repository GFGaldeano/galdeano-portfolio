import "./globals.css";
import { Inter } from "next/font/google";
import Providers from "../components/Providers";
import { getSiteUrl } from "../lib/site";

const inter = Inter({ subsets: ["latin"] });
const siteUrl = getSiteUrl();

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Gustavo Galdeano | Portfolio & Technical Blog",
    template: "%s | Gustavo Galdeano",
  },
  description:
    "Portfolio profesional y blog técnico sobre desarrollo Full Stack, arquitectura SaaS, inteligencia artificial aplicada y productos reales.",
  keywords: [
    "Gustavo Galdeano",
    "Full Stack Developer",
    "Next.js",
    "TypeScript",
    "Supabase",
    "PostgreSQL",
    "Artificial Intelligence",
    "Technical Blog",
    "SaaS Architecture",
    "Gym Master",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: siteUrl,
    siteName: "Galdeano.dev",
    title: "Gustavo Galdeano | Portfolio & Technical Blog",
    description:
      "Portfolio profesional y blog técnico sobre desarrollo Full Stack, arquitectura SaaS, inteligencia artificial aplicada y productos reales.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gustavo Galdeano | Portfolio & Technical Blog",
    description:
      "Portfolio profesional y blog técnico sobre desarrollo Full Stack, arquitectura SaaS, inteligencia artificial aplicada y productos reales.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}