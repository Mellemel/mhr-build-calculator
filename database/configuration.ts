import { SqlJsStatic } from "sql.js";
import { BaseEntity, DataSourceOptions, EntitySchema, MixedList } from "typeorm";

export const dbConfig: DataSourceOptions = {
  type: "sqlite",
  database: "../public/mhr-database.sqlite",
  synchronize: true,
  logging: true,
  entities: ["models/**/*.ts"],
};

export const getClientDBConfig = (database: Uint8Array, driver: SqlJsStatic, entities: MixedList<string | Function | EntitySchema<any>>): DataSourceOptions => {
  return {
    type: "sqljs",
    database,
    driver,
    logging: true,
    synchronize: true,
    entities,
  }
}

export async function loadEntities(): Promise<any[]> {
  const entityContext = require.context('./models', true, /\.ts$/);
  const entityPaths = entityContext.keys();

  const entities = await Promise.all(
    entityPaths.map(async (entityPath: string) => {
      const module = await import(`./models/${entityPath.slice(2)}`);
      return Object.values(module).filter((entity: any) => entity.prototype instanceof BaseEntity);
    })
  );
  return entities.flat();
}