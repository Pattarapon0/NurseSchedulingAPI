# Hospital Scheduling API

A NestJS-based REST API for managing hospital nurse scheduling, shift assignments, and leave requests.

## Purpose

This API provides:
- **Authentication** - JWT-based login for nurses and head nurses
- **Shift Management** - Create and assign shifts to nurses
- **Leave Requests** - Nurses can request leave, head nurses can approve/reject
- **Schedule View** - Personal schedule overview for nurses

## Tech Stack

- **NestJS** with TypeScript
- **Prisma ORM** with PostgreSQL
- **JWT Authentication** with Argon2 password hashing
- **Role-based Authorization** (nurse vs head_nurse)

## Setup

1. **Install dependencies**
   ```bash
   pnpm install
   ```

2. **Environment variables**
   Create `.env` file:
   ```
   DATABASE_URL="your-postgresql-url"
   DIRECT_URL="your-direct-url"
   JWT_SECRET="your-jwt-secret"
   ```

3. **Database setup**
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

4. **Run the application**
   ```bash
   # Development
   pnpm run start:dev
   
   # Production
   pnpm run start:prod
   ```

## License

MIT