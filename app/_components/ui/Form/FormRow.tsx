"use client";

function FormRow({ label, error, children }) {
  return (
    <fieldset className="flex flex-col">
      <label className="mb-2 text-sm text-white" htmlFor={children?.props?.id}>
        {label}
      </label>
      {label === "Status" ? (
        <div className="relative">{children} </div>
      ) : (
        <>{children}</>
      )}
      {error && <span>{error}</span>}
    </fieldset>
  );
}

export default FormRow;
