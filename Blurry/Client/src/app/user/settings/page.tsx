"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthContext";
import { useForm } from "@/hooks/useForm";
import { useNotifications } from "@/hooks/useNotifications";
import ViewState from "@/components/ViewState";
import Button from "@/components/Button";

interface SettingsForm {
  username: string;
  bio: string;
  notificationsEnabled: boolean;
  twoFactorAuth: boolean;
  profilePrivacy: "public" | "friends";
}

type UserSettingsShape = {
  notificationsEnabled?: boolean;
  twoFactorAuth?: boolean;
  profilePrivacy?: "public" | "friends";
};

type AuthUserWithSettings = {
  id: number;
  nombre?: string;
  display_name?: string;
  bio?: string;
  settings?: UserSettingsShape;
};

export default function SettingsPage() {
  const router = useRouter();
  const { user, isLoading, updateUser } = useAuth();
  const { showError, showOperationFeedback } = useNotifications();

  const { values, handleChange, handleSubmit, isSubmitting, setValues } = useForm<SettingsForm>({
    initialValues: {
      username: "",
      bio: "",
      notificationsEnabled: true,
      twoFactorAuth: false,
      profilePrivacy: "public",
    },
    onSubmit: async (formValues) => {
      if (!user) {
        showError("No hay sesion activa");
        return;
      }

      try {
        const response = await fetch(`/api/users/${user.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nombre: formValues.username,
            bio: formValues.bio,
            settings: {
              notificationsEnabled: formValues.notificationsEnabled,
              twoFactorAuth: formValues.twoFactorAuth,
              profilePrivacy: formValues.profilePrivacy,
            },
          }),
        });

        if (!response.ok) {
          throw new Error("No se pudo guardar la configuracion");
        }

        const updated = await response.json();
        updateUser(updated);
        showOperationFeedback("Actualizacion de configuracion", "success", "Los cambios ya estan activos.");
      } catch (error) {
        showOperationFeedback(
          "Actualizacion de configuracion",
          "error",
          error instanceof Error ? error.message : "No se pudieron guardar los cambios.",
        );
      }
    },
  });

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth/login");
      return;
    }

    if (user) {
      const settings = (user as AuthUserWithSettings).settings || {};
      setValues({
        username: user.nombre || user.display_name || "",
        bio: user.bio || "",
        notificationsEnabled: settings.notificationsEnabled ?? true,
        twoFactorAuth: settings.twoFactorAuth ?? false,
        profilePrivacy: settings.profilePrivacy === "friends" ? "friends" : "public",
      });
    }
  }, [isLoading, router, setValues, user]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950">
        <ViewState variant="loading" title="Cargando configuracion" description="Preparando ajustes de usuario." className="max-w-md" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-slate-200 py-10 px-4 flex justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-2xl bg-zinc-900/70 border border-zinc-800 rounded-2xl p-6 space-y-6">
        <h1 className="text-2xl font-black">Configuracion de Usuario</h1>

        <div className="space-y-2">
          <label className="text-sm font-bold text-zinc-400">Alias</label>
          <input
            name="username"
            value={values.username}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-black/40 border border-zinc-700 rounded-xl"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-zinc-400">Bio</label>
          <textarea
            name="bio"
            value={values.bio}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-3 bg-black/40 border border-zinc-700 rounded-xl"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="flex items-center justify-between bg-zinc-800/40 border border-zinc-700 rounded-xl px-4 py-3">
            <span>Notificaciones</span>
            <input
              type="checkbox"
              name="notificationsEnabled"
              checked={values.notificationsEnabled}
              onChange={handleChange}
            />
          </label>

          <label className="flex items-center justify-between bg-zinc-800/40 border border-zinc-700 rounded-xl px-4 py-3">
            <span>2FA</span>
            <input
              type="checkbox"
              name="twoFactorAuth"
              checked={values.twoFactorAuth}
              onChange={handleChange}
            />
          </label>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-zinc-400">Privacidad del perfil</label>
          <select
            name="profilePrivacy"
            value={values.profilePrivacy}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-black/40 border border-zinc-700 rounded-xl"
          >
            <option value="public">Publico</option>
            <option value="friends">Solo contactos</option>
          </select>
        </div>

        <Button type="submit" variant="primary" fullWidth isLoading={isSubmitting}>
          {isSubmitting ? "Guardando..." : "Guardar cambios"}
        </Button>
      </form>
    </main>
  );
}
