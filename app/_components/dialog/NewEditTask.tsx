"use client";
import React, { RefObject, useState } from "react";
import { Button } from "../ui/Button";
import DialogPanel from "./DialogPanel";
import CloseIcon from "../ui/CloseIcon";
import { TaskProps } from "@/app/_types/types";
import Dialog from "./Dialog";
import { defaultSubtasks } from "@/app/_lib/utils/constants";

function NewEditTask({
  dialogRef,
  toggleDialog,
  task,
}: {
  dialogRef: RefObject<HTMLDialogElement>;
  toggleDialog: () => void;
  task?: TaskProps;
}) {
  const { subTasks: initialSubTasks = [] } = task || {};

  const [subTasks, setSubTasks] = useState(
    initialSubTasks.length > 0 ? initialSubTasks : defaultSubtasks,
  );

  console.log(subTasks);

  return (
    <Dialog ref={dialogRef} toggleDialog={toggleDialog}>
      <DialogPanel
        className="relative my-8 w-full max-w-md transform overflow-hidden rounded-lg bg-primary-500 text-left shadow-xl transition-all"
        title="Add New Task"
        toggleDialog={toggleDialog}
      >
        <form className="txt-xs flex flex-col gap-4 px-8 pb-4">
          <div className="flex flex-col">
            <label className="mb-2 text-sm text-white" htmlFor="boardName">
              Title
            </label>
            <input
              placeholder="e.g Web Design"
              className="border-grey-300 rounded bg-primary-500 px-4 py-2 text-white"
              id="boardName"
              type="text"
              defaultValue={task?.title}
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 text-sm text-white" htmlFor="description">
              Description
            </label>
            <textarea
              placeholder="e.g It's always good to take a break. This 15 minute break will recharge the batteries a little"
              className="border-grey-300 rounded bg-primary-500 px-4 py-2 text-white"
              id="description"
              cols={5}
              rows={5}
              defaultValue={task?.description}
            />
          </div>

          <fieldset className="flex flex-col gap-3">
            <legend className="mb-3 text-white">Subtasks</legend>

            {subTasks.map((subTask, index) => (
              <div key={index} className="flex items-center gap-4">
                <input
                  placeholder={`e.g ${subTask?.placeholder ? subTask.placeholder : subTask.title}`}
                  className="border-grey-300 w-full max-w-xl rounded bg-primary-500 px-4 py-2 text-white"
                  type="text"
                  defaultValue={subTask.title}
                />
                <CloseIcon />
              </div>
            ))}

            <Button size="md" intent={"secondary"} className="">
              + Add New Subtask
            </Button>
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
                defaultValue={task?.status}
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
            {task ? "Save Changes" : "Create Task"}
          </Button>
        </div>
      </DialogPanel>
    </Dialog>
  );
}

export default NewEditTask;
