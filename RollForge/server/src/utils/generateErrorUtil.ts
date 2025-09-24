// Función que gestiona un error y SIEMPRE lanza (never)
type HttpError = Error & { httpStatus: number };
const generateErrorUtil = (httpStatus: number, message: string): never => {
  const err = new Error(message) as HttpError;
  err.httpStatus = httpStatus;
  throw err;
};

export default generateErrorUtil;