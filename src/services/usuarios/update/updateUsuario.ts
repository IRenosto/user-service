import { Usuario } from '../../../database/entities';
import { usuarioRepository } from '../../../database/repositories';
import { IBodyPropsUsuarios } from '../../../shared/interfaces';
import { passwordCrypto } from '../../../shared/services';
import { copiarRolesEPermissoes } from '../helper/copiarRolesEPermissoes';
import { validaEmailUsuario } from '../helper/validarEmailUsuario';
import { NotFoundError } from '../../../shared/errors/customErrors';

export const updateUsuario = async (id: number, usuarioNovo: IBodyPropsUsuarios): Promise<Omit<Usuario, 'senha'>> => {
        const usuarioCadastrado = await usuarioRepository.findOne({ where: { id } });

        if (!usuarioCadastrado) throw new NotFoundError('Usuário não localizado');

        if (usuarioNovo.email) {
            await validaEmailUsuario(usuarioNovo.email, id);
        }

        if (usuarioNovo.senha) {
            usuarioCadastrado.senha = await passwordCrypto(usuarioNovo.senha);
        }

        if (usuarioNovo.usuarioReferenciaId && usuarioNovo.usuarioReferenciaId != usuarioCadastrado.id) {
        const resultado = await copiarRolesEPermissoes(usuarioNovo.usuarioReferenciaId);
        
        usuarioCadastrado.roles = resultado.roles;
        usuarioCadastrado.permissoes = resultado.permissoes;
        }

        usuarioCadastrado.nome = usuarioNovo.nome ?? usuarioCadastrado.nome;
        usuarioCadastrado.sobrenome = usuarioNovo.sobrenome ?? usuarioCadastrado.sobrenome;
        usuarioCadastrado.email = usuarioNovo.email ?? usuarioCadastrado.email;
        usuarioCadastrado.ativo = usuarioNovo.ativo ?? usuarioCadastrado.ativo;
        usuarioCadastrado.usuario_atualizador = usuarioNovo.usuario_atualizador ?? usuarioCadastrado.usuario_atualizador;

        const usuarioCriado =  await usuarioRepository.save(usuarioCadastrado);

        const { senha: _, ...usuarioSemSenha } = usuarioCriado;

        return usuarioSemSenha;
};