"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users, AlertTriangle, Star, TrendingUp, Eye, Heart, Shield } from "lucide-react";

interface MetricCard {
  label: string;
  value: number | string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  change: string;
  changeType: "positive" | "neutral";
}

interface DetailedMetric {
  label: string;
  value: string;
}

export default function AdminMetricsPage() {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [mainMetrics, setMainMetrics] = React.useState<MetricCard[]>([]);
  const [detailedMetrics, setDetailedMetrics] = React.useState<DetailedMetric[]>([]);

  React.useEffect(() => {
    const isCurrentMonth = (dateLike: string | Date | undefined) => {
      if (!dateLike) return false;
      const date = new Date(dateLike);
      if (Number.isNaN(date.getTime())) return false;
      const now = new Date();
      return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
    };

    const loadMetrics = async () => {
      try {
        setLoading(true);
        const token = typeof window !== "undefined" ? localStorage.getItem("jwt-token") : null;
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const [usersRes, reportsRes, tokensRes, activityRes] = await Promise.all([
          fetch("/api/users"),
          fetch("/api/reports", { headers }),
          fetch("/api/tokens", { headers }),
          fetch("/api/activity-logs", { headers }),
        ]);

        const [usersRaw, reportsRaw, tokensRaw, activityRaw] = await Promise.all([
          usersRes.json().catch(() => []),
          reportsRes.json().catch(() => []),
          tokensRes.json().catch(() => []),
          activityRes.json().catch(() => []),
        ]);

        const users = Array.isArray(usersRaw) ? usersRaw : [];
        const reports = Array.isArray(reportsRaw) ? reportsRaw : [];
        const tokens = Array.isArray(tokensRaw) ? tokensRaw : [];
        const activities = Array.isArray(activityRaw) ? activityRaw : [];

        const activeUsers = users.filter((u: any) => {
          const status = String(u?.estado || u?.status || "Activo").toLowerCase();
          return !status.includes("suspend");
        }).length;

        const reportsThisMonth = reports.filter((r: any) => isCurrentMonth(r?.created_at || r?.fecha)).length;
        const resolvedReports = reports.filter((r: any) => {
          const status = String(r?.status || r?.estado || "").toLowerCase();
          return status.includes("resuelt") || status.includes("resolved");
        }).length;

        const totalTokenVolume = tokens.reduce((acc: number, t: any) => acc + Math.abs(Number(t?.amount || 0)), 0);
        const averageTokenMovement = tokens.length > 0 ? totalTokenVolume / tokens.length : 0;

        const activityThisMonth = activities.filter((a: any) => isCurrentMonth(a?.created_at || a?.fecha)).length;

        setMainMetrics([
          {
            label: "Usuarios Activos",
            value: activeUsers,
            icon: Users,
            color: "from-primary-500 to-primary-600",
            change: `${users.length} total`,
            changeType: "neutral",
          },
          {
            label: "Denuncias Este Mes",
            value: reportsThisMonth,
            icon: AlertTriangle,
            color: "from-red-500 to-red-600",
            change: `${resolvedReports} resueltas`,
            changeType: "neutral",
          },
          {
            label: "Mov. Medio de Tokens",
            value: Number(averageTokenMovement.toFixed(1)),
            icon: Star,
            color: "from-yellow-500 to-yellow-600",
            change: `${tokens.length} transacciones`,
            changeType: "neutral",
          },
          {
            label: "Actividad Este Mes",
            value: activityThisMonth,
            icon: Heart,
            color: "from-pink-500 to-pink-600",
            change: `${activities.length} eventos`,
            changeType: "neutral",
          },
        ]);

        setDetailedMetrics([
          { label: "Total de Usuarios", value: users.length.toLocaleString() },
          {
            label: "Usuarios Nuevos (Este Mes)",
            value: users.filter((u: any) => isCurrentMonth(u?.created_at || u?.fechaRegistro)).length.toLocaleString(),
          },
          { label: "Reportes Totales", value: reports.length.toLocaleString() },
          { label: "Logs de Actividad", value: activities.length.toLocaleString() },
          { label: "Transacciones de Tokens", value: tokens.length.toLocaleString() },
          { label: "Volumen de Tokens", value: totalTokenVolume.toLocaleString() },
        ]);

        setError(null);
      } catch (err) {
        console.error("Error cargando métricas:", err);
        setError("No se pudieron cargar las métricas en tiempo real.");
      } finally {
        setLoading(false);
      }
    };

    loadMetrics();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Métricas y Estadísticas
          </h1>
          <p className="text-gray-600">
            Dashboard general de la plataforma Blurry
          </p>
        </motion.div>

        {/* Main Metrics Cards */}
        {loading ? (
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 mb-8">
            <p className="text-gray-600">Cargando métricas reales...</p>
          </div>
        ) : null}

        {error ? (
          <div className="bg-red-50 text-red-700 rounded-xl border border-red-100 px-4 py-3 mb-8">
            {error}
          </div>
        ) : null}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {mainMetrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 hover:shadow-2xl transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`bg-gradient-to-r ${metric.color} p-3 rounded-xl`}>
                  <metric.icon className="h-6 w-6 text-white" />
                </div>
                <span className={`text-sm font-semibold px-2 py-1 rounded-full ${
                  metric.changeType === 'positive' 
                    ? 'text-green-600 bg-green-100' 
                    : 'text-blue-700 bg-blue-100'
                }`}>
                  {metric.change}
                </span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                  {metric.value.toLocaleString()}
                </h3>
                <p className="text-gray-600 text-sm">
                  {metric.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Detailed Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 mb-8"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Estadísticas Detalladas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {detailedMetrics.map((metric, index) => (
              <div key={metric.label} className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                <span className="text-gray-600 font-medium">{metric.label}</span>
                <span className="text-gray-900 font-bold text-lg">{metric.value}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-3 rounded-xl">
                <Eye className="h-6 w-6 text-white" />
              </div>
              <h3 className="ml-3 text-lg font-bold text-gray-900">
                Monitoreo en Vivo
              </h3>
            </div>
            <p className="text-gray-600 mb-4">
              Visualiza la actividad de usuarios en tiempo real
            </p>
            <button className="w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all duration-200">
              Ver Actividad
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="bg-gradient-to-r from-green-500 to-green-600 p-3 rounded-xl">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <h3 className="ml-3 text-lg font-bold text-gray-900">
                Reportes
              </h3>
            </div>
            <p className="text-gray-600 mb-4">
              Genera reportes detallados de uso y rendimiento
            </p>
            <button className="w-full px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-200">
              Generar Reporte
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-3 rounded-xl">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h3 className="ml-3 text-lg font-bold text-gray-900">
                Seguridad
              </h3>
            </div>
            <p className="text-gray-600 mb-4">
              Configura alertas y parámetros de seguridad
            </p>
            <button className="w-full px-4 py-2 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-xl hover:from-orange-700 hover:to-orange-800 transition-all duration-200">
              Configurar
            </button>
          </div>
        </motion.div>
      </div>
    </main>
  );
} 