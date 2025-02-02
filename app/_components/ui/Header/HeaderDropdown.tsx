"use client";

import { deleteBoard, signOutAction } from "@/app/_lib/actions";

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

  async function handleSignOut() {
    await signOutAction();
  }

  return (
    <>
      <ul className="border-primary-500 absolute right-6 top-16 flex w-48 flex-col gap-4 rounded-lg border border-opacity-20 bg-main_bkg px-4 py-6 text-primary-300 shadow-lg">
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
        <li
          onClick={handleSignOut}
          className="cursor-pointer text-accent-400 transition hover:text-accent-300"
        >
          Sign Out
        </li>
      </ul>
    </>
  );
}

export default TaskDropdown;
