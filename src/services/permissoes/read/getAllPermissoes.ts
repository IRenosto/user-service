import { Permissao } from '../../../database/entities';
import { permissaoRepository } from '../../../database/repositories';

export const getAllPermissoes = async (
    page?: number,
    limit?: number,
    filter?: string
): Promise<Permissao[]> => {
        const query = permissaoRepository.createQueryBuilder('permissao');

            if (typeof page === 'number' && typeof limit === 'number' && page > 0 && limit > 0) {
                query.skip((page - 1) * limit);
                query.take(limit);
              }

        if (filter) {
            query.andWhere(
              `(LOWER(permissao.nome) LIKE LOWER(:filter)`,
              { filter: `%${filter}%` }
            );
          }

        const permissoes = await query.getMany();

        return permissoes;
};