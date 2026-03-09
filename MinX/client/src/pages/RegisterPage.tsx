import RegisterForm from "../components/RegisterForm";

const Register = () => {
  const phases = [
    'Diseña tus espacios de comunidad.',
    'Configura motion y hovers.',
    'Lanza mensajes interactivos.',
  ];

  return (
    <section className="relative flex-1 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,225,217,0.18),_transparent_45%)]" />
        <div className="absolute inset-y-0 right-0 w-2/3 bg-[radial-gradient(circle_at_right,_rgba(127,90,240,0.28),_transparent_40%)] blur-3xl opacity-60" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-20 flex flex-col-reverse gap-12 lg:flex-row lg:items-center">
        <RegisterForm />

        <div className="space-y-6 max-w-xl">
          <p className="text-xs uppercase tracking-[0.4em] text-white/50">onboarding</p>
          <h2 className="text-4xl font-semibold leading-tight">
            Cada detalle visual importa. Por eso el registro también vibra con tu marca.
          </h2>
          <p className="text-white/70 text-base leading-relaxed">
            Configura MiniX en minutos y desbloquea controles avanzados de estilo, paletas personalizadas y presets de hover inspirados en los mejores estudios.
          </p>
          <ul className="space-y-3 text-sm text-white/70">
            {phases.map((phase, idx) => (
              <li key={phase} className="flex items-center gap-3">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-white/60 text-sm">
                  {idx + 1}
                </span>
                {phase}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Register;