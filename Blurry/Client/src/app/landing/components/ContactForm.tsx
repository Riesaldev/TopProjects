import React, { useState } from "react";

export default function ContactForm() {
  const [msg, setMsg] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMsg("¡Mensaje enviado correctamente! Te responderemos pronto.");
    setTimeout(() => setMsg(""), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 max-w-lg mx-auto my-8 bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
      <div className="flex flex-col text-left">
        <label htmlFor="nombre" className="text-sm font-semibold text-gray-700 mb-1">Nombre</label>
        <input id="nombre" type="text" placeholder="Tu nombre" required className="border-2 border-gray-200 pb-2 pt-3 px-4 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors" />
      </div>

      <div className="flex flex-col text-left">
        <label htmlFor="email" className="text-sm font-semibold text-gray-700 mb-1">Correo electrónico</label>
        <input id="email" type="email" placeholder="tucorreo@ejemplo.com" required className="border-2 border-gray-200 pb-2 pt-3 px-4 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors" />
      </div>

      <div className="flex flex-col text-left">
        <label htmlFor="mensaje" className="text-sm font-semibold text-gray-700 mb-1">¿En qué podemos ayudarte?</label>
        <textarea id="mensaje" placeholder="Escribe tu mensaje aquí..." required className="border-2 border-gray-200 p-4 rounded-lg resize-y focus:border-indigo-500 focus:outline-none transition-colors" rows={5} />
      </div>

      <button type="submit" className="mt-4 bg-indigo-600 text-white font-bold py-3 px-6 rounded-xl shadow-md hover:bg-indigo-700 hover:shadow-lg transition-all active:scale-95">
        Enviar Mensaje
      </button>

      {msg && <p className="text-green-600 font-medium text-center mt-2">{msg}</p>}
    </form>
  );
} 