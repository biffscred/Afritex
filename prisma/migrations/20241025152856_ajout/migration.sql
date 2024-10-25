-- CreateTable
CREATE TABLE `_ProductCountries` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ProductCountries_AB_unique`(`A`, `B`),
    INDEX `_ProductCountries_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_ProductCountries` ADD CONSTRAINT `_ProductCountries_A_fkey` FOREIGN KEY (`A`) REFERENCES `country`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProductCountries` ADD CONSTRAINT `_ProductCountries_B_fkey` FOREIGN KEY (`B`) REFERENCES `product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
