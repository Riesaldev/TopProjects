/**
 * Crea y lanza un error con código HTTP personalizado.
 * Qué: encapsula patrón para homogeneizar forma de lanzar errores.
 * Cómo: adjunta propiedad code para que middleware global la interprete.
 * Por qué: evita repetición y mantiene consistencia en manejo de errores.
 */
const generateError = ( msg, code ) => {
  const err = new Error( msg );
  err.code = code;
  throw err;
};

export default generateError;
