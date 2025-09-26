import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Swords } from 'lucide-react';

const Header = () => {
  // TODO: Reemplazar por estado global de autenticación real.
  const [isLoggedIn] = useState(false);
  const user = { name: 'Player' } as const;
  return (
    <header className="bg-gray-800 border-b border-gray-600 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Swords className="w-8 h-8 text-yellow-400" />
            <Link className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent" to="/">
              RollForge
            </Link>
          </div>
          <div className="text-gray-400">|</div>
          <div>
            <h2 className="text-lg font-semibold text-secondary">The Fellowship's Quest</h2>
          </div>
        </div>
        {isLoggedIn ? (
          <div className="text-secondary gap-4 flex justify-end ml-10">
            <Link to="/profile" className="hover:scale-110 hover:underline">{user.name}</Link>
          </div>
        ) : (
          <div className="text-secondary gap-4 flex justify-end ml-10">
            <Link to="/register" className="hover:scale-110 hover:underline">Register</Link>
            <p>/</p>
            <Link to="/login" className="hover:scale-110 hover:underline">Login</Link>
          </div>
        )}
      </div>
    </header >
  );
};

export default Header;