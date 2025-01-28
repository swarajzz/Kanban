"use client";
import React, { RefObject, useEffect } from "react";
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
import { useBoardStore } from "@/app/_store/store";
import { useParams } from "next/navigation";
import { HashLoader } from "react-spinners";

function EditTask({
  dialogRef,
  toggleDialog,
  task,
}: {
  dialogRef: RefObject<HTMLDialogElement>;
  toggleDialog: () => void;
  task?: TaskProps;
}) {
  const { subTasks: originalSubtasks, id: taskId } = task || {};

  const { columns } = useBoardStore();
  const { board: boardPath } = useParams<{ board: string }>();

  const {
    register,
    handleSubmit,
    control,
    reset,
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
            placeholder: subTask?.placeholder ?? "",
          };
        }) ?? [],
      status: task?.status ?? "",
    },
  });

  useEffect(() => {
    reset({
      title: task?.title ?? "",
      description: task?.description ?? "",
      subTasks:
        task?.subTasks.map((subTask) => {
          return {
            id: subTask?.id ?? "",
            title: subTask?.title ?? "",
            isCompleted: subTask?.isCompleted ?? false,
            placeholder: subTask?.placeholder ?? "",
          };
        }) ?? [],
      status: task?.status ?? "",
    });
  }, [reset, task]);

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
    const columnId = getColumnId(columns ?? [], data.status);

    await updateTask({ data, taskId, columnId, boardPath });

    toggleDialog();
  };

  return (
    <Dialog ref={dialogRef} toggleDialog={toggleDialog}>
      <DialogPanel title="Edit Task" toggleDialog={toggleDialog}>
        <Form submitHandler={handleSubmit(processForm)}>
          <FormRow label="Title" error={errors?.title?.message}>
            <Input
              register={register}
              validationSchema={{
                required: "This field is required",
              }}
              placeholder="e.g Take coffee break"
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
            <SubtaskList
              fields={fields}
              register={register}
              remove={remove}
              errors={errors}
              fieldName="subTasks"
            />

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
              element="select"
              register={register}
              control={control}
              validationSchema={{
                required: "This field is required",
              }}
              name="status"
              defaultValue={task?.status}
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
            {!isSubmitting ? (
              <Button type="submit" size="md" intent={"primary"}>
                Save Changes
              </Button>
            ) : (
              <HashLoader className="self-center" color="#635FC7" size={30} />
            )}
          </div>
        </Form>
      </DialogPanel>
    </Dialog>
  );
}

export default EditTask;
