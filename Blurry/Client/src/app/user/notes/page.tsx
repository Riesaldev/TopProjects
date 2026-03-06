"use client";

import { Note, Contact } from "@/types";
import { useEffect, useState } from 'react';
import { FileText, Edit2, Trash2, CheckCircle2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/components/AuthContext";
import ViewState from "@/components/ViewState";

export default function NotesPage() {
  const { user: currentUser, isLoading: authLoading } = useAuth();
  const userId = currentUser?.id;

  const getAuthHeaders = (): Record<string, string> => {
    const token = typeof window !== "undefined" ? localStorage.getItem("jwt-token") : null;
    const headers: Record<string, string> = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    return headers;
  };

  const normalizeContact = (raw: unknown): Contact => {
    const item = (raw ?? {}) as Record<string, unknown>;
    return {
      id: Number(item.id || 0),
      nombre: String(item.nombre || item.display_name || `Usuario ${item.id ?? ""}`),
    } as Contact;
  };

  const [notes, setNotes] = useState<Note[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [editingId, setEditingId] = useState<number|null>(null);
  const [editContent, setEditContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading || !userId) {
      return;
    }

    const loadNotes = async () => {
      setLoading(true);
      try {
        const [notesRes, usersRes] = await Promise.all([
          fetch(`/api/notes?userId=${userId}`, { headers: getAuthHeaders() }),
          fetch(`/api/users`, { headers: getAuthHeaders() }),
        ]);

        const notesData = await notesRes.json().catch(() => []);
        const usersData = await usersRes.json().catch(() => []);

        setNotes(Array.isArray(notesData) ? notesData : []);
        setContacts(Array.isArray(usersData) ? usersData.map(normalizeContact) : []);
      } catch {
        setNotes([]);
        setContacts([]);
      } finally {
        setLoading(false);
      }
    };

    loadNotes();
  }, [authLoading, userId]);

  const getContactName = (contactId: string | number | undefined) => {
    if (!contactId) return "Sujeto Desconocido";
    const c = contacts.find((u: Contact) => String(u.id) === String(contactId));
    return c ? c.nombre : "Sujeto Desconocido";
  };

  const handleEdit = (note: Note) => {
    setEditingId(note.id);
    setEditContent(note.content);
  };

  const handleSave = async (id: number, contactId?: string|number) => {
    if (!contactId) return;

    try {
      await fetch(`/api/notes`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeaders(),
        },
        body: JSON.stringify({ id, userId, contactId, content: editContent })
      });
    } catch {}
    
    setNotes(n => n.map(note => note.id === id ? { ...note, content: editContent } : note));
    setEditingId(null);
    setEditContent("");
  };

  const handleDelete = async (id: number) => {
    try {
      await fetch(`/api/notes`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeaders(),
        },
        body: JSON.stringify({ id })
      });
    } catch {}
    
    setNotes(n => n.filter(note => note.id !== id));
  };

  return (
    <main className="min-h-screen flex flex-col py-12 px-4 bg-zinc-950 text-slate-200 relative z-10 w-full animate-fade-in pb-20">
      
      {/* Background radial */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-900/10 via-zinc-950 to-zinc-950 -z-10" />

      <div className="w-full max-w-4xl mx-auto space-y-8">
        
        {/* Header Panel */}
        <div className="glass-panel p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden group rounded-3xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 rounded-full blur-[100px] -z-10 group-hover:bg-primary-500/20 transition-all duration-700" />
          
          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-white flex items-center gap-3 tracking-tight mb-2">
              <FileText className="w-8 h-8 sm:w-10 sm:h-10 text-primary-500 animate-pulse-slow" /> 
              INTEL / <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-600 drop-shadow-sm">LOGS PRIVADOS</span>
            </h1>
            <p className="text-zinc-400 text-sm sm:text-lg font-medium">Archivos y notas documentadas de tus encuentros en la red.</p>
          </div>
        </div>

        {/* Content Panel */}
        <div className="glass-panel p-1 rounded-3xl border border-zinc-800/50 relative backdrop-blur-md">
          <div className="bg-zinc-900/60 rounded-[22px] p-6 lg:p-10 flex flex-col min-h-[400px]">
            {loading ? (
              <ViewState variant="loading" title="Cargando notas" description="Desencriptando registros privados." />
            ) : (
                <div className="w-full">
                  {notes.length === 0 ? (
                    <ViewState variant="empty" title="No hay intel registrado" description="Tus anotaciones de videollamada apareceran aqui." />
                  ) : (
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <AnimatePresence>
                        {notes.map((note) => (
                          <motion.li 
                            key={note.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.90 }}
                            className="bg-zinc-800/40 rounded-2xl border border-zinc-700/50 shadow-lg p-5 flex flex-col gap-3 group hover:bg-zinc-800/60 hover:border-zinc-600 transition-all relative overflow-hidden"
                          >
                            <div className="absolute top-0 right-0 w-2 h-full bg-gradient-to-b from-primary-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-black text-white text-lg tracking-wide bg-zinc-900/80 px-3 py-1 rounded-lg border border-zinc-700/50 inline-block">
                                  {getContactName(note.contactId)}
                                </h3>
                                <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mt-2">
                                  {note.date ? new Date(note.date).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' }) : 'Hora desconocida'}
                                </div>
                              </div>
                            </div>

                            {editingId === note.id ? (
                                <div className="mt-2 space-y-3 bg-black/30 p-3 rounded-xl border border-zinc-700">
                                  <label htmlFor={`note-edit-${note.id}`} className="font-bold text-xs uppercase tracking-widest text-zinc-400">Modificar Intel</label>
                                  <textarea
                                    id={`note-edit-${note.id}`}
                                    className="bg-zinc-900 border border-zinc-700/80 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/50 transition-all font-sans text-sm w-full resize-none"
                                    value={editContent}
                                    onChange={e => setEditContent(e.target.value)}
                                    rows={4}
                                    aria-required="true"
                                  />
                                  <div className="flex gap-2 justify-end">
                                    <button 
                                      className="flex items-center gap-2 bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white px-4 py-2 rounded-xl text-xs font-bold uppercase transition-all" 
                                      onClick={() => setEditingId(null)}
                                    >
                                      <X className="w-3.5 h-3.5" /> Abortar
                                    </button>
                                    <button 
                                      className="flex items-center gap-2 bg-primary-600/20 text-primary-400 hover:bg-primary-600 hover:text-white border border-primary-500/30 hover:border-primary-500 px-4 py-2 rounded-xl text-xs font-bold uppercase transition-all shadow-neon" 
                                      onClick={() => handleSave(note.id, note.contactId)}
                                    >
                                      <CheckCircle2 className="w-3.5 h-3.5" /> Guardar
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <>
                                  <div className="text-zinc-300 text-sm leading-relaxed mt-2 p-3 bg-black/20 rounded-xl border border-zinc-800 font-medium">
                                    &quot;{note.content}&quot;
                                  </div>
                                  
                                  <div className="flex gap-2 mt-auto pt-2 opacity-0 group-hover:opacity-100 transition-opacity justify-end">
                                    <button 
                                      className="flex items-center gap-1.5 text-zinc-400 hover:text-primary-400 text-xs font-bold uppercase tracking-wider px-2 py-1 rounded bg-zinc-800/80 hover:bg-zinc-800 transition-colors" 
                                      onClick={() => handleEdit(note)}
                                    >
                                      <Edit2 className="w-3 h-3" /> Editar
                                    </button>
                                    <button 
                                      className="flex items-center gap-1.5 text-zinc-400 hover:text-red-400 text-xs font-bold uppercase tracking-wider px-2 py-1 rounded bg-zinc-800/80 hover:bg-zinc-800 transition-colors" 
                                      onClick={() => handleDelete(note.id)}
                                    >
                                      <Trash2 className="w-3 h-3" /> Borrar
                                    </button>
                                  </div>
                                </>
                            )}
                          </motion.li>
                        ))}
                      </AnimatePresence>
                    </ul>
                  )}
                </div>
            )}
          </div>
        </div>

      </div>
    </main>
  );
}