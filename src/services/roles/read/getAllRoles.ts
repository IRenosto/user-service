import { Role } from '../../../database/entities';
import { roleRepository } from '../../../database/repositories';

export const getAllRoles = async (
    page?: number,
    limit?: number,
    filter?: string
): Promise<Role[]> => {
        const query = roleRepository.createQueryBuilder('role')
            .leftJoinAndSelect('role.permissoes', 'permissao')
            .addOrderBy('permissao.nome', 'ASC');

            if (typeof page === 'number' && typeof limit === 'number' && page > 0 && limit > 0) {
                query.skip((page - 1) * limit);
                query.take(limit);
              }

              if (filter) {
                query.andWhere('LOWER(role.nome) LIKE LOWER(:nome)', { nome: `%${filter}%` });
        }

        const roles = await query.getMany();

        return roles;
};