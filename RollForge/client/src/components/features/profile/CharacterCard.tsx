import type { Character } from '../../../types/profile';

interface CharacterCardProps {
  character: Character;
  onSelect?: (character: Character) => void;
}

export default function CharacterCard({ character, onSelect }: CharacterCardProps) {
  return (
    <div
      className="group relative bg-surface-dark rounded-xl overflow-hidden border border-border-dark hover:border-primary/50 transition-all hover:shadow-xl hover:shadow-primary/5 cursor-pointer"
      onClick={() => onSelect?.(character)}
    >
      <div
        className="h-32 w-full bg-cover bg-center relative"
        style={{ backgroundImage: character.backgroundImage }}
      >
        <div className="absolute inset-0 bg-linear-to-t from-surface-dark to-transparent"></div>
        <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-white border border-white/10">
          {character.system} <span className='text-text-muted'> || </span>
          Lvl {character.level}
        </div>
      </div>
      <div className="p-4 relative">
        <div className="absolute -top-10 left-4 size-16 rounded-lg border-4 border-surface-dark overflow-hidden bg-slate-800 shadow-lg">
          <img alt={character.name} className="w-full h-full object-cover" src={character.portraitImage} />
        </div>
        <div className="ml-16 mb-2">
          <h4 className="font-bold text-text-primary leading-tight">{character.name}</h4>
          <span className="text-xs text-text-muted">
            {character.race} {character.class}
          </span>
        </div>
      </div>
    </div>
  );
}

