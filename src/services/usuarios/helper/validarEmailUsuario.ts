import { usuarioRepository } from '../../../database/repositories';
import { BadRequestError } from '../../../shared/errors/customErrors';

export const validaEmailUsuario = async (
  email: string,
  id?: number
): Promise<void> => {
    const usuarioExistente = await usuarioRepository.findOne({ where: { email } });

    if (usuarioExistente && usuarioExistente.id != id) {
      throw new BadRequestError('Já existe usuário com este E-mail.');
    }
};
