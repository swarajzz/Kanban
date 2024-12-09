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

export default function Header() {
  const params = useParams<{ board: string }>();
  const { dialogRef, toggleDialog } = useDialogRef();
  const [isShowDropdown, setShowDropdown] = useState(false);

  const { board, columns } = useBoardStore();

  function toggleShowDropdown() {
    setShowDropdown((prev) => !prev);
  }

  return (
    <header className="relative flex items-center justify-between border-b border-primary-400 bg-primary-500 p-5">
      <h1 className="text-xl font-bold text-white">
        {!Object.keys(params).length ? "Turn Chaos into Clarity" : board?.name}
      </h1>
      <div className="flex items-center gap-5">
        {Object.keys(params).length ? (
          <Button onClick={toggleDialog} size="md" intent={"primary"}>
            + Add new task
          </Button>
        ) : (
          ""
        )}

        <NewTask
          dialogRef={dialogRef}
          toggleDialog={toggleDialog}
          columns={columns}
        />

        <div
          className="cursor-pointer"
          onClick={() => setShowDropdown((prev) => !prev)}
        >
          <Image src={EditMenuIcon} alt="ellipses icon" />
        </div>

        {isShowDropdown ? (
          <HeaderDropdown
            toggleShowDropdown={toggleShowDropdown}
            boardName={params.board}
          />
        ) : (
          ""
        )}
      </div>
    </header>
  );
}
