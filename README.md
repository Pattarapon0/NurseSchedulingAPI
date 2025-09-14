# 🏥 Nurse Scheduling API

A NestJS-based REST API for managing Nurse schedules, built with TypeScript and PostgreSQL.

## ✨ Features

- 🔐 **JWT Authentication** - Login for nurses and head nurses
- 📅 **Shift Management** - Create and assign shifts 
- 📝 **Leave Requests** - Request and approve/reject leave
- 👥 **Role-based Access** - Different permissions for nurses vs head nurses
- 📊 **Personal Schedule** - View your assigned shifts

## 🚀 Tech Stack

- **NestJS 11** - Node.js framework
- **TypeScript** - Type safety
- **Prisma** - Database ORM
- **PostgreSQL** - Database
- **JWT** - Authentication
- **Argon2** - Password hashing

## 📁 API Structure

```
/api/v1/
├── auth/
│   ├── POST /login
│   └── POST /register
├── shifts/              (head nurse only)
│   ├── GET /
│   └── POST /
├── shift-assignments/   (head nurse only)
│   └── POST /
├── leave-requests/
│   ├── GET /           (head nurse only)
│   ├── POST /          (nurse only)
│   └── PATCH /:id/approve (head nurse only)
├── my-schedule/        (nurse only)
│   └── GET /
└── nurses/             (head nurse only)
    └── GET /
```

## 🛠️ Setup

1. **Install dependencies**
   ```bash
   pnpm install
   ```

2. **Environment variables**
   Create `.env` file:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/db"
   DIRECT_URL="postgresql://user:password@localhost:5432/db"
   JWT_SECRET="your-secret-key"
   FRONTEND_URL="http://localhost:3000"
   ```

3. **Database setup**
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

4. **Start the server**
   ```bash
   # Development
   pnpm start:dev
   
   # Production  
   pnpm start:prod
   ```

5. **API ready at** `http://localhost:3000/api/v1`

## 🔑 Quick Test

**Register a head nurse:**
```bash
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Head Nurse",
    "email": "head@hospital.com", 
    "password": "password123",
    "role": "head_nurse"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "head@hospital.com",
    "password": "password123"
  }'
```

## 📋 Database Schema

**Users:** id, name, email, password, role (nurse/head_nurse)
**Shifts:** id, date, start_time, end_time  
**Shift Assignments:** user_id, shift_id
**Leave Requests:** shift_assignment_id, reason, status, approved_by

## 🔒 Authentication

- All endpoints require JWT token except `/auth/login` and `/auth/register`
- Add header: `Authorization: Bearer <token>`
- Tokens expire in 24 hours

## 👥 Roles

**Nurse can:**
- View their schedule (`/my-schedule`)
- Create leave requests (`/leave-requests`)

**Head Nurse can:**
- Create shifts (`/shifts`)
- Assign nurses to shifts (`/shift-assignments`) 
- View all leave requests (`/leave-requests`)
- Approve/reject leave requests (`/leave-requests/:id/approve`)
- View all nurses (`/nurses`)

## 📝 License

MIT