"use client";
import React, { RefObject } from "react";
import { Button } from "../ui/Button";
import DialogPanel from "./DialogPanel";
import Dialog from "./Dialog";
import { ColumnProps, SubTaskProps, TaskProps } from "@/app/_types/types";
import TaskDropdown from "./TaskDropdown";
import Form from "../ui/Form/Form";
import FieldSet from "../ui/Form/FieldSet";
import FormRow from "../ui/Form/FormRow";
import Input from "../ui/Form/Input";
import { useFieldArray, useForm } from "react-hook-form";
import CheckedSubtaskList from "../ui/Task/CheckedSubtaskList";
import {
  getColumnId,
  getCompletedSubtasksLength,
} from "@/app/_lib/utils/helpers";
import { updateTask } from "@/app/_lib/actions";
import { HashLoader } from "react-spinners";

function TaskDialog({
  dialogRef,
  task,
  isShowDropdown,
  toggleDialog,
  toggleShowDropdown,
  toggleEditDialog,
  columns,
}: {
  dialogRef: RefObject<HTMLDialogElement>;
  task: TaskProps;
  isShowDropdown: boolean;
  toggleDialog: () => void;
  toggleShowDropdown: () => void;
  toggleEditDialog: () => void;
  columns: ColumnProps[];
}) {
  const { id: taskId, title, description, subTasks, status: taskStatus } = task;
  const completedSubtasks = getCompletedSubtasksLength(subTasks);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: task?.title ?? "",
      description: task?.description ?? "",
      checked_status: task.status ?? "",
      checkSubtasks: task.subTasks.map((subTask) => ({
        ...subTask,
      })),
    },
  });

  const { fields } = useFieldArray({
    name: "checkSubtasks",
    control,
  });

  const processForm = async (data: {
    title: string;
    description: string;
    checked_status: string;
    checkSubtasks: SubTaskProps[];
  }) => {
    const columnId = getColumnId(columns, data.checked_status);

    const transformedData = {
      title: data.title,
      description: data.description,
      status: data.checked_status,
      subTasks: data.checkSubtasks,
    };

    await updateTask({ data: transformedData, taskId, columnId });
    toggleDialog();
  };

  return (
    <Dialog ref={dialogRef} toggleDialog={toggleDialog}>
      <DialogPanel
        title={title}
        icon="grip"
        toggleDialog={toggleDialog}
        toggleShowDropdown={toggleShowDropdown}
      >
        <Form submitHandler={handleSubmit(processForm)}>
          <div className="border-grey-300 rounded bg-primary-500 text-primary-300">
            {description}
          </div>

          <FieldSet
            legend={`Subtasks ${completedSubtasks} of
              ${subTasks.length}`}
          >
            <CheckedSubtaskList fields={fields} register={register} />
          </FieldSet>

          <FormRow label="Status" error={errors?.checked_status?.message}>
            <Input
              element="select"
              register={register}
              validationSchema={{
                required: "This field is required",
              }}
              name="checked_status"
            >
              <option disabled value="">
                -- select an option --
              </option>

              {columns.map((column) => (
                <option key={column.id} value={column.name}>
                  {column.name}
                </option>
              ))}
            </Input>
          </FormRow>

          <div className="mb-6 flex flex-col gap-5">
            {!isSubmitting ? (
              <Button
                disabled={isSubmitting}
                type="submit"
                size={"md"}
                intent={"primary"}
              >
                Save Changes
              </Button>
            ) : (
              <HashLoader className="self-center" color="#635FC7" size={30} />
            )}
          </div>
        </Form>

        {isShowDropdown ? (
          <TaskDropdown
            toggleShowDropdown={toggleShowDropdown}
            toggleDialog={toggleDialog}
            toggleEditDialog={toggleEditDialog}
            taskId={taskId}
          />
        ) : (
          ""
        )}
      </DialogPanel>
    </Dialog>
  );
}

export default TaskDialog;
