"use client";
import React from "react";
import NewEditTask from "./NewEditTask";
import useDialogRef from "@/app/_hooks/useDialogRef";
import { TaskProps } from "@/app/_types/types";

function TaskDropdown({ task }: { task: TaskProps }) {
  const { dialogRef, toggleDialog } = useDialogRef();

  return (
    <>
      <ul className="absolute -right-12 top-16 flex w-48 flex-col gap-4 rounded-lg border border-primary-400 bg-primary-600 px-4 py-6 text-primary-300 shadow-sm">
        <li
          className="cursor-pointer transition hover:text-accent-200"
          onClick={toggleDialog}
        >
          Edit Task
        </li>
        <li className="cursor-pointer text-accent-400 transition hover:text-accent-300">
          Delete Task
        </li>
      </ul>

      <NewEditTask
        dialogRef={dialogRef}
        toggleDialog={toggleDialog}
        task={task}
      />
    </>
  );
}

export default TaskDropdown;
