import React, { useState } from 'react';
import { usePlayers } from '../context/PlayersContext';
import { UserPlus, LogOut, Shield, Users } from 'lucide-react';

const PlayerList: React.FC = () => {
  const { players, login, logout } = usePlayers();
  const [name, setName] = useState('');
  const [asGM, setAsGM] = useState(false);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const added = login(name, { isGM: asGM });
    if (added) {
      setName('');
      setAsGM(false);
    }
  };

  return (
    <div className="p-3 text-sm space-y-4">
      <div className="flex items-center gap-2 text-white font-semibold">
        <Users className="w-4 h-4 text-yellow-400" />
        Jugadores
      </div>

      <form onSubmit={handleAdd} className="flex flex-col gap-2">
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Nombre"
          className="bg-gray-700 text-white px-2 py-1 rounded border border-gray-600 focus:outline-none focus:border-yellow-400 text-sm"
        />
        <label className="flex items-center gap-2 text-xs text-gray-300 select-none">
          <input type="checkbox" checked={asGM} onChange={e => setAsGM(e.target.checked)} />
          <span className="flex items-center gap-1">GM <Shield className="w-3 h-3 text-yellow-400" /></span>
        </label>
        <button
          type="submit"
          disabled={!name.trim()}
          className="flex items-center justify-center gap-1 bg-yellow-600 hover:bg-yellow-500 disabled:bg-gray-600 text-white px-2 py-1 rounded text-xs font-medium"
        >
          <UserPlus className="w-4 h-4" /> Entrar
        </button>
      </form>

      <div className="space-y-2 max-h-64 overflow-auto pr-1">
        {players.length === 0 && (
          <div className="text-gray-400 text-xs">No hay jugadores todavía.</div>
        )}
        {players.map(p => (
          <div key={p.id} className="flex items-center justify-between bg-gray-700/60 rounded px-2 py-1 border border-gray-600 gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-3 h-3 rounded-full" style={{ background: p.color, boxShadow: `0 0 4px ${p.color}` }} />
              <div className="flex flex-col leading-tight">
                <span className="text-white text-xs font-medium truncate max-w-[120px]">
                  {p.name} {p.isGM && <span className="text-yellow-400">(GM)</span>}
                </span>
                <span className={"text-[10px] " + (p.isOnline ? 'text-green-400' : 'text-gray-400')}>{p.isOnline ? 'online' : 'offline'}</span>
              </div>
            </div>
            {p.isOnline && (
              <button
                onClick={() => logout(p.id)}
                className="text-gray-300 hover:text-white p-1 rounded hover:bg-gray-600 transition-colors"
                title="Salir"
              >
                <LogOut className="w-3 h-3" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayerList;
