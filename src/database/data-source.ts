import 'dotenv/config';
import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

const port = process.env.DB_PORT as unknown as number;

const options: DataSourceOptions & SeederOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: port,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    synchronize: false,
    entities: [`${__dirname}/entities/**/*.{ts,js}`],
    migrations: [`${__dirname}/migrations/**/*.{ts,js}`],
    seeds: [`${__dirname}/seeds/**/*.{ts,js}`],
    factories: [`${__dirname}/factories/**/*.{ts,js}`],
    seedTracking: false,
};

export const AppDataSource = new DataSource(options);