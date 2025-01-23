import React from "react";

interface FieldSetProps {
  legend: string;
  children: React.ReactNode;
}

function FieldSet({ legend, children }: FieldSetProps) {
  return (
    <fieldset className="flex flex-col gap-3">
      <legend className="mb-3 text-white">{legend}</legend>
      {children}
    </fieldset>
  );
}

export default FieldSet;
