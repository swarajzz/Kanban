"use client";
import React from "react";
import { Button } from "./Button";
import useDialogRef from "@/app/_hooks/useDialogRef";
import NewEditBoard from "../dialog/NewEditBoard";

function EmptyPage({
  userId,
  title,
  subTitle,
  btnText,
}: {
  userId: string;
  title: string;
  subTitle: string;
  btnText: string;
}) {
  const { dialogRef, toggleDialog } = useDialogRef();

  return (
    <div className="flex size-full items-center bg-primary-600 text-center">
      <div className="mx-auto flex flex-col items-center gap-4">
        <h1 className="text-xl font-bold">{title} 📝</h1>
        <div className="text-center text-base text-primary-200">{subTitle}</div>
        <Button size="md" intent={"primary"} onClick={toggleDialog}>
          + {btnText}
        </Button>
        <NewEditBoard
          dialogRef={dialogRef}
          toggleDialog={toggleDialog}
        />
      </div>
    </div>
  );
}

export default EmptyPage;
