import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db";
import { todos, users, verifications, accounts, sessions } from "@/db/schema";
import { env } from "cloudflare:workers";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "sqlite", // or "pg" or "mysql"
    schema: {
      todos,
      users,
      verifications,
      accounts,
      sessions
    },
    usePlural: true
  }), 
    socialProviders: {
        google: { 
            clientId: env.GOOGLE_CLIENT_ID, 
            clientSecret: env.GOOGLE_CLIENT_SECRET, 
        }, 
    },
});