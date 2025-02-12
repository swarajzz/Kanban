import ColumnList from "../../_components/ui/Column/ColumnList";
import EmptyPage from "../../_components/ui/EmptyPage";
import { auth } from "../../_lib/auth";
import { getBoard, getTasks } from "../../_lib/data-service";

export default async function Board({
  params: { board: boardName },
}: {
  params: { board: string };
}) {
  const session = await auth();
  const board = await getBoard(boardName);
  const tasks = await getTasks(board.id);
  const { columns } = board;

  return (
    <>
      {columns.length > 0 && session?.user?.id ? (
        <ColumnList
          columns={columns}
          tasks={tasks}
          board={board}
          userId={session?.user?.id}
        />
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
