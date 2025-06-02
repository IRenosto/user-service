import * as usuarioController from './usuariosController';
import * as usuarioValidator from './usuariosValidator';

export const usuariosHandler = {
    ...usuarioController,
    ...usuarioValidator,
};