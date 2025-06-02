import { In } from 'typeorm';
import { Permissao, Role } from '../../../database/entities';
import { permissaoRepository, roleRepository, usuarioRepository } from "../../../database/repositories";
import { IBodyUpdateUsuarioRolesAndPermissions } from "../../../shared/interfaces";
import { NotFoundError, InternalServerError } from '../../../shared/errors/customErrors';

const validaRolesEPermissoes = async (
  rolesIds: number[],
  permissoesIds: number[]
): Promise<{ roles: Role[]; permissoes: Permissao[] }> => {
  
  const roles = await roleRepository.find({
    where: { id: In(rolesIds) },
    relations: { permissoes: true }
  });

  const permissoes = await permissaoRepository.find({
    where: { id: In(permissoesIds) }
  });

  return {
    roles: roles,
    permissoes: permissoes
  };
};

export const updateRolesAndPermissionsById = async (
  id: number,
  rolesEPermissoes: IBodyUpdateUsuarioRolesAndPermissions
): Promise<void> => {
    const usuarioCadastrado = await usuarioRepository.findOne({
      where: { id },
    });

    if (!usuarioCadastrado) {
      throw new NotFoundError("Usuário não localizado");
    }

    const roles = rolesEPermissoes.roles ?? [];
    const permissoes = rolesEPermissoes.permissoes ?? [];

    const rolesPermissoes = await validaRolesEPermissoes(roles, permissoes);

    if (!rolesPermissoes) {
      throw new InternalServerError("Falha na validação de roles e permissões");
    }

    usuarioCadastrado.roles = rolesPermissoes.roles;
    usuarioCadastrado.permissoes = rolesPermissoes.permissoes;

    await usuarioRepository.save(usuarioCadastrado);
};
