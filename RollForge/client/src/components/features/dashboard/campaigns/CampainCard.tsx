import type { Campaign } from '@/types/profile';

interface CampainCardProps {
  campaign: Campaign;
  onSelect?: (campaign: Campaign) => void;
}

export default function CampainCard({ campaign, onSelect }: CampainCardProps) {
  const visiblePlayers = campaign.players.slice(0, 3);
  const remainingCount = campaign.players.length - 3;

  return (
    <div
      className="group relative flex flex-col bg-white dark:bg-surface-dark rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 border border-slate-200 dark:border-slate-800/50 hover:border-primary/50 dark:hover:border-primary/50 cursor-pointer"
      onClick={() => onSelect?.(campaign)}
    >
      {/* Campaign Background Image */}
      <div
        className="h-40 w-full bg-cover bg-center relative"
        style={{ backgroundImage: `url('${campaign.backgroundImage}')` }}
      >
        <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent"></div>
        <span className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-xs font-bold text-white px-2 py-1 rounded border border-white/10">
          {campaign.system}
        </span>
      </div>

      {/* Campaign Info */}
      <div className="p-4 flex flex-col flex-1">
        <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1 group-hover:text-primary transition-colors">
          {campaign.name}
        </h4>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 line-clamp-2">
          {campaign.description}
        </p>

        {/* Footer with Players and Launch Button */}
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
          {/* Player Avatars */}
          <div className="flex -space-x-2 overflow-hidden">
            {visiblePlayers.map((player, index) => (
              player.avatar ? (
                <img
                  key={index}
                  alt={player.name}
                  className="inline-block h-6 w-6 rounded-full ring-2 ring-white dark:ring-[#1d1c27]"
                  src={player.avatar}
                />
              ) : (
                <div
                  key={index}
                  className="h-6 w-6 rounded-full ring-2 ring-white dark:ring-[#1d1c27] bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-500 dark:text-slate-300"
                >
                  {player.name.charAt(0)}
                </div>
              )
            ))}
            {remainingCount > 0 && (
              <div className="h-6 w-6 rounded-full ring-2 ring-white dark:ring-[#1d1c27] bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-500 dark:text-slate-300">
                +{remainingCount}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}