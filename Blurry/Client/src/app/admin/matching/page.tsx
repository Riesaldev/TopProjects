"use client";

import React, { useEffect, useMemo, useState } from "react";
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

type MatchWeights = {
  age: number;
  distance: number;
  interests: number;
};

type MatchingResult = {
  nombre: string;
  score: number;
  motivo: string;
};

type UserApi = {
  id?: number;
  display_name?: string;
  age?: number;
  location?: string;
  interests?: string;
  values_profile?: unknown;
  role?: string;
};

type MatchUser = {
  id: number;
  name: string;
  age?: number;
  location?: string;
  interests: string;
};

type SettingApi = {
  id?: number;
  key?: string;
  value?: string;
};

function parseInterests(raw: string): string[] {
  return raw
    .split(/[;,]/)
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);
}

function normalizeUser(item: UserApi): MatchUser {
  const valuesProfile =
    item.values_profile && typeof item.values_profile === "object"
      ? (item.values_profile as Record<string, unknown>)
      : null;

  const valuesInterests = typeof valuesProfile?.interests === "string" ? valuesProfile.interests : "";

  return {
    id: Number(item.id ?? 0),
    name: item.display_name || `Usuario ${item.id ?? ""}`,
    age: typeof item.age === "number" ? item.age : undefined,
    location: item.location || undefined,
    interests: item.interests || valuesInterests || "",
  };
}

function dominantReason(weights: MatchWeights, scores: { age: number; distance: number; interests: number }): string {
  const weighted = [
    { key: "age", value: (weights.age / 100) * scores.age },
    { key: "distance", value: (weights.distance / 100) * scores.distance },
    { key: "interests", value: (weights.interests / 100) * scores.interests },
  ].sort((a, b) => b.value - a.value)[0];

  if (!weighted) return "Sin factores dominantes disponibles.";
  if (weighted.key === "interests") return "La coincidencia principal proviene de intereses compartidos.";
  if (weighted.key === "distance") return "La proximidad geografica aporta el mayor impacto en el match.";
  return "La afinidad de edad es el factor con mayor contribucion.";
}

