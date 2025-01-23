"use client";

import { deleteBoard } from "@/app/_lib/actions";

function TaskDropdown({
  toggleShowDropdown,
  boardName,
  toggleDialog,
}: {
  toggleShowDropdown: () => void;
  boardName: string | undefined;
  toggleDialog: () => void;
}) {
  function handleClick() {
    toggleShowDropdown();
    toggleDialog();
  }

  return (
    <>
      <ul className="absolute right-6 top-16 flex w-48 flex-col gap-4 rounded-lg border border-primary-400 bg-main_bkg px-4 py-6 text-primary-300 shadow-sm">
        {boardName ? (
          <>
            <li
              className="cursor-pointer transition hover:text-accent-200"
              onClick={handleClick}
            >
              Edit Board
            </li>
            <li
              className="cursor-pointer text-accent-400 transition hover:text-accent-300"
              onClick={() => deleteBoard(boardName)}
            >
              Delete Board
            </li>
          </>
        ) : (
          ""
        )}
        <li className="cursor-pointer text-accent-400 transition hover:text-accent-300">
          Sign Out
        </li>
      </ul>
    </>
  );
}

export default TaskDropdown;
