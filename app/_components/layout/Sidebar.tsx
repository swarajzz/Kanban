"use client";

import { LogoLight, LogoDark, VisibilityOff } from "@/public/svgs";
import Image from "next/image";

import BoardList from "../ui/Board/BoardList";
import Link from "next/link";
import { auth } from "@/app/_lib/auth";
import { getBoards } from "@/app/_lib/data-service";
import ThemeSwitch from "../ui/ThemeSwitch";
import { ChevronRight, EyeOff } from "lucide-react";
import { BoardProps } from "@/_types/types";
import { Session, User } from "next-auth";
import { useState } from "react";

function Sidebar({ allBoards, user }: { allBoards: BoardProps[]; user: User }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <>
      {!isSidebarOpen && (
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="fixed bottom-[32px] left-0 z-50 flex h-12 w-12 items-center justify-center rounded-r-full bg-accent-600 text-white transition-all hover:bg-primary-400"
          aria-label="Show Sidebar"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      )}

      <div
        className={`flex-shrink-0 transition-all duration-300 ${isSidebarOpen ? "w-[300px]" : "w-0"} overflow-hidden`}
      >
        <section
          className={`bg-background-dark fixed left-0 top-0 h-full w-full max-w-[300px] flex-col border-r border-primary-500 border-opacity-20 bg-content_bkg transition-all duration-300 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:flex`}
        >
          <div className="ml-[33px] self-start">
            <Link href={"/"}>
              <Image
                src={LogoLight}
                alt="logo"
                className="mt-8 hidden dark:block"
              />
              <Image
                src={LogoDark}
                alt="logo"
                className="mt-8 block dark:hidden"
              />
            </Link>

            {user ? (
              <div className="mt-4 flex items-center gap-2">
                <img
                  className="h-8 rounded-full"
                  alt="user profile"
                  src={user.image || ""}
                  referrerPolicy="no-referrer"
                />
                <span>{user.name}</span>
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

            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="mb-10 flex items-center gap-2 transition-colors hover:text-primary-500"
            >
              <EyeOff className="h-5 w-5" />
              <span className="text-base">Hide Sidebar</span>
            </button>
          </div>
        </section>
      </div>
    </>
  );
}

export default Sidebar;
