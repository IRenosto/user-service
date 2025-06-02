import { IBodyCreateRoles } from '../../../shared/interfaces';
import { roleRepository } from '../../../database/repositories';
import { Role } from '../../../database/entities';
import { BadRequestError } from '../../../shared/errors/customErrors';

export const createRole = async (role: IBodyCreateRoles): Promise<Role> => {

        const roleCadastrada = await roleRepository.findOne({
            where: {
                nome: role.nome
            }
        });

        if(roleCadastrada) {
            throw new BadRequestError('Já existe uma Role com este nome');
        }

        const novaRole = roleRepository.create(role);

        return await roleRepository.save(novaRole);
};