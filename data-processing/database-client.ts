import { DataBase } from "./database";
import { getClientDBConfig } from "./database-configurations";

export class ClientDatabase extends DataBase {
  public static async initialize() {
    const data = await fetch("./mhr-database.sqlite");
    const dataBuffer = await data.arrayBuffer();
    const database = new Uint8Array(dataBuffer);
    const config = getClientDBConfig(database);
    super.initialize(config);
  }
}