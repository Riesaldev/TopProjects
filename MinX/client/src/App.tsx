/**
 * Root component de la aplicación SPA.
 * Qué: define layout general (Header/Footer) y todas las rutas.
 * Cómo: utiliza react-router-dom v6 con <Routes>/<Route> y react-hot-toast para notificaciones globales.
 * Por qué: centraliza navegación y evita duplicar estructura común en cada página.
 */
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/HomePage.tsx';
import Login from './pages/LoginPage.tsx';
import Register from './pages/RegisterPage.tsx';
import ForgotPassword from './pages/ForgotPasswordPage.tsx';
import Messages from './pages/MessagesPage.tsx';
import Profile from './pages/ProfilePage.tsx';
import About from './pages/AboutPage.tsx';
import Features from './pages/FeaturesPage.tsx';
import Works from './pages/WorksPage.tsx';
import Career from './pages/CareerePage.tsx';
import Support from './pages/SupportPage.tsx';
import Delivery from './pages/DeliveryPage.tsx';
import Terms from './pages/TermsPage.tsx';
import Privacy from './pages/PrivacyPage.tsx';
import Blog from './pages/BlogPage.tsx';
import Documentation from './pages/DocumentationPage.tsx';
import ApiReference from './pages/ApiReferencePage.tsx';
import Community from './pages/CommunityPage.tsx';
import ErrorPage from './pages/errorPage.tsx';

/**
 * App
 * Qué: componente principal que monta cabecera, sistema de toasts y definición de rutas.
 * Cómo: retorna fragment con estructura persistente y mapea paths a páginas.
 * Por qué: punto único para ampliar futuras rutas (ej. protección condicional) y wrappers.
 */
function App() {
  return (
    <>
      <Header />
      <Toaster position='top-right' />
      <Routes>
        <Route path='*' element={<ErrorPage />} />
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/messages' element={<Messages />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/about' element={<About />} />
        <Route path='/features' element={<Features />} />
        <Route path='/works' element={<Works />} />
        <Route path='/career' element={<Career />} />
        <Route path='/support' element={<Support />} />
        <Route path='/delivery' element={<Delivery />} />
        <Route path='/terms' element={<Terms />} />
        <Route path='/privacy' element={<Privacy />} />
        <Route path='/blog' element={<Blog />} />
        <Route path='/documentation' element={<Documentation />} />
        <Route path='/api-reference' element={<ApiReference />} />
        <Route path='/community' element={<Community />} />

      </Routes>
      <Footer />
    </>
  )
}

export default App;
