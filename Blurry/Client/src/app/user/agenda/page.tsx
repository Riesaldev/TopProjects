'use client';

import { useNotifications } from "@/components/NotificationsContext";
import { Contact, AgendaEvent, User } from "@/types";
import { useRealtime } from '@/context/RealtimeContext';
import { useEffect, useState } from 'react';

export default function AgendaPage({ userId }: Readonly<{ userId: number }>) {
  const [contacts, setContacts] =useState<Contact[]>([]);
  const [filteredContacts, setFilteredContacts] =useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] =useState<Contact | null>(null);
  const [events, setEvents] =useState<AgendaEvent[]>([]);
  const [loading, setLoading] =useState(true);
  const [form, setForm] =useState({ title: "", description: "", datetime: "", note: "" });
  const [saving, setSaving] =useState(false);
  const [filters, setFilters] =useState({ genero: "", actividad: "", cercania: false });
  const [myUser, setMyUser] =useState<User | null>(null);
  const { showToast } = useNotifications();
  const realtimeContext = useRealtime();
  const notifications = realtimeContext?.notifications || [];

  useEffect(() => {
    // Aquí puedes manejar notificaciones en tiempo real si las gestionas en el contexto
  }, [notifications]);

  useEffect(() => {
    // Obtener contactos (todos menos el actual) y datos del usuario actual
    fetch(`/api/users`)
      .then(res => res.json())
      .then(data => {
        const me = data.find((u: User) => String(u.id) === String(userId));
        setMyUser(me);
        const others = data.filter((u: User) => String(u.id) !== String(userId));
        setContacts(others);
        setFilteredContacts(others);
      });
  }, [userId]);

  useEffect(() => {
    if (!selectedContact) return;
    setLoading(true);
    fetch(`/api/agenda?userId=${userId}`)
      .then(res => res.json())
      .then(data => {
        setEvents(data.filter((e: AgendaEvent) => String(e.contactId) === String(selectedContact.id)));
        setLoading(false);
      });
  }, [selectedContact, userId]);

  // Filtros
  useEffect(() => {
    let filtered = [...contacts];
    if (filters.genero) filtered = filtered.filter(c => c.genero === filters.genero);
    if (filters.actividad) filtered = filtered.filter(c => c.actividad === filters.actividad);
    if (filters.cercania && myUser) {
      filtered = filtered.filter(c => c.codigoPostal && myUser.codigoPostal && c.codigoPostal.slice(0,2) === myUser.codigoPostal.slice(0,2));
    }
    setFilteredContacts(filtered);
  }, [filters, contacts, myUser]);

  // Mostrar recordatorio de cita próxima
  useEffect(() => {
    if (!events.length) return;
    const now = new Date();
    const soon = events.find(e => {
      const t = new Date(e.datetime);
      return t > now && (t.getTime() - now.getTime()) / 60000 < 30;
    });
    if (soon) {
      const timeString = soon.datetime ? new Date(soon.datetime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "hora no especificada";
      showToast(`¡Tienes una cita próxima: ${soon.title} a las ${timeString}!`, "info");
    }
  }, [events, showToast]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedContact) {
      showToast("Selecciona un contacto primero", "error");
      return;
    }
    setSaving(true);
    const res = await fetch("/api/agenda", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, userId, contactId: selectedContact.id })
    });
    const newEvent = await res.json();
    setEvents(ev => [...ev, newEvent]);
    setForm({ title: "", description: "", datetime: "", note: "" });
    setSaving(false);
  };

  const handleDelete = async (id: number) => {
    await fetch("/api/agenda", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id })
    });
    setEvents(ev => ev.filter(e => e.id !== id));
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-accent-400">
      <h1 className="text-2xl font-bold mb-6 text-primary-700">Contactos y citas</h1>
      <div className="w-full max-w-2xl flex flex-col md:flex-row gap-8">
        {/* Lista de contactos y filtros */}
        <aside className="md:w-1/3 w-full">
          <h2 className="font-semibold mb-2 text-primary-700">Contactos</h2>
          <form className="mb-4 flex flex-col gap-2 bg-primary-50 p-3 rounded-lg shadow-lg">
            <label className="text-sm flex flex-col gap-1">
              <span>Género</span>
              <select 
                className="w-full border border-accent-300 rounded-lg px-2 py-1 bg-primary-50" 
                value={filters.genero} 
                onChange={e => setFilters(f => ({ ...f, genero: e.target.value }))}
              >
                <option value="">Todos</option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
              </select>
            </label>
            
            <label className="text-sm flex flex-col gap-1">
              <span>Actividad</span>
              <select 
                className="w-full border border-accent-300 rounded-lg px-2 py-1 bg-primary-50" 
                value={filters.actividad} 
                onChange={e => setFilters(f => ({ ...f, actividad: e.target.value }))}
              >
                <option value="">Todas</option>
                <option value="Alta">Alta</option>
                <option value="Media">Media</option>
                <option value="Baja">Baja</option>
              </select>
            </label>
            
            <label className="flex items-center gap-2 text-sm">
              <input 
                type="checkbox" 
                checked={filters.cercania} 
                onChange={e => setFilters(f => ({ ...f, cercania: e.target.checked }))}
                className="rounded"
              /> 
              <span>Cercanos (código postal)</span>
            </label>
          </form>

          <ul className="flex flex-col gap-2">
            {filteredContacts.map(c => (
              <li key={c.id} className="flex items-center gap-2">
                <button
                  type="button"
                  className={`flex-1 text-left px-3 py-2 rounded-lg transition-colors ${
                    selectedContact?.id === c.id
                      ? 'bg-primary-100 font-bold' 
                      : 'bg-accent-100 hover:bg-primary-50'
                  }`}
                  onClick={() => setSelectedContact(c)}
                >
                  <span className="block">{c.nombre}</span>
                  <span className="text-xs text-accent-600">
                    ({c.genero}, {c.actividad})
                  </span>
                </button>
                <a
                  href={`/user/chat?contactId=${c.id}`}
                  title="Chat"
                  className="bg-primary-600 hover:bg-primary-700 text-white rounded-lg px-2 py-1 text-xs shadow-md"
                >Chat</a>
                <a
                  href={`/user/video-call?contactId=${c.id}`}
                  title="Videollamada"
                  className="bg-success-500 hover:bg-success-600 text-white rounded-lg px-2 py-1 text-xs shadow-md"
                >Video</a>
              </li>
            ))}
          </ul>
        </aside>
        {/* Citas con el contacto seleccionado */}
        <section className="md:w-2/3 w-full">
          {!selectedContact ? (
            <div className="text-accent-600">Selecciona un contacto para ver o agendar citas.</div>
          ) : (
            <>
              <h2 className="font-semibold mb-2 text-primary-700">Citas con {selectedContact.nombre}</h2>
              <form onSubmit={handleAdd} className="bg-primary-50 rounded-lg shadow-lg p-4 mb-4 flex flex-col gap-3" aria-label="Formulario de agendar cita">
                <label htmlFor="agenda-title" className="font-semibold">
                  Título{" "}
                  <input id="agenda-title" name="title" value={form.title} onChange={handleChange} placeholder="Título" className="border border-accent-300 rounded-lg px-2 py-1 w-full bg-primary-50 focus:outline-primary-400" required aria-required="true" />
                </label>
                <label htmlFor="agenda-description" className="font-semibold">Descripción{" "}
                  <textarea id="agenda-description" name="description" value={form.description} onChange={handleChange} placeholder="Descripción" className="border border-accent-300 rounded-lg px-2 py-1 w-full bg-primary-50 focus:outline-primary-400" />
                </label>
                <label htmlFor="agenda-note" className="font-semibold">Nota privada{" "}
                  <textarea id="agenda-note" name="note" value={form.note || ""} onChange={e => setForm(f => ({ ...f, note: e.target.value }))} placeholder="Solo tú puedes ver esta nota" className="border border-accent-300 rounded-lg px-2 py-1 w-full bg-primary-50 focus:outline-primary-400" rows={2} />
                </label>
                <label htmlFor="agenda-datetime" className="font-semibold">Fecha y hora{" "}
                  <input id="agenda-datetime" name="datetime" value={form.datetime} onChange={handleChange} type="datetime-local" className="border border-accent-300 rounded-lg px-2 py-1 w-full bg-primary-50 focus:outline-primary-400" required aria-required="true" />
                </label>
                <button type="submit" className="bg-primary-600 text-white px-4 py-2 rounded-lg font-semibold shadow-md focus:outline-primary-400" disabled={saving} aria-label="Agendar cita">{saving ? "Agendando..." : "Agendar cita"}</button>
                {/* <div aria-live="polite" className="text-red-600 text-sm mt-2">Aquí aparecerán errores de agenda</div> */}
              </form>
              {loading ? <div>Cargando...</div> : (
                <div>
                  {events.length === 0 ? (
                    <div className="text-accent-600">No tienes citas con este contacto.</div>
                  ) : (
                    <ul className="flex flex-col gap-4">
                      {events.map(e => (
                        <li key={e.id} className="bg-accent-100 rounded-lg p-4 flex flex-col gap-1 shadow-lg">
                          <div className="font-semibold text-lg text-primary-700">{e.title}</div>
                          <div className="text-accent-600 text-sm">{e.description}</div>
                          <div className="text-xs text-accent-600 mb-2">{e.datetime ? new Date(e.datetime).toLocaleString() : 'Fecha no disponible'}</div>
                          {e.note && <div className="text-xs text-primary-700 mb-1">Nota privada: {e.note}</div>}
                          <button onClick={() => handleDelete(e.id)} className="text-error-700 underline text-xs self-end">Eliminar</button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </main>
  );
}