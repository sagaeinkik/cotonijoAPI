/*
  Warnings:

  - You are about to alter the column `registered` on the `User` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.

*/
-- AlterTable
ALTER TABLE `User` MODIFY `registered` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0);
