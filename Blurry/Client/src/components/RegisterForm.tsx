"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, User, Eye, EyeOff, Loader2, AlertCircle } from "lucide-react";
import { useNotifications } from "./NotificationsContext";

export default function RegisterForm() {
  const [formData, setFormData] = useState({ username: "", email: "", password: "", confirmPassword: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { showToast } = useNotifications();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Los códigos de acceso no coinciden");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: formData.username,
          correo: formData.email,
          contrasena: formData.password,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Error al enrolar");
      
      showToast("Identidad creada. Acceso concedido.", "success");
      setTimeout(() => router.push("/auth/login"), 1500);
    } catch (err: Error | unknown) {
      setError(err instanceof Error ? err.message : "Error al enrolar");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-xl flex items-start text-sm font-bold shadow-[0_0_15px_rgba(239,68,68,0.2)]">
          <AlertCircle className="w-5 h-5 mr-2 shrink-0 mt-0.5" />
          <p>{error}</p>
        </div>
      )}

      <div className="space-y-1">
        <label className="text-xs font-black text-zinc-400 uppercase tracking-widest pl-1">Alias (Username)</label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <User className="h-4 w-4 text-zinc-500 group-focus-within:text-blue-400 transition-colors" />
          </div>
          <input type="text" name="username" required value={formData.username} onChange={handleChange} placeholder="CyberNinja99"
            className="w-full bg-black/40 border border-zinc-700/80 rounded-xl text-white pl-11 pr-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all font-medium placeholder:text-zinc-600" />
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-xs font-black text-zinc-400 uppercase tracking-widest pl-1">Buzón de Comunicaciones</label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Mail className="h-4 w-4 text-zinc-500 group-focus-within:text-blue-400 transition-colors" />
          </div>
          <input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="correo@nexus.com"
            className="w-full bg-black/40 border border-zinc-700/80 rounded-xl text-white pl-11 pr-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all font-medium placeholder:text-zinc-600" />
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-xs font-black text-zinc-400 uppercase tracking-widest pl-1">Código de Acceso</label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Lock className="h-4 w-4 text-zinc-500 group-focus-within:text-blue-400 transition-colors" />
          </div>
          <input type={showPassword ? "text" : "password"} name="password" required value={formData.password} onChange={handleChange} placeholder="••••••••"
            className="w-full bg-black/40 border border-zinc-700/80 rounded-xl text-white pl-11 pr-11 py-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all font-medium placeholder:text-zinc-600 tracking-wider" />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-4 flex items-center text-zinc-500 hover:text-white transition-colors">
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-xs font-black text-zinc-400 uppercase tracking-widest pl-1">Verificar Código</label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Lock className="h-4 w-4 text-zinc-500 group-focus-within:text-blue-400 transition-colors" />
          </div>
          <input type={showPassword ? "text" : "password"} name="confirmPassword" required value={formData.confirmPassword} onChange={handleChange} placeholder="••••••••"
            className="w-full bg-black/40 border border-zinc-700/80 rounded-xl text-white pl-11 pr-11 py-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all font-medium placeholder:text-zinc-600 tracking-wider" />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 mt-6 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold uppercase tracking-widest text-sm transition-all shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] disabled:opacity-50 flex justify-center items-center gap-2"
      >
        {loading ? (
          <>
             <Loader2 className="w-5 h-5 animate-spin" /> PROCESANDO...
          </>
        ) : "GENERAR IDENTIDAD"}
      </button>
    </form>
  );
}
