"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowLeft, BarChart3, FileWarning, Gauge, Settings2, ShieldAlert, Users } from "lucide-react";

type AdminNavItem = {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
};

const ADMIN_NAV_ITEMS: AdminNavItem[] = [
  { href: "/admin/dashboard", label: "Dashboard", icon: Gauge },
  { href: "/admin/users", label: "Usuarios", icon: Users },
  { href: "/admin/reports", label: "Reportes", icon: FileWarning },
  { href: "/admin/sanctions", label: "Sanciones", icon: ShieldAlert },
  { href: "/admin/metrics", label: "Metricas", icon: BarChart3 },
  { href: "/admin/internal", label: "Interno", icon: Settings2 },
];

function getAdminTitle(pathname: string) {
  const found = ADMIN_NAV_ITEMS.find((item) => pathname.startsWith(item.href));
  return found?.label || "Admin";
}

export default function AdminSectionNav() {
  const pathname = usePathname();
  const router = useRouter();

  const goBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
      return;
    }

    router.push("/admin/dashboard");
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800/70 bg-zinc-950/85 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-3 py-3 sm:px-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={goBack}
              className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm font-semibold text-zinc-200 hover:border-primary-500/60 hover:text-white focus-visible:ring-2 focus-visible:ring-primary-400"
              aria-label="Volver a la pantalla anterior"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver
            </button>

            <h1 className="text-sm font-black uppercase tracking-wide text-zinc-200 sm:text-base">
              {getAdminTitle(pathname)}
            </h1>
          </div>

          <Link
            href="/admin/dashboard"
            className="rounded-xl bg-primary-600 px-3 py-2 text-xs font-black uppercase tracking-wider text-white hover:bg-primary-500 focus-visible:ring-2 focus-visible:ring-primary-300"
          >
            Inicio Admin
          </Link>
        </div>

        <nav aria-label="Navegacion de administrador" className="overflow-x-auto pb-1">
          <ul className="flex min-w-max items-center gap-2">
            {ADMIN_NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = pathname.startsWith(item.href);

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors ${
                      isActive
                        ? "border-primary-500/70 bg-primary-500/15 text-primary-300"
                        : "border-zinc-700 bg-zinc-900/60 text-zinc-400 hover:border-zinc-500 hover:text-zinc-200"
                    }`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
