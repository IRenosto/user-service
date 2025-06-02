import { permissaoRepository, roleRepository } from '../../database/repositories';

export async function criarRolesEPermissoes() {
    try {
    const permissoes = [
        { nome: 'USUARIO_ESCRITA', descricao: 'Pode criar usuários' },
        { nome: 'USUARIO_LEITURA', descricao: 'Pode visualizar usuários' }, 
        { nome: 'USUARIO_DELECAO', descricao: 'Pode deletar usuários' },
        { nome: 'PERMISSAO_ESCRITA', descricao: 'Pode criar ou editar permissões' },
        { nome: 'PERMISSAO_LEITURA', descricao: 'Pode visualizar permissões' },    
        { nome: 'ROLE_ESCRITA', descricao: 'Pode criar ou editar roles' },
        { nome: 'ROLE_LEITURA', descricao: 'Pode visualizar roles' },
        { nome: 'ROLE_DELECAO', descricao: 'Pode deletar roles' },
        { nome: 'POSTAGEM_ESCRITA', descricao: 'Pode criar ou editar postagem' },
        { nome: 'POSTAGEM_LEITURA', descricao: 'Pode visualizar postagem' },
        { nome: 'POSTAGEM_DELECAO', descricao: 'Pode deletar postagem' },
    ]

    const permissoesRoles  = []

    for (const permissao of permissoes) {
        let permissaoEncontrada = await permissaoRepository.findOne({
            where: { nome: permissao.nome }
        })

        if(!permissaoEncontrada){
            permissaoEncontrada = await permissaoRepository.create({
                nome: permissao.nome,
                descricao: permissao.descricao,
            });

            permissaoEncontrada = await permissaoRepository.save(permissaoEncontrada);
            console.log(`Permissão '${permissao.nome}' criada.`);
            permissoesRoles.push(permissaoEncontrada);
            continue;
        }
        permissoesRoles.push(permissaoEncontrada);
    }
  
    let roleAdmin = await roleRepository.findOne({
        where: {nome: 'ADMINISTRADOR'},
        relations: { permissoes: true }
    })

    if (!roleAdmin) {
        roleAdmin = await roleRepository.create({
            nome: 'ADMINISTRADOR',
            descricao: 'Administrador do sistema',
            permissoes: permissoesRoles
        });
        roleAdmin = await roleRepository.save(roleAdmin);
        console.log(`\nRole ${roleAdmin.nome} criada com permissões associadas.`);
    } else {
        roleAdmin.permissoes = permissoesRoles;
        await roleRepository.save(roleAdmin);
    }
    } catch (error) {
        return console.error(error);
    }
};