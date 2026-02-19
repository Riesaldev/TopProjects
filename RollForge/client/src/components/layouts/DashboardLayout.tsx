import { Outlet } from "react-router-dom";

import LDashboardSidebar from "../features/dashboard/LDashboardSidebar";
import RDashboardSidebar from "../features/dashboard/RDashboardSidebar";
import HeaderMovil from "../common/HeaderMovil";

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen w-full flex-col overflow-hidden bg-background-primary">
      <HeaderMovil />
      <main className="relative flex flex-1 w-full overflow-hidden">
        {/* Left Sidebar (Navigation) */}
        <div className="hidden xl:flex w-80 shrink-0 flex-col border-r border-slate-800 bg-[#121118] p-6 overflow-y-auto">
          <LDashboardSidebar />
        </div>
        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
        {/* Right Sidebar (Session Widget) */}
        <div className="hidden xl:flex w-96 shrink-0 flex-col border-l border-slate-800 bg-[#121118] p-6 overflow-y-auto">
          <RDashboardSidebar />
        </div>
      </main>
    </div>
  );
}