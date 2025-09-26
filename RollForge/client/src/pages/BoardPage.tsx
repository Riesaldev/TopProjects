
import DiceRoller from '@/components/DiceRoller.tsx';
import DraggableResizable from '@/components/DraggableResizable.tsx';
import PlayerList from '@/components/PlayerList.tsx';
import HexGridMap from '@/components/HexGridMap.tsx';
import { getPanelDefault } from '@/config/panels.ts';


const BoardPage = () => {
  // PlayersProvider ya se monta en main.tsx a nivel de aplicación.
  return (
    <div className="h-screen bg-gray-900 text-white flex flex-col">
      <div className="flex-1 relative min-h-0 overflow-hidden">
        <DraggableResizable id="dice-roller" initial={getPanelDefault('dice-roller')} onChange={() => { }}>
          <DiceRoller onRoll={(result) => console.log(result)} />
        </DraggableResizable>
        <DraggableResizable id="players" initial={getPanelDefault('players')} onChange={() => { }}>
          <PlayerList />
        </DraggableResizable>
        <DraggableResizable id="hex-map" initial={getPanelDefault('hex-map')} onChange={() => { }}>
          <HexGridMap />
        </DraggableResizable>
      </div>
    </div>
  );
}

export default BoardPage;