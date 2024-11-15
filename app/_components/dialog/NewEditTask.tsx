"use client";
import React, { RefObject, useState } from "react";
import { Button } from "../ui/Button";
import DialogPanel from "./DialogPanel";
import { SubTaskItem, TaskProps } from "@/app/_types/types";
import Dialog from "./Dialog";
import { getRandomPlaceholder } from "@/app/_lib/utils/helpers";
import { createTask, updateTask } from "@/app/_lib/actions";
import { useFieldArray, useForm } from "react-hook-form";
import SubtaskList from "../ui/Subtask/SubtaskList";

function NewEditTask({
  dialogRef,
  toggleDialog,
  task,
  columnId,
}: {
  dialogRef: RefObject<HTMLDialogElement>;
  toggleDialog: () => void;
  task?: TaskProps;
  columnId?: string;
}) {
  const { subTasks: initialSubTasks = [] } = task || {};

  type FormValues = {
    subTask: {
      title: string;
      placeholder: string;
    }[];
  };

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: task?.title ?? "",
      description: task?.description ?? "",
      subTasks: task?.subTasks.map((subTask) => {
        return {
          title: subTask?.title || "",
          placeholder: subTask?.placeholder ?? getRandomPlaceholder(),
        };
      }),
      status: task?.status ?? "",
    },
  });

  const { fields, append, prepend, remove } = useFieldArray({
    name: "subTasks",
    control,
  });

  const formHandler = !task ? createTask : updateTask;

  // const [data, formAction] = useFormState(formHandler, null);

  const processForm = async (data) => {
    console.log(data);
    // const result = await update(data);

    // if (!result) {
    //   console.log("Something went wrong");
    //   return;
    // }

    // if (result.error) {
    //   // set local error state
    //   console.log(result.error);
    //   return;
    // }

    // reset();
    // setData(result.data);
  };

  return (
    <Dialog ref={dialogRef} toggleDialog={toggleDialog}>
      <DialogPanel title="Add New Task" toggleDialog={toggleDialog}>
        <form
          onSubmit={handleSubmit(processForm)}
          className="txt-xs flex flex-col gap-4 px-8 pb-4"
        >
          <div className="flex flex-col">
            <label className="mb-2 text-sm text-white" htmlFor="boardName">
              Title
            </label>
            <input
              {...register("title", {
                required: "Title is required",
              })}
              placeholder="e.g Web Design"
              className="border-grey-300 rounded bg-primary-500 px-4 py-2 text-white"
              id="boardName"
              type="text"
              defaultValue={task?.title}
              name="title"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 text-sm text-white" htmlFor="description">
              Description
            </label>
            <textarea
              {...register("description", {
                required: "Description is required",
              })}
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

            <SubtaskList fields={fields} register={register} remove={remove} />

            <Button
              type="button"
              size="md"
              intent={"secondary"}
              className=""
              onClick={() => {
                append({
                  title: "",
                  placeholder: getRandomPlaceholder(),
                });
              }}
            >
              + Add New Subtask
            </Button>
          </fieldset>

          <input type="hidden" name="columnId" value={columnId} />
          <input type="hidden" name="taskId" value={task?.id} />

          <div className="flex flex-col">
            <label className="mb-2 text-sm text-white" htmlFor="boardName">
              Status
            </label>

            <div className="relative">
              <select
                {...register("status", {
                  required: true,
                })}
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
          <div className="mb-6 flex flex-col gap-5">
            <Button type="submit" size="md" intent={"primary"}>
              {task ? "Save Changes" : "Create Task"}
            </Button>
          </div>
        </form>
      </DialogPanel>
    </Dialog>
  );
}

export default NewEditTask;
