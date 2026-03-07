'use client';

import React from "react";
import Button from "@/components/Button";
import ViewState from "@/components/ViewState";

interface Sancion {
  id: string;
  usuario: string;
  sancion: string;
  fecha: string;
  estado: string;
}

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" ? (value as Record<string, unknown>) : {};
}

function normalizeSanction(raw: unknown): Sancion {
  const sanction = asRecord(raw);
  const id = sanction.id != null ? String(sanction.id) : "-";
  const fechaRaw = sanction.fecha ?? sanction.created_at ?? sanction.updated_at;

  return {
    id,
    usuario: String(sanction.usuario ?? sanction.user_id ?? `user-${id}`),
    sancion: String(sanction.sancion ?? "Sin detalle"),
    fecha: fechaRaw ? new Date(String(fechaRaw)).toLocaleDateString() : "-",
    estado: String(sanction.estado ?? "Activa"),
  };
}

export default function AdminSanctionsPage() {
  const [sanciones, setSanciones] = React.useState<Sancion[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const fetchSanctions = () => {
    setLoading(true);
    setError(null);
    fetch("/api/sanctions")
      .then((res) => res.json())
      .then((data) => {
        setSanciones(Array.isArray(data) ? data.map(normalizeSanction) : []);
      })
      .catch(() => {
        setSanciones([]);
        setError("No se pudieron cargar las sanciones.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  React.useEffect(() => {
    fetchSanctions();
  }, []);

  const marcarExpirada = async (id: string) => {
    await fetch("/api/sanctions", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, estado: "Expirada" })
    });
    fetchSanctions();
  };

  const eliminarSancion = async (id: string) => {
    await fetch("/api/sanctions", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id })
    });
    fetchSanctions();
  };

  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-8 text-zinc-100">
      <div className="mx-auto w-full max-w-6xl">
        <section className="mb-6 rounded-3xl border border-zinc-800/70 bg-gradient-to-br from-zinc-900 to-zinc-950 p-6 shadow-xl shadow-black/25">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-primary-400">Moderacion</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-white">Sanciones y Restricciones</h1>
          <p className="mt-2 max-w-2xl text-sm text-zinc-400">
            Supervisa el estado disciplinario, cierra sanciones y limpia registros obsoletos.
          </p>
        </section>

        <section className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-zinc-800/70 bg-zinc-900/70 p-4">
            <p className="text-xs uppercase tracking-wider text-zinc-500">Total</p>
            <p className="mt-1 text-2xl font-black text-white">{sanciones.length}</p>
          </div>
          <div className="rounded-2xl border border-zinc-800/70 bg-zinc-900/70 p-4">
            <p className="text-xs uppercase tracking-wider text-zinc-500">Activas</p>
            <p className="mt-1 text-2xl font-black text-red-300">{sanciones.filter((s) => s.estado === "Activa").length}</p>
          </div>
          <div className="rounded-2xl border border-zinc-800/70 bg-zinc-900/70 p-4">
            <p className="text-xs uppercase tracking-wider text-zinc-500">Expiradas</p>
            <p className="mt-1 text-2xl font-black text-zinc-300">{sanciones.filter((s) => s.estado === "Expirada").length}</p>
          </div>
        </section>

      {loading ? (
        <ViewState variant="loading" title="Cargando sanciones" description="Consultando restricciones activas." className="w-full max-w-md" />
      ) : error ? (
        <ViewState variant="error" title="Error al cargar sanciones" description={error} className="w-full max-w-md" />
      ) : sanciones.length === 0 ? (
        <ViewState variant="empty" title="Sin sanciones registradas" description="No hay restricciones activas por el momento." className="w-full max-w-md" />
      ) : (
        <div className="w-full overflow-x-auto rounded-2xl border border-zinc-800/70 bg-zinc-900/70 shadow-xl shadow-black/20">
        <table className="w-full min-w-[760px]">
          <thead>
            <tr className="bg-zinc-800/90 text-zinc-200">
              <th className="p-3 text-left text-xs font-bold uppercase tracking-wider">Usuario</th>
              <th className="p-3 text-left text-xs font-bold uppercase tracking-wider">Sancion</th>
              <th className="p-3 text-left text-xs font-bold uppercase tracking-wider">Fecha</th>
              <th className="p-3 text-left text-xs font-bold uppercase tracking-wider">Estado</th>
              <th className="p-3 text-left text-xs font-bold uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {sanciones.map((s) => (
              <tr key={s.id} className="border-t border-zinc-800/80 text-sm text-zinc-200">
                <td className="p-3 align-top font-semibold text-white">{s.usuario}</td>
                <td className="p-3 align-top text-zinc-300">{s.sancion}</td>
                <td className="p-3 align-top text-zinc-400">{s.fecha}</td>
                <td className="p-3 align-top">
                  <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold uppercase tracking-wider ${
                    s.estado === "Activa"
                      ? "bg-red-500/15 text-red-300"
                      : "bg-zinc-700/40 text-zinc-300"
                  }`}>
                    {s.estado}
                  </span>
                </td>
                <td className="p-3 align-top">
                  <div className="flex flex-wrap gap-2">
                  {s.estado !== "Expirada" && (
                    <Button size="sm" variant="primary" onClick={() => marcarExpirada(s.id)}>Marcar expirada</Button>
                  )}
                  <Button size="sm" variant="danger" onClick={() => eliminarSancion(s.id)}>Eliminar</Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      )}
      </div>
    </main>
  );
} 