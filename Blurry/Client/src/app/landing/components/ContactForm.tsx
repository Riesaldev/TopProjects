import React from "react";

export default function ContactForm() {
  return (
    <form className="flex flex-col gap-4 max-w-md mx-auto my-8">
      <input type="text" placeholder="Nombre" className="border p-2 rounded" />
      <input type="email" placeholder="Correo electrónico" className="border p-2 rounded" />
      <textarea placeholder="Mensaje" className="border p-2 rounded" rows={4} />
      <button type="submit" className="bg-primary-600 text-white py-2 rounded hover:bg-primary-700">Enviar</button>
    </form>
  );
} 