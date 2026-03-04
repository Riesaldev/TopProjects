"use client";

import { useEffect, useState } from "react";
import { useRealtime } from "@/context/RealtimeContext";
import { useUserData } from "@/hooks/useUserData";
import { useForm } from "@/hooks/useForm";
import { useNotifications } from "@/hooks/useNotifications";
import {
  User,
  Bell,
  Lock,
  Activity,
  ShieldAlert,
  Sparkles,
  AlertOctagon,
  PauseCircle,
  Trash2,
} from "lucide-react";
import Button from "@/components/Button";

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
    document.documentElement.classList.remove(
      "text-base",
      "text-lg",
      "text-xl",
    );
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

export default function UserSettingsPage({
  userId,
}: Readonly<UserSettingsPageProps>) {
  const { user, loading, updateUser, deleteUser } = useUserData(userId);
  const { showSuccess } = useNotifications();
  const [dark, setDark] = useDarkMode();
  const [size, setSize] = useFontSize();
  const [lang, setLang] = useLanguage();
  const realtimeContext = useRealtime();
  const notifications = realtimeContext?.notifications || [];
  const userStatus = realtimeContext?.userStatus;

  const { values, handleChange, handleSubmit, isSubmitting, setValues } =
    useForm<SettingsForm>({
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
    if (
      !confirm(
        "¿Seguro que quieres eliminar tu cuenta? Esta acción es irreversible.",
      )
    )
      return;

    const success = await deleteUser();
    if (success) {
      // Redirect to login or homepage
      window.location.href = "/auth/login";
    }
  };

  const handleSuspendAccount = async () => {
    if (
      !confirm(
        "¿Seguro que quieres suspender temporalmente tu cuenta? Podrás reactivarla iniciando sesión.",
      )
    )
      return;

    // Llamada simulada al endpoint ya creado en el backend (PATCH /users/:id/suspend)
    try {
      const res = await fetch(`/api/users/${userId}/suspend`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reason: "Suspensión solicitada por el usuario desde ajustes",
          days: null,
        }),
      });
      if (!res.ok) throw new Error("Error al suspender la cuenta");

      showSuccess("Cuenta suspendida temporalmente");
      // Redirect to login
      setTimeout(() => {
        window.location.href = "/auth/login";
      }, 2000);
    } catch (e) {
      console.error(e);
      alert("Hubo un error al suspender la cuenta");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin"></div>
          <p className="font-bold text-gray-500 dark:text-gray-400 animate-pulse">
            Cargando preferencias...
          </p>
        </div>
      </div>
    );

  if (!user)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black p-8">
        <div className="glass-card p-10 rounded-3xl text-center max-w-sm">
          <ShieldAlert size={48} className="mx-auto text-red-500 mb-4" />
          <h2 className="text-xl font-black text-gray-900 dark:text-white mb-2">
            Acceso Denegado
          </h2>
          <p className="text-gray-500 dark:text-gray-400 font-medium">
            No se pudo cargar el perfil del usuario.
          </p>
        </div>
      </div>
    );

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-black flex justify-center py-12 px-4 sm:px-6 lg:px-8 selection:bg-primary-500/30">
      <div className="w-full max-w-3xl space-y-8 animate-fade-in-up">
        <div className="text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl font-black text-gray-900 dark:text-white flex items-center justify-center md:justify-start gap-3 tracking-tight mb-2">
              <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-xl text-primary-600 dark:text-primary-400">
                <Settings size={32} />
              </div>
              Ajustes de Cuenta
            </h1>
            <p className="text-gray-600 dark:text-gray-400 font-medium">
              Controla tu privacidad, notificaciones y preferencias visuales.
            </p>
          </div>
          <div className="glass-panel px-4 py-2 rounded-xl flex items-center gap-3 border border-gray-200 dark:border-zinc-800 shadow-sm mt-4 md:mt-0">
            <div className="relative flex h-3 w-3">
              <span
                className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${userStatus[userId] === "online" ? "bg-green-400" : "bg-gray-400"}`}
              ></span>
              <span
                className={`relative inline-flex rounded-full h-3 w-3 ${userStatus[userId] === "online" ? "bg-green-500" : "bg-gray-500"}`}
              ></span>
            </div>
            <span className="text-sm font-bold text-gray-700 dark:text-gray-300 capitalize">
              {userStatus[userId] || "offline"}
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="glass-card rounded-3xl p-6 md:p-8 shadow-sm border border-gray-200/60 dark:border-zinc-800/60 transition-all hover:shadow-md">
            <h2 className="text-xl font-extrabold flex items-center gap-2 mb-6 text-gray-900 dark:text-white border-b border-gray-100 dark:border-zinc-800 pb-4">
              <User className="text-primary-500" />
              Datos Personales
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <label className="flex flex-col gap-2 group">
                <span className="font-bold text-gray-700 dark:text-gray-300 text-sm">
                  Nombre Público
                </span>
                <input
                  name="nombre"
                  value={values.nombre}
                  onChange={handleChange}
                  className="bg-gray-50 dark:bg-zinc-900/50 border border-gray-200 dark:border-zinc-700 text-gray-900 dark:text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all"
                  placeholder="Tu nombre en la app"
                />
              </label>
              <label className="flex flex-col gap-2 group">
                <span className="font-bold text-gray-700 dark:text-gray-300 text-sm">
                  Correo Electrónico
                </span>
                <input
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  type="email"
                  className="bg-gray-50 dark:bg-zinc-900/50 border border-gray-200 dark:border-zinc-700 text-gray-900 dark:text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all"
                />
              </label>
            </div>
          </div>

          <div className="glass-card rounded-3xl p-6 md:p-8 shadow-sm border border-gray-200/60 dark:border-zinc-800/60 transition-all hover:shadow-md">
            <h2 className="text-xl font-extrabold flex items-center gap-2 mb-6 text-gray-900 dark:text-white border-b border-gray-100 dark:border-zinc-800 pb-4">
              <Lock className="text-secondary-500" />
              Privacidad y Notificaciones
            </h2>
            <div className="flex flex-col gap-4">
              <label className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 dark:bg-zinc-900/50 dark:hover:bg-zinc-800/80 border border-gray-100 dark:border-zinc-800 transition-colors cursor-pointer group">
                <div className="flex flex-col">
                  <span className="font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                    <Activity size={16} className="text-primary-500" />
                    Perfil Visible
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                    Permitir que otros te encuentren en el Discovery.
                  </span>
                </div>
                <div className="relative">
                  <input
                    type="checkbox"
                    name="showProfile"
                    checked={values.showProfile}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-zinc-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-500"></div>
                </div>
              </label>

              <label className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 dark:bg-zinc-900/50 dark:hover:bg-zinc-800/80 border border-gray-100 dark:border-zinc-800 transition-colors cursor-pointer group">
                <div className="flex flex-col">
                  <span className="font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                    <Bell size={16} className="text-secondary-500" />
                    Alertas Push
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                    Recibir notificaciones de matches y mensajes.
                  </span>
                </div>
                <div className="relative">
                  <input
                    type="checkbox"
                    name="receiveNotifications"
                    checked={values.receiveNotifications}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-zinc-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-500"></div>
                </div>
              </label>
            </div>
          </div>

          <div className="glass-card rounded-3xl p-6 md:p-8 shadow-sm border border-gray-200/60 dark:border-zinc-800/60 transition-all hover:shadow-md">
            <h2 className="text-xl font-extrabold flex items-center gap-2 mb-6 text-gray-900 dark:text-white border-b border-gray-100 dark:border-zinc-800 pb-4">
              <Sparkles className="text-amber-500" />
              Accesibilidad Visual
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <label className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 dark:bg-zinc-900/50 dark:hover:bg-zinc-800/80 border border-gray-100 dark:border-zinc-800 transition-colors cursor-pointer md:col-span-3">
                <div className="flex flex-col">
                  <span className="font-bold text-gray-800 dark:text-gray-200">
                    Modo Noche
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Reduce la fatiga visual.
                  </span>
                </div>
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={dark}
                    onChange={() => setDark((d) => !d)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-zinc-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
                </div>
              </label>

              <div className="flex flex-col gap-2">
                <label className="font-bold text-gray-700 dark:text-gray-300 text-sm">
                  Idioma
                </label>
                <select
                  value={lang}
                  onChange={(e) => setLang(e.target.value)}
                  className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 text-gray-900 dark:text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500/50 font-semibold"
                >
                  <option value="es">🇪🇸 Español</option>
                  <option value="en">🇬🇧 English</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-bold text-gray-700 dark:text-gray-300 text-sm">
                  Tamaño de fuente
                </label>
                <select
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 text-gray-900 dark:text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500/50 font-semibold"
                >
                  <option value="base">Normal (A)</option>
                  <option value="lg">Mediano (A+)</option>
                  <option value="xl">Grande (A++)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-red-50/50 dark:bg-red-950/10 border-2 border-red-200 dark:border-red-900/30 rounded-3xl p-6 md:p-8 animate-pulse-slow">
            <h2 className="text-xl font-black mb-6 text-red-700 dark:text-red-500 flex items-center gap-2">
              <AlertOctagon /> Zona de Peligro
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col justify-between bg-white dark:bg-zinc-900/80 p-5 rounded-2xl shadow-sm border border-red-100 dark:border-red-900/20">
                <div className="mb-4">
                  <span className="font-bold text-gray-900 dark:text-white block mb-1">
                    Pausar Cuenta
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 font-medium leading-tight">
                    Oculta tu perfil temporalmente. Reactívalo al iniciar
                    sesión.
                  </span>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleSuspendAccount}
                  leftIcon={<PauseCircle size={16} />}
                  className="w-full !border-amber-600 !text-amber-600 hover:!bg-amber-50 dark:!border-amber-500 dark:!text-amber-500 dark:hover:!bg-amber-900/20"
                >
                  Suspender Perfil
                </Button>
              </div>

              <div className="flex flex-col justify-between bg-white dark:bg-zinc-900/80 p-5 rounded-2xl shadow-sm border border-red-100 dark:border-red-900/20">
                <div className="mb-4">
                  <span className="font-black text-red-600 dark:text-red-400 block mb-1">
                    Destruir Cuenta
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 font-medium leading-tight">
                    Borra permanentemente datos, matches y compras.
                  </span>
                </div>
                <Button
                  type="button"
                  variant="danger"
                  onClick={handleDeleteAccount}
                  leftIcon={<Trash2 size={16} />}
                  className="w-full"
                >
                  Eliminar Datos
                </Button>
              </div>
            </div>
          </div>

          <div className="sticky bottom-4 z-40 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md p-4 rounded-2xl border border-gray-200 dark:border-zinc-800 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] dark:shadow-none flex justify-end">
            <Button
              type="submit"
              variant="gamified"
              size="lg"
              disabled={isSubmitting}
              leftIcon={<Sparkles size={20} />}
            >
              {isSubmitting ? "Sincronizando..." : "Guardar Preferencias"}
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
