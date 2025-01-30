-- AddForeignKey
ALTER TABLE `accessory` ADD CONSTRAINT `accessory_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
