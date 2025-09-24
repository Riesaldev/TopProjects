// Tipos de filas para el dominio de usuarios
export type UserRow = {
  id: number;
  username: string;
  email: string;
  password: string; // hash almacenado
  avatar?: string | null;
  recoverPassword?: string | null;
  created_at?: string;
  updated_at?: string;
};
