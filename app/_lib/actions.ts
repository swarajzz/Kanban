"use server";

import { Prisma } from "@prisma/client";
import prisma from "./prisma";
import { redirect } from "next/navigation";
import { getBoard, getSubtask } from "./data-service";
import { SubTaskProps, UpdateTaskProps } from "../_types/types";

export async function createBoard(
  data: {
    boardName: string;
    columns: {
      name: string;
      placeholder: string;
    }[];
  },
  userId: string,
) {
  setTimeout(() => {}, 2000);

  const boardName = data.boardName;
  const columns = data.columns;
  try {
    await prisma.board.create({
      data: {
        name: boardName,
        user: {
          connect: {
            id: userId,
          },
        },
        columns: {
          create: columns.map(({ name: columnName }) => ({
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

export async function updateTask({
  updatedSubtasks,
  deleteSubtasks = [],
  status,
  taskId,
  columnId,
  description,
}: UpdateTaskProps) {
  console.log(taskId, columnId);

  await prisma.task.update({
    where: {
      id: taskId,
    },
    data: {
      subTasks: {
        update: updatedSubtasks.map((subTask: SubTaskProps) => ({
          where: { id: subTask.id },
          data: {
            title: subTask.title,
            isCompleted: subTask.isCompleted,
          },
        })),
        deleteMany: {
          id: {
            in: deleteSubtasks.map((subTask: SubTaskProps) => subTask.id),
          },
        },
      },
      description: description,
      status: status,
      columnId: columnId,
    },
  });
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
