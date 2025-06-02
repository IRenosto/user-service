import * as getAllPermissoes from './read/getAllPermissoes';
import * as getPermissoesById from './read/getPermissaoById';
import * as updatePermissaoDescricao from './update/updatePermissaoDescricao';


export const permissoesProvider = {
    ...getAllPermissoes,
    ...getPermissoesById,
    ...updatePermissaoDescricao,
};