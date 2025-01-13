/*
  Warnings:

  - You are about to drop the column `accessoryId` on the `orderitem` table. All the data in the column will be lost.
  - You are about to drop the column `fabricId` on the `orderitem` table. All the data in the column will be lost.
  - You are about to drop the column `modelId` on the `orderitem` table. All the data in the column will be lost.
  - Added the required column `productId` to the `orderitem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `accessory` DROP FOREIGN KEY `Accessory_artisanId_fkey`;

-- DropForeignKey
ALTER TABLE `accessory` DROP FOREIGN KEY `Accessory_fabricId_fkey`;

-- DropForeignKey
ALTER TABLE `accessoryimage` DROP FOREIGN KEY `AccessoryImage_accessoryId_fkey`;

-- DropForeignKey
ALTER TABLE `artisan` DROP FOREIGN KEY `Artisan_countryId_fkey`;

-- DropForeignKey
ALTER TABLE `fabricimage` DROP FOREIGN KEY `FabricImage_fabricId_fkey`;

-- DropForeignKey
ALTER TABLE `model` DROP FOREIGN KEY `Model_artisanId_fkey`;

-- DropForeignKey
ALTER TABLE `model` DROP FOREIGN KEY `Model_fabricId_fkey`;

-- DropForeignKey
ALTER TABLE `modelimage` DROP FOREIGN KEY `ModelImage_modelId_fkey`;

-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `Order_userId_fkey`;

-- DropForeignKey
ALTER TABLE `orderitem` DROP FOREIGN KEY `OrderItem_accessoryId_fkey`;

-- DropForeignKey
ALTER TABLE `orderitem` DROP FOREIGN KEY `OrderItem_fabricId_fkey`;

-- DropForeignKey
ALTER TABLE `orderitem` DROP FOREIGN KEY `OrderItem_modelId_fkey`;

-- DropForeignKey
ALTER TABLE `orderitem` DROP FOREIGN KEY `OrderItem_orderId_fkey`;

-- DropForeignKey
ALTER TABLE `orderitem` DROP FOREIGN KEY `OrderItem_userId_fkey`;

-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `Product_accessoryId_fkey`;

-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `Product_artisanId_fkey`;

-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `Product_fabricId_fkey`;

-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `Product_modelId_fkey`;

-- DropIndex
DROP INDEX `product_accessoryId_key` ON `product`;

-- DropIndex
DROP INDEX `product_fabricId_key` ON `product`;

-- DropIndex
DROP INDEX `product_modelId_key` ON `product`;

-- AlterTable
ALTER TABLE `orderitem` DROP COLUMN `accessoryId`,
    DROP COLUMN `fabricId`,
    DROP COLUMN `modelId`,
    ADD COLUMN `productId` INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX `orderitem_productId_idx` ON `orderitem`(`productId`);

-- AddForeignKey
ALTER TABLE `accessory` ADD CONSTRAINT `accessory_artisanId_fkey` FOREIGN KEY (`artisanId`) REFERENCES `artisan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `accessory` ADD CONSTRAINT `accessory_fabricId_fkey` FOREIGN KEY (`fabricId`) REFERENCES `fabric`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `accessoryimage` ADD CONSTRAINT `accessoryimage_accessoryId_fkey` FOREIGN KEY (`accessoryId`) REFERENCES `accessory`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `artisan` ADD CONSTRAINT `artisan_countryId_fkey` FOREIGN KEY (`countryId`) REFERENCES `country`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `fabricimage` ADD CONSTRAINT `fabricimage_fabricId_fkey` FOREIGN KEY (`fabricId`) REFERENCES `fabric`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `model` ADD CONSTRAINT `model_artisanId_fkey` FOREIGN KEY (`artisanId`) REFERENCES `artisan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `model` ADD CONSTRAINT `model_fabricId_fkey` FOREIGN KEY (`fabricId`) REFERENCES `fabric`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `modelimage` ADD CONSTRAINT `modelimage_modelId_fkey` FOREIGN KEY (`modelId`) REFERENCES `model`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order` ADD CONSTRAINT `order_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orderitem` ADD CONSTRAINT `orderitem_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orderitem` ADD CONSTRAINT `orderitem_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `order`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orderitem` ADD CONSTRAINT `orderitem_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product` ADD CONSTRAINT `product_accessoryId_fkey` FOREIGN KEY (`accessoryId`) REFERENCES `accessory`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product` ADD CONSTRAINT `product_artisanId_fkey` FOREIGN KEY (`artisanId`) REFERENCES `artisan`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product` ADD CONSTRAINT `product_fabricId_fkey` FOREIGN KEY (`fabricId`) REFERENCES `fabric`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product` ADD CONSTRAINT `product_modelId_fkey` FOREIGN KEY (`modelId`) REFERENCES `model`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `accessory` RENAME INDEX `Accessory_artisanId_fkey` TO `accessory_artisanId_idx`;

-- RenameIndex
ALTER TABLE `accessory` RENAME INDEX `Accessory_fabricId_idx` TO `accessory_fabricId_idx`;

-- RenameIndex
ALTER TABLE `accessoryimage` RENAME INDEX `AccessoryImage_accessoryId_idx` TO `accessoryimage_accessoryId_idx`;

-- RenameIndex
ALTER TABLE `artisan` RENAME INDEX `Artisan_countryId_fkey` TO `artisan_countryId_idx`;

-- RenameIndex
ALTER TABLE `country` RENAME INDEX `Country_name_key` TO `country_name_key`;

-- RenameIndex
ALTER TABLE `fabricimage` RENAME INDEX `FabricImage_fabricId_idx` TO `fabricimage_fabricId_idx`;

-- RenameIndex
ALTER TABLE `model` RENAME INDEX `Model_artisanId_fkey` TO `model_artisanId_idx`;

-- RenameIndex
ALTER TABLE `model` RENAME INDEX `Model_fabricId_idx` TO `model_fabricId_idx`;

-- RenameIndex
ALTER TABLE `modelimage` RENAME INDEX `ModelImage_modelId_idx` TO `modelimage_modelId_idx`;

-- RenameIndex
ALTER TABLE `order` RENAME INDEX `Order_userId_idx` TO `order_userId_idx`;

-- RenameIndex
ALTER TABLE `orderitem` RENAME INDEX `OrderItem_orderId_idx` TO `orderitem_orderId_idx`;

-- RenameIndex
ALTER TABLE `orderitem` RENAME INDEX `OrderItem_userId_idx` TO `orderitem_userId_idx`;

-- RenameIndex
ALTER TABLE `product` RENAME INDEX `Product_artisanId_fkey` TO `product_artisanId_idx`;

-- RenameIndex
ALTER TABLE `user` RENAME INDEX `User_email_key` TO `user_email_key`;

-- RenameIndex
ALTER TABLE `verificationtoken` RENAME INDEX `VerificationToken_token_key` TO `verificationtoken_token_key`;
