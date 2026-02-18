import Logo from "@/components/common/Logo";
import { useLocation } from "react-router-dom";



export default function LDashboardSidebar() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const getlinkClasses = (path: string) => {
    return `flex items-center gap-3 px-3 py-2.5 rounded-lg text-text-muted hover:bg-surface-hover hover:text-text-primary transition-colors duration-200 ${isActive(path)
      ? "bg-primary/60 text-text-primary"
      : "text-text-muted hover:bg-surface-hover hover:text-text-primary"
      }`;
  };

  return (
    <aside className="flex w-48 flex-col justify-between bg-[#121118]  md:flex">
      <div className="flex flex-col items-start gap-6">
        {/* Branding */}
        <div className="h-10 w-full flex items-center justify-start">
          <Logo redirectTo="/campaigns" />
        </div>
        {/* Navigation */}
        <nav className="flex flex-col mt-4 gap-2">
          <a className={getlinkClasses("/campaigns")} href="/campaigns">
            <span className="material-symbols-outlined filled">campaign</span>
            <span className="text-sm font-semibold">Campaigns</span>
          </a>
          <a className={getlinkClasses("/characters")} href="/characters">
            <span className="material-symbols-outlined">group</span>
            <span className="text-sm font-medium">Characters</span>
          </a>
          <a className={getlinkClasses("/compendium")} href="/compendium">
            <span className="material-symbols-outlined">menu_book</span>
            <span className="text-sm font-medium">Compendium</span>
          </a>

          <div className="my-2 border-t border-slate-200 dark:border-slate-800"></div>
          <a className={getlinkClasses("/profile")} href="/profile">
            <span className="material-symbols-outlined">settings</span>
            <span className="text-sm font-medium">Settings</span>
          </a>
        </nav>
      </div>
    </aside>
  );
}