import { Outlet } from 'react-router-dom';
import { BRAND_CONFIG } from '../../data/authConstants';
import Logo from '../common/Logo';

export default function AuthLayout() {
  return (
    <main className="flex min-h-screen w-full flex-row ">
      {/* Left Side: Atmospheric Artwork - Hidden on mobile, visible on lg+ */}
      <div
        className="hidden lg:flex min-h-screen w-5/12 xl:w-1/2 relative flex-col justify-between bg-cover bg-center bg-no-repeat overflow-hidden  bg-[url('/auth-bg.png')]"
      >
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />

        <Logo />

        {/* Bottom Quote */}
        <div className="relative z-10 p-12 flex items-center gap-6">
          <blockquote className="border-l-4 border-primary pl-6 py-2">
            <p className="text-2xl font-medium leading-relaxed text-text-primary mb-4">
              "{BRAND_CONFIG.AUTH_QUOTE.text}"
            </p>
          </blockquote>
        </div>
      </div>

      {/* Right Side: Auth Forms */}
      <div className="flex-1 flex flex-col lg:p-8 relative bg-background-primary">
        {/* Mobile Logo - Visible only on small screens */}
        <Logo />

        {/* Auth Container - Here render Login/Register/Reset forms */}
        <div className="w-full max-w-180 flex flex-col gap-6 max-h-[90vh] overflow-y-auto mx-auto my-auto">
          <Outlet />
        </div>
      </div>
    </main>
  );
}