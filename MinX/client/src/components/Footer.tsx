
import { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';

/**
 * Footer
 * Qué: pie de página con enlaces de navegación secundaria, formulario de suscripción y redes sociales.
 * Cómo: estructura semántica dividida en secciones para company/help/resources/contact.
 * Por qué: refuerza branding y accesibilidad a enlaces legales y de soporte.
 */
const linkGroups = [
  {
    title: 'Company',
    links: [
      { label: 'About', to: '/about' },
      { label: 'Features', to: '/features' },
      { label: 'Works', to: '/works' },
      { label: 'Career', to: '/career' },
    ],
  },
  {
    title: 'Help',
    links: [
      { label: 'Customer Support', to: '/support' },
      { label: 'Delivery Details', to: '/delivery' },
      { label: 'Terms & Conditions', to: '/terms' },
      { label: 'Privacy Policy', to: '/privacy' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Blog', to: '/blog' },
      { label: 'Documentation', to: '/documentation' },
      { label: 'API Reference', to: '/api-reference' },
      { label: 'Community', to: '/community' },
    ],
  },
];

const socialLinks = [
  { icon: 'bi-twitter-x', label: 'Twitter', to: '/community' },
  { icon: 'bi-linkedin', label: 'LinkedIn', to: '/career' },
  { icon: 'bi-instagram', label: 'Instagram', to: '/blog' },
  { icon: 'bi-github', label: 'GitHub', to: '/documentation' },
];

const Footer = () => {
  const [ isNewsletterVisible, setIsNewsletterVisible ] = useState( true );
  return (
    <footer className="mt-auto border-t border-white/5 bg-[#04050f] text-white" aria-label="Pie de página">
      <div className="max-w-6xl mx-auto px-6 py-16 flex flex-col gap-12">
        <section className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-md space-y-6">
            <Link to="/" aria-label="Logo MiniX" className="flex items-center gap-3 text-white">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#00e1d9] to-[#7f5af0] text-[#05060f] text-2xl font-bold shadow-[0_10px_30px_rgba(0,225,217,0.25)]">
                /
              </span>
              <div>
                <p className="text-2xl font-semibold tracking-wide leading-none">
                  Mini<span className="text-[#00e1d9]">X</span>
                </p>
                <p className="text-xs uppercase tracking-[0.4em] text-white/60">Create bold conversations</p>
              </div>
            </Link>
            <p className="text-white/70 text-sm leading-relaxed">
              Diseñamos experiencias sociales para equipos que necesitan moverse rápido. MiniX combina mensajería, comunidad y analítica en un solo espacio pulido.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map(({ icon, label, to }) => (
                <Link
                  key={icon}
                  to={to}
                  aria-label={label}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 text-lg text-white/70 hover:text-white hover:border-white/40 hover:-translate-y-0.5 transition-all duration-200"
                >
                  <i className={`bi ${icon}`} />
                </Link>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 flex-1">
            {linkGroups.map((group) => (
              <div key={group.title}>
                <p className="text-xs uppercase tracking-[0.4em] text-white/40 mb-4">{group.title}</p>
                <ul className="space-y-2.5 text-sm text-white/70">
                  {group.links.map((item) => (
                    <li key={item.to}>
                      <Link
                        to={item.to}
                        className="link-underline hover:text-white transition-colors duration-150"
                        aria-label={item.label}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {isNewsletterVisible && (
            <div className="relative frosted-card p-6 shadow-lg shadow-[#000000]/40 max-w-sm w-full border-white/10" aria-label="Formulario de suscripción">
              <button
                type="button"
                className="absolute -right-2 -top-2 inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-[#05060f]/70 text-white/70 hover:text-white hover:border-white/40 transition"
                aria-label="Cerrar newsletter"
                onClick={() => setIsNewsletterVisible( false )}
              >
                <i className="bi bi-x-lg" />
              </button>
              <p className="text-sm uppercase tracking-[0.35em] text-white/50 mb-3">newsletter</p>
              <h3 className="text-xl font-semibold mb-3">Historias que elevan tu producto</h3>
              <p className="text-white/70 text-sm mb-6">
                Recibe estudios de caso, patrones de producto y micro-animaciones seleccionadas por el equipo de diseño de MiniX.
              </p>
              <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                <label className="text-xs uppercase tracking-[0.35em] text-white/40 block">correo</label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    required
                    placeholder="you@studio.com"
                    className="flex-1 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#7f5af0] focus:ring-2 focus:ring-[#7f5af0]/40 transition"
                    aria-label="Correo para suscripción"
                  />
                  <button type="submit" className="btn-primary w-full sm:w-auto">
                    Join
                  </button>
                </div>
              </form>
              <p className="text-xs text-white/40 mt-4">Sin spam. Cancela cuando quieras.</p>
            </div>
          )}
        </section>

        <section className="flex flex-col gap-4 border-t border-white/5 pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-white/50">© {new Date().getFullYear()} MiniX Labs. Crafted with intent.</p>
          <div className="flex flex-wrap gap-3 text-xs text-white/60">
            <Link to="/privacy" className="pill-link !text-xs">
              Privacy
            </Link>
            <Link to="/terms" className="pill-link !text-xs">
              Terms
            </Link>
            <Link to="/support" className="pill-link !text-xs">
              Support
            </Link>
          </div>
        </section>
      </div>
    </footer>
  );
};

export default Footer;