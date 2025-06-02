import { Usuario } from '../../../database/entities';
import { usuarioRepository } from '../../../database/repositories';

export const getAllUsuarios = async (
  page?: number,
  limit?: number,
  filter?: string
): Promise<Omit<Usuario, 'senha'>[]> => {
    const query = usuarioRepository.createQueryBuilder('usuario');

    if (filter) {
      query.andWhere(
        `(LOWER(usuario.nome) LIKE LOWER(:filter) OR LOWER(usuario.sobrenome) LIKE LOWER(:filter) OR LOWER(usuario.email) LIKE LOWER(:filter))`,
        { filter: `%${filter}%` }
      );
    }

    if (typeof page === 'number' && typeof limit === 'number' && page > 0 && limit > 0) {
      query.skip((page - 1) * limit);
      query.take(limit);
    }

    const usuarios =  await query.getMany();

    return usuarios.map(({ senha, ...usuario }) => usuario);
};
