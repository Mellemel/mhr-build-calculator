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
  private static client: DataSource;

  private constructor(){}

  public static async initialize() {
    this.client = await AppDataSource.initialize();
  }

  public static async getClient() {
    if (!this.client) {
      await this.initialize();
    }
    return this.client;
  }
}