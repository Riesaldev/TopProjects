import { createContext, useState, useContext, useEffect, ReactNode, useMemo } from 'react';
import { apiService } from '../services/api';

interface User {
  id: string | number;
  email: string;
  name?: string;
  // Add other user properties as needed
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  register: (userData: any) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Verificar autenticación al cargar
  useEffect(() => {
    const token = localStorage.getItem('jwt-token');
    const storedUser = localStorage.getItem('user');
    
    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('jwt-token');
        localStorage.removeItem('user');
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await apiService.login(email, password);
      
      if (response.success || response.access_token) {
        localStorage.setItem('jwt-token', response.access_token);
        localStorage.setItem('user', JSON.stringify(response.user));
        setUser(response.user);
        setIsAuthenticated(true);
        return { success: true };
      }
      
      return { success: false, message: 'Error desconocido' };
    } catch (error) {
      console.error('Error en login:', error);
      return { 
        success: false, 
        message: error instanceof Error ? error.message : 'Error al conectar con el servidor'
      };
    }
  };

  const register = async (userData: any) => {
    try {
      const response = await apiService.register(userData);
      
      if (response.success || response.access_token) {
        localStorage.setItem('jwt-token', response.access_token);
        localStorage.setItem('user', JSON.stringify(response.user));
        setUser(response.user);
        setIsAuthenticated(true);
        return { success: true };
      }
      
      return { success: false, message: 'Error desconocido' };
    } catch (error) {
      console.error('Error en registro:', error);
      return { 
        success: false, 
        message: error instanceof Error ? error.message : 'Error al conectar con el servidor'
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('jwt-token');
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
  };

  const contextValue = useMemo(() => ({
    user,
    isAuthenticated,
    login,
    register,
    logout
  }), [user, isAuthenticated]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};