import { DataBase } from ".";
import { getClientDBConfig } from "./configuration";
// tslint:disable-next-line
// import sqlWasm from "sql.js/dist/sql-wasm.wasm";
import initSqlJs from 'sql.js';

export class ClientDatabase extends DataBase {
  public static async initialize() {
    console.log("Initializing client database", `${process.env.PUBLIC_URL}/mhr-database.sqlite`);
    const data = await fetch(`${process.env.PUBLIC_URL}/mhr-database.sqlite`);
    const dataBuffer = await data.arrayBuffer();
    const database = new Uint8Array(dataBuffer);
    const driver = await initSqlJs();
    const config = getClientDBConfig(database, driver);
    console.log(config);
    await super.initialize(config);
  }
}