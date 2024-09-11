-- CreateTable
CREATE TABLE `matches` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `matched` BIT(1) NOT NULL,
    `entertainer_id` VARCHAR(255) NULL,
    `scouter_id` VARCHAR(255) NULL,

    INDEX `FKkq0n2p85q2ij9pjl2rssnbfeo`(`scouter_id`),
    INDEX `FKmsgfcyjfsx2cky57rdn0lgehw`(`entertainer_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `member` (
    `member_id` VARCHAR(255) NOT NULL,
    `created_date` DATETIME(6) NULL,
    `modified_date` DATETIME(6) NULL,
    `gender` INTEGER NULL DEFAULT 0,
    `password` VARCHAR(255) NULL,
    `role` INTEGER NULL DEFAULT 0,

    PRIMARY KEY (`member_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `refresh_token` (
    `refresh` BIGINT NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL,
    `refresh_token` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`refresh`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `profile` (
    `entertainer_id` VARCHAR(255) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `platforms` JSON NOT NULL,
    `age` INTEGER NOT NULL,
    `height` INTEGER NOT NULL,
    `weight` INTEGER NOT NULL,
    `keywords` JSON NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `images` JSON NOT NULL,
    `videos` JSON NULL,
    `career` JSON NULL,

    PRIMARY KEY (`entertainer_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `proposal` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `scouter_id` VARCHAR(255) NOT NULL,
    `company` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `platforms` JSON NOT NULL,
    `age_condition` INTEGER NULL,
    `gender_condition` JSON NOT NULL,
    `keywords` JSON NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `matches` ADD CONSTRAINT `FKkq0n2p85q2ij9pjl2rssnbfeo` FOREIGN KEY (`scouter_id`) REFERENCES `member`(`member_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `matches` ADD CONSTRAINT `FKmsgfcyjfsx2cky57rdn0lgehw` FOREIGN KEY (`entertainer_id`) REFERENCES `member`(`member_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `profile` ADD CONSTRAINT `profile_entertainer_id_fkey` FOREIGN KEY (`entertainer_id`) REFERENCES `member`(`member_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `proposal` ADD CONSTRAINT `proposal_scouter_id_fkey` FOREIGN KEY (`scouter_id`) REFERENCES `member`(`member_id`) ON DELETE CASCADE ON UPDATE CASCADE;
