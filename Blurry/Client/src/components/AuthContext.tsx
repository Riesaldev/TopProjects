"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: number;
  email: string;
  display_name: string;
  role?: string;
  age?: number;
  gender?: string;
  location?: string;
  bio?: string;
  interests?: string;
  imagen_perfil?: string;
  tokens?: number;
  values_profile?: any;
  is_suspended?: boolean;
  suspension_reason?: string;
  suspension_until?: Date;
  created_at?: Date;
  updated_at?: Date;
  // Alias para compatibilidad con frontend
  nombre?: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  readonly children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const isAuthenticated = !!user;

  // Debug: Monitorear cambios en el estado del usuario
  useEffect(() => {
    console.log('[AuthContext] Estado del usuario cambió:', { user, isLoading });
  }, [user, isLoading]);

  // Verificar si hay una sesión activa al cargar la aplicación
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('jwt-token');
        const storedUser = localStorage.getItem('userData');
        
        if (token && storedUser) {
          // Verificar que el token siga siendo válido
          const response = await fetch('/api/auth/verify', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          
          if (response.ok) {
            const userData = JSON.parse(storedUser);
            setUser(userData);
            console.log('[AuthContext] Usuario autenticado restaurado:', userData);
          } else {
            // Token inválido, limpiar storage
            localStorage.removeItem('auth-token');
            localStorage.removeItem('jwt-token');
            localStorage.removeItem('userData');
          }
        }
      } catch (error) {
        console.error('Error verificando autenticación:', error);
        localStorage.removeItem('auth-token');
        localStorage.removeItem('jwt-token');
        localStorage.removeItem('userData');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // Cambiar de URL directa a usar el proxy API de Next.js
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      // Resto del código existente
      if (!response.ok) {
        const errorData = await response.json();
        return { success: false, message: errorData.message || 'Error al iniciar sesión' };
      }

      const data = await response.json();
      console.log('[AuthContext] Datos recibidos del servidor:', data);
      console.log('[AuthContext] data.success:', data.success);
      console.log('[AuthContext] data.access_token:', data.access_token);
      console.log('[AuthContext] data.user:', data.user);
      
      if (data.success || data.access_token) {
        // Guardar token y estado de autenticación
        try {
          const token = btoa(JSON.stringify({ userId: data.user.id, email: data.user.email }));
          localStorage.setItem('auth-token', token);
          localStorage.setItem('jwt-token', data.access_token);
          localStorage.setItem('userData', JSON.stringify(data.user));
          console.log('[AuthContext] Estableciendo usuario:', data.user);
          console.log('[AuthContext] Tokens guardados en localStorage');
          
          setUser(data.user);
          console.log('[AuthContext] setUser llamado con:', data.user);
          
          return { success: true };
        } catch (tokenError) {
          console.error('[AuthContext] Error al guardar tokens:', tokenError);
          return { success: false, message: 'Error al procesar la respuesta del servidor' };
        }
      } else {
        console.log('[AuthContext] No se cumplió la condición data.success || data.access_token');
        return { success: false, message: 'Error en la estructura de respuesta' };
      }
    } catch (error) {
      console.error('Error en login:', error);
      return { 
        success: false, 
        message: error instanceof Error ? error.message : 'Error al conectar con el servidor'
      };
    } finally {
      // No modificar isLoading aquí ya que es para la verificación inicial
      // setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('auth-token');
    localStorage.removeItem('jwt-token');
    localStorage.removeItem('userData');
    setUser(null);
    router.push('/auth/login');
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('userData', JSON.stringify(updatedUser));
    }
  };

  const value: AuthContextType = useMemo(() => ({
    user,
    isLoading,
    isAuthenticated,
    login,
    logout,
    updateUser,
  }), [user, isLoading, isAuthenticated, login, logout, updateUser]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
}