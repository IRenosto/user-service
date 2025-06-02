import { Role } from '../../../database/entities';
import { roleRepository } from '../../../database/repositories';
import { NotFoundError } from '../../../shared/errors/customErrors';

export const getRoleById = async (id: number): Promise<Role> => {
        const role = await roleRepository.findOne({
            relations: {
                permissoes: true
            },
            where: {
                id: id
            }
        });

        if (!role) {
            throw new NotFoundError('Role não encontrada.');
        }

        return role;
};