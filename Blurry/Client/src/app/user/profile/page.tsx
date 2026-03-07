"use client";

import AchievementsUser from "../dashboard/AchievementsUser";
import { User, Achievement, UserAchievement } from "@/types";
import { useEffect, useState } from 'react';
import Imagen from 'next/image';
import { useAuth } from '@/components/AuthContext';
import ViewState from "@/components/ViewState";

interface ProfileForm {
  email: string;
  nombre: string;
  avatar: string;
  photos: string[];
  bio: string;
  interests: string;
  age: string;
  gender: string;
  location: string;
  matchAddress: string;
  matchCity: string;
  matchPostalCode: string;
  matchCountry: string;
  matchGoal: string;
  cardHolder: string;
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  billingAddress: string;
  billingCity: string;
  billingPostalCode: string;
  billingCountry: string;
  password?: string;
}

type BillingData = {
  cardHolder?: string;
  cardLast4?: string;
  cardMasked?: string;
  expiryMonth?: string;
  expiryYear?: string;
  billingAddress?: string;
  billingCity?: string;
  billingPostalCode?: string;
  billingCountry?: string;
  updatedAt?: string;
};

type MatchingData = {
  matchAddress?: string;
  matchCity?: string;
  matchPostalCode?: string;
  matchCountry?: string;
  matchGoal?: string;
};

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" ? (value as Record<string, unknown>) : {};
}

