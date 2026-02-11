import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthLayout from './components/layouts/AuthLayout';
import LoginForm from './components/features/auth/LoginForm';
import RegisterForm from './components/features/auth/RegisterForm';
import PasswordRecovery from './components/features/auth/PasswordRecovery';

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

        {/* Otras rutas... */}
      </Routes>
    </BrowserRouter>
  );
}