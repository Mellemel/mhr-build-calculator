import { DataSourceOptions } from "typeorm";

export const dbConfig: DataSourceOptions = {
  type: "sqlite",
  database: "server/mhr-database.sqlite",
  synchronize: true,
  logging: true,
  entities: ["server/models/**/*.ts"],
  migrations: ["server/migrations/**/*.ts"],
  subscribers: ["server/subscribers/**/*.ts"],
};

export const getClientDBConfig = (database: Uint8Array): DataSourceOptions => {
  return {
    type: "sqljs",
    database,
    location: "browser",
    autoSave: false,
    entities: ["server/models/**/*.ts"],
    migrations: ["server/migrations/**/*.ts"],
    subscribers: ["server/subscribers/**/*.ts"],
    logging: true,
    synchronize: true,
    migrationsRun: true,
    dropSchema: true,
    cache: true,
  }
}