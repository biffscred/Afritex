-- AlterTable
ALTER TABLE `OrderItem` ADD COLUMN `fabricId` INTEGER NULL,
    MODIFY `productId` INTEGER NULL;

-- CreateIndex
CREATE INDEX `OrderItem_fabricId_idx` ON `OrderItem`(`fabricId`);

-- AddForeignKey
ALTER TABLE `OrderItem` ADD CONSTRAINT `OrderItem_fabricId_fkey` FOREIGN KEY (`fabricId`) REFERENCES `Fabric`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
