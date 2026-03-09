import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

/**
 * Header
 * Qué: barra superior con branding y acciones de autenticación.
 * Cómo: consume UserContext para decidir render de Login/Register vs Avatar + Logout.
 * Por qué: navegación global persistente en toda la SPA.
 */
const Header = () => {
  const ctx = useContext(UserContext);
  const user = ctx?.user;
  const username = user?.username;
  const avatar = user?.avatar as string | undefined | null;

  // Derivación inicial para avatar placeholder.
  const initial = (username?.charAt(0) || 'U').toUpperCase();

  // futuro: implementar modal de confirmación antes de cerrar sesión + feedback UI.
  const Logout = () => { ctx?.LogOut(); };

  // Subcomponente interno para encapsular badge de avatar.
  const navLinks = [
    { to: '/features', label: 'Features' },
    { to: '/messages', label: 'Messages' },
    { to: '/community', label: 'Community' },
    { to: '/about', label: 'About' },
  ];

  const AvatarBadge = () => (
    <Link
      to="/profile"
      className="relative group inline-block w-11 h-11 rounded-full overflow-hidden shadow-lg ring-2 ring-white/10 hover:ring-[#00e1d9] transition-all duration-200"
      aria-label="Ir al perfil"
    >
      {avatar ? (
        <img
          src={avatar}
          alt="Perfil"
          className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-[#7f5af0]/80 via-[#5b2be6] to-[#241551] text-white flex items-center justify-center font-semibold select-none">
          {initial}
        </div>
      )}
      <span className="pointer-events-none absolute -bottom-2 left-1/2 -translate-x-1/2 text-[10px] font-medium text-white bg-black/70 px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition">
        Perfil
      </span>
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-[#05060f]/80 backdrop-blur-2xl">
      <nav aria-label="Navegación principal" className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between gap-6">
        <Link to="/" aria-label="Ir a inicio" className="flex items-center gap-3 text-white">
          <span className="flex items-center gap-2 text-2xl font-semibold tracking-wide">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#00e1d9] to-[#7f5af0] text-[#05060f] font-bold shadow-[0_10px_30px_rgba(0,225,217,0.25)]">
              /
            </span>
            Mini<span className="text-[#00e1d9]">X</span>
          </span>
          <span className="hidden md:inline-flex text-xs font-medium uppercase tracking-[0.3em] text-white/50 px-3 py-1 rounded-full border border-white/10">
            Social OS
          </span>
        </Link>

        <ul className="hidden md:flex items-center gap-2 text-sm font-medium text-white/70">
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link to={link.to} className="pill-link">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <section className="flex items-center gap-3">
          {user ? (
            <>
              <AvatarBadge />
              <button onClick={Logout} className="btn-secondary !px-4 !py-2 text-sm" aria-label="Cerrar sesión">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-secondary !px-4 !py-2 text-sm">
                Login
              </Link>
              <Link to="/register" className="btn-primary !px-4 !py-2 text-sm">
                Join MiniX
              </Link>
            </>
          )}
        </section>
      </nav>
    </header>
  );
};

export default Header;