import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const { VITE_API_URL } = import.meta.env;



type ForgotPassStep = 'request' | 'reset';

const getErrorStatus = (error: unknown): number | undefined => {
  if (typeof error === 'object' && error !== null && 'status' in error) {
    const value = (error as { status?: unknown }).status;
    return typeof value === 'number' ? value : undefined;
  }
  return undefined;
};

const ForgotPass = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState<ForgotPassStep>('request');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [devCode, setDevCode] = useState<string | null>(null);
  const [isRequesting, setIsRequesting] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  const requestRecoveryCode = async (targetEmail: string) => {
    setIsRequesting(true);
    try {
      const res = await fetch(`${VITE_API_URL}/api/users/password/recover`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: targetEmail,
        }),
      });
      const data = await res.json();
      const showCode = Boolean(data.code) && import.meta.env.DEV;
      setDevCode(showCode ? data.code ?? null : null);
      setCode('');
      setNewPassword('');
      setConfirmPassword('');
      toast.success('Revisa tu correo para el código de recuperación');
      setStep('reset');
      return true;
    } catch (error) {
      const status = getErrorStatus(error);
      const message = error instanceof Error ? error.message : 'No se pudo iniciar la recuperación';
      if (status === 404) {
        toast.error('No encontramos una cuenta con ese correo');
      } else {
        toast.error(message);
      }
      return false;
    } finally {
      setIsRequesting(false);
    }
  };

  const handleRequestCode = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail) {
      toast.error('Introduce tu correo electrónico');
      return;
    }
    await requestRecoveryCode(normalizedEmail);
  };

  const handleResendCode = async () => {
    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail) {
      toast.error('Introduce tu correo electrónico');
      return;
    }
    await requestRecoveryCode(normalizedEmail);
  };

  const handleResetPassword = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalizedEmail = email.trim().toLowerCase();
    const trimmedCode = code.trim();
    const trimmedPassword = newPassword.trim();
    const trimmedConfirmation = confirmPassword.trim();

    if (trimmedCode.length !== 6) {
      toast.error('El código debe tener 6 dígitos');
      return;
    }
    if (trimmedPassword.length < 6) {
      toast.error('La nueva contraseña debe tener al menos 6 caracteres');
      return;
    }
    if (trimmedPassword !== trimmedConfirmation) {
      toast.error('Las contraseñas no coinciden');
      return;
    }

    setIsResetting(true);
    try {
      const response = await fetch(`${VITE_API_URL}/api/users/password/reset`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: normalizedEmail,
          code: trimmedCode,
          newPassword: trimmedPassword,
        }),
      });

      const data = await response.json();
      toast.success(data.message || 'Contraseña restablecida');
      setTimeout(() => navigate('/login'), 1200);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'No se pudo restablecer la contraseña';
      toast.error(message);
    } finally {
      setIsResetting(false);
    }
  };

  const renderRequestStep = () => (
    <form className="flex flex-col space-y-6 w-full" onSubmit={handleRequestCode}>
      <label className="flex flex-col">
        Correo electrónico
        <input
          type="email"
          name="email"
          className="mt-2 block w-full p-3 border border-gray-500/40 rounded bg-gray-900/40 text-neutral-100 focus:outline-none focus:ring-2 focus:ring-secondary"
          placeholder="tucorreo@ejemplo.com"
          autoFocus
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          autoComplete="email"
        />
      </label>
      <button
        className="bg-secondary hover:bg-primary transition duration-300 ease-in-out text-white py-3 px-4 rounded-xl disabled:opacity-60 disabled:cursor-not-allowed"
        type="submit"
        disabled={isRequesting}
      >
        {isRequesting ? 'Enviando…' : 'Enviar código'}
      </button>
      <p className="text-sm text-gray-300 text-center">
        Te enviaremos un código de verificación. Úsalo para definir una nueva contraseña.
      </p>
    </form>
  );

  const renderResetStep = () => (
    <form className="flex flex-col space-y-6 w-full" onSubmit={handleResetPassword}>
      <div className="grid gap-4">
        <label className="flex flex-col">
          Correo electrónico
          <input
            type="email"
            className="mt-2 block w-full p-3 border border-gray-500/40 rounded bg-gray-900/40 text-neutral-100 focus:outline-none focus:ring-2 focus:ring-secondary"
            value={email}
            disabled
          />
        </label>
        <label className="flex flex-col">
          Código de recuperación
          <input
            type="text"
            className="mt-2 block w-full p-3 border border-gray-500/40 rounded bg-gray-900/40 text-neutral-100 focus:outline-none focus:ring-2 focus:ring-secondary tracking-widest text-center uppercase"
            placeholder="Ej: 123456"
            value={code}
            onChange={(event) => setCode(event.target.value.replace(/[^0-9]/g, '').slice(0, 6))}
            inputMode="numeric"
            autoComplete="one-time-code"
          />
        </label>
        {devCode && (
          <p className="text-xs text-amber-300 bg-amber-900/40 border border-amber-600/40 rounded px-3 py-2">
            Código de prueba: <span className="font-mono text-sm">{devCode}</span>
          </p>
        )}
        <label className="flex flex-col">
          Nueva contraseña
          <input
            type="password"
            className="mt-2 block w-full p-3 border border-gray-500/40 rounded bg-gray-900/40 text-neutral-100 focus:outline-none focus:ring-2 focus:ring-secondary"
            placeholder="Mínimo 6 caracteres"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
            autoComplete="new-password"
          />
        </label>
        <label className="flex flex-col">
          Confirmar contraseña
          <input
            type="password"
            className="mt-2 block w-full p-3 border border-gray-500/40 rounded bg-gray-900/40 text-neutral-100 focus:outline-none focus:ring-2 focus:ring-secondary"
            placeholder="Repite tu nueva contraseña"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            autoComplete="new-password"
          />
        </label>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          className="text-sm text-gray-300 underline-offset-4 hover:underline disabled:opacity-60 disabled:cursor-not-allowed"
          onClick={handleResendCode}
          disabled={isRequesting}
        >
          {isRequesting ? 'Reenviando…' : '¿No llegó el código? Reenviar'}
        </button>
        <button
          className="bg-secondary hover:bg-primary transition duration-300 ease-in-out text-white py-3 px-4 rounded-xl disabled:opacity-60 disabled:cursor-not-allowed"
          type="submit"
          disabled={isResetting}
        >
          {isResetting ? 'Actualizando…' : 'Restablecer contraseña'}
        </button>
      </div>
    </form>
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-secondary px-4">
      <div className="w-full max-w-xl bg-black/60 backdrop-blur-md border border-gray-700/40 rounded-2xl p-10 shadow-xl space-y-6">
        <div className="space-y-3 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold">Recuperar contraseña</h1>
          <p className="text-gray-300 text-sm sm:text-base">
            {step === 'request'
              ? 'Introduce tu correo para recibir un código de verificación.'
              : 'Introduce el código y elige una nueva contraseña segura.'}
          </p>
        </div>

        {step === 'request' ? renderRequestStep() : renderResetStep()}

        <div className="text-center text-sm text-gray-400">
          ¿Recordaste tu contraseña?{' '}
          <button
            type="button"
            className="text-secondary hover:text-primary font-semibold"
            onClick={() => navigate('/login')}
          >
            Volver al inicio de sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPass;