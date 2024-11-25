import React from "react";
import CloseIcon from "../CloseIcon";
import Input from "../Form/Input";

function SubtaskList({ fields, register, remove }) {
  return (
    <ul className="flex flex-col gap-3">
      {fields.map((field, index) => (
        <li key={field.id} className="flex items-center gap-4">
          <Input
            register={register}
            validationSchema={{
              required: "This field is required",
            }}
            placeholder={`e.g ${field?.placeholder || ""}`}
            name={`subTasks.${index}.title`}
            type="text"
          />
          <CloseIcon handleRemove={() => remove(index)} />
        </li>
      ))}
    </ul>
  );
}

export default SubtaskList;
