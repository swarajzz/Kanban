"use client";
import { BoardProps } from "@/app/_types/types";
import { IconBoard } from "@/public/sidebar";
import Image from "next/image";

function BoardListItem({ board: { name } }: { board: BoardProps }) {
  return (
    <li className="flex items-center gap-3">
      <Image src={IconBoard} alt="Board Icon" /> <span>{name}</span>
    </li>
  );
}

export default BoardListItem;
