import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function RDashboardSidebar() {
  const { user } = useAuth();
  const isOnline = !!user;

  return (
    <>
      {/* Right Sidebar (Session Widget) */}

      <aside className="flex w-64 flex-col justify-between  bg-white dark:bg-[#121118] p-4 md:flex ">
        {/* User Profile */}
        <Link to="/profile" className="flex items-end justify-start gap-3 rounded-lg transition-colors mb-6 hover:bg-surface-hover p-2 -m-2 cursor-pointer group">
          <div className="relative">
            <div
              className="h-16 w-16 rounded-full bg-slate-700 bg-cover bg-center border-2 border-transparent group-hover:border-primary transition-colors"
              style={{ backgroundImage: user?.avatar ? `url(${user.avatar})` : undefined }}
            >
              {!user?.avatar && (
                <div className="w-full h-full rounded-full bg-primary/30 flex items-center justify-center text-xl font-bold text-white">
                  {user?.username?.slice(0, 1).toUpperCase() ?? '?'}
                </div>
              )}
            </div>
            <div className={`absolute bottom-0 right-0 h-5 w-5 rounded-full border-2 border-white dark:border-[#121118] ${isOnline ? "bg-green-500 animate-pulse" : "bg-gray-500"}`}></div>
          </div>
          <div className="flex flex-col overflow-hidden">
            <p className="text-xl font-bold text-white truncate">{user?.username ?? 'Usuario'}</p>
            <span className="text-xs text-text-muted group-hover:text-primary transition-colors">Ver perfil →</span>
          </div>
        </Link>
        <div className="mb-8">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center justify-between">
            Next Session
          </h3>
          {/* Active Session Card */}
          <div className="bg-linear-to-b from-primary/10 to-primary/5 rounded-xl p-4 border border-primary/20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="material-symbols-outlined text-6xl text-primary">schedule</span>
            </div>
            <div className="relative z-10">
              <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-primary text-white mb-2">STARTS SOON</span>
              <h4 className="text-lg font-bold text-white leading-tight mb-1">Curse of Strahd</h4>
              <p className="text-xs text-white mb-4">Tuesday Group • Session 12</p>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex flex-col items-center bg-surface-dark rounded p-1.5 min-w-12 border border-slate-700">
                  <span className="text-xs font-bold text-white">00</span>
                  <span className="text-[9px] text-slate-400 uppercase">Hr</span>
                </div>
                <span className="text-slate-300 font-bold">:</span>
                <div className="flex flex-col items-center bg-surface-dark rounded p-1.5 min-w-12 border border-slate-700">
                  <span className="text-xs font-bold text-white">45</span>
                  <span className="text-[9px] text-slate-400 uppercase">Min</span>
                </div>
              </div>
              <button className="w-full py-2 bg-primary hover:bg-primary-hover text-white rounded-lg text-sm font-bold shadow-md shadow-primary/20 transition-all flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-base">login</span>
                Join Lobby
              </button>
            </div>
          </div>
        </div>
        {/* Future Sessions List */}
        <div className="mb-8">
          <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">Upcoming</h3>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-surface-dark border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-colors cursor-pointer group">
              <div className="h-10 w-10 rounded-lg bg-slate-200 dark:bg-slate-700 flex flex-col items-center justify-center text-xs font-bold text-slate-500 dark:text-slate-400">
                <span>DEC</span>
                <span className="text-slate-900 dark:text-white text-sm">14</span>
              </div>
              <div className="flex-1">
                <h5 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">Lost Omens</h5>
                <p className="text-xs text-slate-500 dark:text-slate-400">Fri • 7:00 PM</p>
              </div>
              <button className="text-slate-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="material-symbols-outlined">more_vert</span>
              </button>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-surface-dark border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-colors cursor-pointer group">
              <div className="h-10 w-10 rounded-lg bg-slate-200 dark:bg-slate-700 flex flex-col items-center justify-center text-xs font-bold text-slate-500 dark:text-slate-400">
                <span>DEC</span>
                <span className="text-slate-900 dark:text-white text-sm">18</span>
              </div>
              <div className="flex-1">
                <h5 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">Neon Nights</h5>
                <p className="text-xs text-slate-500 dark:text-slate-400">Tue • 8:30 PM</p>
              </div>
              <button className="text-slate-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="material-symbols-outlined">more_vert</span>
              </button>
            </div>
          </div>
        </div>
        {/*Notifications / Invites */}
        <div>
          <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">Notifications</h3>
          <div className="bg-slate-50 dark:bg-surface-dark rounded-lg p-3 border border-slate-200 dark:border-slate-800">
            <div className="flex items-start gap-3 mb-3">
              <div className="h-8 w-8 rounded-full bg-cover bg-center shrink-0" data-alt="Friend avatar" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA48Ls42vbEDi3x3F5K8hCqMx9E3zQsADC9jGbKughctLyRbPCQOnMaWKDoBdLq29_Xd3fewufJjb1BmB4Vmd1MoY1lGqMNBFdXbSwt8HcTGU4pR-uwRpVmQmARlRbH0vvk1IZukKFFhpnFRyduPnPc1IJeAMAY1_BO3yLDrZrguCS3IT1Ns_VhILoQ8O1RZHNWT_Rtc4LzZr6khwAjNH2Z81cjQnuxIMJZ2FETHnxAMhwuCHy9YuBinub1EgTKWGZWTmlztQmoo3Q')" }}></div>
              <div>
                <p className="text-xs text-slate-900 dark:text-white leading-relaxed"><span className="font-bold">SarahJ</span> invited you to <span className="font-bold text-primary">Call of Cthulhu One-Shot</span>.</p>
                <p className="text-[10px] text-slate-500 mt-1">2 hours ago</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 py-1.5 bg-primary text-white text-xs font-bold rounded hover:bg-primary-hover transition-colors">Accept</button>
              <button className="flex-1 py-1.5 bg-transparent border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 text-xs font-bold rounded hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">Decline</button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
