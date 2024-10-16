import { TaskProps } from "@/app/_types/types";
import TaskItem from "./TaskItem";

function Tasks({ tasks }: { tasks: TaskProps[] }) {

  return (
    <ul className="flex w-full flex-col gap-5">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
}

export default Tasks;
