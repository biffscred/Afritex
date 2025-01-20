/*
  Warnings:

  - A unique constraint covering the columns `[productId]` on the table `fabric` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `productId` to the `fabric` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `fabric` ADD COLUMN `productId` INTEGER NOT NULL;


-- CreateIndex
CREATE UNIQUE INDEX `fabric_productId_key` ON `fabric`(`productId`);

-- AddForeignKey
ALTER TABLE `fabric` ADD CONSTRAINT `fabric_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
