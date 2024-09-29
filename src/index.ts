import { Pool } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import { Hono } from 'hono';
import { products } from './db/schema';

export type Env = {
  DATABASE_URL: string;
};

const app = new Hono<{ Bindings: Env }>();

app.get('/', async (c) => {
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