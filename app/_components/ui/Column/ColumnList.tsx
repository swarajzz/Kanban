import { ColumnProps } from "@/app/_types/types";
import Column from "./Column";

function ColumnList({ columns }: { columns: ColumnProps[] }) {
  return (
    <ul className="flex gap-5">
      {columns.map((column) => (
        <Column key={column.id} column={column} />
      ))}
    </ul>
  );
}

export default ColumnList;
