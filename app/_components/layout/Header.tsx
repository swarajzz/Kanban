"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Button } from "../ui/Button";
import HeaderDropdown from "../ui/Header/HeaderDropdown";
import { useParams } from "next/navigation";
import NewTask from "../dialog/NewTask";
import { EditMenuIcon } from "@/public/svgs";
import useDialogRef from "@/_hooks/useDialogRef";
import EditBoard from "../dialog/EditBoard";
import { useBoardStore } from "@/_store/store";
import { useSession } from "next-auth/react";

export default function Header() {
  const params = useParams<{ board: string }>();
  const { dialogRef: taskDialogRef, toggleDialog: toggleTaskDialog } =
    useDialogRef();
  const { dialogRef: boardDialogRef, toggleDialog: toggleBoardDialog } =
    useDialogRef();
  const [isShowDropdown, setShowDropdown] = useState(false);
  const session = useSession();

  const { board } = useBoardStore();

  function toggleShowDropdown() {
    setShowDropdown((prev) => !prev);
  }

  return (
    <header className="relative flex w-full items-center justify-between border-b border-primary-500 border-opacity-20 bg-content_bkg p-5">
      <h1 className="text-xl font-bold text-theme_white">
        {!Object.keys(params).length ? "Turn Chaos into Clarity" : board?.name}
      </h1>

      {session?.status === "authenticated" ? (
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
                boardName={board?.name}
                toggleDialog={toggleBoardDialog}
              />
            </>
          ) : (
            ""
          )}

          <EditBoard
            dialogRef={boardDialogRef}
            toggleDialog={toggleBoardDialog}
          />
        </div>
      ) : (
        ""
      )}
    </header>
  );
}
