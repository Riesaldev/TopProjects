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
        setSanciones(Array.isArray(data) ? data : []);
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
    <main className="min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-2xl font-bold mb-4">Sanciones y Restricciones</h1>
      {loading ? (
        <ViewState variant="loading" title="Cargando sanciones" description="Consultando restricciones activas." className="w-full max-w-md" />
      ) : error ? (
        <ViewState variant="error" title="Error al cargar sanciones" description={error} className="w-full max-w-md" />
      ) : sanciones.length === 0 ? (
        <ViewState variant="empty" title="Sin sanciones registradas" description="No hay restricciones activas por el momento." className="w-full max-w-md" />
      ) : (
        <table className="min-w-[350px] border rounded shadow bg-white">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Usuario</th>
              <th className="p-2">Sanción</th>
              <th className="p-2">Fecha</th>
              <th className="p-2">Estado</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {sanciones.map((s) => (
              <tr key={s.id} className="text-center border-t">
                <td className="p-2">{s.usuario}</td>
                <td className="p-2">{s.sancion}</td>
                <td className="p-2">{s.fecha}</td>
                <td className="p-2">{s.estado}</td>
                <td className="p-2 flex flex-col gap-2">
                  {s.estado !== "Expirada" && (
                    <Button variant="primary" onClick={() => marcarExpirada(s.id)}>Marcar como expirada</Button>
                  )}
                  <Button variant="secondary" onClick={() => eliminarSancion(s.id)}>Eliminar</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
} 