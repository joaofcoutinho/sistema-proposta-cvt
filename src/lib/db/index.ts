import { neon } from "@neondatabase/serverless";
import { drizzle, type NeonHttpDatabase } from "drizzle-orm/neon-http";

import * as schema from "./schema";

type DB = NeonHttpDatabase<typeof schema>;

let instance: DB | undefined;

function getDb(): DB {
  if (instance) return instance;

  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      "DATABASE_URL não definida. Copie .env.example para .env e preencha a connection string do Neon.",
    );
  }

  instance = drizzle(neon(url), { schema });
  return instance;
}

/**
 * Cliente Drizzle. A conexão é inicializada de forma preguiçosa no primeiro
 * uso — assim o módulo pode ser importado durante o build sem DATABASE_URL.
 */
export const db = new Proxy({} as DB, {
  get(_target, prop) {
    const real = getDb();
    const value = Reflect.get(real, prop, real);
    return typeof value === "function" ? value.bind(real) : value;
  },
});

export type Database = DB;
