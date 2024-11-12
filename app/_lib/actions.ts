"use server";

import { Prisma } from "@prisma/client";
import prisma from "./prisma";
import { redirect } from "next/navigation";
import { getBoard } from "./data-service";

export async function createBoard(prevData, formData: FormData) {
  const boardName = formData.get("boardName") as string;
  const userId = formData.get("userId") as string;

  const columns = Array.from(formData)
    .filter(([key, value]) => key.startsWith("column-"))
    .map(([name, value]) => value as string);

  columns.map((name) => console.log("YOLO", name));

  try {
    await prisma.board.create({
      data: {
        name: boardName,
        userId: userId,
        columns: {
          create: columns.map((columnName) => ({
            name: columnName,
          })),
        },
      },
    });
    redirect(`/${boardName.trim().replace(/\s+/g, "-").toLowerCase()}`);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        throw new Error(
          "A board with this name already exists. Please choose a different name.",
        );
      }
    }
    throw e;
  }
}

export async function deleteBoard(boardName: string) {
  const board = await getBoard(boardName);

  await prisma.board.delete({
    where: {
      id: board.id,
    },
  });
  redirect("/");
}
