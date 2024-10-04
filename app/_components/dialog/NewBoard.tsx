"use client";
import React, { RefObject } from "react";
import { Button } from "../ui/Button";
import CrossIcon from "../ui/CrossIcon";

function NewBoard({
  dialogRef,
  toggleDialog,
}: {
  dialogRef: RefObject<HTMLDialogElement>;
  toggleDialog: () => void;
}) {
  return (
    <dialog
      className="relative z-10 transition delay-100 duration-300 ease-in-out"
      aria-labelledby="modal-title"
      aria-modal="true"
      ref={dialogRef}
    >
      <div
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        aria-hidden="true"
      ></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative my-8 w-full max-w-md transform overflow-hidden rounded-lg bg-primary-500 text-left shadow-xl transition-all">
            <div className="flex items-center justify-between px-6 py-7">
              <h2 className="text-lg text-white">Add New Board</h2>
              <CrossIcon width={24} height={24} toggleDialog={toggleDialog} />
            </div>

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
                  <CrossIcon />
                </div>
                <div className="flex items-center gap-4">
                  <input
                    placeholder="e.g Todo"
                    className="border-grey-300 w-full max-w-xl rounded bg-primary-500 px-4 py-2 text-white"
                    type="text"
                  />
                  <CrossIcon />
                </div>
              </fieldset>
            </form>
            <div className="flex flex-col gap-5 px-4 mb-6 sm:px-6">
              <Button
                size="md"
                intent={"secondary"}
              >
                + Add New Column
              </Button>
              <Button
                size="md"
                intent={"primary"}
              >
                Create New Board
              </Button>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
}

export default NewBoard;
