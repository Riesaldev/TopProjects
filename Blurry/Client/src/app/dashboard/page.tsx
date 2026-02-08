"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../components/AuthContext';

export default function DashboardRedirect() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [hasRedirected, setHasRedirected] = useState(false);
  const [checkCount, setCheckCount] = useState(0);

  useEffect(() => {
    console.log('[Dashboard] Estado actual:', { user, isLoading, hasRedirected, checkCount });
    
    // Evitar múltiples redirecciones
    if (hasRedirected) return;
    
    // Incrementar contador de verificaciones
    setCheckCount(prev => prev + 1);
    
    if (!isLoading) {
      if (user) {
        console.log('[Dashboard] Usuario encontrado:', user);
        console.log('[Dashboard] Rol del usuario:', user.role);
        
        // Redirigir según el rol del usuario
        if (user.role === 'admin') {
          console.log('[Dashboard] Redirigiendo a admin dashboard');
          setHasRedirected(true);
          router.push('/admin/dashboard');
        } else {
          console.log('[Dashboard] Redirigiendo a user dashboard');
          setHasRedirected(true);
          router.push('/user/dashboard');
        }
        return;
      }
      
      // Si después de 20 verificaciones aún no hay usuario, redirigir al login
      if (checkCount > 20) {
        console.log('[Dashboard] No hay usuario después de múltiples verificaciones, redirigiendo a login');
        setHasRedirected(true);
        router.push('/auth/login');
        return;
      }
    } else {
      console.log('[Dashboard] Todavía cargando...');
    }
  }, [user, isLoading, router, hasRedirected, checkCount]);

  // Mostrar loading mientras se determina la redirección
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-900 via-primary-800 to-accent-900">
      <div className="flex flex-col items-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        <p className="text-white text-lg">
          {isLoading ? 'Verificando autenticación...' : 'Redirigiendo al dashboard...'}
        </p>
        <p className="text-white text-sm opacity-75">
          Usuario: {user ? user.email : 'No autenticado'} | 
          Rol: {user?.role || 'N/A'} | 
          Cargando: {isLoading ? 'Sí' : 'No'} |
          Verificaciones: {checkCount}
        </p>
      </div>
    </div>
  );
}
