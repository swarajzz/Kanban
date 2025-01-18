"use client";
import React, { RefObject } from "react";
import { Button } from "../ui/Button";
import DialogPanel from "./DialogPanel";
import Dialog from "./Dialog";
import { useFieldArray, useForm } from "react-hook-form";
import SubtaskList from "../ui/Subtask/SubtaskList";
import Form from "../ui/Form/Form";
import FormRow from "../ui/Form/FormRow";
import Input from "../ui/Form/Input";
import FieldSet from "../ui/Form/FieldSet";
import { createTask } from "@/_lib/actions";
import { UpdateSubtaskProps } from "@/_types/types";
import { getColumnId, getRandomPlaceholder } from "@/_lib/utils/helpers";
import { useBoardStore } from "@/_store/store";
import { HashLoader } from "react-spinners";

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
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      newSubtasks: [
        {
          id: "",
          title: "",
          placeholder: "Make Coffee",
          isCompleted: false,
        },
        {
          id: "",
          title: "",
          placeholder: "Drink Coffee & smile",
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
    const columnId = getColumnId(columns ?? [], data.status);

    const transformedData = {
      title: data.title,
      description: data.description,
      status: data.status,
      subTasks: data.newSubtasks,
    };

    await createTask({ data: transformedData, columnId });
    reset();
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
            {!isSubmitting ? (
              <Button type="submit" size="md" intent={"primary"}>
                Create Task
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

export default NewTask;