function buildResults(users: MatchUser[], weights: MatchWeights): MatchingResult[] {
  if (users.length < 2) return [];

  const base = users[0];

  return users
    .slice(1)
    .map((candidate) => {
      const ageScore =
        typeof base.age === "number" && typeof candidate.age === "number"
          ? Math.max(0, 100 - Math.min(100, Math.abs(base.age - candidate.age) * 5))
          : 50;

      const distanceScore =
        base.location && candidate.location
          ? base.location.toLowerCase() === candidate.location.toLowerCase()
            ? 100
            : 40
          : 50;

      const baseInterests = parseInterests(base.interests);
      const candidateInterests = parseInterests(candidate.interests);
      const shared = candidateInterests.filter((item) => baseInterests.includes(item));
      const interestsScore =
        baseInterests.length === 0 || candidateInterests.length === 0
          ? 50
          : Math.min(100, Math.round((shared.length / Math.max(baseInterests.length, candidateInterests.length)) * 100));

      const finalScore = Math.round(
        (weights.age / 100) * ageScore +
          (weights.distance / 100) * distanceScore +
          (weights.interests / 100) * interestsScore,
      );

      return {
        nombre: candidate.name,
        score: finalScore,
        motivo: dominantReason(weights, {
          age: ageScore,
          distance: distanceScore,
          interests: interestsScore,
        }),
      };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}

export default function AdminMatchingPage() {
  const [weights, setWeights] = useState<MatchWeights>({ age: 30, distance: 20, interests: 50 });
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<MatchingResult[] | null>(null);
  const [users, setUsers] = useState<MatchUser[]>([]);
  const [settingId, setSettingId] = useState<number | null>(null);
  const [statusMsg, setStatusMsg] = useState<string>("");

  const totalWeight = useMemo(() => weights.age + weights.distance + weights.interests, [weights]);

  const handleSliderChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: keyof MatchWeights,
  ) => {
    setWeights((prev) => ({ ...prev, [key]: Number(e.target.value) }));
  };

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("jwt-token") : null;
    const authHeaders: Record<string, string> = token ? { Authorization: `Bearer ${token}` } : {};

    Promise.all([
      fetch("/api/users", { headers: authHeaders }).then((res) => res.json()).catch(() => []),
      fetch("/api/settings", { headers: authHeaders }).then((res) => res.json()).catch(() => []),
    ]).then(([usersData, settingsData]) => {
      const normalizedUsers = Array.isArray(usersData)
        ? (usersData as UserApi[])
            .filter((item) => String(item.role || "").toLowerCase() !== "admin")
            .map(normalizeUser)
            .filter((item) => item.id > 0)
        : [];

      setUsers(normalizedUsers);

      const matchingSetting = Array.isArray(settingsData)
        ? (settingsData as SettingApi[]).find((item) => item.key === "matching_weights")
        : undefined;

      if (matchingSetting?.id) {
        setSettingId(Number(matchingSetting.id));
      }

      if (matchingSetting?.value) {
        try {
          const parsed = JSON.parse(matchingSetting.value) as Partial<MatchWeights>;
          setWeights((prev) => ({
            age: Number(parsed.age ?? prev.age),
            distance: Number(parsed.distance ?? prev.distance),
            interests: Number(parsed.interests ?? prev.interests),
          }));
        } catch {
          // Ignore malformed persisted value.
        }
      }
    });
  }, []);

  const testConfiguration = () => {
    setLoading(true);
    const computed = buildResults(users, weights);
    setResults(computed);
    setLoading(false);
  };

  const saveConfiguration = async () => {
    if (totalWeight !== 100) {
      setStatusMsg("Los pesos deben sumar exactamente 100%.");
      return;
    }

    const token = typeof window !== "undefined" ? localStorage.getItem("jwt-token") : null;
    const authHeaders: Record<string, string> = token ? { Authorization: `Bearer ${token}` } : {};

    const body = {
      key: "matching_weights",
      value: JSON.stringify(weights),
      updated_by: "admin",
    };

    const endpoint = settingId ? `/api/settings/${settingId}` : "/api/settings";
    const method = settingId ? "PATCH" : "POST";

    const res = await fetch(endpoint, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...authHeaders,
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      setStatusMsg("No se pudo guardar la configuracion.");
      return;
    }

    const saved = await res.json().catch(() => null);
    if (!settingId && saved?.id) {
      setSettingId(Number(saved.id));
    }

    setStatusMsg("Configuracion guardada correctamente.");
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
              Calibra el algoritmo central y lanza simulaciones A/B sobre perfiles reales.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="glass-card rounded-3xl shadow-lg border border-gray-200/50 dark:border-zinc-800/50 p-8 flex flex-col gap-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-400/5 rounded-full blur-[60px] -mr-20 -mt-20 pointer-events-none"></div>

            <div className="flex items-center gap-2 border-b border-gray-100 dark:border-zinc-800 pb-4">
              <Settings className="text-gray-400" />
              <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">Pesos Globales</h2>
            </div>

            <div className="flex flex-col gap-8 relative z-10">
              <div className="flex flex-col gap-3 group">
                <div className="flex justify-between items-center">
                  <label htmlFor="interests-weight" className="font-bold flex items-center gap-2 text-gray-800 dark:text-gray-200">
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

              <div className="flex flex-col gap-3 group">
                <div className="flex justify-between items-center">
                  <label htmlFor="age-weight" className="font-bold flex items-center gap-2 text-gray-800 dark:text-gray-200">
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

              <div className="flex flex-col gap-3 group">
                <div className="flex justify-between items-center">
                  <label htmlFor="distance-weight" className="font-bold flex items-center gap-2 text-gray-800 dark:text-gray-200">
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
              className={`mt-2 p-4 rounded-xl text-sm font-bold flex items-center justify-between shadow-sm border ${
                totalWeight === 100
                  ? "bg-green-50/80 border-green-200 text-green-700 dark:bg-green-900/20 dark:border-green-800/50 dark:text-green-400"
                  : "bg-red-50/80 border-red-200 text-red-700 dark:bg-red-900/20 dark:border-red-800/50 dark:text-red-400 animate-pulse"
              }`}
            >
              <span className="flex items-center gap-2">
                {totalWeight === 100 ? <CheckCircle2 size={18} /> : <AlertTriangle size={18} />}
                Carga Matemática:
              </span>
              <span className="text-lg">{totalWeight}% / 100%</span>
            </div>

            {statusMsg && <p className="text-sm text-zinc-500 dark:text-zinc-400">{statusMsg}</p>}

            <div className="flex gap-4 mt-2">
              <Button
                variant="outline"
                onClick={testConfiguration}
                leftIcon={<RefreshCw size={18} className={loading ? "animate-spin" : ""} />}
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
                Guardar Configuracion
              </Button>
            </div>
          </div>

          <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-lg border border-gray-200/50 dark:border-zinc-800/50 p-8 flex flex-col relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5 dark:opacity-[0.02] pointer-events-none"></div>

            <div className="flex items-center justify-between border-b border-gray-100 dark:border-zinc-800 pb-4 mb-6 relative z-10">
              <div className="flex items-center gap-2">
                <BarChart2 className="text-gray-400" />
                <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">Impacto en Vivo</h2>
              </div>
              <span className="text-xs font-black uppercase tracking-wider text-gray-400 bg-gray-100 dark:bg-zinc-800 px-3 py-1 rounded-full">
                v2.2.0
              </span>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center relative z-10 w-full min-h-[300px]">
              {!results && !loading && (
                <div className="text-center text-gray-400 dark:text-gray-500 flex flex-col items-center animate-fade-in-up">
                  <div className="w-20 h-20 bg-gray-50 dark:bg-zinc-800/50 rounded-full flex items-center justify-center mb-4 shadow-inner">
                    <Brain size={40} className="opacity-50" />
                  </div>
                  <p className="font-medium max-w-[250px]">
                    Ejecuta una simulacion con usuarios reales para ver el impacto del modelo.
                  </p>
                </div>
              )}
              {loading && (
                <div className="text-center flex flex-col items-center gap-4">
                  <div className="w-16 h-16 border-4 border-gray-200 dark:border-zinc-800 border-t-primary-500 rounded-full animate-spin"></div>
                  <p className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500 animate-pulse">
                    Procesando perfiles reales...
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
                        <span className="font-black text-gray-800 dark:text-gray-200">{res.nombre}</span>
                        <div
                          className={`px-3 py-1 rounded-lg font-black text-sm shadow-inner flex items-center gap-1 ${
                            res.score >= 80
                              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                              : res.score >= 50
                                ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                                : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                          }`}
                        >
                          {res.score >= 80 ? "Alto" : res.score >= 50 ? "Medio" : "Bajo"}
                          {res.score}/100
                        </div>
                      </div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400 leading-relaxed bg-gray-50 dark:bg-zinc-800/50 p-3 rounded-lg border border-gray-100 dark:border-zinc-700/30">
                        {res.motivo}
                      </p>
                    </div>
                  ))}
                  {results.length === 0 && (
                    <p className="text-sm text-zinc-500">No hay suficientes usuarios para ejecutar una simulacion.</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
