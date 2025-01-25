import { LogoLight, LogoDark, VisibilityOff } from "@/public/svgs";
import Image from "next/image";

import BoardList from "../ui/Board/BoardList";
import Link from "next/link";
import { auth } from "@/app/_lib/auth";
import { getBoards } from "@/app/_lib/data-service";
import ThemeSwitch from "../ui/ThemeSwitch";

async function Sidebar() {
  const session = await auth();
  const allBoards = await getBoards(session?.user?.id || "");

  return (
    <section className="bg-background-dark border-primary-500 hidden min-w-64 animate-fadeOut flex-col items-center justify-between justify-items-center border-r border-opacity-20 bg-content_bkg md:flex md:animate-fadeIn">
      <div className="self-start px-5">
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

        <div className="mt-12 flex flex-col gap-4">
          <h2 className="mb-2 text-xs font-semibold uppercase tracking-widest">
            All Boards (X)
          </h2>

          <BoardList allBoards={allBoards} />
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <ThemeSwitch />

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
