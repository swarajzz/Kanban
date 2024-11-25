"use client";
import useDialogRef from "@/app/_hooks/useDialogRef";
import { BoardProps, ColumnProps, TaskProps } from "@/app/_types/types";
import { GripVertical } from "lucide-react";
import TaskDialog from "../../dialog/TaskDialog";
import { useState } from "react";
import NewEditTask from "../../dialog/NewEditTask";
import { getCompletedSubtasksLength } from "@/app/_lib/utils/helpers";
import { useBoardStore } from "@/app/_store/store";

function TaskItem({
  task,
  board,
  columns,
}: {
  task: TaskProps;
  board: BoardProps;
  columns: ColumnProps[];
}) {
  const { dialogRef: viewDialogRef, toggleDialog: toggleViewDialog } =
    useDialogRef();
  const { dialogRef: editDialogRef, toggleDialog: toggleEditDialog } =
    useDialogRef();

  useBoardStore.setState({ board });

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
        columns={columns}
        isShowDropdown={isShowDropdown}
        toggleShowDropdown={toggleShowDropdown}
        toggleEditDialog={toggleEditDialog}
      />

      {viewDialogRef.current ? (
        <NewEditTask
          dialogRef={editDialogRef}
          toggleDialog={toggleEditDialog}
          task={task}
          columns={columns}
        />
      ) : (
        ""
      )}
    </>
  );
}

export default TaskItem;
