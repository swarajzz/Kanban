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
import Form from "../ui/Form/Form";
import FormRow from "../ui/Form/FormRow";
import Input from "../ui/Form/Input";
import FieldSet from "../ui/Form/FieldSet";

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
    // console.log(data, errors);
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
        <Form submitHandler={handleSubmit(processForm)}>
          <FormRow label="Title" error={errors?.title?.message}>
            <Input
              {...register("title", {
                required: "This field is required",
              })}
              placeholder="e.g Web Design"
              id="boardName"
              type="text"
              defaultValue={task?.title}
              name="title"
            />
          </FormRow>

          <FormRow label="Description" error={errors?.description?.message}>
            <Input
              {...register("description", {
                required: "This field is required",
              })}
              element="textarea"
              placeholder="e.g It's always good to take a break. This 15 minute break will recharge the batteries a little"
              id="description"
              type="text"
              cols={5}
              rows={5}
              defaultValue={task?.description}
              name="description"
            />
          </FormRow>

          <FieldSet legend="Subtasks">
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
          </FieldSet>

          <Input type="hidden" name="columnId" value={columnId} />
          <Input type="hidden" name="taskId" value={task?.id} />

          <FormRow label="Status" error={errors?.status?.message}>
            <Input
              {...register("status", {
                required: true,
              })}
              element="select"
              type="select"
              id="status"
              defaultValue={task?.status}
            >
              <option value="Todo">Todo</option>
              <option value="Done">Done</option>
            </Input>
          </FormRow>

          <div className="mb-6 flex flex-col gap-5">
            <Button type="submit" size="md" intent={"primary"}>
              {task ? "Save Changes" : "Create Task"}
            </Button>
          </div>
        </Form>
      </DialogPanel>
    </Dialog>
  );
}

export default NewEditTask;
