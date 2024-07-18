/*
  Warnings:

  - You are about to drop the column `dice1_result` on the `game` table. All the data in the column will be lost.
  - You are about to drop the column `dice2_result` on the `game` table. All the data in the column will be lost.
  - You are about to drop the column `overall_result` on the `game` table. All the data in the column will be lost.
  - You are about to drop the column `playerId` on the `game` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `game` DROP FOREIGN KEY `Game_playerId_fkey`;

-- AlterTable
ALTER TABLE `game` DROP COLUMN `dice1_result`,
    DROP COLUMN `dice2_result`,
    DROP COLUMN `overall_result`,
    DROP COLUMN `playerId`,
    ADD COLUMN `played_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- CreateTable
CREATE TABLE `PlayerGame` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `playerId` INTEGER NOT NULL,
    `gameId` INTEGER NOT NULL,
    `dice1_result` INTEGER NOT NULL,
    `dice2_result` INTEGER NOT NULL,
    `overallResult` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ranking` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `playerId` INTEGER NOT NULL,
    `totalGames` INTEGER NOT NULL DEFAULT 0,
    `totalWins` INTEGER NOT NULL DEFAULT 0,
    `totalLost` INTEGER NOT NULL DEFAULT 0,
    `winPercentage` DOUBLE NOT NULL DEFAULT 0.0,

    UNIQUE INDEX `Ranking_playerId_key`(`playerId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PlayerGame` ADD CONSTRAINT `PlayerGame_playerId_fkey` FOREIGN KEY (`playerId`) REFERENCES `Player`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PlayerGame` ADD CONSTRAINT `PlayerGame_gameId_fkey` FOREIGN KEY (`gameId`) REFERENCES `Game`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ranking` ADD CONSTRAINT `Ranking_playerId_fkey` FOREIGN KEY (`playerId`) REFERENCES `Player`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
