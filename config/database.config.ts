import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const envName = process.env.NODE_ENV || 'development';
const databaseName = `shortener_${envName}`;



export const sqlite_configuration: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: `db/${databaseName}`,
  synchronize: false,
  migrationsRun: false,
  logging: (process.env.NODE_ENV !== 'test'),
  entities: ['dist/src/**/*.entity.js'],
  migrations: ['dist/db/migrations/**/*.js'],
  cli: {
    migrationsDir: 'db/migrations',
  },
};

export const configuration: TypeOrmModuleOptions = {
  type: 'postgres',
  database: `${databaseName}`,
  port: 5432,
  username: 'postgres',
  password: 'odiF2t11#',
  synchronize: false,  
  migrationsRun: false,
  logging: (process.env.NODE_ENV !== 'test'),
  entities: ['dist/src/**/*.entity.js'],
  migrations: ['dist/db/migrations/**/*.js'],
  cli: {
    migrationsDir: 'db/migrations',
  },
};