"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useNotifications } from "./NotificationsContext";

function useDarkMode() {
  const [dark, setDark] =useState(false);
  useEffect(() => {
    if (dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [dark]);
  return [dark, setDark] as const;
}

function useFontSize() {
  const [size, setSize] =useState("base");
  useEffect(() => {
    document.documentElement.classList.remove("text-base", "text-lg", "text-xl");
    document.documentElement.classList.add(`text-${size}`);
  }, [size]);
  return [size, setSize] as const;
}

function useLanguage() {
  const [lang, setLang] =useState("es");
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  return [lang, setLang] as const;
}

function useContrast() {
  const [contrast, setContrast] =useState(() => localStorage.getItem("contrast") || "normal");
  useEffect(() => {
    document.documentElement.classList.remove("contrast-high", "contrast-normal");
    document.documentElement.classList.add(`contrast-${contrast}`);
    localStorage.setItem("contrast", contrast);
  }, [contrast]);
  return [contrast, setContrast] as const;
}

export default function Navbar() {
  const [dark, setDark] = useDarkMode();
  const [size, setSize] = useFontSize();
  const [lang, setLang] = useLanguage();
  const [contrast, setContrast] = useContrast();
  const { unread, markAllRead } = useNotifications();
  return (
    <nav className="w-full bg-white dark:bg-secondary-900 shadow flex items-center justify-between px-6 py-3" role="navigation" aria-label="Barra de navegación principal">
      <Link href="/landing" aria-label="Ir a inicio">
        <span className="font-bold text-xl text-primary-600 dark:text-primary-300">Blurry</span>
      </Link>
      <div className="flex gap-4 items-center">
        <Link href="/landing" className="hover:text-primary-600 dark:hover:text-primary-300 focus:outline-primary-400" tabIndex={0}>Inicio</Link>
        <Link href="/auth/login" className="hover:text-primary-600 dark:hover:text-primary-300 focus:outline-primary-400" tabIndex={0}>Iniciar sesión</Link>
        <Link href="/auth/register" className="hover:text-primary-600 dark:hover:text-primary-300 focus:outline-primary-400" tabIndex={0}>Registrarse</Link>
        <Link href="/user/notifications" className="relative" title="Notificaciones" aria-label="Notificaciones" onClick={markAllRead} tabIndex={0}>
          <span className="text-2xl" aria-hidden="true">🔔</span>
          {unread > 0 && <span className="absolute -top-1 -right-2 bg-accent-600 text-white text-xs rounded-full px-1.5 font-bold" aria-label={`${unread} notificaciones sin leer`}>{unread}</span>}
        </Link>
        <select
          value={lang}
          onChange={e => setLang(e.target.value)}
          className="ml-2 px-2 py-1 rounded bg-secondary-100 dark:bg-secondary-700 text-secondary-800 dark:text-secondary-100 text-xs font-semibold focus:outline-primary-400"
          title="Idioma"
          aria-label="Seleccionar idioma"
        >
          <option value="es">ES</option>
          <option value="en">EN</option>
        </select>
        <select
          value={size}
          onChange={e => setSize(e.target.value)}
          className="ml-2 px-2 py-1 rounded bg-secondary-100 dark:bg-secondary-700 text-secondary-800 dark:text-secondary-100 text-xs font-semibold focus:outline-primary-400"
          title="Tamaño de fuente"
          aria-label="Seleccionar tamaño de fuente"
        >
          <option value="base">A</option>
          <option value="lg">A+</option>
          <option value="xl">A++</option>
        </select>
        <select
          value={contrast}
          onChange={e => setContrast(e.target.value)}
          className="ml-2 px-2 py-1 rounded bg-secondary-100 dark:bg-secondary-700 text-secondary-800 dark:text-secondary-100 text-xs font-semibold focus:outline-primary-400"
          title="Contraste"
          aria-label="Seleccionar contraste"
        >
          <option value="normal">Contraste normal</option>
          <option value="high">Contraste alto</option>
        </select>
        <button
          className="ml-4 px-3 py-1 rounded bg-secondary-100 dark:bg-secondary-700 text-secondary-800 dark:text-secondary-100 text-xs font-semibold hover:bg-secondary-200 dark:hover:bg-secondary-600 transition focus:outline-primary-400"
          onClick={() => setDark(d => !d)}
          title="Alternar modo oscuro"
          aria-label="Alternar modo oscuro"
        >
          {dark ? "🌙 Oscuro" : "☀️ Claro"}
        </button>
        <Link href="/user/settings" className="ml-2 text-secondary-500 hover:text-primary-600 dark:hover:text-primary-300 focus:outline-primary-400" title="Configuración" aria-label="Configuración">
          <span className="text-lg" aria-hidden="true">⚙️</span>
        </Link>
      </div>
    </nav>
  );
}