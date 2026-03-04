import React, { useState } from "react";

export default function ContactForm() {
  const [msg, setMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate network request
    setTimeout(() => {
      setMsg("¡Mensaje enviado correctamente! Te responderemos muy pronto.");
      setIsSubmitting(false);
      setTimeout(() => setMsg(""), 5000);
    }, 800);
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="flex flex-col gap-6 max-w-lg mx-auto bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100 relative"
      aria-label="Formulario para contactar con soporte"
    >
      <div className="flex flex-col text-left">
        <label htmlFor="nombre" className="text-sm font-bold text-gray-800 mb-2">Nombre completo</label>
        <input 
          id="nombre" 
          type="text" 
          placeholder="Ej: Laura Gómez" 
          required 
          disabled={isSubmitting}
          className="border-2 border-gray-200 bg-gray-50 py-3 px-4 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 focus:outline-none transition-all disabled:opacity-50" 
        />
      </div>

      <div className="flex flex-col text-left">
        <label htmlFor="email" className="text-sm font-bold text-gray-800 mb-2">Correo electrónico</label>
        <input 
          id="email" 
          type="email" 
          placeholder="hola@ejemplo.com" 
          required 
          disabled={isSubmitting}
          className="border-2 border-gray-200 bg-gray-50 py-3 px-4 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 focus:outline-none transition-all disabled:opacity-50" 
        />
      </div>

      <div className="flex flex-col text-left">
        <label htmlFor="mensaje" className="text-sm font-bold text-gray-800 mb-2">¿En qué podemos ayudarte?</label>
        <textarea 
          id="mensaje" 
          placeholder="Escribe aquí tu duda, sugerencia o comentario..." 
          required 
          disabled={isSubmitting}
          className="border-2 border-gray-200 bg-gray-50 p-4 rounded-xl resize-y focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 focus:outline-none transition-all disabled:opacity-50 min-h-[120px]" 
        />
      </div>

      <button 
        type="submit" 
        disabled={isSubmitting}
        className="mt-2 text-lg bg-indigo-600 text-white font-bold py-4 px-6 rounded-xl shadow-[0_8px_30px_rgb(79,70,229,0.3)] hover:bg-indigo-700 hover:shadow-[0_8px_30px_rgb(79,70,229,0.5)] transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        aria-live="polite"
      >
        {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
      </button>

      {/* Mensaje de Alta accesibilidad (role="alert") */}
      {msg && (
        <div role="alert" className="mt-4 p-4 bg-green-50 border border-green-200 text-green-700 font-medium text-center rounded-lg flex items-center justify-center gap-2">
          <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
          {msg}
        </div>
      )}
    </form>
  );
} 