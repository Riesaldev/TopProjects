import { Outlet } from 'react-router-dom';
import { Dice3 } from 'lucide-react';

export default function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full flex-row ">
      {/* Left Side: Atmospheric Artwork - Hidden on mobile, visible on lg+ */}
      <div
        className="hidden lg:flex min-h-screen w-5/12 xl:w-1/2 relative flex-col justify-between bg-cover bg-center bg-no-repeat overflow-hidden  bg-[url('/auth-bg.png')]"
      >
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />

        {/* Top Brand */}
        <div className="relative z-10 p-12 flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded bg-primary/80">
              <Dice3 className="w-8 h-8 text-white" />
            </div>
            <a rel="login" href="/login" className="text-2xl font-bold tracking-tight text-text-primary cursor-pointer">
              RollForge
            </a>
          </div>
        </div>

        {/* Bottom Quote */}
        <div className="relative z-10 p-12 flex items-center gap-6">
          <blockquote className="border-l-4 border-primary pl-6 py-2">
            <p className="text-2xl font-medium leading-relaxed text-text-primary mb-4">
              "The dice tell the story, but the forge is where legends are built.<br /> Join thousands
              of game masters crafting worlds today."
            </p>
          </blockquote>
        </div>
      </div>

      {/* Right Side: Auth Forms */}
      <div className="flex-1 flex flex-col p-4 sm:p-8 relative bg-background-primary">
        {/* Mobile Logo - Visible only on small screens */}
        <div className="lg:hidden absolute top-8 left-8 flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded bg-primary/80">
            <Dice3 className="w-8 h-8 text-white" />
          </div>
          <a rel="login" href="/login" className="text-2xl font-bold tracking-tight text-text-primary cursor-pointer">
            RollForge
          </a>
        </div>

        {/* Auth Container - Here render Login/Register/Reset forms */}
        <div className="w-full max-w-180 flex flex-col gap-6 max-h-[90vh] overflow-y-auto mx-auto my-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}