"use client";

import Link from "next/link";
import { motion } from 'framer-motion';
import { Hexagon, Video, Shield, Zap, Target, Star, ChevronRight, User } from 'lucide-react';

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-slate-200 font-sans overflow-hidden">
      {/* Background FX */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary-900/10 via-zinc-950 to-zinc-950 -z-10" />
      <div className="absolute top-20 left-1/4 w-[600px] h-[600px] bg-primary-600/10 rounded-full blur-[150px] -z-10 animate-pulse-slow" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-accent-500/10 rounded-full blur-[120px] -z-10" />

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 glass-panel border-b border-zinc-800/80 bg-zinc-950/60 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-3">
            <div className="bg-primary-500/10 p-2 rounded-xl border border-primary-500/30">
              <Hexagon className="h-6 w-6 text-primary-500 animate-spin-slow" />
            </div>
            <span className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-600 tracking-tight uppercase">
              BLURRY<span className="text-white">NEXUS</span>
            </span>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-4">
            <Link href="/auth/login" className="text-sm font-bold text-zinc-400 hover:text-white uppercase tracking-wider transition-colors hidden sm:block">
              Enlace de Ingreso
            </Link>
            <Link href="/auth/register" className="gamified bg-primary-600 hover:bg-primary-500 text-white px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest shadow-neon transition-all hover:-translate-y-1">
              Despertar
            </Link>
          </motion.div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-4 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 z-10">
        <div className="flex-1 text-center lg:text-left">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary-500/30 bg-primary-500/10 mb-6 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
              <Zap className="w-4 h-4 text-primary-400" />
              <span className="text-xs font-bold text-primary-300 uppercase tracking-widest">Protocolo Activo: Enlace Seguro</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight tracking-tighter text-white">
              CONEXIONES EN EL <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-primary-500 to-accent-500 drop-shadow-sm">ABISMO DIGITAL</span>
            </h1>
            
            <p className="text-lg md:text-xl text-zinc-400 font-medium mb-10 max-w-2xl mx-auto lg:mx-0">
              Bienvenido al sistema cerrado de citas por video. Matchmaking con inteligencia artificial, perfiles cifrados y un ecosistema gamificado para asegurar conexiones auténticas en el mundo moderno.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/auth/register" className="gamified inline-flex items-center justify-center gap-2 bg-white text-black hover:bg-zinc-200 px-8 py-4 rounded-2xl font-black uppercase tracking-widest transition-all">
                Iniciar Secuencia <ChevronRight className="w-5 h-5" />
              </Link>
              <Link href="/help" className="inline-flex items-center justify-center gap-2 bg-zinc-900 border-2 border-zinc-800 text-white hover:border-zinc-600 px-8 py-4 rounded-2xl font-bold uppercase tracking-widest transition-all">
                Manual de Red
              </Link>
            </div>
          </motion.div>
        </div>

        <div className="flex-1 w-full max-w-md lg:max-w-full relative flex items-center justify-center">
          <div className="absolute inset-0 bg-primary-500/20 rounded-full blur-[100px] animate-pulse-slow -z-10" />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="relative w-full max-w-sm aspect-[3/4] sm:aspect-square lg:aspect-[4/5] rounded-[3rem] border border-zinc-800 bg-zinc-900 overflow-visible lg:overflow-hidden shadow-[0_0_50px_rgba(168,85,247,0.2)] group cursor-pointer"
          >
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Sujeto anonimizado"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-zinc-950/20 backdrop-blur-[20px] group-hover:backdrop-blur-[4px] group-hover:bg-transparent transition-all duration-1000 z-10" />

            <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none opacity-100 group-hover:opacity-0 transition-opacity duration-500">
              <div className="w-28 h-28 rounded-full border border-primary-500/50 border-dashed animate-spin-slow mb-6 flex items-center justify-center relative">
                <div className="w-20 h-20 rounded-full border-2 border-accent-500/30 border-t-accent-500 animate-[spin_2s_linear_infinite] flex items-center justify-center">
                  <Target className="w-6 h-6 text-primary-400" />
                </div>
              </div>

              <div className="glass-panel px-6 py-3 rounded-full border border-zinc-800/80 bg-zinc-900/80 backdrop-blur-xl flex items-center gap-3 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                <span className="w-2.5 h-2.5 rounded-full bg-primary-500 animate-pulse shadow-neon" />
                <span className="text-white text-xs font-black uppercase tracking-widest">Enlazando Perfil...</span>
              </div>
            </div>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none w-[80%]">
              <div className="glass-panel px-6 py-4 rounded-3xl border border-zinc-700/50 bg-black/60 backdrop-blur-md flex items-center justify-between shadow-2xl">
                <div>
                  <h3 className="text-white font-black uppercase tracking-wider text-sm flex items-center gap-2">
                    <User className="w-4 h-4 text-primary-400" /> Sujeto Encontrado
                  </h3>
                  <p className="text-zinc-400 text-xs font-bold mt-1">Conexión de alta afinidad</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-emerald-400" />
                </div>
              </div>
            </div>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-12 left-[-2rem] z-30 glass-panel px-4 py-2 rounded-2xl border border-zinc-700/50 bg-zinc-900/80 backdrop-blur-xl flex items-center gap-2 shadow-lg hidden sm:flex"
            >
              <Shield className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold text-zinc-300">Sección Cifrada</span>
            </motion.div>

            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-24 right-[-2rem] z-30 glass-panel px-4 py-2 rounded-2xl border border-primary-500/30 bg-primary-900/40 backdrop-blur-xl flex items-center gap-2 shadow-neon hidden sm:flex"
            >
              <Zap className="w-4 h-4 text-primary-400" />
              <span className="text-xs font-bold text-white">Match 98%</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Trust & Stats */}
      <section className="py-20 border-t border-zinc-800/50 bg-black/40">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
           {[
             { num: "99.9%", text: "Uptime" },
             { num: "E2E", text: "Encriptación" },
             { num: "24/7", text: "Monitoreo" },
             { num: "IA", text: "Matchmaking" }
           ].map((stat, i) => (
             <div key={i} className="flex flex-col gap-2">
               <span className="text-4xl md:text-5xl font-black text-white">{stat.num}</span>
               <span className="text-zinc-500 font-bold uppercase tracking-widest text-xs md:text-sm">{stat.text}</span>
             </div>
           ))}
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-10 text-center border-t border-zinc-800/80 text-zinc-600 text-sm font-medium">
        <p>BLURRY NEXUS © {new Date().getFullYear()} - Sistema Activo. Todos los derechos reservados.</p>
        <div className="mt-4 flex justify-center gap-6">
          <Link href="/legal/terms" className="hover:text-primary-400 transition-colors">Protocolos de Uso</Link>
          <Link href="/legal/privacy" className="hover:text-primary-400 transition-colors">Privacidad</Link>
          <Link href="/help" className="hover:text-primary-400 transition-colors">Soporte</Link>
        </div>
      </footer>
    </main>
  );
}
