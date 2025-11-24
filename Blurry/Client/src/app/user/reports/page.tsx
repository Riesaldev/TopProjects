"use client";

import { useNotifications } from "@/components/NotificationsContext";
import { Report } from "@/types";
import { useEffect, useState } from 'react';
import { useRealtime } from '@/context/RealtimeContext';


interface UserReportsPageProps {
  userId: number;
}

export default function UserReportsPage({ userId }: Readonly<UserReportsPageProps>) {
  const [reports, setReports] =useState<Report[]>([]);
  const [prevStates, setPrevStates] =useState<Record<string, string>>({});
  const { showToast } = useNotifications();
  const realtimeContext = useRealtime();
  const notifications = realtimeContext?.notifications || [];
  const userStatus = realtimeContext?.userStatus;

  const getStatusClassName = (estado: string) => {
    if (estado === "Resuelta") return "text-green-600";
    if (estado === "Pendiente") return "text-yellow-700";
    return "text-primary-600";
  };

  useEffect(() => {
    fetch(`/api/reports`).then(res => res.json()).then((data: Report[]) => {
      const myReports = data.filter((r: Report) => r.usuario && (String(r.usuario) === String(userId) || String(r.usuario).includes(String(userId)) || String(r.usuario).toLowerCase().includes("id "+userId)));
      setReports(myReports);
      // Detectar cambios de estado a 'Resuelto'
      myReports.forEach((r: Report) => {
        if (prevStates[r.id] && prevStates[r.id] !== r.estado && r.estado === "Resuelta") {
          showToast(`Tu reporte '${r.motivo}' ha sido resuelto.`, "success");
        }
      });
      setPrevStates(Object.fromEntries(myReports.map((r: Report) => [r.id, r.estado])));
    });
  }, [prevStates, showToast]);

  useEffect(() => {
    // Aquí puedes manejar notificaciones en tiempo real si las gestionas en el contexto
  }, [notifications]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-accent-400">
      <h1 className="text-2xl font-bold mb-6">Mis Reportes</h1>
      <section className="bg-primary-50 rounded-lg shadow-lg p-6 w-full max-w-2xl">
        <ul className="flex flex-col gap-3">
          {reports.length === 0 ? <li className="text-accent-600">No has enviado reportes aún.</li> : reports.map((r: Report) => (
            <li key={r.id} className="bg-white rounded shadow p-3 flex flex-col gap-1">
              <div className="font-semibold">{r.motivo}</div>
              <div className="text-xs text-accent-600">{r.fecha}</div>
              <div className={`text-xs font-semibold ${getStatusClassName(r.estado)}`}>Estado: {r.estado}</div>
            </li>
          ))}
        </ul>
      </section>
      <div className={`mt-2 ${userStatus?.[userId] === 'online' ? 'text-green-600' : 'text-gray-500'}`}>
        Estado de contacto: {userStatus?.[userId] || 'offline'}
      </div>
      {/* Aquí puedes mostrar notificaciones, badges, etc. */}
    </main>
  );
} 