export default function UserProfilePage() {
  const { user: currentUser, isLoading: authLoading } = useAuth();
  const userId = currentUser?.id;
  const [user, setUser] = useState<User | null>(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<ProfileForm>({
    email: "",
    nombre: "",
    avatar: "/globe.svg",
    photos: [],
    bio: "",
    interests: "",
    age: "",
    gender: "",
    location: "",
    matchAddress: "",
    matchCity: "",
    matchPostalCode: "",
    matchCountry: "",
    matchGoal: "",
    cardHolder: "",
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    billingAddress: "",
    billingCity: "",
    billingPostalCode: "",
    billingCountry: "",
  });
  const [cvvDraft, setCvvDraft] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [allAchievements, setAllAchievements] = useState<Achievement[]>([]);
  const [userAchievements, setUserAchievements] = useState<UserAchievement[]>([]);

  function getAuthHeaders(): HeadersInit {
    const token = typeof window !== "undefined" ? localStorage.getItem("jwt-token") : null;
    if (!token) return {};
    return { Authorization: `Bearer ${token}` };
  }

  useEffect(() => {
    if (!userId || authLoading) return;
    
    Promise.all([
      fetch(`/api/users/${userId}`, { headers: getAuthHeaders() }).then(res => res.json()).catch(() => null),
      fetch(`/api/achievements/list`).then(res => res.json()).catch(() => []),
      fetch(`/api/achievements?userId=${userId}`).then(res => res.json()).catch(() => [])
    ]).then(([userData, achievements, userAch]) => {
      if (userData) {
        const valuesProfile = asRecord(userData.values_profile);
        const billing = asRecord(valuesProfile.billing) as BillingData;
        const matching = asRecord(valuesProfile.matching) as MatchingData;
        setUser(userData);
        setForm({
          email: userData.email || "",
          nombre: userData.nombre || userData.display_name || "",
          avatar: userData.avatar || userData.imagen_perfil || "/globe.svg",
          photos: userData.photos || [],
          bio: userData.bio || "",
          interests: userData.interests || "",
          age: userData.age != null ? String(userData.age) : (userData.edad != null ? String(userData.edad) : ""),
          gender: userData.gender || userData.genero || "",
          location: userData.location || userData.ubicacion || "",
          matchAddress: matching.matchAddress || "",
          matchCity: matching.matchCity || userData.location || userData.ubicacion || "",
          matchPostalCode: matching.matchPostalCode || userData.codigoPostal || "",
          matchCountry: matching.matchCountry || "",
          matchGoal: matching.matchGoal || "",
          cardHolder: billing.cardHolder || "",
          cardNumber: billing.cardMasked || (billing.cardLast4 ? `**** **** **** ${billing.cardLast4}` : ""),
          expiryMonth: billing.expiryMonth || "",
          expiryYear: billing.expiryYear || "",
          billingAddress: billing.billingAddress || "",
          billingCity: billing.billingCity || "",
          billingPostalCode: billing.billingPostalCode || "",
          billingCountry: billing.billingCountry || "",
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, avatar: e.target.value });
  };

  const handlePhotoChange = (index: number, value: string) => {
    const newPhotos = [...form.photos];
    newPhotos[index] = value;
    setForm({ ...form, photos: newPhotos });
  };

  const handleRemovePhoto = (index: number) => {
    const newPhotos = form.photos.filter((_, i) => i !== index);
    setForm({ ...form, photos: newPhotos });
  };

  const handleAddPhoto = () => {
    if (form.photos.length < 6) {
      setForm({ ...form, photos: [...form.photos, ""] });
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    if (!userId) return;
    
    try {
      const existingValuesProfile = asRecord(user?.values_profile);
      const existingBilling = asRecord(existingValuesProfile.billing) as BillingData;
      const parsedAge = Number(form.age);
      const digitsOnly = form.cardNumber.replace(/\D/g, "");
      const cardLast4 = digitsOnly.length >= 4 ? digitsOnly.slice(-4) : (existingBilling.cardLast4 || "");
      const maskedCard = cardLast4 ? `**** **** **** ${cardLast4}` : "";

      if (form.age && (!Number.isInteger(parsedAge) || parsedAge < 18 || parsedAge > 120)) {
        setError("La edad debe estar entre 18 y 120.");
        setSaving(false);
        return;
      }

      const matchingPayload: MatchingData = {
        matchAddress: form.matchAddress,
        matchCity: form.matchCity,
        matchPostalCode: form.matchPostalCode,
        matchCountry: form.matchCountry,
        matchGoal: form.matchGoal,
      };

      const billingPayload: BillingData = {
        cardHolder: form.cardHolder,
        cardLast4,
        cardMasked: maskedCard,
        expiryMonth: form.expiryMonth,
        expiryYear: form.expiryYear,
        billingAddress: form.billingAddress,
        billingCity: form.billingCity,
        billingPostalCode: form.billingPostalCode,
        billingCountry: form.billingCountry,
        updatedAt: new Date().toISOString(),
      };

      const payload: Record<string, unknown> = {
        email: form.email,
        display_name: form.nombre,
        age: form.age ? parsedAge : null,
        gender: form.gender || null,
        location: form.location,
        imagen_perfil: form.avatar,
        photos: form.photos,
        bio: form.bio,
        interests: form.interests,
        values_profile: {
          ...existingValuesProfile,
          matching: matchingPayload,
          billing: billingPayload,
        },
      };

      if (form.password) {
        payload.password = form.password;
      }

      const res = await fetch(`/api/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeaders(),
        },
        body: JSON.stringify(payload),
      });
      
      if (!res.ok) {
        setError("Error al guardar cambios");
      } else {
        const updatedUser = await res.json();
        setUser(updatedUser);
        setForm((prev) => ({
          ...prev,
          cardNumber: billingPayload.cardMasked || "",
        }));
        setCvvDraft("");
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
      <ViewState variant="loading" title="Decrypting profile" description="Sincronizando identidad de usuario." className="max-w-md" />
    </div>
  );
  if (!user) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-8">
        <ViewState variant="error" title="User not found" description="No se pudo cargar la identidad solicitada." className="max-w-md" />
      </div>
    );
  }

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
              <Imagen
                src={user.avatar || user.imagen_perfil || form.avatar || "/globe.svg"}
                alt="avatar"
                width={128}
                height={128}
                className="w-32 h-32 rounded-full relative z-10 border-4 border-zinc-900 object-cover shadow-2xl"
              />
              <div className="absolute -bottom-2 -right-2 bg-zinc-900 border border-zinc-700 w-8 h-8 rounded-full flex items-center justify-center shadow-lg z-20">
                <span className="text-xs font-bold text-accent-400">Lv.1</span>
              </div>
            </div>

            {editing ? (
              <form onSubmit={handleSave} className="w-full max-w-md flex flex-col gap-5 mt-4">
                <div className="space-y-4">
                  <label className="flex flex-col text-xs font-bold text-zinc-400 uppercase tracking-widest gap-2">
                    Email
                    <input name="email" type="email" value={form.email} onChange={handleChange} className="bg-zinc-900/80 border border-zinc-700/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/50 transition-all font-sans normal-case tracking-normal" />
                  </label>
                  <label className="flex flex-col text-xs font-bold text-zinc-400 uppercase tracking-widest gap-2">
                    New Password (leave blank to keep current)
                    <input name="password" type="password" value={form.password || ""} onChange={handleChange} className="bg-zinc-900/80 border border-zinc-700/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/50 transition-all font-sans normal-case tracking-normal" />
                  </label>
                  <label className="flex flex-col text-xs font-bold text-zinc-400 uppercase tracking-widest gap-2">
                    Display Name
                    <input name="nombre" value={form.nombre} onChange={handleChange} className="bg-zinc-900/80 border border-zinc-700/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/50 transition-all font-sans normal-case tracking-normal" />
                  </label>
                  <label className="flex flex-col text-xs font-bold text-zinc-400 uppercase tracking-widest gap-2">
                    Avatar Data Source (URL)
                    <input name="avatar" value={form.avatar} onChange={handleAvatar} className="bg-zinc-900/80 border border-zinc-700/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/50 transition-all font-sans normal-case tracking-normal" />
                  </label>
                  
                  <div className="rounded-2xl border border-zinc-800/70 bg-zinc-950/60 p-4">
                    <div className="flex justify-between items-center mb-3">
                      <p className="text-xs font-black uppercase tracking-widest text-zinc-400">Extra Photos ({form.photos.length}/6)</p>
                      {form.photos.length < 6 && (
                        <button type="button" onClick={handleAddPhoto} className="text-xs font-bold text-primary-400 hover:text-primary-300 uppercase">+ Add</button>
                      )}
                    </div>
                    <div className="flex flex-col gap-3">
                      {form.photos.map((photo, index) => (
                        <div key={index} className="flex gap-2 items-center">
                          <input 
                            value={photo} 
                            onChange={(e) => handlePhotoChange(index, e.target.value)} 
                            placeholder={`Photo URL ${index + 1}`}
                            className="flex-1 rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 normal-case"
                          />
                          <button type="button" onClick={() => handleRemovePhoto(index)} className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-500/20 text-red-500 hover:bg-red-500/40">
                            ×
                          </button>
                        </div>
                      ))}
                      {form.photos.length === 0 && (
                        <p className="text-[11px] text-zinc-500 italic">No extra photos added.</p>
                      )}
                    </div>
                  </div>

                  <label className="flex flex-col text-xs font-bold text-zinc-400 uppercase tracking-widest gap-2">
                    Biography Fragment
                    <textarea name="bio" value={form.bio} onChange={handleChange} rows={3} className="bg-zinc-900/80 border border-zinc-700/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/50 transition-all font-sans normal-case tracking-normal resize-none" />
                  </label>
                  <label className="flex flex-col text-xs font-bold text-zinc-400 uppercase tracking-widest gap-2">
                    Keywords / Interests
                    <input name="interests" value={form.interests} onChange={handleChange} className="bg-zinc-900/80 border border-zinc-700/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/50 transition-all font-sans normal-case tracking-normal" />
                  </label>

                  <div className="rounded-2xl border border-zinc-800/70 bg-zinc-950/60 p-4">
                    <p className="mb-3 text-xs font-black uppercase tracking-widest text-zinc-400">Registro y Matching</p>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <label className="flex flex-col text-[11px] font-bold text-zinc-500 uppercase tracking-widest gap-1">
                        Age
                        <input name="age" type="number" min={18} max={120} value={form.age} onChange={handleChange} className="rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 normal-case" />
                      </label>
                      <label className="flex flex-col text-[11px] font-bold text-zinc-500 uppercase tracking-widest gap-1">
                        Gender
                        <select name="gender" value={form.gender} onChange={handleChange} className="rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 normal-case">
                          <option value="">Selecciona</option>
                          <option value="other">Otro</option>
                          <option value="male">Masculino</option>
                          <option value="female">Femenino</option>
                        </select>
                      </label>
                      <label className="flex flex-col text-[11px] font-bold text-zinc-500 uppercase tracking-widest gap-1 sm:col-span-2">
                        Location (Registro)
                        <input name="location" value={form.location} onChange={handleChange} className="rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 normal-case" />
                      </label>
                      <label className="flex flex-col text-[11px] font-bold text-zinc-500 uppercase tracking-widest gap-1 sm:col-span-2">
                        Match Address
                        <input name="matchAddress" value={form.matchAddress} onChange={handleChange} className="rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 normal-case" />
                      </label>
                      <label className="flex flex-col text-[11px] font-bold text-zinc-500 uppercase tracking-widest gap-1">
                        Match City
                        <input name="matchCity" value={form.matchCity} onChange={handleChange} className="rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 normal-case" />
                      </label>
                      <label className="flex flex-col text-[11px] font-bold text-zinc-500 uppercase tracking-widest gap-1">
                        Match Postal Code
                        <input name="matchPostalCode" value={form.matchPostalCode} onChange={handleChange} className="rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 normal-case" />
                      </label>
                      <label className="flex flex-col text-[11px] font-bold text-zinc-500 uppercase tracking-widest gap-1">
                        Match Country
                        <input name="matchCountry" value={form.matchCountry} onChange={handleChange} className="rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 normal-case" />
                      </label>
                      <label className="flex flex-col text-[11px] font-bold text-zinc-500 uppercase tracking-widest gap-1">
                        Match Goal
                        <input name="matchGoal" value={form.matchGoal} onChange={handleChange} className="rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 normal-case" />
                      </label>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-zinc-800/70 bg-zinc-950/60 p-4">
                    <p className="mb-3 text-xs font-black uppercase tracking-widest text-zinc-400">Billing Profile</p>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <label className="flex flex-col text-[11px] font-bold text-zinc-500 uppercase tracking-widest gap-1">
                        Card Holder
                        <input name="cardHolder" value={form.cardHolder} onChange={handleChange} className="rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 normal-case" />
                      </label>
                      <label className="flex flex-col text-[11px] font-bold text-zinc-500 uppercase tracking-widest gap-1">
                        Card Number
                        <input name="cardNumber" value={form.cardNumber} onChange={handleChange} placeholder="**** **** **** 1234" className="rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 normal-case" />
                      </label>
                      <label className="flex flex-col text-[11px] font-bold text-zinc-500 uppercase tracking-widest gap-1">
                        Expiry Month
                        <input name="expiryMonth" value={form.expiryMonth} onChange={handleChange} placeholder="MM" className="rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 normal-case" />
                      </label>
                      <label className="flex flex-col text-[11px] font-bold text-zinc-500 uppercase tracking-widest gap-1">
                        Expiry Year
                        <input name="expiryYear" value={form.expiryYear} onChange={handleChange} placeholder="YYYY" className="rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 normal-case" />
                      </label>
                      <label className="flex flex-col text-[11px] font-bold text-zinc-500 uppercase tracking-widest gap-1">
                        CVV (Not Stored)
                        <input value={cvvDraft} onChange={(e) => setCvvDraft(e.target.value)} placeholder="***" className="rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 normal-case" />
                      </label>
                      <label className="flex flex-col text-[11px] font-bold text-zinc-500 uppercase tracking-widest gap-1">
                        Address
                        <input name="billingAddress" value={form.billingAddress} onChange={handleChange} className="rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 normal-case" />
                      </label>
                      <label className="flex flex-col text-[11px] font-bold text-zinc-500 uppercase tracking-widest gap-1">
                        City
                        <input name="billingCity" value={form.billingCity} onChange={handleChange} className="rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 normal-case" />
                      </label>
                      <label className="flex flex-col text-[11px] font-bold text-zinc-500 uppercase tracking-widest gap-1">
                        Postal Code
                        <input name="billingPostalCode" value={form.billingPostalCode} onChange={handleChange} className="rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 normal-case" />
                      </label>
                      <label className="flex flex-col text-[11px] font-bold text-zinc-500 uppercase tracking-widest gap-1 sm:col-span-2">
                        Country
                        <input name="billingCountry" value={form.billingCountry} onChange={handleChange} className="rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 normal-case" />
                      </label>
                    </div>
                    <p className="mt-2 text-[11px] text-zinc-500">Por seguridad, el CVV no se guarda y el numero de tarjeta queda enmascarado.</p>
                  </div>
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
                <h2 className="text-3xl font-black text-white mb-1 tracking-tight">{user.nombre || user.display_name || form.nombre}</h2>
                <p className="text-sm text-zinc-500 mb-3">{user.email || form.email}</p>
                <div className="inline-flex items-center gap-2 bg-primary-500/10 border border-primary-500/30 px-4 py-1.5 rounded-full mb-6 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-primary-500/20 w-0 group-hover:w-full transition-all duration-700 ease-out" />
                  <span className="text-primary-400 font-black text-sm tracking-widest relative z-10">{user.tokens ?? 0}</span>
                  <span className="text-zinc-400 text-[10px] uppercase font-bold relative z-10">TKN</span>
                </div>
                
                <div className="w-full bg-zinc-900/50 border border-zinc-800/50 rounded-2xl p-5 mb-4 text-left">
                  <p className="text-xs font-black text-zinc-500 uppercase tracking-widest mb-2 border-b border-zinc-800/50 pb-2">Bio</p>
                  <p className="text-zinc-300 font-medium leading-relaxed">{user.bio || <span className="opacity-40 italic">Signal lost...</span>}</p>
                </div>
                
                {form.photos.length > 0 && (
                  <div className="w-full bg-zinc-900/50 border border-zinc-800/50 rounded-2xl p-5 mb-4 text-left">
                    <p className="text-xs font-black text-zinc-500 uppercase tracking-widest mb-3 border-b border-zinc-800/50 pb-2">Gallery</p>
                    <div className="grid grid-cols-3 gap-3">
                      {form.photos.map((photo, i) => (
                        <div key={i} className="aspect-square relative rounded-xl overflow-hidden border border-zinc-800/80">
                          {photo ? (
                            <Imagen src={photo} alt={`Photo ${i+1}`} fill className="object-cover hover:scale-110 transition-transform duration-500" />
                          ) : (
                            <div className="w-full h-full bg-zinc-800/40 animate-pulse" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="w-full bg-zinc-900/50 border border-zinc-800/50 rounded-2xl p-5 mb-6 text-left">
                  <p className="text-xs font-black text-zinc-500 uppercase tracking-widest mb-2 border-b border-zinc-800/50 pb-2">Interests</p>
                  <p className="text-zinc-300 font-medium leading-relaxed">{user.interests || <span className="opacity-40 italic">No patterns detected...</span>}</p>
                </div>

                <div className="w-full bg-zinc-900/50 border border-zinc-800/50 rounded-2xl p-5 mb-6 text-left">
                  <p className="text-xs font-black text-zinc-500 uppercase tracking-widest mb-2 border-b border-zinc-800/50 pb-2">Registro</p>
                  <p className="text-sm text-zinc-300">Edad: {form.age || "-"}</p>
                  <p className="text-sm text-zinc-400">Genero: {form.gender || "-"}</p>
                  <p className="text-sm text-zinc-400">Ubicacion: {form.location || "-"}</p>
                </div>

                <div className="w-full bg-zinc-900/50 border border-zinc-800/50 rounded-2xl p-5 mb-6 text-left">
                  <p className="text-xs font-black text-zinc-500 uppercase tracking-widest mb-2 border-b border-zinc-800/50 pb-2">Matching</p>
                  <p className="text-sm text-zinc-300">Direccion: {form.matchAddress || "-"}</p>
                  <p className="text-sm text-zinc-400">Ciudad: {form.matchCity || "-"}</p>
                  <p className="text-sm text-zinc-400">Codigo Postal: {form.matchPostalCode || "-"}</p>
                  <p className="text-sm text-zinc-400">Pais: {form.matchCountry || "-"}</p>
                  <p className="text-sm text-zinc-400">Objetivo: {form.matchGoal || "-"}</p>
                </div>

                <div className="w-full bg-zinc-900/50 border border-zinc-800/50 rounded-2xl p-5 mb-6 text-left">
                  <p className="text-xs font-black text-zinc-500 uppercase tracking-widest mb-2 border-b border-zinc-800/50 pb-2">Billing Profile</p>
                  <p className="text-sm text-zinc-300">Tarjeta: {form.cardNumber || "No configurada"}</p>
                  <p className="text-sm text-zinc-400 mt-1">Titular: {form.cardHolder || "-"}</p>
                  <p className="text-sm text-zinc-400">Direccion: {form.billingAddress || "-"}, {form.billingCity || "-"} {form.billingPostalCode || ""}</p>
                  <p className="text-sm text-zinc-400">Pais: {form.billingCountry || "-"}</p>
                  <p className="mt-2 text-[11px] text-zinc-500">Los datos sensibles se almacenan en formato enmascarado.</p>
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