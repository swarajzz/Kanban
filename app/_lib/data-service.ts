/////////////
// GET
import prisma from "./prisma";

// export async function getUser(email = session.user.email) {
//   const user = await prisma.user.findUnique({
//     where: {
//       email: email,
//     },
//   });

//   return user;
// }

export async function getBoard(boardName: string) {
  const board = await prisma.board.findFirst({
    where: {
      name: {
        contains: boardName.replace(/-/g, " "),
        mode: "insensitive",
      },
    },
  });

  return board;
}

export async function getBoards(id: string) {
  const boards = await prisma.board.findMany({
    where: { userId: id },
  });

  return boards;
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
