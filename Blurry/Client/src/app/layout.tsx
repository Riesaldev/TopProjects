import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/AuthContext";
import { NotificationsProvider } from "@/components/NotificationsContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blurry - Conexiones Auténticas",
  description: "Plataforma para conexiones auténticas y relaciones duraderas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <AuthProvider>
          <NotificationsProvider>
            {children}
          </NotificationsProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
