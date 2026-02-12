import { Outlet } from 'react-router-dom';
import ProfileHeader from '../features/profile/ProfileHeader';

export default function ProfileLayout() {
  return (
    <div className="flex min-h-screen w-full flex-col overflow-hidden bg-background-primary">
      <ProfileHeader />
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}