import { BoardProps } from "@/app/_types/types";
import { IconBoard } from "@/public/sidebar";
import Image from "next/image";
import Link from "next/link";

function BoardListItem({ board: { name } }: { board: BoardProps }) {
  return (
    <li>
      <Link
        prefetch={true}
        className="flex items-center gap-3"
        href={`/${name.trim().replace(/\s+/g, "-").toLowerCase()}`}
      >
        <Image src={IconBoard} alt="Board Icon" />
        <span>{name}</span>
      </Link>
    </li>
  );
}

export default BoardListItem;
