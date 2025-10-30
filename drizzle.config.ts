import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema.ts',
  dialect: 'sqlite',
  dbCredentials: {
    url: './db.sqlite3',
  },
  ...(process.env.NODE_ENV === 'production' && {
    driver: 'd1-http',
    dbCredentials: {
      accountId: process.env.CLOUDFLARE_D1_ACCOUNT_ID,
      databaseId: process.env.CLOUDFLARE_D1_DATABASE_ID,
      token: process.env.CLOUDFLARE_D1_API_TOKEN,
    },
  }),
})
