import { usuarioRepository } from '../../../database/repositories';
import { NotFoundError } from '../../../shared/errors/customErrors';
import { IUsuarioResponse } from '../../../shared/interfaces';

export const getUsuarioAuthByEmail = async (
  email: string
): Promise<IUsuarioResponse> => {
    const usuario = await usuarioRepository.findOne({
      where: { email }
    });

    if (!usuario) {
      throw new NotFoundError('Usuário não encontrado');
    }

    const usuarioTratado = {
      id: usuario.id,
      senha: usuario.senha,
    }

    return usuarioTratado;
};
