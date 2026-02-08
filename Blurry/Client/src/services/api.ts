const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// Función helper para construir URLs
export const getApiUrl = (endpoint: string) => {
  if (endpoint.startsWith('/')) {
    endpoint = endpoint.substring(1);
  }
  return `${API_BASE_URL}/${endpoint}`;
};

// Función para realizar peticiones con manejo de errores y autenticación
export async function fetchApi(
  endpoint: string, 
  options: RequestInit = {}
) {
  // Usar la URL completa para llamadas directas al API (sin proxy)
  const url = getApiUrl(endpoint);
  
  // Agregar headers por defecto
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };

  // Agregar token de autenticación si existe
  const token = typeof localStorage !== 'undefined' ? localStorage.getItem('jwt-token') : null;
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // Configuración completa de la petición
  const config: RequestInit = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(url, config);
    // Manejar errores HTTP
    if (!response.ok) {
      let errorData: { message?: string } = {};
      try {
        errorData = await response.json();
      } catch {
        errorData = { message: response.statusText };
      }
      console.error(`[API] Respuesta error backend (${endpoint}):`, errorData);
      throw new Error(errorData.message || `Error ${response.status}`);
    }
    // Verificar si es una respuesta JSON
    const contentType = response.headers.get('content-type');
    if (contentType?.includes('application/json')) {
      return await response.json();
    }
    return await response.text();
  } catch (error) {
    console.error(`Error en petición a ${endpoint}:`, error);
    throw error;
  }
}

// Funciones específicas para cada tipo de petición
export const apiService = {
  // Auth
  login: (email: string, password: string) => {
    const payload = { email, password };
    console.log('[LOGIN] Payload enviado:', payload);
    return fetchApi('auth/login', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  },
  
  register: (userData: any) => 
    fetchApi('auth/register', { 
      method: 'POST', 
      body: JSON.stringify(userData) 
    }),
  
  // Users
  getUsers: () => fetchApi('users'),
  getUser: (id: string | number) => fetchApi(`users/${id}`),
  updateUser: (id: string | number, data: any) => 
    fetchApi(`users/${id}`, { 
      method: 'PUT', 
      body: JSON.stringify(data) 
    }),
  
  // Matches
  getMatches: () => fetchApi('matches'),
  getAnonymousProfiles: () => fetchApi('matching/anonymous/profiles'),
  
  // Add more API methods as needed
};