/**
 * @fileoverview Página principal (home) de LocalTaste
 * Landing page con hero, sección de cómo funciona, productos destacados, productores top, testimonios y newsletter
 */

import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer';
import Hero from '@/components/layout/Hero';
import HowItWorks from '@/components/layout/HowItWorks';
import ProductSpotlight from '@/components/layout/ProductSpotlight';
import TopProducers from '@/components/layout/TopProducers';
import Testimonials from '@/components/layout/Testimonials';
import Newsletter from '@/components/layout/Newsletter';

/**
 * Página principal de LocalTaste
 * 
 * Landing page que presenta la propuesta de valor de LocalTaste.
 * 
 * Secciones incluidas:
 * 1. Header - Navegación principal
 * 2. Hero - Banner principal con CTA
 * 3. HowItWorks - Cómo funciona el marketplace
 * 4. ProductSpotlight - Productos destacados de la semana
 * 5. TopProducers - Mejores productores locales
 * 6. Testimonials - Opiniones de usuarios
 * 7. Newsletter - Formulario de suscripción
 * 8. Footer - Pie de página con enlaces
 * 
 * @returns {JSX.Element} Página principal completa
 * 
 * @example
 * // Ruta: /
 * <Home />
 */
export default function Home () {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between ">
      <Header />
      <Hero />
      <HowItWorks />
      <ProductSpotlight />
      <TopProducers />
      <Testimonials />
      <Newsletter />
      <Footer />
    </main>
  );
}
