"use server";

import prisma from "./prisma";

export async function createBoard(userId: string, formData: FormData) {
  const boardName = formData.get("boardName") as string;

  const columns = Array.from(formData)
    .map(([name]) => name)
    .filter(
      (name) => name !== "boardName" && !name.toLowerCase().includes("action"),
    );

  await prisma.board.create({
    data: {
      name: boardName,
      userId: userId,
      columns: {
        create: columns.map((name) => ({
          name,
        })),
      },
    },
  });
}
