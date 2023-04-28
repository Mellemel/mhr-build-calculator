import { DataSource } from "typeorm";

const AppDataSource = new DataSource({
  type: "sqlite",
  database: "main",
  synchronize: true,
  logging: true,
  entities: ["src/models/**/*.ts"],
  migrations: ["src/migrations/**/*.ts"],
  subscribers: ["src/subscribers/**/*.ts"],
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