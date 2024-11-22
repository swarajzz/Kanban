import { BoardProps } from "@/app/_types/types";
import TaskItem from "./TaskItem";
import { getColumns, getTasks } from "@/app/_lib/data-service";

async function Tasks({
  columnId,
  board,
}: {
  columnId: string;
  board: BoardProps;
}) {
  const tasks = await getTasks(columnId);
  const columns = await getColumns(board.id);

  return (
    <ul className="flex w-full flex-col gap-5">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} board={board} columns={columns} />
      ))}
    </ul>
  );
}

export default Tasks;
