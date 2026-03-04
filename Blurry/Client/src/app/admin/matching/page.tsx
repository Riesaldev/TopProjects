'use client';

import React, { useState } from "react";

export default function AdminMatchingPage() {
  const [weights, setWeights] = useState({
    age: 30,
    distance: 20,
    interests: 50,
  });

  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<{ nombre: string; score: number; motivo: string }[] | null>(null);

  // Calcula que el total sea siempre 100 visualmente (opcional logico, pero ayuda al UX)
  const totalWeight = weights.age + weights.distance + weights.interests;

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>, key: keyof typeof weights) => {
    setWeights({ ...weights, [key]: Number(e.target.value) });
  };

  const testConfiguration = () => {
    setLoading(true);
    // Simula petición POST a /api/admin/matching/test con los pesos
    setTimeout(() => {
      setResults([
        { nombre: "Usuario Test A", score: 92, motivo: "Alta coincidencia en intereses según IA (Peso actual: " + weights.interests + "%)" },
        { nombre: "Usuario Test B", score: 78, motivo: "Penalizado por distancia extrema (Peso actual: " + weights.distance + "%)" },
        { nombre: "Usuario Test C", score: 45, motivo: "Mismos intereses pero brecha de edad bloqueante (Peso actual: " + weights.age + "%)" },
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
    <main className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Motor de Matching por IA</h1>
        <p className="text-gray-600 mb-8">Ajusta los pesos del algoritmo en tiempo real y prueba su eficacia en un entorno controlado (Sandbox).</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Controles de Configuración */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex flex-col gap-6">
            <h2 className="text-xl font-bold border-b pb-2">Pesos del Algoritmo</h2>
            
            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-center mb-1">
                <label htmlFor="interests-weight" className="font-semibold text-gray-700">🧠 Personalidad / Intereses</label>
                <span className="bg-indigo-100 text-indigo-800 font-bold px-2 py-1 rounded text-sm">{weights.interests}%</span>
              </div>
              <input id="interests-weight" type="range" min={0} max={100} value={weights.interests} onChange={e => handleSliderChange(e, 'interests')} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-center mb-1">
                <label htmlFor="age-weight" className="font-semibold text-gray-700">🎂 Afinidad de Edad</label>
                <span className="bg-indigo-100 text-indigo-800 font-bold px-2 py-1 rounded text-sm">{weights.age}%</span>
              </div>
              <input id="age-weight" type="range" min={0} max={100} value={weights.age} onChange={e => handleSliderChange(e, 'age')} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-center mb-1">
                <label htmlFor="distance-weight" className="font-semibold text-gray-700">📍 Distancia Geográfica</label>
                <span className="bg-indigo-100 text-indigo-800 font-bold px-2 py-1 rounded text-sm">{weights.distance}%</span>
              </div>
              <input id="distance-weight" type="range" min={0} max={100} value={weights.distance} onChange={e => handleSliderChange(e, 'distance')} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
            </div>

            <div className={`mt-2 p-3 rounded-lg text-sm font-semibold flex justify-between ${totalWeight === 100 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              <span>Suma total de pesos:</span>
              <span>{totalWeight}%</span>
            </div>

            <div className="flex gap-4 mt-2">
              <button 
                onClick={testConfiguration}
                className="flex-1 bg-white border-2 border-indigo-600 text-indigo-600 font-bold px-4 py-3 rounded-xl hover:bg-indigo-50 transition active:scale-95"
              >
                {loading ? "Calculando..." : "Test Sandbox"}
              </button>
              <button 
                onClick={saveConfiguration}
                disabled={totalWeight !== 100}
                className="flex-1 bg-indigo-600 text-white font-bold px-4 py-3 rounded-xl hover:bg-indigo-700 transition active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Aplicar en Prod
              </button>
            </div>
          </div>

          {/* Panel de Resultados (Sandbox) */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex flex-col">
            <h2 className="text-xl font-bold border-b pb-2 mb-4">Resultados de Simulación (A/B)</h2>
            <div className="flex-1 flex flex-col justify-center">
              {!results && !loading && (
                <div className="text-center text-gray-400">
                  <span className="text-4xl block mb-2">🧪</span>
                  <p>Ejecuta una prueba para ver cómo afecta esta configuración a los matches en vivo de los usuarios.</p>
                </div>
              )}
              {loading && (
                <div className="text-center text-indigo-600 font-bold animate-pulse">
                  Aplicando pesos sobre 10,000 perfiles simulados...
                </div>
              )}
              {results && !loading && (
                <div className="flex flex-col gap-4">
                  {results.map((res, i) => (
                    <div key={i} className="bg-gray-50 border border-gray-100 p-4 rounded-xl">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-bold text-gray-800">{res.nombre}</span>
                        <span className={`font-black text-lg ${res.score >= 80 ? 'text-green-600' : res.score >= 50 ? 'text-yellow-500' : 'text-red-500'}`}>{res.score}/100</span>
                      </div>
                      <p className="text-sm text-gray-600">{res.motivo}</p>
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