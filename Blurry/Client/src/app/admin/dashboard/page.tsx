"use client";

import Link from "next/link";
import Button from "@/components/Button";
import AdminCharts from "./Charts";
import ViewState from "@/components/ViewState";
import { User, Report, Sanction, Match, TokenTransaction, Service } from "@/types";
import { useRealtime } from '@/context/RealtimeContext';
import { useEffect, useState } from 'react';
import { useAuth } from "@/components/AuthContext";
import { useRouter } from 'next/navigation';
import { Activity, AlertTriangle, Gauge, ShieldAlert, Star, Timer, Users, Wrench } from "lucide-react";

type FeedbackItem = { rating?: number };
type ActivityLogItem = { metadata?: Record<string, unknown> };
type MetricCard = {
  label: string;
  value: number | string;
  hint: string;
  icon: typeof Users;
  tone: string;
  href?: string;
  cta?: string;
};

function getAuthHeaders(): Record<string, string> {
  const token = typeof window !== "undefined" ? localStorage.getItem("jwt-token") : null;
  return token ? { Authorization: `Bearer ${token}` } : {};
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
  const [feedbackData, setFeedbackData] = useState<FeedbackItem[]>([]);

  const realtimeContext = useRealtime();
  const adminAlert = realtimeContext?.adminAlert;
  const serviciosMantenimiento = services.filter((service) => service.estado === "Mantenimiento").length;

  const metricCards: MetricCard[] = [
    {
      label: "Usuarios registrados",
      value: usuarios ?? "...",
      hint: "Total acumulado",
      href: "/admin/users",
      cta: "Gestionar",
      icon: Users,
      tone: "text-primary-300",
    },
    {      label: "Moderacion de Chat",
      value: "...",
      hint: "Auditorías de la comunidad",
      href: "/admin/chat-monitor",
      cta: "Monitorear",
      icon: AlertTriangle,
      tone: "text-rose-400",
    },
    {      label: "Usuarios activos",
      value: usuariosActivos ?? "...",
      hint: "Estado operativo",
      icon: Activity,
      tone: "text-emerald-300",
    },
    {
      label: "Denuncias pendientes",
      value: denunciasPendientes ?? "...",
      hint: "Requieren revision",
      href: "/admin/reports",
      cta: "Revisar",
      icon: AlertTriangle,
      tone: "text-amber-300",
    },
    {
      label: "Sanciones activas",
      value: sancionesActivas ?? "...",
      hint: "Casos abiertos",
      href: "/admin/sanctions",
      cta: "Auditar",
      icon: ShieldAlert,
      tone: "text-rose-300",
    },
    {
      label: "Rating medio",
      value: ratingMedio ?? "...",
      hint: "Satisfaccion global",
      icon: Star,
      tone: "text-violet-300",
    },
    {
      label: "Tiempo medio",
      value: tiempoMedio !== null ? `${tiempoMedio} min` : "...",
      hint: "Duracion de sesiones",
      icon: Timer,
      tone: "text-cyan-300",
    },
    {
      label: "Matches registrados",
      value: matchesData.length,
      hint: "Actividad social",
      icon: Gauge,
      tone: "text-sky-300",
    },
    {
      label: "Servicios en mantenimiento",
      value: serviciosMantenimiento,
      hint: "Estado de plataforma",
      icon: Wrench,
      tone: "text-orange-300",
    },
  ];

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
    const authHeaders = getAuthHeaders();

    fetch("/api/users", { headers: authHeaders })
      .then((res) => res.json())
      .then((data: User[]) => {
        const rows = Array.isArray(data) ? data : [];
        setUsuarios(rows.length);
        setUsuariosActivos(
          rows.filter((u: User) => String((u as unknown as { estado?: string }).estado || "").toLowerCase() !== "suspendido").length
        );
        setUsuariosData(rows);
      });

    fetch("/api/feedback", { headers: authHeaders })
      .then((res) => res.json())
      .then((data: FeedbackItem[]) => {
        const rows = Array.isArray(data) ? data : [];
        setFeedbackData(rows);
        const ratings = rows
          .map((item) => Number(item?.rating ?? 0))
          .filter((value) => Number.isFinite(value) && value > 0);

        if (!ratings.length) {
          setRatingMedio(null);
          return;
        }

        const avg = ratings.reduce((acc, value) => acc + value, 0) / ratings.length;
        setRatingMedio(Number(avg.toFixed(2)));
      })
      .catch(() => setRatingMedio(null));

    fetch("/api/activity-logs", { headers: authHeaders })
      .then((res) => res.json())
      .then((data: ActivityLogItem[]) => {
        const durations = (Array.isArray(data) ? data : [])
          .map((item) => {
            const metadata = (item?.metadata || {}) as Record<string, unknown>;
            const raw = metadata.durationMinutes ?? metadata.duration_minutes ?? metadata.sessionMinutes;
            return Number(raw);
          })
          .filter((value) => Number.isFinite(value) && value > 0);

        if (!durations.length) {
          setTiempoMedio(null);
          return;
        }

        const avg = durations.reduce((acc, value) => acc + value, 0) / durations.length;
        setTiempoMedio(Math.round(avg));
      })
      .catch(() => setTiempoMedio(null));

    fetch("/api/reports", { headers: authHeaders })
      .then((res) => res.json())
      .then((data: Report[]) => {
        const rows = Array.isArray(data) ? data : [];
        setDenunciasPendientes(rows.filter((d: Report) => d.estado === "Pendiente").length);
        setDenunciasMes(rows.length);
        setDenunciasData(rows);
      });
    fetch("/api/sanctions", { headers: authHeaders })
      .then((res) => res.json())
      .then((data: Sanction[]) => {
        const rows = Array.isArray(data) ? data : [];
        setSancionesActivas(rows.filter((s: Sanction) => s.estado === "Activa").length);
        setSancionesData(rows);
      });
    fetch("/api/matches", { headers: authHeaders })
      .then((res) => res.json())
      .then((data: Match[]) => setMatchesData(Array.isArray(data) ? data : []));
    fetch("/api/tokens", { headers: authHeaders })
      .then((res) => res.json())
      .then((data: TokenTransaction[]) => setTokensData(Array.isArray(data) ? data : []));
    fetch("/api/services", { headers: authHeaders })
      .then((res) => res.json())
      .then((data: Service[]) => {
        setServices(Array.isArray(data) ? data : []);
        setLoadingServices(false);
      })
      .catch(() => setLoadingServices(false));
  }, []);

  // Actualizar estado de servicio
  const cambiarEstadoServicio = async (id: string, estado: string) => {
    const authHeaders = getAuthHeaders();
    await fetch("/api/services", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...authHeaders,
      },
      body: JSON.stringify({ id, estado })
    });
    const res = await fetch("/api/services", {
      headers: authHeaders,
    });
    setServices(await res.json());
    setLogs((prev) => [
      { id: Date.now() + Math.random(), mensaje: `Servicio actualizado: ${id} → ${estado}`, fecha: new Date().toLocaleString() },
      ...prev
    ]);
  };

  // Añadir nuevo servicio
  const agregarServicio = async (e: React.FormEvent) => {
    e.preventDefault();
    const authHeaders = getAuthHeaders();

    const res = await fetch("/api/services", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...authHeaders,
      },
      body: JSON.stringify(nuevoServicio),
    });

    if (!res.ok) {
      return;
    }

    const refetch = await fetch("/api/services", {
      headers: authHeaders,
    });
    const refreshed = await refetch.json().catch(() => []);
    setServices(Array.isArray(refreshed) ? refreshed : []);
    setNuevoServicio({ nombre: "", estado: "Activo" });
    setLogs((prev) => [
      { id: Date.now() + Math.random(), mensaje: `Nuevo servicio añadido: ${nuevoServicio.nombre}`, fecha: new Date().toLocaleString() },
      ...prev
    ]);
  };

  return (
    <>
      {/* Loading state mientras se verifica autenticación */}
      {isLoading && (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-900 via-primary-800 to-accent-900">
          <ViewState variant="loading" title="Verificando permisos" description="Comprobando acceso de administrador." className="max-w-md border-white/20 bg-black/20" />
        </div>
      )}
      
      {/* Dashboard principal */}
      {!isLoading && user && user.role === 'admin' && (
        <main className="relative min-h-screen w-full max-w-7xl mx-auto px-4 py-6 text-zinc-200">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,_rgba(59,130,246,0.16),_transparent_45%),radial-gradient(circle_at_top_left,_rgba(236,72,153,0.14),_transparent_42%)]" />

          <section className="rounded-3xl border border-zinc-800/80 bg-zinc-950/70 p-6 shadow-2xl shadow-black/40 backdrop-blur">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-zinc-500">Control Center</p>
                <h1 className="mt-2 text-3xl font-black tracking-tight text-white sm:text-4xl">Dashboard de Administracion</h1>
                <p className="mt-2 max-w-3xl text-sm text-zinc-400 sm:text-base">
                  Vista unificada para monitorear riesgo, salud operativa y actividad de la comunidad en tiempo real.
                </p>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900/70 px-4 py-2 text-xs font-bold uppercase tracking-wider text-zinc-300">
                <span className={`h-2.5 w-2.5 rounded-full ${adminAlert ? "bg-rose-400" : "bg-emerald-400"}`} />
                {adminAlert ? "Alerta en curso" : "Sistema estable"}
              </div>
            </div>
          </section>

          <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {metricCards.map((card) => {
              const Icon = card.icon;
              return (
                <article key={card.label} className="rounded-2xl border border-zinc-800/70 bg-zinc-900/70 p-5 shadow-lg shadow-black/20 backdrop-blur transition-colors hover:border-zinc-700">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-[11px] font-black uppercase tracking-[0.16em] text-zinc-500">{card.label}</span>
                    <Icon className={`h-4 w-4 ${card.tone}`} />
                  </div>
                  <p className={`text-3xl font-black tracking-tight ${card.tone}`}>{card.value}</p>
                  <div className="mt-3 flex items-center justify-between gap-2">
                    <p className="text-xs text-zinc-500">{card.hint}</p>
                    {card.href ? (
                      <Link href={card.href} className="text-xs font-bold uppercase tracking-wide text-primary-300 hover:text-primary-200">
                        {card.cta}
                      </Link>
                    ) : null}
                  </div>
                </article>
              );
            })}
          </section>

          <section className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-12">
            <div className="space-y-6 xl:col-span-8">
              <div className="rounded-2xl border border-zinc-800/70 bg-zinc-900/60 p-4 shadow-lg shadow-black/20 backdrop-blur sm:p-5">
                <AdminCharts
                  usuarios={usuariosData}
                  denuncias={denunciasData}
                  sanciones={sancionesData}
                  matches={matchesData}
                  tokens={tokensData}
                  feedback={feedbackData}
                />
              </div>

              <section className="rounded-2xl border border-zinc-800/70 bg-zinc-900/70 p-6 shadow-lg shadow-black/20 backdrop-blur">
                <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                  <h2 className="text-lg font-black text-white">Gestion de Servicios</h2>
                  <p className="text-xs uppercase tracking-wide text-zinc-500">Ops and uptime</p>
                </div>

                <form className="mb-4 flex flex-col gap-3 sm:flex-row sm:gap-4" onSubmit={agregarServicio}>
                  <input
                    className="flex-1 rounded-xl border border-zinc-700 bg-zinc-950/70 p-2 text-zinc-100 placeholder:text-zinc-500"
                    placeholder="Nombre del nuevo servicio"
                    value={nuevoServicio.nombre}
                    onChange={e => setNuevoServicio(s => ({ ...s, nombre: e.target.value }))}
                    required
                  />
                  <select
                    className="rounded-xl border border-zinc-700 bg-zinc-950/70 p-2 text-zinc-100"
                    value={nuevoServicio.estado}
                    onChange={e => setNuevoServicio(s => ({ ...s, estado: e.target.value }))}
                    aria-label="Estado del servicio"
                  >
                    <option value="Activo">Activo</option>
                    <option value="Mantenimiento">Mantenimiento</option>
                  </select>
                  <Button type="submit">Anadir</Button>
                </form>

                {loadingServices ? (
                  <ViewState variant="loading" title="Cargando servicios" description="Sincronizando estado operativo." className="w-full" />
                ) : services.length === 0 ? (
                  <ViewState variant="empty" title="Sin servicios configurados" description="Agrega un servicio para comenzar a monitorear estado." className="w-full" />
                ) : (
                  <div className="w-full overflow-x-auto">
                    <table className="w-full min-w-[520px]">
                      <thead>
                        <tr className="bg-zinc-800/80 text-zinc-200">
                          <th className="p-2">Servicio</th>
                          <th className="p-2">Estado</th>
                          <th className="p-2">Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {services.map((s) => (
                          <tr key={s.id} className="border-t border-zinc-800 text-center text-zinc-300">
                            <td className="p-2">{s.nombre}</td>
                            <td className="p-2">{s.estado}</td>
                            <td className="p-2">
                              <div className="flex flex-wrap justify-center gap-2">
                                {s.estado !== "Activo" && (
                                  <Button variant="primary" onClick={() => cambiarEstadoServicio(s.id, "Activo")}>Activar</Button>
                                )}
                                {s.estado !== "Mantenimiento" && (
                                  <Button variant="secondary" onClick={() => cambiarEstadoServicio(s.id, "Mantenimiento")}>Mantenimiento</Button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>
            </div>

            <div className="space-y-6 xl:col-span-4">
              <section className="rounded-2xl border border-zinc-800/70 bg-zinc-900/70 p-6 shadow-lg shadow-black/20 backdrop-blur">
                <h2 className="mb-4 text-lg font-black text-white">Ajuste rapido de Matching</h2>
                <div className="flex flex-col gap-4">
                  <div>
                    <label htmlFor="edad-slider" className="mb-1 block text-xs font-bold uppercase tracking-wide text-zinc-400">Edad · {matching.edad}%</label>
                    <input id="edad-slider" type="range" min={0} max={100} value={matching.edad} onChange={e => setMatching(m => ({ ...m, edad: Number(e.target.value) }))} className="w-full accent-primary-500" />
                  </div>
                  <div>
                    <label htmlFor="distancia-slider" className="mb-1 block text-xs font-bold uppercase tracking-wide text-zinc-400">Distancia · {matching.distancia}%</label>
                    <input id="distancia-slider" type="range" min={0} max={100} value={matching.distancia} onChange={e => setMatching(m => ({ ...m, distancia: Number(e.target.value) }))} className="w-full accent-primary-500" />
                  </div>
                  <div>
                    <label htmlFor="intereses-slider" className="mb-1 block text-xs font-bold uppercase tracking-wide text-zinc-400">Intereses · {matching.intereses}%</label>
                    <input id="intereses-slider" type="range" min={0} max={100} value={matching.intereses} onChange={e => setMatching(m => ({ ...m, intereses: Number(e.target.value) }))} className="w-full accent-primary-500" />
                  </div>
                  <Button variant="primary" className="mt-2 w-full">Probar configuracion</Button>
                </div>
              </section>

              <section className="rounded-2xl border border-zinc-800/70 bg-zinc-900/70 p-6 shadow-lg shadow-black/20 backdrop-blur">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-black text-white">Logs de Actividad</h2>
                  <span className="text-xs uppercase tracking-wide text-zinc-500">{logs.length} eventos</span>
                </div>
                {logs.length === 0 ? (
                  <p className="text-sm text-zinc-500">Aun no hay eventos recientes.</p>
                ) : (
                  <ul className="space-y-3">
                    {logs.slice(0, 8).map((log) => (
                      <li key={log.id} className="rounded-xl border border-zinc-800/80 bg-zinc-950/70 p-3">
                        <p className="text-sm text-zinc-200">{log.mensaje}</p>
                        <p className="mt-1 text-xs text-zinc-500">{log.fecha}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            </div>
          </section>
        </main>
      )}
    </>
  );
}