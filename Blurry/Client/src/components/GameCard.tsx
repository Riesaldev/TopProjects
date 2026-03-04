
import { Play, Star } from "lucide-react";

type Game = {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
};

type Props = {
  game: Game;
  onSelect?: (id: string) => void;
};

export default function GameCard({ game, onSelect }: Props) {
  return (
    <div
      className="glass-card w-full sm:w-60 group cursor-pointer relative overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 p-5 rounded-2xl flex flex-col items-center border border-zinc-800/50 hover:border-primary-500/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.2)]"
      onClick={() => onSelect?.(game.id)}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-0" />
      
      <div className="relative mb-4 group-hover:rotate-3 transition-transform duration-300 z-10 w-20 h-20 perspective-500">
        <div className="absolute inset-0 bg-primary-500 rounded-2xl blur-[15px] opacity-20 group-hover:opacity-50 transition-opacity" />
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
      <p className="text-zinc-400 text-xs mb-4 text-center font-medium leading-relaxed line-clamp-2 z-10 h-8">{game.description}</p>
      
      <button className="w-full gamified text-white px-4 py-2 mt-auto text-xs flex items-center justify-center gap-2 group-hover:shadow-neon transition-all z-10 rounded-xl font-bold tracking-widest uppercase">
        <Play className="w-3 h-3 fill-current" /> Play
      </button>
    </div>
  );
} 