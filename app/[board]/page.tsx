import Header from "../_components/layout/Header";
import ColumnList from "../_components/ui/Column/ColumnList";
import EmptyPage from "../_components/ui/EmptyPage";
import { auth } from "../_lib/auth";
import { getBoard, getColumns } from "../_lib/data-service";

export default async function Board({
  params: { board: boardName },
}: {
  params: { board: string };
}) {
  const session = await auth();
  const board = await getBoard(boardName);
  const columns = await getColumns(board.id);

  return (
    <>
      {columns.length > 0 ? (
        <>
          <ColumnList columns={columns} board={board} />
        </>
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
