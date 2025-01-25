import React from "react";

interface FieldSetProps {
  legend: string;
  children: React.ReactNode;
}

function FieldSet({ legend, children }: FieldSetProps) {
  return (
    <fieldset className="flex flex-col gap-3">
      <legend className="text-theme_grey mb-3 text-xs font-bold">
        {legend}
      </legend>
      {children}
    </fieldset>
  );
}

export default FieldSet;
