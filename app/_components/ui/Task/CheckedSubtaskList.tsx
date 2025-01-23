import React from "react";
import {
  FieldArrayWithId,
  UseFieldArrayRemove,
  UseFormRegister,
  UseFormRegisterReturn,
} from "react-hook-form";
import Input from "../Form/Input";
import FormRow from "../Form/FormRow";

interface CheckedSubtaskListProps {
  fields: FieldArrayWithId<any, any, any>[];
  register: UseFormRegister<any>;
}

function CheckedSubtaskList({ fields, register }: CheckedSubtaskListProps) {
  return (
    <ul className="flex w-full flex-col gap-3">
      {fields.map((field, index) => (
        <li
          key={field.id}
          className="bg-primary-600 w-full cursor-pointer rounded border-gray-200 transition hover:bg-accent-200 hover:bg-opacity-25"
        >
          <label className="inline-flex w-full cursor-pointer items-center">
            <div
              className="peer relative flex cursor-pointer items-center rounded-full p-3"
              data-ripple-dark="true"
            >
              <Input
                type="checkbox"
                register={register}
                name={`checkSubtasks.${index}.isCompleted`}
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
              {field.title}
            </h3>
          </label>
        </li>
      ))}
    </ul>
  );
}

export default CheckedSubtaskList;
