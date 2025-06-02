import { Role } from '../../../database/entities';

export interface IBodyCreateRoles extends Omit<Role, 'id' | 'data_criacao' | 'data_atualizacao' | 'permissao' | 'usuario'> { }

export interface IQueryGetAllRoles{
    page?: number,
    limit?: number,
    filter?: string,
}

export interface IBodyUpdateRoles {
    nome?: string;
    descricao?: string;
    permissoesIds?: number[]; 
}
