"use client";
import React from "react";
import { EditMenuIcon } from "@/public/svgs";
import Image from "next/image";
import { Button } from "../ui/Button";
import useDialogRef from "@/app/_hooks/useDialogRef";
import NewTask from "../dialog/NewTask";

export default function Header() {
  const { dialogRef, toggleDialog } = useDialogRef();

  return (
    <div className="flex items-center justify-between border-b border-primary-400 bg-primary-500 p-5">
      <h1 className="text-xl font-bold text-white">Platform Launch</h1>
      <div className="flex items-center gap-5">
        <Button onClick={toggleDialog} size="md" intent={"primary"}>
          + Add new task
        </Button>
        <NewTask dialogRef={dialogRef} toggleDialog={toggleDialog} />
        <Image src={EditMenuIcon} alt="ellipses icon" />
      </div>
    </div>
  );
}
