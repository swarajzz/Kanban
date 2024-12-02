import React from "react";
import CloseIcon from "../CloseIcon";
import Input from "../Form/Input";
import FormRow from "../Form/FormRow";

function SubtaskList({ fields, register, remove, errors }) {
  return (
    <ul className="flex flex-col gap-3">
      {fields.map((field, index) => (
        <li key={field.id} className="flex items-center gap-4">
          <FormRow
            label={field.name}
            hidden={true}
            error={errors?.subTasks?.[index]?.title?.message}
          >
            <Input
              register={register}
              validationSchema={{
                required: "This field is required",
              }}
              placeholder={`e.g ${field?.placeholder || ""}`}
              name={`subTasks.${index}.title`}
              type="text"
            />
          </FormRow>
          <CloseIcon handleRemove={() => remove(index)} />
        </li>
      ))}
    </ul>
  );
}

export default SubtaskList;
