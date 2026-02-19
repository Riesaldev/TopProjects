import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import Logo from '@/components/common/Logo';

const NAV_LINKS = [
  { to: '/campaigns', label: 'Campaigns' },
  { to: '/characters', label: 'Characters' },
  { to: '/compendium', label: 'Compendium' },
] as const;

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `text-sm font-medium transition-all ${
    isActive ? 'text-primary font-bold' : 'text-text-primary hover:text-primary'
  }`;

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
          {NAV_LINKS.map(({ to, label }) => (
            <li key={to}>
              <NavLink to={to} className={navLinkClass}>
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* User Avatar (desktop) */}
      <Link className="hidden md:flex relative z-10 items-center gap-3 cursor-pointer mr-6" to="/profile">
        <img
          src="/Avatar.svg"
          alt="User Avatar"
          className="w-18 h-18 rounded-full object-cover border-2 border-primary"
        />
        <span className={`h-4 w-4 border-2 border-border-dark rounded-full absolute bottom-1 right-2 ${isOnline ? 'bg-accent-green' : 'bg-accent-red'}`}></span>
      </Link>

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
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={navLinkClass}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </NavLink>
          ))}
          {/* Avatar mobile */}
          <Link to="/profile" className="flex items-center gap-3 pt-2 border-t border-border-dark-heavy/30" onClick={() => setMenuOpen(false)}>
            <div className="relative">
              <img
                src="/Avatar.svg"
                alt="User Avatar"
                className="w-10 h-10 rounded-full object-cover border-2 border-primary"
              />
              <span className={`h-3 w-3 border-2 border-border-dark rounded-full absolute bottom-0 right-0 ${isOnline ? 'bg-accent-green' : 'bg-accent-red'}`}></span>
            </div>
            <span className="text-text-primary">My Profile</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}