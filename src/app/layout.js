import "./globals.css";
import { Inter } from "next/font/google";
import Providers from "../components/Providers";
import { getSiteUrl } from "../lib/site";

const inter = Inter({ subsets: ["latin"] });
const siteUrl = getSiteUrl();

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Gustavo Galdeano | AI SDLC Engineer & AI Architect",
    template: "%s | Gustavo Galdeano",
  },
  description:
    "Portfolio profesional de Gustavo Galdeano, AI SDLC Engineer y AI Architect especializado en Generative AI, Context Engineering, sistemas agénticos, gobernanza de IA, Full Stack y arquitectura SaaS.",
  keywords: [
    "Gustavo Galdeano",
    "AI SDLC Engineer",
    "AI Architect",
    "AI-assisted SDLC",
    "Generative AI",
    "Context Engineering",
    "AI Agents",
    "Agentic Systems",
    "AI Governance",
    "Developer Experience",
    "Software Engineering",
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
    title: "Gustavo Galdeano | AI SDLC Engineer & AI Architect",
    description:
      "AI SDLC Engineer y AI Architect especializado en Generative AI, Context Engineering, sistemas agénticos, gobernanza de IA, Full Stack y arquitectura SaaS.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gustavo Galdeano | AI SDLC Engineer & AI Architect",
    description:
      "AI SDLC Engineer y AI Architect especializado en Generative AI, Context Engineering, sistemas agénticos, gobernanza de IA, Full Stack y arquitectura SaaS.",
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