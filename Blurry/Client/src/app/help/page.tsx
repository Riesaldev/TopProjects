"use client";

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
