-- AlterTable
ALTER TABLE `orderitem` ADD COLUMN `fabricId` INTEGER NULL;

-- CreateIndex
CREATE INDEX `orderitem_fabricId_idx` ON `orderitem`(`fabricId`);

-- AddForeignKey
ALTER TABLE `orderitem` ADD CONSTRAINT `orderitem_fabricId_fkey` FOREIGN KEY (`fabricId`) REFERENCES `fabric`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
