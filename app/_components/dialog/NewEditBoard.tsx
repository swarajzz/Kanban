"use client";
import React, { RefObject, useEffect, useState } from "react";
import { Button } from "../ui/Button";
import CloseIcon from "../ui/CloseIcon";
import Dialog from "./Dialog";
import DialogPanel from "./DialogPanel";
import { createBoard, updateBoard } from "@/app/_lib/actions";
import { defaultColumns } from "@/app/_lib/utils/constants";
import { getRandomPlaceholderColumn } from "@/app/_lib/utils/helpers";
import { HashLoader } from "react-spinners";
import { useFieldArray, useForm } from "react-hook-form";
import Form from "../ui/Form/Form";
import Input from "../ui/Form/Input";
import FormRow from "../ui/Form/FormRow";
import FieldSet from "../ui/Form/FieldSet";
import {
  ColumnProps,
  NewboardFormFields,
} from "@/app/_types/types";
import { useBoardStore } from "@/app/_store/store";
import { useSession } from "next-auth/react";

function NewEditBoard({
  dialogRef,
  toggleDialog,
}: {
  dialogRef: RefObject<HTMLDialogElement>;
  toggleDialog: () => void;
}) {
  const { data: sessionData } = useSession();
  const { board, columns } = useBoardStore();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewboardFormFields>({
    defaultValues: {
      boardName: board?.name ?? "",
      columns: columns?.map((column) => ({
        id: column.id,
        name: column.name ?? "",
        placeholder: column?.placeholder ?? "",
      })) || [
        {
          id: "",
          name: "",
          placeholder: "Todo",
        },
        {
          id: "",
          name: "",
          placeholder: "Doing",
        },
        {
          id: "",
          name: "",
          placeholder: "Done",
        },
      ],
    },
  });

  useEffect(() => {
    reset({
      boardName: board?.name ?? "",
      columns: columns?.map((column) => ({
        id: column.id,
        name: column.name ?? "",
        placeholder: column.placeholder ?? "",
      })) || [
        {
          id: "",
          name: "",
          placeholder: "Todo",
        },
        {
          id: "",
          name: "",
          placeholder: "Doing",
        },
        {
          id: "",
          name: "",
          placeholder: "Done",
        },
      ],
    });
  }, [board]);

  const { fields, append, remove } = useFieldArray({
    name: "columns",
    control,
  });

  const processForm = async (data: {
    boardName: string;
    columns: ColumnProps[];
  }) => {
    const transformedData = {
      name: data.boardName,
      columns: data.columns,
    };

    !board
      ? await createBoard(data, sessionData?.user?.id || "")
      : await updateBoard({
          data: transformedData,
          boardId: board?.id,
          userId: sessionData?.user?.id || "",
        });

    toggleDialog();
  };

  return (
    <Dialog ref={dialogRef} toggleDialog={toggleDialog}>
      <DialogPanel
        title={!board ? "Add New Board" : "Edit Board"}
        toggleDialog={toggleDialog}
      >
        <Form submitHandler={handleSubmit(processForm)}>
          <FormRow label="Board Name" error={errors?.boardName?.message}>
            <Input
              validationSchema={{
                required: "This field is required",
              }}
              register={register}
              placeholder="e.g Web Design"
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
                  id: "",
                  name: "",
                  placeholder: getRandomPlaceholderColumn(),
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
                {!board ? "Create New Board" : "Save Changes"}
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

export default NewEditBoard;
