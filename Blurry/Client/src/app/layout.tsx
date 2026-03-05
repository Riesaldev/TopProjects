import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/AuthContext";
import { NotificationsProvider } from "@/components/NotificationsContext";

const inter = Inter({ subsets: ["latin"] });

function resolveMetadataBase(): URL {
  const rawUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  try {
    return new URL(rawUrl);
  } catch {
    return new URL("http://localhost:3000");
  }
}

export const viewport: Viewport = {
  themeColor: "#4f46e5",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  metadataBase: resolveMetadataBase(),
  title: "Blurry | Conexiones Auténticas Más Allá de lo Físico",
  description: "Blurry es la app de citas que revoluciona las relaciones. Concreta citas a ciegas, conoce gente por su personalidad mediante inteligencia artificial y descubre un entorno seguro con videollamadas y juegos.",
  keywords: ["citas", "dating app", "conocer gente", "videollamada anónima", "match con IA"],
  openGraph: {
    title: "Blurry | Conexiones Auténticas",
    description: "Conecta emocionalmente antes que físicamente.",
    url: "https://blurry-app.com",
    siteName: "Blurry",
    images: [
      {
        url: "/og-image.jpg", // placeholder
        width: 1200,
        height: 630,
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blurry | Conexiones Auténticas",
    description: "Conecta emocionalmente antes que físicamente.",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="antialiased">
      <body className={`${inter.className} min-h-screen flex flex-col selection:bg-indigo-200 selection:text-indigo-900`}>
        <AuthProvider>
          <NotificationsProvider>
            {children}
          </NotificationsProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
