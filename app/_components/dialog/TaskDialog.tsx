"use client";
import React, { RefObject } from "react";
import CrossIcon from "../ui/CrossIcon";
import { Button } from "../ui/Button";
import DialogPanel from "./DialogPanel";
import Dialog from "./Dialog";
import { TaskProps } from "@/app/_types/types";
import SubTaskItem from "../ui/Task/SubTaskItem";

function TaskDialog({
  dialogRef,
  toggleDialog,
  task,
}: {
  dialogRef: RefObject<HTMLDialogElement>;
  toggleDialog: () => void;
  task: TaskProps;
}) {
  const { title, description, subTasks } = task;
  return (
    <Dialog ref={dialogRef}>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            className="relative my-8 w-full max-w-md transform overflow-hidden rounded-lg bg-primary-500 text-left shadow-xl transition-all"
            title={title}
            icon="grip"
            toggleDialog={toggleDialog}
          >
            <form className="txt-xs flex flex-col gap-4 px-8 pb-4">
              <div className="border-grey-300 rounded bg-primary-500 text-primary-300">
                {description}
              </div>

              <fieldset className="flex flex-col gap-3">
                <legend className="mb-3 text-white">Subtasks (2 of 2)</legend>

                <ul className="flex w-full flex-col gap-3">
                  {subTasks.map((subTask) => (
                    <SubTaskItem key={subTask.id} subTask={subTask} />
                  ))}
                </ul>
              </fieldset>

              <div className="flex flex-col">
                <label className="mb-2 text-sm text-white" htmlFor="boardName">
                  Status
                </label>

                <div className="relative">
                  <select
                    name="status"
                    id="status-select"
                    className="border-grey-300 relative w-full max-w-xl rounded bg-primary-500 px-4 py-2 text-white"
                  >
                    <option value="Todo">Todo</option>
                    <option value="Done">Done</option>
                  </select>

                  <svg
                    width="10"
                    height="7"
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke="#635FC7"
                      strokeWidth="2"
                      fill="none"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </div>
              </div>
            </form>

            <div className="mb-6 flex flex-col gap-5 px-4 sm:px-6">
              <Button size="md" intent={"primary"}>
                Save Task Changes
              </Button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

export default TaskDialog;
