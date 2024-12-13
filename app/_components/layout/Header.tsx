"use client";
import React, { useState } from "react";
import { EditMenuIcon } from "@/public/svgs";
import Image from "next/image";
import { Button } from "../ui/Button";
import useDialogRef from "@/app/_hooks/useDialogRef";
import HeaderDropdown from "../ui/Header/HeaderDropdown";
import { useParams } from "next/navigation";
import { useBoardStore } from "@/app/_store/store";
import NewTask from "../dialog/NewTask";
import { slugToName } from "@/app/_lib/utils/helpers";
import NewEditBoard from "../dialog/NewEditBoard";

export default function Header() {
  const params = useParams<{ board: string }>();
  const { dialogRef: taskDialogRef, toggleDialog: toggleTaskDialog } =
    useDialogRef();
  const { dialogRef: boardDialogRef, toggleDialog: toggleBoardDialog } =
    useDialogRef();
  const [isShowDropdown, setShowDropdown] = useState(false);

  function toggleShowDropdown() {
    setShowDropdown((prev) => !prev);
  }

  return (
    <header className="relative flex w-full items-center justify-between border-b border-primary-400 bg-primary-500 p-5">
      <h1 className="text-xl font-bold text-white">
        {!Object.keys(params).length
          ? "Turn Chaos into Clarity"
          : slugToName(params.board)}
      </h1>
      <div className="flex items-center gap-5">
        {Object.keys(params).length ? (
          <Button onClick={toggleTaskDialog} size="md" intent={"primary"}>
            + Add new task
          </Button>
        ) : (
          ""
        )}

        <NewTask dialogRef={taskDialogRef} toggleDialog={toggleTaskDialog} />

        <div
          className="cursor-pointer"
          onClick={() => setShowDropdown((prev) => !prev)}
        >
          <Image src={EditMenuIcon} alt="ellipses icon" />
        </div>

        {isShowDropdown ? (
          <>
            <HeaderDropdown
              toggleShowDropdown={toggleShowDropdown}
              boardName={params.board}
              toggleDialog={toggleBoardDialog}
            />
          </>
        ) : (
          ""
        )}

        <NewEditBoard
          dialogRef={boardDialogRef}
          toggleDialog={toggleBoardDialog}
        />
      </div>
    </header>
  );
}
