import { TaskProps } from "@/app/_types/types";
import { GripVertical } from "lucide-react";

function TaskItem({
  task: { title, status, description, subTasks },
}: {
  task: TaskProps;
}) {
    return (
    <li className="flex min-h-24 items-center gap-2 rounded-lg bg-primary-500 p-3">
      <GripVertical />
      <div className="flex flex-col gap-1">
        <div className="font-bold text-white">{title}</div>
        <div className="text-xs text-primary-300">2 of 2 subtasks</div>
      </div>
    </li>
  );
}

export default TaskItem;
