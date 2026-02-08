"use client";

import React from "react";
import { motion } from "framer-motion";
import { Video, ArrowLeft } from "lucide-react";
import Link from "next/link";
import LoginForm from "@/components/LoginForm";
import { AuthProvider } from '@/context/AuthContext';

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6 transition-colors">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Volver al inicio
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center mb-6"
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
              Bienvenido de Vuelta
            </h2>
            <p className="text-gray-600">
              Inicia sesión para continuar tu aventura
            </p>
          </motion.div>
        </div>

        {/* Login Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
        >
          <AuthProvider>
            <LoginForm />
          </AuthProvider>
          
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              ¿No tienes cuenta?{" "}
              <Link href="/auth/register" className="text-primary-600 hover:text-primary-700 font-semibold transition-colors">
                Regístrate aquí
              </Link>
            </p>
          </div>
        </motion.div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500">
          Al continuar, aceptas nuestros{" "}
          <a href="#" className="text-primary-600 hover:underline">
            Términos de Servicio
          </a>
          {" "}y{" "}
          <a href="#" className="text-primary-600 hover:underline">
            Política de Privacidad
          </a>
        </div>
      </div>
    </main>
  );
}