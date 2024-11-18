"use client";
import React, { RefObject, useState } from "react";
import { Button } from "../ui/Button";
import CloseIcon from "../ui/CloseIcon";
import Dialog from "./Dialog";
import DialogPanel from "./DialogPanel";
import { createBoard } from "@/app/_lib/actions";
import { defaultColumns } from "@/app/_lib/utils/constants";
import {
  getRandomPlaceholder,
} from "@/app/_lib/utils/helpers";
import { HashLoader } from "react-spinners";
import { useFieldArray, useForm } from "react-hook-form";

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
  const { register, handleSubmit, watch, control, getValues } = useForm({
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

  return (
    <Dialog ref={dialogRef} toggleDialog={toggleDialog}>
      <DialogPanel title="Add New Board" toggleDialog={toggleDialog}>
        <form className="flex flex-col gap-4 px-8 pb-4">
          <div className="flex flex-col">
            <label className="mb-2 text-sm text-white" htmlFor="boardName">
              Board Name
            </label>
            <input
              {...register("boardName", {
                required: "This is required",
              })}
              placeholder="e.g Web Design"
              className="border-grey-300 rounded bg-primary-500 px-4 py-2 text-white"
              id="boardName"
              name="boardName"
              type="text"
              required
            />
          </div>

          <fieldset className="flex flex-col gap-3">
            <legend className="mb-3 text-white">Board Columns</legend>

            {fields.map((field, index) => (
              <div key={field.id} className="flex items-center gap-4">
                <input
                  placeholder={`e.g ${field.placeholder}`}
                  className="border-grey-300 w-full max-w-xl rounded bg-primary-500 px-4 py-2 text-white"
                  type="text"
                  name={`field-${index}`}
                  required
                />
                <CloseIcon handleRemove={() => remove(index)} />
              </div>
            ))}
          </fieldset>

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
        </form>
      </DialogPanel>
    </Dialog>
  );
}

export default NewBoard;
