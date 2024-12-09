"use client";
import React, { RefObject } from "react";
import { Button } from "../ui/Button";
import DialogPanel from "./DialogPanel";
import { ColumnProps, UpdateSubtaskProps } from "@/app/_types/types";
import Dialog from "./Dialog";
import { getColumnId, getRandomPlaceholder } from "@/app/_lib/utils/helpers";
import { createTask } from "@/app/_lib/actions";
import { useFieldArray, useForm } from "react-hook-form";
import SubtaskList from "../ui/Subtask/SubtaskList";
import Form from "../ui/Form/Form";
import FormRow from "../ui/Form/FormRow";
import Input from "../ui/Form/Input";
import FieldSet from "../ui/Form/FieldSet";
import { useBoardStore } from "@/app/_store/store";

function NewTask({
  dialogRef,
  toggleDialog,
}: {
  dialogRef: RefObject<HTMLDialogElement>;
  toggleDialog: () => void;
}) {
  const { columns } = useBoardStore();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      newSubtasks: [
        {
          id: "",
          title: "",
          placeholder: "Random Placeholder",
          isCompleted: false,
        },
        {
          id: "",
          title: "",
          placeholder: "Random Placeholder",
          isCompleted: false,
        },
      ],
      status: "",
    },
  });

  const { fields, append, prepend, remove } = useFieldArray({
    name: "newSubtasks",
    control,
  });

  const processForm = async (data: {
    description: string;
    status: string;
    newSubtasks: UpdateSubtaskProps[];
    title: string;
  }) => {
    console.log(data);
    const columnId = getColumnId(columns, data.status);

    const transformedData = {
      title: data.title,
      description: data.description,
      status: data.status,
      subTasks: data.newSubtasks,
    };

    await createTask({ data: transformedData, columnId });

    toggleDialog();
  };

  return (
    <Dialog ref={dialogRef} toggleDialog={toggleDialog}>
      <DialogPanel title="Add New Task" toggleDialog={toggleDialog}>
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
            <SubtaskList
              fields={fields}
              register={register}
              remove={remove}
              errors={errors}
              fieldName="newSubtasks"
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
              Create Task
            </Button>
          </div>
        </Form>
      </DialogPanel>
    </Dialog>
  );
}

export default NewTask;
