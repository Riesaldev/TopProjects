/**
 * Formulario de Registro.
 * Qué: crea un nuevo usuario enviando username, email y password al backend.
 * Cómo: valida contraseñas coincidentes y parsea respuesta JSON antes de notificar.
 * Por qué: flujo de alta de usuario esencial para onboarding.
 */
import { useNavigate, Navigate, Link } from 'react-router-dom';
import { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { toast } from 'react-hot-toast';

const { VITE_API_URL } = import.meta.env; // Base API URL

const RegisterForm = () => {
  const navigate = useNavigate();
  const userContext = useContext(UserContext);
  const user = userContext?.user; // Si ya está logado redirigimos (UX consistente)

  // Estado controlado del formulario (sin controlled components separados).
  const [formInputs, setFormInputs] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [loading, setLoading] = useState(false); // Indica envío en curso.

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      if (formInputs.password !== formInputs.confirmPassword) {
        throw new Error('Passwords do not match');
      }
      // Podríamos añadir más validaciones aquí (formato email, fuerza password, username válido).
      // Envío al backend.
      setLoading(true);
      const res = await fetch(`${VITE_API_URL}/api/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formInputs.username.trim(),
          email: formInputs.email.trim(),
          password: formInputs.password
        }),
      });
      // Parseo robusto de respuesta.
      const contentType = res.headers.get('content-type') || '';
      type RegisterResponse = { message: string;[key: string]: unknown };
      let body: RegisterResponse;
      // Manejo de errores HTTP
      if (contentType.includes('application/json')) {
        body = await res.json() as RegisterResponse;
      } else {
        const rawText = await res.text();
        throw new Error(`Respuesta no JSON (${res.status}): ${rawText.slice(0, 120)}`);
      }
      if (!res.ok) {
        throw new Error(body.message);
      }
      toast.success(body.message, { id: 'register' });
      navigate('/login');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      toast.error(errorMessage, { id: 'register' });
      console.error('Registration error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Redirección temprana si ya está logado (registro no tiene sentido en sesión activa).
  if (user) return <Navigate to="/" />;
  // Render the registration form
  return (
    <form className="frosted-card w-full max-w-md p-8 text-left space-y-5 border border-white/10" onSubmit={handleSubmit}>
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.4em] text-white/50">crear cuenta</p>
        <h1 className="text-3xl font-semibold">Construye tu estudio social.</h1>
        <p className="text-sm text-white/60">Activa MiniX para tu equipo y obtén acceso anticipado a las nuevas micro-animaciones.</p>
      </header>

      <label className="flex flex-col gap-2 text-sm text-white/70">
        Nombre de usuario
        <input
          type="text"
          name="username"
          className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-base text-white placeholder:text-white/35 focus:border-[#7f5af0] focus:ring-2 focus:ring-[#7f5af0]/40 transition"
          placeholder="minix.studio"
          autoComplete="username"
          required
          minLength={3}
          maxLength={30}
          onChange={(e) => setFormInputs({ ...formInputs, username: e.target.value })}
        />
      </label>

      <label className="flex flex-col gap-2 text-sm text-white/70">
        Correo
        <input
          type="email"
          name="email"
          className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-base text-white placeholder:text-white/35 focus:border-[#7f5af0] focus:ring-2 focus:ring-[#7f5af0]/40 transition"
          placeholder="equipo@minix.com"
          autoComplete="email"
          required
          onChange={(e) => setFormInputs({ ...formInputs, email: e.target.value })}
        />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm text-white/70">
          Contraseña
          <input
            type="password"
            name="password"
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-base text-white placeholder:text-white/35 focus:border-[#7f5af0] focus:ring-2 focus:ring-[#7f5af0]/40 transition"
            placeholder="••••••••"
            autoComplete="new-password"
            required
            minLength={6}
            onChange={(e) => setFormInputs({ ...formInputs, password: e.target.value })}
          />
        </label>

        <label className="flex flex-col gap-2 text-sm text-white/70">
          Confirmar contraseña
          <input
            type="password"
            name="confirmPassword"
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-base text-white placeholder:text-white/35 focus:border-[#7f5af0] focus:ring-2 focus:ring-[#7f5af0]/40 transition"
            placeholder="••••••••"
            autoComplete="new-password"
            required
            minLength={6}
            onChange={(e) => setFormInputs({ ...formInputs, confirmPassword: e.target.value })}
          />
        </label>
      </div>

      <p className="text-xs text-white/50">
        Al continuar aceptas los{' '}
        <Link to="/terms" className="text-[#7f5af0] hover:text-white transition-colors">
          términos y condiciones
        </Link>
        .
      </p>

      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? 'Creando cuenta...' : 'Crear cuenta'}
      </button>

      <p className="text-sm text-white/60 text-center">
        ¿Ya tienes sesión?{' '}
        <Link to="/login" className="text-[#00e1d9] hover:text-white transition-colors">
          Continúa aquí
        </Link>
        .
      </p>
    </form>
  );
};

export default RegisterForm;