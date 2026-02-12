import { Outlet } from "react-router-dom";


export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen w-full flex-col overflow-hidden bg-background-primary">
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}