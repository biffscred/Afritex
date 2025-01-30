/*
  Warnings:

  - A unique constraint covering the columns `[productId]` on the table `accessory` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `productId` to the `accessory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `accessory` ADD COLUMN `productId` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `accessory_productId_key` ON `accessory`(`productId`);
