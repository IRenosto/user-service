import { setSeederFactory } from 'typeorm-extension';
import { passwordCrypto } from '../../shared/services';
import { Usuario } from '../entities';

export default setSeederFactory(Usuario, async (faker) => {
    const user = new Usuario();

    user.nome = faker.person.firstName();
    user.sobrenome = faker.person.lastName();
    user.email = faker.internet.email({ firstName: user.nome, lastName: user.sobrenome });
    user.ativo = faker.datatype.boolean();
    user.senha = await passwordCrypto(faker.internet.password());
    user.usuario_atualizador = 'seed';
    user.usuario_cadastrador = 'seed';

    return user;
});