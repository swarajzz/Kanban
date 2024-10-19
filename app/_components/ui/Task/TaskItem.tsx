"use client";
import useDialogRef from "@/app/_hooks/useDialogRef";
import { TaskProps } from "@/app/_types/types";
import { GripVertical } from "lucide-react";
import TaskDialog from "../../dialog/TaskDialog";
import { useState } from "react";

function TaskItem({ task }: { task: TaskProps }) {
  const { dialogRef, toggleDialog } = useDialogRef();
  const [isShow, setIsShow] = useState(false);

  const handleClick = () => {
    toggleDialog();
    setIsShow(false);
  };

  const toggleIsShow = () => {
    setIsShow((prev) => !prev);
  };

  return (
    <>
      <li
        onClick={handleClick}
        className="flex min-h-24 items-center gap-2 rounded-lg bg-primary-500 p-3"
      >
        <GripVertical />
        <div className="flex flex-col gap-1">
          <div className="font-bold text-white">{task.title}</div>
          <div className="text-xs text-primary-300">2 of 2 subtasks</div>
        </div>
      </li>
      <TaskDialog
        dialogRef={dialogRef}
        toggleDialog={toggleDialog}
        task={task}
        isShow={isShow}
        toggleIsShow={toggleIsShow}
      />
    </>
  );
}

export default TaskItem;
