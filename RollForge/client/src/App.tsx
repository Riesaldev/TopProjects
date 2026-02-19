import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import ToastContainer from './components/common/ToastContainer';
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
import VttPage from './components/features/vtt/VttPage';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
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
              <Route path="/campaigns/:id/edit" element={<CampaignEdit />} />
              <Route path="/characters" element={<CharactersPage />} />
              <Route path="/compendium" element={<CompendiumPage />} />
            </Route>

            {/* Rutas de campaña específica */}
            <Route element={<CampaignLayout />}>
              <Route path="/campaigns/resources/:campaignId" element={<CampaignResources />} />
            </Route>

            {/* VTT — pantalla completa, sin layout de dashboard */}
            <Route path="/vtt/:campaignId" element={<VttPage />} />

            {/* Rutas de perfil */}
            <Route element={<ProfileLayout />}>
              <Route path="/profile" element={<UserProfile />} />
            </Route>

            {/* Catch-all: redirige a login */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <ToastContainer />
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}