import { usuarioRepository } from '../../../database/repositories';
import { NotFoundError } from '../../../shared/errors/customErrors';
import { IUsuarioPermissoes } from '../../../shared/interfaces';

export const getUsuarioRolesPermissoesSeparado = async (
    id: number
): Promise<IUsuarioPermissoes> => {
    const usuario = await usuarioRepository.findOne({
      where: { id },
      relations: ['roles', 'roles.permissoes', 'permissoes'],
    });

    if (!usuario) {
      throw new NotFoundError('Usuário não encontrado');
    }

    const rolesSet = new Set<string>();
    const permissoesSet = new Set<string>();


    usuario.roles?.forEach(role => {
      rolesSet.add(role.nome);
    });

    usuario.permissoes?.forEach(perm => {
      permissoesSet.add(perm.nome);
    });

    const roles = Array.from(rolesSet);
    const permissoes = Array.from(permissoesSet);


    const usuarioTratado = {
      id: usuario.id,
      nome: usuario.nome,
      sobrenome: usuario.sobrenome,
      permissoes,
      roles
    }

    return usuarioTratado;
};
