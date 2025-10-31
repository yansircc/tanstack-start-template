import { existsSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig } from "drizzle-kit";

function getLocalD1DB(): string {
  const basePath = resolve(".wrangler/state/v3/d1/miniflare-D1DatabaseObject");

  // Check if the directory exists
  if (!existsSync(basePath)) {
    // Return a temporary path for initial setup
    return "./.temp-db.sqlite";
  }

  try {
    const dbFile = readdirSync(basePath, { encoding: "utf-8" }).find((f) =>
      f.endsWith(".sqlite")
    );

    if (!dbFile) {
      // Return a temporary path if no sqlite file found
      return "./.temp-db.sqlite";
    }

    return resolve(basePath, dbFile);
  } catch (error) {
    // Fallback to temporary path if directory reading fails
    console.warn(
      "Warning: Could not read D1 database directory, using temporary path"
    );
    return "./.temp-db.sqlite";
  }
}

// Check if we're in production/remote mode
const isRemote =
  process.env.D1_DATABASE_ID || process.env.NODE_ENV === "production";

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema.ts",
  dialect: "sqlite",
  dbCredentials: isRemote
    ? {
        url: process.env.D1_DATABASE_URL || ".",
      }
    : {
        url: getLocalD1DB(),
      },
});
