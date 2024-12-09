"use client";
import useDialogRef from "@/app/_hooks/useDialogRef";
import { BoardProps, ColumnProps, TaskProps } from "@/app/_types/types";
import { GripVertical } from "lucide-react";
import TaskDialog from "../../dialog/TaskDialog";
import { useEffect, useState } from "react";
import { getCompletedSubtasksLength } from "@/app/_lib/utils/helpers";
import { useBoardStore } from "@/app/_store/store";
import EditTask from "../../dialog/EditTask";

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

  useEffect(() => {
    useBoardStore.setState({ board });
    useBoardStore.setState({ columns });
  }, [board, columns]);

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
    <li className="flex min-h-24 cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary-500">
      <div
        onClick={handleClick}
        className="flex size-full items-center gap-1 p-3"
      >
        <GripVertical />
        <div className="w-full">
          <div className="font-bold text-white">{title}</div>
          <div className="mt-1 text-xs text-primary-300">
            {`${completedSubtasks} of
            ${task?.subTasks.length} subtasks`}
          </div>
        </div>
      </div>

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
        <EditTask
          dialogRef={editDialogRef}
          toggleDialog={toggleEditDialog}
          task={task}
          columns={columns}
        />
      ) : (
        ""
      )}
    </li>
  );
}

export default TaskItem;
