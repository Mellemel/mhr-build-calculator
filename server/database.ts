import { DataSource } from "typeorm";

const AppDataSource = new DataSource({
  type: "sqlite",
  database: "server/sqlite-mhr-database",
  synchronize: true,
  logging: true,
  entities: ["server/models/**/*.ts"],
  migrations: ["server/migrations/**/*.ts"],
  subscribers: ["server/subscribers/**/*.ts"],
})

export class Database {
  private static instance: DataSource;

  private constructor(){}

  public static async initialize() {
    if (!Database.instance) {
      Database.instance = await AppDataSource.initialize();
    }
    return Database.instance;
  }
}