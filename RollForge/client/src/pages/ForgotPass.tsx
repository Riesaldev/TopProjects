import { useState } from 'react';
import { postJson } from '@/utils/api';
import toast from 'react-hot-toast';

interface RecoverResponse { status: string; message?: string }

const ForgotPass = () => {
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function submitEmail(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return toast.error('Introduce un email válido');
    setLoading(true);
    try {
      const res = await postJson<RecoverResponse>('/api/users/password/recover', { email: email.trim() });
      if (res.status === 'ok') {
        toast.success('Si el email existe se ha enviado un código');
        setStep(2);
      } else {
        toast('Revisa tu correo');
        setStep(2);
      }
    } catch (err: any) {
      toast.error(err?.message || 'Error iniciando recuperación');
    } finally {
      setLoading(false);
    }
  }

  async function resetPassword(e: React.FormEvent) {
    e.preventDefault();
    if (!code.trim() || !newPassword) return toast.error('Completa todos los campos');
    if (newPassword !== confirmPassword) return toast.error('Las contraseñas no coinciden');
    if (newPassword.length < 6) return toast.error('Mínimo 6 caracteres');
    setLoading(true);
    try {
      const res = await postJson<{ status: string }>(
        '/api/users/password/reset',
        { email: email.trim(), code: code.trim(), newPassword }
      );
      if (res.status === 'ok') {
        toast.success('Contraseña restablecida');
        setStep(1);
        setCode('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        toast.error('No se pudo restablecer');
      }
    } catch (err: any) {
      toast.error(err?.message || 'Error al restablecer');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('/bg-log.jpg')] bg-cover bg-center px-4 py-10">
      <div className="w-full max-w-md backdrop-blur-sm bg-black/60 border border-white/10 rounded-xl p-8 shadow-xl text-white">
        <h1 className="text-2xl font-semibold tracking-wide text-center mb-2">Recuperar contraseña</h1>
        <p className="text-sm text-gray-300 text-center mb-6">
          {step === 1 ? 'Introduce tu correo para recibir un código de verificación.' : 'Introduce el código recibido y tu nueva contraseña.'}
        </p>

        {step === 1 && (
          <form onSubmit={submitEmail} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1">Correo electrónico</label>
              <input
                type="email"
                className="w-full rounded-md bg-gray-800/60 border border-gray-600 focus:border-primary focus:ring-2 focus:ring-primary/40 px-3 py-2 outline-none transition"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@correo.com"
                autoComplete="email"
                required
              />
            </div>
            <button
              disabled={loading}
              className="w-full py-2.5 rounded-md font-medium bg-primary hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed transition"
            >
              {loading ? 'Enviando...' : 'Enviar código'}
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={resetPassword} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1">Código</label>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]{6}"
                maxLength={6}
                className="w-full rounded-md bg-gray-800/60 border border-gray-600 focus:border-primary focus:ring-2 focus:ring-primary/40 px-3 py-2 outline-none transition tracking-widest text-center"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                placeholder="123456"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Nueva contraseña</label>
              <input
                type="password"
                className="w-full rounded-md bg-gray-800/60 border border-gray-600 focus:border-primary focus:ring-2 focus:ring-primary/40 px-3 py-2 outline-none transition"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Confirmar contraseña</label>
              <input
                type="password"
                className="w-full rounded-md bg-gray-800/60 border border-gray-600 focus:border-primary focus:ring-2 focus:ring-primary/40 px-3 py-2 outline-none transition"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center justify-between text-xs text-gray-400">
              <button type="button" onClick={() => setStep(1)} className="hover:text-primary transition">Volver</button>
              <span className="opacity-70">Código enviado a {email}</span>
            </div>
            <button
              disabled={loading}
              className="w-full py-2.5 rounded-md font-medium bg-green-600 hover:bg-green-500 disabled:opacity-60 disabled:cursor-not-allowed transition"
            >
              {loading ? 'Restableciendo...' : 'Restablecer contraseña'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPass;