import { IBodyUpdateRoles } from '../../../shared/interfaces';
import { permissaoRepository, roleRepository } from '../../../database/repositories';
import { NotFoundError } from '../../../shared/errors/customErrors';
import { Role } from '../../../database/entities';
import { In } from 'typeorm';

export const updateRole = async (id: number, role: IBodyUpdateRoles): Promise<Role> => {
    const roleCadastrada = await roleRepository.findOne({
        where: { id }
    });

        if (!roleCadastrada) {
            throw new NotFoundError('Role não existe');
        }

        if (role.nome && role.nome !== roleCadastrada.nome) {
            const roleComMesmoNome = await roleRepository.findOneBy({ nome: role.nome });
            if (roleComMesmoNome) {
                throw new Error('Já existe Role com este nome');
            }
        }

        roleCadastrada.nome = role.nome ?? roleCadastrada.nome;
        roleCadastrada.descricao = role.descricao ?? roleCadastrada.descricao;

        if (role.permissoesIds && Array.isArray(role.permissoesIds)) {
            const permissoes = await permissaoRepository.find({
                where: { id: In(role.permissoesIds) }
              });
            roleCadastrada.permissoes = permissoes;
        }

        await roleRepository.save(roleCadastrada);

    return roleCadastrada;
};