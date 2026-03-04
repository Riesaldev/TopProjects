"use client";

import React from "react";
import Link from "next/link";
import { Download, Users, ShieldCheck, HeartPulse } from "lucide-react";
import Rating from "./components/Rating";
import InfoSection from "./components/InfoSection";
import ContactForm from "./components/ContactForm";

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col items-center bg-gray-50 dark:bg-black text-gray-900 dark:text-gray-100 font-sans selection:bg-primary-200">
      {/* Hero Section */}
      <section
        className="w-full relative flex flex-col items-center justify-center bg-gradient-to-br from-primary-600 via-secondary-700 to-primary-900 text-white py-32 px-4 text-center overflow-hidden"
        aria-labelledby="hero-title"
      >
        {/* Animated Background */}
        <div
          className="absolute inset-0 bg-[url('https://images.pexels.com/photos/5384445/pexels-photo-5384445.jpeg?auto=compress&cs=tinysrgb&w=1920&q=20')] opacity-20 mix-blend-overlay bg-cover bg-center"
          aria-hidden="true"
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary-400/30 rounded-full blur-[100px] animate-pulse"></div>
        <div
          className="absolute -bottom-24 -right-24 w-96 h-96 bg-secondary-400/30 rounded-full blur-[100px] animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>

        <div className="relative z-10 max-w-4xl flex flex-col items-center">
          <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-white text-sm font-bold border border-white/20 shadow-xl animate-fade-in-up">
            <HeartPulse
              size={18}
              className="text-primary-300 animate-pulse"
              aria-hidden="true"
            />
            <span>La nueva forma de encontrar el amor</span>
          </div>
          <h1
            id="hero-title"
            className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tighter drop-shadow-lg leading-tight animate-fade-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            Conexiones reales.
            <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-200 to-secondary-200">
              Cero superficialidad.
            </span>
          </h1>
          <p
            className="text-xl md:text-2xl max-w-2xl mb-12 text-gray-200 font-medium drop-shadow animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            Descubre Blurry. Conecta por personalidad usando Inteligencia
            Artificial, chatea en un entorno seguro y desbloquea el amor paso a
            paso.
          </p>
          <div
            className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto animate-fade-in-up"
            style={{ animationDelay: "0.3s" }}
          >
            <Link
              href="/auth/register"
              className="bg-white text-primary-700 font-extrabold text-lg py-4 px-10 rounded-full shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:shadow-[0_0_40px_rgba(255,255,255,0.5)] hover:scale-105 active:scale-95 transition-all outline-none focus:ring-4 focus:ring-primary-300 focus:ring-offset-2 focus:ring-offset-primary-600"
            >
              Comenzar Gratis
            </Link>
            <a
              href="#descargar"
              className="glass-panel text-white font-bold text-lg py-4 px-10 rounded-full hover:bg-white/20 active:scale-95 transition-all outline-none focus:ring-4 focus:ring-white/50 flex items-center justify-center gap-3 border border-white/30"
            >
              <Download size={22} aria-hidden="true" />
              Descargar App
            </a>
          </div>
        </div>
      </section>

      {/* Info & Features */}
      <section
        className="w-full py-24 px-4 bg-white dark:bg-zinc-950 relative"
        aria-label="Características de Blurry"
      >
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-500/20 to-transparent"></div>
        <InfoSection />
      </section>

      {/* Ratings & Reviews */}
      <section
        className="w-full bg-gradient-to-b from-primary-50 to-white dark:from-zinc-900 dark:to-zinc-950 py-24 px-4 relative overflow-hidden"
        aria-label="Opiniones de los usuarios"
      >
        <div className="absolute left-0 top-1/2 w-64 h-64 bg-primary-200/20 dark:bg-primary-900/10 blur-[80px] rounded-full -translate-y-1/2"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <Rating />
        </div>
      </section>

      {/* Download Section */}
      <section
        id="descargar"
        className="w-full max-w-4xl py-32 px-4 text-center"
      >
        <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight text-gradient">
          Lleva Blurry en tu bolsillo
        </h2>
        <p className="text-xl text-gray-500 dark:text-gray-400 mb-12 max-w-2xl mx-auto font-medium">
          Disponible para iOS y Android. Únete a miles de personas que
          construyen relaciones sanas todos los días.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <button
            type="button"
            className="flex items-center justify-center gap-4 bg-black dark:bg-white text-white dark:text-black px-8 py-4 rounded-2xl hover-lift shadow-xl dark:shadow-white/10 focus:outline-none focus:ring-4 focus:ring-primary-500/50"
            aria-label="Descargar en App Store"
          >
            <svg
              className="w-10 h-10"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.04 2.26-.79 3.59-.76 1.54.04 2.81.76 3.57 1.95-3.06 1.88-2.58 5.72.35 6.94-.68 1.76-1.57 3.23-2.59 4.04zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
            </svg>
            <div className="text-left flex flex-col">
              <span className="text-xs uppercase tracking-wider font-bold opacity-70">
                Descargar en
              </span>
              <span className="text-2xl font-black leading-tight">
                App Store
              </span>
            </div>
          </button>

          <button
            type="button"
            className="flex items-center justify-center gap-4 bg-black dark:bg-white text-white dark:text-black px-8 py-4 rounded-2xl hover-lift shadow-xl dark:shadow-white/10 focus:outline-none focus:ring-4 focus:ring-primary-500/50"
            aria-label="Disponible en Google Play"
          >
            <svg
              className="w-10 h-10"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M3.609 1.814L13.792 12 3.61 22.186a1.986 1.986 0 01-.482-1.312V3.125c0-.498.175-.953.481-1.311zM14.5 12.707l2.809 2.81-10.74 6.136L14.5 12.707zm3.504-2.822l3.228 1.844a1.05 1.05 0 010 1.823l-3.228 1.844-3.512-3.511 3.512-3.511zM6.57 2.347l10.74 6.136-7.93 7.931-2.81-2.81V2.347z" />
            </svg>
            <div className="text-left flex flex-col">
              <span className="text-xs uppercase tracking-wider font-bold opacity-70">
                Disponible en
              </span>
              <span className="text-2xl font-black leading-tight">
                Google Play
              </span>
            </div>
          </button>
        </div>
      </section>

      {/* Contact Form */}
      <section
        className="w-full bg-white dark:bg-zinc-950 py-24 px-4 border-t border-gray-100 dark:border-zinc-900"
        aria-label="Formulario de contacto"
      >
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-20 h-20 bg-primary-50 dark:bg-primary-900/20 text-primary-500 flex items-center justify-center rounded-2xl mx-auto mb-8 shadow-inner rotate-3 hover:rotate-0 transition-transform">
            <Users size={40} className="drop-shadow-sm" aria-hidden="true" />
          </div>
          <h2 className="text-4xl font-black mb-4 tracking-tight">
            ¿Tienes dudas?
          </h2>
          <p className="text-xl text-gray-500 dark:text-gray-400 mb-12 font-medium">
            Escríbenos y nuestro equipo te responderá de forma cercana en menos
            de 24 horas.
          </p>
          <div className="text-left">
            <ContactForm />
          </div>
        </div>
      </section>

      <footer className="w-full bg-zinc-950 text-gray-400 py-16 text-center text-sm border-t border-zinc-900">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gradient-to-tr from-primary-500 to-secondary-500 flex items-center justify-center opacity-80">
              <span className="text-white font-black text-xs">B</span>
            </div>
            <p className="font-medium">
              © {new Date().getFullYear()} Blurry App. Todos los derechos
              reservados.
            </p>
          </div>
          <div className="flex gap-8 font-medium">
            <Link
              href="/legal/privacy"
              className="hover:text-primary-400 transition-colors focus:outline-none focus:underline underline-offset-4 decoration-primary-500"
            >
              Política de Privacidad
            </Link>
            <Link
              href="/legal/terms"
              className="hover:text-primary-400 transition-colors focus:outline-none focus:underline underline-offset-4 decoration-primary-500"
            >
              Términos de Uso
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
