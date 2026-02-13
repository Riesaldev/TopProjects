import { Dice3, Search } from 'lucide-react';
import { useState } from 'react';
import { BRAND_CONFIG } from '../../../data/authConstants';

export default function ProfileHeader() {
  const [isOnline] = useState(true);
  return (
    <header className="w-full border-b border-border-dark-heavy/50 p-4 flex items-center gap-18 justify-between">
      {/*Logo*/}
      <div className="relative z-10 flex items-center gap-6 ml-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded bg-primary/80">
            <Dice3 className="w-8 h-8 text-white" />
          </div>
          <a rel="login" href="/" className="text-2xl font-bold tracking-tight text-text-primary cursor-pointer">
            {BRAND_CONFIG.LOGO_TEXT}
          </a>
        </div>
      </div>
      {/* User Menu */}
      <nav className="relative z-10">
        <ul className="flex items-center gap-6">
          <li className="flex items-center gap-22 text-lg ">
            <a href="/campaigns" className="text-text-primary hover:text-primary hover:scale-115 active:scale-95 transition-all">
              Campaigns
            </a>
            <a href="/compendium"
              className="text-text-primary hover:text-primary hover:scale-115 active:scale-95 transition-all">
              Compendium
            </a>
          </li>
        </ul>
      </nav>
      {/* Campaign Search */}
      <div className="relative z-10">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-text-primary/50"
          aria-hidden="true"
        />
        <input
          className="w-full text-text-muted/20 bg-border-dark pl-15 pr-20 py-2 rounded-xl border border-border-dark-heavy focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
          type="text"
          placeholder="Search campaigns..."
          aria-label="Search campaigns"
        />
      </div>
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