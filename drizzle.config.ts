import { defineConfig } from 'drizzle-kit'
import { readdirSync } from 'fs'
import { resolve } from 'path'

function getLocalD1DB(): string {
  try {
    const basePath = resolve('.wrangler/state/v3/d1/miniflare-D1DatabaseObject')
    const dbFile = readdirSync(basePath, { encoding: 'utf-8' })
      .find((f) => f.endsWith('.sqlite'))

    if (!dbFile) throw new Error(`.sqlite file not found in ${basePath}`)

    return resolve(basePath, dbFile)
  } catch (err) {
    console.error(`Error finding local D1 database: ${(err as Error).message}`)
    throw err
  }
}

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema.ts',
  dialect: 'sqlite',
  dbCredentials: {
    url: getLocalD1DB(),
    // url: "."
  },
})
