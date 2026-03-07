import { api } from './api';
import type {
  ApiResponse,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RecoverPasswordRequest,
  ResetPasswordRequest,
  ApiUser,
} from '@/types/api';

export const authService = {
  /**
   * Inicia sesión. Guarda el token en localStorage si tiene éxito.
   */
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const res = await api.post<ApiResponse<LoginResponse>>('/api/auth/login', data);
    if (res.data?.token) {
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
    }
    return res.data;
  },

  /**
   * Registra un nuevo usuario y lo loguea automáticamente.
   */
  register: async (data: RegisterRequest): Promise<LoginResponse> => {
    const res = await api.post<ApiResponse<LoginResponse>>('/api/auth/register', data);
    if (res.data?.token) {
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
    }
    return res.data;
  },

  /**
   * Solicita código de recuperación de contraseña por email.
   */
  recoverPassword: async (data: RecoverPasswordRequest): Promise<void> => {
    await api.post('/api/auth/recover-password', data);
  },

  /**
   * Resetea la contraseña con el código recibido por email.
   */
  resetPassword: async (data: ResetPasswordRequest): Promise<void> => {
    await api.post('/api/auth/reset-password', data);
  },

  /**
   * Cierra sesión: limpia token y datos del usuario del localStorage.
   */
  logout: (): void => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
  },

  /**
   * Devuelve el usuario guardado en localStorage (sin llamar a la API).
   */
  getCurrentUser: (): ApiUser | null => {
    try {
      const raw = localStorage.getItem('user');
      return raw ? (JSON.parse(raw) as ApiUser) : null;
    } catch {
      return null;
    }
  },

  /**
   * Verifica si hay una sesión activa (token presente).
   */
  isAuthenticated: (): boolean => {
    return Boolean(localStorage.getItem('token'));
  },
};
