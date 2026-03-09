import LoginForm from "../components/LoginForm";

const Login = () => {
  const highlights = [
    { title: 'Latencia', value: '43 ms' },
    { title: 'Flow states', value: '∞' },
  ];

  return (
    <section className="relative flex-1 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(127,90,240,0.2),_transparent_50%)]" />
        <div className="absolute inset-y-0 left-0 w-1/2 bg-[radial-gradient(circle_at_left,_rgba(0,225,217,0.25),_transparent_55%)] blur-3xl opacity-70" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-20 flex flex-col gap-12 lg:flex-row lg:items-center">
        <div className="space-y-6 max-w-xl">
          <p className="text-xs uppercase tracking-[0.4em] text-white/50">acceso privado</p>
          <h2 className="text-4xl font-semibold leading-tight">
            Reimagina tu login como parte de la experiencia, no un obstáculo.
          </h2>
          <p className="text-white/70 text-base leading-relaxed">
            La nueva interfaz de MiniX sincroniza atajos, feedback inmediato y micro-animaciones para que autenticarte sea tan pulido como publicar.
          </p>
          <div className="grid grid-cols-2 gap-4 max-w-sm">
            {highlights.map(({ title, value }) => (
              <div key={title} className="rounded-3xl border border-white/10 bg-white/5 px-4 py-3">
                <p className="text-xs uppercase tracking-[0.35em] text-white/45">{title}</p>
                <p className="text-2xl font-semibold mt-1">{value}</p>
              </div>
            ))}
          </div>
        </div>

        <LoginForm />
      </div>
    </section>
  );
};

export default Login;