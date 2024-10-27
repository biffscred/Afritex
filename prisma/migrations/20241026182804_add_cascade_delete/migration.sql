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

-- AddForeignKey
ALTER TABLE `accessory` ADD CONSTRAINT `accessory_fabricId_fkey` FOREIGN KEY (`fabricId`) REFERENCES `fabric`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `accessory` ADD CONSTRAINT `accessory_artisanId_fkey` FOREIGN KEY (`artisanId`) REFERENCES `artisan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `accessoryimage` ADD CONSTRAINT `accessoryimage_accessoryId_fkey` FOREIGN KEY (`accessoryId`) REFERENCES `accessory`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `fabricimage` ADD CONSTRAINT `fabricimage_fabricId_fkey` FOREIGN KEY (`fabricId`) REFERENCES `fabric`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `model` ADD CONSTRAINT `model_fabricId_fkey` FOREIGN KEY (`fabricId`) REFERENCES `fabric`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `model` ADD CONSTRAINT `model_artisanId_fkey` FOREIGN KEY (`artisanId`) REFERENCES `artisan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `modelimage` ADD CONSTRAINT `modelimage_modelId_fkey` FOREIGN KEY (`modelId`) REFERENCES `model`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order` ADD CONSTRAINT `order_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orderitem` ADD CONSTRAINT `orderitem_accessoryId_fkey` FOREIGN KEY (`accessoryId`) REFERENCES `accessory`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orderitem` ADD CONSTRAINT `orderitem_modelId_fkey` FOREIGN KEY (`modelId`) REFERENCES `model`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orderitem` ADD CONSTRAINT `orderitem_fabricId_fkey` FOREIGN KEY (`fabricId`) REFERENCES `fabric`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orderitem` ADD CONSTRAINT `orderitem_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `order`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `artisan` ADD CONSTRAINT `artisan_countryId_fkey` FOREIGN KEY (`countryId`) REFERENCES `country`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
