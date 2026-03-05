
import { Brain, Play, Swords, Star } from "lucide-react";

type Game = {
  id: string | number;
  name: string;
  description: string;
  category?: "game" | "test" | string;
  imageUrl?: string;
};

type Props = {
  game: Game;
  onSelect?: (id: string | number) => void;
};

export default function GameCard({ game, onSelect }: Props) {
  const isTest = game.category === "test";
  const accentClass = isTest
    ? "hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(34,211,238,0.22)]"
    : "hover:border-violet-400/50 hover:shadow-[0_0_20px_rgba(167,139,250,0.22)]";
  const glowClass = isTest ? "from-cyan-500/10" : "from-violet-500/10";
  const iconGlowClass = isTest ? "bg-cyan-500" : "bg-violet-500";
  const CategoryIcon = isTest ? Brain : Swords;

  return (
    <div
      className={`glass-card w-full sm:w-60 group cursor-pointer relative overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 p-5 rounded-2xl flex flex-col items-center border border-zinc-800/50 ${accentClass}`}
      onClick={() => onSelect?.(game.id)}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${glowClass} to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-0`} />
      
      <div className="relative mb-4 group-hover:rotate-3 transition-transform duration-300 z-10 w-20 h-20 perspective-500">
        <div className={`absolute inset-0 ${iconGlowClass} rounded-2xl blur-[15px] opacity-20 group-hover:opacity-50 transition-opacity`} />
        <img
          src={game.imageUrl || "/globe.svg"}
          alt={game.name}
          className="w-full h-full object-cover rounded-2xl border-2 border-zinc-700/80 shadow-xl relative z-10 p-1 bg-zinc-900"
        />
        <div className="absolute -top-2 -right-2 bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 p-1 rounded-full shadow-lg z-20 backdrop-blur-sm">
          <Star className="w-3 h-3 fill-yellow-400" />
        </div>
      </div>
      
      <h4 className="font-black text-lg mb-1.5 text-white tracking-tight drop-shadow-md z-10">{game.name}</h4>
      <span className={`mb-2 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-black uppercase tracking-widest z-10 ${isTest ? "border-cyan-400/40 text-cyan-300 bg-cyan-500/10" : "border-violet-400/40 text-violet-300 bg-violet-500/10"}`}>
        <CategoryIcon className="w-3 h-3" />
        {isTest ? "Test" : "Juego"}
      </span>
      <p className="text-zinc-400 text-xs mb-4 text-center font-medium leading-relaxed line-clamp-2 z-10 h-8">{game.description}</p>
      
      <button className="w-full gamified text-white px-4 py-2 mt-auto text-xs flex items-center justify-center gap-2 group-hover:shadow-neon transition-all z-10 rounded-xl font-bold tracking-widest uppercase">
        <Play className="w-3 h-3 fill-current" /> Abrir
      </button>
    </div>
  );
} 