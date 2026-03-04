import fs from 'fs';
const landingFile = 'c:/Users/Ricardoea/OneDrive/Escritorio/TopProjects/Blurry/Client/src/app/page.tsx';
const helpFile = 'c:/Users/Ricardoea/OneDrive/Escritorio/TopProjects/Blurry/Client/src/app/help/page.tsx';

const newLandingContent = `"use client";

import Link from "next/link";
import { motion } from 'framer-motion';
import { Hexagon, Video, Shield, Zap, Target, Star, ChevronRight } from 'lucide-react';

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

        <div className="flex-1 w-full max-w-md lg:max-w-full relative">
          <motion.div 
             initial={{ opacity: 0, scale: 0.9 }} 
             animate={{ opacity: 1, scale: 1 }} 
             transition={{ duration: 0.7 }}
             className="relative aspect-square glass-panel rounded-[3rem] border border-primary-500/20 bg-gradient-to-br from-zinc-900/80 to-zinc-950/80 p-8 shadow-[0_0_50px_rgba(168,85,247,0.1)] flex items-center justify-center overflow-hidden"
          >
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
             <div className="relative z-10 grid grid-cols-2 gap-4 w-full">
                <div className="bg-primary-500/10 border border-primary-500/30 p-6 rounded-3xl flex flex-col items-center gap-3 animate-float shadow-neon">
                   <Video className="w-10 h-10 text-primary-400" />
                   <span className="text-xs font-black text-primary-300 uppercase tracking-widest">Video 4K</span>
                </div>
                <div className="bg-zinc-800/50 border border-zinc-700/50 p-6 rounded-3xl flex flex-col items-center gap-3 animate-float delay-100 mt-8">
                   <Shield className="w-10 h-10 text-emerald-400" />
                   <span className="text-xs font-black text-emerald-300 uppercase tracking-widest">Seguro</span>
                </div>
                <div className="bg-zinc-800/50 border border-zinc-700/50 p-6 rounded-3xl flex flex-col items-center gap-3 animate-float delay-200 -mt-8">
                   <Target className="w-10 h-10 text-accent-400" />
                   <span className="text-xs font-black text-accent-300 uppercase tracking-widest">IA Match</span>
                </div>
                <div className="bg-primary-500/10 border border-primary-500/30 p-6 rounded-3xl flex flex-col items-center gap-3 animate-float delay-300 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                   <Star className="w-10 h-10 text-yellow-400" />
                   <span className="text-xs font-black text-yellow-300 uppercase tracking-widest">Misiones</span>
                </div>
             </div>
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
`;

const newHelpContent = `"use client";

import Link from "next/link";
import { ArrowLeft, Book, MessageCircle, ShieldAlert, LifeBuoy, FileText, Hexagon, Search } from "lucide-react";
import { motion } from "framer-motion";

export default function HelpPage() {
  const manuals = [
    { title: "Protocolos de Enlace", icon: <Book className="w-6 h-6 text-primary-400" />, desc: "Cómo funcionan los matches y reglas de interacción." },
    { title: "Seguridad y Ciberdefensa", icon: <ShieldAlert className="w-6 h-6 text-emerald-400" />, desc: "Filtros de privacidad y reportes de anomalías." },
    { title: "Central de Pagos", icon: <FileText className="w-6 h-6 text-zinc-400" />, desc: "Facturación de TKN y acceso a sistemas premium." },
  ];

  return (
    <main className="min-h-screen bg-zinc-950 text-slate-200 relative overflow-hidden flex flex-col items-center">
      {/* Background FX */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-blue-900/10 via-zinc-950 to-zinc-950 -z-10" />
      <div className="absolute top-20 left-10 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] -z-10 animate-pulse-slow" />
      
      <div className="w-full max-w-4xl space-y-8 z-10 py-12 px-4">
        
        {/* Header Navigation */}
        <Link href="/" className="inline-flex items-center text-zinc-500 hover:text-blue-400 mb-8 transition-colors text-sm font-bold uppercase tracking-widest">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver al Hub
        </Link>

        {/* Hero Help */}
        <div className="glass-panel p-8 md:p-12 text-center relative overflow-hidden group rounded-3xl border border-zinc-800/60 mb-10">
          <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          
          <LifeBuoy className="w-16 h-16 text-blue-500 mx-auto mb-6 drop-shadow-[0_0_15px_rgba(59,130,246,0.3)] animate-float" />
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight uppercase mb-4">
            CENTRO DE <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 drop-shadow-sm">SOPORTE</span>
          </h1>
          <p className="text-zinc-400 text-base md:text-lg font-medium max-w-2xl mx-auto mb-8">Base de datos de conocimiento y asistencia operativa del Nexus. ¿Qué necesitas investigar hoy?</p>
          
          <div className="relative max-w-lg mx-auto">
             <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
             <input type="text" placeholder="Buscar en los archivos..." className="w-full pl-12 pr-4 py-4 bg-black/40 border border-zinc-700/80 rounded-2xl text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all font-medium text-lg placeholder:text-zinc-600 shadow-inner" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {manuals.map((m, i) => (
             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} key={i} className="glass-panel p-6 rounded-3xl border border-zinc-800/50 bg-zinc-900/40 hover:bg-zinc-800/60 transition-all cursor-pointer group">
               <div className="bg-black/50 w-14 h-14 rounded-2xl flex items-center justify-center border border-zinc-800 mb-6 group-hover:border-blue-500/50 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] transition-all">
                  {m.icon}
               </div>
               <h3 className="text-lg font-black text-white mb-2 uppercase tracking-wide">{m.title}</h3>
               <p className="text-sm text-zinc-500 font-medium">{m.desc}</p>
             </motion.div>
           ))}
        </div>

        <div className="mt-12 p-8 bg-zinc-900/80 border border-zinc-800 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-md">
           <div>
              <h2 className="text-xl font-black text-white uppercase tracking-widest flex items-center gap-2 mb-2"><MessageCircle className="w-5 h-5 text-blue-400" /> Conexión Directa</h2>
              <p className="text-zinc-400 text-sm font-medium">¿Fallo en el sistema que no puedes resolver? Contacta a nuestros ingenieros.</p>
           </div>
           <button className="gamified bg-zinc-800 border-2 border-zinc-700 hover:border-blue-500 text-white font-bold uppercase tracking-widest text-sm px-6 py-3 rounded-xl transition-all shadow-lg whitespace-nowrap">
              Invocación de Admin
           </button>
        </div>

      </div>
    </main>
  );
}
`;

if(fs.existsSync(landingFile)) fs.writeFileSync(landingFile, newLandingContent);
if(fs.existsSync(helpFile)) fs.writeFileSync(helpFile, newHelpContent);

