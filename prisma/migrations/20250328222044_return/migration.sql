/*
  Warnings:

  - You are about to drop the column `receiverPublicKey` on the `Superchat` table. All the data in the column will be lost.
  - You are about to drop the column `senderPublicKey` on the `Superchat` table. All the data in the column will be lost.
  - Added the required column `receiverId` to the `Superchat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senderId` to the `Superchat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Superchat" DROP COLUMN "receiverPublicKey",
DROP COLUMN "senderPublicKey",
ADD COLUMN     "receiverId" TEXT NOT NULL,
ADD COLUMN     "senderId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Superchat" ADD CONSTRAINT "Superchat_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Superchat" ADD CONSTRAINT "Superchat_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "CreatorProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
