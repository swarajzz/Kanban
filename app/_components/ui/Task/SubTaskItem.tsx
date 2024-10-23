import { SubTaskProps } from "@/app/_types/types";
import React from "react";

function SubTaskItem({ subTask }: { subTask: SubTaskProps }) {
  return (
    <li className="w-full cursor-pointer rounded border-gray-200 bg-primary-600 transition hover:bg-accent-200 hover:bg-opacity-25">
      <label
        htmlFor={subTask.title.replace(/\+/g, "-")}
        className="inline-flex w-full cursor-pointer items-center"
      >
        <div
          className="peer relative flex cursor-pointer items-center rounded-full p-3"
          data-ripple-dark="true"
        >
          <input
            type="checkbox"
            className="border-blue-gray-200 peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border transition-all checked:border-primary-300 checked:bg-accent-200"
            id={subTask.title.replace(/\+/g, "-")}
          />
          <div className="pointer-events-none absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5"
              viewBox="0 0 20 20"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="1"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
        </div>
        <h3 className="w-full cursor-pointer text-sm font-medium text-gray-900 peer-has-[:checked]:line-through dark:text-gray-300">
          {subTask.title}
        </h3>
      </label>
    </li>
  );
}

export default SubTaskItem;
