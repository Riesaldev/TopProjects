"use client";

import { useEffect, useState } from "react";
import ViewState from "@/components/ViewState";

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
    <main className="min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-2xl font-bold mb-4">Interacción Interna</h1>
      {loading ? (
        <ViewState variant="loading" title="Cargando administradores" description="Validando equipo interno." className="w-full max-w-md mb-6" />
      ) : null}
      <ul className="w-full max-w-md divide-y divide-gray-200 bg-white rounded shadow mb-6">
        {!loading && admins.length === 0 && (
          <li className="p-0">
            <ViewState variant="empty" title="Sin administradores disponibles" description="No hay perfiles admin habilitados ahora mismo." className="min-h-[160px] rounded-none border-0" />
          </li>
        )}
        {admins.map((admin) => (
          <li key={admin.id} className="p-4 flex justify-between items-center">
            <div>
              <span className="font-semibold">{admin.name}</span>
              <span className="ml-2 text-xs text-gray-400">{admin.online ? '● Online' : 'Offline'}</span>
              <div className="text-sm text-gray-600">{admin.lastMessage}</div>
            </div>
            <button className="bg-primary-600 text-white px-3 py-1 rounded hover:bg-primary-700">Mensaje</button>
            <button className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 ml-2">Videollamada</button>
          </li>
        ))}
      </ul>
      <div className="w-full max-w-md bg-white rounded shadow p-4 text-center text-gray-500 text-sm">
        Las alertas y notificaciones aparecerán aquí.
      </div>
    </main>
  );
} 