import { useState, useCallback } from 'react';

/**
 * Hook para mostrar/ocultar contraseña
 * @returns {Array} [showPassword, togglePassword]
 */
export function usePasswordToggle () {
  const [ showPassword, setShowPassword ] = useState( false );

  const togglePassword = useCallback( () => {
    setShowPassword( prev => !prev );
  }, [] );

  return [ showPassword, togglePassword ];
}
