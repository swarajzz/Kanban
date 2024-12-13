"use client";
import useDialogRef from "@/app/_hooks/useDialogRef";
import { TaskProps } from "@/app/_types/types";
import { GripVertical } from "lucide-react";
import TaskDialog from "../../dialog/TaskDialog";
import { useState } from "react";
import { getCompletedSubtasksLength } from "@/app/_lib/utils/helpers";
import EditTask from "../../dialog/EditTask";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function TaskItem({ task }: { task: TaskProps }) {
  const { title, subTasks } = task;

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
    id: task.id,
    data: {
      type: "Task",
      task,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const handleClick = () => {
    toggleViewDialog();
    setShowDropdown(false);
  };

  const toggleShowDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  if (isDragging) {
    return (
      <li
        className="flex size-full min-h-24 cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-rose-400 opacity-30"
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
    >
      <div onClick={handleClick} className="flex items-center gap-1 p-3">
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
        isShowDropdown={isShowDropdown}
        toggleShowDropdown={toggleShowDropdown}
        toggleEditDialog={toggleEditDialog}
      />

      {viewDialogRef.current ? (
        <EditTask
          dialogRef={editDialogRef}
          toggleDialog={toggleEditDialog}
          task={task}
        />
      ) : (
        ""
      )}
    </li>
  );
}

export default TaskItem;
