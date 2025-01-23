"use client";

import { ReactElement } from "react";

type FormRowProps = {
  label: string;
  hidden?: boolean;
  error?: string | null;
  type?: string;
  children: ReactElement;
};

function FormRow({ label, hidden, error, children, type }: FormRowProps) {
  return (
    <fieldset className="flex w-full flex-col">
      <label
        className={
          type === "checkbox"
            ? "inline-flex w-full cursor-pointer items-center"
            : `mb-2 text-sm text-white ${hidden ? "visually-hidden" : ""}`
        }
        htmlFor={children?.props?.id}
      >
        {label}
      </label>
      {label === "Status" ? (
        <div className="relative">{children} </div>
      ) : (
        <>{children}</>
      )}
      {error && <span className="text-red-400">{error}</span>}
    </fieldset>
  );
}

export default FormRow;
