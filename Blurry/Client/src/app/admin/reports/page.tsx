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

  const fetchReports = () => {
    setLoading(true);
    fetch("/api/reports")
      .then((res) => res.json())
      .then((data) => {
        setReportes(data);
        setLoading(false);
      });
  };

  React.useEffect(() => {
    fetchReports();
  }, []);

  const marcarResuelta = async (id: string) => {
    await fetch("/api/reports", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, estado: "Resuelta" })
    });
    fetchReports();
  };

  const eliminarReporte = async (id: string) => {
    await fetch("/api/reports", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id })
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
                {report.estado !== "Resuelta" && (
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