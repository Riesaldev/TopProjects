/**
 * Formulario de Login.
 * Qué: permite autenticar al usuario mediante email o username + contraseña.
 * Cómo: hace POST al endpoint /api/users/login y almacena token vía UserContext.
 * Por qué: establecer sesión para acceder a funcionalidades protegidas.
 */
import { useState, useContext } from 'react';
import { toast } from 'react-hot-toast';
import { UserContext } from '../context/UserContext.tsx';
import { Link, useNavigate } from 'react-router-dom';

// Variables de entorno necesarias para endpoint base.
const { VITE_API_URL } = import.meta.env;


// Tipado de los inputs del formulario.
type FormInputs = {
  emailOrUsername: string; // Puede ser email o username; backend actual interpreta email si contiene '@'.
  password: string;
  remember: boolean; // Futuro: persistencia custom (ahora se usa cookie/localStorage siempre).
};

const LoginForm = () => {
  const navigate = useNavigate();

  // Estado de carga para evitar envíos múltiples.
  const [isLoading, setIsLoading] = useState(false);

  // Contexto de usuario (gestiona token y perfil).
  const userContext = useContext(UserContext);
  const loginFn = userContext?.login; // Setter de token en contexto.

  // Estado controlado del formulario.
  const [formImputs, setFormImputs] = useState<FormInputs>({
    emailOrUsername: "",
    password: "",
    remember: false
  });



  // Envío del formulario (async/await + robustez en parseo de respuesta).
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch(`${VITE_API_URL}/api/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          email: formImputs.emailOrUsername.trim(), // backend decide si es email/username.
          password: formImputs.password
        })
      });
      // Parseo robusto de respuesta (JSON esperado).
      // Si no es JSON o hay error HTTP, lanzamos con mensaje adecuado.
      // Esto evita fallos silenciosos o errores de parseo inesperados.
      // El manejo de errores se centraliza en el catch.
      const contentType = res.headers.get('content-type') || '';
      let body: unknown;
      if (contentType.includes('application/json')) {
        body = await res.json();
      } else {
        const raw = await res.text();
        throw new Error(`Respuesta no JSON (${res.status}): ${raw.slice(0, 120)}`);
      }
      // Manejo de errores HTTP (4xx, 5xx) con mensaje del body si existe.
      // Si la API cambia el formato de error, esto puede necesitar ajustes.
      // Se asume que body es un objeto con posible campo 'message'.
      if (!res.ok) {
        let msg = 'Login failed';
        if (typeof body === 'object' && body && 'message' in body) {
          const maybeMsg = (body as { message?: unknown }).message;
          if (typeof maybeMsg === 'string') msg = maybeMsg;
        }
        throw new Error(msg);
      }
      // Éxito: extraer token y actualizar contexto.
      if (loginFn) {
        const maybeObj = body as { data?: { token?: string } };
        const token = maybeObj?.data?.token;
        if (!token) throw new Error('Token no presente en la respuesta');
        if (import.meta.env.DEV) console.log('[LoginForm] token recibido', token);
        loginFn(token);
        toast.success('Bienvenido de nuevo', { duration: 3000 });
      }
      // Limpiar formulario y redirigir a perfil.
      setFormImputs({ emailOrUsername: '', password: '', remember: false });
      navigate('/profile', { replace: true });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed';
      toast.error(errorMessage, { id: 'login-error' });
    } finally {
      setIsLoading(false);
    }
  };

  // Renderizado del formulario con accesibilidad básica y estados.
  // No se usa librería de formularios para mantener simple y didáctico.
  // Se podría mejorar con validaciones más avanzadas (email válido, fuerza password, etc).
  // También se podría separar en componentes más pequeños si crece en complejidad.
  // El diseño es básico y se puede mejorar con CSS/Frameworks según necesidades.
  return (
    <>
      <form
        className="frosted-card w-full max-w-md p-8 text-left space-y-6 border border-white/10"
        onSubmit={handleSubmit}
        aria-live="polite"
      >
        <header className="space-y-2">
          <p className="text-xs uppercase tracking-[0.4em] text-white/50">bienvenido</p>
          <h1 className="text-3xl font-semibold">Entra a la nueva capa de MiniX.</h1>
          <p className="text-sm text-white/60">
            Accede a tus mensajes sincronizados, comunidades privadas y analíticas en tiempo real.
          </p>
        </header>

        <label className="flex flex-col gap-2 text-sm text-white/70">
          Usuario o correo
          <input
            id="email"
            type="text"
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-base text-white placeholder:text-white/35 focus:border-[#7f5af0] focus:ring-2 focus:ring-[#7f5af0]/40 transition"
            placeholder="username o email"
            autoComplete="username"
            value={formImputs.emailOrUsername}
            onChange={(e) => setFormImputs({ ...formImputs, emailOrUsername: e.target.value })}
            required
            autoFocus
          />
        </label>

        <label className="flex flex-col gap-2 text-sm text-white/70">
          Contraseña
          <input
            id="password"
            type="password"
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-base text-white placeholder:text-white/35 focus:border-[#7f5af0] focus:ring-2 focus:ring-[#7f5af0]/40 transition"
            placeholder="••••••••"
            autoComplete="current-password"
            value={formImputs.password}
            onChange={(e) => setFormImputs({ ...formImputs, password: e.target.value })}
            required
          />
        </label>

        <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-white/60">
          <label className="inline-flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formImputs.remember}
              onChange={() => setFormImputs((prev) => ({ ...prev, remember: !prev.remember }))}
              className="size-4 rounded border border-white/20 accent-[#7f5af0]"
            />
            Recuérdame
          </label>
          <Link to="/forgot-password" className="link-underline text-[#7f5af0]">
            ¿Olvidaste tu contraseña?
          </Link>
        </div>

        <button disabled={isLoading} type="submit" className="btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed">
          {isLoading ? 'Iniciando sesión...' : 'Acceder'}
        </button>

        <p className="text-sm text-white/60 text-center">
          ¿Nuevo en MiniX?{' '}
          <Link to="/register" className="text-[#00e1d9] hover:text-white transition-colors">
            Activa tu cuenta
          </Link>
        </p>
      </form>

    </>
  );
};

export default LoginForm;