"use client";
import React, { RefObject, useEffect } from "react";
import { Button } from "../ui/Button";
import CloseIcon from "../ui/CloseIcon";
import Dialog from "./Dialog";
import DialogPanel from "./DialogPanel";
import { HashLoader } from "react-spinners";
import { useFieldArray, useForm } from "react-hook-form";
import Form from "../ui/Form/Form";
import Input from "../ui/Form/Input";
import FormRow from "../ui/Form/FormRow";
import FieldSet from "../ui/Form/FieldSet";
import { useSession } from "next-auth/react";
import { useBoardStore } from "@/_store/store";
import { EditFormFields } from "@/_types/types";
import { createBoard, updateBoard } from "@/_lib/actions";
import { getRandomPlaceholderColumn } from "@/_lib/utils/helpers";
import { useParams } from "next/navigation";

function EditBoard({
  dialogRef,
  toggleDialog,
}: {
  dialogRef: RefObject<HTMLDialogElement>;
  toggleDialog: () => void;
}) {
  const { data: sessionData } = useSession();
  const { board, columns } = useBoardStore();
  const { board: boardPath } = useParams<{ board: string }>();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EditFormFields>({
    defaultValues: {
      name: board?.name ?? "",
      editColumns: columns?.map((column) => ({
        id: column.id,
        name: column.name,
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
      name: board?.name ?? "",
      editColumns: columns?.map((column) => ({
        id: column.id,
        name: column.name ?? "",
        placeholder: column.placeholder ?? "",
      })),
    });
  }, [reset, board, columns]);

  const { fields, append, remove } = useFieldArray({
    name: "editColumns",
    control,
  });

  const processForm = async (data: EditFormFields) => {
    if (!board?.id) {
      console.error("User ID is missing.");
      return;
    }

    if (!sessionData?.user?.id) {
      console.error("User ID is missing.");
      return;
    }

    await updateBoard(
      data,
      board?.id,
      sessionData?.user?.id || "",
      false,
      boardPath,
    );

    toggleDialog();
  };

  return (
    <Dialog ref={dialogRef} toggleDialog={toggleDialog}>
      <DialogPanel title="Edit Board" toggleDialog={toggleDialog}>
        <Form submitHandler={handleSubmit(processForm)}>
          <FormRow label="Board Name" error={errors?.name?.message}>
            <Input
              validationSchema={{
                required: "This field is required",
              }}
              register={register}
              placeholder="e.g Web Design"
              name="name"
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
                    error={errors?.editColumns?.[index]?.name?.message}
                  >
                    <Input
                      register={register}
                      validationSchema={{
                        required: "This field is required",
                      }}
                      name={`editColumns.${index}.name`}
                      placeholder={`e.g ${field.placeholder}`}
                      type="text"
                    />
                  </FormRow>
                  {fields.length > 1 && (
                    <CloseIcon handleRemove={() => remove(index)} />
                  )}
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

export default EditBoard;
