"use client";
import React, { RefObject, useState } from "react";
import { Button } from "../ui/Button";
import CloseIcon from "../ui/CloseIcon";
import Dialog from "./Dialog";
import DialogPanel from "./DialogPanel";
import { createBoard } from "@/app/_lib/actions";
import { defaultColumns } from "@/app/_lib/utils/constants";
import { getRandomPlaceholder } from "@/app/_lib/utils/helpers";
import { HashLoader } from "react-spinners";
import { useFieldArray, useForm } from "react-hook-form";
import Form from "../ui/Form/Form";
import Input from "../ui/Form/Input";
import FormRow from "../ui/Form/FormRow";
import FieldSet from "../ui/Form/FieldSet";
import { NewboardFormFields } from "@/app/_types/types";

function NewBoard({
  userId,
  dialogRef,
  toggleDialog,
}: {
  userId: string;
  dialogRef: RefObject<HTMLDialogElement>;
  toggleDialog: () => void;
}) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<NewboardFormFields>({
    defaultValues: {
      boardName: "",
      columns: [
        {
          name: "",
          placeholder: "Todo",
        },
        {
          name: "",
          placeholder: "Doing",
        },
        {
          name: "",
          placeholder: "Done",
        },
      ],
    },
  });

  const { fields, append, prepend, remove } = useFieldArray({
    name: "columns",
    control,
  });

  const processForm = async (data: NewboardFormFields) => {
    await createBoard(data, userId);
    toggleDialog();
  };

  return (
    <Dialog ref={dialogRef} toggleDialog={toggleDialog}>
      <DialogPanel title="Add New Board" toggleDialog={toggleDialog}>
        <Form submitHandler={handleSubmit(processForm)}>
          <FormRow label="Board Name" error={errors?.boardName?.message}>
            <Input
              validationSchema={{
                required: "This field is required",
              }}
              register={register}
              placeholder="e.g Web Design"
              id="boardName"
              name="boardName"
              type="text"
            />
          </FormRow>

          <FieldSet legend="Board Columns">
            <ul className="flex flex-col gap-3">
              {fields.map((field, index) => (
                <li key={field.id} className="flex items-center gap-4">
                  <FormRow
                    label={field.name}
                    hidden={true}
                    error={errors?.columns?.[index]?.name?.message}
                  >
                    <Input
                      register={register}
                      validationSchema={{
                        required: "This field is required",
                      }}
                      name={`columns.${index}.name`}
                      placeholder={`e.g ${field.placeholder}`}
                      type="text"
                    />
                  </FormRow>
                  <CloseIcon handleRemove={() => remove(index)} />
                </li>
              ))}
            </ul>
          </FieldSet>

          <div className="mb-6 flex flex-col gap-5">
            <Button
              type="button"
              size="md"
              intent={"secondary"}
              onClick={() =>
                append({
                  name: "",
                  placeholder: getRandomPlaceholder(),
                })
              }
            >
              + Add New Column
            </Button>
            {!isSubmitting ? (
              <Button
                disabled={isSubmitting}
                type="submit"
                size={"md"}
                intent={"primary"}
              >
                Create New Board
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

export default NewBoard;
