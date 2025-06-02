import { usuarioRepository } from '../../../database/repositories';
import { NotFoundError } from '../../../shared/errors/customErrors';

export const updateUsuarioLoginDate = async (id: number): Promise<void> => {
        const usuarioCadastrado = usuarioRepository.findBy({ id });

        if (!usuarioCadastrado) {
            throw new NotFoundError('Usuario não encontrado');
        }

        const data = new Date().getTime();

        await usuarioRepository.update({ id: id }, { ultimo_login: new Date(data) });
};