import React from "react";

function FieldSet({ legend, children }) {
  return (
    <fieldset className="flex flex-col gap-3">
      <legend className="mb-3 text-white">{legend}</legend>
      {children}
    </fieldset>
  );
}

export default FieldSet;
