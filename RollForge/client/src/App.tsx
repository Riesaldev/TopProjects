import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthLayout from './components/layouts/AuthLayout';
import LoginForm from './components/features/auth/LoginForm';
import RegisterForm from './components/features/auth/RegisterForm';
import PasswordRecovery from './components/features/auth/PasswordRecovery';
import ProfileLayout from './components/layouts/ProfileLayout';
import UserProfile from './components/features/profile/UserProfile';
import DashboardLayout from './components/layouts/DashboardLayout';
import CampaignsPage from './components/features/dashboard/campaigns/CampaignsPage';
import CharactersPage from './components/features/dashboard/characters/CharactersPage';
import CompendiumPage from './components/features/dashboard/compendium/CompendiumPage';
import CampaignEdit from './components/features/dashboard/campaigns/CampaignEdit';
import { CampaignResources } from './components/features/dashboard/campaigns/CampaignResources';
import CampaignLayout from './components/layouts/CampaignLayout';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas de autenticación */}
        <Route element={<AuthLayout />}>
          <Route path="/" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/reset" element={<PasswordRecovery />} />
        </Route>

        {/* Dashboard principal */}
        <Route element={<DashboardLayout />}>
          <Route path="/campaigns" element={<CampaignsPage />} />
          <Route path="/campaigns/new" element={<CampaignEdit />} />
          <Route path="/characters" element={<CharactersPage />} />
          <Route path="/compendium" element={<CompendiumPage />} />
        </Route>

        {/* Rutas de campaña específica */}
        <Route element={<CampaignLayout />}>
          <Route path="/campaigns/resources/:campaignId" element={<CampaignResources />} />
        </Route>

        {/* Rutas de perfil */}
        <Route element={<ProfileLayout />}>
          <Route path="/profile" element={<UserProfile />} />
        </Route>

        {/* Catch-all: redirige a login */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}