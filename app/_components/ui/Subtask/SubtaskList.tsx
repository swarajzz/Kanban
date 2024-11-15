import React from "react";
import CloseIcon from "../CloseIcon";

function SubtaskList({ fields, register, remove }) {
  return (
    <ul className="flex flex-col gap-3">
      {fields.map((field, index) => (
        <li key={field.id} className="flex items-center gap-4">
          <input
            {...register(`field-${index}` as const, {
              required: "Description is required",
            })}
            placeholder={`e.g ${field?.placeholder || ""}`}
            className="border-grey-300 w-full max-w-xl rounded bg-primary-500 px-4 py-2 text-white"
            type="text"
            defaultValue={field.title}
          />
          <CloseIcon handleRemove={() => remove(index)} />
        </li>
      ))}
    </ul>
  );
}

export default SubtaskList;
