"use client";

import { useEffect, useState } from 'react';
import { useRealtime } from '@/context/RealtimeContext';
import { useUserData } from '@/hooks/useUserData';
import { useForm } from '@/hooks/useForm';
import { useNotifications } from '@/hooks/useNotifications';

function useDarkMode() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    if (dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [dark]);
  return [dark, setDark] as const;
}

function useFontSize() {
  const [size, setSize] = useState("base");
  useEffect(() => {
    document.documentElement.classList.remove("text-base", "text-lg", "text-xl");
    document.documentElement.classList.add(`text-${size}`);
  }, [size]);
  return [size, setSize] as const;
}

function useLanguage() {
  const [lang, setLang] = useState("es");
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  return [lang, setLang] as const;
}

interface UserSettingsPageProps {
  userId: number;
}

interface SettingsForm {
  nombre: string;
  email: string;
  showProfile: boolean;
  receiveNotifications: boolean;
}

export default function UserSettingsPage({ userId }: Readonly<UserSettingsPageProps>) {
  const { user, loading, updateUser, deleteUser } = useUserData(userId);
  const { showSuccess } = useNotifications();
  const [dark, setDark] = useDarkMode();
  const [size, setSize] = useFontSize();
  const [lang, setLang] = useLanguage();
  const realtimeContext = useRealtime();
  const notifications = realtimeContext?.notifications || [];
  const userStatus = realtimeContext?.userStatus;

  const { values, handleChange, handleSubmit, isSubmitting, setValues } = useForm<SettingsForm>({
    initialValues: {
      nombre: "",
      email: "",
      showProfile: true,
      receiveNotifications: true,
    },
    onSubmit: async (formValues) => {
      const success = await updateUser(formValues);
      if (success) {
        showSuccess("Configuración guardada correctamente");
      }
    },
    validate: (formValues) => {
      const errors: Record<string, string> = {};
      if (!formValues.nombre?.trim()) {
        errors.nombre = "El nombre es requerido";
      }
      if (!formValues.email?.trim()) {
        errors.email = "El email es requerido";
      }
      if (formValues.email && !/\S+@\S+\.\S+/.test(formValues.email)) {
        errors.email = "Email inválido";
      }
      return errors;
    },
  });

  useEffect(() => {
    if (user) {
      setValues({
        nombre: user.nombre || "",
        email: user.email || "",
        showProfile: (user as any).showProfile ?? true,
        receiveNotifications: (user as any).receiveNotifications ?? true,
      });
    }
  }, [user, setValues]);

  useEffect(() => {
    // Aquí puedes manejar notificaciones en tiempo real si las gestionas en el contexto
  }, [notifications]);

  const handleDeleteAccount = async () => {
    if (!confirm("¿Seguro que quieres eliminar tu cuenta? Esta acción es irreversible.")) return;
    
    const success = await deleteUser();
    if (success) {
      // Redirect to login or homepage
      window.location.href = "/auth/login";
    }
  };

  const handleSuspendAccount = async () => {
    if (!confirm("¿Seguro que quieres suspender temporalmente tu cuenta?")) return;
    
    const success = await updateUser({ is_suspended: true } as any);
    if (success) {
      showSuccess("Cuenta suspendida temporalmente");
      // Redirect to login
      setTimeout(() => {
        window.location.href = "/auth/login";
      }, 2000);
    }
  };

  if (loading) return <div className="p-8">Cargando...</div>;
  if (!user) return <div className="p-8">Usuario no encontrado</div>;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Configuración y privacidad</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded shadow p-6 w-full max-w-lg flex flex-col gap-6">
        <section>
          <h2 className="font-semibold mb-2">Datos personales</h2>
          <div className="flex flex-col gap-2">
            <label className="block">
              Nombre
              <input 
                name="nombre" 
                value={values.nombre} 
                onChange={handleChange} 
                className="border rounded px-2 py-1 w-full mt-1" 
              />
            </label>
            <label className="block">
              Email
              <input 
                name="email" 
                value={values.email} 
                onChange={handleChange} 
                className="border rounded px-2 py-1 w-full mt-1" 
              />
            </label>
          </div>
        </section>
        
        <section>
          <h2 className="font-semibold mb-2">Privacidad</h2>
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2">
              <input 
                type="checkbox" 
                name="showProfile" 
                checked={values.showProfile} 
                onChange={handleChange} 
              /> 
              Mostrar mi perfil públicamente
            </label>
            <label className="flex items-center gap-2">
              <input 
                type="checkbox" 
                name="receiveNotifications" 
                checked={values.receiveNotifications} 
                onChange={handleChange} 
              /> 
              Recibir notificaciones
            </label>
          </div>
        </section>
        
        <section>
          <h2 className="font-semibold mb-2">Accesibilidad y personalización</h2>
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={dark}
                onChange={() => setDark(d => !d)}
              />
              Modo oscuro
            </label>
            <label className="flex items-center gap-2">
              Idioma
              <select 
                value={lang} 
                onChange={e => setLang(e.target.value)} 
                className="border rounded px-2 py-1 ml-2"
              >
                <option value="es">Español</option>
                <option value="en">English</option>
              </select>
            </label>
            <label className="flex items-center gap-2">
              Tamaño de fuente
              <select 
                value={size} 
                onChange={e => setSize(e.target.value)} 
                className="border rounded px-2 py-1 ml-2"
              >
                <option value="base">Normal</option>
                <option value="lg">Grande</option>
                <option value="xl">Muy grande</option>
              </select>
            </label>
          </div>
        </section>
        
        <section>
          <h2 className="font-semibold mb-2">Acciones de cuenta</h2>
          <div className="flex flex-col gap-2">
            <button 
              type="button" 
              className="text-primary-600 underline text-left"
            >
              Cambiar contraseña
            </button>
            <button 
              type="button" 
              className="text-yellow-600 underline text-left" 
              onClick={handleSuspendAccount}
            >
              Suspender cuenta temporalmente
            </button>
            <button 
              type="button" 
              className="text-red-700 underline text-left" 
              onClick={handleDeleteAccount}
            >
              Eliminar cuenta
            </button>
          </div>
        </section>
        
        <button 
          type="submit" 
          className="bg-primary-600 text-white px-4 py-2 rounded font-semibold disabled:opacity-50" 
          disabled={isSubmitting}
        >
          {isSubmitting ? "Guardando..." : "Guardar cambios"}
        </button>
      </form>
      
      <div className="mt-8 p-4 bg-white rounded shadow w-full max-w-lg">
        <h2 className="font-semibold mb-2">Estado en tiempo real</h2>
        <div className={`text-sm ${userStatus[userId] === 'online' ? 'text-green-600' : 'text-gray-500'}`}>
          Estado de contacto: {userStatus[userId] || 'offline'}
        </div>
      </div>
    </main>
  );
}
