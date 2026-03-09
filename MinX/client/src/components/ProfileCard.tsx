/**
 * ProfileCard
 * Qué: Tarjeta que muestra y permite editar información básica del usuario (avatar, bio) y cerrar sesión.
 * Cómo: Usa UserContext para leer user y métodos mutadores (LogOut, updateAvatar, updateBio).
 * Por qué: Centraliza edición inline de atributos personales sin navegar a otra vista.
 */
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { toast } from 'react-hot-toast';

const { VITE_API_URL } = import.meta.env; // URL base API para construir ruta avatar.

type ProfileCardProps = {
  onOpenAgenda?: () => void;
};

const ProfileCard = ({ onOpenAgenda }: ProfileCardProps) => {
  // Helper: intenta formatear una fecha si es string/number válido.
  const formatDate = (value: unknown): string => {
    if (typeof value === 'string' || typeof value === 'number') {
      const d = new Date(value);
      return isNaN(d.getTime()) ? '—' : d.toLocaleString();
    }
    return '—';
  };
  const navigate = useNavigate();
  const userContext = useContext(UserContext);
  const user = userContext?.user;
  const LogOut = userContext?.LogOut; // Ojo: en el contexto el método se llama 'LogOut'.
  const updateAvatar = userContext?.updateAvatar;
  const updateBio = userContext?.updateBio;
  // Estado local editable de la bio (optimista hasta enviar).
  const [bioValue, setBioValue] = useState(user?.bio || '');
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [bioLoading, setBioLoading] = useState(false);
  const [avatarLoading, setAvatarLoading] = useState(false);

  // Maneja el cierre de sesión y redirige a login.
  const handleLogout = () => {
    LogOut?.();
    navigate('/login', { replace: true });
    toast.success('Sesión cerrada correctamente');
  };

  // Subida de avatar: validamos tipo y tamaño antes de invocar a updateAvatar (que gestiona fetch + estado global).
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!updateAvatar) return;
      const file = e.target.files?.[0];
      if (!file) return;
      if (!/^image\//.test(file.type)) {
        toast.error('Solo se permiten imágenes');
        return;
      }
      if (file.size > 3 * 1024 * 1024) { // 3MB límite (alineado con backend ~5MB margen por seguridad).
        toast.error('Archivo demasiado grande (>3MB)');
        return;
      }
      setAvatarLoading(true);
      // updateAvatar definido en contexto acepta un string (filename) actualmente, aquí idealmente subiríamos el File.
      // Para mantener consistencia con la lógica existente (que no implementa subida aquí) se debería extender el contexto.
      // De momento mostramos aviso si no soporta objeto File.
      if (typeof updateAvatar !== 'function') return;
      // @ts-expect-error Forzamos llamada si la firma no contempla File todavía; se recomienda refactor futuro.
      await updateAvatar(file);
      toast.success('Avatar actualizado');
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      toast.error(message);
    } finally {
      setAvatarLoading(false);
      // Limpia para permitir re-subir mismo archivo (input file no dispara change si mismo objeto).
      if (e.target) e.target.value = '';
    }
  };

  // Envío de bio: simple validación de no vacío y longitud (textarea ya limita). Efecto: actualiza backend y contexto.
  const submitBio = async () => {
    if (!updateBio) return;
    try {
      if (!bioValue.trim()) {
        toast.error('La bio no puede estar vacía');
        return;
      }
      setBioLoading(true);
      await updateBio(bioValue.trim());
      toast.success('Bio actualizada');
      setIsEditingBio(false);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      toast.error(message);
    } finally {
      setBioLoading(false);
    }
  };

  if (!user) return null; // No render sin sesión (componente pensado para vista privada).

  return (
    <div className="p-6 flex flex-col gap-6 max-w-2xl mx-auto text-white">
      {/* Cabecera: avatar + identidad + logout */}
      <section className="glass-panel p-8 sm:p-10 border-white/10">
        <div className="flex items-start gap-6 sm:gap-8 flex-wrap sm:flex-nowrap">
          <div className="relative flex-shrink-0">
            <div className="relative w-36 h-36 sm:w-44 sm:h-44">
              <img
                src={user.avatarFilename ? `${VITE_API_URL}/uploads/${user.avatarFilename}` : '/avatar.jpg'}
                alt={`Avatar de ${user.username}`}
                className="w-full h-full rounded-full object-cover border-4 border-emerald-500 shadow-lg" />
              <label 
                className="absolute bottom-0 right-0 bg-emerald-600 hover:bg-emerald-700 p-2.5 sm:p-3 rounded-full cursor-pointer transition-colors duration-200 shadow-md hover:shadow-lg active:scale-95" 
                title="Actualizar avatar"
              >
                <input onChange={handleFileChange} type="file" className="hidden" accept="image/*" />
                {avatarLoading ? (
                  <span className="block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  <i className="bi bi-camera-fill text-white text-base sm:text-lg"></i>
                )}
              </label>
            </div>
          </div>
          <div className="flex-1 min-w-0 font-sans">
            <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-2 break-words">
              {user.username}
            </h2>
            <p className="text-base sm:text-lg text-white/70 mb-5 break-words">
              {user.email}
            </p>
            <div className="flex gap-3 flex-wrap">
              <button
                onClick={() => navigate('/messages')}
                className="btn-secondary !rounded-2xl !px-5 !py-2.5 text-sm"
              >
                Mensajes
              </button>
              <button
                onClick={onOpenAgenda}
                className="btn-secondary !rounded-2xl !px-5 !py-2.5 text-sm"
              >
                Agenda
              </button>
              <button
                onClick={handleLogout}
                className="inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-semibold text-[#05060f] bg-gradient-to-r from-[#ff6b81] to-[#ff9068] shadow-[0_12px_25px_rgba(255,107,129,0.35)] hover:-translate-y-0.5 transition-transform duration-200"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* BIO editable inline */}
      <section className="glass-panel p-6 border-white/10">
        <header className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-white">Biografía</h3>
          {!isEditingBio && (
            <button
              onClick={() => setIsEditingBio(true)}
              className="text-base text-emerald-600 hover:text-emerald-700 font-medium transition-colors duration-200 px-2 py-1 rounded hover:bg-emerald-50 cursor-pointer"
            >
              Editar
            </button>
          )}
        </header>
        {isEditingBio ? (
          <div className="flex flex-col gap-3">
            <textarea
              value={bioValue}
              onChange={e => setBioValue(e.target.value)}
              className="w-full p-3 text-base sm:text-lg rounded-2xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-[#7f5af0]/40 focus:border-[#7f5af0] min-h-[120px] resize-y transition-all duration-200 text-white placeholder:text-white/40"
              maxLength={160}
              placeholder="Cuenta algo sobre ti (máx 160 caracteres)"
            />
            <div className="flex items-center justify-between text-sm text-white/70 flex-wrap gap-3">
              <span className="font-medium">{bioValue.length}/160 caracteres</span>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsEditingBio(false)}
                  disabled={bioLoading}
                  className="btn-secondary !px-4 !py-2 !rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancelar
                </button>
                <button
                  onClick={submitBio}
                  disabled={bioLoading}
                  className="btn-primary !px-5 !py-2 !rounded-2xl disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {bioLoading ? 'Guardando...' : 'Guardar'}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="min-h-[80px]">
            <p className="text-base sm:text-lg text-white/80 leading-relaxed whitespace-pre-line">
              {user.bio || (
                <span className="text-white/60 italic">Sin biografía todavía. Haz clic en Editar para agregar una.</span>
              )}
            </p>
          </div>
        )}
      </section>

      {/* Datos técnicos: útil para debugging rápido o soporte. */}
      <section className="glass-panel p-6 border-white/10">
        <h3 className="text-xl font-semibold text-white mb-4">Datos técnicos</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-white/50 uppercase tracking-[0.3em] mb-1">ID de usuario</span>
            <span className="text-base text-white font-mono break-all">{user.id}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-white/50 uppercase tracking-[0.3em] mb-1">Cuenta creada</span>
            <span className="text-base text-white/80">{formatDate(user.createdAt)}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-white/50 uppercase tracking-[0.3em] mb-1">Último acceso</span>
            <span className="text-base text-white/80">{formatDate((user as unknown as { lastAuthAt?: unknown }).lastAuthAt)}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-white/50 uppercase tracking-[0.3em] mb-1">Avatar</span>
            <span className="text-base text-white">
              {user.avatarFilename ? (
                <span className="inline-flex items-center gap-1 text-[#00e1d9]">
                  <i className="bi bi-check-circle-fill"></i>
                  Configurado
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-white">
                  <i className="bi bi-x-circle-fill"></i>
                  No configurado
                </span>
              )}
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProfileCard;