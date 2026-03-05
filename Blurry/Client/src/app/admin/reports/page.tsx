"use client";

import React from "react";
import Button from "@/components/Button";

interface Reporte {
  id: string;
  usuario: string;
  motivo: string;
  fecha: string;
  estado: string;
}

export default function AdminReportsPage() {
  const [reportes, setReportes] = React.useState<Reporte[]>([]);
  const [loading, setLoading] = React.useState(true);

  const getAuthHeaders = () => {
    const token = typeof window !== "undefined" ? localStorage.getItem("jwt-token") : null;
    return token
      ? { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
      : { "Content-Type": "application/json" };
  };

  const normalizeReport = (raw: any): Reporte => ({
    id: String(raw?.id ?? ""),
    usuario: `ID ${raw?.reported_user_id ?? raw?.usuario ?? "N/A"}`,
    motivo: String(raw?.type ?? raw?.motivo ?? "Sin motivo"),
    fecha: raw?.created_at ? new Date(raw.created_at).toLocaleString() : String(raw?.fecha ?? "-"),
    estado: String(raw?.status ?? raw?.estado ?? "Pendiente"),
  });

  const fetchReports = () => {
    setLoading(true);
    fetch("/api/reports", { headers: getAuthHeaders() })
      .then((res) => res.json())
      .then((data) => {
        const normalized = Array.isArray(data) ? data.map(normalizeReport) : [];
        setReportes(normalized);
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
        <p>Cargando denuncias...</p>
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