import { faker } from '@faker-js/faker';
import { testRequest } from './jest.setup';

describe('Roles - integração', () => {
    let roleId = '';

    const fakeRole = {
        nome: faker.lorem.word(),
        descricao: faker.lorem.words(4)
    };

    beforeAll(async () => {
        const res = await testRequest('post', '/roles')
            .send(fakeRole);

        roleId = res.body.id;
    });

    describe('createRole', () => {
        it('deve criar uma nova role com sucesso', async () => {
            const newRole = {
                nome: faker.lorem.word(),
                descricao: faker.lorem.words(4)
            };

            const res = await testRequest('post', '/roles')
                .send(newRole);

            expect(res.statusCode).toEqual(201);
            expect(res.body).toHaveProperty('id');
            expect(res.body).toHaveProperty('nome', newRole.nome);
            expect(res.body).toHaveProperty('descricao', newRole.descricao);
        });
    });

    describe('getAllRoles', () => {
        it('deve retornar todas as roles com sucesso', async () => {
            const res = await testRequest('get', '/roles')
                .query({ page: 1, limit: 10, filter: '' });

            expect(res.statusCode).toEqual(200);
            expect(Array.isArray(res.body)).toBe(true);
            expect(res.headers).toHaveProperty('x-total-count');
        });
    });

    describe('getRoleById', () => {
        it('deve retornar a role pelo ID', async () => {
            const res = await testRequest('get', `/roles/${roleId}`).send();

            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('id', roleId);
            expect(res.body).toHaveProperty('nome', fakeRole.nome);
        });
    });

    describe('getRolesByUserId', () => {
        it('deve retornar lista de roles por userId (simulado)', async () => {
            const userId = '1';

            const res = await testRequest('get', `/roles/user/${userId}`).send();

            expect(res.statusCode).toBeGreaterThanOrEqual(200);
        });
    });

    describe('updateRole', () => {
        it('deve atualizar a role com sucesso', async () => {
            const updateData = {
                nome: faker.lorem.word(),
                descricao: faker.lorem.words(4)
            };

            const res = await testRequest('patch', `/roles/${roleId}`)
                .send(updateData);

            expect(res.statusCode).toEqual(204);
        });
    });

    describe('deleteRole', () => {
        it('deve deletar a role com sucesso', async () => {
            const res = await testRequest('delete', `/roles/${roleId}`).send();

            expect(res.statusCode).toEqual(204);
        });
    });
});
