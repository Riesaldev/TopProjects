import { Outlet } from 'react-router-dom';
import Header from '@/components/features/profile/ProfileHeader';

export default function ProfileLayout() {
  return (
    <div className="flex min-h-screen w-full flex-col overflow-hidden bg-background-primary">
      <Header />
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}