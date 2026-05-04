/*
  Warnings:

  - You are about to drop the column `color` on the `Accessory` table. All the data in the column will be lost.
  - You are about to drop the column `altText` on the `AccessoryImage` table. All the data in the column will be lost.
  - You are about to drop the column `origin` on the `Fabric` table. All the data in the column will be lost.
  - You are about to drop the column `altText` on the `FabricImage` table. All the data in the column will be lost.
  - You are about to drop the column `color` on the `Model` table. All the data in the column will be lost.
  - You are about to drop the column `altText` on the `ModelImage` table. All the data in the column will be lost.
  - You are about to drop the column `color` on the `Product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Order` DROP FOREIGN KEY `Order_UserId_fkey`;

-- DropForeignKey
ALTER TABLE `OrderItem` DROP FOREIGN KEY `OrderItem_FabricId_fkey`;

-- DropForeignKey
ALTER TABLE `OrderItem` DROP FOREIGN KEY `OrderItem_OrderId_fkey`;

-- DropForeignKey
ALTER TABLE `OrderItem` DROP FOREIGN KEY `OrderItem_ProductId_fkey`;

-- AlterTable
ALTER TABLE `Accessory` DROP COLUMN `color`,
    ADD COLUMN `dimensions` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `AccessoryImage` DROP COLUMN `altText`;

-- AlterTable
ALTER TABLE `Fabric` DROP COLUMN `origin`,
    ADD COLUMN `width` DOUBLE NULL;

-- AlterTable
ALTER TABLE `FabricImage` DROP COLUMN `altText`;

-- AlterTable
ALTER TABLE `Model` DROP COLUMN `color`;

-- AlterTable
ALTER TABLE `ModelImage` DROP COLUMN `altText`;

-- AlterTable
ALTER TABLE `Product` DROP COLUMN `color`,
    ADD COLUMN `stock` INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE `Specialty` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,

    UNIQUE INDEX `Specialty_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Size` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Size_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ProductSpecialties` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ProductSpecialties_AB_unique`(`A`, `B`),
    INDEX `_ProductSpecialties_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ModelSizes` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ModelSizes_AB_unique`(`A`, `B`),
    INDEX `_ModelSizes_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderItem` ADD CONSTRAINT `OrderItem_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderItem` ADD CONSTRAINT `OrderItem_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderItem` ADD CONSTRAINT `OrderItem_fabricId_fkey` FOREIGN KEY (`fabricId`) REFERENCES `Fabric`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProductSpecialties` ADD CONSTRAINT `_ProductSpecialties_A_fkey` FOREIGN KEY (`A`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProductSpecialties` ADD CONSTRAINT `_ProductSpecialties_B_fkey` FOREIGN KEY (`B`) REFERENCES `Specialty`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ModelSizes` ADD CONSTRAINT `_ModelSizes_A_fkey` FOREIGN KEY (`A`) REFERENCES `Model`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ModelSizes` ADD CONSTRAINT `_ModelSizes_B_fkey` FOREIGN KEY (`B`) REFERENCES `Size`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
