import { BoardProps, ColumnProps } from "@/app/_types/types";
import Column from "./Column";

function ColumnList({
  columns,
  board,
}: {
  columns: ColumnProps[];
  board: BoardProps;
}) {
  return (
    <div className="flex size-full gap-10 overflow-auto bg-primary-600 px-4 py-4">
      <ul className="flex gap-5">
        {columns.map((column) => (
          <Column key={column.id} column={column} board={board} />
        ))}
      </ul>
    </div>
  );
}

export default ColumnList;
