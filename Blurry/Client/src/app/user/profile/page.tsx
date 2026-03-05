"use client";

import AchievementsUser from "../dashboard/AchievementsUser";
import { User, Achievement, UserAchievement } from "@/types";
import { useEffect, useState } from 'react';
import { useRealtime } from '@/context/RealtimeContext';
import { useAuth } from '@/components/AuthContext';

interface ProfileForm {
  nombre: string;
  avatar: string;
  bio: string;
  interests: string;
}

export default function UserProfilePage() {
  const { user: currentUser, isLoading: authLoading } = useAuth();
  const userId = currentUser?.id;
  const realtimeContext = useRealtime();
  const notifications = realtimeContext?.notifications || [];
  const [user, setUser] = useState<User | null>(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<ProfileForm>({
    nombre: "",
    avatar: "/globe.svg",
    bio: "",
    interests: ""
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [allAchievements, setAllAchievements] = useState<Achievement[]>([]);
  const [userAchievements, setUserAchievements] = useState<UserAchievement[]>([]);

  useEffect(() => {
    if (!userId || authLoading) return;
    
    Promise.all([
      fetch(`/api/users/${userId}`).then(res => res.json()).catch(() => null),
      fetch(`/api/achievements/list`).then(res => res.json()).catch(() => []),
      fetch(`/api/achievements?userId=${userId}`).then(res => res.json()).catch(() => [])
    ]).then(([userData, achievements, userAch]) => {
      if (userData) {
        setUser(userData);
        setForm({
          nombre: userData.nombre || "",
          avatar: userData.avatar || "/globe.svg",
          bio: userData.bio || "",
          interests: userData.interests || "",
        });
      }
      setAllAchievements(achievements);
      setUserAchievements(userAch);
      setLoading(false);
    }).catch((error) => {
      console.error("Error cargando perfil:", error);
      setLoading(false);
    });
  }, [userId, authLoading]);

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
    
    try {
      const res = await fetch(`/api/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...user, ...form })
      });
      
      if (!res.ok) {
        setError("Error al guardar cambios");
      } else {
        const updatedUser = await res.json();
        setUser(updatedUser);
        setEditing(false);
      }
    } catch (error) {
      console.error("Error guardando perfil:", error);
      setError("Error al conectar con el servidor");
    } finally {
      setSaving(false);
    }
  };

  if (authLoading || loading) return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
      <div className="animate-pulse flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-t-primary-500 border-zinc-800 rounded-full animate-spin shadow-[0_0_15px_rgba(168,85,247,0.5)]"></div>
        <p className="mt-4 text-primary-400 font-black tracking-widest text-sm">DECRYPTING PROFILE</p>
      </div>
    </div>
  );
  if (!user) return <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-8 text-red-500 font-bold">User Not Found</div>;

  return (
    <main className="min-h-screen flex flex-col items-center py-12 px-4 bg-zinc-950 text-slate-200">
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-900/20 via-zinc-950 to-zinc-950 -z-10" />
      
      <div className="w-full max-w-4xl flex flex-col gap-6 relative z-10">
        <div className="text-center mb-4">
          <h1 className="text-4xl font-black bg-gradient-to-r from-primary-400 via-accent-400 to-primary-300 bg-clip-text text-transparent tracking-tight">Identity Nexus</h1>
        </div>

        <div className="glass-panel p-1 rounded-3xl border border-zinc-800/50 relative overflow-hidden backdrop-blur-md">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 blur-[80px] rounded-full -z-10" />
          
          <div className="bg-zinc-900/60 rounded-[22px] p-6 lg:p-10 flex flex-col items-center gap-6">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary-500 to-accent-500 rounded-full blur-[10px] opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
              <img src={user.avatar || "/globe.svg"} alt="avatar" className="w-32 h-32 rounded-full relative z-10 border-4 border-zinc-900 object-cover shadow-2xl" />
              <div className="absolute -bottom-2 -right-2 bg-zinc-900 border border-zinc-700 w-8 h-8 rounded-full flex items-center justify-center shadow-lg z-20">
                <span className="text-xs font-bold text-accent-400">Lv.1</span>
              </div>
            </div>

            {editing ? (
              <form onSubmit={handleSave} className="w-full max-w-md flex flex-col gap-5 mt-4">
                <div className="space-y-4">
                  <label className="flex flex-col text-xs font-bold text-zinc-400 uppercase tracking-widest gap-2">
                    Display Name
                    <input name="nombre" value={form.nombre} onChange={handleChange} className="bg-zinc-900/80 border border-zinc-700/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/50 transition-all font-sans normal-case tracking-normal" />
                  </label>
                  <label className="flex flex-col text-xs font-bold text-zinc-400 uppercase tracking-widest gap-2">
                    Avatar Data Source (URL)
                    <input name="avatar" value={form.avatar} onChange={handleAvatar} className="bg-zinc-900/80 border border-zinc-700/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/50 transition-all font-sans normal-case tracking-normal" />
                  </label>
                  <label className="flex flex-col text-xs font-bold text-zinc-400 uppercase tracking-widest gap-2">
                    Biography Fragment
                    <textarea name="bio" value={form.bio} onChange={handleChange} rows={3} className="bg-zinc-900/80 border border-zinc-700/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/50 transition-all font-sans normal-case tracking-normal resize-none" />
                  </label>
                  <label className="flex flex-col text-xs font-bold text-zinc-400 uppercase tracking-widest gap-2">
                    Keywords / Interests
                    <input name="interests" value={form.interests} onChange={handleChange} className="bg-zinc-900/80 border border-zinc-700/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/50 transition-all font-sans normal-case tracking-normal" />
                  </label>
                </div>
                
                {error && <div className="text-red-400 text-sm font-bold bg-red-500/10 p-3 rounded-lg text-center border border-red-500/20">{error}</div>}
                
                <div className="flex gap-3 mt-4">
                  <button type="submit" className="flex-1 bg-gradient-to-r from-primary-600 to-primary-700 text-white px-4 py-3 rounded-xl font-bold tracking-wide shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] transition-all flex items-center justify-center" disabled={saving}>
                    {saving ? "UPLOADING..." : "SYNC IDENTITY"}
                  </button>
                  <button type="button" className="flex-1 bg-zinc-800 text-zinc-300 px-4 py-3 rounded-xl font-bold tracking-wide hover:bg-zinc-700 transition-colors" onClick={() => setEditing(false)}>
                    ABORT
                  </button>
                </div>
              </form>
            ) : (
              <div className="w-full max-w-md flex flex-col items-center text-center mt-2">
                <h2 className="text-3xl font-black text-white mb-1 tracking-tight">{user.nombre}</h2>
                <div className="inline-flex items-center gap-2 bg-primary-500/10 border border-primary-500/30 px-4 py-1.5 rounded-full mb-6 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-primary-500/20 w-0 group-hover:w-full transition-all duration-700 ease-out" />
                  <span className="text-primary-400 font-black text-sm tracking-widest relative z-10">{user.tokens ?? 0}</span>
                  <span className="text-zinc-400 text-[10px] uppercase font-bold relative z-10">TKN</span>
                </div>
                
                <div className="w-full bg-zinc-900/50 border border-zinc-800/50 rounded-2xl p-5 mb-4 text-left">
                  <p className="text-xs font-black text-zinc-500 uppercase tracking-widest mb-2 border-b border-zinc-800/50 pb-2">Bio</p>
                  <p className="text-zinc-300 font-medium leading-relaxed">{user.bio || <span className="opacity-40 italic">Signal lost...</span>}</p>
                </div>
                
                <div className="w-full bg-zinc-900/50 border border-zinc-800/50 rounded-2xl p-5 mb-6 text-left">
                  <p className="text-xs font-black text-zinc-500 uppercase tracking-widest mb-2 border-b border-zinc-800/50 pb-2">Interests</p>
                  <p className="text-zinc-300 font-medium leading-relaxed">{user.interests || <span className="opacity-40 italic">No patterns detected...</span>}</p>
                </div>
                
                <button onClick={() => setEditing(true)} className="w-full py-3 rounded-xl font-bold tracking-widest text-sm uppercase bg-zinc-800/80 text-zinc-300 border border-zinc-700 hover:text-white hover:border-primary-500/50 hover:bg-zinc-800 hover:shadow-[0_0_15px_rgba(168,85,247,0.2)] transition-all">
                  Edit Identity
                </button>
              </div>
            )}
            
            {/* Cosméticos Comprados */}
            <div className="w-full mt-6 pt-6 border-t border-zinc-800/50">
              <h3 className="text-sm font-black text-zinc-400 uppercase tracking-widest mb-4 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-accent-500 animate-pulse" /> Active Enhancements</h3>
              <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">
                <div className="flex flex-col items-center min-w-[90px] group cursor-pointer">
                  <div className="w-16 h-16 bg-gradient-to-tr from-yellow-400 to-amber-600 rounded-2xl flex items-center justify-center shadow-[0_0_15px_rgba(251,191,36,0.3)] mb-3 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 relative border border-yellow-300/30">
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                    <span className="text-2xl drop-shadow-md">⭐</span>
                  </div>
                  <span className="text-[10px] text-center font-bold tracking-wider text-yellow-400 uppercase">VIP Frame</span>
                </div>
                <div className="flex flex-col items-center min-w-[90px] group cursor-pointer">
                  <div className="w-16 h-16 bg-gradient-to-tr from-accent-500 to-rose-500 rounded-2xl flex items-center justify-center shadow-[0_0_15px_rgba(236,72,153,0.3)] mb-3 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300 relative border border-accent-300/30">
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                    <span className="text-2xl drop-shadow-md">🔥</span>
                  </div>
                  <span className="text-[10px] text-center font-bold tracking-wider text-accent-400 uppercase">Aura Fire</span>
                </div>
                <div className="flex flex-col items-center min-w-[90px] opacity-40 hover:opacity-100 transition-opacity cursor-pointer group">
                  <div className="w-16 h-16 bg-zinc-900 rounded-2xl flex items-center justify-center border-2 border-dashed border-zinc-700 mb-3 group-hover:border-zinc-500 transition-colors">
                    <span className="text-lg text-zinc-500 group-hover:text-zinc-300 font-bold">+</span>
                  </div>
                  <span className="text-[10px] text-center font-bold tracking-wider uppercase text-zinc-500 group-hover:text-zinc-300">Store</span>
                </div>
              </div>
            </div>

            <div className="w-full mt-6">
              <AchievementsUser all={allAchievements} userAchievements={userAchievements} />
            </div>
            {!editing && (
              <div className="w-full max-w-md mt-2">
                <button className="hidden" onClick={() => setEditing(true)} />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
} 