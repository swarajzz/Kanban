"use client";
import useDialogRef from "@/app/_hooks/useDialogRef";
import { TaskProps } from "@/app/_types/types";
import { GripVertical } from "lucide-react";
import TaskDialog from "../../dialog/TaskDialog";
import { useState } from "react";
import NewEditTask from "../../dialog/NewEditTask";
import { getCompletedSubtasksLength } from "@/app/_lib/utils/helpers";

function TaskItem({ task, columnId }: { task: TaskProps; columnId: string }) {
  const { dialogRef: viewDialogRef, toggleDialog: toggleViewDialog } =
    useDialogRef();
  const { dialogRef: editDialogRef, toggleDialog: toggleEditDialog } =
    useDialogRef();

  const { title, subTasks } = task;

  const [isShowDropdown, setShowDropdown] = useState(true);
  const completedSubtasks = getCompletedSubtasksLength(subTasks);

  const handleClick = () => {
    toggleViewDialog();
    setShowDropdown(false);
  };

  const toggleShowDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  return (
    <>
      <li
        onClick={handleClick}
        className="flex min-h-24 cursor-pointer items-center gap-2 rounded-lg bg-primary-500 p-3"
      >
        <GripVertical />
        <div className="flex flex-col gap-1">
          <div className="font-bold text-white">{title}</div>
          <div className="text-xs text-primary-300">
            {`${completedSubtasks} of
            ${task?.subTasks.length} subtasks`}
          </div>
        </div>
      </li>

      <TaskDialog
        dialogRef={viewDialogRef}
        toggleDialog={toggleViewDialog}
        task={task}
        isShowDropdown={isShowDropdown}
        toggleShowDropdown={toggleShowDropdown}
        toggleEditDialog={toggleEditDialog}
      />

      {viewDialogRef.current ? (
        <NewEditTask
          dialogRef={editDialogRef}
          toggleDialog={toggleEditDialog}
          task={task}
          columnId={columnId}
        />
      ) : (
        ""
      )}
    </>
  );
}

export default TaskItem;
