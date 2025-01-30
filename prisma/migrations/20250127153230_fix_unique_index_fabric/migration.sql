/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `fabric` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `fabric_name_key` ON `fabric`(`name`);
