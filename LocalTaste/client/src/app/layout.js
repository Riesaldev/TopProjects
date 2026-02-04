/**
 * @fileoverview Layout raíz de la aplicación LocalTaste
 * Configura fonts, metadata y estructura HTML base para toda la aplicación
 */

import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";

/**
 * Configuración de fuente sans-serif Geist
 * Fuente principal para textos de la aplicación
 */
const geistSans = Geist( {
  variable: "--font-geist-sans",
  subsets: [ "latin" ],
} );

/**
 * Configuración de fuente monospace Geist Mono
 * Fuente para código y elementos de ancho fijo
 */
const geistMono = Geist_Mono( {
  variable: "--font-geist-mono",
  subsets: [ "latin" ],
} );

/**
 * Metadata de la aplicación
 * Define el título y descripción para SEO y compartir en redes sociales
 */
export const metadata = {
  title: "LocalTaste",
  description: "Discover and Share Local products and Flavors",
};

/**
 * Layout raíz de la aplicación
 * 
 * Componente que envuelve todas las páginas de la aplicación.
 * Define la estructura HTML base y aplica estilos globales.
 * 
 * Responsabilidades:
 * - Configurar estructura HTML (<html>, <body>)
 * - Aplicar variables de fuentes personalizadas
 * - Incluir estilos globales (globals.css)
 * - Habilitar antialiasing de fuentes
 * 
 * @param {Object} props - Propiedades del layout
 * @param {React.ReactNode} props.children - Contenido de la página actual
 * 
 * @returns {JSX.Element} Estructura HTML completa
 * 
 * @example
 * // Este layout se aplica automáticamente a todas las páginas
 * <RootLayout>
 *   <HomePage />
 * </RootLayout>
 */
export default function RootLayout ( { children } ) {
  return (
    <html lang="en">
      <body
        className={`${ geistSans.variable } ${ geistMono.variable } antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
