
// Barrel file: centraliza exportaciones de controladores de usuario.
// Qué: facilita importaciones (un único punto) en rutas.
// Cómo: re-exporta cada controlador individual.
// Por qué: mejora mantenibilidad y evita rutas con múltiples imports dispersos.
import registerUserController from './registerUserController.js';
import loginUserController from './loginUserController.js';
import getPrivateUserProfileController from './getPrivateUserProfileController.js';
import userAvatarController from './UserAvatarController.js';
import updateBioController from './updateBioController.js';
import searchUsersController from './searchUsersController.js';

export {
  registerUserController,
  loginUserController,
  getPrivateUserProfileController,
  userAvatarController,
  updateBioController,
  searchUsersController
};