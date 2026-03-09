/**
 * UserContext
 * Qué: Provee estado global de autenticación (usuario, token, loading) y helpers (login, LogOut, updateAvatar, updateBio).
 * Cómo: Persiste token en cookie + localStorage, obtiene perfil privado al montar (si hay token) y normaliza campos.
 * Por qué: Evitar prop drilling y centralizar lógica de sesión reutilizable en toda la app.
 */
import PropTypes from 'prop-types';
import cookies from 'js-cookie';
import { createContext, useState, useEffect, type ReactNode } from 'react';
import toast from 'react-hot-toast';

const { VITE_API_URL, VITE_AUTH_TOKEN } = import.meta.env;
// Nombre de cookie configurable (permite coexistir con otros subdominios o entornos).
const AUTH_COOKIE_NAME = VITE_AUTH_TOKEN || 'authToken';

interface User {
  id: string | number;
  username: string; // backend expone 'username'
  email: string;
  avatar?: string | null; // URL completa a la imagen (normalizada en buildAvatarUrl)
  bio?: string | null;
  createdAt?: string;
  updatedAt?: string;
  [key: string]: unknown; // flexibilidad futura
}

const UserContext = createContext<{
  user: User | null;
  loading: boolean; // Mientras se resuelve fetch de perfil tras tener token.
  authToken: string | null; // Token JWT crudo (sin 'Bearer').
  login: (token: string) => void; // Guarda token y dispara fetch de perfil.
  LogOut: () => void; // Elimina credenciales persistidas y estado user.
  updateAvatar: (avatar: string) => void; // Actualiza sólo campo avatar localmente.
  updateBio: (bio: string) => void; // Actualiza bio tras petición exitosa.
} | null>(null);


interface UserProviderProps {
  children: ReactNode;
}

const UserProvider = ({ children }: UserProviderProps) => {

  // Prioriza cookie (más control de expiración) y cae a localStorage (respaldo).
  const initialToken = () => {
    const fromCookie = cookies.get(AUTH_COOKIE_NAME);
    const fromStorage = localStorage.getItem(AUTH_COOKIE_NAME) || null;
    return fromCookie || fromStorage || null;
  };
  const [authToken, setAuthToken] = useState<string | null>(initialToken);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Normaliza nombre de fichero a URL absoluta bajo la API (sirve uploads como estático).
  const buildAvatarUrl = (raw?: string | null): string | null => {
    if (!raw) return null;
    if (/^https?:\/\//i.test(raw) || raw.startsWith('data:')) return raw; // Ya es URL completa/base64
    const base = import.meta.env.VITE_API_URL?.replace(/\/$/, '') || '';
    return `${base}/${raw.replace(/^\//, '')}`;
  };

  useEffect(() => {
    // Obtiene perfil privado empleando token actual.
    const fetchUser = async () => {
      try {
        const res = await fetch(`${VITE_API_URL}/api/users/profile`,
          {
            headers: authToken ? { Authorization: authToken } : {},
          });

        const body = await res.json();
        if (body.status === "error") {
          throw new Error(body.message);
        }

        // Normalizar claves: resiliencia ante cambios leves en nombre de propiedades.
        type ApiUser = Partial<User> & Record<string, unknown>;
        const apiUser: ApiUser = body.data.user as ApiUser;
        const normalized: User = {
          id: (apiUser.id as string | number) ?? '',
          username: (apiUser.username as string) || (apiUser.userName as string) || (apiUser.name as string) || '',
          email: (apiUser.email as string) || '',
          avatar: buildAvatarUrl(apiUser.avatar as string | null),
          bio: (apiUser.bio as string | null) ?? null,
          createdAt: apiUser.createdAt as string | undefined,
          updatedAt: (apiUser.updatedAt as string | undefined) || (apiUser.modifiedAt as string | undefined)
        };

        setUser(normalized);
      } catch (err: unknown) {
        // Token inválido -> limpiar sesión para evitar loops continuos.
        LogOut();
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Session expired. Please log in again.";
        toast.error(errorMessage, {
          id: "fetch-user-error"
        });
      } finally {
        setLoading(false);
      }
    };

    if (import.meta.env.DEV) {
      console.log('[UserContext] Cookie name:', AUTH_COOKIE_NAME, 'token inicial:', authToken);
    }

    if (authToken) fetchUser();
    else setLoading(false);

  }, [authToken]);

  // Almacena token y dispara re-fetch (por dependencia del useEffect).
  const login = (token: string) => {
    if (import.meta.env.DEV) console.log('[UserContext] Guardando token', token);
    setAuthToken(token);
    cookies.set(AUTH_COOKIE_NAME, token, { expires: 7 });
    localStorage.setItem(AUTH_COOKIE_NAME, token);
  };

  // Resetea credenciales y estado de usuario.
  const LogOut = () => {
    if (import.meta.env.DEV) console.log('[UserContext] Logout');
    setAuthToken(null);
    setUser(null);
    cookies.remove(AUTH_COOKIE_NAME);
    localStorage.removeItem(AUTH_COOKIE_NAME);
  };

  // Actualiza avatar sin refetch completo (optimización UX); asumir backend éxito previo.
  const updateAvatar = (avatar: User["avatar"]) => {
    if (user !== null) {
      setUser({
        ...user,
        avatar: buildAvatarUrl(avatar as string | null),
      });
    }
  };

  // Actualiza bio local tras confirmación backend.
  const updateBio = (bio: string) => {
    if (user !== null) {
      setUser({
        ...user,
        bio
      });
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        authToken,
        login,
        LogOut,
        updateAvatar,
        updateBio,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = { children: PropTypes.node.isRequired };

export { UserContext, UserProvider };