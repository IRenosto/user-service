import supertest from 'supertest';
import { server } from '../src/server';
import { AppDataSource } from '../src/database/data-source';
import jwt from 'jsonwebtoken';
import * as authUtils from '../src/shared/middlewares/auth';

const SECRET = process.env.JWT_SECRET || 'segredoQualquer';

beforeAll(async () => {
    await AppDataSource.initialize();

    jest.spyOn(authUtils, 'decoder').mockImplementation(async () => {
        return {
            id: 1,
            nome: 'Test',
            sobrenome: 'Test',
            permissoes: [
                'USUARIO_ESCRITA', 
                'USUARIO_LEITURA',
                'USUARIO_DELECAO', 
                'PERMISSAO_ESCRITA', 
                'PERMISSAO_LEITURA', 
                'ROLE_ESCRITA', 
                'ROLE_LEITURA',
                'ROLE_DELECAO'
            ]
        };
    });
});

afterAll(async () => {
    await AppDataSource.destroy();
});

export const testServer = supertest(server);

export const testRequest = (method: 'get' | 'post' | 'put' | 'delete' | 'patch', url: string) => {

    const token = jwt.sign(
            {
                id: 1
            },
            SECRET,
            {
                expiresIn: '1h'
            }
        );

    return testServer[method](url).set({ Authorization: `Bearer ${token}` });
};
