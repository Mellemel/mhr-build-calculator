import { DataBase } from ".";
import { getClientDBConfig, loadEntities } from "./configuration";
// @ts-expect-error
import sqlWasm from "sql.js/dist/sql-wasm.wasm";
import initSqlJs from 'sql.js';

export class ClientDatabase extends DataBase {
  public static async initialize() {
    const data = await fetch(`${process.env.PUBLIC_URL}/mhr-database.sqlite`);
    const dataBuffer = await data.arrayBuffer();
    const database = new Uint8Array(dataBuffer);
    const driver = await initSqlJs({ locateFile: () => sqlWasm });
    const entities = await loadEntities();
    const config = getClientDBConfig(database, driver, entities);
    await super.initialize(config);
  }
}