import { BoardProps, ColumnProps } from "@/app/_types/types";
import React from "react";
import Tasks from "../Task/Tasks";

function Column({
  column: { id, name },
  board,
}: {
  column: ColumnProps;
  board: BoardProps;
}) {
  return (
    <li className="mb-4 flex min-w-72 max-w-80 flex-col items-center gap-3">
      <div className="flex items-center gap-5 self-start">
        <div className="border-radius h-3 w-3 rounded-full bg-accent-500"></div>
        <h3 className="text-sm font-bold uppercase">{name}</h3>
      </div>
      <Tasks columnId={id} board={board} />
    </li>
  );
}

export default Column;
