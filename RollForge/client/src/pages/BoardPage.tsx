
import DiceRoller from '@/components/DiceRoller.tsx';
import DraggableResizable from '@/components/DraggableResizable.tsx';
import PlayerList from '@/components/PlayerList.tsx';
import HexGridMap from '@/components/HexGridMap.tsx';
import { PlayersProvider } from '@/context/PlayersContext.tsx';
import { getPanelDefault } from '@/config/panels.ts';


const BoardPage = () => {
  return (
    <PlayersProvider>
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
    </PlayersProvider>
  );
}

export default BoardPage;