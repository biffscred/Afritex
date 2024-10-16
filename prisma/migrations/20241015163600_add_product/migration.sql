/*
  Warnings:

  - You are about to drop the column `description` on the `fabric` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `fabric` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `fabric` DROP COLUMN `description`,
    DROP COLUMN `name`;

-- CreateTable
CREATE TABLE `Product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `price` DOUBLE NOT NULL,
    `category` ENUM('FABRIC', 'MODEL', 'ACCESSORY') NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `fabricId` INTEGER NULL,
    `modelId` INTEGER NULL,
    `accessoryId` INTEGER NULL,

    UNIQUE INDEX `Product_fabricId_key`(`fabricId`),
    UNIQUE INDEX `Product_modelId_key`(`modelId`),
    UNIQUE INDEX `Product_accessoryId_key`(`accessoryId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_fabricId_fkey` FOREIGN KEY (`fabricId`) REFERENCES `Fabric`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_modelId_fkey` FOREIGN KEY (`modelId`) REFERENCES `Model`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_accessoryId_fkey` FOREIGN KEY (`accessoryId`) REFERENCES `Accessory`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
