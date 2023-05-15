import { SqlJsStatic } from "sql.js";
import { DataSourceOptions } from "typeorm";


export const dbConfig: DataSourceOptions = {
  type: "sqlite",
  database: "../public/mhr-database.sqlite",
  synchronize: true,
  logging: true,
  entities: ["server/models/**/*.ts"],
  migrations: ["server/migrations/**/*.ts"],
  subscribers: ["server/subscribers/**/*.ts"],
};

export const getClientDBConfig = (database: Uint8Array, driver: SqlJsStatic): DataSourceOptions => {
  return {
    type: "sqljs",
    database,
    driver,
    entities: ["server/models/**/*.ts"],
    migrations: ["server/migrations/**/*.ts"],
    subscribers: ["server/subscribers/**/*.ts"],
    logging: true,
    synchronize: true,
  }
}