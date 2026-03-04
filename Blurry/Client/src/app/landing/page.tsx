"use client";

import React from "react";
import Link from "next/link";
import Rating from "./components/Rating";
import InfoSection from "./components/InfoSection";
import ContactForm from "./components/ContactForm";

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col items-center bg-gray-50">
      {/* Hero Section */}
      <section className="w-full flex flex-col items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-20 px-4 text-center">
        <h1 className="text-5xl font-extrabold mb-6 tracking-tight">Bienvenido a Blurry</h1>
        <p className="text-xl max-w-2xl mb-10 opacity-90">
          Explora la app, conoce sus ventajas y descubre cómo Blurry puede ayudarte a conectar de forma segura, anónima y divertida.
        </p>
        <div className="flex gap-4">
          <Link href="/auth/register" className="bg-white text-indigo-600 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 transition-colors">
            Crear cuenta gratis
          </Link>
          <a href="#descargar" className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-white/10 transition-colors">
            Descargar App
          </a>
        </div>
      </section>

      {/* Info & Features */}
      <section className="w-full max-w-6xl py-16 px-4">
        <InfoSection />
      </section>

      {/* Ratings & Reviews */}
      <section className="w-full bg-white py-16 px-4 border-y border-gray-200">
        <div className="max-w-6xl mx-auto">
          <Rating />
        </div>
      </section>

      {/* Download Section */}
      <section id="descargar" className="w-full max-w-4xl py-20 px-4 text-center">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Lleva Blurry contigo</h2>
        <p className="text-lg text-gray-600 mb-10">
          Disponible para iOS y Android. Únete a miles de personas que ya están conectando con sus intereses reales.
        </p>
        <div className="flex justify-center gap-6">
          <button className="flex items-center gap-3 bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.04 2.26-.79 3.59-.76 1.54.04 2.81.76 3.57 1.95-3.06 1.88-2.58 5.72.35 6.94-.68 1.76-1.57 3.23-2.59 4.04zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
            <div className="text-left">
              <div className="text-xs">Descargar en</div>
              <div className="text-xl font-semibold -mt-1">App Store</div>
            </div>
          </button>
          <button className="flex items-center gap-3 bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M3.609 1.814L13.792 12 3.61 22.186a1.986 1.986 0 01-.482-1.312V3.125c0-.498.175-.953.481-1.311zM14.5 12.707l2.809 2.81-10.74 6.136L14.5 12.707zm3.504-2.822l3.228 1.844a1.05 1.05 0 010 1.823l-3.228 1.844-3.512-3.511 3.512-3.511zM6.57 2.347l10.74 6.136-7.93 7.931-2.81-2.81V2.347z"/></svg>
            <div className="text-left">
              <div className="text-xs">DISPONIBLE EN</div>
              <div className="text-xl font-semibold -mt-1">Google Play</div>
            </div>
          </button>
        </div>
      </section>

      {/* Contact Form */}
      <section className="w-full bg-gray-100 py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">¿Tienes dudas?</h2>
          <p className="text-gray-600 mb-8">Escríbenos y nuestro equipo de soporte te responderá lo antes posible.</p>
          <ContactForm />
        </div>
      </section>
    </main>
  );
} 