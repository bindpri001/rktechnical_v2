-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN', 'SUPERADMIN');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "password" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'USER',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Staff" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "designation" TEXT NOT NULL,
    "qualification" TEXT,
    "experience" INTEGER,
    "phone" TEXT,
    "email" TEXT,
    "address" TEXT,
    "photoUrl" TEXT,
    "photoPublicId" TEXT,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Staff_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Student" (
    "id" TEXT NOT NULL,
    "registrationNo" TEXT NOT NULL,
    "certificateNo" TEXT NOT NULL,
    "studentName" TEXT NOT NULL,
    "fatherName" TEXT NOT NULL,
    "motherName" TEXT,
    "photoUrl" TEXT,
    "photoPublicId" TEXT,
    "address" TEXT NOT NULL,
    "contactNo" TEXT NOT NULL,
    "dob" TIMESTAMP(3) NOT NULL,
    "gender" "Gender" NOT NULL,
    "aadhaarNo" TEXT,
    "qualification" TEXT,
    "courseName" TEXT NOT NULL,
    "courseDuration" INTEGER NOT NULL,
    "admissionDate" TIMESTAMP(3) NOT NULL,
    "completionDate" TIMESTAMP(3) NOT NULL,
    "certificateIssueDate" TIMESTAMP(3),
    "percentage" DECIMAL(5,2) NOT NULL,
    "grade" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_username_idx" ON "User"("username");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Staff_email_key" ON "Staff"("email");

-- CreateIndex
CREATE INDEX "Staff_displayOrder_idx" ON "Staff"("displayOrder");

-- CreateIndex
CREATE INDEX "Staff_fullName_idx" ON "Staff"("fullName");

-- CreateIndex
CREATE INDEX "Staff_designation_idx" ON "Staff"("designation");

-- CreateIndex
CREATE UNIQUE INDEX "Student_registrationNo_key" ON "Student"("registrationNo");

-- CreateIndex
CREATE UNIQUE INDEX "Student_certificateNo_key" ON "Student"("certificateNo");

-- CreateIndex
CREATE INDEX "Student_studentName_idx" ON "Student"("studentName");

-- CreateIndex
CREATE INDEX "Student_registrationNo_idx" ON "Student"("registrationNo");

-- CreateIndex
CREATE INDEX "Student_certificateNo_idx" ON "Student"("certificateNo");

-- CreateIndex
CREATE INDEX "Student_aadhaarNo_idx" ON "Student"("aadhaarNo");

-- CreateIndex
CREATE INDEX "Student_courseName_idx" ON "Student"("courseName");

-- CreateIndex
CREATE INDEX "Student_completionDate_idx" ON "Student"("completionDate");

-- CreateIndex
CREATE INDEX "Student_certificateIssueDate_idx" ON "Student"("certificateIssueDate");
