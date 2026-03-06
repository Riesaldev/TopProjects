"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Coins, 
  Calendar, 
  Bell, 
  Trophy, 
  Video,
  Target,
  Flame,
  ShoppingBag,
  ShieldAlert,
  UserCircle,
  Activity
} from "lucide-react";
import Button from "@/components/Button";
import Card from "@/components/Card";
import ChartsUser from "./ChartsUser";
import AchievementsUser from "./AchievementsUser";
import { useNotifications } from "@/components/NotificationsContext";
import { User, Purchase, AgendaEvent, Notification, Note, ChatMessage, Achievement, UserAchievement, Mission, UserMission, Streak } from "@/types";
import { useEffect, useState, useMemo } from 'react';
import { useAuth } from "@/components/AuthContext";
import ViewState from "@/components/ViewState";

function getWeek(dateStr: string) {
  const d = new Date(dateStr);
  const year = d.getFullYear();
  const week = Math.ceil(((d.getTime() - new Date(year, 0, 1).getTime()) / 86400000 + new Date(year, 0, 1).getDay() + 1) / 7);
  return `${year}-W${week}`;
}

function getProgressBarWidth(progressPercentage: number): string {
  if (progressPercentage >= 100) return "w-full";
  if (progressPercentage >= 90) return "w-11/12";
  if (progressPercentage >= 80) return "w-4/5";
  if (progressPercentage >= 75) return "w-3/4";
  if (progressPercentage >= 60) return "w-3/5";
  if (progressPercentage >= 50) return "w-1/2";
  if (progressPercentage >= 40) return "w-2/5";
  if (progressPercentage >= 25) return "w-1/4";
  if (progressPercentage >= 20) return "w-1/5";
  if (progressPercentage >= 10) return "w-1/12";
  return "w-0";
}

interface UserDashboardProps {
  userId: number;
}

