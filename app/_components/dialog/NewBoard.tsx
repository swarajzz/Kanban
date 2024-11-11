"use client";
import React, { RefObject, useState } from "react";
import { Button } from "../ui/Button";
import CloseIcon from "../ui/CloseIcon";
import Dialog from "./Dialog";
import DialogPanel from "./DialogPanel";
import { createBoard } from "@/app/_lib/actions";
import { defaultColumns } from "@/app/_lib/utils/constants";
import { getRandomPlaceholderColumn } from "@/app/_lib/utils/helpers";
import { HashLoader } from "react-spinners";
import { useFormState } from "react-dom";

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
  const [state, formAction] = useFormState(createBoard, null);

  function handleAdd() {
    const newPlaceholder = getRandomPlaceholderColumn(usedColumnPlaceholders);

    setColumnPlaceholders((prev) => [...prev, newPlaceholder]);

    setBoardColumns((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        placeholder: newPlaceholder,
      },
    ]);
  }

  function handleRemove(id: string) {
    const updatedColumns = boardColumns.filter((column) => column.id !== id);

    setBoardColumns((prev) => updatedColumns);
  }

  return (
    <Dialog ref={dialogRef} toggleDialog={toggleDialog}>
      <DialogPanel title="Add New Board" toggleDialog={toggleDialog}>
        <form action={formAction} className="flex flex-col gap-4 px-8 pb-4">
          <div className="flex flex-col">
            <label className="mb-2 text-sm text-white" htmlFor="boardName">
              Board Name
            </label>
            <input
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

            {boardColumns.map((column, index) => (
              <div key={index} className="flex items-center gap-4">
                <input
                  placeholder={`e.g ${column?.placeholder || ""}`}
                  className="border-grey-300 w-full max-w-xl rounded bg-primary-500 px-4 py-2 text-white"
                  type="text"
                  name={`column-${index}`}
                  required
                />
                <CloseIcon handleRemove={() => handleRemove(column.id)} />
              </div>
            ))}
          </fieldset>

          <input type="hidden" name="userId" value={userId} />

          <div className="mb-6 flex flex-col gap-5">
            <Button
              type="button"
              size="md"
              intent={"secondary"}
              onClick={handleAdd}
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
