"use client";

import { useEffect, useState } from "react";
import { useRealtime } from "@/context/RealtimeContext";
import { useUserData } from "@/hooks/useUserData";
import { useForm } from "@/hooks/useForm";
import { useNotifications } from "@/hooks/useNotifications";
import {
  User,
  Bell,
  Lock,
  Activity,
  ShieldAlert,
  Sparkles,
  AlertOctagon,
  PauseCircle,
  Trash2,
  Settings as SettingsIcon,
  Eye,
  Globe,
  Monitor,
  Smartphone
} from "lucide-react";
import { motion } from "framer-motion";

export default function Settings() {
  const { userData, updateProfile } = useUserData();
  const { values, handleChange, setValues } = useForm({
    username: "",
    bio: "",
    notificationsEnabled: true,
    twoFactorAuth: false,
    profilePrivacy: "public",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showNotification } = useNotifications();

  // Local state for UI only (not persisted in mock)
  const [size, setSize] = useState("base");
  const [lang, setLang] = useState("es");
  
  useEffect(() => {
    if (userData) {
      setValues({
        username: userData.username || "",
        bio: userData.bio || "",
        notificationsEnabled: userData.settings?.notificationsEnabled ?? true,
        twoFactorAuth: userData.settings?.twoFactorAuth ?? false,
        profilePrivacy: userData.settings?.profilePrivacy || "public",
      });
    }
  }, [userData, setValues]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await updateProfile(values);
      showNotification("Configuración de sistema actualizada", "success");
    } catch (error) {
      showNotification("Error en sincronización", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (confirm("¿INICIAR PROTOCOLO DE AUTODESTRUCCIÓN? Esta acción es irreversible.")) {
      showNotification("Borrando huella digital...", "info");
      // logica de borrado
    }
  };

  const handleSuspendAccount = async () => {
    if (confirm("¿Ingresar en modo criogenia (pausar cuenta)?")) {
      showNotification("Perfil en éstasis. Despierta pronto.", "info");
    }
  };

  return (
    <main className="min-h-screen py-12 px-4 bg-zinc-950 text-slate-200 relative overflow-hidden flex flex-col items-center pb-32">
      {/* Background FX */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-900/10 via-zinc-950 to-zinc-950 -z-10" />

      <div className="w-full max-w-4xl space-y-8 z-10">
        
        {/* Header */}
        <div className="glass-panel p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden group rounded-3xl border border-zinc-800/60">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 rounded-full blur-[100px] -z-10 group-hover:bg-primary-500/20 transition-all duration-700" />
          <div className="flex items-center gap-4 w-full">
            <div className="p-4 bg-primary-500/10 rounded-2xl border border-primary-500/20 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
               <SettingsIcon className="w-10 h-10 text-primary-500 animate-spin-slow" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-white tracking-tight uppercase flex items-center gap-3">
                PANEL DE <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-600 drop-shadow-sm">CONFIGURACIÓN</span>
              </h1>
              <p className="text-zinc-400 text-sm font-medium mt-1">Ajusta los parámetros del sistema y preferencias de usuario.</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* PERFIL */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-panel p-6 sm:p-8 rounded-3xl border border-zinc-800/50 bg-zinc-900/60 backdrop-blur-md relative overflow-hidden">
             <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary-500 opacity-50" />
             <h2 className="text-xl font-black mb-6 text-white uppercase tracking-widest flex items-center gap-2">
                <User className="text-primary-400 w-5 h-5" /> Identidad Digital
             </h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="font-bold text-zinc-400 text-xs uppercase tracking-wider">Alias (Username)</label>
                  <input
                    type="text"
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-black/40 border border-zinc-700/80 rounded-xl text-sm text-white focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/50 transition-all"
                  />
                </div>
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="font-bold text-zinc-400 text-xs uppercase tracking-wider">Biografía del Perfil</label>
                  <textarea
                    name="bio"
                    value={values.bio}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-3 bg-black/40 border border-zinc-700/80 rounded-xl text-sm text-white focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/50 transition-all resize-none"
                    placeholder="Escribe sobre ti..."
                  />
                </div>
             </div>
          </motion.div>

          {/* PRIVACIDAD Y SEGURIDAD */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-panel p-6 sm:p-8 rounded-3xl border border-zinc-800/50 bg-zinc-900/60 backdrop-blur-md relative overflow-hidden">
             <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 opacity-50" />
             <h2 className="text-xl font-black mb-6 text-white uppercase tracking-widest flex items-center gap-2">
                <ShieldAlert className="text-blue-400 w-5 h-5" /> Seguridad y Acceso
             </h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <label className="flex items-center justify-between p-4 bg-zinc-800/40 border border-zinc-700/50 rounded-2xl cursor-pointer hover:bg-zinc-800/60 transition-colors group">
                  <div className="flex flex-col gap-1">
                    <span className="font-bold text-white text-sm flex items-center gap-2"><Lock className="w-4 h-4 text-zinc-400 group-hover:text-blue-400 transition-colors" /> Autenticación 2FA</span>
                    <span className="text-xs text-zinc-500">Aumenta la seguridad del login.</span>
                  </div>
                  <div className="relative inline-flex items-center">
                    <input type="checkbox" name="twoFactorAuth" checked={values.twoFactorAuth} onChange={(e) => setValues({ ...values, twoFactorAuth: e.target.checked })} className="sr-only peer" />
                    <div className="w-11 h-6 bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </div>
                </label>

                <div className="flex flex-col gap-2">
                  <label className="font-bold text-zinc-400 text-xs uppercase tracking-wider flex items-center gap-2">
                     <Eye className="w-4 h-4" /> Visibilidad del Perfil
                  </label>
                  <select
                    name="profilePrivacy"
                    value={values.profilePrivacy}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-black/40 border border-zinc-700/80 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all font-bold"
                  >
                    <option value="public" className="bg-zinc-900">Público (Todos en el Nexus)</option>
                    <option value="friends" className="bg-zinc-900">Privado (Solo Contactos)</option>
                  </select>
                </div>

             </div>
          </motion.div>

          {/* PREFERENCIAS DEL SISTEMA */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-panel p-6 sm:p-8 rounded-3xl border border-zinc-800/50 bg-zinc-900/60 backdrop-blur-md relative overflow-hidden">
             <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500 opacity-50" />
             <h2 className="text-xl font-black mb-6 text-white uppercase tracking-widest flex items-center gap-2">
                <Monitor className="text-emerald-400 w-5 h-5" /> Entorno
             </h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <label className="flex items-center justify-between p-4 bg-zinc-800/40 border border-zinc-700/50 rounded-2xl cursor-pointer hover:bg-zinc-800/60 transition-colors group">
                  <div className="flex flex-col gap-1">
                    <span className="font-bold text-white text-sm flex items-center gap-2"><Bell className="w-4 h-4 text-zinc-400 group-hover:text-emerald-400 transition-colors" /> Alertas Push</span>
                    <span className="text-xs text-zinc-500">Recibir notificaciones del sistema.</span>
                  </div>
                  <div className="relative inline-flex items-center">
                    <input type="checkbox" name="notificationsEnabled" checked={values.notificationsEnabled} onChange={(e) => setValues({ ...values, notificationsEnabled: e.target.checked })} className="sr-only peer" />
                    <div className="w-11 h-6 bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                  </div>
                </label>

                <div className="flex flex-col gap-2">
                  <label className="font-bold text-zinc-400 text-xs uppercase tracking-wider flex items-center gap-2">
                     <Globe className="w-4 h-4" /> Lenguaje
                  </label>
                  <select
                    value={lang}
                    onChange={(e) => setLang(e.target.value)}
                    className="w-full px-4 py-3 bg-black/40 border border-zinc-700/80 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 transition-all font-bold"
                  >
                    <option value="es" className="bg-zinc-900">������ Español</option>
                    <option value="en" className="bg-zinc-900">������ English</option>
                  </select>
                </div>

             </div>
          </motion.div>

          {/* DANGER ZONE */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-red-950/10 border border-red-900/30 rounded-3xl p-6 sm:p-8 relative overflow-hidden backdrop-blur-md">
             <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-[50px] -z-10" />
             <h2 className="text-xl font-black mb-6 text-red-500 flex items-center gap-2 uppercase tracking-widest">
                <AlertOctagon className="w-5 h-5" /> ZONA DE PELIGRO
             </h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               
               <div className="flex flex-col justify-between bg-black/40 p-5 rounded-2xl border border-red-900/20">
                 <div className="mb-4">
                   <span className="font-black text-white block mb-1 uppercase tracking-wider text-sm">Criogenia de Cuenta</span>
                   <span className="text-xs text-zinc-500 font-medium">Oculta tu perfil temporalmente de todos los radares.</span>
                 </div>
                 <button
                   type="button"
                   onClick={handleSuspendAccount}
                   className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-amber-600/50 text-amber-500 hover:bg-amber-600/20 rounded-xl text-xs font-bold uppercase transition-all"
                 >
                   <PauseCircle className="w-4 h-4" /> Suspender Operaciones
                 </button>
               </div>

               <div className="flex flex-col justify-between bg-black/40 p-5 rounded-2xl border border-red-900/20">
                 <div className="mb-4">
                   <span className="font-black text-red-500 block mb-1 uppercase tracking-wider text-sm">Protocolo Omega</span>
                   <span className="text-xs text-zinc-500 font-medium">Destrucción total de datos, historial y estadísticas.</span>
                 </div>
                 <button
                   type="button"
                   onClick={handleDeleteAccount}
                   className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-600/20 border border-red-600/50 text-red-500 hover:bg-red-600 hover:text-white rounded-xl text-xs font-bold uppercase transition-all"
                 >
                   <Trash2 className="w-4 h-4" /> Purgar Datos
                 </button>
               </div>

             </div>
          </motion.div>

          {/* FLOATING ACTION BAR */}
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-lg z-40 bg-zinc-900/80 backdrop-blur-xl p-3 rounded-2xl border border-zinc-800 shadow-[0_0_30px_rgba(0,0,0,0.5)] flex justify-end animate-fade-in">                      
            <button
              type="submit"
              disabled={isSubmitting}
              className="gamified w-full bg-primary-600 hover:bg-primary-500 text-white px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-sm transition-all shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              {isSubmitting ? "CALIBRANDO SISTEMA..." : "GUARDAR PREFERENCIAS"}      
            </button>
          </div>
          
        </form>
      </div>
    </main>
  );
}
