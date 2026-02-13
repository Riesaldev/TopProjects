import Logo from "@/components/common/Logo";

export default function HeaderMovil() {
  return (
    <header className="flex xl:hidden h-16 items-center justify-between pr-6 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#121118]">
      <Logo redirectTo="/campaigns" />
      <button className="text-slate-500 h-10 w-10 rounded-md hover:bg-slate-100 dark:hover:bg-surface-hover flex items-center justify-center transition-colors cursor-pointer">
        <span className="material-symbols-outlined">menu</span>
      </button>
    </header>
  );
}