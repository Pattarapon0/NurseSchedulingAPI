-- CreateEnum
CREATE TYPE "public"."role" AS ENUM ('nurse', 'head_nurse');

-- CreateEnum
CREATE TYPE "public"."leave_status" AS ENUM ('pending', 'approved', 'rejected');

-- CreateTable
CREATE TABLE "public"."users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "public"."role" NOT NULL DEFAULT 'nurse',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."shifts" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "shifts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."shift_assignments" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "shift_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "shift_assignments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."leave_requests" (
    "id" TEXT NOT NULL,
    "shift_assignment_id" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "status" "public"."leave_status" NOT NULL DEFAULT 'pending',
    "approved_by" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "leave_requests_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "shift_assignments_user_id_key" ON "public"."shift_assignments"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "shift_assignments_user_id_shift_id_key" ON "public"."shift_assignments"("user_id", "shift_id");

-- CreateIndex
CREATE UNIQUE INDEX "leave_requests_shift_assignment_id_key" ON "public"."leave_requests"("shift_assignment_id");

-- AddForeignKey
ALTER TABLE "public"."shift_assignments" ADD CONSTRAINT "shift_assignments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."shift_assignments" ADD CONSTRAINT "shift_assignments_shift_id_fkey" FOREIGN KEY ("shift_id") REFERENCES "public"."shifts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."leave_requests" ADD CONSTRAINT "leave_requests_shift_assignment_id_fkey" FOREIGN KEY ("shift_assignment_id") REFERENCES "public"."shift_assignments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
