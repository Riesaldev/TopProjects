"use client";

import { Achievement, UserAchievement } from "@/types";

export default function AchievementsUser({ all, userAchievements }: {
  all: Achievement[];
  userAchievements: UserAchievement[];
}) {
  // Validación de datos antes de renderizar
  if (!all || !Array.isArray(all)) {
    return (
      <div className="bg-white rounded-xl shadow p-4 mb-8">
        <h2 className="font-semibold mb-4 text-lg">Logros y recompensas</h2>
        <p className="text-gray-500">Cargando logros...</p>
      </div>
    );
  }

  if (!userAchievements || !Array.isArray(userAchievements)) {
    return (
      <div className="bg-white rounded-xl shadow p-4 mb-8">
        <h2 className="font-semibold mb-4 text-lg">Logros y recompensas</h2>
        <p className="text-gray-500">Cargando progreso...</p>
      </div>
    );
  }

  const achievedIds = userAchievements.map(a => a.achievementId);
  
  return (
    <div className="bg-white rounded-xl shadow p-4 mb-8">
      <h2 className="font-semibold mb-4 text-lg">Logros y recompensas</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {all.map(l => {
          const unlocked = achievedIds.includes(l.id);
          const userAch = userAchievements.find(a => a.achievementId === l.id);
          return (
            <div key={l.id} className={`flex flex-col items-center p-3 rounded-xl border-2 ${unlocked ? "border-green-400 bg-green-50" : "border-gray-200 bg-gray-50"} transition`}>
              <span className="text-3xl mb-1">{l.icon || "🏆"}</span>
              <span className="font-bold text-center mb-1">{l.name || "Logro"}</span>
              <span className="text-xs text-gray-500 text-center mb-2">{l.description || "Descripción no disponible"}</span>
              <span className="text-xs text-primary-600 font-semibold">{l.tokenReward || 0} tokens</span>
              {unlocked && userAch && (
                <span className="text-green-600 text-xs mt-1">
                  ¡Desbloqueado!<br/>
                  ({userAch.date ? new Date(userAch.date).toLocaleDateString() : 'Fecha inválida'})
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
} 