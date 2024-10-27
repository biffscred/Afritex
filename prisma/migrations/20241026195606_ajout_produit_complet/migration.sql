/*
  Warnings:

  - You are about to drop the column `artisanId` on the `accessory` table. All the data in the column will be lost.
  - You are about to drop the column `artisanId` on the `model` table. All the data in the column will be lost.
  - You are about to drop the column `artisanId` on the `product` table. All the data in the column will be lost.
  - You are about to drop the `artisan` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `accessory` DROP FOREIGN KEY `accessory_artisanId_fkey`;

-- DropForeignKey
ALTER TABLE `artisan` DROP FOREIGN KEY `artisan_countryId_fkey`;

-- DropForeignKey
ALTER TABLE `model` DROP FOREIGN KEY `model_artisanId_fkey`;

-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `product_artisanId_fkey`;

-- AlterTable
ALTER TABLE `accessory` DROP COLUMN `artisanId`;

-- AlterTable
ALTER TABLE `model` DROP COLUMN `artisanId`;

-- AlterTable
ALTER TABLE `product` DROP COLUMN `artisanId`;

-- DropTable
DROP TABLE `artisan`;
