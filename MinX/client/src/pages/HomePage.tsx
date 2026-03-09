/**
 * HomePage
 * Qué: Landing pública que introduce la aplicación y CTA hacia registro.
 * Cómo: Presenta layout con fondo e información básica + enlace a /register.
 * Por qué: Primer punto de contacto que explica propósito antes de pedir credenciales.
 */
import { Link } from 'react-router-dom';

const Home = () => {
  const stats = [
    { value: '72k', label: 'Mensajes compartidos al día' },
    { value: '14k', label: 'Comunidades activas' },
    { value: '24%', label: 'Mejor conversión tras 30 días' },
  ];

  return (
    <div className="relative flex-1 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top,_var(--accent-primary)_0%,_transparent_50%)]" />
        <div className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_right,_rgba(0,225,217,0.35),_transparent_55%)] blur-3xl opacity-60" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-24 flex flex-col gap-16 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.4em] text-white/60">
              New drop
              <span className="inline-flex h-2 w-2 rounded-full bg-[#00e1d9] animate-pulse" />
              Studio OS
            </div>

            <h1 className="text-4xl leading-tight font-semibold sm:text-5xl lg:text-6xl text-balance">
              Diseña conversaciones memorables con la nueva experiencia MiniX.
            </h1>

            <p className="text-lg text-white/70 max-w-2xl leading-relaxed">
              Una capa social cuidadosamente pulida con efectos micro-interactivos, animaciones suaves y una paleta creada para destacar tu contenido. Tus mensajes merecen un escenario premium.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/register" className="btn-primary">
                Despegar ahora
              </Link>
              <Link to="/features" className="btn-secondary">
                Ver qué cambió
              </Link>
            </div>
          </div>

          <div className="glass-panel p-8 flex flex-col gap-8 border-white/10">
            <div className="rounded-[26px] border border-white/5 bg-gradient-to-br from-[#101629] to-[#05070f] p-6 shadow-2xl shadow-[#04060c]/80">
              <p className="text-xs uppercase tracking-[0.4em] text-white/40 mb-3">Live preview</p>
              <div className="flex items-center gap-6">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-[#7f5af0] to-[#00e1d9] shadow-lg shadow-[#04070f]/70" />
                <div className="space-y-2 flex-1">
                  <p className="text-white/70 text-sm">VX-Board · Alpha</p>
                  <p className="text-2xl font-semibold">Hover kinetic</p>
                  <p className="text-sm text-white/50">Microinteracciones listas para reutilizar.</p>
                </div>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-3">
              {stats.map((item) => (
                <div key={item.label} className="rounded-3xl border border-white/5 bg-white/[0.03] px-5 py-4">
                  <p className="text-3xl font-semibold">{item.value}</p>
                  <p className="text-xs text-white/50 mt-1 uppercase tracking-[0.2em]">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;