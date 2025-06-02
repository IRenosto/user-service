import { usuarioRepository } from '../../../database/repositories';
import { NotFoundError } from '../../../shared/errors/customErrors';
import { IUsuarioPermissoes } from '../../../shared/interfaces';

export const getUsuarioPermissoes = async (
    id: number
): Promise<IUsuarioPermissoes> => {
    const usuario = await usuarioRepository.findOne({
      where: { id },
      relations: ['roles', 'roles.permissoes', 'permissoes'],
    });

    if (!usuario) {
      throw new NotFoundError('Usuário não encontrado');
    }

    const permissoesSet = new Set<string>();

    usuario.roles?.forEach(role => {
      role.permissoes.forEach(perm => {
        permissoesSet.add(perm.nome);
      });
    });

    usuario.permissoes?.forEach(perm => {
      permissoesSet.add(perm.nome);
    });

    const permissoes = Array.from(permissoesSet);

    const usuarioTratado = {
      id: usuario.id,
      nome: usuario.nome,
      sobrenome: usuario.sobrenome,
      permissoes
    }

    return usuarioTratado;
};
