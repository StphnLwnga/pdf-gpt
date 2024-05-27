This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).


## Setup

### Prerequisites

1. Node.js
1. Pnpm package manager
1. Supabase account
1. Docker
1. Unstructured API key

### Install the project's dependencies:

```bash
pnpm install
```

### Environment Configuration

Rename the `.env.sample` file in the root directory to `.env`


### Database Setup in Supabase

Create a project in Supabase. 

Navigate to your projects homepage (https://supabase.com/dashboard/project/<YOUR_PROJECT_ID>). 

Click `🔌 connect` in the top right corner. In the opened dialog, navigate to the **`ORMs`** tab and select **`Prisma`** from the **`Tools`** dropdown.

Copy the values of **`DATABASE_URL`** and **`DIRECT_URL`** from **`.env.local`** into your `.env` file.

Add `?pgbouncer=true&connection_limit=1` to the end of **`DATABASE_URL`** connection string.

### Prisma Setup

Push the schema to the database and generate a Prisma client

```sh
pnpm prisma db push
```

```sh
pnpm prisma generate
```

### Starting Unstructured with Docker

Start a local instance of Unstructured with the following Docker command:

```bash
docker run -p 8000:8000 -d --rm --name unstructured-api quay.io/unstructured-io/unstructured-api:latest --port 8000 --host 0.0.0.0
```

Obtain an API key by registering your details on [Unstructured](https://unstructured.io/api-key-hosted) and save it to your `.env`.

### Supabase Type Generation

Login via CLI:

```bash
npx supabase login
```

Add your project ID to the Supabase generate types script in `package.json`. The value of `<YOUR_PROJECT_ID>` can be obtained from the projects URL. i.e. https://supabase.com/dashboard/project/<YOUR_PROJECT_ID>.

```json
{
	// ...
  "gen:supabase:types": "mkdir lib/generated && touch lib/generated/db-types.d.ts && npx supabase gen types typescript --schema public > lib/generated/db-types.d.ts --project-id <YOUR_PROJECT_ID>"
	// ...
}
```

The run
```bash
pnpm gen:supabase:types
```

## Getting Started

First, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
