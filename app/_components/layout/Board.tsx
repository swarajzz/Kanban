"use client";
import { Button } from "../ui/Button";
import NewBoard from "../dialog/NewBoard";
import useDialogRef from "../../_hooks/useDialogRef";

function Board() {
  const { dialogRef, toggleDialog } = useDialogRef();

  return (
    <div className="flex size-full items-center bg-primary-600">
      <div className="mx-auto flex flex-col items-center gap-4">
        <h1 className="text-2xl">Welcome to Kanban Task Management</h1>
        <div className="text-center">
          You can start selecting a created board or if you want you can create a new one
        </div>
        <Button size="md" intent={"primary"} onClick={toggleDialog}>
          + Create New Board
        </Button>
        <NewBoard dialogRef={dialogRef} toggleDialog={toggleDialog} />
      </div>
    </div>
  );
}

export default Board;
