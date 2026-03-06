"use client";

import { useEffect, useState } from "react";
import ViewState from "@/components/ViewState";
import Button from "@/components/Button";

type AdminItem = {
  id: string;
  name: string;
  lastMessage: string;
  online: boolean;
};

type ApiUser = {
  id?: number;
  display_name?: string;
  email?: string;
  role?: string;
  is_suspended?: boolean;
};

function normalizeAdmins(items: ApiUser[]): AdminItem[] {
  return items
    .filter((item) => String(item.role || "").toLowerCase() === "admin")
    .map((item) => ({
      id: String(item.id ?? "0"),
      name: item.display_name || item.email || `Admin ${item.id ?? ""}`,
      lastMessage: "Canal interno activo.",
      online: !Boolean(item.is_suspended),
    }));
}

export default function AdminInternalPage() {
  const [admins, setAdmins] = useState<AdminItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("jwt-token") : null;
    const authHeaders: Record<string, string> = token ? { Authorization: `Bearer ${token}` } : {};

    fetch("/api/users", {
      headers: authHeaders,
    })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(`Error ${res.status} cargando admins`);
        }
        return res.json();
      })
      .then((data: unknown) => {
        const rows = Array.isArray(data) ? (data as ApiUser[]) : [];
        setAdmins(normalizeAdmins(rows));
      })
      .catch(() => {
        setAdmins([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <main className="min-h-screen bg-zinc-950 text-slate-200 px-4 py-8">
      <div className="max-w-3xl mx-auto space-y-6">
      <header className="glass-panel rounded-3xl border border-zinc-800/60 p-6">
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">Interaccion Interna</h1>
        <p className="text-zinc-400 text-sm mt-2">Canal privado de coordinacion entre administradores.</p>
      </header>
      {loading ? (
        <ViewState variant="loading" title="Cargando administradores" description="Validando equipo interno." className="w-full max-w-md mb-6" />
      ) : null}
      <ul className="w-full divide-y divide-zinc-800/70 glass-panel border border-zinc-800/60 rounded-3xl overflow-hidden mb-6">
        {!loading && admins.length === 0 && (
          <li className="p-0">
            <ViewState variant="empty" title="Sin administradores disponibles" description="No hay perfiles admin habilitados ahora mismo." className="min-h-[160px] rounded-none border-0" />
          </li>
        )}
        {admins.map((admin) => (
          <li key={admin.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 bg-zinc-900/30 hover:bg-zinc-900/50 transition-colors">
            <div>
              <span className="font-semibold text-zinc-100">{admin.name}</span>
              <span className="ml-2 text-xs text-zinc-400">{admin.online ? '● Online' : 'Offline'}</span>
              <div className="text-sm text-zinc-500">{admin.lastMessage}</div>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Button size="sm" variant="secondary">Mensaje</Button>
              <Button size="sm" variant="primary">Videollamada</Button>
            </div>
          </li>
        ))}
      </ul>
      <div className="w-full glass-panel border border-zinc-800/60 rounded-2xl p-4 text-center text-zinc-400 text-sm">
        Las alertas y notificaciones aparecerán aquí.
      </div>
      </div>
    </main>
  );
} 