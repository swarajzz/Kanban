import { BoardProps } from "@/app/_types/types";
import BoardListItem from "./BoardListItem";

function BoardList({ allBoards }: { allBoards: BoardProps[] }) {
  return (
    <ul className="ml-2 flex flex-col gap-6">
      {allBoards.map((board: BoardProps) => (
        <BoardListItem key={board.id} board={board} />
      ))}
    </ul>
  );
}

export default BoardList;
