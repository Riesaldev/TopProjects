"use client";

import Link from "next/link";
import Button from "@/components/Button";
import AdminCharts from "./Charts";
import { User, Report, Sanction, Match, TokenTransaction, Service } from "@/types";
import { useRealtime } from '@/context/RealtimeContext';
import { useEffect, useState } from 'react';
import { useAuth } from "@/components/AuthContext";
import { useRouter } from 'next/navigation';

interface UserSettingsPageProps {
  userId: number;
}

export default function AdminDashboard() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [usuarios, setUsuarios] =useState<number | null>(null);
  const [usuariosActivos, setUsuariosActivos] =useState<number | null>(null);
  const [denunciasPendientes, setDenunciasPendientes] =useState<number | null>(null);
  const [denunciasMes, setDenunciasMes] =useState<number | null>(null);
  const [sancionesActivas, setSancionesActivas] =useState<number | null>(null);
  const [ratingMedio, setRatingMedio] =useState<number | null>(null);
  const [tiempoMedio, setTiempoMedio] =useState<number | null>(null);
  const [services, setServices] =useState<Service[]>([]);
  const [matching, setMatching] =useState({ edad: 50, distancia: 50, intereses: 50 });
  const [loadingServices, setLoadingServices] =useState(true);
  const [nuevoServicio, setNuevoServicio] =useState({ nombre: "", estado: "Activo" });
  type LogEntry = { id: number; mensaje: string; fecha: string };
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [usuariosData, setUsuariosData] =useState<User[]>([]);
  const [denunciasData, setDenunciasData] =useState<Report[]>([]);
  const [sancionesData, setSancionesData] =useState<Sanction[]>([]);
  const [matchesData, setMatchesData] =useState<Match[]>([]);
  const [tokensData, setTokensData] =useState<TokenTransaction[]>([]);

  const realtimeContext = useRealtime();
  const adminAlert = realtimeContext?.adminAlert;

  // Protección de rutas - verificar autenticación y permisos de admin
  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push('/auth/login');
        return;
      }
      if (user.role !== 'admin') {
        router.push('/user/dashboard');
        return;
      }
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    if (adminAlert) {
      // Mostrar banner o modal de alerta admin
      alert(`Alerta admin: ${adminAlert}`);
    }
  }, [adminAlert]);

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data: User[]) => {
        setUsuarios(data.length);
        setUsuariosActivos(data.filter((u: User) => u.actividad === "Alta").length);
        setRatingMedio(4.7); // Simulado
        setTiempoMedio(32); // Simulado (minutos)
        setUsuariosData(data);
      });
    fetch("/api/reports")
      .then((res) => res.json())
      .then((data: Report[]) => {
        setDenunciasPendientes(data.filter((d: Report) => d.estado === "Pendiente").length);
        setDenunciasMes(data.length);
        setDenunciasData(data);
      });
    fetch("/api/sanctions")
      .then((res) => res.json())
      .then((data: Sanction[]) => {
        setSancionesActivas(data.filter((s: Sanction) => s.estado === "Activa").length);
        setSancionesData(data);
      });
    fetch("/api/matches")
      .then((res) => res.json())
      .then((data: Match[]) => setMatchesData(data));
    fetch("/api/tokens")
      .then((res) => res.json())
      .then((data: TokenTransaction[]) => setTokensData(data));
    fetch("/api/services")
      .then((res) => res.json())
      .then((data: Service[]) => {
        setServices(data);
        setLoadingServices(false);
      });
  }, []);

  // Actualizar estado de servicio
  const cambiarEstadoServicio = async (id: string, estado: string) => {
    await fetch("/api/services", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, estado })
    });
    const res = await fetch("/api/services");
    setServices(await res.json());
    setLogs((prev) => [
      { id: Date.now(), mensaje: `Servicio actualizado: ${id} → ${estado}`, fecha: new Date().toLocaleString() },
      ...prev
    ]);
  };

  // Añadir nuevo servicio
  const agregarServicio = async (e: React.FormEvent) => {
    e.preventDefault();
    const nuevo = { ...nuevoServicio, id: Date.now().toString() };
    const actualizados = [...services, nuevo];
    setServices(actualizados);
    setNuevoServicio({ nombre: "", estado: "Activo" });
    setLogs((prev) => [
      { id: Date.now(), mensaje: `Nuevo servicio añadido: ${nuevo.nombre}`, fecha: new Date().toLocaleString() },
      ...prev
    ]);
    // Simulación: en un backend real, aquí harías un POST a la API
  };

  return (
    <>
      {/* Loading state mientras se verifica autenticación */}
      {isLoading && (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-900 via-primary-800 to-accent-900">
          <div className="flex flex-col items-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            <p className="text-white text-lg">Verificando permisos...</p>
          </div>
        </div>
      )}
      
      {/* Dashboard principal */}
      {!isLoading && user && user.role === 'admin' && (
        <main className="min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard de Administrador</h1>
      <p className="mb-4">Bienvenido al panel de administración. Desde aquí puedes gestionar usuarios, servicios y monitorear la app.</p>
      <AdminCharts
        usuarios={usuariosData}
        denuncias={denunciasData}
        sanciones={sancionesData}
        matches={matchesData}
        tokens={tokensData}
      />
      {/* Métricas */}
      <div className="flex flex-wrap gap-6 mb-8">
        <div className="bg-white rounded shadow p-6 flex flex-col items-center min-w-[180px]">
          <span className="text-3xl font-bold text-primary-600 mb-2">{usuarios ?? '...'}</span>
          <span className="text-gray-700">Usuarios registrados</span>
          <Link href="/admin/users" className="text-primary-600 text-sm mt-2 hover:underline">Ver gestión</Link>
        </div>
        <div className="bg-white rounded shadow p-6 flex flex-col items-center min-w-[180px]">
          <span className="text-3xl font-bold text-secondary-600 mb-2">{usuariosActivos ?? '...'}</span>
          <span className="text-gray-700">Usuarios activos hoy</span>
        </div>
        <div className="bg-white rounded shadow p-6 flex flex-col items-center min-w-[180px]">
          <span className="text-3xl font-bold text-accent-500 mb-2">{denunciasPendientes ?? '...'}</span>
          <span className="text-gray-700">Denuncias pendientes</span>
          <Link href="/admin/reports" className="text-primary-600 text-sm mt-2 hover:underline">Ver denuncias</Link>
        </div>
        <div className="bg-white rounded shadow p-6 flex flex-col items-center min-w-[180px]">
          <span className="text-3xl font-bold text-accent-400 mb-2">{denunciasMes ?? '...'}</span>
          <span className="text-gray-700">Denuncias este mes</span>
        </div>
        <div className="bg-white rounded shadow p-6 flex flex-col items-center min-w-[180px]">
          <span className="text-3xl font-bold text-accent-600 mb-2">{sancionesActivas ?? '...'}</span>
          <span className="text-gray-700">Sanciones activas</span>
          <Link href="/admin/sanctions" className="text-primary-600 text-sm mt-2 hover:underline">Ver sanciones</Link>
        </div>
        <div className="bg-white rounded shadow p-6 flex flex-col items-center min-w-[180px]">
          <span className="text-3xl font-bold text-secondary-600 mb-2">{ratingMedio ?? '...'}</span>
          <span className="text-gray-700">Rating medio</span>
        </div>
        <div className="bg-white rounded shadow p-6 flex flex-col items-center min-w-[180px]">
          <span className="text-3xl font-bold text-primary-400 mb-2">{tiempoMedio !== null ? tiempoMedio + ' min' : '...'}</span>
          <span className="text-gray-700">Tiempo medio en app</span>
        </div>
      </div>
      {/* Mini-panel de matching */}
      <section className="w-full max-w-2xl bg-white rounded shadow p-6 mb-8">
        <h2 className="text-lg font-bold mb-4">Ajuste rápido de Matching</h2>
        <div className="flex flex-col gap-4">
          <div>
            <label htmlFor="edad-slider" className="block font-semibold mb-1">Peso Edad: {matching.edad}%</label>
            <input id="edad-slider" type="range" min={0} max={100} value={matching.edad} onChange={e => setMatching(m => ({ ...m, edad: Number(e.target.value) }))} className="w-full" />
          </div>
          <div>
            <label htmlFor="distancia-slider" className="block font-semibold mb-1">Peso Distancia: {matching.distancia}%</label>
            <input id="distancia-slider" type="range" min={0} max={100} value={matching.distancia} onChange={e => setMatching(m => ({ ...m, distancia: Number(e.target.value) }))} className="w-full" />
          </div>
          <div>
            <label htmlFor="intereses-slider" className="block font-semibold mb-1">Peso Intereses: {matching.intereses}%</label>
            <input id="intereses-slider" type="range" min={0} max={100} value={matching.intereses} onChange={e => setMatching(m => ({ ...m, intereses: Number(e.target.value) }))} className="w-full" />
          </div>
          <Button variant="primary" className="mt-2">Probar configuración</Button>
        </div>
      </section>
      {/* Gestión de servicios */}
      <section className="w-full max-w-2xl bg-white rounded shadow p-6 mb-8">
        <h2 className="text-lg font-bold mb-4">Gestión de Servicios</h2>
        <form className="flex gap-4 mb-4" onSubmit={agregarServicio}>
          <input
            className="border p-2 rounded flex-1"
            placeholder="Nombre del nuevo servicio"
            value={nuevoServicio.nombre}
            onChange={e => setNuevoServicio(s => ({ ...s, nombre: e.target.value }))}
            required
          />
          <select
            className="border p-2 rounded"
            value={nuevoServicio.estado}
            onChange={e => setNuevoServicio(s => ({ ...s, estado: e.target.value }))}
            aria-label="Estado del servicio"
          >
            <option value="Activo">Activo</option>
            <option value="Mantenimiento">Mantenimiento</option>
          </select>
          <Button type="submit">Añadir</Button>
        </form>
        {loadingServices ? (
          <p>Cargando servicios...</p>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2">Servicio</th>
                <th className="p-2">Estado</th>
                <th className="p-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {services.map((s) => (
                <tr key={s.id} className="text-center border-t">
                  <td className="p-2">{s.nombre}</td>
                  <td className="p-2">{s.estado}</td>
                  <td className="p-2 flex gap-2 justify-center">
                    {s.estado !== "Activo" && (
                      <Button variant="primary" onClick={() => cambiarEstadoServicio(s.id, "Activo")}>Activar</Button>
                    )}
                    {s.estado !== "Mantenimiento" && (
                      <Button variant="secondary" onClick={() => cambiarEstadoServicio(s.id, "Mantenimiento")}>Mantenimiento</Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
      {/* Logs de actividad */}
      <section className="w-full max-w-2xl bg-white rounded shadow p-6 mb-8">
        <h2 className="text-lg font-bold mb-4">Logs de Actividad</h2>
        <ul className="divide-y divide-gray-200">
          {logs.map((log) => (
            <li key={log.id} className="py-2 text-sm flex justify-between">
              <span>{log.mensaje}</span>
              <span className="text-gray-400 ml-4">{log.fecha}</span>
            </li>
          ))}
        </ul>
      </section>
        </main>
      )}
    </>
  );
}