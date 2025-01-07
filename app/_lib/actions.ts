"use server";

import { Prisma } from "@prisma/client";
import prisma from "./prisma";
import { redirect } from "next/navigation";
import { getBoard } from "./data-service";
import { DataProps, UpdateBoardProps, UpdateTaskProps } from "../_types/types";

import { revalidatePath } from "next/cache";

export async function createBoard(
  data: {
    boardName: string;
    columns: {
      name: string;
      placeholder?: string;
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
          create: columns.map(({ name: columnName, index }) => ({
            name: columnName,
            order: index + 1,
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

export async function updateBoard({ data, boardId, userId }: UpdateBoardProps) {
  const { name, columns } = data;

  if (!boardId) return;

  const lastColumn = await getLastColumn(boardId);
  const newTaskOrder = lastColumn ? lastColumn.order + 1 : 1.0;

  await prisma.board.update({
    where: {
      id: boardId,
    },
    data: {
      name: name,
      columns: {
        deleteMany: {
          NOT: columns.map(({ id }) => ({ id })),
        },
        upsert: columns.map((column) => ({
          where: { id: column.id },
          create: {
            name: column.name,
            order: newTaskOrder,
          },
          update: {
            name: column.name,
            order: column.order,
          },
        })),
      },
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
  revalidatePath("/board");
}

export async function createTask({
  data,
  columnId,
}: {
  data: DataProps;
  columnId?: string;
}) {
  const { subTasks, title, description, status } = data;

  if(!columnId) return

  const lastTask = await getLastTask(columnId);
  const newTaskOrder = lastTask ? lastTask.order + 1 : 1.0;

  await prisma.task.create({
    data: {
      subTasks: {
        create: subTasks.map((subTask) => ({
          title: subTask.title,
          isCompleted: false,
        })),
      },
      title: title,
      description: description,
      status: status,
      order: newTaskOrder,
      column: {
        connect: {
          id: columnId,
        },
      },
    },
  });

  revalidatePath("/board");
}

export async function updateTask({ data, taskId, columnId }: UpdateTaskProps) {
  const { subTasks, title, description, status } = data;

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
          NOT: subTasks.map(({ id }) => ({ id })),
        },
        upsert: subTasks.map((subTask) => ({
          where: { id: subTask.id },
          create: {
            title: subTask.title,
            isCompleted: subTask.isCompleted,
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
  revalidatePath("/board");
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

export async function deleteTask(taskId: string) {
  await prisma.task.delete({
    where: {
      id: taskId,
    },
  });
  revalidatePath("/board");
}

export async function getLastTask(columnId: string) {
  const lastTask = await prisma.task.findFirst({
    where: { columnId },
    orderBy: { order: "desc" },
  });
  return lastTask;
}

export async function getLastColumn(boardId: string) {
  const lastColumn = await prisma.column.findFirst({
    where: { boardId },
    orderBy: { order: "desc" },
  });
  return lastColumn;
}
