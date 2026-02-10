import { NavLink } from "react-router-dom";

export default function AuthTabs() {
  return (
    <nav className="flex text-sm font-medium text-text-primary justify-around">
      <NavLink
        to="/login"
        className={({ isActive }) => `
          h-auto w-full pb-2 flex justify-center border-b transition-all
          ${isActive
            ? 'border-b-4 border-text-primary'
            : 'border-text-primary/60 hover:border-b-4 hover:border-text-primary'
          }
        `}
      >
        <span className="text-xl font-semibold">Login</span>
      </NavLink>

      <NavLink
        to="/register"
        className={({ isActive }) => `
          h-auto w-full pb-2 flex justify-center border-b transition-all
          ${isActive
            ? 'border-b-4 border-text-primary'
            : 'border-text-primary/60 hover:border-b-4 hover:border-text-primary'
          }
        `}
      >
        <span className="text-xl font-semibold">Register</span>
      </NavLink>
    </nav>
  );
}