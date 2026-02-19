import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '@/services/authService';
import type { ApiUser, LoginRequest, RegisterRequest } from '@/types/api';
import { ApiError } from '@/services/api';

// ─── Types ───────────────────────────────────────────────────────────────────

interface AuthContextValue {
  user: ApiUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => void;
}

// ─── Context ─────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextValue | null>(null);

// ─── Provider ────────────────────────────────────────────────────────────────

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const navigate = useNavigate();
  const [user, setUser] = useState<ApiUser | null>(() => authService.getCurrentUser());
  const [isLoading, setIsLoading] = useState(false);

  // Sincronizar si en otra pestaña hacen logout
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'token' && !e.newValue) {
        setUser(null);
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const login = useCallback(
    async (data: LoginRequest) => {
      setIsLoading(true);
      try {
        const { user: loggedUser } = await authService.login(data);
        setUser(loggedUser);
        navigate('/campaigns');
      } finally {
        setIsLoading(false);
      }
    },
    [navigate],
  );

  const register = useCallback(
    async (data: RegisterRequest) => {
      setIsLoading(true);
      try {
        await authService.register(data);
        navigate('/');
      } finally {
        setIsLoading(false);
      }
    },
    [navigate],
  );

  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
    navigate('/');
  }, [navigate]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isLoading,
      login,
      register,
      logout,
    }),
    [user, isLoading, login, register, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used inside <AuthProvider>');
  }
  return ctx;
}

// Re-export ApiError so consumers can do: catch (e) { if (e instanceof ApiError) ... }
export { ApiError };
