/////////////
// GET
import prisma from "./prisma";

export async function getUser(id: string) {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });

  return user;
}

export async function getBoard(boardName: string) {
  const board = await prisma.board.findFirst({
    where: {
      name: {
        contains: boardName.replace(/-/g, " "),
        mode: "insensitive",
      },
    },
  });

  if (!board) {
    throw new Error("Board not Found");
  }

  return board;
}

export async function getBoards(id: string) {
  const boards = await prisma.board.findMany({
    where: { userId: id },
  });

  return boards;
}

export async function getColumns(boardId: string) {
  const columns = prisma.column.findMany({
    where: {
      boardId: boardId,
    },
  });

  return columns;
}

export async function getTasks(columnId: string) {
  const tasks = await prisma.task.findMany({
    where: {
      columnId: columnId,
    },
    include: {
      subTasks: true,
    },
  });

  return tasks;
}

/////////////
// CREATE
// export async function createUser(newUser) {
//   const user = await prisma.user.create({
//     data: newUser,
//   });

//   return user;
// }

/////////////
// UPDATE

/////////////
// DELETE
