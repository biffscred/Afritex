-- CreateTable
CREATE TABLE `fabricimage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `url` VARCHAR(191) NOT NULL,
    `altText` VARCHAR(191) NULL,
    `fabricId` INTEGER NOT NULL,

    INDEX `fabricimage_fabricId_idx`(`fabricId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `fabricimage` ADD CONSTRAINT `fabricimage_fabricId_fkey` FOREIGN KEY (`fabricId`) REFERENCES `fabric`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
