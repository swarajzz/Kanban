import { TaskProps } from "@/app/_types/types";
import TaskItem from "./TaskItem";
import { getTasks } from "@/app/_lib/data-service";

async function Tasks({ columnId }: { columnId: string }) {
  const tasks = await getTasks(columnId);

  return (
    <ul className="flex w-full flex-col gap-5">
      {tasks.map((task) => (
        <TaskItem columnId={columnId} key={task.id} task={task} />
      ))}
    </ul>
  );
}

export default Tasks;
