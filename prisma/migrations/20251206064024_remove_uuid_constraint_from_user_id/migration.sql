/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- Drop foreign key constraints first
ALTER TABLE "Account" DROP CONSTRAINT "Account_userId_fkey";
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- Convert User.id from UUID to TEXT
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- Convert Account.userId and Session.userId from UUID to TEXT
ALTER TABLE "Account" ALTER COLUMN "userId" SET DATA TYPE TEXT;
ALTER TABLE "Session" ALTER COLUMN "userId" SET DATA TYPE TEXT;

-- Re-add foreign key constraints
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

