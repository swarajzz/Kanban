"use client";
import React from "react";
import { Button } from "./Button";
import NewBoard from "../dialog/NewBoard";
import useDialogRef from "@/app/_hooks/useDialogRef";

function EmptyPage({
  title,
  subTitle,
  btnText,
}: {
  title: string;
  subTitle: string;
  btnText: string;
}) {
  const { dialogRef, toggleDialog } = useDialogRef();

  return (
    <div className="flex size-full items-center bg-primary-600 text-center">
      <div className="mx-auto flex flex-col items-center gap-4">
        <h1 className="text-xl font-bold">{title} 📝</h1>
        <div className="text-center text-base text-primary-200">
          {subTitle}
        </div>
        <Button size="md" intent={"primary"} onClick={toggleDialog}>
          + {btnText}
        </Button>
        <NewBoard dialogRef={dialogRef} toggleDialog={toggleDialog} />
      </div>
    </div>
  );
}

export default EmptyPage;
