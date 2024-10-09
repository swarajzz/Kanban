import { LogoLight, VisibilityOff } from "@/public/svgs";
import Image from "next/image";

import { LightTheme, DarkTheme, IconBoard } from "@/public/sidebar";
import prisma from "@/app/_lib/prisma";
import BoardList from "../ui/BoardList";
import Link from "next/link";

async function Sidebar() {
  const allBoards = await prisma.board.findMany();

  return (
    <section className="bg-background-dark flex min-h-screen min-w-64 flex-col items-center justify-between justify-items-center border-r border-primary-400 bg-primary-500">
      <div className="self-start px-5">
        <Link href={"/"}>
          <Image src={LogoLight} alt="logo" className="mt-8" />
        </Link>
        <span>User</span>

        <div className="mt-12 flex flex-col gap-4">
          <h2 className="mb-2 text-xs font-semibold uppercase tracking-widest">
            All Boards (X)
          </h2>

          <BoardList allBoards={allBoards} />
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-center gap-3 rounded-lg bg-primary-600 px-10 py-2">
          <div>
            <Image src={LightTheme} alt="logo" />
          </div>

          <label className="cursor-pointer">
            <input type="checkbox" value="" className="peer sr-only" />
            <div className="peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rtl:peer-checked:after:-translate-x-full dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
            {/* <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"></span> */}
          </label>

          <div>
            <Image src={DarkTheme} alt="logo" />
          </div>
        </div>
        <div className="mb-10 flex gap-2">
          <Image
            src={VisibilityOff}
            alt="Visbility icon "
            height={24}
            width={24}
          />
          <span className="text-base">Hide Sidebar</span>
        </div>
      </div>
    </section>
  );
}

export default Sidebar;
