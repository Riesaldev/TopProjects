import Logo from "@/components/common/Logo";

export default function LDashboardSidebar() {
  return (
    <aside className="flex w-64 flex-col justify-between border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-[#121118] p-4 md:flex">
      <div className="flex flex-col items-start gap-6">
        {/* Branding */}
        <div className="h-10 w-full flex items-center justify-start">
          <Logo />
        </div>
        {/* Navigation */}
        <nav className="flex flex-col gap-2">
          <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary text-white group transition-all duration-200 shadow-md shadow-primary/20" href="#">
            <span className="material-symbols-outlined filled">home</span>
            <span className="text-sm font-semibold">Home</span>
          </a>
          <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-surface-hover hover:text-slate-900 dark:hover:text-white transition-colors duration-200" href="#">
            <span className="material-symbols-outlined">group</span>
            <span className="text-sm font-medium">Characters</span>
          </a>
          <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-surface-hover hover:text-slate-900 dark:hover:text-white transition-colors duration-200" href="#">
            <span className="material-symbols-outlined">menu_book</span>
            <span className="text-sm font-medium">Library</span>
          </a>

          <div className="my-2 border-t border-slate-200 dark:border-slate-800"></div>
          <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-surface-hover hover:text-slate-900 dark:hover:text-white transition-colors duration-200" href="#">
            <span className="material-symbols-outlined">settings</span>
            <span className="text-sm font-medium">Settings</span>
          </a>
        </nav>
      </div>
      {/* User Profile */}
      <div className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-slate-100 dark:hover:bg-surface-hover cursor-pointer transition-colors">
        <div className="relative">
          <div className="h-10 w-10 rounded-full bg-slate-300 dark:bg-slate-700 bg-cover bg-center" data-alt="User avatar" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAV23wF4T8bhEmP3o2vT67y4IQwzzD-k-f3IBkCrdruqPbPJDOycnHNos5OaSDx_V3idJzkTw0iFxUUz9qOGkym8jpYbM3q6jhggWE0_0wX_vkCDcUEc7T-N7kLetdXWVA9iRxJVS2Ev4J073mPiPKlsBYB7I4ZXuXczNUhoYK4GyRjllsTrAvJLlsWFQVcadl1yM1pIHrZkqTOCH_4b__whbG9P6zsZuNvkT68Q2ZAXgi9wEefpfIZ-HxOR5oJqOodgPzD0AMY90k')" }}></div>
          <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white dark:border-[#121118]"></div>
        </div>
        <div className="flex flex-col overflow-hidden">
          <p className="text-sm font-bold text-slate-900 dark:text-white truncate">DungeonMaster99</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 truncate">Pro Account</p>
        </div>
      </div>
    </aside>
  );
}