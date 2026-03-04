'use client';

import { useNotifications } from "@/components/NotificationsContext";
import { Contact, AgendaEvent, User } from "@/types";
import { useRealtime } from '@/context/RealtimeContext';
import { useEffect, useState } from 'react';
import { Calendar as CalendarIcon, Filter, Clock, MapPin, Users, Video, Search, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AgendaPage({ userId }: Readonly<{ userId: number }>) {  
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);       
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);  
  const [events, setEvents] = useState<AgendaEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ title: "", description: "", datetime: "", note: "" });                                                                        
  const [saving, setSaving] = useState(false);
  const [filters, setFilters] = useState({ genero: "", actividad: "", cercania: false });                                                                          
  const [myUser, setMyUser] = useState<User | null>(null);
  const { showToast } = useNotifications();
  const realtimeContext = useRealtime();
  const notifications = realtimeContext?.notifications || [];

  useEffect(() => {
    // Aquí puedes manejar notificaciones en tiempo real si las gestionas en el contexto                                                                          
  }, [notifications]);

  useEffect(() => {
    // Mock for UI presentation
    setTimeout(() => {
      setMyUser({ id: userId, lat: 40.4168, lng: -3.7038 } as any);
      setContacts([
        { id: 1, nombre: "CyberNinja", distance: 5 },
        { id: 2, nombre: "GlitchMaster", distance: 12 },
        { id: 3, nombre: "ZeroCool", distance: 3 }
      ] as any);
      setFilteredContacts([
        { id: 1, nombre: "CyberNinja", distance: 5 },
        { id: 2, nombre: "GlitchMaster", distance: 12 },
        { id: 3, nombre: "ZeroCool", distance: 3 }
      ] as any);
      setEvents([
        { id: 1, title: "Duelo de Código", datetime: new Date(Date.now() + 86400000).toISOString(), contactId: 1, description: "Preparar estrategias para torneo." }
      ] as any);
      setLoading(false);
    }, 800);
  }, [userId]);

  useEffect(() => {
    let result = [...contacts];
    // filter logic here...
    setFilteredContacts(result);
  }, [filters, contacts, myUser]);

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!selectedContact) return showToast("Selecciona sujeto primero.", "error");
    if(!form.title || !form.datetime) return showToast("Completa los campos obligatorios.", "error");
    
    setSaving(true);
    try {
      // Mock save
      setEvents(prev => [...prev, { id: Date.now(), ...form, contactId: selectedContact.id } as any]);
      showToast("Evento agendado exitosamente.", "success");
      setForm({ title: "", description: "", datetime: "", note: "" });
      setSelectedContact(null);
    } catch (error) {
      showToast("Error al sincronizar evento", "error");
    } finally {
      setSaving(false);
    }
  };

  const isUpcoming = (dt: string) => new Date(dt).getTime() > Date.now();

  const getContactName = (cid: string | number) => {
    const c = contacts.find(u => String(u.id) === String(cid));
    return c ? c.nombre : "Desconocido";
  };

  return (
    <main className="min-h-screen flex flex-col py-12 px-4 bg-zinc-950 text-slate-200 relative z-10 w-full animate-fade-in pb-20">
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-900/10 via-zinc-950 to-zinc-950 -z-10" />

      <div className="w-full max-w-6xl mx-auto space-y-8">
        
        {/* Header Panel */}
        <div className="glass-panel p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden group rounded-3xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 rounded-full blur-[100px] -z-10 group-hover:bg-primary-500/20 transition-all duration-700" />
          
          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-white flex items-center gap-3 tracking-tight mb-2">
              <CalendarIcon className="w-8 h-8 sm:w-10 sm:h-10 text-primary-500 animate-pulse-slow" /> 
              AGENDA <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-600 drop-shadow-sm">SINCRONIZADA</span>
            </h1>
            <p className="text-zinc-400 text-sm sm:text-lg font-medium">Programa encuentros virtuales y misiones con tus contactos del Nexus.</p>
          </div>
        </div>

        {loading ? (
           <div className="flex flex-col items-center justify-center py-20 w-full glass-panel rounded-3xl border border-zinc-800/50">
             <div className="w-16 h-16 border-4 border-t-primary-500 border-zinc-800 rounded-full animate-spin shadow-[0_0_15px_rgba(168,85,247,0.5)]"></div>
             <p className="mt-4 text-primary-400 font-black tracking-widest text-sm uppercase">Cargando Cronograma...</p>
           </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6">
            
            {/* Panel Izquierdo: Formularios y Filtros */}
            <div className="w-full lg:w-1/3 flex flex-col gap-6">
              
              <div className="glass-panel p-6 rounded-3xl border border-zinc-800/50 bg-zinc-900/60 backdrop-blur-md">
                <h2 className="font-black text-white mb-4 uppercase tracking-widest text-sm flex items-center gap-2">
                  <Filter className="w-4 h-4 text-primary-400" /> Búsqueda de Contactos
                </h2>
                
                <div className="space-y-4">
                  <label className="flex items-center gap-2 text-sm font-bold text-zinc-400 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 rounded border-zinc-700 text-primary-500 focus:ring-primary-500/50 bg-zinc-800 transition-all cursor-pointer accent-primary-500"
                      checked={filters.cercania} 
                      onChange={e => setFilters({...filters, cercania: e.target.checked})}
                    />
                    <span className="group-hover:text-white transition-colors">Orden por Cercanía Física</span>
                  </label>
                  
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                    <input 
                      type="text" 
                      placeholder="Filtrar por nombre..." 
                      className="w-full pl-9 pr-4 py-2 bg-black/20 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/50 transition-all font-medium"
                      onChange={e => setFilters({...filters, actividad: e.target.value.toLowerCase()})} // usando actividad como query por simplicidad
                    />
                  </div>
                </div>

                <div className="mt-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar space-y-2">
                  {filteredContacts.filter(c => c.nombre.toLowerCase().includes(filters.actividad)).map(c => (
                    <button
                      key={c.id}
                      className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between group ${selectedContact?.id === c.id ? 'bg-primary-500/20 border-primary-500/50 shadow-[0_0_15px_rgba(168,85,247,0.15)]' : 'bg-zinc-800/40 border-zinc-700/50 hover:bg-zinc-800 hover:border-zinc-600'}`}
                      onClick={() => setSelectedContact(c)}
                    >
                      <span className="font-bold text-sm text-white">{c.nombre}</span>
                      <ChevronRight className={`w-4 h-4 transition-transform ${selectedContact?.id === c.id ? 'text-primary-400 translate-x-1' : 'text-zinc-600 group-hover:text-zinc-400'}`} />
                    </button>
                  ))}
                </div>
              </div>

              <AnimatePresence>
                {selectedContact && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-panel p-6 rounded-3xl border border-primary-500/30 bg-primary-900/10 backdrop-blur-md relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/20 rounded-full blur-[50px] -z-10" />
                    
                    <h2 className="font-black text-white mb-1 uppercase tracking-widest text-sm flex items-center gap-2">
                      Agendar Enlace
                    </h2>
                    <p className="text-zinc-400 text-xs mb-5">Sujeto: <span className="text-primary-400 font-bold">{selectedContact.nombre}</span></p>
                    
                    <form onSubmit={handleCreateEvent} className="space-y-4">
                      <input 
                        required 
                        placeholder="Título del evento (ej: Duelo de Neon)" 
                        className="w-full px-4 py-2.5 bg-black/40 border border-zinc-700/80 rounded-xl text-sm text-white focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/50 transition-all font-bold placeholder:font-normal placeholder:text-zinc-600"
                        value={form.title} 
                        onChange={e=>setForm({...form,title:e.target.value})} 
                      />
                      <input 
                        required 
                        type="datetime-local" 
                        className="w-full px-4 py-2.5 bg-black/40 border border-zinc-700/80 rounded-xl text-sm text-white focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/50 transition-all color-scheme-dark"
                        value={form.datetime} 
                        onChange={e=>setForm({...form,datetime:e.target.value})} 
                      />
                      <textarea 
                        placeholder="Detalles de la misión..." 
                        rows={3} 
                        className="w-full px-4 py-2 bg-black/40 border border-zinc-700/80 rounded-xl text-sm text-white focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/50 transition-all resize-none placeholder:text-zinc-600"
                        value={form.description} 
                        onChange={e=>setForm({...form,description:e.target.value})} 
                      />
                      <input 
                        placeholder="Nota privada (Intel oculto)" 
                        className="w-full px-4 py-2 bg-black/40 border border-zinc-700/80 rounded-xl text-sm text-blue-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all placeholder:text-zinc-600"
                        value={form.note} 
                        onChange={e=>setForm({...form,note:e.target.value})} 
                      />
                      <button 
                        disabled={saving} 
                        type="submit" 
                        className="gamified w-full bg-primary-600 hover:bg-primary-500 text-white px-4 py-3 rounded-xl font-bold uppercase tracking-widest text-xs transition-all shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] disabled:opacity-50"
                      >
                        {saving ? "ENCRIPTANDO EVENTO..." : "CONFIRMAR ENLACE"}
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Panel Derecho: Cronograma */}
            <div className="w-full lg:w-2/3 glass-panel p-6 sm:p-8 rounded-3xl border border-zinc-800/50 bg-zinc-900/60 backdrop-blur-md">
              <h2 className="font-black text-white mb-6 uppercase tracking-widest flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary-400" /> EVENTOS PRÓXIMOS
              </h2>
              
              <div className="space-y-4">
                {events.filter(e => isUpcoming(e.datetime)).length === 0 ? (
                  <div className="text-center py-12 bg-black/20 rounded-2xl border border-zinc-800 border-dashed">
                     <CalendarIcon className="w-12 h-12 text-zinc-700 mx-auto mb-3 opacity-50" />
                     <p className="font-bold text-zinc-500">No hay enlaces programados.</p>
                  </div>
                ) : (
                  events.filter(e => isUpcoming(e.datetime)).sort((a,b) => new Date(a.datetime).getTime() - new Date(b.datetime).getTime()).map(e => (
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      key={e.id} 
                      className="group flex flex-col sm:flex-row sm:items-center justify-between p-5 bg-zinc-800/40 border border-zinc-700/50 rounded-2xl hover:bg-zinc-800/80 transition-colors shadow-lg relative overflow-hidden"
                    >
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary-500 shadow-[0_0_10px_rgba(168,85,247,0.8)]" />
                      <div className="pl-2">
                        <h4 className="font-black text-xl text-white tracking-tight mb-1">{e.title}</h4>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-400">
                           <span className="flex items-center gap-1.5 font-bold text-primary-400"><Users className="w-4 h-4" /> {getContactName(e.contactId)}</span>
                           <span className="w-1 h-1 bg-zinc-600 rounded-full"></span>
                           <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {new Date(e.datetime).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}</span>
                        </div>
                        {e.description && <p className="text-sm text-zinc-500 mt-2 font-medium">{e.description}</p>}
                      </div>
                      <div className="mt-4 sm:mt-0">
                         <a 
                           href={`/user/video-call?userId=${e.contactId}`}
                           className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-xl text-xs font-bold uppercase tracking-wider text-white hover:bg-primary-600 hover:border-primary-500 transition-all hover:shadow-neon"
                         >
                           <Video className="w-4 h-4" /> INICIAR ENLACE
                         </a>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              <h2 className="font-black text-zinc-500 mb-6 mt-10 uppercase tracking-widest flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4" /> HISTORIAL DE ENLACES
              </h2>
              
              <div className="space-y-3 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                {events.filter(e => !isUpcoming(e.datetime)).length === 0 ? (
                  <p className="text-zinc-600 font-medium text-sm pl-2">Sin registros pasados.</p>
                ) : (
                  events.filter(e => !isUpcoming(e.datetime)).sort((a,b) => new Date(b.datetime).getTime() - new Date(a.datetime).getTime()).map(e => (
                     <div key={e.id} className="flex justify-between items-center p-3 bg-zinc-900/30 border border-zinc-800 rounded-xl">
                        <div>
                          <p className="font-bold text-zinc-300 text-sm">{e.title}</p>
                          <p className="text-xs text-zinc-500">{new Date(e.datetime).toLocaleDateString()} - <span className="text-zinc-400">{getContactName(e.contactId)}</span></p>
                        </div>
                     </div>
                  ))
                )}
              </div>
            </div>

          </div>
        )}
      </div>
    </main>
  );
}
