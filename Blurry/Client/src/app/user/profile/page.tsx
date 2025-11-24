"use client";

import AchievementsUser from "../dashboard/AchievementsUser";
import { User, Achievement, UserAchievement } from "@/types";
import { useEffect, useState } from 'react';
import { useRealtime } from '@/context/RealtimeContext';

interface ProfileForm {
  nombre: string;
  avatar: string;
  bio: string;
  interests: string;
}



interface UserProfilePageProps {
  userId: number;
}

export default function UserProfilePage({ userId }: Readonly<UserProfilePageProps>) {
  const realtimeContext = useRealtime();
  const notifications = realtimeContext?.notifications || [];
  const [user, setUser] =useState<User | null>(null);
  const [editing, setEditing] =useState(false);
  const [form, setForm] =useState<ProfileForm>({
    nombre: "",
    avatar: "/globe.svg",
    bio: "",
    interests: ""
  });
  const [loading, setLoading] =useState(true);
  const [saving, setSaving] =useState(false);
  const [error, setError] =useState("");
  const [allAchievements, setAllAchievements] =useState<Achievement[]>([]);
  const [userAchievements, setUserAchievements] =useState<UserAchievement[]>([]);

  useEffect(() => {
    if (!userId) return;
    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then((data: User) => {
        setUser(data);
        setForm({
          nombre: data.nombre || "",
          avatar: data.avatar || "/globe.svg",
          bio: data.bio || "",
          interests: data.interests || "",
        });
        setLoading(false);
      });
    fetch(`/api/achievements/list`).then(res => res.json()).then(setAllAchievements);
    fetch(`/api/achievements?userId=${userId}`).then(res => res.json()).then(setUserAchievements);
  }, [userId]);

  useEffect(() => {
    // Aquí puedes manejar notificaciones en tiempo real si las gestionas en el contexto
  }, [notifications]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, avatar: e.target.value });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    if (!userId) return;
    const res = await fetch(`/api/users/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...user, ...form })
    });
    if (!res.ok) setError("Error al guardar cambios");
    else {
      if (user) {
        setUser({ ...user, ...form });
      }
      setEditing(false);
    }
    setSaving(false);
  };

  if (loading) return <div className="p-8">Cargando...</div>;
  if (!user) return <div className="p-8">Usuario no encontrado</div>;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-accent-400">
      <h1 className="text-2xl font-bold mb-6">Mi perfil</h1>
      <div className="bg-primary-50 rounded-lg shadow-lg p-6 w-full max-w-lg flex flex-col items-center gap-6">
        <img src={user.avatar || "/globe.svg"} alt="avatar" className="w-24 h-24 rounded-full mb-2 border border-accent-300" />
        {editing ? (
          <form onSubmit={handleSave} className="w-full flex flex-col gap-4 items-center">
            <label className="w-full">
              Nombre
              {" "}
              <input name="nombre" value={form.nombre} onChange={handleChange} className="border border-accent-300 rounded-lg px-2 py-1 w-full bg-primary-50" />
            </label>
            <label className="w-full">
              Avatar (URL)
              {" "}
              <input name="avatar" value={form.avatar} onChange={handleAvatar} className="border border-accent-300 rounded-lg px-2 py-1 w-full bg-primary-50" />
            </label>
            <label className="w-full">
              Bio
              {" "}
              <textarea name="bio" value={form.bio} onChange={handleChange} className="border border-accent-300 rounded-lg px-2 py-1 w-full bg-primary-50" />
            </label>
            <label className="w-full">
              Intereses
              {" "}
              <input name="interests" value={form.interests} onChange={handleChange} className="border border-accent-300 rounded-lg px-2 py-1 w-full bg-primary-50" />
            </label>
            {error && <div className="text-error-600">{error}</div>}
            <div className="flex gap-2">
              <button type="submit" className="bg-primary-600 text-white px-4 py-2 rounded-lg font-semibold shadow-md" disabled={saving}>{saving ? "Guardando..." : "Guardar"}</button>
              <button type="button" className="bg-accent-200 text-accent-700 px-4 py-2 rounded-lg font-semibold shadow-md" onClick={() => setEditing(false)}>Cancelar</button>
            </div>
          </form>
        ) : (
          <>
            <div className="text-xl font-semibold text-primary-700">{user.nombre}</div>
            <div className="text-accent-600 mb-2">Tokens: <span className="font-bold">{user.tokens ?? 0}</span></div>
            <div className="mb-2"><span className="font-semibold text-primary-700">Bio:</span> {user.bio || <span className="text-accent-400">Sin bio</span>}</div>
            <div className="mb-2"><span className="font-semibold text-primary-700">Intereses:</span> {user.interests || <span className="text-accent-400">Sin intereses</span>}</div>
            <AchievementsUser all={allAchievements} userAchievements={userAchievements} />
            <button className="bg-primary-600 text-white px-4 py-2 rounded-lg font-semibold shadow-md" onClick={() => setEditing(true)}>Editar perfil</button>
          </>
        )}
      </div>
    </main>
  );
} 