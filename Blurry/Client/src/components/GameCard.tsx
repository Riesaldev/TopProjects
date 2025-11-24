
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
      className="border rounded-lg shadow p-4 flex flex-col items-center cursor-pointer hover:bg-gray-50 w-60"
      onClick={() => onSelect?.(game.id)}
    >
      <img
        src={game.imageUrl || "/public/globe.svg"}
        alt={game.name}
        className="w-16 h-16 object-cover rounded mb-2"
      />
      <h4 className="font-bold text-lg mb-1">{game.name}</h4>
      <p className="text-gray-600 text-sm mb-2 text-center">{game.description}</p>
      <button className="bg-primary-600 text-white px-3 py-1 rounded hover:bg-primary-700 mt-2">Jugar</button>
    </div>
  );
} 