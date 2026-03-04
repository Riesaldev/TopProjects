"use client";

import React from "react";
import { motion } from "framer-motion";
import { Hexagon, ArrowLeft, Fingerprint } from "lucide-react";
import Link from "next/link";
import RegisterForm from "@/components/RegisterForm";
import { AuthProvider } from '@/context/AuthContext';

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-slate-200 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-zinc-950 to-zinc-950 -z-10" />
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full -z-10 animate-pulse-slow" />
      
      <div className="w-full max-w-md relative z-10 py-10">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center text-zinc-500 hover:text-blue-400 mb-8 transition-colors text-sm font-bold uppercase tracking-widest">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Cancelar Enrolamiento
          </Link>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center mb-6"
          >
            <div className="bg-blue-500/10 p-4 rounded-3xl border border-blue-500/20 mb-4 shadow-[0_0_30px_rgba(59,130,246,0.15)]">
              <Hexagon className="h-10 w-10 text-blue-400 animate-spin-slow" />
            </div>
            <h1 className="text-4xl font-black bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent drop-shadow-sm uppercase tracking-tight">
              CREAR IDENTIDAD
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="text-xl font-bold text-white mb-2 uppercase tracking-widest flex items-center justify-center gap-2">
              <Fingerprint className="w-5 h-5 text-blue-500" /> Registro en el Nexus
            </h2>
            <p className="text-zinc-400 text-sm font-medium">
              Genera tu perfil para unirte a la red global.
            </p>
          </motion.div>
        </div>

        {/* Register Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass-panel rounded-3xl p-8 border border-zinc-800/60 bg-zinc-900/60 backdrop-blur-md relative overflow-hidden" 
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50" />
          
          <AuthProvider>
            <RegisterForm />
          </AuthProvider>

          <div className="mt-8 pt-6 border-t border-zinc-800/50 text-center">
            <p className="text-zinc-500 text-sm font-medium">
              ¿Ya estás en el sistema?{" "}
              <Link href="/auth/login" className="text-blue-400 hover:text-blue-300 font-bold uppercase tracking-wider transition-colors ml-1">
                Autenticarse
              </Link>
            </p>
          </div>
        </motion.div>
        
        {/* Footer */}
        <div className="text-center mt-10 text-xs text-zinc-600 font-medium">
          Al enrolarte, confirmas tu adherencia a las{" "}
          <a href="/legal/terms" className="text-blue-500/70 hover:text-blue-400 underline decoration-zinc-800 underline-offset-4">Directivas del Servidor</a>
        </div>
      </div>
    </main>
  );
}
