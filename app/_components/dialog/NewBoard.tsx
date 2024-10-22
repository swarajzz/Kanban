"use client";
import React, { RefObject } from "react";
import { Button } from "../ui/Button";
import CloseIcon from "../ui/CloseIcon";
import Dialog from "./Dialog";
import DialogPanel from "./DialogPanel";

function NewBoard({
  dialogRef,
  toggleDialog,
}: {
  dialogRef: RefObject<HTMLDialogElement>;
  toggleDialog: () => void;
}) {
  return (
    <Dialog ref={dialogRef} toggleDialog={toggleDialog}>
      <DialogPanel
        className="relative my-8 w-full max-w-md transform overflow-hidden rounded-lg bg-primary-500 text-left shadow-xl transition-all"
        title="Add New Board"
        toggleDialog={toggleDialog}
      >
        <form className="flex flex-col gap-4 px-8 pb-4">
          <div className="flex flex-col">
            <label className="mb-2 text-sm text-white" htmlFor="boardName">
              Board Name
            </label>
            <input
              placeholder="e.g Web Design"
              className="border-grey-300 rounded bg-primary-500 px-4 py-2 text-white"
              id="boardName"
              type="text"
            />
          </div>

          <fieldset className="flex flex-col gap-3">
            <legend className="mb-3 text-white">Board Columns</legend>
            <div className="flex items-center gap-4">
              <input
                placeholder="e.g Todo"
                className="border-grey-300 w-full max-w-xl rounded bg-primary-500 px-4 py-2 text-white"
                type="text"
              />
              <CloseIcon />
            </div>
            <div className="flex items-center gap-4">
              <input
                placeholder="e.g Doing"
                className="border-grey-300 w-full max-w-xl rounded bg-primary-500 px-4 py-2 text-white"
                type="text"
              />
              <CloseIcon />
            </div>
            <div className="flex items-center gap-4">
              <input
                placeholder="e.g Done"
                className="border-grey-300 w-full max-w-xl rounded bg-primary-500 px-4 py-2 text-white"
                type="text"
              />
              <CloseIcon />
            </div>
          </fieldset>
        </form>

        <div className="mb-6 flex flex-col gap-5 px-4 sm:px-6">
          <Button size="md" intent={"secondary"}>
            + Add New Column
          </Button>
          <Button size="md" intent={"primary"}>
            Create New Board
          </Button>
        </div>
      </DialogPanel>
    </Dialog>
  );
}

export default NewBoard;
