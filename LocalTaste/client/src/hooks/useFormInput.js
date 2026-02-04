/**
 * HOOK DE INPUTS DE FORMULARIO
 * 
 * Hook personalizado para manejar el estado de múltiples inputs en formularios.
 * Simplifica el manejo de formularios reduciendo el boilerplate de estado.
 * 
 * Características:
 * - Manejo automático de inputs de texto, checkbox, radio, etc.
 * - Función de reset a valores iniciales
 * - Optimizado con useCallback para evitar re-renders
 * 
 * @module hooks/useFormInput
 */

import { useState, useCallback } from 'react';

/**
 * Hook para manejar inputs de formulario
 * 
 * @param {Object} initialValues - Objeto con valores iniciales del formulario
 * @returns {Array} [values, handleChange, reset, setValues]
 *   - values: Objeto con los valores actuales del formulario
 *   - handleChange: Función para manejar cambios en inputs
 *   - reset: Función para resetear al estado inicial
 *   - setValues: Setter directo para casos especiales
 * 
 * @example
 * const [formData, handleInputChange, resetForm] = useFormInput({
 *   email: '',
 *   password: ''
 * });
 * 
 * <input name="email" value={formData.email} onChange={handleInputChange} />
 */
export function useFormInput ( initialValues = {} ) {
  // ========================================================================
  // ESTADO
  // ========================================================================

  const [ values, setValues ] = useState( initialValues );

  // ========================================================================
  // HANDLERS
  // ========================================================================

  /**
   * Maneja cambios en cualquier input del formulario
   * Soporta inputs de texto, checkbox, radio, select, etc.
   * 
   * @param {Event} e - Evento del input
   */
  const handleChange = useCallback( ( e ) => {
    const { name, value, type, checked } = e.target;

    setValues( prev => ( {
      ...prev,
      // Para checkboxes usar 'checked', para otros usar 'value'
      [ name ]: type === 'checkbox' ? checked : value
    } ) );
  }, [] );

  /**
   * Resetea el formulario a sus valores iniciales
   */
  const reset = useCallback( () => {
    setValues( initialValues );
  }, [ initialValues ] );

  // ========================================================================
  // RETORNO
  // ========================================================================

  return [ values, handleChange, reset, setValues ];
}
