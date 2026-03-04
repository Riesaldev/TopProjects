"use client";

import React from "react";
import Link from "next/link";
import { Download , Users, ShieldCheck, HeartPulse } from "lucide-react";
import Rating from "./components/Rating";
import InfoSection from "./components/InfoSection";
import ContactForm from "./components/ContactForm";

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col items-center bg-gray-50 text-gray-900 font-sans selection:bg-indigo-200">
      {/* Hero Section */}
      <section 
        className="w-full relative flex flex-col items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-700 to-indigo-900 text-white py-24 px-4 text-center overflow-hidden"
        aria-labelledby="hero-title"
      >
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/5384445/pexels-photo-5384445.jpeg?auto=compress&cs=tinysrgb&w=1920&q=20')] opacity-10 mix-blend-overlay bg-cover bg-center" aria-hidden="true"></div>
        
        <div className="relative z-10 max-w-4xl flex flex-col items-center">
          <span className="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-indigo-50 text-sm font-medium backdrop-blur-sm border border-white/10">
            <HeartPulse size={16} aria-hidden="true"/>
            La nueva forma de encontrar el amor
          </span>
          <h1 id="hero-title" className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 tracking-tight drop-shadow-md">
            Conexiones reales.<br className="hidden md:block"/> Cero superficialidad.
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl mb-10 opacity-90 font-light drop-shadow">
            Descubre Blurry. Conecta por personalidad usando Inteligencia Artificial, chatea en un entorno seguro y desbloquea videollamadas paso a paso.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link 
              href="/auth/register" 
              className="bg-white text-indigo-700 font-bold text-lg py-4 px-8 rounded-full shadow-xl hover:bg-gray-50 hover:scale-105 active:scale-95 transition-all outline-none focus:ring-4 focus:ring-indigo-300 focus:ring-offset-2 focus:ring-offset-indigo-600"
            >
              Crear cuenta gratis
            </Link>
            <a 
              href="#descargar" 
              className="bg-transparent border-2 border-white/80 text-white font-bold text-lg py-4 px-8 rounded-full shadow-lg hover:bg-white/10 hover:border-white active:scale-95 transition-all outline-none focus:ring-4 focus:ring-white/50 flex items-center justify-center gap-2"
            >
              <Download size={20} aria-hidden="true"/>
              Descargar App
            </a>
          </div>
        </div>
      </section>

      {/* Info & Features */}
      <section className="w-full py-20 px-4 bg-white" aria-label="Características de Blurry">
        <InfoSection />
      </section>

      {/* Ratings & Reviews */}
      <section className="w-full bg-indigo-50/50 py-20 px-4 border-y border-indigo-100" aria-label="Opiniones de los usuarios">
        <div className="max-w-6xl mx-auto">
          <Rating />
        </div>
      </section>

      {/* Download Section */}
      <section id="descargar" className="w-full max-w-4xl py-24 px-4 text-center">
        <h2 className="text-4xl font-extrabold mb-6 text-gray-900 tracking-tight">Lleva Blurry en tu bolsillo</h2>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          Disponible para iOS y Android. Únete a miles de personas que construyen relaciones sanas todos los días.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <button 
            type="button"
            className="flex items-center justify-center gap-4 bg-black text-white px-8 py-4 rounded-2xl hover:bg-gray-800 hover:-translate-y-1 active:translate-y-0 transition-all shadow-xl hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-gray-300"
            aria-label="Descargar en App Store"
          >
            <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.04 2.26-.79 3.59-.76 1.54.04 2.81.76 3.57 1.95-3.06 1.88-2.58 5.72.35 6.94-.68 1.76-1.57 3.23-2.59 4.04zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
            <div className="text-left flex flex-col">
              <span className="text-xs uppercase tracking-wider font-semibold opacity-80">Descargar en</span>
              <span className="text-2xl font-bold leading-tight">App Store</span>
            </div>
          </button>
          
          <button 
            type="button"
            className="flex items-center justify-center gap-4 bg-black text-white px-8 py-4 rounded-2xl hover:bg-gray-800 hover:-translate-y-1 active:translate-y-0 transition-all shadow-xl hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-gray-300"
            aria-label="Disponible en Google Play"
          >
            <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M3.609 1.814L13.792 12 3.61 22.186a1.986 1.986 0 01-.482-1.312V3.125c0-.498.175-.953.481-1.311zM14.5 12.707l2.809 2.81-10.74 6.136L14.5 12.707zm3.504-2.822l3.228 1.844a1.05 1.05 0 010 1.823l-3.228 1.844-3.512-3.511 3.512-3.511zM6.57 2.347l10.74 6.136-7.93 7.931-2.81-2.81V2.347z"/></svg>
            <div className="text-left flex flex-col">
              <span className="text-xs uppercase tracking-wider font-semibold opacity-80">Disponible en</span>
              <span className="text-2xl font-bold leading-tight">Google Play</span>
            </div>
          </button>
        </div>
      </section>

      {/* Contact Form */}
      <section className="w-full bg-white py-20 px-4 border-t border-gray-100" aria-label="Formulario de contacto">
        <div className="max-w-2xl mx-auto text-center">
          <span className="w-16 h-16 bg-indigo-50 text-indigo-600 flex items-center justify-center rounded-full mx-auto mb-6">
            <Users size={32} aria-hidden="true"/>
          </span>
          <h2 className="text-3xl font-extrabold mb-4 text-gray-900 tracking-tight">¿Tienes dudas?</h2>
          <p className="text-lg text-gray-600 mb-10">Escríbenos y nuestro equipo de soporte humano te responderá en menos de 24 horas.</p>
          <ContactForm />
        </div>
      </section>

      <footer className="w-full bg-gray-900 text-gray-400 py-12 text-center text-sm border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} Blurry App. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <Link href="/legal/privacy" className="hover:text-white transition-colors focus:outline-none focus:underline underline-offset-4">Política de Privacidad</Link>
            <Link href="/legal/terms" className="hover:text-white transition-colors focus:outline-none focus:underline underline-offset-4">Términos de Uso</Link>
          </div>
        </div>
      </footer>
    </main>
  );
} 