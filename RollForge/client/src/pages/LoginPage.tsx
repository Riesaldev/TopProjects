//Importamos hooks y dependencias
import { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

// Variables de entorno (no se usa directamente; api.ts gestiona baseURL)
import { postJson } from '@/utils/api';

// Tipos auxiliares
interface LoginForm {
  identifier: string; // email o username
  password: string;
}

interface LoginSuccess { status: 'ok'; data: { id: string | number; username: string; email: string; avatar: string | null; token: string; }; }

// Logica del componente

const LoginPage = () => {
  // asignamos useNavigate a una constante
  const navigate = useNavigate();
  // Estados iniciales para el formulario
  const [form, setForm] = useState<LoginForm>({
    identifier: '',
    password: '',
  });
  // Estado para controlar si el formulario se está enviando
  const [isSubmitting, setIsSubmitting] = useState(false);
  // No mantenemos aquí un estado de "isLoggedIn"; navegamos tras éxito

  // funcion manejadora de cambios en los campos del formulario
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // funcion manejadora del submit del formulario
  // Aquí se pueden hacer validaciones cliente antes de enviar
  // El envío se hace con postForm que maneja multipart/form-data si hay archivo
  // y JSON si no lo hay

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Validaciones cliente
    if (!form.identifier.trim() || !form.password.trim()) {
      toast.error('Completa email/usuario y contraseña');
      return;
    }

    //username and password are required
    try {

      // deshabilitamos el botón para evitar envíos múltiples
      setIsSubmitting(true);
      // Usamos toast.promise para manejar las notificaciones de carga, éxito y error
      const identifier = form.identifier.trim();
      const isEmail = /@/.test(identifier);
      const payload = isEmail
        ? { email: identifier, password: form.password.trim() }
        : { username: identifier, password: form.password.trim() };

      const res = await toast.promise(
        postJson<LoginSuccess>(`/api/users/login`, payload),
        {
          loading: 'Iniciando sesión…',
          success: 'Inicio de sesión exitoso.',
          error: (e) => (e instanceof Error ? e.message : 'Error inesperado'),
        }
      );

      // Guardamos token (y opcionalmente datos mínimos del usuario) si vienen en la respuesta
      if (res && (res as LoginSuccess).status === 'ok') {
        const { token, username, id, email, avatar } = (res as LoginSuccess).data;
        if (token) {
          try {
            localStorage.setItem('token', token);
            // Pequeño perfil para usos rápidos en UI (opcional)
            localStorage.setItem('user', JSON.stringify({ id, username, email, avatar }));
          } catch {
            // Ignoramos errores de almacenamiento (modo incógnito, etc.)
          }
        }
      }

      // Si todo va bien, navegamos a /board 
      // TODO: cambiar a /campaigns

      navigate('/board');
    } catch (err) {
      // error ya mostrado por toast.promise
      console.error(err);
    } finally {
      // volvemos a habilitar el botón
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 via-gray-700 to-gray-900 text-secondary">
      <div className="h-full  bg-[url('/bg-log.jpg')] bg-cover bg-center bg-no-repeat w-full flex items-center justify-center">
        <div className="flex flex-col items-center bg-black bg-opacity-60 backdrop-blur-sm p-8 rounded-lg shadow-lg h-auto w-1/3">
          <h1 className="text-2xl font-bold mb-4">Login</h1>
          <form className="flex flex-col space-y-6 w-full"
            onSubmit={handleSubmit}
          >
            <label>
              Email o usuario:
              <input type="text" name="identifier" className="mt-1 block w-full p-2 border border-gray-300 rounded" placeholder="Tu email o nombre de usuario" autoFocus autoComplete="username" value={form.identifier} onChange={onChange} />
            </label>
            <label>
              Password:
              <input type="password" name="password" className="mt-1 block w-full p-2 border border-gray-300 rounded" placeholder="Enter your password" autoComplete="current-password" value={form.password} onChange={onChange} />
            </label>
            <a href="/forgot-password" className="text-sm text-gray-400 hover:underline hover:text-secondary">¿Olvidaste tu contraseña?</a>

            <button className="bg-secondary hover:bg-primary transition duration-300 ease-in-out text-white py-2 px-4 rounded-xl"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Iniciando...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div >
  );
}

export default LoginPage;