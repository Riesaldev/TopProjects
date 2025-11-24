"use client";

import React from "react";
import Rating from "./components/Rating";
import InfoSection from "./components/InfoSection";
import ContactForm from "./components/ContactForm";

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl font-bold mb-4">Bienvenido a Blurry</h1>
      <p className="text-lg text-center max-w-xl mb-6">Explora la app, conoce sus ventajas y descubre cómo Blurry puede ayudarte a conectar de forma segura y divertida.</p>
      <Rating />
      <InfoSection />
      <ContactForm />
    </main>
  );
} 