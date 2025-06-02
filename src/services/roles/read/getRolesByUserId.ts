import { Role } from '../../../database/entities';
import { roleRepository } from '../../../database/repositories';

export const getRolesByUserId = async (id: number): Promise<Role[]> => {

        const roles = await roleRepository.find({
            relations: {
                usuarios: true,
                permissoes: true,
            },
            where: {
                usuarios: {
                    id: id
                }
            }
        });

        

        if (!roles) {
            throw new Error('Nenhumas role encontrada para este usuário');
        }

        return roles;
};
