import { drizzle } from 'drizzle-orm/d1'
import * as schema from './schema.ts'
import { env } from 'cloudflare:workers'

// Use D1 database directly - no fallbacks to catch real issues
if (!env.DB) {
  throw new Error('D1 database binding not found. Make sure wrangler.jsonc is configured correctly and you are running with proper Wrangler integration.')
}

export const db = drizzle(env.DB, { schema })
