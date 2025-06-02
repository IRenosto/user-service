import 'reflect-metadata';
import { AppDataSource } from './database/data-source';
import { server } from './server';
import { criarRolesEPermissoes, criarUsuarioAdmin } from './shared/services';

AppDataSource.initialize().then(async () => {

    console.log(`\nBanco de dados conectado\n`);

    server.listen(process.env.PORT, async () => {
        await criarRolesEPermissoes();
        await criarUsuarioAdmin();
        console.log(`User Service rodando no endereço: http://${process.env.HOST}:${process.env.PORT}\n`);
    });

}).catch(err => console.error('Error initializing Data Source:', err));
