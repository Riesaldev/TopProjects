import { useState } from 'react';
import Logo from '@/components/common/Logo';

export default function ProfileHeader() {
  const [isOnline] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full border-b border-border-dark-heavy/50 p-4 flex items-center justify-between relative">
      {/* Logo */}
      <div className="relative z-10 flex items-center gap-6 ml-6 scale-120">
        <Logo redirectTo="#" />
      </div>

      {/* Nav + Avatar (desktop) */}
      <nav className="hidden md:flex w-1/3 z-10 px-6 py-2 items-center justify-center">
        <ul className="w-full flex items-center justify-between">
          <li>
            <a href="/campaigns" className="text-text-primary hover:font-bold hover:text-2xl hover:text-primary hover:scale-115 active:scale-95 transition-all">
              Campaigns
            </a>
          </li>
          <li>
            <a href="/characters" className="text-text-primary hover:font-bold hover:text-2xl hover:text-primary hover:scale-115 active:scale-95 transition-all">
              Characters
            </a>
          </li>
          <li>
            <a href="/compendium" className="text-text-primary hover:font-bold hover:text-2xl hover:text-primary hover:scale-115 active:scale-95 transition-all">
              Compendium
            </a>
          </li>
        </ul>
      </nav>

      {/* User Avatar (desktop) */}
      <a className="hidden md:flex relative z-10 items-center gap-3 cursor-pointer mr-6" href="/profile">
        <img
          src="/Avatar.svg"
          alt="User Avatar"
          className="w-18 h-18 rounded-full object-cover border-2 border-primary"
        />
        <span className={`h-4 w-4 border-2 border-border-dark rounded-full absolute bottom-1 right-2 ${isOnline ? 'bg-accent-green' : 'bg-accent-red'}`}></span>
      </a>

      {/* Burger Button (mobile) */}
      <button
        className="md:hidden flex flex-col justify-center items-center gap-1.5 z-20 mr-4 cursor-pointer"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span className={`block h-0.5 w-6 bg-text-primary transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
        <span className={`block h-0.5 w-6 bg-text-primary transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}></span>
        <span className={`block h-0.5 w-6 bg-text-primary transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
      </button>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-background-dark border-b border-border-dark-heavy/50 z-10 transition-all duration-300 overflow-hidden ${menuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
        <nav className="flex flex-col px-6 py-4 gap-4">
          <a href="/campaigns" className="text-text-primary hover:text-primary hover:font-bold transition-all" onClick={() => setMenuOpen(false)}>
            Campaigns
          </a>
          <a href="/characters" className="text-text-primary hover:text-primary hover:font-bold transition-all" onClick={() => setMenuOpen(false)}>
            Characters
          </a>
          <a href="/compendium" className="text-text-primary hover:text-primary hover:font-bold transition-all" onClick={() => setMenuOpen(false)}>
            Compendium
          </a>
          {/* Avatar mobile */}
          <a href="/profile" className="flex items-center gap-3 pt-2 border-t border-border-dark-heavy/30" onClick={() => setMenuOpen(false)}>
            <div className="relative">
              <img
                src="/Avatar.svg"
                alt="User Avatar"
                className="w-10 h-10 rounded-full object-cover border-2 border-primary"
              />
              <span className={`h-3 w-3 border-2 border-border-dark rounded-full absolute bottom-0 right-0 ${isOnline ? 'bg-accent-green' : 'bg-accent-red'}`}></span>
            </div>
            <span className="text-text-primary">My Profile</span>
          </a>
        </nav>
      </div>
    </header>
  );
}