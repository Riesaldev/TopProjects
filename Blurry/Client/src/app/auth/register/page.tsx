"use client";

import React from "react";
import { motion } from "framer-motion";
import { Video, ArrowLeft, Heart, Shield, Users } from "lucide-react";
import Link from "next/link";
import RegisterForm from "@/components/RegisterForm";

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        
        {/* Left side - Registration Form */}
        <div className="order-2 lg:order-1">
          {/* Header */}
          <div className="text-center lg:text-left mb-8">
            <Link href="/" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6 transition-colors">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Volver al inicio
            </Link>
            
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-center lg:justify-start mb-6"
            >
              <div className="bg-gradient-to-r from-primary-600 to-primary-700 p-3 rounded-xl">
                <Video className="h-8 w-8 text-white" />
              </div>
              <h1 className="ml-3 text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
                Blurry
              </h1>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Únete a Blurry
              </h2>
              <p className="text-gray-600">
                Comienza tu aventura de conexiones auténticas
              </p>
            </motion.div>
          </div>

          {/* Registration Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
          >
            <RegisterForm />
            
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                ¿Ya tienes cuenta?{" "}
                <Link href="/auth/login" className="text-primary-600 hover:text-primary-700 font-semibold transition-colors">
                  Inicia sesión aquí
                </Link>
              </p>
            </div>
          </motion.div>

          {/* Footer */}
          <div className="text-center lg:text-left mt-8 text-sm text-gray-500">
            Al registrarte, aceptas nuestros{" "}
            <a href="#" className="text-primary-600 hover:underline">
              Términos de Servicio
            </a>
            {" "}y{" "}
            <a href="#" className="text-primary-600 hover:underline">
              Política de Privacidad
            </a>
          </div>
        </div>

        {/* Right side - Benefits */}
        <div className="order-1 lg:order-2">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-8">
              ¿Por qué elegir Blurry?
            </h3>
            
            {[
              {
                icon: Heart,
                title: "Conexiones Auténticas",
                description: "Conoce a personas por su personalidad, no solo por su apariencia"
              },
              {
                icon: Shield,
                title: "Privacidad Total",
                description: "Tus datos están seguros con nuestro sistema de protección avanzado"
              },
              {
                icon: Users,
                title: "Comunidad Activa",
                description: "Miles de usuarios verificados esperando conectar contigo"
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="flex items-start space-x-4"
              >
                <div className="bg-gradient-to-r from-primary-600 to-primary-700 p-3 rounded-xl">
                  <benefit.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">{benefit.title}</h4>
                  <p className="text-gray-600 text-sm">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </main>
  );
} 