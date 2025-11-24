"use client";

import Link from "next/link";
import { motion } from 'framer-motion';
import { Video, Heart, Star, ArrowRight, Lock, Gamepad2, Trophy } from 'lucide-react';

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-primary-900 via-accent-900 to-secondary-900">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <motion.div
          className="flex items-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-gradient-to-r from-primary-800 to-primary-600 p-2 rounded-xl">
            <Video className="h-8 w-8 text-white" />
          </div>
          <h1 className="ml-3 text-2xl font-bold bg-gradient-to-r from-primary-700 to-primary-600 bg-clip-text text-transparent">
            Blurry
          </h1>
        </motion.div>

        <motion.div
          className="flex gap-3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Link href="/auth/login" className="px-6 py-2 text-primary-500 hover:bg-primary-800 hover:text-primary-50 rounded-xl transition-all duration-200">
            Iniciar Sesión
          </Link>
          <Link href="/auth/register" className="px-6 py-2 bg-gradient-to-r from-primary-700 to-primary-800 text-white rounded-xl hover:from-primary-800 hover:to-primary-900 transform hover:scale-110 transition-all duration-200 shadow-lg">
            Registrarse
          </Link>
        </motion.div>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <motion.h2
              className="text-4xl md:text-6xl font-bold text-secondary-600 mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Encuentra Tu{" "}
              <span className="bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
                Conexión Perfecta
              </span>
            </motion.h2>

            <motion.p
              className="text-xl text-secondary-400 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              La app de citas donde lo primero es la conexión emocional. Conecta con personas auténticas a travez de la seguridad que aporta nuestra videocall con efecto blur y un entorno lúdico.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link href="/auth/register" className="px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl font-semibold text-lg hover:from-primary-700 hover:to-primary-800 transform hover:scale-105 transition-all duration-200 shadow-xl hover:shadow-2xl flex items-center justify-center gap-2">
                Regístrate Gratis
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link href="/auth/login" className="px-8 py-4 border-2 border-primary-600 text-primary-600 rounded-xl font-semibold text-lg hover:bg-primary-600 hover:text-white transition-all duration-200">
                Iniciar Sesión
              </Link>
            </motion.div>
          </div>

      
          <motion.div 
          className="md:w-1/2 md:pl-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          >
            <div className="bg-secondary-100 rounded-2xl shadow-xl overflow-hidden relative">
              <img
                src="https://images.pexels.com/photos/5384445/pexels-photo-5384445.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Video dating"
                className="w-full h-auto p-2 rounded-2xl blur-[8px]"
              />

              <div
                className="absolute top-2 right-2 bg-gradient-to-r from-primary-800 to-primary-500 p-3 rounded-full shadow-lg"
              >
                <Heart size={24} />
              </div>

              <div className="flex items-center justify-center absolute bottom-0 left-0 w-full bg-gradient-to-t from-primary-800 to-transparent py-16">
                <p className="text-white text-center absolute bottom-4">Conexiones auténticas y seguras</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-primary-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-4">
              ¿Por Qué Elegir Blurry?
            </h2>
            <p className="text-xl text-accent-600 max-w-3xl mx-auto">
              Es una plataforma diseñada para conectar con personas auténticas donde la privacidad y la diversión son clave. Disfruta de videollamadas seguras, juegos interactivos y un sistema de logros que te recompensa por tu participación.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Lock,
                title: "Privacidad Ante Todo",
                description: "Videollamadas con blur, control total sobre tu perfil y datos, y sistema de reportes avanzado.",
                gradient: "from-primary-500 to-secondary-600",
                delay: 0.1
              },
              {
                icon: Gamepad2,
                title: "Juegos y Tests Integrados",
                description: "Rompe el hielo y diviértete con juegos y tests exclusivos durante tus citas.",
                gradient: "from-primary-500 to-secondary-600",
                delay: 0.2
              },
              {
                icon: Trophy,
                title: "Logros y Recompensas",
                description: "Gana tokens y premios desbloqueando logros por tu actividad y participación.",
                gradient: "from-primary-500 to-secondary-600",
                delay: 0.3
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                className="bg-primary-50 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-accent-400"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: feature.delay }}
              >
                <div className={`bg-gradient-to-r ${feature.gradient} p-4 rounded-xl inline-block mb-6`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-primary-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-accent-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 md:py-24 bg-accent-500">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-primary-900 mb-12">
            ¿Cómo Funciona?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {[
              "Regístrate y personaliza tu perfil",
              "Conecta con otros usuarios",
              "Agenda citas seguras",
              "Disfruta videollamadas con blur y juegos",
              "Gana tokens y canjea premios"
            ].map((step, index) => (
              <div key={step} className="text-center">
                <div className="bg-primary-500 text-white rounded-full h-12 w-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {index + 1}
                </div>
                <p className="text-accent-800 font-medium">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-primary-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-primary-900 mb-12">
            Lo Que Dicen Nuestros Usuarios
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "Me siento segura y me divierto mucho, ¡el blur es genial!",
                author: "Ana T.",
                rating: 5
              },
              {
                quote: "Los juegos y logros hacen que cada cita sea única.",
                author: "Luis G.",
                rating: 5
              },
              {
                quote: "Por fin una app donde la privacidad es real.",
                author: "María L.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <motion.div
                key={testimonial.author}
                className="bg-accent-500 p-6 rounded-xl shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={`${testimonial.author}-star-${i}`} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <p className="text-accent-800 italic mb-4">"{testimonial.quote}"</p>
                <p className="text-secondary-900 font-bold text-sm">- {testimonial.author}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-secondary-400 to-primary-600 py-16 md:py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            ¿Listo para Encontrar Tu Match Perfecto?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
            Únete a miles de usuarios que ya están encontrando conexiones auténticas
          </p>
          <div className="flex justify-center">
            <Link href="/auth/register" className="px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl font-semibold text-lg hover:from-primary-700 hover:to-primary-800 transform hover:scale-105 transition-all duration-200 shadow-xl hover:shadow-2xl flex items-center justify-center gap-2">
              Crea tu Cuenta Gratuita
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-primary-900 mb-12">
            Preguntas Frecuentes
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {[
                {
                  question: "¿Cómo funciona el efecto blur en las videollamadas?",
                  answer: "Nuestro sistema aplica un efecto de desenfoque inteligente que permite ver gestos y expresiones sin revelar completamente la apariencia física, priorizando la personalidad y la conexión emocional."
                },
                {
                  question: "¿Es segura mi información personal?",
                  answer: "Absolutamente. Utilizamos cifrado de extremo a extremo, no compartimos datos con terceros y tienes control total sobre qué información mostrar en tu perfil."
                },
                {
                  question: "¿Cómo funcionan los tokens?",
                  answer: "Los tokens son nuestra moneda virtual que puedes ganar completando misiones o comprar. Los usas para desbloquear juegos premium, tiempo extra en videollamadas y funciones especiales."
                },
                {
                  question: "¿Puedo reportar comportamientos inapropiados?",
                  answer: "Sí, tenemos un sistema de reportes robusto con moderación por IA en tiempo real y un equipo humano que revisa todos los reportes las 24 horas."
                },
                {
                  question: "¿Blurry es gratis?",
                  answer: "Sí, Blurry es completamente gratis. Ofrecemos funciones premium opcionales que puedes desbloquear con tokens, pero todas las funciones básicas son gratuitas."
                }
              ].map((faq, index) => (
                <motion.div
                  key={`faq-${faq.question.slice(0, 20)}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg p-6"
                >
                  <h3 className="text-lg font-bold text-primary-900 mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-accent-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Company Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-8">
              Sobre Blurry
            </h2>
            <p className="text-xl text-accent-600 mb-8 leading-relaxed">
              Fundada en 2024, Blurry nace de la visión de revolucionar las citas en línea priorizando 
              las conexiones auténticas sobre las apariencias superficiales. Nuestro equipo de expertos 
              en tecnología y psicología ha creado una plataforma única que combina innovación técnica 
              con comprensión profunda del comportamiento humano.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="bg-gradient-to-r from-primary-500 to-primary-600 p-4 rounded-full inline-block mb-4">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-primary-900 mb-2">Nuestra Misión</h3>
                <p className="text-accent-600">
                  Crear conexiones auténticas y duraderas basadas en la personalidad, 
                  valores e intereses compartidos.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-gradient-to-r from-primary-500 to-primary-600 p-4 rounded-full inline-block mb-4">
                  <Lock className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-primary-900 mb-2">Nuestra Promesa</h3>
                <p className="text-accent-600">
                  Garantizar un entorno seguro y privado donde puedas ser tú mismo 
                  sin temor al juicio superficial.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-gradient-to-r from-primary-500 to-primary-600 p-4 rounded-full inline-block mb-4">
                  <Star className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-primary-900 mb-2">Nuestra Visión</h3>
                <p className="text-accent-600">
                  Ser la plataforma líder mundial en citas conscientes y 
                  relaciones significativas en la era digital.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary-900 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center pb-4">
                <div className="inline-block bg-gradient-to-r from-primary-800 to-primary-600 p-2 rounded-xl">
                  <Video className="h-8 w-8 text-white" />
                </div>
                <h1 className="ml-3 text-2xl font-bold bg-gradient-to-r from-primary-700 to-primary-600 bg-clip-text text-transparent">
                  Blurry
                </h1>
              </div>
              <p className="text-gray-400 my-4">
                Una nueva forma de tener citas basada en la que la personalidad es lo primero, y la apariencia es para más tarde.
              </p>
            </div>


            <div className="mt-8 md:mt-0">
              <h4 className="text-lg font-bold mb-4">Compañía</h4>
              <ul className="space-y-2">
                <li><a href="#about" className="text-gray-400 hover:text-white">Sobre Nosotros</a></li>
                <li><span className="text-gray-500 cursor-not-allowed">Carreras</span></li>
                <li><span className="text-gray-500 cursor-not-allowed">Prensa</span></li>
                <li><a href="/help" className="text-gray-400 hover:text-white">Contacto</a></li>
              </ul>
            </div>

            <div className="mt-8 md:mt-0">
              <h4 className="text-lg font-bold mb-4">Recursos</h4>
              <ul className="space-y-2">
                <li><span className="text-gray-500 cursor-not-allowed">Blog</span></li>
                <li><span className="text-gray-500 cursor-not-allowed">Consejos para Citas</span></li>
                <li><span className="text-gray-500 cursor-not-allowed">Historias de Éxito</span></li>
                <li><a href="#faq" className="text-gray-400 hover:text-white">FAQ</a></li>
              </ul>
            </div>

            <div className="mt-8 md:mt-0">
              <h4 className="text-lg font-bold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><Link href="/legal/privacy" className="text-gray-400 hover:text-white">Política de Privacidad</Link></li>
                <li><Link href="/legal/terms" className="text-gray-400 hover:text-white">Términos de Servicio</Link></li>
                <li><span className="text-gray-500 cursor-not-allowed">Política de Cookies</span></li>
                <li><span className="text-gray-500 cursor-not-allowed">Guías de la Comunidad</span></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
