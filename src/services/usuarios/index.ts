import * as createUsuario from './create/createUsuario';
import * as deleteUsuario from './delete/deleteUsuario';
import * as validarEmailUsuario from './helper/validarEmailUsuario';
import * as getAllUsuarios from './read/getAllUsuarios';
import * as getUsuarioAuthPorEmail from './read/getUsuarioAuthByEmail';
import * as getUsuarioPorId from './read/getUsuarioById';
import * as getUsuarioPermissoes from './read/getUsuarioPermissoes';
import * as getUsuarioRolesPermissoesSeparado from './read/getUsuarioRolesPermissoesSeparado';
import * as updateUsuario from './update/updateUsuario';
import * as updateUsuarioDataLogin from './update/updateUsuarioLoginDate';
import * as updateUsuarioRolesEPermissoes from './update/updateUsuarioRolesAndPermissions';


export const usuariosProvider = {
    ...getUsuarioAuthPorEmail,
    ...getUsuarioPorId,
    ...getAllUsuarios,
    ...getUsuarioPermissoes,
    ...getUsuarioRolesPermissoesSeparado,
    ...createUsuario,
    ...deleteUsuario,
    ...updateUsuario,
    ...updateUsuarioDataLogin,
    ...updateUsuarioRolesEPermissoes,
    ...validarEmailUsuario
};