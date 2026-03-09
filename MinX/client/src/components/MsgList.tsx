/**
 * MsgList
 * Qué: Componente placeholder que lista mensajes estáticos.
 * Cómo: Actualmente hardcoded; futuro: consumir API /api/messages (listado paginado) y mostrar likes.
 * Por qué: Sirve de esqueleto para integrar lógica de mensajes sin bloquear avance de otras partes.
 */
import MsgLikes from './MsgLikes';

const sampleMessages = [
  {
    id: 1,
    author: 'Alicia M.',
    tag: 'Product Pulse',
    text: 'Lanzamos MiniX Motion Kit 🚀 — ahora los hovers responden al contenido en lugar de repetir patrones planos.',
    likes: 32,
  },
  {
    id: 2,
    author: 'Nico Ortega',
    tag: 'Research Drop',
    text: 'El contraste dinámico mejora 18% la lectura en móviles cuando combinamos degradados oscuros con acentos neón suaves.',
    likes: 18,
  },
  {
    id: 3,
    author: 'Studio V0',
    tag: 'Community Beta',
    text: 'Buscamos 5 equipos para probar las nuevas listas con swipe y efectos parallax. Deja un mensaje si quieres acceso.',
    likes: 45,
  },
];

const MsgList = () => {
  return (
    <section className="glass-panel p-6 space-y-5 border-white/10">
      <header className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-white/40">flow público</p>
          <h2 className="text-2xl font-semibold">Mensajes destacados</h2>
        </div>
        <button className="pill-link text-xs">Ver todos</button>
      </header>

      <ul className="space-y-4">
        {sampleMessages.map((msg) => (
          <li key={msg.id} className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 space-y-3">
            <div className="flex flex-wrap items-center gap-3 text-xs text-white/60 uppercase tracking-[0.35em]">
              <span>{msg.tag}</span>
              <span className="h-1 w-1 rounded-full bg-white/30" />
              <span>{msg.author}</span>
            </div>
            <p className="text-sm sm:text-base text-white/80 leading-relaxed">{msg.text}</p>
            <MsgLikes count={msg.likes} />
          </li>
        ))}
      </ul>

      <p className="text-xs text-white/40">
        Placeholder – conecta con <code className="font-mono text-white/70">/api/messages</code> para datos reales.
      </p>
    </section>
  );
};

export default MsgList;