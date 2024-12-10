import { BoardProps, ColumnProps } from "@/app/_types/types";
import React from "react";
import Tasks from "../Task/Tasks";

function Column({ column }: { column: ColumnProps }) {
  const { tasks } = column;

  return (
    <li className="mb-4 flex min-w-72 max-w-80 flex-col items-center gap-3">
      <div className="flex items-center gap-5 self-start">
        <div className="border-radius h-3 w-3 rounded-full bg-accent-500"></div>
        <h3 className="text-sm font-bold uppercase">{column.name}</h3>
      </div>
      <Tasks tasks={tasks} />
    </li>
  );
}

export default Column;
