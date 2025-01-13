/*
  Warnings:

  - You are about to drop the column `userId` on the `orderitem` table. All the data in the column will be lost.
  - You are about to drop the column `accessoryId` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `fabricId` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `modelId` on the `product` table. All the data in the column will be lost.
  - Made the column `orderId` on table `orderitem` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `orderitem` DROP FOREIGN KEY `orderitem_orderId_fkey`;

-- DropForeignKey
ALTER TABLE `orderitem` DROP FOREIGN KEY `orderitem_userId_fkey`;

-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `product_accessoryId_fkey`;

-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `product_fabricId_fkey`;

-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `product_modelId_fkey`;

-- AlterTable
ALTER TABLE `accessory` MODIFY `fabricId` INTEGER NULL;

-- AlterTable
ALTER TABLE `model` MODIFY `fabricId` INTEGER NULL;

-- AlterTable
ALTER TABLE `orderitem` DROP COLUMN `userId`,
    MODIFY `orderId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `product` DROP COLUMN `accessoryId`,
    DROP COLUMN `fabricId`,
    DROP COLUMN `modelId`;

-- AddForeignKey
ALTER TABLE `orderitem` ADD CONSTRAINT `orderitem_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `order`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
