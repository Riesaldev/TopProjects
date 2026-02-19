import Logo from "@/components/common/Logo";
import { NavLink } from "react-router-dom";

const NAV_ITEMS = [
  { to: "/campaigns", icon: "campaign", label: "Campaigns" },
  { to: "/characters", icon: "group", label: "Characters" },
  { to: "/compendium", icon: "menu_book", label: "Compendium" },
] as const;

export default function LDashboardSidebar() {
  const getLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 ${
      isActive
        ? "bg-primary/60 text-text-primary"
        : "text-text-muted hover:bg-surface-hover hover:text-text-primary"
    }`;

  return (
    <aside className="flex w-48 flex-col justify-between bg-[#121118] md:flex">
      <div className="flex flex-col items-start gap-6">
        {/* Branding */}
        <div className="h-10 w-full flex items-center justify-start">
          <Logo redirectTo="/campaigns" />
        </div>

        {/* Navigation */}
        <nav className="flex flex-col mt-4 gap-2 w-full">
          {NAV_ITEMS.map(({ to, icon, label }) => (
            <NavLink key={to} to={to} className={getLinkClasses}>
              <span className="material-symbols-outlined text-xl">{icon}</span>
              <span>{label}</span>
            </NavLink>
          ))}

          <div className="my-2 border-t border-slate-800" />

          <NavLink to="/profile" className={getLinkClasses}>
            <span className="material-symbols-outlined text-xl">settings</span>
            <span>Settings</span>
          </NavLink>
        </nav>
      </div>
    </aside>
  );
}