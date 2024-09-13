import React from "react";
import { Button } from "./Button";

function Board() {
  return (
    <div className="flex size-full items-center bg-primary-600">
      <div className="mx-auto flex flex-col items-center gap-4">
        <h1 className="text-2xl">Welcome to Kanban Task Management</h1>
        <div className="text-center">
          You can start selecting a created board or if you want you can create
          a new one
        </div>
        <Button size="md" intent={"primary"}>
          + Create New Board
        </Button>
      </div>
    </div>
  );
}

export default Board;
