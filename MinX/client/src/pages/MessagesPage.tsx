import MsgList from "../components/MsgList";

const Messages = () => {
  return (
    <section className="relative flex-1 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(127,90,240,0.12),_transparent_45%)]" />
        <div className="absolute inset-y-0 left-0 w-1/2 bg-[radial-gradient(circle_at_left,_rgba(0,225,217,0.18),_transparent_55%)] blur-3xl opacity-60" />
      </div>
      <div className="relative max-w-5xl mx-auto px-6 py-16 space-y-8">
        <header className="space-y-3">
          <p className="text-xs uppercase tracking-[0.4em] text-white/50">canal principal</p>
          <h1 className="text-4xl font-semibold leading-tight">Explora mensajes diseñados para brillar.</h1>
          <p className="text-white/70 text-base">
            Esta vista aún no consume la API real, pero ya refleja la experiencia visual final: tarjetas glassmorphism, etiquetas con ritmo tipográfico y micro-hovers.
          </p>
        </header>

        <MsgList />
      </div>
    </section>
  );
};

export default Messages;