"use client";

import React, { useState } from "react";
import {
  Settings,
  RefreshCw,
  BarChart2,
  Brain,
  Calendar,
  MapPin,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Fingerprint,
} from "lucide-react";
import Button from "@/components/Button";

export default function AdminMatchingPage() {
  const [weights, setWeights] = useState({
    age: 30,
    distance: 20,
    interests: 50,
  });

  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<
    { nombre: string; score: number; motivo: string }[] | null
  >(null);

  // Calcula que el total sea siempre 100 visualmente (opcional logico, pero ayuda al UX)
  const totalWeight = weights.age + weights.distance + weights.interests;

  const handleSliderChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: keyof typeof weights,
  ) => {
    setWeights({ ...weights, [key]: Number(e.target.value) });
  };

  const testConfiguration = () => {
    setLoading(true);
    // Simula petición POST a /api/admin/matching/test con los pesos
    setTimeout(() => {
      setResults([
        {
          nombre: "Usuario Test A",
          score: 92,
          motivo:
            "Alta coincidencia en intereses según IA (Peso actual: " +
            weights.interests +
            "%)",
        },
        {
          nombre: "Usuario Test B",
          score: 78,
          motivo:
            "Penalizado por distancia extrema (Peso actual: " +
            weights.distance +
            "%)",
        },
        {
          nombre: "Usuario Test C",
          score: 45,
          motivo:
            "Mismos intereses pero brecha de edad bloqueante (Peso actual: " +
            weights.age +
            "%)",
        },
      ]);
      setLoading(false);
    }, 1200);
  };

  const saveConfiguration = () => {
    if (totalWeight !== 100) {
      alert("Los pesos deben sumar exactamente 100%.");
      return;
    }
    alert("¡Configuración guardada y aplicada en producción!");
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-black py-12 px-4 flex flex-col items-center">
      <div className="w-full max-w-5xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-black text-gray-900 dark:text-white flex items-center gap-3 tracking-tight mb-2">
              <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-xl text-primary-600 dark:text-primary-400">
                <Brain size={32} />
              </div>
              Motor IA: Matching
            </h1>
            <p className="text-gray-600 dark:text-gray-400 font-medium">
              Calibra el algoritmo central y lanza simulaciones A/B en Sandbox.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Controles de Configuración */}
          <div className="glass-card rounded-3xl shadow-lg border border-gray-200/50 dark:border-zinc-800/50 p-8 flex flex-col gap-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-400/5 rounded-full blur-[60px] -mr-20 -mt-20 pointer-events-none"></div>

            <div className="flex items-center gap-2 border-b border-gray-100 dark:border-zinc-800 pb-4">
              <Settings className="text-gray-400" />
              <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">
                Pesos Globales
              </h2>
            </div>

            <div className="flex flex-col gap-8 relative z-10">
              {/* Rango: Intereses */}
              <div className="flex flex-col gap-3 group">
                <div className="flex justify-between items-center">
                  <label
                    htmlFor="interests-weight"
                    className="font-bold flex items-center gap-2 text-gray-800 dark:text-gray-200"
                  >
                    <div className="p-1.5 bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400 rounded-lg">
                      <Fingerprint size={18} />
                    </div>
                    Personalidad (NLP)
                  </label>
                  <span className="bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300 font-black px-3 py-1 rounded-lg text-sm shadow-inner min-w-[60px] text-center transition-all group-hover:scale-110">
                    {weights.interests}%
                  </span>
                </div>
                <input
                  id="interests-weight"
                  type="range"
                  min={0}
                  max={100}
                  value={weights.interests}
                  onChange={(e) => handleSliderChange(e, "interests")}
                  className="w-full h-3 bg-gray-200 dark:bg-zinc-800 rounded-full appearance-none cursor-pointer accent-purple-500 hover:accent-purple-400 transition-all shadow-inner"
                />
              </div>

              {/* Rango: Edad */}
              <div className="flex flex-col gap-3 group">
                <div className="flex justify-between items-center">
                  <label
                    htmlFor="age-weight"
                    className="font-bold flex items-center gap-2 text-gray-800 dark:text-gray-200"
                  >
                    <div className="p-1.5 bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 rounded-lg">
                      <Calendar size={18} />
                    </div>
                    Afinidad de Edad
                  </label>
                  <span className="bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 font-black px-3 py-1 rounded-lg text-sm shadow-inner min-w-[60px] text-center transition-all group-hover:scale-110">
                    {weights.age}%
                  </span>
                </div>
                <input
                  id="age-weight"
                  type="range"
                  min={0}
                  max={100}
                  value={weights.age}
                  onChange={(e) => handleSliderChange(e, "age")}
                  className="w-full h-3 bg-gray-200 dark:bg-zinc-800 rounded-full appearance-none cursor-pointer accent-blue-500 hover:accent-blue-400 transition-all shadow-inner"
                />
              </div>

              {/* Rango: Distancia */}
              <div className="flex flex-col gap-3 group">
                <div className="flex justify-between items-center">
                  <label
                    htmlFor="distance-weight"
                    className="font-bold flex items-center gap-2 text-gray-800 dark:text-gray-200"
                  >
                    <div className="p-1.5 bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-lg">
                      <MapPin size={18} />
                    </div>
                    Filtro Geográfico
                  </label>
                  <span className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300 font-black px-3 py-1 rounded-lg text-sm shadow-inner min-w-[60px] text-center transition-all group-hover:scale-110">
                    {weights.distance}%
                  </span>
                </div>
                <input
                  id="distance-weight"
                  type="range"
                  min={0}
                  max={100}
                  value={weights.distance}
                  onChange={(e) => handleSliderChange(e, "distance")}
                  className="w-full h-3 bg-gray-200 dark:bg-zinc-800 rounded-full appearance-none cursor-pointer accent-emerald-500 hover:accent-emerald-400 transition-all shadow-inner"
                />
              </div>
            </div>

            <div
              className={`mt-2 p-4 rounded-xl text-sm font-bold flex items-center justify-between shadow-sm border ${totalWeight === 100 ? "bg-green-50/80 border-green-200 text-green-700 dark:bg-green-900/20 dark:border-green-800/50 dark:text-green-400" : "bg-red-50/80 border-red-200 text-red-700 dark:bg-red-900/20 dark:border-red-800/50 dark:text-red-400 animate-pulse"}`}
            >
              <span className="flex items-center gap-2">
                {totalWeight === 100 ? (
                  <CheckCircle2 size={18} />
                ) : (
                  <AlertTriangle size={18} />
                )}
                Carga Matemática:
              </span>
              <span className="text-lg">{totalWeight}% / 100%</span>
            </div>

            <div className="flex gap-4 mt-2">
              <Button
                variant="outline"
                onClick={testConfiguration}
                leftIcon={
                  <RefreshCw
                    size={18}
                    className={loading ? "animate-spin" : ""}
                  />
                }
                fullWidth
              >
                {loading ? "Calculando..." : "Simular Sandbox"}
              </Button>
              <Button
                variant="primary"
                onClick={saveConfiguration}
                disabled={totalWeight !== 100}
                leftIcon={<Zap size={18} />}
                fullWidth
              >
                Lanzar a Prod
              </Button>
            </div>
          </div>

          {/* Panel de Resultados (Sandbox) */}
          <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-lg border border-gray-200/50 dark:border-zinc-800/50 p-8 flex flex-col relative overflow-hidden">
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5 dark:opacity-[0.02] pointer-events-none"></div>

            <div className="flex items-center justify-between border-b border-gray-100 dark:border-zinc-800 pb-4 mb-6 relative z-10">
              <div className="flex items-center gap-2">
                <BarChart2 className="text-gray-400" />
                <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">
                  Impacto en Vivo
                </h2>
              </div>
              <span className="text-xs font-black uppercase tracking-wider text-gray-400 bg-gray-100 dark:bg-zinc-800 px-3 py-1 rounded-full">
                v2.1.4
              </span>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center relative z-10 w-full min-h-[300px]">
              {!results && !loading && (
                <div className="text-center text-gray-400 dark:text-gray-500 flex flex-col items-center animate-fade-in-up">
                  <div className="w-20 h-20 bg-gray-50 dark:bg-zinc-800/50 rounded-full flex items-center justify-center mb-4 shadow-inner">
                    <Brain size={40} className="opacity-50" />
                  </div>
                  <p className="font-medium max-w-[250px]">
                    Ejecuta una simulación para ver el modelo probabilístico con
                    los parámetros actuales.
                  </p>
                </div>
              )}
              {loading && (
                <div className="text-center flex flex-col items-center gap-4">
                  <div className="w-16 h-16 border-4 border-gray-200 dark:border-zinc-800 border-t-primary-500 rounded-full animate-spin"></div>
                  <p className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500 animate-pulse">
                    Procesando 10,000 perfiles...
                  </p>
                </div>
              )}
              {results && !loading && (
                <div className="w-full flex gap-4 flex-col animate-fade-in-up">
                  {results.map((res, i) => (
                    <div
                      key={i}
                      className="glass-panel border border-white/40 dark:border-zinc-700/50 p-5 rounded-2xl flex flex-col shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-center mb-3">
                        <span className="font-black text-gray-800 dark:text-gray-200">
                          {res.nombre}
                        </span>
                        <div
                          className={`px-3 py-1 rounded-lg font-black text-sm shadow-inner flex items-center gap-1 ${res.score >= 80 ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : res.score >= 50 ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400" : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"}`}
                        >
                          {res.score >= 80
                            ? "🚀"
                            : res.score >= 50
                              ? "⚖️"
                              : "⛔"}
                          {res.score}/100
                        </div>
                      </div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400 leading-relaxed bg-gray-50 dark:bg-zinc-800/50 p-3 rounded-lg border border-gray-100 dark:border-zinc-700/30">
                        {res.motivo}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
