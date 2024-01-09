/*
  Warnings:

  - You are about to drop the column `contactNumber` on the `bookings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "bookings" DROP COLUMN "contactNumber",
ADD COLUMN     "phoneNumber" TEXT;
