/*
  Warnings:

  - Added the required column `price` to the `fabric` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `fabric` ADD COLUMN `price` DOUBLE NOT NULL DEFAULT 0;
