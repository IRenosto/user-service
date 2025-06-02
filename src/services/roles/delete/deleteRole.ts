import { roleRepository } from '../../../database/repositories';
import { NotFoundError } from '../../../shared/errors/customErrors';

export const deleteRole = async (id: number): Promise<void> => {
        const role = await roleRepository.findOneBy({ id });

        if (!role) {
            throw new NotFoundError('Role não encontrada');
        }

        await roleRepository.delete({ id: id });
};