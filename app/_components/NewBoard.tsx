"use client";
import React, { RefObject, useRef, useState } from "react";
import CrossIcon from "@/public/svgs/icon-cross.svg";
import Image from "next/image";
import { Button } from "./Button";

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
      // role="dialog"
      aria-modal="true"
      ref={dialogRef}
    >
      <div
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        aria-hidden="true"
      ></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-primary-500 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="flex justify-between px-4 pb-4 pt-5">
              <h2 className="text-lg text-white">Add New Board</h2>
              <Image
                src={CrossIcon}
                className="cursor-pointer"
                alt="cross icon"
                onClick={toggleDialog}
                style={{ objectFit: "contain", width: "16px", height: "16px" }}
              />
            </div>

            {/* <div className="px-4 pb-4 pt-5 sm:p-6 sm:pb-4"> */}
            <form className="flex flex-col gap-4 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              {/* <FormRow /> */}
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
              <fieldset>
                {/* <label htmlFor="">Board Columns</label> */}
                <legend className="mb-2 text-white">Board Columns</legend>
                <input
                  placeholder="e.g Todo"
                  className="border-grey-300 mb-2 w-auto rounded bg-primary-500 px-4 py-2 text-white"
                  type="text"
                />
              </fieldset>
            </form>
            <div className="flex flex-col gap-5 px-4 py-3 sm:px-6">
              <Button
                // className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                size="md"
                intent={"secondary"}
              >
                + Add New Column
              </Button>
              <Button
                // className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
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
