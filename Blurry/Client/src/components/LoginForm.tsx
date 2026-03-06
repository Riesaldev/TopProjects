"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthContext";
import { AlertCircle, Mail, Lock, Eye, EyeOff } from "lucide-react";
import Link from 'next/link';
import Button from "@/components/Button";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError("");
    setLoading(true);

    try {
      const result = await login(email, password);
      
      if (result.success) {
        // Redirigir al dashboard después de login exitoso
        router.push("/dashboard");
      } else {
        setLocalError(result.message || "Error al iniciar sesión");
      }
    } catch {
      setLocalError("Error al conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 relative">
      {localError && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-xl flex items-start text-sm font-bold shadow-[0_0_15px_rgba(239,68,68,0.2)]">
          <AlertCircle className="w-5 h-5 mr-2 shrink-0 mt-0.5" />
          <p>{localError}</p>
        </div>
      )}

      <div className="space-y-1">
        <label className="text-xs font-black text-zinc-400 uppercase tracking-widest pl-1">Identificación</label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-zinc-500 group-focus-within:text-primary-400 transition-colors" />
          </div>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-black/40 border border-zinc-700/80 rounded-xl text-white pl-11 pr-4 py-3 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/50 transition-all font-medium placeholder:text-zinc-600"
            placeholder="correo@nexus.com"
          />
        </div>
      </div>

      <div className="space-y-1">
        <div className="flex items-center justify-between pl-1">
          <label className="text-xs font-black text-zinc-400 uppercase tracking-widest">Código de Acceso</label>
          <Link href="/auth/forgot-password" className="text-xs font-bold text-primary-500 hover:text-primary-400 transition-colors">
            ¿Restablecer?
          </Link>
        </div>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-zinc-500 group-focus-within:text-primary-400 transition-colors" />
          </div>
          <input
            type={showPassword ? "text" : "password"}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-black/40 border border-zinc-700/80 rounded-xl text-white pl-11 pr-12 py-3 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/50 transition-all font-medium placeholder:text-zinc-600 tracking-wider"
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-zinc-500 hover:text-white transition-colors focus:outline-none"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <Button type="submit" fullWidth variant="primary" isLoading={loading} className="mt-4 uppercase tracking-widest text-sm">
        {loading ? "VERIFICANDO..." : "INICIAR ENLACE"}
      </Button>
    </form>
  );
}
