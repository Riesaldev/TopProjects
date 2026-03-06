"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, LogOut } from "lucide-react";
import { useAuth } from "@/components/AuthContext";

const USER_LABELS: Record<string, string> = {
  dashboard: "Dashboard",
  agenda: "Agenda",
  chat: "Chat",
  games: "Juegos",
  notes: "Notas",
  settings: "Ajustes",
  "video-call": "Videollamada",
  reports: "Reportes",
  notifications: "Notificaciones",
  profile: "Perfil",
  history: "Historial",
  store: "Tienda",
};

function toLabel(segment: string) {
  return USER_LABELS[segment] ?? segment.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}

function buildUserCrumbs(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);
  const crumbs: Array<{ label: string; href?: string }> = [{ label: "Usuario", href: "/user/dashboard" }];

  if (segments[0] !== "user") {
    return crumbs;
  }

  if (segments.length >= 2) {
    const section = segments[1];
    const sectionHref = `/user/${section}`;
    const isSingleSectionPage = segments.length === 2;

    crumbs.push({
      label: toLabel(section),
      href: isSingleSectionPage ? undefined : sectionHref,
    });
  }

  for (let index = 2; index < segments.length; index += 1) {
    const segment = segments[index];
    const href = `/${segments.slice(0, index + 1).join("/")}`;
    const isLast = index === segments.length - 1;
    crumbs.push({ label: toLabel(segment), href: isLast ? undefined : href });
  }

  return crumbs;
}

export default function UserSectionNav() {
  const pathname = usePathname();
  const { logout } = useAuth();
  const crumbs = buildUserCrumbs(pathname);
  const pageTitle = crumbs[crumbs.length - 1]?.label ?? "Usuario";

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800/70 bg-zinc-950/85 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-3 py-3 sm:px-4">
        <div className="min-w-0">
          <nav aria-label="Breadcrumb de usuario" className="mb-1 overflow-x-auto">
            <ol className="flex min-w-max items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-500">
              {crumbs.map((crumb, index) => {
                const isLast = index === crumbs.length - 1;
                return (
                  <li key={`${crumb.label}-${index}`} className="inline-flex items-center gap-1.5">
                    {crumb.href && !isLast ? (
                      <Link href={crumb.href} className="transition-colors hover:text-zinc-200">
                        {crumb.label}
                      </Link>
                    ) : (
                      <span className={isLast ? "text-zinc-300" : undefined}>{crumb.label}</span>
                    )}
                    {!isLast && <ChevronRight className="h-3.5 w-3.5 text-zinc-600" aria-hidden="true" />}
                  </li>
                );
              })}
            </ol>
          </nav>

          <h1 className="truncate text-base font-black uppercase tracking-wide text-zinc-100 sm:text-lg">
            {pageTitle}
          </h1>
        </div>

        <div className="shrink-0">
          <button
            type="button"
            onClick={logout}
            className="inline-flex items-center gap-1.5 rounded-xl bg-primary-600 px-3 py-2 text-xs font-black uppercase tracking-wider text-white hover:bg-primary-500 focus-visible:ring-2 focus-visible:ring-primary-300"
            aria-label="Cerrar sesion"
          >
            <LogOut className="h-3.5 w-3.5" />
            Salir
          </button>
        </div>
      </div>
    </header>
  );
}
