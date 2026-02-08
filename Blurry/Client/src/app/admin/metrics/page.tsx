"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users, AlertTriangle, Star, TrendingUp, Eye, Heart, MessageCircle, Shield } from "lucide-react";

const mockMetrics = [
  { 
    label: "Usuarios Activos", 
    value: 1200, 
    icon: Users, 
    color: "from-primary-500 to-primary-600",
    change: "+12%",
    changeType: "positive"
  },
  { 
    label: "Denuncias este Mes", 
    value: 15, 
    icon: AlertTriangle, 
    color: "from-red-500 to-red-600",
    change: "-8%",
    changeType: "positive"
  },
  { 
    label: "Valoración Media", 
    value: 4.7, 
    icon: Star, 
    color: "from-yellow-500 to-yellow-600",
    change: "+0.3",
    changeType: "positive"
  },
  { 
    label: "Citas Exitosas", 
    value: 890, 
    icon: Heart, 
    color: "from-pink-500 to-pink-600",
    change: "+18%",
    changeType: "positive"
  },
];

const detailedMetrics = [
  { label: "Total de Usuarios", value: "12,345" },
  { label: "Usuarios Nuevos (Este Mes)", value: "1,234" },
  { label: "Videollamadas Realizadas", value: "5,678" },
  { label: "Mensajes Enviados", value: "98,765" },
  { label: "Tiempo Promedio de Sesión", value: "24 min" },
  { label: "Tasa de Retención", value: "78%" },
];

export default function AdminMetricsPage() {
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {mockMetrics.map((metric, index) => (
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
                    : 'text-red-600 bg-red-100'
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