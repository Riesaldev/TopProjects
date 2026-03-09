/**
 * MsgLikes
 * Qué: Muestra contador de likes (placeholder sin lógica de interacción).
 * Cómo: Renderiza un número estático; se ampliará para recibir props (count, likedByMe, onToggle).
 * Por qué: Facilita diseñar composición visual antes de integrar estado real.
 */
type MsgLikesProps = {
  count?: number;
};

const MsgLikes = ({ count = 0 }: MsgLikesProps) => {
  return (
    <button
      type="button"
      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/70 hover:border-[#ff6b81]/60 hover:text-white transition-all duration-200"
      aria-label={`Likes del mensaje: ${count}`}
    >
      <i className="bi bi-heart-fill text-[#ff6b81]" aria-hidden="true"></i>
      <span>{count}</span>
    </button>
  );
};

export default MsgLikes;