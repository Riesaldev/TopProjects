// Importamos hooks y dependencias
import { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

// Variables de entorno (no se usa directamente; api.ts gestiona baseURL)
import { postForm } from '@/utils/api';


// Tipos auxiliares
interface RegisterForm {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
  avatar: File | null;
}

interface RegisterSuccess { status: 'ok'; data: { id: string | number; username: string; email: string; avatar: string | null; }; }

// Logica del componente

const RegisterPage = () => {
  // asignamos useNavigate a una constante
  const navigate = useNavigate();
  // Estados iniciales para el formulario
  const [form, setForm] = useState<RegisterForm>({
    username: '',
    email: '',
    password: '',
    repeatPassword: '',
    avatar: null,
  });

  // Estado para controlar si el formulario se está enviando
  const [isSubmitting, setIsSubmitting] = useState(false);

  // funcion manejadora de cambios en los campos del formulario

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === 'avatar') {
      const file = files && files[0] ? files[0] : null;
      if (file) {
        const allowed = ['image/jpeg', 'image/png', 'image/webp'];
        if (!allowed.includes(file.type)) {
          toast.error('Tipo de imagen no permitido (solo jpg, png, webp)');
          return;
        }
      }
      setForm((prev) => ({ ...prev, avatar: file }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value } as RegisterForm));
    }
  };

  // funcion manejadora del submit del formulario
  // Aquí se pueden hacer validaciones cliente antes de enviar
  // El envío se hace con postForm que maneja multipart/form-data si hay archivo
  // y JSON si no lo hay

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Validaciones cliente
    if (!form.username.trim() || !form.email.trim() || !form.password.trim() || !form.repeatPassword.trim()) {
      toast.error('Completa usuario, email y contraseña');
      return;
    }
    // Username: mínimo 4, solo letras y números
    const USERNAME_RE = /^[A-Za-z0-9]{4,50}$/;
    if (!USERNAME_RE.test(form.username.trim())) {
      toast.error('El usuario debe tener mínimo 4 caracteres y solo letras o números');
      return;
    }
    // Email: debe terminar con un TLD (.com, .es, .org, etc.)
    const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;
    if (!EMAIL_RE.test(form.email.trim())) {
      toast.error('Email inválido. Debe terminar en un dominio válido (.com, .es, etc.)');
      return;
    }
    // Password mínima 6
    if (form.password.length < 6) {
      toast.error('La contraseña debe tener al menos 6 caracteres');
      return;
    }
    // Password y repeatPassword deben coincidir
    if (form.password !== form.repeatPassword) {
      toast.error('Las contraseñas no coinciden');
      return;
    }

    // Probamos enviar el formulario
    try {
      // deshabilitamos el botón para evitar envíos múltiples
      setIsSubmitting(true);
      // Preparamos el body del formulario
      const body = new FormData();

      // Añadimos los campos al body
      body.append('username', form.username.trim());
      body.append('email', form.email.trim());
      body.append('password', form.password);
      // Si hay avatar, lo añadimos también
      if (form.avatar) body.append('avatar', form.avatar);

      // Usamos toast.promise para manejar las notificaciones de carga, éxito y error
      await toast.promise(
        (async () => {
          await postForm<RegisterSuccess>(`/api/users/register`, body);
        })(),
        {
          loading: 'Registrando…',
          success: 'Registro completado. ¡Inicia sesión!',
          error: (e) => (e instanceof Error ? e.message : 'Error inesperado'),
        }
      );

      // Si todo va bien, navegamos a /login
      navigate('/login');
    } catch (err) {
      // error ya mostrado por toast.promise
      console.error(err);
    } finally {
      // volvemos a habilitar el botón
      setIsSubmitting(false);
    }
  };

  // Renderizado del componente
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 via-gray-700 to-gray-900 text-secondary">
      <div className="h-full bg-[url('/bg-reg.jpg')] bg-cover bg-center bg-no-repeat w-full flex items-center justify-center">
        <div className="flex flex-col items-center bg-black bg-opacity-60 p-8 rounded-lg shadow-lg h-auto w-full max-w-md backdrop-blur-sm">
          <h1 className="text-2xl font-bold mb-4">Registro</h1>
          <form className="flex flex-col space-y-4 w-full" onSubmit={handleSubmit}>
            <label className="text-sm">
              Usuario
              <input
                type="text"
                name="username"
                className="mt-1 block w-full p-2 border border-gray-300 rounded text-black"
                placeholder="Tu usuario"
                autoFocus
                required
                autoComplete="username"
                value={form.username}
                onChange={onChange}
              />
            </label>

            <label className="text-sm">
              Email
              <input
                type="email"
                name="email"
                className="mt-1 block w-full p-2 border border-gray-300 rounded text-black"
                placeholder="tu@email.com"
                required
                autoComplete="email"
                value={form.email}
                onChange={onChange}
              />
            </label>

            <label className="text-sm">
              Contraseña
              <input
                type="password"
                name="password"
                className="mt-1 block w-full p-2 border border-gray-300 rounded text-black"
                placeholder="••••••••"
                required
                minLength={6}
                autoComplete="new-password"
                value={form.password}
                onChange={onChange}
              />
            </label>

            <label className="text-sm">
              Contraseña
              <input
                type="password"
                name="repeatPassword"
                className="mt-1 block w-full p-2 border border-gray-300 rounded text-black"
                placeholder="••••••••"
                required
                minLength={6}
                autoComplete="new-password"
                value={form.repeatPassword}
                onChange={onChange}
              />
            </label>

            <label className="text-sm">
              Avatar (opcional)
              <input
                type="file"
                name="avatar"
                accept="image/*"
                className="mt-1 block w-full text-sm"
                onChange={onChange}
              />
            </label>

            <button
              className="bg-secondary hover:bg-primary transition duration-300 ease-in-out text-white py-2 px-4 rounded-xl disabled:opacity-60 disabled:cursor-not-allowed"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Registrando…' : 'Registrar'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;