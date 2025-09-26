/*
  Minimal HTTP client for the frontend.
  - Centralizes base URL from VITE_API_URL
  - Handles JSON vs FormData bodies automatically
  - Parses JSON responses and throws typed Errors with server message when available
*/

const { VITE_API_URL } = import.meta.env as { VITE_API_URL?: string };

function joinUrl(base: string | undefined, path: string): string {
  const b = (base ?? '').replace(/\/?$/, '');
  if (/^https?:\/\//i.test(path)) return path; // absolute URL
  if (!path.startsWith('/')) path = '/' + path;
  return `${b}${path}`;
}

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface RequestOptions {
  method?: HttpMethod;
  headers?: Record<string, string>;
  body?: any;
  signal?: AbortSignal;
}

export async function request<T = unknown>(path: string, opts: RequestOptions = {}): Promise<T> {
  const { method = 'GET', headers, body, signal } = opts;

  const isFormData = typeof FormData !== 'undefined' && body instanceof FormData;
  const baseHeaders: Record<string, string> = {};
  if (!isFormData && body !== undefined && !(body instanceof Blob)) {
    baseHeaders['Content-Type'] = 'application/json';
  }
  // Adjuntamos token si está disponible en localStorage
  try {
    const token = localStorage.getItem('token');
    if (token) baseHeaders['Authorization'] = `Bearer ${token}`;
  } catch {
    // Ignorar si localStorage no está disponible
  }
  const finalHeaders = { ...baseHeaders, ...(headers ?? {}) };

  const init: RequestInit = {
    method,
    headers: finalHeaders,
    signal,
  };

  if (body !== undefined) {
    init.body = isFormData ? body : body instanceof Blob ? body : JSON.stringify(body);
  }

  const url = joinUrl(VITE_API_URL, path);
  const res = await fetch(url, init);

  // No Content
  if (res.status === 204) return undefined as T;

  let data: any = null;
  const text = await res.text();
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text as any;
  }

  if (!res.ok) {
    const message = (data && (data.message || data.error)) || res.statusText || 'Request failed';
    const error = new Error(String(message));
    (error as any).status = res.status;
    (error as any).data = data;
    throw error;
  }

  return data as T;
}

export function get<T = unknown>(path: string, options?: Omit<RequestOptions, 'method' | 'body'>) {
  return request<T>(path, { ...options, method: 'GET' });
}

export function postJson<T = unknown>(path: string, json: unknown, options?: Omit<RequestOptions, 'method' | 'body'>) {
  return request<T>(path, { ...options, method: 'POST', body: json });
}

export function postForm<T = unknown>(path: string, form: FormData, options?: Omit<RequestOptions, 'method' | 'body' | 'headers'>) {
  // Don't set Content-Type; browser will set correct boundary
  return request<T>(path, { ...options, method: 'POST', body: form });
}

// --- Auth / Recovery helpers ---
export function recoverPassword(email: string) {
  return postJson<{ status: string; message?: string }>(
    '/api/users/password/recover',
    { email }
  );
}

export function resetPassword(email: string, code: string, newPassword: string) {
  return postJson<{ status: string }>(
    '/api/users/password/reset',
    { email, code, newPassword }
  );
}
