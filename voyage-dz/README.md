# Voyage DZ

Voyage DZ is a travel package discovery platform for Algeria, connecting users with the best travel agencies and packages the country has to offer. This project is built with a modern web stack, providing a seamless experience for both travelers and agency partners.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (with App Router)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) & [Shadcn/UI](https://ui.shadcn.com/)
- **ORM:** [Prisma](https://www.prisma.io/)
- **Database:** [PostgreSQL](https://www.postgresql.org/)
- **Authentication:** [NextAuth.js](https://next-auth.js.org/)
- **Form Management:** [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
- **TypeScript**

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v20 or later)
- [Docker](https://www.docker.com/products/docker-desktop/)

### 1. Clone the repository

```bash
git clone https://github.com/your-username/voyage-dz.git
cd voyage-dz
```

### 2. Set up environment variables

Create a `.env` file in the `voyage-dz` directory by copying the example file:

```bash
cp .env.example .env
```

Update the `DATABASE_URL` in the `.env` file with your PostgreSQL connection string.

### 3. Install dependencies

```bash
npm install
```

### 4. Start the database

Run the PostgreSQL database in a Docker container:

```bash
docker-compose up -d
```

### 5. Apply database schema

Push the Prisma schema to your database. This will also create the necessary tables.

```bash
npx prisma db push
```

### 6. Seed the database (optional)

To populate the database with sample data, run the seed script:

```bash
npm run seed
```

### 7. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Features Implemented

- **User Authentication:** Agencies can sign up and log in to their dashboard using NextAuth.js.
- **Agency Dashboard:** A protected area for agencies to manage their packages.
- **Package Management:** Agencies can create, read, update, and delete their travel packages.
- **Package Discovery:** Public pages for users to browse and view agencies and their packages.
- **API Routes:** A set of API endpoints for managing agencies and packages.

## Project Structure

- `prisma/`: Contains the Prisma schema and seed script.
- `src/app/`: The main application directory, following the Next.js App Router structure.
  - `(auth)/`: Routes related to authentication (login, register).
  - `api/`: API routes for the application.
  - `dashboard/`: Protected routes for the agency dashboard.
  - `agencies/` & `packages/`: Public pages for discovering agencies and packages.
- `src/components/`: Reusable React components, built with Shadcn/UI.
- `src/lib/`: Core application logic, including database connection (`db.ts`) and authentication (`auth.ts`).
- `scripts/`: Additional scripts, such as sitemap generation.
