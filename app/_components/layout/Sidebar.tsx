import { LogoLight, LogoDark, VisibilityOff } from "@/public/svgs";
import Image from "next/image";

import BoardList from "../ui/Board/BoardList";
import Link from "next/link";
import { auth } from "@/app/_lib/auth";
import { getBoards } from "@/app/_lib/data-service";
import ThemeSwitch from "../ui/ThemeSwitch";
import { EyeOff } from "lucide-react";

async function Sidebar() {
  const session = await auth();
  const allBoards = await getBoards(session?.user?.id || "");

  return (
    <section className="bg-background-dark border-primary-500 0 hidden w-full max-w-[300px] animate-fadeOut flex-col border-r border-opacity-20 bg-content_bkg md:flex md:animate-fadeIn">
      <div className="ml-[33px] self-start">
        <Link href={"/"}>
          <Image
            src={LogoLight}
            alt="logo"
            className="mt-8 hidden dark:block"
          />
          <Image src={LogoDark} alt="logo" className="mt-8 block dark:hidden" />
        </Link>

        {session?.user?.image ? (
          <div className="mt-4 flex items-center gap-2">
            <img
              className="h-8 rounded-full"
              alt="user profile"
              src={session.user.image}
              referrerPolicy="no-referrer"
            />
            <span>{session.user.name}</span>
          </div>
        ) : (
          ""
        )}
      </div>

      <div className="mt-12 flex w-full max-w-[276px] flex-col gap-4">
        <h2 className="mb-2 ml-[33px] text-xs font-bold uppercase tracking-[2.4px]">
          All Boards (X)
        </h2>

        <BoardList allBoards={allBoards} />
      </div>

      <div className="mt-auto flex flex-col items-center justify-center gap-6">
        <ThemeSwitch />

        <div className="mb-10 flex gap-2">
          <EyeOff />
          <span className="text-base">Hide Sidebar</span>
        </div>
      </div>
    </section>
  );
}

export default Sidebar;
