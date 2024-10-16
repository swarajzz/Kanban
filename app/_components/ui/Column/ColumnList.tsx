import { ColumnProps } from "@/app/_types/types";
import Column from "./Column";

function ColumnList({ allColumns }: { allColumns: ColumnProps[] }) {
  return (
      <ul className="flex gap-5">
        {allColumns.map((column) => (
          <Column key={column.id} column={column} />
        ))}
      </ul>
  );
}

export default ColumnList;
