import { usuarioRepository } from '../../../database/repositories';
import { NotFoundError } from '../../../shared/errors/customErrors';

export const deleteUsuario = async (id: number): Promise<void> => {
        const usuario = await usuarioRepository.findOneBy({ id });

        if (!usuario) {
            throw new NotFoundError('Usuário não encontrado');
        }

        await usuarioRepository.delete(id);
};