"use client";

import { useNotifications } from "@/components/NotificationsContext";
import { useEffect, useRef, useState } from 'react';
import { useRealtime } from '@/context/RealtimeContext';
import { ShieldAlert, CheckCircle2, Clock, Activity, FileWarning } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/components/AuthContext";

type UserReportItem = {
  id: string;
  usuario: string;
  motivo: string;
  fecha: string;
  estado: string;
  detalles: string;
};

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" ? (value as Record<string, unknown>) : {};
}

export default function UserReportsPage() {
  const { user: currentUser, isLoading: authLoading } = useAuth();
  const userId = currentUser?.id;
  const [reports, setReports] = useState<UserReportItem[]>([]);
  const prevStatesRef = useRef<Record<string, string>>({});
  const { showToast } = useNotifications();
  const realtimeContext = useRealtime();
  const userStatus = realtimeContext?.userStatus;
  const [loading, setLoading] = useState(true);
  const currentUserStatus = userId ? userStatus?.[String(userId)] : undefined;

  const normalizeReport = (raw: unknown): UserReportItem => {
    const report = asRecord(raw);
    const createdAt = report.created_at ?? report.fecha;
    return {
      id: String(report.id ?? ""),
      usuario: String(report.reported_user_id ?? report.usuario ?? ""),
      motivo: String(report.type ?? report.motivo ?? "Sin motivo"),
      fecha: createdAt ? new Date(String(createdAt)).toLocaleString() : "-",
      estado: String(report.status ?? report.estado ?? "Pendiente"),
      detalles: String(report.admin_notes ?? report.detalles ?? ""),
    };
  };

  const getStatusInfo = (estado: string) => {
    const s = estado?.toLowerCase() || '';
    if (s.includes("resuelt")) return { color: "text-emerald-400", border: "border-emerald-500/30", bg: "bg-emerald-500/10", icon: <CheckCircle2 className="w-5 h-5" /> };
    if (s.includes("pendient")) return { color: "text-amber-400", border: "border-amber-500/30", bg: "bg-amber-500/10", icon: <Clock className="w-5 h-5" /> };
    return { color: "text-primary-400", border: "border-primary-500/30", bg: "bg-primary-500/10", icon: <Activity className="w-5 h-5" /> };
  };

  useEffect(() => {
    if (authLoading || !userId) {
      return;
    }

    let cancelled = false;
    const controller = new AbortController();

    const loadReports = async () => {
      try {
        if (!cancelled) {
          setLoading(true);
        }
        const token = typeof window !== "undefined" ? localStorage.getItem("jwt-token") : null;
        const authHeaders: Record<string, string> = token ? { Authorization: `Bearer ${token}` } : {};
        const res = await fetch("/api/reports", {
          signal: controller.signal,
          headers: authHeaders,
        });
        const data = res.ok ? await res.json() : [];
        const normalized = Array.isArray(data) ? data.map(normalizeReport) : [];
        const myReports = normalized.filter((r: UserReportItem) => {
          const reportUser = String(r.usuario || "").toLowerCase();
          const targetUser = String(userId);
          return (
            reportUser === targetUser ||
            reportUser.includes(targetUser) ||
            reportUser.includes(`id ${targetUser}`)
          );
        });

        if (!cancelled) {
          setReports(myReports);
        }

        if (!cancelled) {
          myReports.forEach((r: UserReportItem) => {
            if (
              prevStatesRef.current[r.id] &&
              prevStatesRef.current[r.id] !== r.estado &&
              r.estado.toLowerCase().includes("resuelt")
            ) {
              showToast(`Tu reporte '${r.motivo}' ha sido resuelto.`, "success");
            }
          });
        }

        if (!cancelled) {
          prevStatesRef.current = Object.fromEntries(
            myReports.map((r: UserReportItem) => [r.id, r.estado]),
          );
        }
      } catch (error) {
        if (!(error instanceof DOMException && error.name === "AbortError")) {
          console.error("Error cargando reportes:", error);
          if (!cancelled) {
            setReports([]);
          }
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadReports();
    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [authLoading, showToast, userId]);

  return (
    <main className="min-h-screen py-12 px-4 bg-zinc-950 text-slate-200 relative overflow-hidden flex flex-col items-center">
      {/* Background FX */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-900/10 via-zinc-950 to-zinc-950 -z-10" />
      <div className="absolute top-20 left-10 w-96 h-96 bg-primary-600/10 rounded-full blur-[120px] -z-10 animate-pulse-slow" />
      
      <div className="w-full max-w-4xl space-y-8 z-10">
        
        {/* Header */}
        <div className="glass-panel p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden group rounded-3xl border border-zinc-800/60">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-primary-500/10 rounded-2xl border border-primary-500/20">
               <ShieldAlert className="w-10 h-10 text-primary-500" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-white tracking-tight uppercase flex items-center gap-3">
                REGISTRO DE <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-primary-600">INCIDENCIAS</span>
              </h1>
              <p className="text-zinc-400 text-sm font-medium mt-1">Monitorea el estado de tus tickets de soporte y reportes al sistema.</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 px-4 py-2 bg-zinc-900/80 rounded-full border border-zinc-800">
             <div className={`w-2.5 h-2.5 rounded-full animate-pulse ${currentUserStatus === 'online' ? 'bg-emerald-500 shadow-[0_0_10px_#10b981]' : 'bg-zinc-600'}`} />
             <span className="text-xs font-bold text-zinc-300 uppercase tracking-wider">{currentUserStatus || 'SISTEMA ACTIVO'}</span>
          </div>
        </div>

        {/* Content */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-zinc-800/50 bg-zinc-900/40 backdrop-blur-md">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div 
                key="loading"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-20"
              >
                 <div className="w-12 h-12 border-4 border-zinc-800 border-t-primary-500 rounded-full animate-spin shadow-neon" />
                 <p className="mt-4 text-primary-400 font-bold tracking-widest text-xs uppercase">Conectando con Overwatch...</p>
              </motion.div>
            ) : reports.length === 0 ? (
              <motion.div 
                key="empty"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center py-16 px-4 text-center border border-dashed border-zinc-800 rounded-2xl bg-black/20"
              >
                <FileWarning className="w-16 h-16 text-zinc-700 mb-4 opacity-50" />
                <h3 className="text-xl font-black text-zinc-300 mb-2">SISTEMA LIMPIO</h3>
                <p className="text-zinc-500 max-w-sm text-sm">No tienes incidencias registradas en la base de datos actual. Tu expediente está impecable.</p>
              </motion.div>
            ) : (
              <motion.div key="list" className="space-y-4" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
                {reports.map((r: UserReportItem) => {
                  const status = getStatusInfo(r.estado);
                  return (
                    <motion.div 
                      variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}
                      key={r.id} 
                      className={`group flex flex-col sm:flex-row sm:items-center justify-between p-5 bg-zinc-900 border ${status.border} rounded-2xl hover:bg-zinc-800 transition-all shadow-lg relative overflow-hidden`}
                    >
                      <div className={`absolute left-0 top-0 bottom-0 w-1 ${status.bg.replace('bg-', 'bg-').split('/')[0]} opacity-50 group-hover:opacity-100 transition-opacity`} />
                      
                      <div className="flex-1 pl-4">
                        <div className="flex items-center gap-3 mb-2">
                           <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-black uppercase tracking-wider ${status.bg} ${status.color}`}>
                             {status.icon} {r.estado}
                           </span>
                           <span className="text-zinc-500 text-xs font-bold">{r.fecha}</span>
                        </div>
                        <h4 className="font-black text-xl text-white tracking-tight leading-tight">{r.motivo}</h4>
                        {r.detalles && <p className="text-sm text-zinc-400 mt-2 line-clamp-2">{r.detalles}</p>}
                      </div>
                      
                      <div className="mt-4 sm:mt-0 sm:pl-6 text-right">
                         <div className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-1">ID TICKET</div>
                         <div className="text-sm font-mono text-zinc-400 bg-black/40 px-3 py-1.5 rounded-lg border border-zinc-800">#{r.id.toString().padStart(6, '0')}</div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
