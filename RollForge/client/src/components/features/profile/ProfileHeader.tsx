import { useState } from 'react';
import Logo from '@/components/common/Logo';

export default function ProfileHeader() {
  const [isOnline] = useState(true);
  return (
    <header className="w-full border-b border-border-dark-heavy/50 p-4 flex items-center gap-18 justify-between">
      {/*Logo*/}
      <div className="relative z-10 flex items-center gap-6 ml-6 scale-120">
        <Logo redirectTo="#" />
      </div>
      {/* User Menu */}
      <nav className="w-1/3 z-10  px-6 py-2 flex items-center justify-center">
        <ul className=" w-full flex items-center justify-between">
          <li className="flex items-center">
            <a href="/campaigns" className="text-text-primary hover:font-bold hover:text-2xl hover:text-primary hover:scale-115 active:scale-95 transition-all">
              Campaigns
            </a>
          </li>
          <li className="flex items-center gap-2">
            <a href="/characters"
              className="text-text-primary hover:font-bold hover:text-2xl hover:text-primary hover:scale-115 active:scale-95 transition-all">
              Characters
            </a>
          </li>
          <li className="flex items-center gap-2">
            <a href="/compendium"
              className="text-text-primary hover:font-bold hover:text-2xl hover:text-primary hover:scale-115 active:scale-95 transition-all">
              Compendium
            </a>
          </li>
        </ul>
      </nav>

      {/* User Avatar */}
      <a className="relative z-10 flex items-center gap-3 cursor-pointer mr-6"
        href="/profile">
        <img
          src="/Avatar.svg"
          alt="User Avatar"
          className="w-18 h-18 rounded-full object-cover border-2 border-primary"
        />
        <span className={`h-4 w-4 border-2 border-border-dark rounded-full absolute bottom-1 right-2 ${isOnline ? 'bg-accent-green' : 'bg-accent-red'}`}></span>
      </a>
    </header>
  );
}