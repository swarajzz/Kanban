import EditTask from "@/_components/dialog/EditTask";
import TaskDialog from "@/_components/dialog/TaskDialog";
import { TaskProps } from "@/_types/types";
import { GripVertical } from "lucide-react";
import { memo, RefObject } from "react";

interface TasksProps {
  handleClick: () => void;
  task: TaskProps;
  completedSubtasks: number;
  viewDialogRef: RefObject<HTMLDialogElement>;
  toggleViewDialog: () => void;
  isShowDropdown: boolean;
  toggleShowDropdown: () => void;
  editDialogRef: RefObject<HTMLDialogElement>;
  toggleEditDialog: () => void;
}

function Tasks({
  handleClick,
  task,
  completedSubtasks,
  viewDialogRef,
  toggleViewDialog,
  isShowDropdown,
  toggleShowDropdown,
  editDialogRef,
  toggleEditDialog,
}: TasksProps) {
  console.log("Tasks is rendered");

  return (
    <>
      <div
        onClick={handleClick}
        className="flex size-full items-center gap-1 p-3"
      >
        <GripVertical />

        <div className="w-full">
          <div className="font-bold text-white">{task.title}</div>
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
    </>
  );
}

export default memo(Tasks);
