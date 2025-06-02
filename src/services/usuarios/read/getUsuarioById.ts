import { Usuario } from '../../../database/entities';
import { usuarioRepository } from '../../../database/repositories';
import { NotFoundError } from '../../../shared/errors/customErrors';

export const getUsuarioById = async (
  id: number
): Promise<Omit<Usuario, 'senha'>> => {
    const usuario = await usuarioRepository.findOne({ 
        where: { id } 
    });

    if (!usuario) {
        throw new NotFoundError('Usuário não encontrado');
    }

    const { senha, ...usuarioSemSenha } = usuario;

    return usuarioSemSenha;
};