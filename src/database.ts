import { Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";
import { Database } from "./types";

// it is possible to run migrations using kysely, doc: https://kysely.dev/docs/migrations

const dialect = new PostgresDialect({
  pool: new Pool({
    database: "postgres",
    host: "localhost",
    user: "postgres",
    password: "1234",
    port: 5432,
    max: 10,
  }),
});

export const db = new Kysely<Database>({
  dialect,
});
