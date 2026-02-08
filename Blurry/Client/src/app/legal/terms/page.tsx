"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link 
          href="/" 
          className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-8 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Volver al inicio
        </Link>
        
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-primary-900 mb-8">Términos de Servicio</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              <strong>Última actualización:</strong> 1 de agosto de 2025
            </p>
            
            <section className="mb-8">
              <h2 className="text-xl font-bold text-primary-900 mb-4">1. Aceptación de los Términos</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Al acceder y usar Blurry, aceptas estar sujeto a estos Términos de Servicio y todas las leyes 
                y regulaciones aplicables. Si no estás de acuerdo con alguno de estos términos, no uses nuestra aplicación.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-primary-900 mb-4">2. Descripción del Servicio</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Blurry es una plataforma de citas en línea que permite a los usuarios conectarse a través de 
                videollamadas con efecto blur, priorizando las conexiones emocionales y la personalidad sobre 
                la apariencia física.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-primary-900 mb-4">3. Elegibilidad y Registro</h2>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Debes tener al menos 18 años para usar Blurry</li>
                <li>Debes proporcionar información precisa y completa durante el registro</li>
                <li>Eres responsable de mantener la confidencialidad de tu cuenta</li>
                <li>Solo puedes tener una cuenta activa</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-primary-900 mb-4">4. Normas de Conducta</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Al usar Blurry, te comprometes a:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Tratar a otros usuarios con respeto y cortesía</li>
                <li>No compartir contenido ofensivo, discriminatorio o inapropiado</li>
                <li>No acosar, intimidar o amenazar a otros usuarios</li>
                <li>No intentar eludir las medidas de seguridad de la plataforma</li>
                <li>No usar la plataforma para fines comerciales no autorizados</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-primary-900 mb-4">5. Privacidad y Datos</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Tu privacidad es importante para nosotros. Consulta nuestra Política de Privacidad para 
                entender cómo recopilamos, usamos y protegemos tu información personal.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-primary-900 mb-4">6. Sistema de Tokens</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Los tokens son la moneda virtual de Blurry. Puedes ganar tokens completando actividades 
                o comprarlos. Los tokens no tienen valor monetario real y no son reembolsables.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-primary-900 mb-4">7. Suspensión y Terminación</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Nos reservamos el derecho de suspender o terminar tu cuenta si violas estos términos 
                o por cualquier razón que consideremos apropiada para mantener la seguridad de la comunidad.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-primary-900 mb-4">8. Limitación de Responsabilidad</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Blurry se proporciona "tal como está". No garantizamos que el servicio esté libre de errores 
                o interrupciones. Tu uso de la plataforma es bajo tu propio riesgo.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-primary-900 mb-4">9. Cambios en los Términos</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Podemos modificar estos términos en cualquier momento. Los cambios entrarán en vigor 
                inmediatamente después de su publicación en la aplicación.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-primary-900 mb-4">10. Contacto</h2>
              <p className="text-gray-700 leading-relaxed">
                Si tienes preguntas sobre estos términos, contáctanos en:{" "}
                <span className="font-semibold">legal@blurry.app</span>
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
