import { Permissao } from '../../../database/entities';
import { permissaoRepository } from '../../../database/repositories';
import { NotFoundError } from '../../../shared/errors/customErrors';

export const updatePermissaoDescricao = async (id: number, descricao: string): Promise<Permissao> => {

        const permissoesCadastradas = await permissaoRepository.findOne({
            where: {
                id: id
            }
        });

        if (!permissoesCadastradas) {
            throw new NotFoundError('Permissão não encontrada');
        }

        permissoesCadastradas.descricao = descricao;
        return await permissaoRepository.save(permissoesCadastradas);
};