import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer';
import Hero from '@/components/layout/Hero';
import HowItWorks from '@/components/layout/HowItWorks';
import ProductSpotlight from '@/components/layout/ProductSpotlight';
import TopProducers from '@/components/layout/TopProducers';
import Testimonials from '@/components/layout/Testimonials';
import Newsletter from '@/components/layout/Newsletter';

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
