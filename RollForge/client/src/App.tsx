import { Routes, Route } from 'react-router-dom';
import Home from '@/pages/HomePage.tsx';
import Login from '@/pages/LoginPage.tsx';
import Board from '@/pages/BoardPage.tsx';
import Register from '@/pages/RegisterPage.tsx';
import Header from '@/components/Header.tsx';
import Footer from '@/components/Footer.tsx';
import ErrorPage from '@/pages/ErrorPage.tsx';
import ForgotPass from '@/pages/ForgotPass';
import Profile from '@/pages/ProfiePage';
import { Toaster } from 'react-hot-toast';
// Eliminamos PlayersProvider local para evitar provider anidado duplicado.
// El provider global ya envuelve a <App /> en main.tsx.


function App() {
  return (
    <>
      <Header />
      <Toaster
        position='top-center'
        toastOptions={{
          style: { zIndex: 9999 },
          duration: 3000,
          className: 'text-sm',
        }}
        containerStyle={{ zIndex: 9999 }}
      />
      <Routes>
        <Route path='*' element={<ErrorPage />} />
        <Route path='/' element={<Home />} />
        <Route path='/board' element={<Board />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPass />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App;