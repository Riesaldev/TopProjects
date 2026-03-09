import { useState } from 'react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Placeholder: el backend aún no implementa este flujo.
    alert(`Enviaríamos instrucciones a: ${email}`);
    setEmail('');
  };

  return (
    <section className="relative flex-1 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,107,129,0.22),_transparent_45%)]" />
        <div className="absolute inset-y-0 left-0 w-1/2 bg-[radial-gradient(circle_at_left,_rgba(0,225,217,0.18),_transparent_55%)] blur-3xl opacity-60" />
      </div>
      <div className="relative max-w-5xl mx-auto px-6 py-16 flex flex-col gap-12 lg:flex-row lg:items-center">
        <div className="space-y-4 max-w-xl">
          <p className="text-xs uppercase tracking-[0.4em] text-white/60">recuperación</p>
          <h1 className="text-4xl font-semibold">Restablece tu acceso con un enlace temporal.</h1>
          <p className="text-white/70">
            Esta sección aún es una maqueta, pero muestra cómo será la experiencia: ingresa tu correo y recibirás instrucciones en minutos.
          </p>
          <ul className="space-y-2 text-sm text-white/60">
            <li>• Verificamos que la cuenta exista.</li>
            <li>• Enviamos un enlace con expiración corta.</li>
            <li>• Podrás elegir una nueva contraseña segura.</li>
          </ul>
        </div>

        <form onSubmit={handleSubmit} className="frosted-card w-full max-w-md p-8 space-y-5 border border-white/10">
          <label className="flex flex-col gap-2 text-white/70 text-sm">
            Correo asociado
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@correo.com"
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-base text-white placeholder:text-white/40 focus:border-[#7f5af0] focus:ring-2 focus:ring-[#7f5af0]/40 transition"
            />
          </label>
          <button type="submit" className="btn-primary w-full">
            Solicitar enlace
          </button>
          <p className="text-xs text-white/50 text-center">
            Al enviar este formulario confirmas que tienes permiso para administrar la cuenta.
          </p>
        </form>
      </div>
    </section>
  );
};

export default ForgotPassword;