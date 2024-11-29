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

export async function createTask(data, columnId) {
  const { title, description, updatedSubtasks, status } = data;
  await prisma.task.create({
    data: {
      subTasks: {
        create: updatedSubtasks.map((subTask: SubTaskProps) => ({
          title: subTask.title,
          isCompleted: false,
        })),
      },
      title: title,
      description: description,
      status: status,
      column: {
        connect: {
          id: columnId,
        },
      },
    },
  });
}

export async function updateTask({
  data,
  originalSubtasks,
  taskId,
  columnId,
}: UpdateTaskProps) {
  const { subTasks, title, description, status } = data;

  const deleteSubtasks = originalSubtasks?.filter(
    (original) => !subTasks.some((subTask) => subTask.id === original.id),
  );

  await prisma.task.update({
    where: {
      id: taskId,
    },
    data: {
      title: title,
      description: description,
      status: status,
      subTasks: {
        deleteMany: {
          id: {
            in: deleteSubtasks?.map((subTask: SubTaskProps) => subTask.id),
          },
        },
        upsert: subTasks.map((subTask) => ({
          where: { id: subTask.id || "" },
          create: {
            title: subTask.title,
            isCompleted: subTask.isCompleted ?? false,
          },
          update: {
            title: subTask.title,
            isCompleted: subTask.isCompleted,
          },
        })),
      },
      column: {
        connect: {
          id: columnId,
        },
      },
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
