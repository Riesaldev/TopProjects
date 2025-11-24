"use client";

import { motion } from "framer-motion";
import { 
  Coins, 
  Calendar, 
  Bell, 
  FileText, 
  Trophy, 
  Users, 
  Video,
  MessageCircle,
  Target,
  Flame,
  ArrowRight,
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
    
    Promise.all([
      fetch(`/api/user?userId=${userId}`).then(res => res.json()),
      fetch(`/api/purchases?userId=${userId}`).then(res => res.json()),
      fetch(`/api/agenda?userId=${userId}`).then(res => res.json()),
      fetch(`/api/notifications?userId=${userId}`).then(res => res.json()),
      fetch(`/api/notes?userId=${userId}`).then(res => res.json()),
      fetch(`/api/games`).then(res => res.json()),
      fetch(`/api/chats?userId=${userId}`).then(res => res.json()),
      fetch(`/api/achievements/list`).then(res => res.json()),
      fetch(`/api/achievements?userId=${userId}`).then(res => res.json()),
      fetch(`/api/missions?userId=${userId}`).then(res => res.json()),
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
    });
  }, [userId]);

  useEffect(() => {
    if (!user || !allAchievements.length || !userAchievements.length) return;
    // Mock: asignar logros automáticamente si no los tiene
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
      const res = await fetch(`/api/missions?userId=${userId}`);
      const data = await res.json();
      setMissions(data.missions);
      setUserMissions(data.userProgress);
      setMissionsLoading(false);
    };
    fetchMissions();
  }, [user, userId]);

  useEffect(() => {
    fetch(`/api/streaks?userId=${userId}`)
      .then(res => res.json())
      .then(data => setStreak(data));
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

  // Juegos jugados por semana (mock: contar partidas en historial de juegos si existiera)
  const gamesHistory = useMemo(() => {
    // Suponiendo que cada compra de un juego es una partida jugada (mock)
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

  // Accesos rápidos modernos
  const quickLinksModern = [
    { label: "Perfil", href: "/user/profile", icon: Users },
    { label: "Agenda", href: "/user/agenda", icon: Calendar },
    { label: "Chat", href: "/user/chat", icon: MessageCircle },
    { label: "Videollamada", href: "/user/video-call", icon: Video },
    { label: "Notas", href: "/user/notes", icon: FileText },
    { label: "Tienda", href: "/user/store", icon: Coins },
  ];

  // Mostrar loading si está autenticando o cargando datos
  if (authLoading || loading || !userId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 flex items-center justify-center">
        <Card padding="lg">
          <div className="flex items-center justify-center space-x-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            <span className="text-lg font-medium text-primary-700">
              {authLoading ? "Verificando usuario..." : "Cargando dashboard..."}
            </span>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50">
      <section className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent mb-4">
            ¡Bienvenido, {user?.nombre}!
          </h1>
          <p className="text-xl text-accent-600 max-w-2xl mx-auto">
            Tu centro de control personal para todas tus conexiones y actividades
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {/* Tokens */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card variant="gradient" hover padding="lg" className="text-center group">
              <div className="bg-primary-100 p-4 rounded-full inline-block mb-4 group-hover:scale-110 transition-transform">
                <Coins className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-2xl font-bold text-primary-700 mb-2">{user?.tokens}</h3>
              <p className="text-accent-600 mb-4">Tokens disponibles</p>
              <Button variant="outline" size="sm" className="w-full">
                <ArrowRight className="h-4 w-4 ml-2" />
                Ir a tienda
              </Button>
            </Card>
          </motion.div>

          {/* Streak */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card variant="gradient" hover padding="lg" className="text-center group">
              <div className="bg-accent-100 p-4 rounded-full inline-block mb-4 group-hover:scale-110 transition-transform">
                <Flame className="h-8 w-8 text-accent-600" />
              </div>
              <h3 className="text-2xl font-bold text-accent-700 mb-2">
                {streak?.currentStreak || 0}
              </h3>
              <p className="text-accent-600 mb-2">Días consecutivos</p>
              {streak && streak.currentStreak === streak.maxStreak && streak.currentStreak > 0 && (
                <div className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-semibold">
                  ¡Nuevo récord!
                </div>
              )}
            </Card>
          </motion.div>

          {/* Activity */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card variant="gradient" hover padding="lg" className="text-center group">
              <div className="bg-secondary-100 p-4 rounded-full inline-block mb-4 group-hover:scale-110 transition-transform">
                <Activity className="h-8 w-8 text-secondary-600" />
              </div>
              <h3 className="text-2xl font-bold text-secondary-700 mb-2">
                {agenda.length + chats.length}
              </h3>
              <p className="text-secondary-600">Actividades activas</p>
            </Card>
          </motion.div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card variant="gradient" hover padding="lg" className="text-center group">
              <div className="bg-yellow-100 p-4 rounded-full inline-block mb-4 group-hover:scale-110 transition-transform">
                <Trophy className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-2xl font-bold text-yellow-700 mb-2">
                {userAchievements.length}
              </h3>
              <p className="text-yellow-600">Logros desbloqueados</p>
            </Card>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {quickLinksModern.map((link, index) => {
            const IconComponent = link.icon;
            return (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <Card hover padding="md" className="text-center group cursor-pointer">
                  <div className="bg-primary-50 p-3 rounded-lg inline-block mb-3 group-hover:bg-accent-50 transition-colors">
                    <IconComponent className="h-6 w-6 text-primary-600 group-hover:text-accent-600 transition-colors" />
                  </div>
                  <p className="text-sm font-medium text-primary-700 group-hover:text-accent-700 transition-colors">
                    {link.label}
                  </p>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Missions */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card padding="lg">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="bg-primary-100 p-2 rounded-lg">
                      <Target className="h-6 w-6 text-primary-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-primary-700">Misiones</h2>
                  </div>
                  <div className="bg-accent-100 px-3 py-1 rounded-full">
                    <span className="text-sm font-medium text-accent-700">
                      {missions.filter(m => userMissions.find(um => um.missionId === m.id && !um.completed)).length} pendientes
                    </span>
                  </div>
                </div>

                {missionsLoading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="animate-pulse bg-accent-100 rounded-lg h-32"></div>
                    <div className="animate-pulse bg-accent-100 rounded-lg h-32"></div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {missions.map((m: Mission) => {
                      const um = userMissions.find((um: UserMission) => um.missionId === m.id);
                      const progress = um ? um.progress : 0;
                      const completed = um ? um.completed : false;
                      const progressPercentage = (progress / m.goal) * 100;

                      return (
                        <motion.div
                          key={m.id}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Card padding="md" className="h-full">
                            <div className="flex justify-between items-start mb-3">
                              <div>
                                <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                                  m.type === "diaria" ? "bg-blue-100 text-blue-800" : "bg-purple-100 text-purple-800"
                                }`}>
                                  {m.type}
                                </span>
                                <h3 className="font-semibold text-primary-700 mt-2">{m.description}</h3>
                                <p className="text-sm text-accent-600 mt-1">
                                  Recompensa: {m.reward.tokens} tokens
                                </p>
                              </div>
                            </div>
                            
                            <div className="mb-4">
                                <div className="flex justify-between text-sm text-accent-600 mb-1">
                                  <span>Progreso</span>
                                  <span>{progress}/{m.goal}</span>
                                </div>
                                <div className="w-full bg-accent-200 rounded-full h-2">
                                  <div 
                                    className={`h-2 rounded-full transition-all duration-300 ${
                                      completed ? "bg-success-500" : "bg-primary-500"
                                    } ${getProgressBarWidth(progressPercentage)}`}
                                  ></div>
                                </div>
                              </div>
  
                              {completed ? (
                                <div className="flex items-center justify-center text-success-600 font-semibold">
                                  <Trophy className="h-4 w-4 mr-2" />
                                  ¡Completada!
                                </div>
                              ) : (
                                <Button 
                                  variant={progress >= m.goal ? "primary" : "ghost"}
                                  size="sm" 
                                  fullWidth
                                  disabled={progress < m.goal}
                                  onClick={() => progress >= m.goal && handleClaim(m.id)}
                                >
                                  {progress >= m.goal ? "Reclamar recompensa" : "En progreso..."}
                                </Button>
                              )}
                            </Card>
                          </motion.div>
                        );
                      })}
                    </div>
                  )}
                </Card>
            </motion.div>

            {/* Charts */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <ChartsUser 
                tokensHistory={tokensHistory}
                gamesHistory={gamesHistory}
                activityHistory={activityHistory}
              />
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Notifications */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card padding="lg">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="bg-accent-100 p-2 rounded-lg">
                    <Bell className="h-6 w-6 text-accent-600" />
                  </div>
                  <h2 className="text-xl font-bold text-accent-700">Notificaciones</h2>
                </div>
                <div className="space-y-3">
                  {notifications.slice(0, 5).map((n: Notification) => (
                    <div key={n.id} className="flex items-start space-x-3 p-3 bg-accent-50 rounded-lg hover:bg-accent-100 transition-colors">
                      <div className="w-2 h-2 bg-primary-500 rounded-full mt-2"></div>
                      <p className="text-sm text-accent-700 flex-1">{n.text}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Upcoming Events */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card padding="lg">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="bg-primary-100 p-2 rounded-lg">
                    <Calendar className="h-6 w-6 text-primary-600" />
                  </div>
                  <h2 className="text-xl font-bold text-primary-700">Próximas citas</h2>
                </div>
                <div className="space-y-3">
                  {agenda.slice(0, 3).map((a: AgendaEvent) => (
                    <div key={a.id} className="p-3 border border-accent-200 rounded-lg hover:border-primary-300 transition-colors">
                      <h3 className="font-semibold text-primary-700 mb-1">{a.title}</h3>
                      <p className="text-sm text-accent-600">
                        {a.datetime ? new Date(a.datetime).toLocaleDateString('es-ES', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        }) : 'Fecha por confirmar'}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Achievements */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <AchievementsUser all={allAchievements} userAchievements={userAchievements} />
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}