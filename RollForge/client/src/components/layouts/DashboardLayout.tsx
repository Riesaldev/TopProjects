import { Outlet } from "react-router-dom";

import LDashboardSidebar from "../features/dashboard/LDashboardSidebar";
import RDashboardSidebar from "../features/dashboard/RDashboardSidebar";
import HeaderMovil from "../common/HeaderMovil";

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen w-full flex-col overflow-hidden bg-background-primary">
      <HeaderMovil />
      <main className="relative flex h-full w-full flex-1 overflow-hidden">
        {/* Top Header (Mobile specific menu trigger could go here) */}
        <div className="hidden xl:flex w-80 flex-col border-l border-slate-800 bg-[#121118] p-6 overflow-y-auto">
          {/* Left Sidebar (Navigation) */}
          <LDashboardSidebar />
        </div>
        {/* Main Content Area */}
        <Outlet />
        <div className="hidden xl:flex w-102 flex-col border-l border-slate-800 bg-[#121118] p-6 overflow-y-auto">
          {/* Right Sidebar (Session Widget) */}
          <RDashboardSidebar />
        </div>
      </main>
    </div>
  );
}