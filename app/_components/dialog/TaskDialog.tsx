"use client";
import React, { RefObject } from "react";
import { Button } from "../ui/Button";
import DialogPanel from "./DialogPanel";
import Dialog from "./Dialog";
import { TaskProps } from "@/app/_types/types";
import TaskDropdown from "./TaskDropdown";
import Form from "../ui/Form/Form";
import FieldSet from "../ui/Form/FieldSet";
import FormRow from "../ui/Form/FormRow";
import Input from "../ui/Form/Input";
import { useFieldArray, useForm } from "react-hook-form";
import CheckedSubtaskList from "../ui/Task/CheckedSubtaskList";
import { getCompletedSubtasksLength } from "@/app/_lib/utils/helpers";

function TaskDialog({
  dialogRef,
  task,
  isShowDropdown,
  toggleDialog,
  toggleShowDropdown,
  toggleEditDialog,
}: {
  dialogRef: RefObject<HTMLDialogElement>;
  task: TaskProps;
  isShowDropdown: boolean;
  toggleDialog: () => void;
  toggleShowDropdown: () => void;
  toggleEditDialog: () => void;
}) {
  const { title, description, subTasks } = task;
  const completedSubtasks = getCompletedSubtasksLength(subTasks);

  const {
    register,
    handleSubmit,
    getValues,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      checked_status: task.status ?? "",
      checkSubtasks: task.subTasks.map(({ id, isCompleted, title }) => ({
        id: id,
        isCompleted: isCompleted,
        title: title,
      })),
    },
  });

  const { fields } = useFieldArray({
    name: "checkSubtasks",
    control,
  });

  const processForm = async (data) => {
    console.log(data);
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

              <option value="Todo">Todo</option>
              <option value="Done">Done</option>
            </Input>
          </FormRow>

          <div className="mb-6 flex flex-col gap-5">
            <Button type="submit" size="md" intent={"primary"}>
              Save Task Changes
            </Button>
          </div>
        </Form>

        {isShowDropdown ? (
          <TaskDropdown
            toggleShowDropdown={toggleShowDropdown}
            toggleDialog={toggleDialog}
            toggleEditDialog={toggleEditDialog}
          />
        ) : (
          ""
        )}
      </DialogPanel>
    </Dialog>
  );
}

export default TaskDialog;
