import { readdirSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig } from "drizzle-kit";

function getLocalD1DB(): string {
  const basePath = resolve(".wrangler/state/v3/d1/miniflare-D1DatabaseObject");
  const dbFile = readdirSync(basePath, { encoding: "utf-8" }).find((f) =>
    f.endsWith(".sqlite")
  );

  if (!dbFile) {
    throw new Error(`.sqlite file not found in ${basePath}`);
  }

  return resolve(basePath, dbFile);
}

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema.ts",
  dialect: "sqlite",
  dbCredentials: {
    url: getLocalD1DB(),
    // url: "."
  },
});
