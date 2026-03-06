"use client";

import NotificationItem from "@/components/NotificationItem";
import { useNotifications } from "@/components/NotificationsContext";
import { Notification } from "@/types";
import { useEffect, useRef, useState } from 'react';
import { Bell, Filter, Zap } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { useAuth } from "@/components/AuthContext";

function groupByType(notifications: Notification[]): Record<string, Notification[]> {
  return notifications.reduce((acc, n) => {
    const type = n.type || "sistema";
    acc[type] = acc[type] || [];
    acc[type].push(n);
    return acc;
  }, {} as Record<string, Notification[]>);
}

export default function NotificationsPage() {
  const { user: currentUser, isLoading: authLoading } = useAuth();
  const userId = currentUser?.id;
  const { showToast } = useNotifications();
  const [localNotifications, setLocalNotifications] = useState<Notification[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [markingAllRead, setMarkingAllRead] = useState(false);
  const [markReadInFlightIds, setMarkReadInFlightIds] = useState<Set<number>>(new Set());
  const [deleteInFlightIds, setDeleteInFlightIds] = useState<Set<number>>(new Set());
  const markReadInFlightRef = useRef<Set<number>>(new Set());
  const deleteInFlightRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    const markReadInFlight = markReadInFlightRef.current;
    const deleteInFlight = deleteInFlightRef.current;

    return () => {
      markReadInFlight.clear();
      deleteInFlight.clear();
    };
  }, []);

  const beginMarkReadInFlight = (id: number) => {
    markReadInFlightRef.current.add(id);
    setMarkReadInFlightIds((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  };

  const endMarkReadInFlight = (id: number) => {
    markReadInFlightRef.current.delete(id);
    setMarkReadInFlightIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  const beginBatchMarkReadInFlight = (ids: number[]) => {
    ids.forEach((id) => markReadInFlightRef.current.add(id));
    setMarkReadInFlightIds((prev) => {
      const next = new Set(prev);
      ids.forEach((id) => next.add(id));
      return next;
    });
  };

  const endBatchMarkReadInFlight = (ids: number[]) => {
    ids.forEach((id) => markReadInFlightRef.current.delete(id));
    setMarkReadInFlightIds((prev) => {
      const next = new Set(prev);
      ids.forEach((id) => next.delete(id));
      return next;
    });
  };

  const beginDeleteInFlight = (id: number) => {
    deleteInFlightRef.current.add(id);
    setDeleteInFlightIds((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  };

  const endDeleteInFlight = (id: number) => {
    deleteInFlightRef.current.delete(id);
    setDeleteInFlightIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  const getAuthHeader = (): Record<string, string> => {
    const token = typeof window !== "undefined" ? localStorage.getItem("jwt-token") : null;
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const getJsonAuthHeaders = (): Record<string, string> => ({
    "Content-Type": "application/json",
    ...getAuthHeader(),
  });

  const patchNotificationRead = async (id: number) => {
    const res = await fetch("/api/notifications", {
      method: "PATCH",
      headers: getJsonAuthHeaders(),
      body: JSON.stringify({ id, read: true }),
    });

    if (!res.ok) {
      throw new Error(`Error ${res.status} actualizando notificacion ${id}`);
    }
  };

  useEffect(() => {
    let cancelled = false;

    if (authLoading || !userId) {
      return () => {
        cancelled = true;
      };
    }

    fetch(`/api/notifications?userId=${encodeURIComponent(String(userId))}`, {
      headers: getAuthHeader(),
    })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(`Error ${res.status} cargando notificaciones`);
        }
        return res.json();
      })
      .then((data: unknown) => {
        if (!cancelled) {
          setLocalNotifications(Array.isArray(data) ? (data as Notification[]) : []);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setLocalNotifications([]);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [authLoading, userId]);

  const handleMarkRead = async (id: number) => {
    const target = localNotifications.find((notif: Notification) => notif.id === id);
    if (!target || target.read) {
      return;
    }

    if (markReadInFlightRef.current.has(id)) {
      return;
    }

    beginMarkReadInFlight(id);
    try {
      await patchNotificationRead(id);

      setLocalNotifications((n: Notification[]) => n.map((notif: Notification) => 
        notif.id === id ? { ...notif, read: true } : notif
      ));
    } catch {
      showToast("No se pudo marcar la notificacion como leida.", "error");
    } finally {
      endMarkReadInFlight(id);
    }
  };

  const handleMarkAllRead = async () => {
    if (markingAllRead) {
      return;
    }

    const unreadIds = localNotifications
      .filter((notif: Notification) => !notif.read && !markReadInFlightRef.current.has(notif.id))
      .map((notif: Notification) => notif.id);

    if (unreadIds.length === 0) {
      return;
    }

    try {
      setMarkingAllRead(true);
      beginBatchMarkReadInFlight(unreadIds);
      const results = await Promise.allSettled(
        unreadIds.map(async (id) => {
          await patchNotificationRead(id);
          return id;
        })
      );

      const successfulIds = new Set<number>(
        results
          .filter((result): result is PromiseFulfilledResult<number> => result.status === "fulfilled")
          .map((result) => result.value)
      );

      if (successfulIds.size === 0) {
        showToast("No se pudo marcar ninguna notificacion como leida.", "error");
        return;
      }

      setLocalNotifications((current: Notification[]) =>
        current.map((notif: Notification) =>
          successfulIds.has(notif.id) ? { ...notif, read: true } : notif
        )
      );

      const failedCount = unreadIds.length - successfulIds.size;
      if (failedCount === 0) {
        showToast("Todas las notificaciones fueron marcadas como leidas.", "success");
      } else {
        showToast(`Se marcaron ${successfulIds.size} notificaciones, ${failedCount} fallaron.`, "info");
      }
    } finally {
      endBatchMarkReadInFlight(unreadIds);
      setMarkingAllRead(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (deleteInFlightRef.current.has(id)) {
      return;
    }

    beginDeleteInFlight(id);
    try {
      const res = await fetch("/api/notifications", {
        method: "DELETE",
        headers: getJsonAuthHeaders(),
        body: JSON.stringify({ id })
      });

      if (!res.ok) {
        throw new Error(`Error ${res.status} eliminando notificacion`);
      }

      setLocalNotifications((n: Notification[]) => n.filter((notif: Notification) => notif.id !== id));
    } catch {
      showToast("No se pudo eliminar la notificacion.", "error");
    } finally {
      endDeleteInFlight(id);
    }
  };

  const filteredNotifications = activeFilter === "all" 
    ? localNotifications 
    : localNotifications.filter(n => n.type === activeFilter);
    
  const grouped = groupByType(filteredNotifications);
  const unreadCount = localNotifications.filter(n => !n.read).length;

  return (
    <main className="min-h-screen flex flex-col py-12 px-4 bg-zinc-950 text-slate-200 relative z-10 w-full animate-fade-in pb-20">
      
      {/* Dynamic Backgrounds */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-900/10 via-zinc-950 to-zinc-950 -z-10" />

      <div className="w-full max-w-4xl mx-auto space-y-8">
        
        {/* Header Panel */}
        <div className="glass-panel p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden group rounded-3xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 rounded-full blur-[100px] -z-10 group-hover:bg-primary-500/20 transition-all duration-700" />
          
          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-white flex items-center gap-3 tracking-tight mb-2">
              <div className="relative">
                <Bell className="w-8 h-8 sm:w-10 sm:h-10 text-primary-500 animate-pulse-slow" /> 
                {unreadCount > 0 && (
                  <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-[0_0_10px_rgba(239,68,68,0.6)] animate-bounce">
                    {unreadCount}
                  </span>
                )}
              </div>
              CENTRAL DE <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-600 drop-shadow-sm">ALERTAS</span>
            </h1>
            <p className="text-zinc-400 text-sm sm:text-lg font-medium">Mantente al tanto de lo que sucede en el Nexus.</p>
          </div>

          {unreadCount > 0 && (
            <button 
              onClick={handleMarkAllRead}
              disabled={markingAllRead}
              className="gamified w-full sm:w-auto px-5 py-2.5 rounded-xl border border-primary-500/30 font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 transition-all hover:bg-primary-500/10 hover:shadow-neon text-primary-400 shrink-0 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <Zap className="w-4 h-4 fill-current" />
              {markingAllRead ? "Sincronizando..." : "Marcar todo como leído"}
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 border-b border-zinc-800/80 pb-4">
           {['all', 'sistema', 'recompensa', 'actividad', 'alerta'].map(filter => (
             <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border ${
                  activeFilter === filter 
                  ? 'bg-zinc-800 text-white border-zinc-600 shadow-md' 
                  : 'bg-transparent text-zinc-500 border-transparent hover:text-zinc-300 hover:bg-zinc-900'
                }`}
             >
                {filter === 'all' ? 'Todas' : filter}
             </button>
           ))}
        </div>

        {/* Notifications List */}
        <div className="space-y-8">
          {Object.keys(grouped).length === 0 ? (
            <div className="glass-panel p-12 rounded-3xl border border-zinc-800/50 flex flex-col items-center justify-center text-center">
               <Bell className="w-16 h-16 text-zinc-700 mb-4 opacity-50" />
               <h3 className="text-xl font-bold text-white mb-2">Bandeja Vacía</h3>
               <p className="text-zinc-500">No hay alertas en esta categoría.</p>
            </div>
          ) : (
            Object.entries(grouped).map(([type, notifs]) => (
              <div key={type} className="animate-fade-in">
                <h2 className="text-sm font-black uppercase tracking-widest text-zinc-500 mb-4 flex items-center gap-2">
                   <Filter className="w-4 h-4" /> Categoría: <span className="text-primary-400">{type}</span>
                </h2>
                <div className="flex flex-col gap-0">
                  <AnimatePresence>
                    {notifs.map((n) => (
                      <NotificationItem
                        key={n.id}
                        notification={n}
                        onMarkRead={() => handleMarkRead(n.id)}
                        onDelete={() => handleDelete(n.id)}
                        markReadLoading={markReadInFlightIds.has(n.id) || deleteInFlightIds.has(n.id)}
                        deleteLoading={deleteInFlightIds.has(n.id) || markReadInFlightIds.has(n.id)}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </main>
  );
} 