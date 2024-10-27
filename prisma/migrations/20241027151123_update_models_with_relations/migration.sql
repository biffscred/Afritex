-- DropForeignKey
ALTER TABLE `accessory` DROP FOREIGN KEY `accessory_artisanId_fkey`;

-- DropForeignKey
ALTER TABLE `accessory` DROP FOREIGN KEY `accessory_fabricId_fkey`;

-- DropForeignKey
ALTER TABLE `accessoryimage` DROP FOREIGN KEY `accessoryimage_accessoryId_fkey`;

-- DropForeignKey
ALTER TABLE `artisan` DROP FOREIGN KEY `artisan_countryId_fkey`;

-- DropForeignKey
ALTER TABLE `fabricimage` DROP FOREIGN KEY `fabricimage_fabricId_fkey`;

-- DropForeignKey
ALTER TABLE `model` DROP FOREIGN KEY `model_artisanId_fkey`;

-- DropForeignKey
ALTER TABLE `model` DROP FOREIGN KEY `model_fabricId_fkey`;

-- DropForeignKey
ALTER TABLE `modelimage` DROP FOREIGN KEY `modelimage_modelId_fkey`;

-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `order_userId_fkey`;

-- DropForeignKey
ALTER TABLE `orderitem` DROP FOREIGN KEY `orderitem_accessoryId_fkey`;

-- DropForeignKey
ALTER TABLE `orderitem` DROP FOREIGN KEY `orderitem_fabricId_fkey`;

-- DropForeignKey
ALTER TABLE `orderitem` DROP FOREIGN KEY `orderitem_modelId_fkey`;

-- DropForeignKey
ALTER TABLE `orderitem` DROP FOREIGN KEY `orderitem_orderId_fkey`;

-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `product_accessoryId_fkey`;

-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `product_artisanId_fkey`;

-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `product_fabricId_fkey`;

-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `product_modelId_fkey`;

-- AlterTable
ALTER TABLE `orderitem` ADD COLUMN `userId` INTEGER NULL,
    MODIFY `orderId` INTEGER NULL;

-- CreateIndex
CREATE INDEX `OrderItem_userId_idx` ON `OrderItem`(`userId`);

-- AddForeignKey
ALTER TABLE `Accessory` ADD CONSTRAINT `Accessory_fabricId_fkey` FOREIGN KEY (`fabricId`) REFERENCES `Fabric`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Accessory` ADD CONSTRAINT `Accessory_artisanId_fkey` FOREIGN KEY (`artisanId`) REFERENCES `Artisan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AccessoryImage` ADD CONSTRAINT `AccessoryImage_accessoryId_fkey` FOREIGN KEY (`accessoryId`) REFERENCES `Accessory`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FabricImage` ADD CONSTRAINT `FabricImage_fabricId_fkey` FOREIGN KEY (`fabricId`) REFERENCES `Fabric`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Model` ADD CONSTRAINT `Model_fabricId_fkey` FOREIGN KEY (`fabricId`) REFERENCES `Fabric`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Model` ADD CONSTRAINT `Model_artisanId_fkey` FOREIGN KEY (`artisanId`) REFERENCES `Artisan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ModelImage` ADD CONSTRAINT `ModelImage_modelId_fkey` FOREIGN KEY (`modelId`) REFERENCES `Model`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderItem` ADD CONSTRAINT `OrderItem_accessoryId_fkey` FOREIGN KEY (`accessoryId`) REFERENCES `Accessory`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderItem` ADD CONSTRAINT `OrderItem_modelId_fkey` FOREIGN KEY (`modelId`) REFERENCES `Model`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderItem` ADD CONSTRAINT `OrderItem_fabricId_fkey` FOREIGN KEY (`fabricId`) REFERENCES `Fabric`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderItem` ADD CONSTRAINT `OrderItem_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderItem` ADD CONSTRAINT `OrderItem_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_accessoryId_fkey` FOREIGN KEY (`accessoryId`) REFERENCES `Accessory`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_fabricId_fkey` FOREIGN KEY (`fabricId`) REFERENCES `Fabric`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_modelId_fkey` FOREIGN KEY (`modelId`) REFERENCES `Model`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_artisanId_fkey` FOREIGN KEY (`artisanId`) REFERENCES `Artisan`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Artisan` ADD CONSTRAINT `Artisan_countryId_fkey` FOREIGN KEY (`countryId`) REFERENCES `Country`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `accessory` RENAME INDEX `accessory_fabricId_idx` TO `Accessory_fabricId_idx`;

-- RenameIndex
ALTER TABLE `accessoryimage` RENAME INDEX `accessoryimage_accessoryId_idx` TO `AccessoryImage_accessoryId_idx`;

-- RenameIndex
ALTER TABLE `country` RENAME INDEX `country_name_key` TO `Country_name_key`;

-- RenameIndex
ALTER TABLE `fabricimage` RENAME INDEX `fabricimage_fabricId_idx` TO `FabricImage_fabricId_idx`;

-- RenameIndex
ALTER TABLE `model` RENAME INDEX `model_fabricId_idx` TO `Model_fabricId_idx`;

-- RenameIndex
ALTER TABLE `modelimage` RENAME INDEX `modelimage_modelId_idx` TO `ModelImage_modelId_idx`;

-- RenameIndex
ALTER TABLE `order` RENAME INDEX `order_userId_idx` TO `Order_userId_idx`;

-- RenameIndex
ALTER TABLE `orderitem` RENAME INDEX `orderitem_accessoryId_idx` TO `OrderItem_accessoryId_idx`;

-- RenameIndex
ALTER TABLE `orderitem` RENAME INDEX `orderitem_fabricId_idx` TO `OrderItem_fabricId_idx`;

-- RenameIndex
ALTER TABLE `orderitem` RENAME INDEX `orderitem_modelId_idx` TO `OrderItem_modelId_idx`;

-- RenameIndex
ALTER TABLE `orderitem` RENAME INDEX `orderitem_orderId_idx` TO `OrderItem_orderId_idx`;

-- RenameIndex
ALTER TABLE `user` RENAME INDEX `user_email_key` TO `User_email_key`;

-- RenameIndex
ALTER TABLE `verificationtoken` RENAME INDEX `verificationtoken_token_key` TO `VerificationToken_token_key`;
