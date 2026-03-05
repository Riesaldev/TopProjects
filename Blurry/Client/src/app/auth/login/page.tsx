"use client";

import React from "react";
import { motion } from "framer-motion";
import { Hexagon, ArrowLeft, TerminalSquare } from "lucide-react";
import Link from "next/link";
import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-slate-200 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-900/20 via-zinc-950 to-zinc-950 -z-10" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-500/10 blur-[120px] rounded-full -z-10 animate-pulse-slow" />
      
      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center text-zinc-500 hover:text-primary-400 mb-8 transition-colors text-sm font-bold uppercase tracking-widest">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Abortar Protocolo
          </Link>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center mb-6"
          >
            <div className="bg-primary-500/10 p-4 rounded-3xl border border-primary-500/20 mb-4 shadow-[0_0_30px_rgba(168,85,247,0.2)]">
              <Hexagon className="h-10 w-10 text-primary-400 animate-spin-slow" />
            </div>
            <h1 className="text-4xl font-black bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent drop-shadow-sm uppercase tracking-tight">
              SISTEMA BLURRY
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="text-xl font-bold text-white mb-2 uppercase tracking-widest flex items-center justify-center gap-2">
              <TerminalSquare className="w-5 h-5 text-primary-500" /> Autenticación
            </h2>
            <p className="text-zinc-400 text-sm font-medium">
              Ingresa tus credenciales para acceder al Nexus.
            </p>
          </motion.div>
        </div>

        {/* Login Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass-panel rounded-3xl p-8 border border-zinc-800/60 bg-zinc-900/60 backdrop-blur-md relative overflow-hidden" 
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary-500 to-transparent opacity-50" />
          
          <LoginForm />

          <div className="mt-8 pt-6 border-t border-zinc-800/50 text-center">
            <p className="text-zinc-500 text-sm font-medium">
              ¿No tienes autorización?{" "}
              <Link href="/auth/register" className="text-primary-400 hover:text-primary-300 font-bold uppercase tracking-wider transition-colors ml-1">
                Solicitar Acceso
              </Link>
            </p>
          </div>
        </motion.div>

        {/* Footer */}
        <div className="text-center mt-10 text-xs text-zinc-600 font-medium">
          Al conectarte, acatas nuestros{" "}
          <a href="/legal/terms" className="text-primary-500/70 hover:text-primary-400 underline decoration-zinc-800 underline-offset-4">Protocolos</a>
          {" "}y{" "}
          <a href="/legal/privacy" className="text-primary-500/70 hover:text-primary-400 underline decoration-zinc-800 underline-offset-4">Privacidad</a>
        </div>
      </div>
    </main>
  );
}
