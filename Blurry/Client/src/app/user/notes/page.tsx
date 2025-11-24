"use client";

import { Note, Contact } from "@/types";
import { useRealtime } from '@/context/RealtimeContext';
import { useEffect, useState } from 'react';


interface NotesPageProps {
  userId: number;
}

export default function NotesPage({ userId }: Readonly<NotesPageProps>) {
  const realtimeContext = useRealtime();
  const notifications = realtimeContext?.notifications || [];

  useEffect(() => {
    // Aquí puedes manejar notificaciones en tiempo real si las gestionas en el contexto
  }, [notifications]);

  const [notes, setNotes] =useState<Note[]>([]);
  const [contacts, setContacts] =useState<Contact[]>([]);
  const [editingId, setEditingId] =useState<number|null>(null);
  const [editContent, setEditContent] =useState("");
  const [loading, setLoading] =useState(true);

  useEffect(() => {
    Promise.all([
      fetch(`/api/notes?userId=${userId}`).then(res => res.json()),
      fetch(`/api/users`).then(res => res.json())
    ]).then(([notesData, usersData]) => {
      setNotes(notesData);
      setContacts(usersData);
      setLoading(false);
    });
  }, []);

  const getContactName = (contactId: string | number | undefined) => {
    if (!contactId) return "Usuario";
    const c = contacts.find((u: Contact) => String(u.id) === String(contactId));
    return c ? c.nombre : "Usuario";
  };

  const handleEdit = (note: Note) => {
    setEditingId(note.id);
    setEditContent(note.content);
  };

  const handleSave = async (id: number, contactId?: string|number) => {
    if (!contactId) return;
    
    await fetch(`/api/notes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, contactId, content: editContent })
    });
    setNotes(n => n.map(note => note.id === id ? { ...note, content: editContent } : note));
    setEditingId(null);
    setEditContent("");
  };

  const handleDelete = async (id: number) => {
    await fetch(`/api/notes`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id })
    });
    setNotes(n => n.filter(note => note.id !== id));
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-accent-400">
      <h1 className="text-2xl font-bold mb-6 text-primary-700">Mis notas de videollamada</h1>
      {loading ? <div>Cargando...</div> : (
        <div className="w-full max-w-2xl">
          {notes.length === 0 ? (
            <div className="text-accent-600">No tienes notas guardadas.</div>
          ) : (
            <ul className="flex flex-col gap-4">
              {notes.map(note => (
                <li key={note.id} className="bg-primary-50 rounded-lg shadow-lg p-4 flex flex-col gap-2">
                  <div className="font-semibold">{getContactName(note.contactId)}</div>
                  <div className="text-xs text-accent-600 mb-1">{note.date ? new Date(note.date).toLocaleString() : 'Fecha no disponible'}</div>
                  {editingId === note.id ? (
                    <>
                      <label htmlFor={`note-edit-${note.id}`} className="font-semibold">Editar nota</label>
                      <textarea
                        id={`note-edit-${note.id}`}
                        className="border border-accent-300 rounded-lg px-2 py-1 w-full bg-primary-50 focus:outline-primary-400"
                        value={editContent}
                        onChange={e => setEditContent(e.target.value)}
                        rows={3}
                        aria-required="true"
                      />
                      <div className="flex gap-2">
                        <button className="bg-primary-600 text-white px-4 py-1 rounded-lg font-semibold shadow-md focus:outline-primary-400" onClick={() => handleSave(note.id, note.contactId)} aria-label="Guardar nota">Guardar</button>
                        <button className="bg-accent-200 text-accent-700 px-4 py-1 rounded-lg font-semibold shadow-md focus:outline-primary-400" onClick={() => setEditingId(null)} aria-label="Cancelar edición">Cancelar</button>
                      </div>
                      {/* <div aria-live="polite" className="text-red-600 text-sm mt-2">Aquí aparecerán errores de nota</div> */}
                    </>
                  ) : (
                    <>
                      <div>{note.content}</div>
                      <div className="flex gap-2 mt-2">
                        <button className="text-primary-700 underline text-xs" onClick={() => handleEdit(note)}>Editar</button>
                        <button className="text-error-700 underline text-xs" onClick={() => handleDelete(note.id)}>Borrar</button>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </main>
  );
} 