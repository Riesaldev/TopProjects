"use client";

import Link from "next/link";
import { ArrowLeft, Shield, Eye, Lock, UserCheck } from "lucide-react";

export default function PrivacyPolicy() {
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
          <div className="flex items-center mb-8">
            <Shield className="h-8 w-8 text-primary-600 mr-3" />
            <h1 className="text-3xl font-bold text-primary-900">Política de Privacidad</h1>
          </div>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              <strong>Última actualización:</strong> 1 de agosto de 2025
            </p>
            
            <div className="bg-primary-50 border-l-4 border-primary-500 p-6 mb-8 rounded-r-lg">
              <h2 className="text-lg font-bold text-primary-900 mb-2">
                Tu privacidad es nuestra prioridad
              </h2>
              <p className="text-primary-800">
                En Blurry, creemos que las conexiones auténticas requieren confianza. Por eso hemos diseñado 
                nuestra plataforma y políticas para proteger tu privacidad en cada interacción.
              </p>
            </div>

            <section className="mb-8">
              <div className="flex items-center mb-4">
                <Eye className="h-6 w-6 text-primary-600 mr-2" />
                <h2 className="text-xl font-bold text-primary-900">1. Información que Recopilamos</h2>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Información que nos proporcionas:</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Información de registro (nombre, email, edad, ubicación general)</li>
                <li>Preferencias y datos de perfil</li>
                <li>Mensajes y contenido que compartes</li>
                <li>Información de contacto para soporte</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-900 mb-3">Información recopilada automáticamente:</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Datos de uso de la aplicación</li>
                <li>Información del dispositivo</li>
                <li>Datos de videollamadas (solo metadatos, no contenido)</li>
                <li>Información de geolocalización aproximada</li>
              </ul>
            </section>

            <section className="mb-8">
              <div className="flex items-center mb-4">
                <UserCheck className="h-6 w-6 text-primary-600 mr-2" />
                <h2 className="text-xl font-bold text-primary-900">2. Cómo Usamos tu Información</h2>
              </div>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Facilitar conexiones y matches entre usuarios</li>
                <li>Personalizar tu experiencia en la aplicación</li>
                <li>Mejorar nuestros servicios y desarrollar nuevas funciones</li>
                <li>Detectar y prevenir actividades fraudulentas o dañinas</li>
                <li>Comunicarnos contigo sobre tu cuenta y nuestros servicios</li>
                <li>Cumplir con requisitos legales</li>
              </ul>
            </section>

            <section className="mb-8">
              <div className="flex items-center mb-4">
                <Lock className="h-6 w-6 text-primary-600 mr-2" />
                <h2 className="text-xl font-bold text-primary-900">3. Protección de tu Información</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Cifrado</h3>
                  <p className="text-gray-700 text-sm">
                    Todas las comunicaciones están cifradas de extremo a extremo.
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Acceso Limitado</h3>
                  <p className="text-gray-700 text-sm">
                    Solo el personal autorizado puede acceder a datos de usuarios.
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Anonimización</h3>
                  <p className="text-gray-700 text-sm">
                    Los datos analíticos se anonimizan antes del procesamiento.
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Auditorías</h3>
                  <p className="text-gray-700 text-sm">
                    Realizamos auditorías regulares de seguridad y privacidad.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-primary-900 mb-4">4. Compartir Información</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                <strong>No vendemos tu información personal.</strong> Solo compartimos información en situaciones limitadas:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Con otros usuarios según tu configuración de privacidad</li>
                <li>Con proveedores de servicios que nos ayudan a operar la plataforma</li>
                <li>Cuando sea requerido por ley o para proteger la seguridad</li>
                <li>En caso de fusión o adquisición (con notificación previa)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-primary-900 mb-4">5. Tus Derechos y Controles</h2>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li><strong>Acceso:</strong> Puedes ver toda la información que tenemos sobre ti</li>
                <li><strong>Corrección:</strong> Puedes actualizar tu información en cualquier momento</li>
                <li><strong>Eliminación:</strong> Puedes eliminar tu cuenta y datos asociados</li>
                <li><strong>Portabilidad:</strong> Puedes descargar una copia de tus datos</li>
                <li><strong>Objeción:</strong> Puedes oponerte a ciertos procesamientos de datos</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-primary-900 mb-4">6. Retención de Datos</h2>
              <p className="text-gray-700 leading-relaxed">
                Mantenemos tu información solo mientras sea necesaria para proporcionarte nuestros servicios. 
                Cuando elimines tu cuenta, borraremos tu información personal dentro de 30 días, excepto 
                la información que debemos conservar por requisitos legales.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-primary-900 mb-4">7. Cookies y Tecnologías Similares</h2>
              <p className="text-gray-700 leading-relaxed">
                Usamos cookies y tecnologías similares para mejorar tu experiencia, analizar el uso de 
                la aplicación y personalizar el contenido. Puedes controlar las cookies a través de la 
                configuración de tu navegador.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-primary-900 mb-4">8. Cambios en esta Política</h2>
              <p className="text-gray-700 leading-relaxed">
                Podemos actualizar esta política ocasionalmente. Te notificaremos sobre cambios significativos 
                por email o a través de la aplicación. Tu uso continuado después de los cambios constituye 
                tu aceptación de la política actualizada.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-primary-900 mb-4">9. Contacto</h2>
              <p className="text-gray-700 leading-relaxed">
                Si tienes preguntas sobre esta política o quieres ejercer tus derechos de privacidad, 
                contáctanos en:{" "}
                <span className="font-semibold">privacy@blurry.app</span>
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
