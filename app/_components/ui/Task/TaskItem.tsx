"use client";
import { useCallback, useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import useDialogRef from "@/_hooks/useDialogRef";
import { getCompletedSubtasksLength } from "@/_lib/utils/helpers";
import { TaskProps } from "@/_types/types";
import Tasks from "./Tasks";
import { GripVertical } from "lucide-react";

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
        className="bg-primary-50 text-primary-700 flex min-h-24 items-center justify-center gap-2 rounded-lg border-2 border-primary-300 opacity-50 shadow-inner cursor-grab"
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
      />
    );
  }

  return (
    <li
      className="hover:bg-muted/70 relative flex min-h-24 cursor-grab items-center justify-center gap-2 rounded-lg bg-content_bkg transition-transform duration-200 hover:scale-[1.01] hover:shadow-md hover:ring-2 hover:ring-primary-300 active:cursor-grabbing"
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
