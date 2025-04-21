import EditTask from "@/_components/dialog/EditTask";
import TaskDialog from "@/_components/dialog/TaskDialog";
import useDialogRef from "@/_hooks/useDialogRef";
import { getCompletedSubtasksLength } from "@/_lib/utils/helpers";
import { TaskProps } from "@/_types/types";
import { GripVertical } from "lucide-react";
import { memo, RefObject, useCallback, useState } from "react";

interface TasksProps {
  task: TaskProps;
  handleTaskClick: (task: TaskProps) => void;
}

function Tasks({ task, handleTaskClick }: TasksProps) {
  const completedSubtasks = getCompletedSubtasksLength(task.subTasks);

  return (
    <>
      <div
        onClick={() => handleTaskClick(task)}
        className="flex size-full items-center gap-1 p-4"
      >
        <GripVertical />

        <div className="w-full">
          <div className="font-bold text-theme_white">{task.title}</div>
          <div className="mt-1 text-xs font-bold text-primary-300">
            {`${completedSubtasks} of
            ${task?.subTasks.length} subtasks`}
          </div>
        </div>
      </div>
    </>
  );
}

export default memo(Tasks);
