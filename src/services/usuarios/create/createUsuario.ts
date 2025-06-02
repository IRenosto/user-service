import { Usuario } from '../../../database/entities';
import { usuarioRepository } from '../../../database/repositories';
import { IBodyCreateUsuarios } from '../../../shared/interfaces';
import { passwordCrypto } from '../../../shared/services';
import { copiarRolesEPermissoes } from '../helper/copiarRolesEPermissoes';
import { validaEmailUsuario } from '../helper/validarEmailUsuario';

export const createUsuario = async ( usuario: IBodyCreateUsuarios ): Promise<Omit<Usuario, 'senha'>> => {
    await validaEmailUsuario(usuario.email);

    const { usuarioReferenciaId, senha, ...dadosNovoUsuario } = usuario;

    const senhaCriptografada = await passwordCrypto(String(senha));

    const copia = await copiarRolesEPermissoes(usuarioReferenciaId);

    const novoUsuario = usuarioRepository.create({
      ...dadosNovoUsuario,
      senha: senhaCriptografada,
      roles: copia.roles,
      permissoes: copia.permissoes
    });

    const usuarioCriado = await usuarioRepository.save(novoUsuario);

    const { senha: _, ...usuarioSemSenha } = usuarioCriado;

    return usuarioSemSenha;
};
