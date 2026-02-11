import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthLayout from './components/layouts/AuthLayout';
import LoginForm from './components/features/auth/LoginForm';
import RegisterForm from './components/features/auth/RegisterForm';
import PasswordRecovery from './components/features/auth/PasswordRecovery';
import MainLayout from './components/layouts/MainLayout';
import UserProfile from './components/features/profile/UserProfile';

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

        {/* Rutas principales */}
        <Route element={<MainLayout />}>
          <Route path="/profile" element={<UserProfile />} />
          {/* Otras rutas principales */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}