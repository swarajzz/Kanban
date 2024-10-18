import { SubTaskProps } from "@/app/_types/types";
import { Check } from "lucide-react";
import React from "react";

function SubTaskItem({ subTask }: { subTask: SubTaskProps }) {
  return (
    <li className="w-full cursor-pointer rounded border-gray-200 bg-primary-600 transition hover:bg-accent-200">
      <label
        className="relative flex cursor-pointer items-center gap-3 pl-3"
        htmlFor={subTask.title.replace(/\+/g, "-")}
      >
        <div>
          <input
            id={subTask.title.replace(/\+/g, "-")}
            type="checkbox"
            value=""
            className="peer h-5 w-5 appearance-none rounded border-primary-300 bg-primary-500 text-accent-200 checked:bg-accent-200"
          />
          <span className="absolute left-5 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 peer-checked:opacity-100">
            <Check width={16} height={16} className="text-white" />
          </span>
        </div>

        <label
          htmlFor={subTask.title.replace(/\+/g, "-")}
          className="w-full cursor-pointer py-3 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          {subTask.title}
        </label>
      </label>
    </li>
  );
}

export default SubTaskItem;
