import React from "react";
import { Button } from "./Button";

function Board() {
  return (
    <div className="flex size-full items-center bg-primary-600">
      <div className="mx-auto gap-4 flex flex-col items-center">
        <div>The board is empty. Create a new column to get started.</div>
        <Button size="md" intent={"primary"}>
          + Add new column
        </Button>
      </div>
    </div>
  );
}

export default Board;
