import { useState, useEffect, useCallback } from 'react';
import { User } from '@/types';
import { useNotifications } from './useNotifications';

interface UseUserDataReturn {
  user: User | null;
  loading: boolean;
  error: string | null;
  updateUser: (userData: Partial<User>) => Promise<boolean>;
  suspendUser: (reason?: string) => Promise<boolean>;
  deleteUser: () => Promise<boolean>;
  refreshUser: () => Promise<void>;
}

export function useUserData(userId: number | string): UseUserDataReturn {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { showError, showSuccess } = useNotifications();

  const fetchUser = useCallback(async () => {
    if (!userId) return;
    
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`/api/users/${userId}`);
      
      if (!response.ok) {
        throw new Error('Error al cargar datos del usuario');
      }
      
      const userData = await response.json();
      setUser(userData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMessage);
      showError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [userId, showError]);

  const updateUser = useCallback(async (userData: Partial<User>): Promise<boolean> => {
    if (!userId) return false;
    
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      
      if (!response.ok) {
        throw new Error('Error al actualizar usuario');
      }
      
      const updatedUser = await response.json();
      setUser(updatedUser);
      showSuccess('Usuario actualizado correctamente');
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al actualizar usuario';
      setError(errorMessage);
      showError(errorMessage);
      return false;
    }
  }, [userId, showError, showSuccess]);

  const suspendUser = useCallback(async (reason?: string): Promise<boolean> => {
    if (!userId) return false;
    
    try {
      const response = await fetch(`/api/users/${userId}/suspend`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason }),
      });
      
      if (!response.ok) {
        throw new Error('Error al suspender usuario');
      }
      
      const updatedUser = await response.json();
      setUser(updatedUser);
      showSuccess('Usuario suspendido correctamente');
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al suspender usuario';
      setError(errorMessage);
      showError(errorMessage);
      return false;
    }
  }, [userId, showError, showSuccess]);

  const deleteUser = useCallback(async (): Promise<boolean> => {
    if (!userId) return false;
    
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Error al eliminar usuario');
      }
      
      setUser(null);
      showSuccess('Usuario eliminado correctamente');
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al eliminar usuario';
      setError(errorMessage);
      showError(errorMessage);
      return false;
    }
  }, [userId, showError, showSuccess]);

  const refreshUser = useCallback(async () => {
    await fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return {
    user,
    loading,
    error,
    updateUser,
    suspendUser,
    deleteUser,
    refreshUser,
  };
}
