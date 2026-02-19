/**
 * Cliente HTTP base para todas las llamadas a la API.
 * Inyecta automáticamente el token JWT del localStorage.
 * Cuando el servidor esté disponible solo hay que cambiar BASE_URL.
 */

import type { ApiErrorResponse } from '@/types/api';

export const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
    public readonly errors?: Record<string, string>,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

function getToken(): string | null {
  return localStorage.getItem('token');
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  // 204 No Content — sin body
  if (res.status === 204) {
    return undefined as T;
  }

  const json = await res.json().catch(() => ({ success: false, message: 'Invalid JSON response' }));

  if (!res.ok) {
    const err = json as ApiErrorResponse;
    throw new ApiError(res.status, err.message ?? 'Request failed', err.errors);
  }

  return json as T;
}

export const api = {
  get: <T>(endpoint: string) => request<T>(endpoint, { method: 'GET' }),

  post: <T>(endpoint: string, body: unknown) =>
    request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    }),

  patch: <T>(endpoint: string, body: unknown) =>
    request<T>(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(body),
    }),

  delete: <T>(endpoint: string) => request<T>(endpoint, { method: 'DELETE' }),

  /** Upload multipart/form-data (sin Content-Type para que el browser lo ponga) */
  upload: <T>(endpoint: string, formData: FormData) => {
    const token = getToken();
    const headers: Record<string, string> = {};
    if (token) headers['Authorization'] = `Bearer ${token}`;
    return request<T>(endpoint, {
      method: 'POST',
      headers,
      body: formData,
    });
  },
};
