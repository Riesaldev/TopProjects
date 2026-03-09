/**
 * Punto de entrada del cliente React.
 * Qué: hidrata el árbol React dentro del div#root y compone proveedores globales.
 * Cómo: envuelve App con StrictMode (detección de efectos no seguros), BrowserRouter (routing) y UserProvider (estado auth).
 * Por qué: centraliza bootstrap y facilita añadir más providers (tema, i18n) sin tocar App.
 */
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './context/UserContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <App />
      </UserProvider>
    </BrowserRouter>
  </StrictMode>
);
