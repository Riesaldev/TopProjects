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
    <main className="min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-2xl font-bold mb-4">Revisión de Denuncias</h1>
      {loading ? (
        <ViewState variant="loading" title="Cargando denuncias" description="Sincronizando reportes del sistema." className="w-full max-w-md" />
      ) : error ? (
        <ViewState variant="error" title="Error al cargar denuncias" description={error} className="w-full max-w-md" />
      ) : reportes.length === 0 ? (
        <ViewState variant="empty" title="Sin denuncias registradas" description="Cuando lleguen nuevas incidencias apareceran aqui." className="w-full max-w-md" />
      ) : (
        <ul className="w-full max-w-md divide-y divide-gray-200 bg-white rounded shadow">
          {reportes.map((report) => (
            <li key={report.id} className="p-4 flex flex-col gap-2">
              <span className="font-semibold">Usuario: {report.usuario}</span>
              <span>Motivo: {report.motivo}</span>
              <span className="text-xs text-gray-400">Fecha: {report.fecha}</span>
              <span className="text-xs text-gray-500">Estado: {report.estado}</span>
              <div className="flex gap-2 mt-2">
                {(String(report.estado).toLowerCase().includes("resuelt") || String(report.estado).toLowerCase().includes("resolved")) ? null : (
                  <Button variant="primary" onClick={() => marcarResuelta(report.id)}>Marcar como resuelta</Button>
                )}
                <Button variant="secondary" onClick={() => eliminarReporte(report.id)}>Eliminar</Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
} 