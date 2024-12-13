import { TaskProps } from "@/app/_types/types";
import TaskItem from "./TaskItem";
import { SortableContext } from "@dnd-kit/sortable";
import { useMemo } from "react";

function Tasks({ tasks }: { tasks: TaskProps[] }) {
  const tasksIds = useMemo(() => tasks?.map((task) => task.id), [tasks]);

  return (
    <ul className="flex w-full flex-col gap-5">
      <SortableContext items={tasksIds}>
        {tasks?.map((task) => <TaskItem key={task.id} task={task} />)}
      </SortableContext>
    </ul>
  );
}

export default Tasks;
