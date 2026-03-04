export type UserProfile = {
  name: string;
  avatarUrl?: string;
  bio?: string;
  rating?: number;
};

type Props = {
  user: UserProfile;
};

export default function UserProfileCard({ user }: Props) {
  return (
    <div className="relative group w-72 rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2 perspective-1000">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 via-zinc-900/90 to-zinc-950 backdrop-blur-xl border border-zinc-700/50 rounded-2xl z-0 transition-all duration-300 group-hover:border-primary-500/50 group-hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]" />
      
      {/* Holographic reflection effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-[linear-gradient(110deg,transparent_20%,rgba(255,255,255,0.1)_25%,transparent_30%)] bg-[length:200%_200%] animate-shimmer z-10 transition-opacity duration-700 pointer-events-none" />

      <div className="relative z-20 flex flex-col items-center p-6 h-full">
        {/* Card Header / Rarity indicator */}
        <div className="w-full flex justify-between items-center mb-4">
          <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest px-2 py-0.5 border border-zinc-800 rounded bg-zinc-900/50">
            ID: #{Math.floor(Math.random() * 9000) + 1000}
          </span>
          {user.rating && user.rating >= 4.5 && (
            <span className="text-[9px] font-black text-amber-400 uppercase tracking-widest px-2 py-0.5 border border-amber-500/30 rounded bg-amber-500/10 shadow-[0_0_10px_rgba(251,191,36,0.2)] animate-pulse">
              [ LEGENDARY ]
            </span>
          )}
        </div>

        {/* Avatar */}
        <div className="relative mb-5 group/avatar perspective-500">
          <div className="absolute inset-0 bg-primary-500 blur-[20px] rounded-full opacity-20 group-hover/avatar:opacity-60 transition-opacity duration-300" />
          <img
            src={user.avatarUrl || "/globe.svg"}
            alt={user.name}
            className="w-28 h-28 rounded-2xl object-cover border-2 border-zinc-700/80 shadow-2xl relative z-10 transition-transform duration-500 group-hover/avatar:rotate-y-12 group-hover/avatar:scale-105"
            style={{ transformStyle: 'preserve-3d' }}
          />
          <div className="absolute -bottom-3 -right-3 bg-zinc-900 border border-zinc-700/80 w-10 h-10 rounded-xl flex items-center justify-center shadow-xl z-20 transform rotate-12 transition-transform duration-300 group-hover/avatar:rotate-0 group-hover/avatar:scale-110">
            <span className="text-sm font-black text-white">4</span>
          </div>
        </div>

        {/* Info */}
        <h3 className="font-black text-2xl mb-1 text-white tracking-tight drop-shadow-md text-center">{user.name}</h3>
        {user.bio ? (
          <p className="text-zinc-400 text-xs mb-6 text-center line-clamp-3 font-medium leading-relaxed leading-relaxed min-h-[54px]">
            {user.bio}
          </p>
        ) : (
          <p className="text-zinc-600 text-xs mb-6 text-center font-medium italic min-h-[54px] flex items-center justify-center">
            Signal lost...
          </p>
        )}

        {/* Stats */}
        {user.rating && (
          <div className="flex flex-col items-center w-full mt-auto bg-zinc-900/60 p-3 rounded-xl border border-zinc-800/50 relative overflow-hidden group-hover:border-primary-500/30 transition-colors">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-400 to-orange-600" />
            <div className="flex justify-between w-full items-center mb-1.5 px-1">
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Sync Rate</span>
              <span className="text-[10px] font-black text-amber-500">{user.rating.toFixed(1)} <span className="text-zinc-600">/ 5.0</span></span>
            </div>
            <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden relative shadow-inner">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-orange-500 relative"
                style={{ width: `${(user.rating / 5) * 100}%` }}
              >
                <div className="absolute inset-0 bg-white/20 w-full animate-[shimmer_2s_infinite]" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
