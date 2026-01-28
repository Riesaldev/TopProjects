import { useState, useCallback } from 'react';

/**
 * Hook para manejar inputs de formulario
 * @param {Object} initialValues - Valores iniciales del formulario
 * @returns {Array} [values, handleChange, reset, setValues]
 */
export function useFormInput ( initialValues = {} ) {
  const [ values, setValues ] = useState( initialValues );

  const handleChange = useCallback( ( e ) => {
    const { name, value, type, checked } = e.target;
    setValues( prev => ( {
      ...prev,
      [ name ]: type === 'checkbox' ? checked : value
    } ) );
  }, [] );

  const reset = useCallback( () => {
    setValues( initialValues );
  }, [ initialValues ] );

  return [ values, handleChange, reset, setValues ];
}
