import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Usuario } from '../entities';

export default class UserSeeder implements Seeder {

    track = false;

    public async run(_dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {

        const userFactory = factoryManager.get(Usuario);
    
        await userFactory.saveMany(10);
    }
}
