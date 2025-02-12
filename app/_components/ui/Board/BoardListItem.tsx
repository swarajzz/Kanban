import { BoardProps } from "@/app/_types/types";
import { LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function BoardListItem({ board: { name } }: { board: BoardProps }) {
  const pathname = usePathname();
  console.log(pathname);

  const isSelected =
    pathname === `/board/${name.trim().replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <li className={`rounded-r-full transition`}>
      <Link
        prefetch={true}
        className={`flex items-center gap-3 rounded-r-full p-4 transition ${
          isSelected
            ? "bg-accent-200 text-white"
            : "hover:bg-accent-201 hover:text-accent-200 dark:hover:bg-white"
        }`}
        href={`/board/${name.trim().replace(/\s+/g, "-").toLowerCase()}`}
      >
        <LayoutDashboard width={16} height={16} className="" />
        <span className="text-[15px] font-bold">{name}</span>
      </Link>
    </li>
  );
}

export default BoardListItem;