export default function UserDashboard() {
  const { user: currentUser, isLoading: authLoading } = useAuth();
  const userId = currentUser?.id;

  const [user, setUser] = useState<User | null>(null);
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [agenda, setAgenda] = useState<AgendaEvent[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [chats, setChats] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [allAchievements, setAllAchievements] = useState<Achievement[]>([]);
  const [userAchievements, setUserAchievements] = useState<UserAchievement[]>([]);
  const { showToast } = useNotifications();
  const [missions, setMissions] = useState<Mission[]>([]);
  const [userMissions, setUserMissions] = useState<UserMission[]>([]);
  const [missionsLoading, setMissionsLoading] = useState(true);
  const [streak, setStreak] = useState<Streak | null>(null);

  useEffect(() => {
    if (!userId) return; // No hacer llamadas si no hay userId
    const token = typeof window !== "undefined" ? localStorage.getItem("jwt-token") : null;
    const authHeaders: Record<string, string> = token ? { Authorization: `Bearer ${token}` } : {};
    
    Promise.all([
      fetch(`/api/user?userId=${userId}`, { headers: authHeaders }).then(res => res.json()).catch(() => null),
      fetch(`/api/purchases?userId=${userId}`, { headers: authHeaders }).then(res => res.json()).catch(() => []),
      fetch(`/api/agenda?userId=${userId}`).then(res => res.json()).catch(() => []),
      fetch(`/api/notifications?userId=${userId}`, { headers: authHeaders }).then(res => res.json()).catch(() => []),
      fetch(`/api/notes?userId=${userId}`).then(res => res.json()).catch(() => []),
      fetch(`/api/games`).then(res => res.json()).catch(() => []),
      fetch(`/api/chats?userId=${userId}`).then(res => res.json()).catch(() => []),
      fetch(`/api/achievements/list`).then(res => res.json()).catch(() => []),
      fetch(`/api/achievements?userId=${userId}`).then(res => res.json()).catch(() => []),
      fetch(`/api/missions?userId=${userId}`).then(res => res.json()).catch(() => ({ missions: [], userProgress: [] })),
    ]).then(([user, purchases, agenda, notifications, notes, games, chats, allAchievements, userAchievements, missionsData]) => {
      setUser(user);
      setPurchases(purchases);
      setAgenda(agenda);
      setNotifications(notifications);
      setNotes(notes);
      setChats(chats);
      setAllAchievements(allAchievements);
      setUserAchievements(userAchievements);
      setMissions(missionsData.missions || []);
      setUserMissions(missionsData.userProgress || []);
      setLoading(false);
    }).catch((error) => {
      console.error("Error cargando datos del dashboard:", error);
      setLoading(false);
    });
  }, [userId]);

  useEffect(() => {
    if (!user || !allAchievements.length || !userAchievements.length) return;
    // Asignar logros automáticamente si no los tiene
    const assign = async (achName: string) => {
      const ach = allAchievements.find((a: Achievement) => a.name === achName);
      if (ach && !userAchievements.some((ua: UserAchievement) => ua.achievementId === ach.id)) {
        await fetch(`/api/achievements`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, achievementId: ach.id })
        });
      }
    };
    if (chats.length > 0) assign("Primer chat");
    if (agenda.length > 0) assign("Cita agendada");
    if (notes.length > 0) assign("Notas activas");
    if (purchases.some((p: Purchase) => p.productName?.toLowerCase().includes("juego"))) assign("Primer juego");
    if (user.bio && user.interests && user.nombre) assign("Perfil completo");
    // (Simulación: si hay una videollamada registrada, asignar "Primera videollamada")
  }, [user, allAchievements, userAchievements, chats, agenda, notes, purchases]);

  useEffect(() => {
    if (!user) return;
    const fetchMissions = async () => {
      try {
        const res = await fetch(`/api/missions?userId=${userId}`);
        const data = await res.json();
        setMissions(data.missions || []);
        setUserMissions(data.userProgress || []);
      } catch (error) {
        console.error("Error cargando misiones:", error);
        setMissions([]);
        setUserMissions([]);
      } finally {
        setMissionsLoading(false);
      }
    };
    fetchMissions();
  }, [user, userId]);

  useEffect(() => {
    if (!userId) return;
    fetch(`/api/streaks?userId=${userId}`)
      .then(res => res.json())
      .then(data => setStreak(data))
      .catch(error => {
        console.error("Error cargando streak:", error);
        setStreak(null);
      });
  }, [userId]);
  const handleClaim = async (missionId: number) => {
    const res = await fetch(`/api/missions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, missionId })
    });
    const data = await res.json();
    const claimedMission = missions.find((m: Mission) => m.id === missionId);
    if (data.success) {
      if (claimedMission?.secret) {
        showToast("¡Logro secreto desbloqueado!", "success");
      } else {
        showToast(`¡Recompensa reclamada! +${data.reward.tokens} tokens`, "success");
      }
      // Refrescar misiones y saldo
      // Refrescar misiones y saldo
      fetch(`/api/missions?userId=${userId}`)
        .then(res => res.json())
        .then(data => {
          setMissions(data.missions);
          setUserMissions(data.userProgress);
        });
      // Streak feedback
      if (data.streak && userId) {
        setStreak({ 
          userId,
          currentStreak: data.streak.currentStreak, 
          maxStreak: data.streak.maxStreak 
        });
        if (data.streak.newRecord) {
          showToast(`¡Nuevo récord de racha: ${data.streak.currentStreak} días seguidos!`, "success");
        } else if (data.streak.currentStreak > 1) {
          showToast(`¡Racha aumentada! ${data.streak.currentStreak} días seguidos completando misiones.`, "info");
        }
      }
    } else {
      showToast(typeof data.message === 'string' ? data.message : "No se pudo reclamar la recompensa", "error");
    }
  };

  // Datos para gráficas
  // Tokens gastados por semana
  const tokensHistory = useMemo(() => {
    const byWeek: Record<string, number> = {};
    purchases.forEach((p: Purchase) => {
      const week = getWeek(p.date);
      byWeek[week] = (byWeek[week] || 0) + (p.total || 0);
    });
    return Object.entries(byWeek).map(([week, spent]) => ({ week, spent }));
  }, [purchases]);

  // Juegos jugados por semana (estimado desde actividad registrada)
  const gamesHistory = useMemo(() => {
    // Se toma cada compra de juego como una partida jugada para la métrica semanal
    const byWeek: Record<string, number> = {};
    purchases.forEach((p: Purchase) => {
      if (p.productName?.toLowerCase().includes("juego")) {
        const week = getWeek(p.date);
        byWeek[week] = (byWeek[week] || 0) + 1;
      }
    });
    return Object.entries(byWeek).map(([week, played]) => ({ week, played }));
  }, [purchases]);
  const activityHistory = useMemo(() => {
    const byWeek: Record<string, { citas: number; chats: number; compras: number }> = {};
    agenda.forEach((a: AgendaEvent) => {
      const week = getWeek(a.datetime);
      byWeek[week] = byWeek[week] || { citas: 0, chats: 0, compras: 0 };
      byWeek[week].citas++;
    });
    chats.forEach((c: ChatMessage) => {
      const week = getWeek(c.timestamp);
      byWeek[week] = byWeek[week] || { citas: 0, chats: 0, compras: 0 };
      byWeek[week].chats++;
    });
    purchases.forEach((p: Purchase) => {
      const week = getWeek(p.date);
      byWeek[week] = byWeek[week] || { citas: 0, chats: 0, compras: 0 };
      byWeek[week].compras++;
    });
    return Object.entries(byWeek).map(([week, v]) => ({ week, ...v }));
  }, [agenda, chats, purchases]);

  // Accesos contextuales (evita duplicar rutas ya visibles en la barra superior)
  const quickLinksModern = [
    { label: "Perfil", href: "/user/profile", icon: UserCircle },
    { label: "Videollamada", href: "/user/video-call", icon: Video },
    { label: "Tienda", href: "/user/store", icon: ShoppingBag },
    { label: "Reportar", href: "/user/reports", icon: ShieldAlert },
    { label: "Notificaciones", href: "/user/notifications", icon: Bell },
  ];

  // Mostrar loading si está autenticando o cargando datos
  if (authLoading || loading || !userId) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <Card variant="gamified" padding="lg">
          <ViewState
            variant="loading"
            title={authLoading ? "Decrypting profile" : "Summoning dashboard"}
            description="Cargando datos de usuario y actividad." className="min-h-[140px] border-0 bg-transparent"
          />
        </Card>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-slate-200 selection:bg-primary-500/30 font-sans pb-20">
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-900/20 via-zinc-950 to-zinc-950 -z-10" />
      <section className="container mx-auto px-4 py-8 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          className="text-center mb-16 relative"
        >
          <div className="absolute inset-0 bg-primary-500/10 blur-[100px] rounded-full w-3/4 h-3/4 mx-auto -z-10" />
          <h1 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-primary-400 via-accent-400 to-primary-300 bg-clip-text text-transparent mb-6 tracking-tight drop-shadow-sm">
            Welcome back, {user?.nombre}!
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto font-medium">
            Your personal command center for connections and rewards.
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16 relative z-10">
          {/* Tokens */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="glass-card hover:shadow-neon transition-all duration-300 group rounded-2xl p-6 text-center h-full relative overflow-hidden border border-zinc-800/50">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="bg-primary-500/10 p-4 rounded-2xl inline-block mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-inner ring-1 ring-primary-500/20">
                <Coins className="h-8 w-8 text-primary-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]" />
              </div>
              <h3 className="text-3xl font-black text-white mb-2 tracking-tight">{user?.tokens}</h3>
              <p className="text-zinc-400 mb-6 font-medium text-sm uppercase tracking-wider">Available Tokens</p>
              <Link href="/user/store" className="block">
                <Button variant="gamified" size="sm" className="w-full relative z-10">
                  Ir a tienda
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Streak */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="glass-card hover:shadow-neon-accent transition-all duration-300 group rounded-2xl p-6 text-center h-full relative overflow-hidden border border-zinc-800/50">
              <div className="absolute inset-0 bg-gradient-to-br from-accent-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="bg-accent-500/10 p-4 rounded-2xl inline-block mb-4 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300 shadow-inner ring-1 ring-accent-500/20">
                <Flame className="h-8 w-8 text-accent-400 drop-shadow-[0_0_8px_rgba(236,72,153,0.5)]" />
              </div>
              <h3 className="text-3xl font-black text-white mb-2 tracking-tight">
                {streak?.currentStreak || 0}
              </h3>
              <p className="text-zinc-400 mb-4 font-medium text-sm uppercase tracking-wider">Day Streak</p>
              {streak && streak.currentStreak === streak.maxStreak && streak.currentStreak > 0 && (
                <div className="animate-pulse bg-gradient-to-r from-yellow-500/20 to-amber-500/20 text-yellow-400 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ring-1 ring-yellow-500/30 inline-block">
                  New Record!
                </div>
              )}
            </div>
          </motion.div>

          {/* Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="glass-card hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all duration-300 group rounded-2xl p-6 text-center h-full relative overflow-hidden border border-zinc-800/50">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="bg-blue-500/10 p-4 rounded-2xl inline-block mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-inner ring-1 ring-blue-500/20">
                <Activity className="h-8 w-8 text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
              </div>
              <h3 className="text-3xl font-black text-white mb-2 tracking-tight">
                {agenda.length + chats.length}
              </h3>
              <p className="text-zinc-400 font-medium text-sm uppercase tracking-wider">Active Engagements</p>
            </div>
          </motion.div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="glass-card hover:shadow-[0_0_15px_rgba(234,179,8,0.3)] transition-all duration-300 group rounded-2xl p-6 text-center h-full relative overflow-hidden border border-zinc-800/50">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="bg-yellow-500/10 p-4 rounded-2xl inline-block mb-4 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300 shadow-inner ring-1 ring-yellow-500/20">
                <Trophy className="h-8 w-8 text-yellow-400 drop-shadow-[0_0_8px_rgba(234,179,8,0.5)]" />
              </div>
              <h3 className="text-3xl font-black text-white mb-2 tracking-tight">
                {userAchievements.length}
              </h3>
              <p className="text-zinc-400 font-medium text-sm uppercase tracking-wider">Trophies Unlocked</p>
            </div>
          </motion.div>
        </div>

        {/* Context Shortcuts */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16 relative z-10">
          {quickLinksModern.map((link, index) => {
            const IconComponent = link.icon;
            return (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
              >
                <Link href={link.href} className="glass-panel hover:bg-zinc-800/80 hover:border-primary-500/50 hover:shadow-neon p-4 rounded-2xl text-center group cursor-pointer transition-all duration-300 relative overflow-hidden backdrop-blur-md border border-zinc-800/50 flex flex-col items-center justify-center min-h-[120px] focus-visible:ring-4 focus-visible:ring-primary-300/40" aria-label={`Abrir ${link.label}`}>
                  <div className="absolute inset-0 bg-gradient-to-b from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="bg-zinc-900 ring-1 ring-zinc-800 p-3 rounded-xl mb-3 group-hover:bg-primary-500/20 group-hover:ring-primary-500/50 transition-all duration-300 relative z-10">
                    <IconComponent className="h-6 w-6 text-zinc-400 group-hover:text-primary-400 transition-colors drop-shadow-sm" />
                  </div>
                  <p className="text-sm font-bold text-zinc-300 group-hover:text-white transition-colors relative z-10 tracking-wide">
                    {link.label}
                  </p>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Missions */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2, type: "spring", bounce: 0.3 }}
            >
              <div className="glass-panel p-6 md:p-8 rounded-3xl border border-zinc-800/50 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 blur-[80px] rounded-full -z-10" />
                
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-4">
                    <div className="bg-primary-500/20 p-3 rounded-2xl ring-1 ring-primary-500/30 shadow-inner">
                      <Target className="h-7 w-7 text-primary-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]" />
                    </div>
                    <h2 className="text-2xl font-black text-white tracking-tight">Active Missions</h2>
                  </div>
                  <div className="bg-zinc-900/80 px-4 py-1.5 rounded-full ring-1 ring-zinc-700 backdrop-blur-sm">
                    <span className="text-sm font-bold text-zinc-300 tracking-wider uppercase">
                      {missions.filter(m => userMissions.find(um => um.missionId === m.id && !um.completed)).length} Pending
                    </span>
                  </div>
                </div>

                {missionsLoading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="animate-pulse bg-zinc-800/50 rounded-2xl h-40 border border-zinc-700/50"></div>
                    <div className="animate-pulse bg-zinc-800/50 rounded-2xl h-40 border border-zinc-700/50"></div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {missions.map((m: Mission) => {
                      const um = userMissions.find((um: UserMission) => um.missionId === m.id);
                      const progress = um ? um.progress : 0;
                      const completed = um ? um.completed : false;
                      const progressPercentage = (progress / m.goal) * 100;

                      return (
                        <motion.div
                          key={m.id}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.4 }}
                        >
                          <div className={`h-full rounded-2xl p-5 border transition-all duration-300 relative overflow-hidden group hover:shadow-xl ${
                            completed ? "bg-zinc-900/90 border-success-500/30 hover:shadow-success-500/10" : "glass-card border-zinc-800/50 hover:border-primary-500/40 hover:shadow-primary-500/10"
                          }`}>
                            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
                            <div className="flex justify-between items-start mb-4 relative z-10">
                              <div>
                                <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ring-1 ${
                                  m.type === "diaria" ? "bg-blue-500/10 text-blue-400 ring-blue-500/30 shadow-[0_0_10px_rgba(59,130,246,0.2)]" : "bg-primary-500/10 text-primary-400 ring-primary-500/30 shadow-[0_0_10px_rgba(168,85,247,0.2)]"
                                }`}>
                                  {m.type === "diaria" ? "Daily" : "Weekly"}
                                </span>
                                <h3 className="font-bold text-white mt-3 text-lg leading-tight tracking-tight">{m.description}</h3>
                                <p className="text-xs text-primary-400 font-semibold mt-1.5 flex items-center gap-1">
                                  <Coins className="w-3.5 h-3.5" /> {m.reward.tokens} Tokens
                                </p>
                              </div>
                            </div>
                            
                            <div className="mb-5 relative z-10">
                                <div className="flex justify-between text-xs font-bold text-zinc-400 mb-2 uppercase tracking-wide">
                                  <span>Progress</span>
                                  <span className={completed ? "text-success-400" : "text-zinc-300"}>{progress} <span className="opacity-50">/ {m.goal}</span></span>
                                </div>
                                <div className="w-full bg-zinc-800 rounded-full h-2.5 shadow-inner overflow-hidden ring-1 ring-zinc-700/50 relative">
                                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
                                  <div 
                                    className={`h-full rounded-full transition-all duration-700 ease-out relative ${
                                      completed ? "bg-gradient-to-r from-success-600 to-success-400 shadow-[0_0_10px_rgba(34,197,94,0.5)]" : "bg-gradient-to-r from-primary-600 to-accent-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]"
                                    } ${getProgressBarWidth(progressPercentage)}`}
                                  />
                                </div>
                              </div>
  
                              <div className="relative z-10 mt-auto pt-2">
                                {completed ? (
                                  <div className="flex items-center justify-center text-success-400 font-bold bg-success-500/10 py-2.5 rounded-xl ring-1 ring-success-500/30 shadow-[0_0_15px_rgba(34,197,94,0.15)] backdrop-blur-sm tracking-wide">
                                    <Trophy className="h-4 w-4 mr-2" />
                                    CLAIMED
                                  </div>
                                ) : (
                                  <Button 
                                    variant={progress >= m.goal ? "gamified" : "outline"}
                                    size="sm" 
                                    className={`w-full font-bold tracking-wide ${progress < m.goal ? "opacity-50 grayscale cursor-not-allowed border-zinc-700 text-zinc-400 hover:bg-transparent" : "shadow-neon animate-pulse-slow"}`}
                                    disabled={progress < m.goal}
                                    onClick={() => progress >= m.goal && handleClaim(m.id)}
                                  >
                                    {progress >= m.goal ? "CLAIM REWARD" : "IN PROGRESS"}
                                  </Button>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  )}
                </div>
            </motion.div>

            {/* Charts */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4, type: "spring", bounce: 0.3 }}
            >
              <div className="glass-panel p-6 md:p-8 rounded-3xl border border-zinc-800/50 relative overflow-hidden">
                <ChartsUser 
                  tokensHistory={tokensHistory}
                  gamesHistory={gamesHistory}
                  activityHistory={activityHistory}
                />
              </div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Notifications */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3, type: "spring", bounce: 0.3 }}
            >
              <div className="glass-panel p-6 rounded-3xl border border-zinc-800/50 relative overflow-hidden h-full">
                <div className="absolute top-0 left-0 w-32 h-32 bg-accent-500/10 blur-[60px] rounded-full -z-10" />
                
                <div className="flex items-center space-x-3 mb-6">
                  <div className="bg-accent-500/20 p-2.5 rounded-xl ring-1 ring-accent-500/30 shadow-inner">
                    <Bell className="h-5 w-5 text-accent-400 drop-shadow-[0_0_8px_rgba(236,72,153,0.5)]" />
                  </div>
                  <h2 className="text-xl font-black text-white tracking-tight">System Alerts</h2>
                </div>
                
                <div className="space-y-3 relative z-10">
                  {notifications.length === 0 ? (
                    <ViewState variant="empty" title="Sin alertas" description="No hay notificaciones activas por ahora." className="min-h-[120px]" />
                  ) : (
                    notifications.slice(0, 5).map((n: Notification) => (
                      <div key={n.id} className="group flex items-start space-x-3 p-3 bg-zinc-900/50 rounded-xl hover:bg-zinc-800/80 transition-all duration-300 border border-zinc-800/50 hover:border-accent-500/30 hover:shadow-[0_0_10px_rgba(236,72,153,0.1)]">
                        <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 ring-2 ring-primary-500/20 group-hover:animate-pulse shadow-[0_0_5px_rgba(168,85,247,0.5)]"></div>
                        <p className="text-sm text-zinc-300 flex-1 leading-relaxed decoration-zinc-500">{n.text}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </motion.div>

            {/* Upcoming Events */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4, type: "spring", bounce: 0.3 }}
            >
              <div className="glass-panel p-6 rounded-3xl border border-zinc-800/50 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[60px] rounded-full -z-10" />
                
                <div className="flex items-center space-x-3 mb-6">
                  <div className="bg-blue-500/20 p-2.5 rounded-xl ring-1 ring-blue-500/30 shadow-inner">
                    <Calendar className="h-5 w-5 text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                  </div>
                  <h2 className="text-xl font-black text-white tracking-tight">Timeline</h2>
                </div>
                
                <div className="space-y-4 relative z-10">
                  {agenda.length === 0 ? (
                    <ViewState variant="empty" title="Timeline vacio" description="Programa una conexion para ver eventos aqui." className="min-h-[120px]" />
                  ) : (
                    agenda.slice(0, 3).map((a: AgendaEvent) => (
                      <div key={a.id} className="p-4 bg-zinc-900/40 border border-zinc-800/50 rounded-xl hover:border-blue-500/40 hover:bg-zinc-800/80 transition-all duration-300 group hover:shadow-[0_0_15px_rgba(59,130,246,0.1)] relative overflow-hidden">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500/50 group-hover:bg-blue-400 group-hover:shadow-[0_0_10px_rgba(59,130,246,0.5)] transition-all"></div>
                        <h3 className="font-bold text-white mb-1.5 pl-2 tracking-wide group-hover:text-blue-100 transition-colors">{a.title}</h3>
                        <p className="text-xs text-blue-400/80 font-semibold pl-2 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {a.datetime ? new Date(a.datetime).toLocaleDateString('en-US', {
                            weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                          }) : 'TBD'}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </motion.div>

            {/* Achievements */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5, type: "spring", bounce: 0.3 }}
            >
              <div className="glass-panel p-1 rounded-3xl border border-zinc-800/50 relative overflow-hidden bg-zinc-900/50 backdrop-blur-md">
                <AchievementsUser all={allAchievements} userAchievements={userAchievements} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}