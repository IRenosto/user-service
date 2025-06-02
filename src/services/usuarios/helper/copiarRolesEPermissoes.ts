import { Permissao, Role } from '../../../database/entities';
import { usuarioRepository } from '../../../database/repositories';
import { NotFoundError } from '../../../shared/errors/customErrors';

export const copiarRolesEPermissoes = async ( id?: number ): Promise<{ roles: Role[]; permissoes: Permissao[] }> => {
  if (!id) return { roles: [], permissoes: [] };

  const usuario = await usuarioRepository.findOne({
    where: { id },
    relations: { roles: true, permissoes: true }
  });

  if (!usuario) {
    throw new NotFoundError('Usuario referência não encontrado');
  }

  return {
    roles: usuario.roles || [],
    permissoes: usuario.permissoes || []
  };
};