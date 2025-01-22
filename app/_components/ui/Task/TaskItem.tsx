"use client";
import { useCallback, useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import useDialogRef from "@/_hooks/useDialogRef";
import { getCompletedSubtasksLength } from "@/_lib/utils/helpers";
import { TaskProps } from "@/_types/types";
import Tasks from "./Tasks";

function TaskItem({
  id,
  task,
  handleTaskClick,
}: {
  id: string;
  task: TaskProps;
  handleTaskClick: (Task: TaskProps) => void;
}) {
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
      className="flex min-h-24 cursor-pointer items-center justify-center gap-2 rounded-lg bg-content_bkg"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <Tasks task={task} handleTaskClick={handleTaskClick} />
    </li>
  );
}

export default TaskItem;
