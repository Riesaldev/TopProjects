"use client";

import React from "react";
import Button from "@/components/Button";
import ViewState from "@/components/ViewState";

interface Reporte {
  id: string;
  usuario: string;
  motivo: string;
  fecha: string;
  estado: string;
}

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" ? (value as Record<string, unknown>) : {};
}

export default function AdminReportsPage() {
  const [reportes, setReportes] = React.useState<Reporte[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const getAuthHeaders = (): Record<string, string> => {
    const token = typeof window !== "undefined" ? localStorage.getItem("jwt-token") : null;
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    return headers;
  };

  const normalizeReport = (raw: unknown): Reporte => {
    const report = asRecord(raw);
    return {
      id: String(report.id ?? ""),
      usuario: `ID ${report.reported_user_id ?? report.usuario ?? "N/A"}`,
      motivo: String(report.type ?? report.motivo ?? "Sin motivo"),
      fecha: report.created_at ? new Date(String(report.created_at)).toLocaleString() : String(report.fecha ?? "-"),
      estado: String(report.status ?? report.estado ?? "Pendiente"),
    };
  };

  const fetchReports = () => {
    setLoading(true);
    setError(null);
    fetch("/api/reports", { headers: getAuthHeaders() })
      .then((res) => res.json())
      .then((data) => {
        const normalized = Array.isArray(data) ? data.map(normalizeReport) : [];
        setReportes(normalized);
      })
      .catch(() => {
        setReportes([]);
        setError("No se pudieron cargar las denuncias.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  React.useEffect(() => {
    fetchReports();
  }, []);

  const marcarResuelta = async (id: string) => {
    await fetch(`/api/reports/${id}`, {
      method: "PATCH",
      headers: getAuthHeaders(),
      body: JSON.stringify({ status: "resolved" })
    });
    fetchReports();
  };

  const eliminarReporte = async (id: string) => {
    await fetch(`/api/reports/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    fetchReports();
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-slate-200 px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
      <header className="glass-panel rounded-3xl border border-zinc-800/60 p-6">
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">Revision de Denuncias</h1>
        <p className="text-zinc-400 text-sm mt-2">Gestiona incidencias activas y cierra reportes resueltos.</p>
      </header>
      {loading ? (
        <ViewState variant="loading" title="Cargando denuncias" description="Sincronizando reportes del sistema." className="w-full max-w-md" />
      ) : error ? (
        <ViewState variant="error" title="Error al cargar denuncias" description={error} className="w-full max-w-md" />
      ) : reportes.length === 0 ? (
        <ViewState variant="empty" title="Sin denuncias registradas" description="Cuando lleguen nuevas incidencias apareceran aqui." className="w-full max-w-md" />
      ) : (
        <ul className="w-full divide-y divide-zinc-800/70 glass-panel rounded-3xl border border-zinc-800/60 overflow-hidden">
          {reportes.map((report) => (
            <li key={report.id} className="p-4 sm:p-5 flex flex-col gap-2 bg-zinc-900/30 hover:bg-zinc-900/50 transition-colors">
              <span className="font-semibold text-zinc-100">Usuario: {report.usuario}</span>
              <span className="text-zinc-200">Motivo: {report.motivo}</span>
              <span className="text-xs text-zinc-400">Fecha: {report.fecha}</span>
              <span className="text-xs text-zinc-500">Estado: {report.estado}</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {(String(report.estado).toLowerCase().includes("resuelt") || String(report.estado).toLowerCase().includes("resolved")) ? null : (
                  <Button variant="primary" onClick={() => marcarResuelta(report.id)}>Marcar como resuelta</Button>
                )}
                <Button variant="secondary" onClick={() => eliminarReporte(report.id)}>Eliminar</Button>
              </div>
            </li>
          ))}
        </ul>
      )}
      </div>
    </main>
  );
} 