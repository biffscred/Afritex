-- AlterTable
ALTER TABLE `accessory` ADD COLUMN `artisanId` INTEGER NULL,
    ADD COLUMN `color` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `fabric` ADD COLUMN `color` VARCHAR(191) NULL,
    ADD COLUMN `size` DOUBLE NULL;

-- AlterTable
ALTER TABLE `model` ADD COLUMN `artisanId` INTEGER NULL,
    ADD COLUMN `color` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `product` ADD COLUMN `artisanId` INTEGER NULL,
    ADD COLUMN `available` BOOLEAN NOT NULL DEFAULT true;

-- CreateTable
CREATE TABLE `artisan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `countryId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `accessory` ADD CONSTRAINT `accessory_artisanId_fkey` FOREIGN KEY (`artisanId`) REFERENCES `artisan`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `model` ADD CONSTRAINT `model_artisanId_fkey` FOREIGN KEY (`artisanId`) REFERENCES `artisan`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product` ADD CONSTRAINT `product_artisanId_fkey` FOREIGN KEY (`artisanId`) REFERENCES `artisan`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `artisan` ADD CONSTRAINT `artisan_countryId_fkey` FOREIGN KEY (`countryId`) REFERENCES `country`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
