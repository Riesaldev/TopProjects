"use client";

import React, { useEffect, useState, useMemo } from "react";
import ViewState from "@/components/ViewState";
import { useAuth } from "@/components/AuthContext";
import Button from "@/components/Button";
import { Calendar as CalendarIcon, Video, MessageSquare, Trash2, UserPlus, Clock, Plus, UserCircle } from "lucide-react";
import { useRouter } from "next/navigation";

// Models
interface UserContact {
  link_id: number;
  id: number;
  display_name: string;
  imagen_perfil?: string;
  bio?: string;
  location?: string;
  age?: number;
  gender?: string;
}

interface AgendaEvent {
  id: string;
  title: string;
  datetime: string;
  note?: string;
  contact_id?: number;
}

interface UserProfile {
  id: number;
  display_name: string;
  imagen_perfil?: string;
}

export default function UserAgendaPage() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<"calendar" | "contacts">("calendar");

  // State
  const [contacts, setContacts] = useState<UserContact[]>([]);
  const [events, setEvents] = useState<AgendaEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [discoverUsers, setDiscoverUsers] = useState<UserProfile[]>([]);
  
  // Calendar State
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Modals
  const [isAddContactModalOpen, setIsAddContactModalOpen] = useState(false);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [selectedContactProfile, setSelectedContactProfile] = useState<UserContact | null>(null);
  const [selectedDateForEvent, setSelectedDateForEvent] = useState<string>("");
  const [newEvent, setNewEvent] = useState({ title: "", note: "", time: "12:00", contact_id: "" });

  const getAuthHeaders = (): Record<string, string> => {
    const token = typeof window !== "undefined" ? localStorage.getItem("jwt-token") : null;
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const hdrs = { "Content-Type": "application/json", ...getAuthHeaders() };
      
      const [contRes, evRes, usersRes] = await Promise.all([
        fetch("/api/contacts", { headers: hdrs }),
        fetch(`/api/agenda?userId=${user?.id}`, { headers: hdrs }),
        fetch("/api/users", { headers: hdrs })
      ]);
      
      if (contRes.ok) setContacts(await contRes.json());
      if (evRes.ok) setEvents(await evRes.json());
      if (usersRes.ok) {
        const allUsers = await usersRes.json();
        // Filter out myself and people already in contacts
        setDiscoverUsers(allUsers.filter((u: { id: number; role?: string; display_name: string }) => 
          u.id !== user?.id && u.role !== 'admin'
        ));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading && user) fetchData();
  }, [user, authLoading]);

  // Actions
  const handleAddContact = async (contactId: number) => {
    try {
      const res = await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify({ contact_id: contactId })
      });
      if (res.ok) {
        setIsAddContactModalOpen(false);
        fetchData();
      } else {
        alert("Ya está en tus contactos o ocurrió un error");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleRemoveContact = async (contactId: number) => {
    if (!confirm("¿Eliminar este contacto de tu agenda?")) return;
    try {
      const res = await fetch(`/api/contacts/${contactId}`, {
        method: "DELETE",
        headers: getAuthHeaders()
      });
      if (res.ok) fetchData();
    } catch (e) {
      console.error(e);
    }
  };

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const isoDate = new Date(`${selectedDateForEvent}T${newEvent.time}:00`).toISOString();
      const payload: Record<string, string | number | undefined> = {
        title: newEvent.title,
        note: newEvent.note,
        datetime: isoDate,
        user_id: user?.id
      };
      if (newEvent.contact_id) payload.contact_id = Number(newEvent.contact_id);

      const res = await fetch("/api/agenda", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setIsEventModalOpen(false);
        setNewEvent({ title: "", note: "", time: "12:00", contact_id: "" });
        fetchData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Calendar Logic
  const daysInMonth = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const date = new Date(year, month, 1);
    const days = [];
    // Rewind to Monday
    while (date.getDay() !== 1) {
      date.setDate(date.getDate() - 1);
      days.unshift(new Date(date));
    }
    // Forward to next month
    date.setDate(date.getDate() + days.length);
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    // Fill to end of week
    while (date.getDay() !== 1) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  }, [currentDate]);

  const changeMonth = (offset: number) => {
    const nd = new Date(currentDate);
    nd.setMonth(nd.getMonth() + offset);
    setCurrentDate(nd);
  };

  const openNewEventModal = (d: Date) => {
    // format YYYY-MM-DD
    const pad = (n: number) => n.toString().padStart(2, '0');
    const dStr = `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
    setSelectedDateForEvent(dStr);
    setIsEventModalOpen(true);
  };

  const getEventsForDate = (d: Date) => {
    return events.filter(e => {
      const ed = new Date(e.datetime);
      return ed.getFullYear() === d.getFullYear() && ed.getMonth() === d.getMonth() && ed.getDate() === d.getDate();
    });
  };

  if (authLoading || loading) {
    return <div className="min-h-screen pt-20"><ViewState variant="loading" title="Cargando Agenda" /></div>;
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-slate-200 px-4 py-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-panel p-6 rounded-3xl">
          <div>
            <h1 className="text-3xl font-black text-white flex items-center gap-3">
              <CalendarIcon className="w-8 h-8 text-primary-400" /> Agenda y Contactos
            </h1>
            <p className="text-zinc-400">Planifica tus citas y gestiona las personas que te interesan.</p>
          </div>
          <div className="flex bg-zinc-900 rounded-xl p-1 shrink-0">
            <button 
              onClick={() => setActiveTab("calendar")} 
              className={`px-4 py-2 font-bold text-sm rounded-lg transition-colors ${activeTab === 'calendar' ? 'bg-primary-600 text-white' : 'text-zinc-400 hover:text-white'}`}>
              Almanaque Mensual
            </button>
            <button 
              onClick={() => setActiveTab("contacts")} 
              className={`px-4 py-2 font-bold text-sm rounded-lg transition-colors ${activeTab === 'contacts' ? 'bg-primary-600 text-white' : 'text-zinc-400 hover:text-white'}`}>
              Mis Contactos ({contacts.length})
            </button>
          </div>
        </header>

        {activeTab === "calendar" && (
          <section className="glass-panel rounded-3xl p-6 border border-zinc-800/60 overflow-hidden">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold uppercase tracking-widest text-zinc-100">
                {currentDate.toLocaleString('es-ES', { month: 'long', year: 'numeric' })}
              </h2>
              <div className="flex gap-2">
                <Button variant="secondary" onClick={() => changeMonth(-1)}>Mes Anterior</Button>
                <Button variant="secondary" onClick={() => setCurrentDate(new Date())}>Hoy</Button>
                <Button variant="secondary" onClick={() => changeMonth(1)}>Mes Siguiente</Button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-px bg-zinc-800 rounded-xl overflow-hidden">
              {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map(day => (
                <div key={day} className="bg-zinc-900 p-2 text-center text-xs font-bold text-zinc-500 uppercase tracking-wider">
                  {day}
                </div>
              ))}
              {daysInMonth.map((d, i) => {
                const isCurrentMonth = d.getMonth() === currentDate.getMonth();
                const isToday = d.toDateString() === new Date().toDateString();
                const dayEvents = getEventsForDate(d);
                
                return (
                  <div 
                    key={i} 
                    onClick={() => openNewEventModal(d)}
                    className={`min-h-[100px] p-2 bg-zinc-900/80 hover:bg-zinc-800 transition-colors cursor-pointer border-t border-transparent relative group
                      ${!isCurrentMonth ? 'opacity-30' : ''}
                      ${isToday ? '!bg-primary-900/20 ring-1 ring-inset ring-primary-500' : ''}
                    `}
                  >
                    <span className={`text-sm font-bold ${isToday ? 'text-primary-400' : 'text-zinc-400'}`}>{d.getDate()}</span>
                    
                    <div className="mt-2 space-y-1">
                      {dayEvents.slice(0,3).map(ev => (
                        <div key={ev.id} className="text-[10px] bg-primary-600/30 text-primary-200 px-1 py-0.5 rounded truncate" title={ev.title}>
                          {new Date(ev.datetime).toLocaleTimeString('es-ES', {hour: '2-digit', minute:'2-digit'})} - {ev.title}
                        </div>
                      ))}
                      {dayEvents.length > 3 && <p className="text-[10px] text-zinc-500 text-center">+{dayEvents.length - 3} más</p>}
                    </div>

                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Plus className="w-4 h-4 text-zinc-500" />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {activeTab === "contacts" && (
          <section className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold uppercase tracking-widest text-zinc-100">Usuarios Guardados</h2>
              <Button variant="primary" onClick={() => setIsAddContactModalOpen(true)} className="flex items-center gap-2">
                <UserPlus className="w-4 h-4" /> Añadir Contacto
              </Button>
            </div>

            {contacts.length === 0 ? (
              <ViewState variant="empty" title="Tu agenda está vacía" description="Añade usuarios para tenerlos a mano, enviarles mensajes o agendar citas." />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {contacts.map(c => (
                  <div key={c.id} className="glass-panel p-5 rounded-2xl flex flex-col gap-4 border border-zinc-800/50">
                    <div className="flex items-center gap-4">
                      {c.imagen_perfil ? (
                        <img src={c.imagen_perfil} className="w-14 h-14 rounded-full object-cover" alt={c.display_name}/>
                      ) : (
                        <UserCircle className="w-14 h-14 text-zinc-600" />
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-lg text-white truncate">{c.display_name}</h3>
                        <p className="text-xs text-zinc-400 truncate">{c.bio || "Sin biografía"}</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 bg-zinc-900/50 p-2 rounded-xl mt-4">
                      <Button variant="secondary" className="flex-1 text-xs" onClick={() => setSelectedContactProfile(c)}>
                        Perfil
                      </Button>
                      <Button variant="secondary" className="flex-1 text-xs" onClick={() => router.push(`/user/chat?contactId=${c.id}`)}>
                        <MessageSquare className="w-4 h-4" />
                      </Button>
                      <Button variant="secondary" className="flex-1 text-xs !bg-indigo-600/20 hover:!bg-indigo-600/40 !text-indigo-400" onClick={() => router.push(`/user/video-call?contactId=${c.id}`)}>
                        <Video className="w-4 h-4" />
                      </Button>
                      <Button variant="danger" className="shrink-0 p-3" onClick={() => handleRemoveContact(c.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}
      </div>

      {/* Agregar Contacto Modal */}
      {isAddContactModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 w-full max-w-md max-h-[80vh] flex flex-col">
            <h2 className="text-xl font-bold text-white mb-4">Directorio de Usuarios</h2>
            <div className="flex-1 overflow-y-auto space-y-2 pr-2">
              {discoverUsers.filter(du => !contacts.find(c => c.id === du.id)).map(u => (
                <div key={u.id} className="flex items-center justify-between p-3 bg-zinc-800/50 rounded-xl">
                  <span className="font-medium text-white">{u.display_name}</span>
                  <Button variant="primary" onClick={() => handleAddContact(u.id)} className="text-xs py-1">Guardar</Button>
                </div>
              ))}
            </div>
            <Button variant="secondary" className="mt-4 w-full" onClick={() => setIsAddContactModalOpen(false)}>Cerrar</Button>
          </div>
        </div>
      )}

      {/* Event Modal */}
      {isEventModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <form onSubmit={handleCreateEvent} className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 w-full max-w-md flex flex-col gap-4">
            <h2 className="text-xl font-bold text-white">Agendar Cita - {selectedDateForEvent}</h2>
            
            <label className="text-sm font-bold text-zinc-400">
              Título
              <input required type="text" value={newEvent.title} onChange={e=>setNewEvent({...newEvent, title: e.target.value})} className="mt-1 w-full bg-black/50 border border-zinc-700/50 rounded-lg p-2 text-white" />
            </label>
            
            <div className="flex gap-4">
              <label className="text-sm font-bold text-zinc-400 flex-1">
                Hora
                <input required type="time" value={newEvent.time} onChange={e=>setNewEvent({...newEvent, time: e.target.value})} className="mt-1 w-full bg-black/50 border border-zinc-700/50 rounded-lg p-2 text-white" />
              </label>
              
              <label className="text-sm font-bold text-zinc-400 flex-1">
                Con Contacto (Opcional)
                <select value={newEvent.contact_id} onChange={e=>setNewEvent({...newEvent, contact_id: e.target.value})} className="mt-1 w-full bg-black/50 border border-zinc-700/50 rounded-lg p-2 text-white">
                  <option value="">Nadie</option>
                  {contacts.map(c => <option key={c.id} value={c.id}>{c.display_name}</option>)}
                </select>
              </label>
            </div>
            
            <label className="text-sm font-bold text-zinc-400">
              Notas adicionales
              <textarea value={newEvent.note} onChange={e=>setNewEvent({...newEvent, note: e.target.value})} className="mt-1 w-full bg-black/50 border border-zinc-700/50 rounded-lg p-2 text-white h-20" />
            </label>

            <div className="flex gap-2 pt-2">
              <Button variant="secondary" type="button" className="flex-1" onClick={() => setIsEventModalOpen(false)}>Cancelar</Button>
              <Button variant="primary" type="submit" className="flex-1">Guardar Cita</Button>
            </div>
          </form>
        </div>
      )}

      {/* Profile Modal */}
      {selectedContactProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl w-full max-w-sm overflow-hidden flex flex-col">
            <div className="relative h-48 bg-zinc-800">
              {selectedContactProfile.imagen_perfil ? (
                <img src={selectedContactProfile.imagen_perfil} className="w-full h-full object-cover" alt="Profile" />
              ) : (
                <div className="w-full h-full flex items-center justify-center"><UserCircle className="w-20 h-20 text-zinc-600" /></div>
              )}
            </div>
            <div className="p-6 space-y-4">
              <div>
                <h2 className="text-2xl font-black text-white">{selectedContactProfile.display_name} {selectedContactProfile.age ? `, ${selectedContactProfile.age}` : ''}</h2>
                <p className="text-sm text-zinc-400 capitalize">{selectedContactProfile.gender || ''} {selectedContactProfile.location ? `• ${selectedContactProfile.location}` : ''}</p>
              </div>
              <div className="bg-zinc-800/50 p-4 rounded-xl text-sm text-zinc-300">
                {selectedContactProfile.bio || "Este usuario no ha escrito una biografía todavía."}
              </div>
              <div className="grid grid-cols-2 gap-2 mt-4">
                <Button variant="secondary" onClick={() => { router.push(`/user/chat?contactId=${selectedContactProfile.id}`); setSelectedContactProfile(null); }} className="flex justify-center items-center gap-2"><MessageSquare className="w-4 h-4"/> Chat</Button>
                <Button variant="primary" className="!bg-indigo-600 hover:!bg-indigo-500 !text-white flex justify-center items-center gap-2" onClick={() => { router.push(`/user/video-call?contactId=${selectedContactProfile.id}`); setSelectedContactProfile(null); }}><Video className="w-4 h-4"/> Llamar</Button>
              </div>
              <Button variant="secondary" className="w-full mt-2" onClick={() => setSelectedContactProfile(null)}>Cerrar</Button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
