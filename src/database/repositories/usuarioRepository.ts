import { AppDataSource } from '../data-source';
import { Usuario } from '../entities/usuarios';

export const usuarioRepository = AppDataSource.getRepository(Usuario);