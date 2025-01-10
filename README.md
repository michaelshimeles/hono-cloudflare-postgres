# Hono Backend Starter Kit

A modern, high-performance backend starter template built with [Hono](https://hono.dev/), featuring PostgreSQL integration with Drizzle ORM and deployment ready for Cloudflare Workers.

## Features

- **Hono Framework**: Ultra-fast web framework for edge computing
- **Database Integration**: PostgreSQL support with Drizzle ORM
- **Type Safety**: Full TypeScript support with Zod validation
- **Edge Ready**: Configured for Cloudflare Workers deployment
- **Migration Tools**: Database migrations with Drizzle Kit
- **Modern Stack**: Uses latest versions of all dependencies

## Prerequisites

- [Bun](https://bun.sh) Runtime
- Node.js (v18 or later)
- PostgreSQL database (I recommend [Neon](https://fyi.neon.tech/2rm) for serverless PostgreSQL)
- Cloudflare account (for deployment)

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/michaelshimeles/hono-starter-kit.git
cd hono-backend
```

2. Install dependencies:
```bash
bun install
```

3. Set up environment variables:
   - Copy `.dev.vars.example` to `.dev.vars`
   - Add your database URL:
```env
DATABASE_URL=your_postgresql_connection_string
```

4. Run database migrations:
```bash
npx drizzle-kit generate
npx drizzle-kit push
```

5. Start the development server:
```bash
bun run dev
```

The server will start on `http://localhost:8787`

## Project Structure

```
hono-backend/
├── src/
│   ├── index.ts        # Main application entry
│   └── db/
│       └── schema.ts   # Database schema definitions
├── drizzle/            # Database migrations
├── .dev.vars.example   # Example environment variables
├── drizzle.config.ts   # Drizzle ORM configuration
├── migrate.ts          # Migration script
├── wrangler.toml       # Cloudflare Workers configuration
└── package.json
```

## Available Scripts

- `bun run dev` - Start development server with Wrangler
- `bun run deploy` - Deploy to Cloudflare Workers
- `npx drizzle-kit generate` - Generate database migrations
- `npx drizzle-kit push` - Create table(s)

## Database Schema

The starter includes a sample products table with the following schema:

```typescript
products {
  id: serial (primary key)
  name: text
  description: text
  price: double precision
}
```

## API Endpoints

- `GET /` - Fetch all products from the database

All endpoints use Zod for request validation.

## Tech Stack

- [Hono](https://hono.dev/) - Web framework
- [Drizzle ORM](https://orm.drizzle.team/) - Database ORM
- [Neon Database](https://neon.tech/) - Serverless PostgreSQL
- [Zod](https://zod.dev/) - TypeScript-first schema validation
- [Cloudflare Workers](https://workers.cloudflare.com/) - Edge computing platform
- [Bun](https://bun.sh) - JavaScript runtime & package manager

## Deployment

This template is configured for deployment to Cloudflare Workers:

```bash
bun run deploy
```

Make sure to set up your environment variables in your Cloudflare Workers dashboard.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
