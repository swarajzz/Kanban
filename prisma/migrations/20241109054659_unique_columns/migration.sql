/*
  Warnings:

  - A unique constraint covering the columns `[boardId,name]` on the table `Column` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Column_boardId_name_key" ON "Column"("boardId", "name");
