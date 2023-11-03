-- CreateTable
CREATE TABLE `Guest` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `contact` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Role` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `gender` ENUM('MALE', 'FEMALE') NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `picture` VARCHAR(191) NOT NULL,
    `birthday` DATETIME(3) NOT NULL,
    `nik` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `roleId` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RoomCapacity` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `adultCapacity` INTEGER NOT NULL,
    `childCapacity` INTEGER NOT NULL,
    `manyRoom` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RoomStatus` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(191) NOT NULL,
    `hexCode` VARCHAR(191) NOT NULL,
    `availHexCode` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RoomRate` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `rate` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Room` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `roomType` ENUM('STANDARD', 'DELUXE', 'FAMILY') NOT NULL,
    `roomImage` VARCHAR(191) NOT NULL,
    `roomStatusId` INTEGER NOT NULL,
    `roomCode` INTEGER NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `floor` INTEGER NOT NULL,
    `i` INTEGER NOT NULL,
    `occupied_status` BOOLEAN NOT NULL,
    `overlook` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `bedSetup` VARCHAR(191) NOT NULL,
    `connecting` VARCHAR(191) NOT NULL,
    `roomCapacityId` INTEGER NOT NULL,
    `rateCodeId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RoomFacility` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `roomId` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Reservation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `agencyName` VARCHAR(191) NOT NULL,
    `resvQtyId` INTEGER NOT NULL,
    `resvStatusId` INTEGER NOT NULL,
    `groupReservation` BOOLEAN NOT NULL,
    `finishedReservation` BOOLEAN NOT NULL,
    `currency` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `reserverId` INTEGER NOT NULL,
    `fixRate` BOOLEAN NOT NULL,
    `m` VARCHAR(191) NOT NULL,
    `l` VARCHAR(191) NOT NULL,
    `argtCode` VARCHAR(191) NOT NULL,
    `day` INTEGER NOT NULL,
    `night` INTEGER NOT NULL,
    `arrivalDate` DATETIME(3) NOT NULL,
    `departureDate` DATETIME(3) NOT NULL,
    `checkoutDate` DATETIME(3) NULL,
    `canceledDate` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Reserver` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `groupName` VARCHAR(191) NULL,
    `kCard` VARCHAR(191) NOT NULL,
    `nation` VARCHAR(191) NOT NULL,
    `purpose` VARCHAR(191) NULL,
    `resident` VARCHAR(191) NOT NULL,
    `guestId` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ResvFlight` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `reservationId` INTEGER NOT NULL,
    `arrivalFlight` DATETIME(3) NOT NULL,
    `departureFlight` DATETIME(3) NOT NULL,
    `pickedUp` BOOLEAN NOT NULL,
    `drop` BOOLEAN NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ResvRoom` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `roomId` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,
    `note` TEXT NULL,
    `reservationId` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ResvQty` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `manyAdult` INTEGER NOT NULL,
    `manyChild` INTEGER NOT NULL,
    `manyRoom` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ResvStatus` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `desc` TEXT NOT NULL,
    `hexCode` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Voucher` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `number` INTEGER NOT NULL,
    `source` VARCHAR(191) NOT NULL,
    `letterNo` INTEGER NOT NULL,
    `holderName` VARCHAR(191) NOT NULL,
    `cardNumber` INTEGER NOT NULL,
    `securityCode` INTEGER NOT NULL,
    `expired_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `reservationId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Deposit` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `reservationId` INTEGER NOT NULL,
    `depositTo` VARCHAR(191) NOT NULL,
    `transactionType` VARCHAR(191) NOT NULL,
    `balance` DOUBLE NOT NULL,
    `depositPaid` DOUBLE NOT NULL,
    `depositDate` DATETIME(3) NOT NULL,
    `dueDate` DATETIME(3) NOT NULL,
    `paymentMethodId` INTEGER NOT NULL,
    `masterBillActive` BOOLEAN NOT NULL,
    `totalDeposit` DOUBLE NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LogReservation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `reservationId` INTEGER NOT NULL,
    `arrivalDate` DATETIME(3) NOT NULL,
    `departureDate` DATETIME(3) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `manyAdult` INTEGER NOT NULL,
    `manyChild` INTEGER NOT NULL,
    `manyRoom` INTEGER NOT NULL,
    `reserverId` INTEGER NOT NULL,
    `roomId` INTEGER NOT NULL,
    `resvStatusId` INTEGER NOT NULL,
    `fixRate` BOOLEAN NOT NULL,
    `argtCode` INTEGER NOT NULL,
    `rate` DOUBLE NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `paymentMethodId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LogAvailability` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `room_1` BOOLEAN NOT NULL,
    `room_2` BOOLEAN NOT NULL,
    `room_3` BOOLEAN NOT NULL,
    `room_4` BOOLEAN NOT NULL,
    `room_5` BOOLEAN NOT NULL,
    `room_6` BOOLEAN NOT NULL,
    `room_7` BOOLEAN NOT NULL,
    `room_8` BOOLEAN NOT NULL,
    `room_9` BOOLEAN NOT NULL,
    `room_10` BOOLEAN NOT NULL,
    `availBeforeAllotment` INTEGER NOT NULL,
    `allotment` INTEGER NOT NULL,
    `availAfterAllotment` INTEGER NOT NULL,
    `totalOverbooking` INTEGER NOT NULL,
    `ooo` INTEGER NOT NULL,
    `tentative` INTEGER NOT NULL,
    `standardRoom` INTEGER NOT NULL,
    `familyRoom` INTEGER NOT NULL,
    `deluxeRoom` INTEGER NOT NULL,
    `occupiedRoom` INTEGER NOT NULL,
    `cleanedRoom` INTEGER NOT NULL,
    `dirtyRoom` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CanceledReservation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `reservationId` INTEGER NOT NULL,
    `guestId` INTEGER NOT NULL,
    `resvStatusId` INTEGER NOT NULL,
    `argtCode` INTEGER NOT NULL,
    `roomId` INTEGER NOT NULL,
    `kcard` VARCHAR(191) NOT NULL,
    `arrivalDate` DATETIME(3) NOT NULL,
    `departureDate` DATETIME(3) NOT NULL,
    `resvQtyId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Comment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `body` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Discrepancy` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `reservationId` INTEGER NOT NULL,
    `roomId` INTEGER NOT NULL,
    `foAdult` INTEGER NOT NULL,
    `foChild` INTEGER NOT NULL,
    `hkAdult` INTEGER NOT NULL,
    `hkChild` INTEGER NOT NULL,
    `hkStatus` INTEGER NOT NULL,
    `foStatus` INTEGER NOT NULL,
    `checker` VARCHAR(191) NOT NULL,
    `explanation` VARCHAR(191) NOT NULL,
    `commentId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CleaningSheet` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `reservationId` INTEGER NOT NULL,
    `no` VARCHAR(191) NOT NULL,
    `resvStatusId` INTEGER NOT NULL,
    `remark` VARCHAR(191) NOT NULL,
    `roomId` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CleanRoom` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `reservationId` INTEGER NOT NULL,
    `resvStatusId` INTEGER NOT NULL,
    `description` TEXT NOT NULL,
    `roomId` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DirtyRoom` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `reservationId` INTEGER NOT NULL,
    `resvStatusId` INTEGER NOT NULL,
    `description` TEXT NOT NULL,
    `roomId` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OooRoom` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `roomId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `reservationId` INTEGER NOT NULL,
    `reason` TEXT NOT NULL,
    `from` DATETIME(3) NOT NULL,
    `until` DATETIME(3) NOT NULL,
    `resvStatusId` INTEGER NOT NULL,
    `description` TEXT NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ServiceType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `open` VARCHAR(191) NOT NULL,
    `close` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SubType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `serviceTypeId` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Service` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `price` INTEGER NOT NULL,
    `desc` VARCHAR(191) NOT NULL,
    `picture` VARCHAR(191) NOT NULL,
    `serviceTypeId` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductReq` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `typeId` INTEGER NOT NULL,
    `desc` VARCHAR(191) NOT NULL,
    `price` INTEGER NOT NULL,
    `picture` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PaymentMethod` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Payment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `params` VARCHAR(191) NULL,
    `paymentMethodId` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Transaction` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `status` ENUM('PENDING', 'SUCCEEDED', 'FAILED') NOT NULL,
    `paymentId` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `expired_at` DATETIME(3) NULL,
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Order` (
    `id` VARCHAR(191) NOT NULL,
    `guestId` INTEGER NOT NULL,
    `roomId` INTEGER NOT NULL,
    `subtotal` DOUBLE NOT NULL,
    `total` DOUBLE NOT NULL,
    `ppn` DOUBLE NOT NULL,
    `fees` DOUBLE NOT NULL,
    `status` ENUM('PENDING', 'PROCESS', 'DELIVERED', 'DONE', 'CANCEL') NOT NULL,
    `transactionId` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Order_transactionId_key`(`transactionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OrderDetail` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `orderId` VARCHAR(191) NOT NULL,
    `serviceId` INTEGER NOT NULL,
    `price` DOUBLE NOT NULL,
    `qty` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Room` ADD CONSTRAINT `Room_roomStatusId_fkey` FOREIGN KEY (`roomStatusId`) REFERENCES `RoomStatus`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Room` ADD CONSTRAINT `Room_roomCapacityId_fkey` FOREIGN KEY (`roomCapacityId`) REFERENCES `RoomCapacity`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Room` ADD CONSTRAINT `Room_rateCodeId_fkey` FOREIGN KEY (`rateCodeId`) REFERENCES `RoomRate`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RoomFacility` ADD CONSTRAINT `RoomFacility_roomId_fkey` FOREIGN KEY (`roomId`) REFERENCES `Room`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reservation` ADD CONSTRAINT `Reservation_resvQtyId_fkey` FOREIGN KEY (`resvQtyId`) REFERENCES `ResvQty`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reservation` ADD CONSTRAINT `Reservation_resvStatusId_fkey` FOREIGN KEY (`resvStatusId`) REFERENCES `ResvStatus`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reservation` ADD CONSTRAINT `Reservation_reserverId_fkey` FOREIGN KEY (`reserverId`) REFERENCES `Reserver`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ResvFlight` ADD CONSTRAINT `ResvFlight_reservationId_fkey` FOREIGN KEY (`reservationId`) REFERENCES `Reservation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ResvRoom` ADD CONSTRAINT `ResvRoom_roomId_fkey` FOREIGN KEY (`roomId`) REFERENCES `Room`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ResvRoom` ADD CONSTRAINT `ResvRoom_reservationId_fkey` FOREIGN KEY (`reservationId`) REFERENCES `Reservation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Voucher` ADD CONSTRAINT `Voucher_reservationId_fkey` FOREIGN KEY (`reservationId`) REFERENCES `Reservation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Deposit` ADD CONSTRAINT `Deposit_reservationId_fkey` FOREIGN KEY (`reservationId`) REFERENCES `Reservation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Deposit` ADD CONSTRAINT `Deposit_paymentMethodId_fkey` FOREIGN KEY (`paymentMethodId`) REFERENCES `PaymentMethod`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LogReservation` ADD CONSTRAINT `LogReservation_reservationId_fkey` FOREIGN KEY (`reservationId`) REFERENCES `Reservation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LogReservation` ADD CONSTRAINT `LogReservation_reserverId_fkey` FOREIGN KEY (`reserverId`) REFERENCES `Reserver`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LogReservation` ADD CONSTRAINT `LogReservation_roomId_fkey` FOREIGN KEY (`roomId`) REFERENCES `Room`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LogReservation` ADD CONSTRAINT `LogReservation_resvStatusId_fkey` FOREIGN KEY (`resvStatusId`) REFERENCES `ResvStatus`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LogReservation` ADD CONSTRAINT `LogReservation_paymentMethodId_fkey` FOREIGN KEY (`paymentMethodId`) REFERENCES `PaymentMethod`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CanceledReservation` ADD CONSTRAINT `CanceledReservation_reservationId_fkey` FOREIGN KEY (`reservationId`) REFERENCES `Reservation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CanceledReservation` ADD CONSTRAINT `CanceledReservation_guestId_fkey` FOREIGN KEY (`guestId`) REFERENCES `Guest`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CanceledReservation` ADD CONSTRAINT `CanceledReservation_resvStatusId_fkey` FOREIGN KEY (`resvStatusId`) REFERENCES `ResvStatus`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CanceledReservation` ADD CONSTRAINT `CanceledReservation_roomId_fkey` FOREIGN KEY (`roomId`) REFERENCES `Room`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CanceledReservation` ADD CONSTRAINT `CanceledReservation_resvQtyId_fkey` FOREIGN KEY (`resvQtyId`) REFERENCES `ResvQty`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Discrepancy` ADD CONSTRAINT `Discrepancy_reservationId_fkey` FOREIGN KEY (`reservationId`) REFERENCES `Reservation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Discrepancy` ADD CONSTRAINT `Discrepancy_roomId_fkey` FOREIGN KEY (`roomId`) REFERENCES `Room`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Discrepancy` ADD CONSTRAINT `Discrepancy_commentId_fkey` FOREIGN KEY (`commentId`) REFERENCES `Comment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CleaningSheet` ADD CONSTRAINT `CleaningSheet_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CleaningSheet` ADD CONSTRAINT `CleaningSheet_reservationId_fkey` FOREIGN KEY (`reservationId`) REFERENCES `Reservation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CleaningSheet` ADD CONSTRAINT `CleaningSheet_resvStatusId_fkey` FOREIGN KEY (`resvStatusId`) REFERENCES `ResvStatus`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CleaningSheet` ADD CONSTRAINT `CleaningSheet_roomId_fkey` FOREIGN KEY (`roomId`) REFERENCES `Room`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CleanRoom` ADD CONSTRAINT `CleanRoom_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CleanRoom` ADD CONSTRAINT `CleanRoom_reservationId_fkey` FOREIGN KEY (`reservationId`) REFERENCES `Reservation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CleanRoom` ADD CONSTRAINT `CleanRoom_resvStatusId_fkey` FOREIGN KEY (`resvStatusId`) REFERENCES `ResvStatus`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CleanRoom` ADD CONSTRAINT `CleanRoom_roomId_fkey` FOREIGN KEY (`roomId`) REFERENCES `Room`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DirtyRoom` ADD CONSTRAINT `DirtyRoom_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DirtyRoom` ADD CONSTRAINT `DirtyRoom_reservationId_fkey` FOREIGN KEY (`reservationId`) REFERENCES `Reservation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DirtyRoom` ADD CONSTRAINT `DirtyRoom_resvStatusId_fkey` FOREIGN KEY (`resvStatusId`) REFERENCES `ResvStatus`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DirtyRoom` ADD CONSTRAINT `DirtyRoom_roomId_fkey` FOREIGN KEY (`roomId`) REFERENCES `Room`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OooRoom` ADD CONSTRAINT `OooRoom_roomId_fkey` FOREIGN KEY (`roomId`) REFERENCES `Room`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OooRoom` ADD CONSTRAINT `OooRoom_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OooRoom` ADD CONSTRAINT `OooRoom_reservationId_fkey` FOREIGN KEY (`reservationId`) REFERENCES `Reservation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OooRoom` ADD CONSTRAINT `OooRoom_resvStatusId_fkey` FOREIGN KEY (`resvStatusId`) REFERENCES `ResvStatus`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SubType` ADD CONSTRAINT `SubType_serviceTypeId_fkey` FOREIGN KEY (`serviceTypeId`) REFERENCES `ServiceType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Service` ADD CONSTRAINT `Service_serviceTypeId_fkey` FOREIGN KEY (`serviceTypeId`) REFERENCES `ServiceType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductReq` ADD CONSTRAINT `ProductReq_typeId_fkey` FOREIGN KEY (`typeId`) REFERENCES `SubType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_paymentMethodId_fkey` FOREIGN KEY (`paymentMethodId`) REFERENCES `PaymentMethod`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_paymentId_fkey` FOREIGN KEY (`paymentId`) REFERENCES `Payment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_guestId_fkey` FOREIGN KEY (`guestId`) REFERENCES `Guest`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_roomId_fkey` FOREIGN KEY (`roomId`) REFERENCES `Room`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_transactionId_fkey` FOREIGN KEY (`transactionId`) REFERENCES `Transaction`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderDetail` ADD CONSTRAINT `OrderDetail_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderDetail` ADD CONSTRAINT `OrderDetail_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `Service`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
