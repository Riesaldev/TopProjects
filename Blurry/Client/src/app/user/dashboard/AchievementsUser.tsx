"use client";

import { Achievement, UserAchievement } from "@/types";
import { Trophy } from "lucide-react";

export default function AchievementsUser({ all, userAchievements }: {
  all: Achievement[];
  userAchievements: UserAchievement[];
}) {
  if (!all || !Array.isArray(all)) {
    return (
      <div className="bg-zinc-900/50 rounded-3xl p-6 mb-8 w-full border border-zinc-800/50">
        <h2 className="font-bold mb-4 text-xl text-white tracking-tight flex items-center gap-2"><Trophy className="w-5 h-5 text-yellow-500" /> Trophies</h2>
        <div className="animate-pulse bg-zinc-800/50 h-20 rounded-xl" />
      </div>
    );
  }

  if (!userAchievements || !Array.isArray(userAchievements)) {
    return (
      <div className="bg-zinc-900/50 rounded-3xl p-6 mb-8 w-full border border-zinc-800/50">
        <h2 className="font-bold mb-4 text-xl text-white tracking-tight flex items-center gap-2"><Trophy className="w-5 h-5 text-yellow-500" /> Trophies</h2>
        <div className="animate-pulse bg-zinc-800/50 h-20 rounded-xl" />
      </div>
    );
  }

  const achievedIds = userAchievements.map(a => a.achievementId);
  
  return (
    <div className="w-full relative z-10 p-5">
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-yellow-500/20 p-2.5 rounded-xl ring-1 ring-yellow-500/30 shadow-inner">
          <Trophy className="h-5 w-5 text-yellow-400 drop-shadow-[0_0_8px_rgba(234,179,8,0.5)]" />
        </div>
        <h2 className="text-xl font-black text-white tracking-tight">Trophy Room</h2>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {all.map(l => {
          const unlocked = achievedIds.includes(l.id);
          const userAch = userAchievements.find(a => a.achievementId === l.id);
          return (
            <div key={l.id} className={`flex flex-col items-center p-4 rounded-2xl border transition-all duration-300 relative group overflow-hidden ${
              unlocked 
              ? "border-yellow-500/50 bg-gradient-to-br from-yellow-500/10 to-amber-500/5 hover:shadow-[0_0_15px_rgba(234,179,8,0.2)]" 
              : "border-zinc-800/50 bg-zinc-900/40 opacity-75 grayscale sepia-[0.5] hover:grayscale-0 hover:opacity-100"
            }`}>
              {unlocked && <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-500/10 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />}
              <span className="text-4xl mb-3 drop-shadow-md group-hover:scale-110 transition-transform duration-300">{l.icon || "🏆"}</span>
              <span className="font-bold text-center mb-1 text-white text-sm tracking-wide leading-tight">{l.name || "Logro"}</span>
              <span className="text-[10px] text-zinc-400 text-center mb-3 leading-relaxed">{l.description || "No description"}</span>
              <div className="mt-auto flex flex-col items-center">
                <span className="text-[10px] font-black text-yellow-400 uppercase tracking-widest bg-yellow-500/10 px-2 py-0.5 rounded-md mb-2">{l.tokenReward || 0} TKN</span>
                {unlocked && userAch && (
                  <span className="text-green-400 text-[9px] font-bold tracking-widest text-center uppercase">
                    UNLOCKED<br/>
                    <span className="text-zinc-500 font-medium">{userAch.date ? new Date(userAch.date).toLocaleDateString() : ''}</span>
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
} 