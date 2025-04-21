"use client";
import React, { RefObject, useEffect } from "react";
import { Button } from "../ui/Button";
import DialogPanel from "./DialogPanel";
import Dialog from "./Dialog";
import { SubTaskProps, TaskProps } from "@/app/_types/types";
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
import { useBoardStore } from "@/app/_store/store";
import { useParams } from "next/navigation";
import { toast } from "sonner";

function TaskDialog({
  dialogRef,
  task,
  isShowDropdown,
  toggleDialog,
  toggleShowDropdown,
  toggleEditDialog,
}: {
  dialogRef: RefObject<HTMLDialogElement>;
  task: TaskProps | null;
  isShowDropdown: boolean;
  toggleDialog: () => void;
  toggleShowDropdown: () => void;
  toggleEditDialog: () => void;
}) {
  // const { id: taskId, title, description, subTasks, status: taskStatus } = task;
  // const completedSubtasks = getCompletedSubtasksLength(subTasks);

  const { board: boardPath } = useParams<{ board: string }>();

  const { columns } = useBoardStore();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    setValue,
    reset,
    watch,
  } = useForm({
    defaultValues: {
      title: task?.title ?? "",
      description: task?.description ?? "",
      checked_status: task?.status ?? "",
      checkSubtasks:
        task?.subTasks.map((subTask) => ({
          ...subTask,
        })) || [],
    },
  });

  const checkedBoxes = watch("checkSubtasks");

  const totalChecked = checkedBoxes
    ? checkedBoxes.filter((subtask) => subtask.isCompleted).length
    : 0;

  useEffect(() => {
    reset({
      title: task?.title ?? "",
      description: task?.description ?? "",
      checked_status: task?.status ?? "",
      checkSubtasks: task?.subTasks.map((subTask) => ({
        ...subTask,
      })),
    });
  }, [reset, task]);

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
    const columnId = getColumnId(columns ?? [], data.checked_status);

    const transformedData = {
      title: data.title,
      description: data.description,
      status: data.checked_status,
      subTasks: data.checkSubtasks,
    };

    const taskId = task?.id ?? "";

    try {
      const res = await updateTask({
        data: transformedData,
        taskId,
        columnId,
        boardPath,
      });

      if (!res.success) {
        toast.error(`Failed to update task: ${res.message}`);
      } else {
        toggleDialog();
        toast.success("Task updated successfully!");
      }
    } catch {
      toast.error("Something went wrong while updating the task.");
    }
  };

  const handleInputChanges = (
    event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
  ) => {
    const value = event.target.value;
    setValue("checked_status", value);
  };

  return (
    <Dialog ref={dialogRef} toggleDialog={toggleDialog}>
      <DialogPanel
        title={task?.title || ""}
        icon="grip"
        toggleDialog={toggleDialog}
        toggleShowDropdown={toggleShowDropdown}
      >
        <Form submitHandler={handleSubmit(processForm)}>
          <div className="rounded border-primary-300 bg-content_bkg text-primary-300">
            {task?.description}
          </div>

          <FieldSet
            legend={`Subtasks ${totalChecked} of
              ${task?.subTasks.length}`}
          >
            <CheckedSubtaskList fields={fields} register={register} />
          </FieldSet>

          <FormRow label="Status" error={errors?.checked_status?.message}>
            <Input
              element="select"
              control={control}
              register={register}
              onChange={handleInputChanges}
              validationSchema={{
                required: "This field is required",
              }}
              name="checked_status"
              value={task?.status}
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
            taskId={task?.id ?? ""}
          />
        ) : (
          ""
        )}
      </DialogPanel>
    </Dialog>
  );
}

export default TaskDialog;
