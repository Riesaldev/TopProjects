"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useNotifications } from "./NotificationsContext";

function useDarkMode() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    if (dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [dark]);
  return [dark, setDark] as const;
}

function useFontSize() {
  const [size, setSize] = useState("base");
  useEffect(() => {
    document.documentElement.classList.remove(
      "text-base",
      "text-lg",
      "text-xl",
    );
    document.documentElement.classList.add(`text-${size}`);
  }, [size]);
  return [size, setSize] as const;
}

function useLanguage() {
  const [lang, setLang] = useState("es");
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  return [lang, setLang] as const;
}

function useContrast() {
  const [contrast, setContrast] = useState(
    () => localStorage.getItem("contrast") || "normal",
  );
  useEffect(() => {
    document.documentElement.classList.remove(
      "contrast-high",
      "contrast-normal",
    );
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
    <nav
      className="w-full glass-panel sticky top-0 z-50 flex items-center justify-between px-6 py-4"
      role="navigation"
      aria-label="Barra de navegación principal"
    >
      <Link
        href="/landing"
        aria-label="Ir a inicio"
        className="flex items-center gap-2 hover:scale-105 transition-transform"
      >
        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary-500 to-secondary-500 flex items-center justify-center shadow-lg shadow-primary-500/30">
          <span className="text-white font-black text-xl leading-none">B</span>
        </div>
        <span className="font-extrabold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-600 dark:from-primary-400 dark:to-secondary-400">
          Blurry
        </span>
      </Link>
      <div className="flex gap-4 items-center">
        <Link
          href="/landing"
          className="font-semibold text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors focus:outline-primary-400"
          tabIndex={0}
        >
          Inicio
        </Link>
        <Link
          href="/auth/login"
          className="font-semibold text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors focus:outline-primary-400"
          tabIndex={0}
        >
          Iniciar sesión
        </Link>
        <Link
          href="/auth/register"
          className="font-semibold bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300 px-4 py-1.5 rounded-full hover:bg-primary-200 dark:hover:bg-primary-800/50 transition-colors focus:outline-primary-400"
          tabIndex={0}
        >
          Registrarse
        </Link>
        <Link
          href="/user/notifications"
          className="relative hover-lift p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          title="Notificaciones"
          aria-label="Notificaciones"
          onClick={markAllRead}
          tabIndex={0}
        >
          <span className="text-xl" aria-hidden="true">
            🔔
          </span>
          {unread > 0 && (
            <span
              className="absolute top-0 right-0 bg-red-500 text-white text-[10px] rounded-full px-1.5 py-0.5 font-bold animate-pulse shadow-lg"
              aria-label={`${unread} notificaciones sin leer`}
            >
              {unread}
            </span>
          )}
        </Link>
        <div className="flex items-center gap-2 border-l border-gray-200 dark:border-gray-700 pl-4 ml-2">
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            className="px-2 py-1.5 rounded-md bg-transparent border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-xs font-semibold focus:outline-primary-400 focus:ring-2 focus:ring-primary-500/20"
            title="Idioma"
            aria-label="Seleccionar idioma"
          >
            <option value="es">🇪🇸 ES</option>
            <option value="en">🇬🇧 EN</option>
          </select>
          <select
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="px-2 py-1.5 rounded-md bg-transparent border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-xs font-semibold focus:outline-primary-400 focus:ring-2 focus:ring-primary-500/20"
            title="Tamaño de fuente"
            aria-label="Seleccionar tamaño de fuente"
          >
            <option value="base">A</option>
            <option value="lg">A+</option>
            <option value="xl">A++</option>
          </select>
          <select
            value={contrast}
            onChange={(e) => setContrast(e.target.value)}
            className="px-2 py-1.5 rounded-md bg-transparent border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-xs font-semibold focus:outline-primary-400 focus:ring-2 focus:ring-primary-500/20"
            title="Contraste"
            aria-label="Seleccionar contraste"
          >
            <option value="normal">◑</option>
            <option value="high">◐</option>
          </select>
        </div>
        <button
          className="ml-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-primary-400"
          onClick={() => setDark((d) => !d)}
          title="Alternar modo oscuro"
          aria-label="Alternar modo oscuro"
        >
          {dark ? "🌙" : "☀️"}
        </button>
        <Link
          href="/user/settings"
          className="p-2 rounded-full text-gray-400 hover:text-primary-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all focus:outline-primary-400 hover:rotate-90"
          title="Configuración"
          aria-label="Configuración"
        >
          <span className="text-xl" aria-hidden="true">
            ⚙️
          </span>
        </Link>
      </div>
    </nav>
  );
}
