import { DataSourceOptions } from "typeorm";

const dbConfig: DataSourceOptions = {
  type: "sqlite",
  database: "server/mhr-database.sqlite",
  synchronize: true,
  logging: true,
  entities: ["server/models/**/*.ts"],
  migrations: ["server/migrations/**/*.ts"],
  subscribers: ["server/subscribers/**/*.ts"],
} ;

export default dbConfig;