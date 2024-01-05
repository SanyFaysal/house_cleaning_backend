/*
  Warnings:

  - A unique constraint covering the columns `[scheduleId]` on the table `bookings` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "bookings_scheduleId_key" ON "bookings"("scheduleId");
