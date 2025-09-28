/*
  Warnings:

  - You are about to alter the column `note` on the `notes` table. The data in that column could be lost. The data in that column will be cast from `VarChar(5000)` to `VarChar(500)`.
  - You are about to alter the column `title` on the `notes` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `VarChar(40)`.

*/
-- AlterTable
ALTER TABLE `notes` MODIFY `note` VARCHAR(500) NOT NULL,
    MODIFY `title` VARCHAR(40) NOT NULL;
