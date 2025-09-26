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
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 via-gray-700 to-gray-900 text-secondary">
      <h1 className="text-4xl font-bold">Recuperar Contraseña</h1>
      <p className="mt-4 text-lg">Introduce tu correo electrónico para recuperar tu contraseña.</p>
      <form className="flex flex-col space-y-6 w-full">
        <label>
          Correo Electrónico:
          <input type="email" name="email" className="mt-1 block w-full p-2 border border-gray-300 rounded" placeholder="Introduce tu correo electrónico" autoFocus />
        </label>
        <button className="bg-secondary hover:bg-primary transition duration-300 ease-in-out text-white py-2 px-4 rounded-xl" type="submit">
          Enviar
        </button>
      </form>
    </div>
  );
};

export default ForgotPass;