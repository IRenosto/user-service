import { faker } from '@faker-js/faker';
import { testRequest } from './jest.setup';

describe('Permissoes - integração', () => {
    let permissaoId = '';

    describe('getAllPermissoes', () => {
        it('deve retornar todas as permissões com sucesso', async () => {
            const res = await testRequest('get', '/permissoes')
                .query({ page: 1, limit: 10, filter: '' });

            expect(res.statusCode).toEqual(200);
            expect(Array.isArray(res.body)).toBe(true);
            expect(res.headers).toHaveProperty('x-total-count');
        });
    });

    describe('getPermissaoById', () => {
        it('deve retornar a permissão pelo ID', async () => {
            const res = await testRequest('get', `/permissoes/1`)
                .send();

            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('id', '1');
        });
    });

    describe('updatePermissaoDescricao', () => {
        it('deve atualizar a descrição da permissão com sucesso', async () => {
            const novaDescricao = faker.lorem.words(4);

            const res = await testRequest('patch', `/permissoes/1`)
                .send({ descricao: novaDescricao });

            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('descricao', novaDescricao);
        });

        it('deve retornar erro 400 se ID não for informado', async () => {
            const res = await testRequest('patch', '/permissoes/')
                .send({ descricao: 'Sem ID' });

            expect(res.statusCode).toBeGreaterThanOrEqual(400);
        });
    });
});
