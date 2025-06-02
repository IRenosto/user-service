import { Permissao } from '../../../database/entities';
import { permissaoRepository } from '../../../database/repositories';
import { NotFoundError } from '../../../shared/errors/customErrors';

export const getPermissaoById = async (id: number): Promise<Permissao> => {
        const result = await permissaoRepository.findOne({
            relations: {
                roles: true
            },
            where: {
                id: id
            }
        });

        if (!result) {
            throw new NotFoundError('Permissão não encontrada');
        }

        return result;
};