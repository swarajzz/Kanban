"use client";
import React, { RefObject } from "react";
import { Button } from "../ui/Button";
import DialogPanel from "./DialogPanel";
import { ColumnProps, TaskProps, UpdateSubtaskProps } from "@/app/_types/types";
import Dialog from "./Dialog";
import { getColumnId, getRandomPlaceholder } from "@/app/_lib/utils/helpers";
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
  columns,
}: {
  dialogRef: RefObject<HTMLDialogElement>;
  toggleDialog: () => void;
  task?: TaskProps;
  columns: ColumnProps[];
}) {
  const { subTasks: originalSubtasks, id: taskId } = task || {};

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: task?.title ?? "",
      description: task?.description ?? "",
      subTasks:
        task?.subTasks.map((subTask) => {
          return {
            id: subTask?.id ?? "",
            title: subTask?.title ?? "",
            isCompleted: subTask?.isCompleted ?? false,
            placeholder: subTask?.placeholder ?? getRandomPlaceholder(),
          };
        }) ?? [],
      status: task?.status ?? "",
    },
  });

  const { fields, append, prepend, remove } = useFieldArray({
    name: "subTasks",
    control,
  });

  const processForm = async (data: {
    description: string;
    status: string;
    subTasks: UpdateSubtaskProps[];
    title: string;
  }) => {
    const columnId = getColumnId(columns, data.status);

    task
      ? await updateTask({ data, taskId, columnId })
      : await createTask({ data, columnId });

    toggleDialog();
  };

  return (
    <Dialog ref={dialogRef} toggleDialog={toggleDialog}>
      <DialogPanel
        title={task ? "Edit Task" : "Add New Task"}
        toggleDialog={toggleDialog}
      >
        <Form submitHandler={handleSubmit(processForm)}>
          <FormRow label="Title" error={errors?.title?.message}>
            <Input
              register={register}
              validationSchema={{
                required: "This field is required",
              }}
              placeholder="e.g Web Design"
              type="text"
              name="title"
            />
          </FormRow>

          <FormRow label="Description" error={errors?.description?.message}>
            <Input
              register={register}
              validationSchema={{
                required: "This field is required",
              }}
              element="textarea"
              placeholder="e.g It's always good to take a break. This 15 minute break will recharge the batteries a little"
              type="text"
              cols={5}
              rows={5}
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
                  id: "",
                  title: "",
                  placeholder: getRandomPlaceholder(),
                  isCompleted: false,
                });
              }}
            >
              + Add New Subtask
            </Button>
          </FieldSet>

          <FormRow label="Status" error={errors?.status?.message}>
            <Input
              register={register}
              validationSchema={{
                required: "This field is required",
              }}
              name="status"
              element="select"
              type="select"
            >
              <option disabled value="">
                -- select an option --
              </option>

              {columns?.map((column) => (
                <option key={column.id} value={column.name}>
                  {column.name}
                </option>
              ))}
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
