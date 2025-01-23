"use server";

import { Prisma } from "@prisma/client";
import prisma from "./prisma";
import { redirect } from "next/navigation";
import { getBoard } from "./data-service";
import {
  DataProps,
  EditFormFields,
  NewFormFields,
  UpdateTaskProps,
} from "../_types/types";

import { revalidatePath } from "next/cache";

export async function createBoard(data: NewFormFields, userId: string) {
  const boardName = data.name.trim();
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
          create: columns?.map(({ name: columnName }, index) => ({
            name: columnName.trim(),
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

// export async function updateBoard(
//   data: EditFormFields,
//   boardId: string,
//   userId: string,
// ) {
//   const name = data.name;
//   const columns = data.editColumns;

//   if (!boardId) return;

//   const lastColumn = await getLastColumn(boardId);
//   const newTaskOrder = lastColumn ? lastColumn.order + 1 : 1.0;

//   console.log(columns.map((column) => column.tasks));

//   await prisma.board.update({
//     where: {
//       id: boardId,
//     },
//     data: {
//       name: name,
//       columns: {
//         deleteMany: {
//           NOT: columns.map(({ id }) => ({ id })),
//         },
//         upsert: columns.map((column) => ({
//           where: { id: column.id },
//           create: {
//             name: column.name,
//             order: newTaskOrder,
//           },
//           update: {
//             name: column.name,
//             order: column.order,
//             // tasks: {
//             //   updateMany: column.tasks.map((task) => ({
//             //     where: { id: task.id },
//             //     data: {
//             //       order: task.order,
//             //       // columnId: task.columnId,
//             //     },
//             //   })),
//             // },
//           },
//         })),
//       },
//       user: {
//         connect: {
//           id: userId,
//         },
//       },
//     },
//   });
//   revalidatePath("/board");
// }

export async function updateBoard(
  data: EditFormFields,
  boardId: string,
  userId: string,
  shouldUpdateTasks = false,
) {
  const { name, editColumns } = data;

  if (!boardId) return;

  const lastColumn = await getLastColumn(boardId);
  const newTaskOrder = lastColumn ? lastColumn.order + 1 : 1.0;

  try {
    await prisma.$transaction(async (prisma) => {
      await prisma.board.update({
        where: { id: boardId },
        data: { name },
      });

      const columnIds = editColumns?.map((col) => col.id);
      await prisma.column.deleteMany({
        where: {
          boardId,
          id: { notIn: columnIds },
        },
      });

      const columnPromises = editColumns?.map((column) =>
        prisma.column.upsert({
          where: { id: column.id },
          create: {
            id: column.id,
            name: column.name,
            order: newTaskOrder,
            boardId,
          },
          update: {
            name: column.name,
            order: column.order,
          },
        }),
      );

      await Promise.all(columnPromises);

      if (shouldUpdateTasks) {
        const taskUpdatePromises = editColumns?.flatMap((column) =>
          column.tasks?.map((task) =>
            prisma.task.update({
              where: { id: task.id },
              data: {
                order: task.order,
                columnId: column.id,
                status: column.name,
              },
            }),
          ),
        );

        await Promise.all(taskUpdatePromises);
      }
    });

    console.log("Board updated successfully");
  } catch (error) {
    console.error("Failed to update board:", error);
    throw new Error("Board update failed");
  }
}

export async function createTask({
  data,
  columnId,
}: {
  data: DataProps;
  columnId?: string;
}) {
  const { subTasks, title, description, status } = data;

  if (!columnId) return;

  const lastTask = await getLastTask(columnId);
  const newTaskOrder = lastTask ? lastTask.order + 1 : 1.0;

  await prisma.task.create({
    data: {
      subTasks: {
        create: subTasks.map((subTask) => ({
          title: subTask.title.trim(),
          isCompleted: false,
        })),
      },
      title: title.trim(),
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
      title: title.trim(),
      description: description,
      status: status,
      subTasks: {
        deleteMany: {
          NOT: subTasks.map(({ id }) => ({ id })),
        },
        upsert: subTasks.map((subTask) => ({
          where: { id: subTask.id },
          create: {
            title: subTask.title.trim(),
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

// export async function updateTasksForColumns(
//   columnsState: ColumnProps[],
//   userId: string,
// ) {
//   for (const column of columnsState) {
//     if (column.tasks && column.tasks.length > 0) {
//       for (const task of column.tasks) {
//         try {
//           await prisma.task.update({
//             where: {
//               id: task.id,
//             },
//             data: {
//               title: task.title,
//               description: task.description,
//               status: task.status,
//               subTasks: {
//                 deleteMany: {
//                   NOT: task.subTasks.map(({ id }) => ({ id })),
//                 },
//                 upsert: task.subTasks.map((subTask) => ({
//                   where: { id: subTask.id },
//                   create: {
//                     title: subTask.title,
//                     isCompleted: subTask.isCompleted,
//                   },
//                   update: {
//                     title: subTask.title,
//                     isCompleted: subTask.isCompleted,
//                   },
//                 })),
//               },
//               column: {
//                 connect: {
//                   id: column.id,
//                 },
//               },
//             },
//           });

//           console.log(`Task with ID ${task.id} updated successfully.`);
//         } catch (error) {
//           console.error(`Error updating task with ID ${task.id}:`, error);
//         }
//       }
//     }
//   }
//   revalidatePath("/board");
// }

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
