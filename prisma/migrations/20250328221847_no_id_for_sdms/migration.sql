/*
  Warnings:

  - You are about to drop the column `receiverId` on the `Superchat` table. All the data in the column will be lost.
  - You are about to drop the column `senderId` on the `Superchat` table. All the data in the column will be lost.
  - Added the required column `receiverPublicKey` to the `Superchat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senderPublicKey` to the `Superchat` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Superchat" DROP CONSTRAINT "Superchat_receiverId_fkey";

-- DropForeignKey
ALTER TABLE "Superchat" DROP CONSTRAINT "Superchat_senderId_fkey";

-- AlterTable
ALTER TABLE "Superchat" DROP COLUMN "receiverId",
DROP COLUMN "senderId",
ADD COLUMN     "receiverPublicKey" TEXT NOT NULL,
ADD COLUMN     "senderPublicKey" TEXT NOT NULL;
