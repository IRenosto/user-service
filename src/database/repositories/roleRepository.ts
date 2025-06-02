import { AppDataSource } from '../data-source';
import { Role } from '../entities';

export const roleRepository = AppDataSource.getRepository(Role);