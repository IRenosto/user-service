import { faker } from '@faker-js/faker/locale/pt_BR';
import { testRequest } from './jest.setup';

describe('Usuarios - integração', () => {
  let userId = '';
  const plainPassword = '123456';

  const user = {
    nome: faker.person.firstName(),
    sobrenome: faker.person.lastName(),
    email: faker.internet.email(),
    senha: plainPassword
  };

  it('deve criar usuário com sucesso', async () => {
    const res = await testRequest('post', '/usuarios').send(user);
    userId = res.body.id || res.body;

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('nome', user.nome);
    expect(res.body).toHaveProperty('email', user.email);
  });

  it('deve obter todos os usuários', async () => {
    const res = await testRequest('get', '/usuarios').send();
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it('deve obter usuário por ID', async () => {
    const res = await testRequest('get', `/usuarios/${userId}`).send();
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id', userId);
  });

  it('deve atualizar usuário', async () => {
    const updatedUser = {
      nome: 'NovoNome',
      sobrenome: 'NovoSobrenome'
    };

    const res = await testRequest('patch', `/usuarios/${userId}`).send(updatedUser);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('nome', updatedUser.nome);
    expect(res.body).toHaveProperty('sobrenome', updatedUser.sobrenome);
  });


  it('deve atualizar roles e permissões do usuário', async () => {
    const res = await testRequest('patch', `/usuarios/${userId}/permissoes`).send({
      roles: [1],
      permissoes: [1, 4]
    });
    expect(res.statusCode).toEqual(204);
  });

  it('deve copiar roles e permissões para outro usuário', async () => {
    const user2 = {
      nome: faker.person.firstName(),
      sobrenome: faker.person.lastName(),
      email: faker.internet.email(),
      senha: plainPassword
    };

    const user3 = {
      nome: faker.person.firstName(),
      sobrenome: faker.person.lastName(),
      email: faker.internet.email(),
      senha: plainPassword
    };
    const res2 = await testRequest('post', '/usuarios').send(user2);
    const user2Id = res2.body.id || res2.body;

    await testRequest('patch', `/usuarios/${user2Id}/permissoes`).send({
      roles: [1]
    });

    const res3 = await testRequest('post', '/usuarios').send(user3);
    const user3Id = res3.body.id || res3.body;

    const res = await testRequest('post', `/usuarios/copiar/permissoes`).send({
      usuarioId: user3Id,
      usuarioReferenciaId: user2Id
    });
    expect(res.statusCode).toEqual(200);

    await testRequest('delete', `/usuarios/${user2Id}`).send();
  });

  it('deve obter usuário auth pelo email', async () => {
    const res = await testRequest('post', '/usuarios/email').send({ email: user.email });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('senha');
  });

  it('deve obter permissões do usuário', async () => {
    const res = await testRequest('get', `/usuarios/permissoes/${userId}`).send();
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeDefined();
  });

  it('deve obter roles e permissões separadamente', async () => {
    const res = await testRequest('get', `/usuarios/rolesPermissoesSeparado/${userId}`).send();
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('roles');
    expect(res.body).toHaveProperty('permissoes');
  });

  it('deve atualizar data de login do usuário', async () => {
    const res = await testRequest('patch', `/usuarios/${userId}/updateLogin`).send();
    expect(res.statusCode).toEqual(204);
  });

  it('deve apagar usuário com sucesso', async () => {
    const res = await testRequest('delete', `/usuarios/${userId}`).send();
    expect(res.statusCode).toEqual(204);
  });
});
