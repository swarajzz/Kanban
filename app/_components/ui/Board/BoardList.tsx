"use client";
import { BoardProps } from "@/app/_types/types";
import BoardListItem from "./BoardListItem";

function BoardList({ allBoards }: { allBoards: BoardProps[] }) {
  return (
    <ul className="flex flex-col">
      {allBoards.map((board: BoardProps) => (
        <BoardListItem key={board.id} board={board} />
      ))}
    </ul>
  );
}

export default BoardList;
