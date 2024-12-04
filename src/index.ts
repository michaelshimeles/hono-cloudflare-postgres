import { Pool } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import { Hono } from "hono";
import { products } from "./db/schema";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

export type Env = {
  DATABASE_URL: string;
};

const app = new Hono<{ Bindings: Env }>();

app.get("/", zValidator("query", z.object({})), async (c) => {
  try {
    const client = new Pool({ connectionString: c.env.DATABASE_URL });

    const db = drizzle(client);

    const result = await db.select().from(products);

    return c.json({
      result,
    });
  } catch (error) {
    console.log(error);
    return c.json(
      {
        error,
      },
      400
    );
  }
});

export default app;
