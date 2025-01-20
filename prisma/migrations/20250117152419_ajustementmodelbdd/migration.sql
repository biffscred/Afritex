/*
  Warnings:

  - Added the required column `productId` to the `model` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `model` ADD COLUMN `productId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `model` ADD CONSTRAINT `model_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
