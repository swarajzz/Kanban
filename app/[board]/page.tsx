import prisma from "../_lib/prisma";
import ColumnList from "../_components/ui/Column/ColumnList";
import EmptyPage from "../_components/ui/EmptyPage";
import { auth } from "../_lib/auth";

export default async function Board({
  params: { board: boardName },
}: {
  params: { board: string };
}) {
  const session = await auth();

  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email ?? "",
      // email: "test@gmail.com",
    },
  });

  if (!user) {
    throw new Error("User not Found");
  }

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

  const allColumns = await prisma.column.findMany({
    where: {
      boardId: board.id,
    },
    include: {
      tasks: {
        include: {
          subTasks: true,
        },
      },
    },
  });

  return (
    <>
      {allColumns.length > 0 ? (
        <div className="flex gap-10 px-4 py-4">
          <ColumnList allColumns={allColumns} />
        </div>
      ) : (
        <EmptyPage
          userId={session?.user?.id || ""}
          title="The board is empty. Create a new column to get started"
          subTitle=""
          btnText="Add New Column"
        />
      )}
    </>
  );
}
