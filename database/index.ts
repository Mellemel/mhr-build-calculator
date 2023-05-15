import { DataSourceOptions, DataSource } from "typeorm";

export class DataBase {
  private static config: DataSourceOptions;
  private static client: DataSource;

  public static async initialize(config: DataSourceOptions) {
    this.config = config;
    const AppDataSource = new DataSource(this.config)
    this.client = await AppDataSource.initialize();
  }
  public static async getClient() {
    if (!this.config) {
      throw new Error("Please supply a config in #initialize to initialize the database");
    }
    if (!this.client) {
      await this.initialize(this.config);
    }
    return this.client;
  }
}