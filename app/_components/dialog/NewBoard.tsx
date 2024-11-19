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

function NewBoard({
  userId,
  dialogRef,
  toggleDialog,
}: {
  userId: string;
  dialogRef: RefObject<HTMLDialogElement>;
  toggleDialog: () => void;
}) {
  const [boardColumns, setBoardColumns] = useState(defaultColumns);
  const [usedColumnPlaceholders, setColumnPlaceholders] = useState<string[]>(
    [],
  );

  type FormFields = {
    boardName: string;
    columns: { name: string; placeholder: string }[];
  };

  const {
    register,
    handleSubmit,
    watch,
    control,
    getValues,
    formState: { errors },
  } = useForm<FormFields>({
    defaultValues: {
      boardName: "",
      columns: Array.from({ length: 3 }, (_, i) => ({
        name: "",
        placeholder: getRandomPlaceholder(),
      })),
    },
  });

  const { fields, append, prepend, remove } = useFieldArray({
    name: "columns",
    control,
  });

  const processForm = async (data: FormFields) => {
    console.log(data);
  };

  return (
    <Dialog ref={dialogRef} toggleDialog={toggleDialog}>
      <DialogPanel title="Add New Board" toggleDialog={toggleDialog}>
        <Form submitHandler={handleSubmit(processForm)}>
          <FormRow label="boardName" error={errors?.boardName?.message}>
            <Input
              validationSchema={{
                required: "Name is required",
              }}
              register={register}
              placeholder="e.g Web Design"
              id="boardName"
              name="boardName"
              type="text"
              required
            />
          </FormRow>

          <FieldSet legend="Board Columns">
            <ul className="flex flex-col gap-3">
              {fields.map((field, index) => (
                <li key={field.id} className="flex items-center gap-4">
                  <Input
                    register={register}
                    validationSchema={{
                      required: "Name is required",
                    }}
                    name={`columns.${index}.name`}
                    placeholder={`e.g ${field.placeholder}`}
                    type="text"
                    required
                  />
                  <CloseIcon handleRemove={() => remove(index)} />
                </li>
              ))}
            </ul>
          </FieldSet>

          <input type="hidden" name="userId" value={userId} />

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
            <Button type="submit" size="md" intent={"primary"}>
              Create New Board
            </Button>
            {/* <HashLoader color="#635FC7" size={30} /> */}
          </div>
        </Form>
      </DialogPanel>
    </Dialog>
  );
}

export default NewBoard;
