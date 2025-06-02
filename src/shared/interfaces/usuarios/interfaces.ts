import { Usuario } from '../../../database/entities';

export interface IBodyPropsUsuarios {
    senha?: string;
    nome?: string;
    sobrenome?: string;
    email?: string;
    ativo?: boolean;
    usuario_atualizador?: string,
    usuario_cadastrador?: string,
    usuarioReferenciaId?: number, 
}

export interface IBodyCreateUsuarios extends Omit<Usuario, 'id' | 'data_criacao' | 'data_atualizacao' | 'roles' | 'permissoes' > { 
    usuarioReferenciaId?: number 
}

export interface IQueryGetAllUsuarios {
    page?: number;
    limit?: number;
    filter?: string;
}

export interface IBodyUpdateUsuario extends Omit<Usuario, 'id' | 'data_criacao' | 'data_atualizacao' | 'roles' | 'permissoes' > { 
    usuarioReferenciaId?: number 
}

export interface IBodyUpdateUsuarioRolesAndPermissions { roles?: number[], permissoes?: number[] }

export interface IBodyCopyUsuarioRolesAndPermissions {
    usuarioId: number
    usuarioReferenciaId: number
}

export interface IUsuarioResponse {
    id: number
    senha: string
}


export interface IUsuarioPermissoes {
    id: number
    nome: string
    sobrenome: string
    permissoes: string[]
    roles?: string[]
}