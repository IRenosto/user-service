import { passwordCrypto } from './passwordCrypto';
import { roleRepository, usuarioRepository } from '../../database/repositories';

export async function criarUsuarioAdmin() {
    try {
        const roleAdmin = await roleRepository.find({
            where: {
                nome: 'ADMINISTRADOR'
            }
        });

        if (!roleAdmin) {
            console.error('Role ADMINISTRADOR não existe\n');
        }

        const email = process.env.EMAIL_USER_DEFAULT;
        const usuarioExiste = await usuarioRepository.findOneBy({ email });

        if (!usuarioExiste) {
            const senha = process.env.SENHA_USER_DEFAULT;
            const hashPassword = await passwordCrypto(String(senha));

            const novoUsuario = usuarioRepository.create({
                nome: process.env.NAME_USER_DEFAULT,
                sobrenome: process.env.SOBRENOME_USER_DEFAULT,
                email: email,
                senha: hashPassword,
                roles: roleAdmin,
                usuario_cadastrador: `${process.env.NAME_USER_DEFAULT}.${process.env.SOBRENOME_USER_DEFAULT}`,
                usuario_atualizador: `${process.env.NAME_USER_DEFAULT}.${process.env.SOBRENOME_USER_DEFAULT}`,
            });

            await usuarioRepository.save(novoUsuario);
            return console.log('Usuário administrador foi criado.\n');
        }

        usuarioExiste.roles = roleAdmin;

        return await usuarioRepository.save(usuarioExiste);
    } catch (error) {
        return console.error(error);
    }

}