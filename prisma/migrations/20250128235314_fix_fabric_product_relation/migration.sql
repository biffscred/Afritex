/*
  Warnings:

  - You are about to drop the `_accessorycountries` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_fabriccountries` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_modelcountries` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_productcountries` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `accessory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `accessoryimage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `artisan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `country` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `fabric` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `fabricimage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `model` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `modelimage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `order` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `orderitem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `verificationtoken` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_accessorycountries` DROP FOREIGN KEY `_accessorycountries_A_fkey`;

-- DropForeignKey
ALTER TABLE `_accessorycountries` DROP FOREIGN KEY `_accessorycountries_B_fkey`;

-- DropForeignKey
ALTER TABLE `_fabriccountries` DROP FOREIGN KEY `_fabriccountries_A_fkey`;

-- DropForeignKey
ALTER TABLE `_fabriccountries` DROP FOREIGN KEY `_fabriccountries_B_fkey`;

-- DropForeignKey
ALTER TABLE `_modelcountries` DROP FOREIGN KEY `_modelcountries_A_fkey`;

-- DropForeignKey
ALTER TABLE `_modelcountries` DROP FOREIGN KEY `_modelcountries_B_fkey`;

-- DropForeignKey
ALTER TABLE `_productcountries` DROP FOREIGN KEY `_productcountries_A_fkey`;

-- DropForeignKey
ALTER TABLE `_productcountries` DROP FOREIGN KEY `_productcountries_B_fkey`;

-- DropForeignKey
ALTER TABLE `accessory` DROP FOREIGN KEY `accessory_artisanId_fkey`;

-- DropForeignKey
ALTER TABLE `accessory` DROP FOREIGN KEY `accessory_fabricId_fkey`;

-- DropForeignKey
ALTER TABLE `accessory` DROP FOREIGN KEY `accessory_productId_fkey`;

-- DropForeignKey
ALTER TABLE `accessoryimage` DROP FOREIGN KEY `accessoryimage_accessoryId_fkey`;

-- DropForeignKey
ALTER TABLE `artisan` DROP FOREIGN KEY `artisan_countryId_fkey`;

-- DropForeignKey
ALTER TABLE `fabric` DROP FOREIGN KEY `fabric_productId_fkey`;

-- DropForeignKey
ALTER TABLE `fabricimage` DROP FOREIGN KEY `fabricimage_fabricId_fkey`;

-- DropForeignKey
ALTER TABLE `model` DROP FOREIGN KEY `model_artisanId_fkey`;

-- DropForeignKey
ALTER TABLE `model` DROP FOREIGN KEY `model_fabricId_fkey`;

-- DropForeignKey
ALTER TABLE `model` DROP FOREIGN KEY `model_productId_fkey`;

-- DropForeignKey
ALTER TABLE `modelimage` DROP FOREIGN KEY `modelimage_modelId_fkey`;

-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `order_userId_fkey`;

-- DropForeignKey
ALTER TABLE `orderitem` DROP FOREIGN KEY `orderitem_orderId_fkey`;

-- DropForeignKey
ALTER TABLE `orderitem` DROP FOREIGN KEY `orderitem_productId_fkey`;

-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `product_artisanId_fkey`;

-- DropTable
DROP TABLE `_accessorycountries`;

-- DropTable
DROP TABLE `_fabriccountries`;

-- DropTable
DROP TABLE `_modelcountries`;

-- DropTable
DROP TABLE `_productcountries`;

-- DropTable
DROP TABLE `accessory`;

-- DropTable
DROP TABLE `accessoryimage`;

-- DropTable
DROP TABLE `artisan`;

-- DropTable
DROP TABLE `country`;

-- DropTable
DROP TABLE `fabric`;

-- DropTable
DROP TABLE `fabricimage`;

-- DropTable
DROP TABLE `model`;

-- DropTable
DROP TABLE `modelimage`;

-- DropTable
DROP TABLE `order`;

-- DropTable
DROP TABLE `orderitem`;

-- DropTable
DROP TABLE `product`;

-- DropTable
DROP TABLE `user`;

-- DropTable
DROP TABLE `verificationtoken`;

-- CreateTable
CREATE TABLE `Accessory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `price` DOUBLE NOT NULL,
    `fabricId` INTEGER NULL,
    `productId` INTEGER NOT NULL,
    `image` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `color` VARCHAR(191) NULL,
    `artisanId` INTEGER NULL,

    INDEX `Accessory_artisanId_idx`(`artisanId`),
    INDEX `Accessory_fabricId_idx`(`fabricId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AccessoryImage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `url` VARCHAR(191) NOT NULL,
    `altText` VARCHAR(191) NULL,
    `accessoryId` INTEGER NOT NULL,

    INDEX `AccessoryImage_accessoryId_idx`(`accessoryId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Artisan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `countryId` INTEGER NOT NULL,

    INDEX `Artisan_countryId_idx`(`countryId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Country` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Country_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Fabric` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `material` VARCHAR(191) NULL,
    `pattern` VARCHAR(191) NULL,
    `productId` INTEGER NOT NULL,
    `origin` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `color` VARCHAR(191) NULL,
    `size` DOUBLE NULL,
    `name` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NULL,
    `price` DOUBLE NOT NULL,

    UNIQUE INDEX `Fabric_productId_key`(`productId`),
    UNIQUE INDEX `Fabric_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FabricImage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `url` VARCHAR(191) NOT NULL,
    `altText` VARCHAR(191) NULL,
    `fabricId` INTEGER NOT NULL,

    INDEX `FabricImage_fabricId_idx`(`fabricId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Model` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `price` DOUBLE NOT NULL,
    `productId` INTEGER NOT NULL,
    `fabricId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `color` VARCHAR(191) NULL,
    `artisanId` INTEGER NULL,
    `image` VARCHAR(191) NULL,

    INDEX `Model_artisanId_idx`(`artisanId`),
    INDEX `Model_fabricId_idx`(`fabricId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ModelImage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `url` VARCHAR(191) NOT NULL,
    `altText` VARCHAR(191) NULL,
    `modelId` INTEGER NOT NULL,

    INDEX `ModelImage_modelId_idx`(`modelId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Order` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `total` DOUBLE NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `Order_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OrderItem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `orderId` INTEGER NOT NULL,
    `productId` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,
    `price` DOUBLE NOT NULL,

    INDEX `OrderItem_productId_idx`(`productId`),
    INDEX `OrderItem_orderId_idx`(`orderId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `price` DOUBLE NOT NULL,
    `category` ENUM('FABRIC', 'MODEL', 'ACCESSORY') NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `available` BOOLEAN NOT NULL DEFAULT true,
    `artisanId` INTEGER NULL,
    `color` VARCHAR(191) NULL,
    `material` VARCHAR(191) NULL,

    INDEX `Product_artisanId_idx`(`artisanId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `emailVerified` DATETIME(3) NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VerificationToken` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `VerificationToken_token_key`(`token`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_AccessoryCountries` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_AccessoryCountries_AB_unique`(`A`, `B`),
    INDEX `_AccessoryCountries_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_FabricCountries` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_FabricCountries_AB_unique`(`A`, `B`),
    INDEX `_FabricCountries_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ModelCountries` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ModelCountries_AB_unique`(`A`, `B`),
    INDEX `_ModelCountries_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ProductCountries` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ProductCountries_AB_unique`(`A`, `B`),
    INDEX `_ProductCountries_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Accessory` ADD CONSTRAINT `Accessory_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Accessory` ADD CONSTRAINT `Accessory_fabricId_fkey` FOREIGN KEY (`fabricId`) REFERENCES `Fabric`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Accessory` ADD CONSTRAINT `Accessory_artisanId_fkey` FOREIGN KEY (`artisanId`) REFERENCES `Artisan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AccessoryImage` ADD CONSTRAINT `AccessoryImage_accessoryId_fkey` FOREIGN KEY (`accessoryId`) REFERENCES `Accessory`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Artisan` ADD CONSTRAINT `Artisan_countryId_fkey` FOREIGN KEY (`countryId`) REFERENCES `Country`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Fabric` ADD CONSTRAINT `Fabric_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FabricImage` ADD CONSTRAINT `FabricImage_fabricId_fkey` FOREIGN KEY (`fabricId`) REFERENCES `Fabric`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Model` ADD CONSTRAINT `Model_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Model` ADD CONSTRAINT `Model_fabricId_fkey` FOREIGN KEY (`fabricId`) REFERENCES `Fabric`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Model` ADD CONSTRAINT `Model_artisanId_fkey` FOREIGN KEY (`artisanId`) REFERENCES `Artisan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ModelImage` ADD CONSTRAINT `ModelImage_modelId_fkey` FOREIGN KEY (`modelId`) REFERENCES `Model`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderItem` ADD CONSTRAINT `OrderItem_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderItem` ADD CONSTRAINT `OrderItem_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_artisanId_fkey` FOREIGN KEY (`artisanId`) REFERENCES `Artisan`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AccessoryCountries` ADD CONSTRAINT `_AccessoryCountries_A_fkey` FOREIGN KEY (`A`) REFERENCES `Accessory`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AccessoryCountries` ADD CONSTRAINT `_AccessoryCountries_B_fkey` FOREIGN KEY (`B`) REFERENCES `Country`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_FabricCountries` ADD CONSTRAINT `_FabricCountries_A_fkey` FOREIGN KEY (`A`) REFERENCES `Country`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_FabricCountries` ADD CONSTRAINT `_FabricCountries_B_fkey` FOREIGN KEY (`B`) REFERENCES `Fabric`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ModelCountries` ADD CONSTRAINT `_ModelCountries_A_fkey` FOREIGN KEY (`A`) REFERENCES `Country`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ModelCountries` ADD CONSTRAINT `_ModelCountries_B_fkey` FOREIGN KEY (`B`) REFERENCES `Model`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProductCountries` ADD CONSTRAINT `_ProductCountries_A_fkey` FOREIGN KEY (`A`) REFERENCES `Country`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProductCountries` ADD CONSTRAINT `_ProductCountries_B_fkey` FOREIGN KEY (`B`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
