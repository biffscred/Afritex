-- DropForeignKey
ALTER TABLE `accessory` DROP FOREIGN KEY `Accessory_fabricId_fkey`;

-- DropForeignKey
ALTER TABLE `accessoryimage` DROP FOREIGN KEY `AccessoryImage_accessoryId_fkey`;

-- DropForeignKey
ALTER TABLE `model` DROP FOREIGN KEY `Model_fabricId_fkey`;

-- DropForeignKey
ALTER TABLE `modelimage` DROP FOREIGN KEY `ModelImage_modelId_fkey`;

-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `Order_userId_fkey`;

-- DropForeignKey
ALTER TABLE `orderitem` DROP FOREIGN KEY `OrderItem_accessoryId_fkey`;

-- DropForeignKey
ALTER TABLE `orderitem` DROP FOREIGN KEY `OrderItem_modelId_fkey`;

-- DropForeignKey
ALTER TABLE `orderitem` DROP FOREIGN KEY `OrderItem_orderId_fkey`;

-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `Product_accessoryId_fkey`;

-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `Product_fabricId_fkey`;

-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `Product_modelId_fkey`;

-- AddForeignKey
ALTER TABLE `accessory` ADD CONSTRAINT `accessory_fabricId_fkey` FOREIGN KEY (`fabricId`) REFERENCES `fabric`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `accessoryimage` ADD CONSTRAINT `accessoryimage_accessoryId_fkey` FOREIGN KEY (`accessoryId`) REFERENCES `accessory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `model` ADD CONSTRAINT `model_fabricId_fkey` FOREIGN KEY (`fabricId`) REFERENCES `fabric`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `modelimage` ADD CONSTRAINT `modelimage_modelId_fkey` FOREIGN KEY (`modelId`) REFERENCES `model`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order` ADD CONSTRAINT `order_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orderitem` ADD CONSTRAINT `orderitem_accessoryId_fkey` FOREIGN KEY (`accessoryId`) REFERENCES `accessory`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orderitem` ADD CONSTRAINT `orderitem_modelId_fkey` FOREIGN KEY (`modelId`) REFERENCES `model`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orderitem` ADD CONSTRAINT `orderitem_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product` ADD CONSTRAINT `product_accessoryId_fkey` FOREIGN KEY (`accessoryId`) REFERENCES `accessory`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product` ADD CONSTRAINT `product_fabricId_fkey` FOREIGN KEY (`fabricId`) REFERENCES `fabric`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product` ADD CONSTRAINT `product_modelId_fkey` FOREIGN KEY (`modelId`) REFERENCES `model`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `_accessorycountries` RENAME INDEX `_AccessoryCountries_AB_unique` TO `_accessorycountries_AB_unique`;

-- RenameIndex
ALTER TABLE `_accessorycountries` RENAME INDEX `_AccessoryCountries_B_index` TO `_accessorycountries_B_index`;

-- RenameIndex
ALTER TABLE `_fabriccountries` RENAME INDEX `_FabricCountries_AB_unique` TO `_fabriccountries_AB_unique`;

-- RenameIndex
ALTER TABLE `_fabriccountries` RENAME INDEX `_FabricCountries_B_index` TO `_fabriccountries_B_index`;

-- RenameIndex
ALTER TABLE `_modelcountries` RENAME INDEX `_ModelCountries_AB_unique` TO `_modelcountries_AB_unique`;

-- RenameIndex
ALTER TABLE `_modelcountries` RENAME INDEX `_ModelCountries_B_index` TO `_modelcountries_B_index`;

-- RenameIndex
ALTER TABLE `accessory` RENAME INDEX `Accessory_fabricId_fkey` TO `accessory_fabricId_idx`;

-- RenameIndex
ALTER TABLE `accessoryimage` RENAME INDEX `AccessoryImage_accessoryId_fkey` TO `accessoryimage_accessoryId_idx`;

-- RenameIndex
ALTER TABLE `country` RENAME INDEX `Country_name_key` TO `country_name_key`;

-- RenameIndex
ALTER TABLE `model` RENAME INDEX `Model_fabricId_fkey` TO `model_fabricId_idx`;

-- RenameIndex
ALTER TABLE `modelimage` RENAME INDEX `ModelImage_modelId_fkey` TO `modelimage_modelId_idx`;

-- RenameIndex
ALTER TABLE `order` RENAME INDEX `Order_userId_fkey` TO `order_userId_idx`;

-- RenameIndex
ALTER TABLE `orderitem` RENAME INDEX `OrderItem_accessoryId_fkey` TO `orderitem_accessoryId_idx`;

-- RenameIndex
ALTER TABLE `orderitem` RENAME INDEX `OrderItem_modelId_fkey` TO `orderitem_modelId_idx`;

-- RenameIndex
ALTER TABLE `orderitem` RENAME INDEX `OrderItem_orderId_fkey` TO `orderitem_orderId_idx`;

-- RenameIndex
ALTER TABLE `product` RENAME INDEX `Product_accessoryId_key` TO `product_accessoryId_key`;

-- RenameIndex
ALTER TABLE `product` RENAME INDEX `Product_fabricId_key` TO `product_fabricId_key`;

-- RenameIndex
ALTER TABLE `product` RENAME INDEX `Product_modelId_key` TO `product_modelId_key`;

-- RenameIndex
ALTER TABLE `user` RENAME INDEX `User_email_key` TO `user_email_key`;

-- RenameIndex
ALTER TABLE `verificationtoken` RENAME INDEX `VerificationToken_token_key` TO `verificationtoken_token_key`;
