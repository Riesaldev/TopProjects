/**
 * HOOK DE TOGGLE DE CONTRASEÑA
 * 
 * Hook simple para manejar la visibilidad de campos de contraseña.
 * Permite alternar entre mostrar y ocultar el texto de la contraseña.
 * 
 * @module hooks/usePasswordToggle
 */

import { useState, useCallback } from 'react';

/**
 * Hook para mostrar/ocultar contraseña
 * 
 * @returns {Array} [showPassword, togglePassword, setShowPassword]
 *   - showPassword: Boolean indicando si la contraseña es visible
 *   - togglePassword: Función para alternar visibilidad
 *   - setShowPassword: Setter directo para casos especiales
 * 
 * @example
 * const [showPassword, togglePassword] = usePasswordToggle();
 * 
 * <input type={showPassword ? "text" : "password"} />
 * <button onClick={togglePassword}>Mostrar</button>
 */
export function usePasswordToggle () {
  // ========================================================================
  // ESTADO
  // ========================================================================

  // Estado booleano de visibilidad
  const [ showPassword, setShowPassword ] = useState( false );

  // ========================================================================
  // HANDLERS
  // ========================================================================

  /**
   * Alterna entre mostrar y ocultar la contraseña
   */
  const togglePassword = useCallback( () => {
    setShowPassword( prev => !prev );
  }, [] );

  // ========================================================================
  // RETORNO
  // ========================================================================

  return [ showPassword, togglePassword, setShowPassword ];
}
