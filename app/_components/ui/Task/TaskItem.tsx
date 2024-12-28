"use client";
import { useCallback, useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import useDialogRef from "@/_hooks/useDialogRef";
import { getCompletedSubtasksLength } from "@/_lib/utils/helpers";
import { TaskProps } from "@/_types/types";
import Tasks from "./Tasks";

function TaskItem({
  title,
  id,
  task,
}: {
  title: string;
  id: string;
  task: TaskProps;
}) {
  const { subTasks } = task || [];

  const [isShowDropdown, setShowDropdown] = useState(true);
  const completedSubtasks = getCompletedSubtasksLength(subTasks);

  const { dialogRef: viewDialogRef, toggleDialog: toggleViewDialog } =
    useDialogRef();
  const { dialogRef: editDialogRef, toggleDialog: toggleEditDialog } =
    useDialogRef();

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: id,
    data: {
      type: "Task",
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const handleClick = useCallback(() => {
    toggleViewDialog();
    setShowDropdown(false);
  }, []);

  const toggleShowDropdown = useCallback(() => {
    setShowDropdown((prev) => !prev);
  }, []);

  if (isDragging) {
    return (
      <li
        className="flex min-h-24 cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-rose-400 opacity-30"
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
      />
    );
  }

  return (
    <li
      className="flex min-h-24 cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary-500"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      title={title}
    >
      <Tasks
        handleClick={handleClick}
        task={task}
        completedSubtasks={completedSubtasks}
        viewDialogRef={viewDialogRef}
        toggleViewDialog={toggleViewDialog}
        isShowDropdown={isShowDropdown}
        toggleShowDropdown={toggleShowDropdown}
        editDialogRef={editDialogRef}
        toggleEditDialog={toggleEditDialog}
      />
    </li>
  );
}

export default TaskItem;
