"use client";
import React, { useEffect } from "react";
import { Button } from "./Button";
import useDialogRef from "@/app/_hooks/useDialogRef";
import NewEditBoard from "../dialog/NewEditBoard";
import { useBoardStore } from "@/_store/store";
import NewBoard from "../dialog/NewBoard";

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

  console.log("emptyPage");
  const resetStore = useBoardStore((state) => state.resetBoard);

  useEffect(() => {
    resetStore();
  }, [resetStore]);

  return (
    <div className="flex size-full items-center bg-primary-600 text-center">
      <div className="mx-auto flex flex-col items-center gap-4">
        <h1 className="text-xl font-bold">{title} 📝</h1>
        <div className="text-center text-base text-primary-200">{subTitle}</div>
        <Button size="md" intent={"primary"} onClick={toggleDialog}>
          + {btnText}
        </Button>

        <NewBoard dialogRef={dialogRef} toggleDialog={toggleDialog} />
      </div>
    </div>
  );
}

export default EmptyPage;
